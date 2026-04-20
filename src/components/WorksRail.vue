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

        <div class="work-link-row">
          <a
            v-for="link in work.links"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noreferrer"
            @click.stop
          >
            {{ link.label }}
          </a>
        </div>
      </article>
    </div>

    <Transition name="fade-up" mode="out-in">
      <aside v-if="activeWork" :key="activeWork.id" class="work-detail" aria-live="polite">
        <p class="work-detail-label">Projeto em destaque</p>
        <h4>{{ activeWork.title }}</h4>
        <p>{{ activeWork.summary }}</p>
        <p class="work-detail-text">{{ activeWork.details }}</p>

        <ul class="work-tags">
          <li v-for="tag in activeWork.tags" :key="tag">
            {{ tag }}
          </li>
        </ul>

        <div class="work-detail-links">
          <a
            v-for="link in activeWork.links"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noreferrer"
          >
            {{ link.label }}
          </a>
        </div>
      </aside>
    </Transition>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, watch } from "vue";
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
    duration: 0.95,
    ease: "power3.out"
  });
});

watch(activeWork, async () => {
  await nextTick();

  if (!document.querySelector(".work-detail")) {
    return;
  }

  gsap.fromTo(
    ".work-detail",
    { y: 18, opacity: 0, filter: "blur(8px)" },
    { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.52, ease: "power2.out" }
  );
});
</script>
