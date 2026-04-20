<template>
  <div class="app-shell">
    <BackgroundCanvas />
    <div class="ambient ambient-one"></div>
    <div class="ambient ambient-two"></div>
    <div class="vignette-layer"></div>

    <div class="ui-layer">
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
  </div>
</template>

<script setup>
import { gsap } from "gsap";
import { RouterView } from "vue-router";
import BackgroundCanvas from "./components/BackgroundCanvas.vue";
import TopMenu from "./components/TopMenu.vue";

function onBeforeEnter(el) {
  gsap.set(el, { opacity: 0, y: 22, filter: "blur(10px)" });
}

function onEnter(el, done) {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.62,
    ease: "power3.out",
    onComplete: done
  });
}

function onLeave(el, done) {
  gsap.to(el, {
    opacity: 0,
    y: -10,
    filter: "blur(8px)",
    duration: 0.28,
    ease: "power1.out",
    onComplete: done
  });
}
</script>
