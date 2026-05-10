import dbankVideo from "../../assets/dbank.mp4";
import limaRetratosVideo from "../../assets/lima_retrato.mp4";
import sdrVirtualVideo from "../../assets/sdr_virtual.mp4";
import dbankPreviewVideo from "../../assets/previews/dbank-preview.m4v";
import limaRetratosPreviewVideo from "../../assets/previews/lima_retratos-preview.m4v";
import sdrVirtualPreviewVideo from "../../assets/previews/sdr-virtual-preview.m4v";
import dbankPanelImage from "../../assets/panels/dbank-panel.png";
import limaRetratosPanelImage from "../../assets/panels/lima-retratos-panel.png";
import sdrVirtualPanelImage from "../../assets/panels/sdr-virtual-panel.png";

const works = [
  {
    id: "dbank",
    title: "Dbank",
    role: "Landing / API Bancaria Assincrona",
    year: "2026",
    summary:
      "Landing page para demonstracao de Desafio DIO de uma API bancaria assincrona com Python, FastAPI e SQLite.",
    details:
      "Cadastro, autenticacao JWT, deposito, saque, extrato e documentacao OpenAPI.",
    tags: ["HTML/CSS", "JS", "Python", "FastAPI", "SQLite", "JWT", "React"],
    video: {
      previewSrc: dbankPreviewVideo,
      src: dbankVideo,
      label: "Video demonstrativo em loop do projeto Dbank",
    },
    panelImageSrc: dbankPanelImage,
    links: [
      {
        label: "Visit",
        url: "https://dbank.flowstechai.com/",
      },
    ],
  },
  {
    id: "sdr-virtual",
    title: "SDR Virtual Inteligente",
    role: "Documentacao / Automacao de Pre-vendas",
    year: "2026",
    summary:
      "Documentacao do planejamento de automacao de pre-vendas via WhatsApp com IA, n8n e operacao escalavel.",
    details: "Atendimento automatico, follow-up e integracao com mensageria.",
    tags: ["IA", "n8n", "PostgreSQL", "Redis", "FastAPI/Spring Boot", "VPS"],
    video: {
      previewSrc: sdrVirtualPreviewVideo,
      src: sdrVirtualVideo,
      label: "Video demonstrativo em loop do projeto SDR Virtual Inteligente",
    },
    panelImageSrc: sdrVirtualPanelImage,
    links: [
      {
        label: "Visit",
        url: "https://sdr.flowstechai.com/",
      },
    ],
  },
  {
    id: "lima-retratos",
    title: "Lima Retratos",
    role: "Hospedagem de Fotos / Area do Cliente",
    year: "2026",
    summary:
      "Sistema profissional de hospedagem de fotos com token para cliente e acesso exclusivo para fotografos.",
    details:
      "Acesso por token, galerias privadas, downloads protegidos e integracao com Google Drive.",
    tags: ["Python", "JavaScript", "HTML/CSS", "Google Drive", "API dedicada"],
    video: {
      previewSrc: limaRetratosPreviewVideo,
      src: limaRetratosVideo,
      label: "Video demonstrativo em loop do projeto Lima Retratos",
    },
    panelImageSrc: limaRetratosPanelImage,
    links: [
      {
        label: "Visit",
        url: "https://limaretratos.flowstechai.com/",
      },
    ],
  },
];

export default works;
