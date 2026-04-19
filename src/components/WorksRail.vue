<template>
  <section class="works-rail">
    <div class="works-rail-track" aria-label="Lista de projetos">
      <article
        v-for="work in works"
        :key="work.id"
        class="work-card"
        :class="{ active: activeWork?.id === work.id }"
        data-testid="work-card"
        tabindex="0"
        @mouseenter="setActive(work.id)"
        @focus="setActive(work.id)"
      >
        <p class="work-meta">{{ work.year }} · {{ work.role }}</p>
        <h3>{{ work.title }}</h3>
        <p class="work-summary">{{ work.summary }}</p>
      </article>
    </div>

    <aside v-if="activeWork" class="work-detail" aria-live="polite">
      <p class="work-detail-label">Projeto em destaque</p>
      <h4>{{ activeWork.title }}</h4>
      <p>{{ activeWork.summary }}</p>

      <ul class="work-tags">
        <li v-for="tag in activeWork.tags" :key="tag">
          {{ tag }}
        </li>
      </ul>

      <a :href="activeWork.link" target="_blank" rel="noreferrer">
        Abrir referência
      </a>
    </aside>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { gsap } from "gsap";

const store = useStore();

const works = computed(() => store.state.works);
const activeWork = computed(() => store.getters.activeWork);

function setActive(workId) {
  store.commit("setActiveWorkId", workId);
}

onMounted(() => {
  if (!document.querySelector(".work-card")) {
    return;
  }

  gsap.from(".work-card", {
    y: 24,
    opacity: 0,
    stagger: 0.08,
    duration: 0.7,
    ease: "power3.out"
  });
});
</script>
