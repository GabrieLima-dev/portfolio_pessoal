# Benchmark visual - samsy.ninja

Data da analise: 2026-04-25

Referencia principal: https://samsy.ninja/

Escopo: analisar visualmente as paginas Works e About do site de referencia, registrar padroes de design e comparar com o projeto atual `portfolio_pessoal`.

## 1. Fontes e evidencias

Fontes usadas:

- Site publico `https://samsy.ninja/`.
- HTML publico da pagina inicial.
- CSS publico `https://samsy.ninja/assets/css/main-rb3R8F1q.css`.
- Bundle JS publico `https://samsy.ninja/assets/js/main-ITpbzWAg.js`, usado apenas para identificar stack, bibliotecas e nomes de elementos.
- Video enviado pelo usuario: `Gravacao de Tela 2026-04-25 as 14.18.40.mov`.
- Screenshots extraidos temporariamente do video nos tempos aproximados 0s, 4s, 8s, 12s, 16s, 20s e 24s.
- Screenshots do projeto atual em `/works` e `/about`, capturados localmente para comparacao.

Limitacoes:

- O site de referencia e uma experiencia WebGL/WebGPU com animacao continua; screenshots estaticos nao capturam toda a sensacao de camera, easing, profundidade, interpolacao e resposta ao mouse.
- O Chrome headless capturou apenas o preloader do `samsy.ninja`; a leitura principal de motion veio do video enviado.
- A analise descreve padroes visuais e tecnicos. Ela nao copia codigo, assets ou implementacao proprietaria do site externo.

## 2. Resumo executivo

O `samsy.ninja` e uma experiencia de portfolio full-canvas, fortemente cinematografica, com uma cena 3D dominante e UI sobreposta extremamente minima. A pagina nao se comporta como um layout tradicional de cards: ela se comporta como um ambiente interativo. Works apresenta projetos como paineis/telas dentro de uma cidade cyberpunk em WebGL/WebGPU; About apresenta texto editorial vermelho sobre uma cena escura com linhas de perspectiva e profundidade.

O projeto atual ja usa Vue 3, Three.js, GSAP, scanlines, bloom, vermelho neon e uma intencao cyber. A diferenca principal e que a implementacao atual ainda parece uma interface HUD/dashboard sobre um fundo 3D, enquanto a referencia parece uma cena 3D na qual a UI existe como sinalizacao minima. Para aproximar, o projeto precisa reduzir caixas, cards e molduras; transformar Works em palco visual central com sequenciador inferior; e transformar About em overlay editorial aberto, sem card.

## 3. Inventario visual do samsy.ninja

### Paleta

Paleta observada:

- Preto absoluto: `#000`, usado como base global, canvas, fundo e areas de repouso.
- Vermelho primario: `#f03` / `#ff0033`, usado em marca, textos, botoes, pills, barras e indicadores.
- Vermelho transluscido: `#ff003380` e `#ff0033bf`, usado em hover, glow e estados intermediarios.
- Branco/ciano frio no mundo 3D, usado em letreiros, paineis holograficos e linhas de luz.
- Amarelo/verde pontual, usado somente como sinalizacao dentro da cena, nao como cor de UI principal.

Direcao cromatica:

- A UI e quase monocromatica em vermelho sobre preto.
- Ciano, azul e amarelo aparecem como iluminacao ambiental da cena, nao como sistema de componentes.
- A cor de acento nao compete com outras cores de interface.

### Tipografia

Fonte observada no CSS:

- `forma-djr-display, sans-serif`.

Padroes:

- Titulos grandes, geometria condensada, peso medio/alto.
- Uso intenso de uppercase em labels e navegacao.
- Tamanhos pequenos para metadados e instrucoes.
- Texto vermelho em quase toda a interface, inclusive paragrafos.
- Pouca hierarquia por cor; a hierarquia vem principalmente de escala, posicao e peso.

Exemplos de escala:

- Marca/titulo da About: `SMSY` muito grande, ocupando a lateral esquerda.
- Labels de menu: pequenos, centralizados, com pill ativa.
- Texto corrido em About: vermelho, denso, com linhas curtas e baixo contraste proposital contra o fundo escuro.

### Layout global

Padroes globais:

- `body` com `overflow: hidden`, sem rolagem tradicional.
- `canvas` absoluto, preenchendo a viewport.
- UI fixa sobre a cena.
- Elementos com `user-select: none`, comportamento de experiencia interativa e nao de documento.
- Conteudo principal posicionado por coordenadas e camadas, nao por fluxo de pagina.

Estrutura visual:

- Top menu fixo no topo central.
- Marca e descricao no canto superior esquerdo.
- Indicador tecnico no canto superior direito: conectado, engine, frame time e FPS.
- Controles auxiliares nos cantos inferiores.
- Cena 3D com profundidade, reflexo de piso, nevoa, bloom, blur e scanlines.

### Motion e efeitos

Efeitos observados:

- Preloader preto com pequeno icone vermelho luminoso.
- Camera 3D com leve deslocamento e perspectiva.
- Scanlines horizontais sobre toda a tela.
- Bloom em elementos neon.
- Motion blur e afterimage em transicoes.
- Glitches horizontais vermelhos atravessando o palco.
- Reflexo no piso abaixo dos paineis de projeto.
- Hover/click em Works altera projeto com transicao visual no painel central.
- About usa fundo de linhas de luz em perspectiva, sugerindo velocidade/profundidade.

Sensacao desejada:

- Site como ambiente imersivo.
- Baixa densidade de componentes tradicionais.
- Interface que parece embutida em uma cena cyberpunk.
- Motion como parte da identidade, nao apenas decoracao.

## 4. Pagina Works - analise detalhada

### Composicao

Works e organizada como uma cena 3D com um painel principal flutuando no centro. O painel mostra o projeto ativo com uma imagem/video grande, levemente inclinado ou perspectivado, com reflexo no piso. O fundo contem uma cidade cyberpunk, letreiros, placas verticais e paineis luminosos.

Areas principais:

- Canto superior esquerdo: marca `SMSY 26'`, subtitulo em japones e descricao curta.
- Topo central: navegacao `EXPLORE`, `WORKS`, `ABOUT`.
- Canto superior direito: status tecnico `Connected`, `Engine: WebGPU`, frame time e FPS.
- Centro: painel do projeto ativo.
- Inferior central: barra sequenciadora de projetos com segmentos verticais.
- Inferior esquerdo: controles `Next / Prev`.
- Inferior direito: botao pequeno de menu/opcoes com reticencias.

### Projeto ativo

O projeto ativo e apresentado como media visual primeiro e texto depois. O texto aparece sobreposto ao painel ou proximo ao seu lado esquerdo:

- Titulo grande em vermelho: exemplos observados incluem `Clonex`, `Jiometry`, `OnCyber`, `World Exposition Dubai 2020`, `TomorrowLand`.
- Botoes pequenos em vermelho: `INFOS` e `VISIT`.
- Em alguns estados aparecem icones pequenos de audio/Discord ou status secundario.
- O painel troca conteudo com glitch, deslocamento, blur e mudanca do video/imagem.

Padrao de composicao:

- A imagem/video do projeto e o elemento dominante.
- O texto fica integrado ao painel, nao dentro de card separado.
- A area do projeto ocupa aproximadamente o centro horizontal, com largura grande, mas deixa o mundo 3D visivel ao redor.

### Navegacao de projetos

Padroes:

- Sequenciador inferior composto por varias barras verticais vermelhas.
- Item ativo vira uma pill horizontal vermelha com numero e nome do projeto.
- Barras laterais permanecem como indices compactos.
- `Next / Prev` aparece no canto inferior esquerdo com pequenos botoes vermelhos.
- A troca de item parece alterar tanto o painel central quanto a camera/estado visual.

Interacao:

- Hover e clique em barras ou controles devem trocar o projeto.
- Transicao deve ser rapida, com glitch/motion blur e troca de textura/video.
- O sequenciador precisa ser o controle principal, nao uma lista de cards.

### Estilo de UI em Works

Componentes:

- Pills arredondadas, pequenas, vermelhas.
- Texto preto dentro de pills ativas.
- Sem cards tradicionais com borda grossa.
- Sem container grande envolvendo todo o conteudo.
- Bordas e caixas aparecem pouco; quando aparecem, sao integradas ao mundo 3D ou aos botoes.

O que torna a pagina reconhecivel:

- Palco central com media grande.
- Reflexo de piso.
- Cidade/luzes no fundo.
- Marca fixa lateral esquerda.
- Sequenciador inferior com barras vermelhas.
- Scanline global.

## 5. Pagina About - analise detalhada

### Composicao

About abandona o painel de projeto e vira uma pagina editorial imersiva. O fundo e uma cena escura com linhas luminosas azuis/ciano em perspectiva, como um tunel ou grade de velocidade. Ha um corpo/silhueta ou objeto escuro no centro, criando profundidade.

Areas principais:

- Canto superior esquerdo: assinatura pequena `SMSY 26'`.
- Topo central: menu `EXPLORE`, `WORKS`, `ABOUT`, com `ABOUT` ativo em pill vermelha.
- Coluna esquerda: titulo `SMSY` gigante em vermelho e paragrafos em ingles.
- Coluna direita: texto em japones, tambem vermelho.
- Inferior esquerdo: links `[CONTACT] [X] [LINKEDIN]`.
- Inferior direito: creditos pequenos.
- Canto superior direito: status tecnico com FPS/engine.

### Texto e hierarquia

O texto nao fica dentro de um card. Ele e aplicado diretamente sobre a cena, com posicao absoluta e forte integracao ao fundo.

Padroes:

- Titulo grande `SMSY` em vermelho.
- Paragrafos vermelhos com largura curta.
- Coluna em japones criando equilibrio visual e identidade.
- Links discretos no rodape esquerdo.
- Creditos pequenos no rodape direito.

### Motion

Efeitos percebidos:

- Fundo com linhas em perspectiva e sensacao de deslocamento.
- Camera/fundo com leve movimento.
- Elementos permanecem legiveis, mas a atmosfera domina.
- About e mais contemplativa do que Works; ha menos troca de estados e mais presenca visual.

## 6. Comparacao com o projeto atual

Arquivos atuais relevantes:

- `src/components/BackgroundCanvas.vue`
- `src/components/TopMenu.vue`
- `src/components/WorksRail.vue`
- `src/views/WorksView.vue`
- `src/views/AboutView.vue`
- `src/styles/main.css`

### Semelhancas

O projeto atual ja possui:

- Vue 3 + Vite.
- Three.js como base visual.
- GSAP para animacoes.
- Fundo imersivo com canvas.
- Scanlines, ruido, glitch e vignette.
- Paleta escura com vermelho neon.
- HUD superior e indicadores tecnicos.
- Navegacao Works/About.
- Sequenciador visual em Works.
- Reflexo de piso e elementos 3D.

### Diferencas principais

#### 1. Estrutura de layout

Referencia:

- Cena 3D manda na composicao.
- UI flutua sobre a cena.
- Poucos containers.
- Works e um palco visual.
- About e texto aberto sobre fundo.

Projeto atual:

- Conteudo parece dashboard/HUD.
- Works usa `work-stage` como card grande com borda.
- About usa `about-content` como card/painel.
- Ha muitas molduras, bordas e superficies translucidas.

Alteracao recomendada:

- Remover ou reduzir drasticamente cards e caixas.
- Fazer o canvas e o palco visual conduzirem a composicao.
- Transformar textos em overlays absolutos ou semi-integrados, nao paineis fechados.

#### 2. Paleta

Referencia:

- Vermelho `#f03` e preto dominam.
- Ciano aparece no ambiente, nao na UI principal.
- Poucas variacoes cromaticas de interface.

Projeto atual:

- Vermelho forte, ciano e roxo/magenta competem como cores de UI.
- Menu e cards usam bordas cyan relevantes.
- Fundo tem gradientes radiais e HUD com multiplas camadas coloridas.

Alteracao recomendada:

- Definir `#f03` como acento principal unico.
- Rebaixar cyan para luz ambiente do canvas.
- Trocar bordas cyan de componentes por preto/vermelho ou remover bordas.

#### 3. Tipografia

Referencia:

- `forma-djr-display`.
- Titulos grandes e limpos.
- Texto vermelho quase sempre.
- Interface com labels pequenos.

Projeto atual:

- Usa `Saira Condensed` e `JetBrains Mono`.
- Titulos muito grandes, mas com estilo mais poster/HUD.
- Textos secundarios em branco/cinza.
- Labels monoespacados reforcam sensacao tecnica.

Alteracao recomendada:

- Aproximar a tipografia de display geometrica da referencia.
- Reduzir uso de monoespacada a status tecnico muito pontual.
- Usar vermelho tambem em corpo textual da About, como a referencia.

#### 4. Works

Referencia:

- Projeto ativo e media central grande com titulo/botoes sobrepostos.
- Sequenciador inferior e compacto.
- Troca de projeto tem glitch e deslocamento visual.
- Fundo 3D permanece visivel e importante.

Projeto atual:

- Projeto ativo aparece dentro de painel textual grande.
- A media do projeto nao e dominante.
- Timeline usa botoes largos, parecidos com lista de cards.
- Sequenciador existe, mas funciona como elemento decorativo abaixo do card.

Alteracao recomendada:

- Reestruturar Works para priorizar media/preview visual.
- Transformar cada projeto em um painel central com imagem/video/texture.
- Sobrepor titulo e botoes `Infos`/`Visit`.
- Rebaixar descricao longa para modal `Infos`, nao texto sempre visivel.
- Trocar timeline por barra inferior segmentada no estilo da referencia.

#### 5. About

Referencia:

- Texto aberto, sem card.
- Titulo gigante lateral.
- Colunas assimetricas.
- Fundo de linhas em perspectiva.
- Links discretos no rodape.

Projeto atual:

- Conteudo dentro de card centralizado na parte inferior.
- Usa chips de stack.
- Links sao botoes/pills.
- Fundo ainda tem composicao cyber, mas o card domina.

Alteracao recomendada:

- Remover card de About.
- Criar composicao editorial: nome/titulo grande a esquerda, texto em blocos curtos e links discretos.
- Transformar stack em texto ou lista secundaria menos evidente.
- Usar fundo 3D com linhas/caminhos luminosos e profundidade.

#### 6. Motion

Referencia:

- Motion e estrutural.
- Camera e painel central se movem.
- Transicoes de Works parecem glitch/media swap.
- About tem movimento ambiental continuo.

Projeto atual:

- Motion existe, mas a experiencia ainda e conduzida por componentes HTML estaticos.
- Troca em Works anima painel textual, nao a cena.
- O canvas parece background, nao interface principal.

Alteracao recomendada:

- Integrar estado de rota/projeto ao `BackgroundCanvas`.
- Ao trocar projeto, alterar textura/plano/camera no canvas.
- Usar GSAP para sincronizar UI e camera.
- Criar estados visuais distintos para Works e About.

## 7. Recomendacoes para aproximar o projeto da referencia

### Prioridade 1 - Direcao visual global

- Mudar a leitura de "dashboard cyber" para "ambiente 3D com UI minima".
- Reduzir cards, bordas, sombras internas e superficies glass.
- Manter preto absoluto como fundo predominante.
- Usar vermelho `#f03` como acento principal.
- Usar ciano/azul apenas como luz da cena 3D.

### Prioridade 2 - Works

- Criar palco central com preview visual de projeto.
- Cada projeto deve ter media principal: imagem, video curto, textura canvas ou mockup visual.
- Titulo do projeto deve ficar grande e sobreposto ao preview.
- `Infos` abre detalhes; `Visit` abre o link principal.
- Sequenciador inferior deve virar o controle principal, com barras verticais e pill ativa.
- `Next / Prev` deve ficar no canto inferior esquerdo.

### Prioridade 3 - About

- Remover card/painel atual.
- Criar layout editorial em overlay:
  - assinatura pequena no canto superior esquerdo;
  - nome grande;
  - paragrafos curtos;
  - links discretos no rodape;
  - creditos ou metadados pequenos no canto inferior direito, se fizer sentido.
- Ajustar o fundo 3D para linhas de perspectiva ou tunel luminoso.

### Prioridade 4 - Motion e estados

- Sincronizar rota com camera:
  - Works: camera voltada para palco/painel central.
  - About: camera em corredor/tunel de linhas.
- Sincronizar projeto ativo com textura/media do painel central.
- Usar glitch horizontal em trocas de projeto.
- Manter scanline global, mas reduzir excesso de overlays para nao poluir.

### Prioridade 5 - Responsividade

- Desktop deve manter experiencia full-canvas sem scroll.
- Mobile deve simplificar:
  - menu no topo esquerdo ou central compacto;
  - Works com painel central reduzido e sequenciador adaptado;
  - About com uma coluna principal e texto menor;
  - remover creditos ou elementos secundarios se comprometerem legibilidade.

## 8. Direcao recomendada para implementacao futura

Direcao recomendada: adaptacao fiel ao conteudo do portfolio atual.

Motivo:

- Replicar literalmente o `samsy.ninja` exigiria reproduzir assets, videos e shaders especificos que pertencem ao site de referencia.
- O projeto atual ja tem identidade cyber e stack compativel.
- A melhor evolucao e aplicar a mesma logica visual: full-canvas, media central, UI minima, vermelho/preto, motion cinematografico e About editorial.

Resultado esperado:

- O portfolio deixa de parecer um painel de controle e passa a parecer uma experiencia imersiva de Creative Frontend Engineer.
- Works vira uma vitrine visual navegavel.
- About vira uma assinatura editorial integrada ao mundo 3D.
- A referencia fica reconhecivel na linguagem visual sem dependencia de copia direta.

## 9. Criterios de aceite para uma futura fase de codigo

Works:

- O primeiro viewport exibe palco central com media visual dominante.
- A lista de projetos nao aparece como cards grandes.
- O sequenciador inferior controla o projeto ativo.
- A troca de projeto altera texto e media com transicao visual.
- `Infos` e `Visit` existem como acoes separadas.

About:

- Nao ha card envolvendo todo o conteudo.
- Texto principal fica aberto sobre a cena.
- Nome/titulo tem escala forte.
- Links ficam discretos e legiveis.
- Fundo tem movimento ambiental ou sensacao clara de profundidade.

Global:

- Preto e vermelho dominam a UI.
- Cyan/azul nao competem como cor de componente.
- Nao ha overflow horizontal em mobile.
- O canvas nao parece apenas decoracao; ele participa da composicao.
- A interface continua navegavel por mouse e teclado.

