# Roteiro de Implementação — Background 3D Cinematográfico para Portfólio

## 1. Objetivo do projeto

O objetivo é transformar a página inicial do meu site/portfólio em uma experiência visual mais imersiva, moderna e tecnológica, usando uma cena 3D animada como background principal.

A ideia não é criar um jogo completo, nem um personagem controlável. O foco é criar um ambiente 3D cinematográfico, com aparência ultra tecnológica, onde o portfólio seja apresentado dentro da própria cena, por meio de telões, painéis holográficos ou interfaces digitais.

A referência visual principal é o site:

https://samsy.ninja/

Porém, não quero copiar o site. Quero usar como inspiração a ideia de um ambiente 3D futurista, com painéis dentro da cena exibindo informações, projetos e links do meu portfólio.

---

## 2. Resultado esperado

Criar uma seção principal do site, preferencialmente a Home/Hero Section, com:

- Background 3D em tela cheia.
- Cenário futurista, tecnológico e cinematográfico.
- Um telão principal dentro da cena mostrando meu portfólio.
- Painéis secundários exibindo meus projetos pessoais.
- Animações sutis no ambiente.
- Câmera com movimento leve e automático.
- Interface HTML/CSS sobreposta ao canvas 3D.
- Visual premium, moderno, escuro, tecnológico e imersivo.

---

## 3. O que eu NÃO preciso

Este projeto não deve começar como um jogo completo.

Não preciso inicialmente de:

- Personagem controlável.
- Movimento com teclado.
- Movimento com mouse.
- Multiplayer.
- Sistema de colisão.
- Física complexa.
- Mundo aberto navegável.
- Mecânicas de gameplay.

O foco é exclusivamente em uma cena 3D animada e visualmente impactante como background do site.

---

## 4. Conceito visual desejado

O cenário deve parecer um ambiente tecnológico, como se fosse:

- Uma sala futurista.
- Um escritório cyberpunk.
- Um laboratório de tecnologia.
- Um quarto escuro de desenvolvedor com uma grande janela para a cidade.
- Um centro de comando com telas digitais.
- Um ambiente com painéis holográficos exibindo projetos.

A cena deve passar a sensação de:

- Tecnologia.
- Inteligência Artificial.
- Desenvolvimento de software.
- Portfólio premium.
- Ambiente futurista.
- Profissionalismo.
- Criatividade.
- Imersão.

---

## 5. Referência de composição

A composição desejada é parecida com esta ideia:

```txt
[ Câmera cinematográfica ]

        Telão principal
  ┌─────────────────────────┐
  │       Meu Portfólio      │
  │   Flowstech AI / Projetos│
  └─────────────────────────┘

 Painel lateral          Painel lateral
 Projeto 1               Projeto 2

        Ambiente futurista
        Luzes neon
        Névoa
        Reflexos
        Partículas
        Cidade ao fundo
```

A câmera pode ficar parada ou com um movimento muito sutil, como se estivesse em um take cinematográfico.

---

## 6. Elementos principais da cena 3D

A cena deve conter, se possível:

### Ambiente

- Sala escura futurista.
- Grande janela mostrando uma cidade tecnológica.
- Chão reflexivo.
- Luzes neon.
- Reflexos.
- Névoa leve.
- Partículas no ar.
- Hologramas ou interfaces digitais.
- Painéis flutuantes.
- Telão principal.

### Painéis

Os painéis devem apresentar conteúdos do meu portfólio, como:

- Nome do projeto.
- Screenshot do projeto.
- Stack utilizada.
- Descrição curta.
- Link para acessar.
- Link para GitHub ou documentação.
- Categoria do projeto.

### Projetos que podem aparecer

Alguns projetos que podem ser destacados:

- Flowstech AI
- Portfólio pessoal
- Lima Retratos
- Skills do Codex
- Documentação técnica
- Projetos de IA Conversacional
- Automações com n8n
- Projetos de backend e integrações

---

## 7. Funcionamento técnico esperado

O background deve ser renderizado em um elemento `<canvas>` ocupando toda a tela.

A estrutura visual deve funcionar assim:

```txt
Camada 1: Cena 3D full-screen
Camada 2: Efeitos visuais do cenário
Camada 3: Interface HTML do site
```

Exemplo conceitual:

```tsx
<main>
  <Scene3D />
  <OverlayUI />
</main>
```

O componente `Scene3D` renderiza o ambiente 3D.

O componente `OverlayUI` renderiza os textos, botões, navegação e chamadas principais do site.

---

## 8. Stack recomendada

A stack recomendada para esse projeto é:

### Front-end

- Next.js
- React
- TypeScript

### 3D

- Three.js
- React Three Fiber
- @react-three/drei
- @react-three/postprocessing

### Animações

- GSAP ou Framer Motion

### Modelagem e assets 3D

- Blender
- Modelos no formato `.glb` ou `.gltf`

### Texturas e vídeos

- `.webp` para imagens otimizadas.
- `.mp4` ou `.webm` para vídeos curtos em painéis.
- Texturas comprimidas quando necessário.

---

## 9. Possíveis abordagens para os painéis

### Opção 1 — Imagens como textura

Usar screenshots dos projetos como texturas aplicadas em planos 3D.

Essa é a opção mais simples, performática e recomendada para o início.

Exemplo:

```txt
Painel 1: Screenshot do Flowstech AI
Painel 2: Screenshot do Lima Retratos
Painel 3: Screenshot da documentação
Painel 4: Screenshot das Skills
```

### Opção 2 — Vídeo como textura

Usar vídeos curtos em loop mostrando o portfólio ou navegação nos projetos.

Essa opção deixa o visual mais premium, mas exige mais atenção com performance.

### Opção 3 — HTML sincronizado com a cena

Renderizar elementos HTML sobrepostos e alinhados aos painéis 3D.

Essa opção é mais complexa e deve ser usada apenas depois que o MVP estiver funcionando.

---

## 10. MVP recomendado

A primeira versão deve ser simples, funcional e bonita.

### MVP 1

Criar:

- Cena 3D em tela cheia.
- Câmera fixa ou levemente animada.
- Ambiente futurista simples.
- Um painel principal central.
- Três painéis secundários.
- Luzes neon.
- Bloom.
- Névoa leve.
- Interface HTML por cima.

### O MVP não precisa ter:

- Personagem.
- Movimento livre.
- Multiplayer.
- Sistema de física.
- Menus complexos dentro da cena.

---

## 11. Estrutura sugerida do projeto

```txt
src/
  app/
    page.tsx

  components/
    layout/
      Header.tsx
      HeroOverlay.tsx

    scene/
      Scene3D.tsx
      CameraRig.tsx
      Environment.tsx
      PortfolioPanels.tsx
      MainScreen.tsx
      FloatingPanel.tsx
      Lights.tsx
      Effects.tsx

  data/
    projects.ts

  public/
    models/
      cyber-room.glb
      city-background.glb

    textures/
      flowstech-ai.webp
      lima-retratos.webp
      skills-codex.webp
      portfolio.webp

    videos/
      portfolio-loop.webm
```

---

## 12. Componentes principais

### `Scene3D.tsx`

Responsável por criar o canvas e carregar a cena 3D.

Deve conter:

- Canvas.
- Câmera.
- Luzes.
- Ambiente.
- Painéis.
- Efeitos visuais.

---

### `CameraRig.tsx`

Responsável por controlar o movimento da câmera.

A câmera deve ter movimento sutil, como:

- Push-in lento.
- Pequeno deslocamento lateral.
- Parallax suave.
- Movimento quase imperceptível para dar vida à cena.

---

### `PortfolioPanels.tsx`

Responsável por renderizar os painéis do portfólio dentro da cena.

Cada painel pode receber dados de um arquivo `projects.ts`.

---

### `projects.ts`

Arquivo com os dados dos projetos.

Exemplo:

```ts
export const projects = [
  {
    title: "Flowstech AI",
    description: "Portfólio e ecossistema de projetos com foco em IA, automações e soluções digitais.",
    stack: ["Next.js", "React", "IA", "Automação"],
    image: "/textures/flowstech-ai.webp",
    url: "https://flowstechai.com"
  },
  {
    title: "Lima Retratos",
    description: "Projeto visual e fotográfico com landing page, documentação e experimentos com agentes.",
    stack: ["Next.js", "Design", "Frontend"],
    image: "/textures/lima-retratos.webp",
    url: "https://limaretratos.flowstechai.com"
  },
  {
    title: "Skills Codex",
    description: "Documentação de skills e fluxos criados para agentes no Codex.",
    stack: ["Documentação", "IA", "Agentes"],
    image: "/textures/skills-codex.webp",
    url: "https://doc.skills.flowstechai.com"
  }
]
```

---

## 13. Estilo visual desejado

A identidade visual deve seguir uma estética:

- Cyberpunk.
- Tech.
- Dark.
- Premium.
- Cinematográfica.
- Futurista.
- Com detalhes em neon.

### Paleta sugerida

```txt
Background escuro: #05070D
Azul profundo: #06111B
Azul tech: #0B1B2B
Vermelho neon: #FF1744
Ciano neon: #00E5FF
Branco azulado: #CFE3F4
Cinza tecnológico: #6E8CA6
```

---

## 14. Efeitos visuais desejados

A cena pode usar:

- Bloom.
- Vignette.
- Noise sutil.
- Chromatic aberration leve.
- Depth of field.
- Fog.
- Partículas.
- Reflexos.
- Luzes emissivas.
- Animações de flicker em telas.
- Scanlines leves em painéis.

Os efeitos devem deixar o visual bonito, mas sem prejudicar a legibilidade nem a performance.

---

## 15. Performance

O projeto precisa ser bonito, mas também performático.

A agente deve tomar cuidado com:

- Tamanho dos modelos 3D.
- Peso das texturas.
- Quantidade de luzes.
- Quantidade de objetos.
- Uso excessivo de pós-processamento.
- Performance em notebook e mobile.
- Carregamento inicial do site.

### Boas práticas

- Usar modelos `.glb` otimizados.
- Usar texturas `.webp`.
- Comprimir modelos com Draco, se necessário.
- Fazer lazy loading.
- Criar fallback para dispositivos fracos.
- Evitar vídeos muito pesados.
- Evitar cena complexa demais na primeira versão.

---

## 16. Responsividade

O background 3D deve funcionar bem em desktop.

Para mobile, pode haver uma versão simplificada.

### Desktop

- Cena 3D completa.
- Painéis visíveis.
- Câmera cinematográfica.
- Efeitos ativos.

### Mobile

- Cena reduzida.
- Menos efeitos.
- Possível uso de imagem ou vídeo de fallback.
- Interface mais limpa e legível.

---

## 17. Comportamento esperado na Home

A Home pode ter a seguinte estrutura:

```txt
[ Background 3D ]

Topo:
- Logo ou nome
- Menu simples

Centro:
- Nome
- Cargo
- Frase de impacto
- Botão para ver projetos
- Botão para contato

Dentro da cena:
- Telão com destaque do portfólio
- Painéis com projetos pessoais
- Luzes e animações sutis

Rodapé da dobra:
- Indicação de scroll
```

---

## 18. Conteúdo textual sugerido

### Headline

```txt
Engenharia de Software, IA Conversacional e Automações Inteligentes
```

### Subheadline

```txt
Crio soluções digitais integrando backend, APIs, bancos de dados, agentes de IA e automações para transformar processos em sistemas funcionais.
```

### Botões

```txt
Ver Projetos
Entrar em Contato
```

---

## 19. Critérios de aceite

A primeira versão será considerada boa quando:

- A Home tiver um background 3D funcionando.
- O cenário tiver aparência tecnológica e cinematográfica.
- Existir pelo menos um telão principal dentro da cena.
- Os painéis exibirem projetos reais do meu portfólio.
- A interface do site continuar legível.
- A performance estiver aceitável no desktop.
- A cena não parecer apenas decorativa, mas integrada ao conceito do portfólio.
- O visual comunicar tecnologia, IA, software e criatividade.
- O site continuar navegável e funcional.

---

## 20. Ordem de execução recomendada

A agente deve me direcionar passo a passo, seguindo esta ordem:

### Etapa 1 — Diagnóstico do site atual

Analisar:

- Stack atual do site.
- Estrutura de pastas.
- Framework utilizado.
- Página inicial atual.
- Componentes existentes.
- Estilo visual atual.
- Possibilidades de integração com Three.js.

---

### Etapa 2 — Definir abordagem técnica

Decidir entre:

- Cena 3D real-time com React Three Fiber.
- Vídeo 3D pré-renderizado como background.
- Abordagem híbrida.

A preferência inicial é usar cena 3D real-time com React Three Fiber, desde que a performance seja viável.

---

### Etapa 3 — Criar MVP da cena

Criar:

- Canvas full-screen.
- Câmera.
- Luzes.
- Fundo escuro.
- Um painel 3D simples.
- Textura de um projeto aplicada ao painel.

---

### Etapa 4 — Criar composição visual

Adicionar:

- Ambiente futurista.
- Painéis secundários.
- Luzes neon.
- Animações sutis.
- Movimento leve de câmera.

---

### Etapa 5 — Integrar conteúdo real

Adicionar dados reais dos projetos:

- Título.
- Descrição.
- Stack.
- Screenshot.
- Link.
- GitHub, quando houver.

---

### Etapa 6 — Adicionar pós-processamento

Adicionar com cuidado:

- Bloom.
- Vignette.
- Noise.
- Fog.
- Depth of field, se fizer sentido.

---

### Etapa 7 — Otimizar

Melhorar:

- Peso dos assets.
- Carregamento inicial.
- Performance.
- Responsividade.
- Fallback mobile.

---

### Etapa 8 — Refinar UI final

Ajustar:

- Textos.
- Botões.
- Menu.
- Espaçamentos.
- Contraste.
- Legibilidade.
- Experiência geral.

---

## 21. Direcionamento para a agente

A agente deve atuar como uma especialista em:

- Front-end moderno.
- React/Next.js.
- Three.js.
- React Three Fiber.
- Design criativo.
- Performance web.
- Experiências visuais imersivas.
- Portfólios criativos para desenvolvedores.

A agente deve sempre considerar que o objetivo não é criar complexidade desnecessária, mas sim entregar uma experiência visual forte, funcional e viável.

---

## 22. Prompt de orientação para a agente

Use este direcionamento para conduzir o desenvolvimento:

```txt
Você é uma agente especialista em Creative Frontend Engineering, Three.js, React Three Fiber, Next.js e experiências visuais imersivas para portfólios.

Meu objetivo é transformar a Home do meu site em uma experiência 3D cinematográfica, usando um background renderizado em tempo real com canvas.

Eu não quero criar um jogo completo. Não preciso de personagem controlável, movimento com teclado, multiplayer ou física complexa.

Quero uma cena 3D futurista, tecnológica e premium, com painéis ou telões dentro do cenário exibindo meus projetos pessoais, como se o portfólio estivesse integrado ao ambiente.

Sua função é me guiar passo a passo para implementar isso no meu site atual, analisando primeiro a stack existente, depois propondo a melhor arquitetura, criando um MVP simples e evoluindo para uma cena mais bonita, performática e responsiva.

Sempre priorize:
- Clareza.
- Performance.
- Organização do código.
- Visual premium.
- Manutenção futura.
- Integração com o conteúdo real do meu portfólio.
- Evolução por etapas.

Antes de sugerir código final, entenda a estrutura atual do projeto e proponha a melhor forma de integrar a cena 3D sem quebrar o site existente.
```

---

## 23. Resumo final

O projeto consiste em criar uma Home com background 3D cinematográfico, inspirado em sites interativos e experiências visuais de jogos, mas sem mecânicas complexas.

A cena deve funcionar como uma vitrine imersiva do meu portfólio, onde meus projetos aparecem em telões e painéis dentro de um ambiente futurista.

A solução ideal deve usar Next.js, React Three Fiber, Three.js, Drei, Postprocessing e assets otimizados em GLB/GLTF, com foco em performance, estética premium e manutenção.
