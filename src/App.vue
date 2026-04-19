<template>
  <div class="app-shell">
    <BackgroundCanvas />
    <div class="vignette-layer"></div>

    <div class="ui-layer">
      <TopMenu />
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import BackgroundCanvas from "./components/BackgroundCanvas.vue";
import TopMenu from "./components/TopMenu.vue";
</script>
