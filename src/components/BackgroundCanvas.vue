<template>
  <div ref="canvasHost" class="background-canvas" aria-hidden="true"></div>
</template>

<script setup>
import { gsap } from "gsap";
import * as THREE from "three";
import { onBeforeUnmount, onMounted, ref } from "vue";

const canvasHost = ref(null);
let renderer;
let scene;
let camera;
let particles;
let animationFrameId;
let resizeHandler;

const pointer = {
  x: 0,
  y: 0
};

function isTestEnvironment() {
  return (
    typeof navigator !== "undefined" &&
    navigator.userAgent.toLowerCase().includes("jsdom")
  );
}

function createParticles() {
  const geometry = new THREE.BufferGeometry();
  const particleCount = 1800;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i += 1) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 25;
    positions[i3 + 1] = (Math.random() - 0.5) * 25;
    positions[i3 + 2] = (Math.random() - 0.5) * 25;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xff0033,
    size: 0.035,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);
}

function animate() {
  animationFrameId = window.requestAnimationFrame(animate);

  if (!particles || !renderer || !scene || !camera) {
    return;
  }

  particles.rotation.y += 0.0007;
  particles.rotation.x += 0.0003;

  const targetX = pointer.x * 0.09;
  const targetY = pointer.y * 0.06;
  camera.position.x += (targetX - camera.position.x) * 0.04;
  camera.position.y += (targetY - camera.position.y) * 0.04;
  camera.lookAt(0, 0, 0);

  renderer.render(scene, camera);
}

function onPointerMove(event) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  pointer.x = (event.clientX / width - 0.5) * 2;
  pointer.y = (event.clientY / height - 0.5) * 2;
}

onMounted(() => {
  if (isTestEnvironment() || !canvasHost.value) {
    return;
  }

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x050505, 8, 28);

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 8;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  canvasHost.value.appendChild(renderer.domElement);

  createParticles();

  gsap.fromTo(
    particles.material,
    { opacity: 0 },
    { opacity: 0.65, duration: 1.4, ease: "power2.out" }
  );

  resizeHandler = () => {
    if (!renderer || !camera) {
      return;
    }

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("mousemove", onPointerMove);
  window.addEventListener("resize", resizeHandler);
  animate();
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", onPointerMove);
  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
  }

  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
  }

  if (particles) {
    particles.geometry.dispose();
    particles.material.dispose();
  }

  if (renderer) {
    renderer.dispose();
    renderer.forceContextLoss();
  }
});
</script>
