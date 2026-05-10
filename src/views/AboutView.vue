<template>
  <section id="about" class="about-page">
    <div class="about-editorial" data-testid="about-editorial">
      <div class="about-primary">
        <h1>Gabriel de Souza Lima</h1>
        <p class="about-lead">
          Desenvolvedor Full Stack com atuação prática na construção, evolução e sustentação de
          soluções digitais, integrações e fluxos de IA aplicados ao negócio.
        </p>

        <div class="about-links">
          <a href="https://github.com/GabrieLima-dev" target="_blank" rel="noreferrer">[GITHUB]</a>
          <a href="https://www.linkedin.com/in/gabriellima-dev/" target="_blank" rel="noreferrer"
            >[LINKEDIN]</a
          >
        </div>
      </div>

      <div class="about-secondary" aria-label="Resumo técnico">
        <article class="about-showcase">
          <Transition name="stage-swap" mode="out-in">
            <section :key="activePanel.id" class="about-showcase-window">
              <p class="about-showcase-label">{{ activePanel.label }}</p>
              <h2>{{ activePanel.title }}</h2>

              <p v-if="activePanel.text" class="about-showcase-copy">
                {{ activePanel.text }}
              </p>

              <ul v-if="activePanel.items" class="about-showcase-list">
                <li v-for="item in activePanel.items" :key="item">{{ item }}</li>
              </ul>
            </section>
          </Transition>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const aboutPanels = [
  {
    id: "resume",
    label: "Resumo profissional",
    title: "Visão de ponta a ponta",
    text: "Atuação transversal do levantamento de requisitos até testes, monitoramento, correção de falhas e melhoria contínua, sempre com foco em contexto, aderência ao negócio e sustentação em produção.",
  },
  {
    id: "ai",
    label: "IA aplicada",
    title: "Construção de fluxos com IA",
    items: [
      "RAG e embeddings",
      "Reranking e agents",
      "Tool calling e structured outputs",
      "Evals, observability e guardrails",
      "Prompts estruturados e extração de dados",
    ],
  },
  {
    id: "software",
    label: "Engenharia de software",
    title: "Base sólida de produto e código",
    items: [
      "C#/.NET, Java e Spring Boot",
      "React, JavaScript, HTML e CSS",
      "SQL Server, Azure SQL e MySQL",
      "Queries, procedures e modelagem relacional",
      "Correção de falhas e modernização de legados",
    ],
  },
  {
    id: "integrations",
    label: "Integrações e automação",
    title: "Sistemas conectados ao negócio",
    items: [
      "APIs REST e webhooks",
      "OpenAI, CRMs e plataformas de atendimento",
      "WhatsApp API, n8n e Make",
      "Automação de fluxos e operações de negócio",
      "Pré-venda, pós-venda, suporte e qualificação",
    ],
  },
  {
    id: "quality",
    label: "Qualidade e operação",
    title: "Entrega com sustentação",
    items: [
      "QA e testes funcionais",
      "Validação de APIs REST com Postman",
      "Monitoramento e análise de falhas",
      "Sustentação em produção",
      "Documentação técnica e regras de negócio",
    ],
  },
  {
    id: "approach",
    label: "Abordagem",
    title: "Tecnologia aplicada com contexto",
    text: "Atuação prática em evolução de produtos, integrações, dados, qualidade e operação, conectando implementação técnica com necessidades reais de negócio.",
  },
];

const activePanelIndex = ref(0);
let panelIntervalId = null;

const activePanel = computed(() => {
  return aboutPanels[activePanelIndex.value] ?? aboutPanels[0];
});

function setActivePanel(index) {
  activePanelIndex.value = index;
}

function goToNextPanel() {
  activePanelIndex.value = (activePanelIndex.value + 1) % aboutPanels.length;
}
onMounted(() => {
  panelIntervalId = window.setInterval(goToNextPanel, 5000);
});

onBeforeUnmount(() => {
  if (panelIntervalId) {
    window.clearInterval(panelIntervalId);
  }
});
</script>
