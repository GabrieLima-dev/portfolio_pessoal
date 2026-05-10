<template>
  <section
    ref="railRoot"
    class="works-rail"
    data-testid="works-rail"
    @mousemove="onStagePointerMove"
    @pointermove="onStagePointerMove"
    @mouseleave="resetStagePointer"
  >
    <div class="works-rain" aria-hidden="true">
      <span
        v-for="drop in rainDrops"
        :key="drop.id"
        class="rain-drop"
        data-testid="rain-drop"
        :style="{
          '--drop-x': `${drop.x}%`,
          '--drop-delay': `${drop.delay}s`,
          '--drop-speed': `${drop.speed}s`,
          '--drop-length': `${drop.length}px`
        }"
      ></span>
    </div>

    <div class="work-backdrop-tunnel" aria-hidden="true">
      <article
        v-for="panel in displayPanels"
        :key="panel.id"
        class="work-video-panel"
        :class="panel.className"
        data-testid="work-video-panel"
        :style="{
          '--panel-x': `${panel.x}vw`,
          '--panel-y': `${panel.y}px`,
          '--panel-z': `${panel.z}px`,
          '--panel-delay': `${panel.delay}s`,
          '--panel-duration': `${panel.duration}s`,
          '--panel-scale': panel.scale,
          '--panel-image': `url(${panel.project.panelImageSrc})`
        }"
      >
        <div class="work-video-panel-media"></div>
        <div class="work-video-noise"></div>
        <span>{{ panel.code }}</span>
        <strong>{{ panel.project.title }}</strong>
        <small>{{ panel.project.role }}</small>
      </article>
    </div>

    <div class="work-reflective-floor" data-testid="work-reflective-floor" aria-hidden="true">
      <span class="floor-panel-reflection floor-stage-reflection"></span>
      <span
        v-for="panel in floorReflections"
        :key="`reflection-${panel.id}`"
        class="floor-panel-reflection"
        :class="panel.className"
        data-testid="work-panel-reflection"
        :style="{
          '--reflection-x': `${panel.x}vw`,
          '--reflection-y': `${panel.y}px`,
          '--reflection-scale': panel.scale,
          '--reflection-delay': `${panel.delay}s`
        }"
      ></span>
    </div>

    <article class="work-stage-visual" data-testid="work-stage-visual" aria-live="polite">
      <Transition name="stage-swap" mode="out-in">
        <div
          v-if="activeWork"
          :key="activeWork.id"
          ref="stagePanel"
          class="work-stage-screen"
          :class="`work-stage-screen-${activeWork.id}`"
        >
          <div class="work-media-plane">
            <video
              v-if="activeWork.video?.previewSrc"
              class="work-stage-video work-stage-video-preview"
              :class="{ 'is-hidden': isHighReady }"
              :src="activeWork.video.previewSrc"
              :aria-label="`Preview em baixa qualidade do projeto ${activeWork.title}`"
              autoplay
              muted
              loop
              playsinline
              preload="auto"
            ></video>
            <video
              class="work-stage-video"
              data-testid="work-stage-video"
              :class="{ 'is-ready': isHighReady }"
              :src="highVideoSrc"
              :aria-label="activeWork.video?.label ?? `Video demonstrativo em loop do projeto ${activeWork.title}`"
              @loadeddata="onHighVideoLoaded"
              @error="onHighVideoLoaded"
              autoplay
              muted
              loop
              playsinline
              preload="auto"
            ></video>
          </div>
          <div class="work-floor-reflection" aria-hidden="true"></div>

          <div class="work-copy">
            <p class="work-stage-role">{{ activeWork.role }}</p>
            <h3>{{ activeWork.title }}</h3>
            <p class="work-stage-summary">{{ activeWork.summary }}</p>

            <div class="work-actions">
              <button type="button" @click="isInfoOpen = !isInfoOpen">INFOS</button>
              <a :href="visitLink" target="_blank" rel="noreferrer">VISIT</a>
            </div>
          </div>

          <div v-if="isInfoOpen" class="work-info-panel">
            <p>{{ activeWork.details }}</p>
            <ul>
              <li v-for="tag in activeWork.tags" :key="tag">{{ tag }}</li>
            </ul>
          </div>
        </div>
      </Transition>
    </article>

    <nav class="work-controls" aria-label="Trocar projeto">
      <button type="button" class="work-nav-button" @click="goToPrevious">‹</button>
      <button type="button" class="work-nav-button" @click="goToNext">›</button>
      <span>Next / Prev.</span>
    </nav>

    <nav class="work-sequencer" aria-label="Selecionar projeto">
      <button
        v-for="(work, index) in works"
        :key="work.id"
        :ref="(el) => setSequencerRef(el, index)"
        class="work-sequencer-item"
        :class="{ active: activeWork?.id === work.id }"
        data-testid="work-sequencer-item"
        @mouseenter="setActive(work.id)"
        @focus="setActive(work.id)"
        @click="setActive(work.id)"
      >
        <span>{{ index + 1 }}. {{ work.title }}</span>
      </button>
    </nav>
  </section>
</template>

<script setup>
import { gsap } from "gsap";
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();
const railRoot = ref(null);
const stagePanel = ref(null);
const sequencerRefs = ref([]);
const panelAssignments = ref([]);
const isInfoOpen = ref(false);
const isHighReady = ref(false);
const highVideoSrc = ref("");
let highVideoLoadTimer = null;
let activeVideoToken = 0;
const rainDrops = Array.from({ length: 28 }, (_, index) => ({
  id: `drop-${index}`,
  x: (index * 37) % 100,
  delay: -((index * 0.17) % 1.8).toFixed(2),
  speed: 1.05 + (index % 5) * 0.12,
  length: 12 + (index % 4) * 7
}));

const panelLayouts = [
  { id: "v-01", code: "SYS 01", x: -43, y: 32, z: -150, delay: -0.2, duration: 13, scale: 1.04, className: "panel-left panel-red panel-poster" },
  { id: "v-02", code: "SYS 02", x: -6, y: -30, z: -250, delay: -1.5, duration: 15, scale: 0.86, className: "panel-center panel-cyan panel-hud" },
  { id: "v-03", code: "SYS 03", x: 36, y: 34, z: -190, delay: -2.7, duration: 14, scale: 0.95, className: "panel-right panel-green panel-hud" },
  { id: "v-04", code: "CAM 04", x: -38, y: 232, z: -320, delay: -4.2, duration: 16, scale: 0.68, className: "panel-left panel-amber panel-poster" },
  { id: "v-05", code: "CAM 05", x: 18, y: 160, z: -290, delay: -5.8, duration: 17, scale: 0.76, className: "panel-center panel-red panel-hud" },
  { id: "v-06", code: "CAM 06", x: 45, y: 246, z: -360, delay: -7.1, duration: 15, scale: 0.62, className: "panel-right panel-cyan panel-wide" },
  { id: "v-07", code: "CAM 07", x: -48, y: -56, z: -420, delay: -8.5, duration: 18, scale: 0.62, className: "panel-left panel-green panel-grid" },
  { id: "v-08", code: "CAM 08", x: 47, y: -48, z: -390, delay: -9.6, duration: 16, scale: 0.66, className: "panel-right panel-amber panel-hud" },
  { id: "v-09", code: "CAM 09", x: -2, y: 302, z: -470, delay: -10.8, duration: 19, scale: 0.55, className: "panel-center panel-red panel-wide" }
];

const floorReflections = panelLayouts.slice(0, 7).map((panel, index) => ({
  id: panel.id,
  x: panel.x * 0.82,
  y: 28 + index * 18,
  scale: Number((panel.scale * 0.82).toFixed(2)),
  delay: panel.delay,
  className: panel.className
}));

const works = computed(() => store.state.works);
const displayPanels = computed(() => {
  return panelLayouts.map((panel, index) => ({
    ...panel,
    project: panelAssignments.value[index] ?? works.value[index % works.value.length]
  }));
});
const activeWork = computed(() => store.getters.activeWork);
const activeIndex = computed(() => {
  return works.value.findIndex((work) => work.id === activeWork.value?.id);
});

const visitLink = computed(() => {
  return activeWork.value?.links?.[0]?.url ?? "#";
});

function setActive(workId) {
  isInfoOpen.value = false;
  store.commit("setActiveWorkId", workId);
}

function setSequencerRef(el, index) {
  if (el) {
    sequencerRefs.value[index] = el;
  }
}

function goToPrevious() {
  if (!works.value.length) {
    return;
  }

  const nextIndex = activeIndex.value <= 0 ? works.value.length - 1 : activeIndex.value - 1;
  setActive(works.value[nextIndex].id);
}

function goToNext() {
  if (!works.value.length) {
    return;
  }

  const nextIndex = activeIndex.value >= works.value.length - 1 ? 0 : activeIndex.value + 1;
  setActive(works.value[nextIndex].id);
}

function onKeyDown(event) {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goToPrevious();
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    goToNext();
  }
}

function formatMotionValue(value, unit) {
  return `${Number(value.toFixed(1))}${unit}`;
}

function onStagePointerMove(event) {
  const railElement = railRoot.value ?? document.querySelector("[data-testid='works-rail']");

  if (!railElement) {
    return;
  }

  const rect = railElement.getBoundingClientRect();
  const width = rect.width || window.innerWidth || 1;
  const height = rect.height || window.innerHeight || 1;
  const x = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / width - 0.5));
  const y = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / height - 0.5));

  railElement.style.setProperty("--panel-tilt-y", formatMotionValue(x * 34, "deg"));
  railElement.style.setProperty("--panel-tilt-x", formatMotionValue(y * -18, "deg"));
  railElement.style.setProperty("--panel-shift-x", formatMotionValue(x * 96, "px"));
  railElement.style.setProperty("--panel-shift-y", formatMotionValue(y * 42, "px"));
  railElement.style.setProperty("--scene-shift-x", formatMotionValue(x * -42, "px"));
  railElement.style.setProperty("--scene-shift-y", formatMotionValue(y * -18, "px"));
}

function resetStagePointer() {
  const railElement = railRoot.value ?? document.querySelector("[data-testid='works-rail']");

  if (!railElement) {
    return;
  }

  railElement.style.setProperty("--panel-tilt-y", "0deg");
  railElement.style.setProperty("--panel-tilt-x", "0deg");
  railElement.style.setProperty("--panel-shift-x", "0px");
  railElement.style.setProperty("--panel-shift-y", "0px");
  railElement.style.setProperty("--scene-shift-x", "0px");
  railElement.style.setProperty("--scene-shift-y", "0px");
}

function assignPanels() {
  if (!works.value.length) {
    panelAssignments.value = [];
    return;
  }

  panelAssignments.value = panelLayouts.map((_, index) => {
    const randomIndex = Math.floor(Math.random() * works.value.length);
    return works.value[(randomIndex + index) % works.value.length];
  });
}

function queueHighVideoLoad() {
  activeVideoToken += 1;
  const token = activeVideoToken;

  isHighReady.value = false;
  highVideoSrc.value = "";

  if (highVideoLoadTimer) {
    clearTimeout(highVideoLoadTimer);
  }

  highVideoLoadTimer = window.setTimeout(() => {
    if (token !== activeVideoToken) {
      return;
    }

    highVideoSrc.value = activeWork.value?.video?.src ?? "";
  }, 140);
}

function onHighVideoLoaded() {
  isHighReady.value = true;
}

if (typeof document !== "undefined") {
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("mousemove", onStagePointerMove);
  document.addEventListener("pointermove", onStagePointerMove);
  window.addEventListener("mousemove", onStagePointerMove);
}

onMounted(() => {
  assignPanels();
  const railElement = railRoot.value ?? document.querySelector("[data-testid='works-rail']");
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("mousemove", onStagePointerMove);
  document.addEventListener("pointermove", onStagePointerMove);
  window.addEventListener("mousemove", onStagePointerMove);
  railElement?.addEventListener("mousemove", onStagePointerMove);
  railElement?.addEventListener("pointermove", onStagePointerMove);
  const validSequencerRefs = sequencerRefs.value.filter(Boolean);

  if (validSequencerRefs.length) {
    gsap.fromTo(
      validSequencerRefs,
      { scaleY: 0.35, opacity: 0.25 },
      {
        scaleY: 1,
        opacity: 1,
        transformOrigin: "center bottom",
        duration: 0.7,
        stagger: 0.02,
        ease: "power2.out"
      }
    );
  }
});

onBeforeUnmount(() => {
  const railElement = railRoot.value ?? document.querySelector("[data-testid='works-rail']");

  document.removeEventListener("keydown", onKeyDown);
  document.removeEventListener("mousemove", onStagePointerMove);
  document.removeEventListener("pointermove", onStagePointerMove);
  window.removeEventListener("mousemove", onStagePointerMove);
  railElement?.removeEventListener("mousemove", onStagePointerMove);
  railElement?.removeEventListener("pointermove", onStagePointerMove);

  if (highVideoLoadTimer) {
    clearTimeout(highVideoLoadTimer);
  }
});

watch(activeWork, async () => {
  queueHighVideoLoad();
  await nextTick();

  if (!stagePanel.value) {
    return;
  }

  gsap.fromTo(
    stagePanel.value,
    { opacity: 0, filter: "blur(12px)" },
    { opacity: 1, filter: "blur(0px)", duration: 0.62, ease: "power3.out" }
  );
}, { immediate: true });
</script>
