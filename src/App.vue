<template>
  <div class="app-shell">
    <BackgroundCanvas />
    <div class="noise-layer"></div>
    <div class="scanline-layer"></div>
    <div class="glitch-layer"></div>
    <div class="chromatic-layer"></div>
    <div class="vignette-layer"></div>

    <div class="ui-layer">
      <aside class="hud-left" aria-hidden="true">
        <h1>GBRL° 26'</h1>
        <p>-------------------------------------</p>
        <p>Creative development & experience engineering</p>
      </aside>

      <p class="hud-debug" aria-hidden="true">MISSION: SELECT A PROJECT TO ENTER</p>

      <TopMenu />
      <RouterView v-slot="{ Component, route }">
        <Transition
          mode="out-in"
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @leave="onLeave"
        >
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </div>

    <TechnoRadio />
  </div>
</template>

<script setup>
import { gsap } from "gsap";
import { RouterView } from "vue-router";
import BackgroundCanvas from "./components/BackgroundCanvas.vue";
import TechnoRadio from "./components/TechnoRadio.vue";
import TopMenu from "./components/TopMenu.vue";

function onBeforeEnter(el) {
  gsap.set(el, { opacity: 0, y: 28, filter: "blur(12px)" });
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.7,
    ease: "power3.out",
    onComplete: done
  });
}

function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    y: -16,
    filter: "blur(10px)",
    duration: 0.28,
    ease: "power1.out",
    onComplete: done
  });
}
</script>
