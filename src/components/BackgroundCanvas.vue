<template>
  <div class="background-canvas" aria-hidden="true">
    <img class="background-photo" :src="backgroundImage" alt="" />
    <div ref="canvasHost" class="background-webgl"></div>
  </div>
</template>

<script setup>
import backgroundImage from "../../background.png";
import { gsap } from "gsap";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const canvasHost = ref(null);
const route = useRoute();

let renderer;
let composer;
let scene;
let camera;
let world;
let starfield;
let cityGroup;
let avatarGroup;
let cables = [];
let pulseLight;
let sideLight;
let bloomPass;
let rgbShiftPass;
let afterimagePass;
let filmPass;
let screenTexture;
let screenContext;
let animationFrameId;
let resizeHandler;

const pointer = {
  x: 0,
  y: 0
};

const cameraTarget = {
  x: 0,
  y: 0.9,
  z: 9.35,
  lookX: 0,
  lookY: 0.4,
  lookZ: -0.5
};

function isTestEnvironment() {
  return (
    typeof navigator !== "undefined" &&
    navigator.userAgent.toLowerCase().includes("jsdom")
  );
}

function createScreenTexture() {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 1024;
  textureCanvas.height = 576;
  const context = textureCanvas.getContext("2d");

  if (!context) {
    return null;
  }

  screenContext = context;
  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function drawAnimatedScreen(timeMs) {
  if (!screenContext || !screenTexture) {
    return;
  }

  const ctx = screenContext;
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const t = timeMs * 0.001;

  const baseGradient = ctx.createLinearGradient(0, 0, width, height);
  baseGradient.addColorStop(0, "rgba(2, 2, 3, 1)");
  baseGradient.addColorStop(0.45, "rgba(36, 2, 12, 1)");
  baseGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
  ctx.fillStyle = baseGradient;
  ctx.fillRect(0, 0, width, height);

  const pulse = 0.5 + Math.sin(t * 1.8) * 0.16;

  ctx.fillStyle = `rgba(255, 8, 74, ${0.2 + pulse * 0.18})`;
  ctx.fillRect(width * 0.035, height * 0.06, width * 0.93, height * 0.84);

  for (let i = 0; i < 74; i += 1) {
    const y = (i / 74) * height;
    const alpha = 0.02 + (Math.sin(t * 2.35 + i * 0.8) + 1) * 0.034;
    ctx.fillStyle = `rgba(255, 80, 142, ${alpha})`;
    ctx.fillRect(0, y, width, 1.2);
  }

  ctx.strokeStyle = "rgba(255, 168, 206, 0.38)";
  ctx.lineWidth = 3;
  ctx.strokeRect(width * 0.058, height * 0.085, width * 0.884, height * 0.79);

  ctx.fillStyle = "rgba(255, 0, 51, 0.94)";
  ctx.font = "900 106px Saira Condensed, Arial";
  ctx.fillText("GBRL 26", width * 0.09, height * 0.76);

  ctx.fillStyle = "rgba(238, 244, 255, 0.86)";
  ctx.font = "700 24px Saira Condensed, Arial";
  ctx.fillText("CREATIVE DEVELOPMENT / IA / INTEGRATION", width * 0.09, height * 0.15);

  ctx.fillStyle = "rgba(248, 248, 255, 0.72)";
  ctx.font = "600 17px Saira Condensed, Arial";
  ctx.fillText("CONNECTED 01", width * 0.78, height * 0.16);

  const barX = width * 0.63;
  const barY = height * 0.2;
  const barW = width * 0.26;
  const barH = 11;

  for (let i = 0; i < 9; i += 1) {
    const level = (Math.sin(t * 3.2 + i * 0.86) + 1) * 0.5;
    const currentWidth = barW * (0.33 + level * 0.67);
    const y = barY + i * (barH + 8);

    ctx.fillStyle = "rgba(255, 12, 76, 0.74)";
    ctx.fillRect(barX, y, currentWidth, barH);

    ctx.strokeStyle = "rgba(230, 190, 240, 0.4)";
    ctx.strokeRect(barX, y, barW, barH);
  }

  for (let i = 0; i < 6; i += 1) {
    const lineY = (Math.sin(t * 2.6 + i * 1.2) * 0.5 + 0.5) * height;
    ctx.fillStyle = "rgba(255, 35, 120, 0.28)";
    ctx.fillRect(width * 0.08, lineY, width * 0.84, 1.4);
  }

  const glitchX = (Math.sin(t * 13.4) * 0.5 + 0.5) * width * 0.8;
  ctx.fillStyle = "rgba(98, 245, 255, 0.28)";
  ctx.fillRect(glitchX, height * 0.1, 2, height * 0.72);

  screenTexture.needsUpdate = true;
}

function createNeonPanel(text, width, height, bgColor, textColor) {
  const panelCanvas = document.createElement("canvas");
  panelCanvas.width = 512;
  panelCanvas.height = 256;
  const ctx = panelCanvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const grd = ctx.createLinearGradient(0, 0, panelCanvas.width, panelCanvas.height);
  grd.addColorStop(0, "rgba(8, 18, 24, 0.95)");
  grd.addColorStop(1, bgColor);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, panelCanvas.width, panelCanvas.height);

  ctx.strokeStyle = "rgba(188, 255, 255, 0.65)";
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, panelCanvas.width - 16, panelCanvas.height - 16);

  ctx.fillStyle = textColor;
  ctx.font = "800 76px Saira Condensed, Arial";
  ctx.fillText(text, 34, 150);

  ctx.fillStyle = "rgba(200, 255, 255, 0.72)";
  ctx.font = "600 20px Saira Condensed, Arial";
  ctx.fillText("DIGITAL EXPERIENCE UNIT", 36, 198);

  const texture = new THREE.CanvasTexture(panelCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  const geometry = new THREE.PlaneGeometry(width, height);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.92
  });

  return new THREE.Mesh(geometry, material);
}

function createCity() {
  cityGroup = new THREE.Group();

  const cityMaterial = new THREE.MeshStandardMaterial({
    color: 0x111323,
    emissive: 0x300018,
    emissiveIntensity: 0.35,
    roughness: 0.32,
    metalness: 0.75
  });

  for (let i = 0; i < 66; i += 1) {
    const width = 0.35 + Math.random() * 1.1;
    const depth = 0.4 + Math.random() * 1.2;
    const height = 1.5 + Math.random() * 10;
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      cityMaterial.clone()
    );

    const ring = Math.random() > 0.55 ? 14 : 20;
    const angle = Math.random() * Math.PI * 2;
    box.position.set(Math.cos(angle) * ring, height * 0.5 - 1.7, Math.sin(angle) * ring - 7);
    box.material.emissiveIntensity = 0.2 + Math.random() * 0.5;
    cityGroup.add(box);
  }

  const panelOne = createNeonPanel("WORKS", 8.4, 3.8, "rgba(10, 10, 12, 0.96)", "#ff0033");
  if (panelOne) {
    panelOne.position.set(3.2, 6.6, -11.3);
    cityGroup.add(panelOne);
  }

  const panelTwo = createNeonPanel("ABOUT", 5.7, 2.9, "rgba(14, 4, 9, 0.95)", "#ff0033");
  if (panelTwo) {
    panelTwo.position.set(-6.9, 5.1, -10.2);
    panelTwo.rotation.y = 0.34;
    cityGroup.add(panelTwo);
  }

  world.add(cityGroup);
}

function createHeroStage() {
  const textureScale = Math.min(window.devicePixelRatio, 2);
  const mirror = new Reflector(new THREE.PlaneGeometry(92, 60), {
    clipBias: 0.003,
    textureWidth: Math.floor(window.innerWidth * textureScale),
    textureHeight: Math.floor(window.innerHeight * textureScale),
    color: 0x13050d
  });
  mirror.rotation.x = -Math.PI * 0.5;
  mirror.position.y = -2.16;
  world.add(mirror);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(90, 56),
    new THREE.MeshStandardMaterial({
      color: 0x07070a,
      metalness: 0.95,
      roughness: 0.18,
      emissive: 0x19000d,
      emissiveIntensity: 0.34,
      transparent: true,
      opacity: 0.7
    })
  );
  floor.rotation.x = -Math.PI * 0.5;
  floor.position.y = -2.12;
  world.add(floor);

  const grid = new THREE.GridHelper(60, 52, 0xff2f57, 0x330d1e);
  grid.position.y = -2.08;
  grid.material.transparent = true;
  grid.material.opacity = 0.42;
  world.add(grid);

  screenTexture = createScreenTexture();

  if (screenTexture) {
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(13.5, 7.2),
      new THREE.MeshBasicMaterial({
        map: screenTexture,
        transparent: true,
        opacity: 0.95
      })
    );
    screen.position.set(0.1, 1.8, -2.65);
    screen.rotation.y = -0.06;
    world.add(screen);

    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.PlaneGeometry(13.7, 7.4)),
      new THREE.LineBasicMaterial({ color: 0xff6fa1, transparent: true, opacity: 0.72 })
    );
    frame.position.copy(screen.position);
    frame.rotation.copy(screen.rotation);
    world.add(frame);
  }
}

function createAvatarMesh() {
  avatarGroup = new THREE.Group();

  const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0e,
    metalness: 0.84,
    roughness: 0.21,
    emissive: 0x300017,
    emissiveIntensity: 0.44
  });

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.84, 3.1, 12, 18), coreMaterial);
  body.position.set(0, 0.2, -0.2);
  avatarGroup.add(body);

  const shoulder = new THREE.Mesh(
    new THREE.TorusGeometry(1.14, 0.2, 20, 64),
    coreMaterial.clone()
  );
  shoulder.rotation.x = Math.PI * 0.5;
  shoulder.position.set(0, 1.5, -0.14);
  avatarGroup.add(shoulder);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.68, 24, 20),
    coreMaterial.clone()
  );
  head.position.set(0.15, 2.25, 0.1);
  avatarGroup.add(head);

  const visor = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.44, 0.11, 150, 22, 2, 3),
    new THREE.MeshStandardMaterial({
      color: 0x2f0018,
      emissive: 0xff1262,
      emissiveIntensity: 0.95,
      roughness: 0.16,
      metalness: 0.72
    })
  );
  visor.position.set(0.35, 0.95, 0.2);
  visor.rotation.x = 0.3;
  avatarGroup.add(visor);

  for (let i = 0; i < 10; i += 1) {
    const control = [];
    const startX = (Math.random() - 0.5) * 0.9;
    const startY = 0.5 + Math.random() * 2;

    control.push(new THREE.Vector3(startX, startY, -0.1));
    control.push(new THREE.Vector3(startX + Math.random() * 2.5 - 1.25, startY - 0.8, -1.8));
    control.push(new THREE.Vector3(startX + Math.random() * 4.4 - 2.2, startY - 2.4, -2.8));

    const curve = new THREE.CatmullRomCurve3(control);
    const cable = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 90, 0.055, 10, false),
      new THREE.MeshStandardMaterial({
        color: 0x210313,
        emissive: 0xff1a5d,
        emissiveIntensity: 0.3,
        metalness: 0.83,
        roughness: 0.19
      })
    );

    cable.rotation.y = Math.random() * Math.PI * 2;
    cables.push(cable);
    avatarGroup.add(cable);
  }

  avatarGroup.position.set(1.55, -0.35, 1.1);
  avatarGroup.rotation.y = -0.52;

  world.add(avatarGroup);

  gsap.to(avatarGroup.rotation, {
    y: -0.34,
    duration: 3.1,
    yoyo: true,
    repeat: -1,
    ease: "sine.inOut"
  });
}

function createStars() {
  const geometry = new THREE.BufferGeometry();
  const count = 3600;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 88;
    positions[i3 + 1] = (Math.random() - 0.5) * 54;
    positions[i3 + 2] = (Math.random() - 0.5) * 104;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xca418c,
    size: 0.075,
    transparent: true,
    opacity: 0.84,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  starfield = new THREE.Points(geometry, material);
  world.add(starfield);
}

function createSceneLights() {
  const hemi = new THREE.HemisphereLight(0xff409c, 0x020206, 0.5);
  scene.add(hemi);

  pulseLight = new THREE.PointLight(0xff2f57, 1.8, 26, 1.2);
  pulseLight.position.set(2.8, 3.7, 4.4);
  scene.add(pulseLight);

  sideLight = new THREE.PointLight(0x71f8ff, 0.72, 24, 1.2);
  sideLight.position.set(-8.2, 4.4, -5.8);
  scene.add(sideLight);
}

function createPostProcessing() {
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.34,
    0.82,
    0.18
  );
  composer.addPass(bloomPass);

  afterimagePass = new AfterimagePass();
  afterimagePass.uniforms.damp.value = 0.89;
  composer.addPass(afterimagePass);

  rgbShiftPass = new ShaderPass(RGBShiftShader);
  rgbShiftPass.uniforms.amount.value = 0.0011;
  composer.addPass(rgbShiftPass);

  filmPass = new FilmPass(0.16, false);
  composer.addPass(filmPass);
}

function setRouteCamera(path) {
  if (path === "/about") {
    gsap.to(cameraTarget, {
      x: -2.85,
      y: 1.48,
      z: 10.85,
      lookX: -1.35,
      lookY: 0.72,
      lookZ: -1.25,
      duration: 0.95,
      ease: "power2.out"
    });

    if (world) {
      gsap.to(world.rotation, { y: 0.28, duration: 0.95, ease: "power2.out" });
    }

    return;
  }

  gsap.to(cameraTarget, {
    x: 0,
    y: 0.9,
    z: 9.35,
    lookX: 0,
    lookY: 0.4,
    lookZ: -0.5,
    duration: 0.95,
    ease: "power2.out"
  });

  if (world) {
    gsap.to(world.rotation, { y: 0, duration: 0.95, ease: "power2.out" });
  }
}

function animate(timeMs) {
  animationFrameId = window.requestAnimationFrame(animate);

  if (!scene || !camera || !world || !renderer || !composer) {
    return;
  }

  const t = timeMs * 0.001;
  world.position.y = Math.sin(t * 0.62) * 0.075;

  if (cityGroup) {
    cityGroup.rotation.y += 0.00042;
  }

  if (starfield) {
    starfield.rotation.y += 0.00045;
    starfield.rotation.x += 0.0001;
  }

  if (avatarGroup) {
    avatarGroup.position.y = -0.35 + Math.sin(t * 1.15) * 0.08;
  }

  for (let i = 0; i < cables.length; i += 1) {
    cables[i].rotation.z = Math.sin(t * 0.85 + i * 0.7) * 0.2;
  }

  const targetX = cameraTarget.x + pointer.x * 0.45;
  const targetY = cameraTarget.y + pointer.y * 0.24;
  const targetZ = cameraTarget.z + Math.sin(t * 0.22) * 0.22;

  camera.position.x += (targetX - camera.position.x) * 0.045;
  camera.position.y += (targetY - camera.position.y) * 0.045;
  camera.position.z += (targetZ - camera.position.z) * 0.04;

  camera.lookAt(cameraTarget.lookX, cameraTarget.lookY, cameraTarget.lookZ);

  if (pulseLight) {
    pulseLight.intensity = 1.46 + Math.sin(t * 2.35) * 0.34;
  }

  if (sideLight) {
    sideLight.intensity = 0.62 + Math.sin(t * 1.95 + 1.2) * 0.19;
  }

  if (rgbShiftPass) {
    rgbShiftPass.uniforms.amount.value = 0.0009 + (Math.sin(t * 2.6) + 1) * 0.00023;
  }

  if (filmPass) {
    filmPass.uniforms.intensity.value = 0.13 + (Math.sin(t * 1.3) + 1) * 0.02;
  }

  drawAnimatedScreen(timeMs);
  composer.render();
}

function onPointerMove(event) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  pointer.x = (event.clientX / width - 0.5) * 2;
  pointer.y = (event.clientY / height - 0.5) * 2;
}

function disposeSceneGraph(root) {
  root.traverse((object) => {
    if (object.geometry) {
      object.geometry.dispose();
    }

    if (!object.material) {
      return;
    }

    const disposeMaterial = (material) => {
      if (material.map) {
        material.map.dispose();
      }
      material.dispose();
    };

    if (Array.isArray(object.material)) {
      object.material.forEach((material) => disposeMaterial(material));
      return;
    }

    disposeMaterial(object.material);
  });
}

watch(
  () => route.path,
  (path) => {
    setRouteCamera(path);
  },
  { immediate: true }
);

onMounted(() => {
  if (isTestEnvironment() || !canvasHost.value) {
    return;
  }

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030306, 0.06);

  world = new THREE.Group();
  scene.add(world);

  camera = new THREE.PerspectiveCamera(
    46,
    window.innerWidth / window.innerHeight,
    0.1,
    160
  );
  camera.position.set(0, 0.9, 9.35);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.24;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.9));
  renderer.setSize(window.innerWidth, window.innerHeight);

  canvasHost.value.appendChild(renderer.domElement);

  createSceneLights();
  createCity();
  createHeroStage();
  createAvatarMesh();
  createStars();
  createPostProcessing();

  resizeHandler = () => {
    if (!renderer || !camera || !composer) {
      return;
    }

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);

    if (bloomPass) {
      bloomPass.setSize(window.innerWidth, window.innerHeight);
    }
  };

  window.addEventListener("mousemove", onPointerMove);
  window.addEventListener("resize", resizeHandler);

  setRouteCamera(route.path);
  animate(0);
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onPointerMove);

  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
  }

  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
  }

  if (scene) {
    disposeSceneGraph(scene);
  }

  if (screenTexture) {
    screenTexture.dispose();
  }

  if (composer && typeof composer.dispose === "function") {
    composer.dispose();
  }

  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
  }

  cables = [];
});
</script>
