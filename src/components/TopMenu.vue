<template>
  <header class="top-menu">
    <div class="menu-surface" aria-label="Navegação principal">
      <nav aria-label="Navegação principal">
        <RouterLink
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          class="menu-pill"
          :class="{ active: isActive(item.to) }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const menuItems = [
  { label: "WORKS", to: "/works" },
  { label: "ABOUT", to: "/about" }
];

const currentPath = computed(() => route.path);

function isActive(path) {
  return currentPath.value === path;
}
</script>
