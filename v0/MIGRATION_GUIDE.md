# Guia de Migração: v0 (Legacy) → Vue.js

Este documento descreve o processo completo para transformar desafios legados da pasta `v0` em componentes Vue.js modernos, seguindo os padrões estabelecidos no projeto.

## Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Passo a Passo da Migração](#passo-a-passo-da-migração)
4. [Componentes Disponíveis](#componentes-disponíveis)
5. [Sistema de Áudio](#sistema-de-áudio)
6. [Sistema de Animações](#sistema-de-animações)
7. [Sprites e Imagens](#sprites-e-imagens)
8. [Guia de Estilos (Tailwind & Fonts)](#guia-de-estilos-tailwind--fonts)
9. [Migração de Posicionamento](#migração-de-posicionamento)
10. [Exemplos Práticos](#exemplos-práticos)
11. [Checklist de Migração](#checklist-de-migração)

---

## Visão Geral

### O que você vai encontrar no código legado (v0)

- **HTML**: Arquivos em `v0/views/` (ex: `ino_0.html`)
- **JavaScript**: Funções em `v0/desafios.js` (ex: `function ino_0()`)
- **jQuery**: Drag & drop com jQuery UI
- **Animações**: jsMovie para sprite animations
- **Áudio**: Controle manual com `new Audio()`

### O que você vai criar em Vue

- **Componente Vue**: `src/views/challenge/{categoria}/{Nome}View.vue` (ex: `EcoOneView` para `eco_0`)
- **Composition API**: `<script setup>`
- **Componentes Reutilizáveis**: DragElement, DropElement, BaseAnimation
- **Stores**: Gerenciamento de estado com Pinia
- **Sistema centralizado**: Animações, áudios e sprites

---

## Estrutura do Projeto

```
src/
├── views/challenge/
│   ├── eco/          # Desafios de Economia
│   ├── edu/          # Desafios de Educação
│   ├── gov/          # Desafios de Governança
│   ├── ino/          # Desafios de Inovação
│   ├── laz/          # Desafios de Lazer
│   ├── mei/          # Desafios de Meio-ambiente
│   └── sau/          # Desafios de Saúde
│       ├── {Nome}View.vue       # Componente da view
│       ├── consts.js            # Dados do desafio (opcional)
│       └── components/          # Componentes específicos (opcional)
├── components/
│   ├── animations/              # Componentes de animação
│   ├── interact/                # Drag & Drop
│   ├── layout/                  # Layouts
│   └── media/                   # BaseImg
├── consts/
│   └── _animations.js           # Animações centralizadas
├── stores/
│   ├── effects.js               # Gerenciamento de áudio
│   ├── lines.js                 # Falas do robô
│   └── sound.js                 # Controle de som/música
└── assets/
    ├── animations/              # Sprites de animação
    ├── audios/                  # Arquivos de áudio
    └── images/                  # Imagens e sprites
```

---

## Passo a Passo da Migração

### 1. Analisar o Código Legado

#### 1.1 Localizar os arquivos relevantes

```bash
# HTML do desafio
v0/views/{nome_desafio}.html

# Função JavaScript
v0/desafios.js
# Procurar por: function {nome_desafio}()

# Conteúdo/Textos
v0/content.js

# Assets (imagens, animações)
v0/img/desafios/{categoria}/

# Áudios
v0/sounds/
```

#### 1.1.1 Mapeamento de Nomes (Legacy → Vue)

A numeração dos desafios muda do legado (0-indexed) para o Vue (1-indexed, escrito por extenso em inglês).

| Legacy (v0) | Vue Component (src) |
| ----------- | ------------------- |
| `eco_0`     | `EcoOneView.vue`    |
| `eco_1`     | `EcoTwoView.vue`    |
| `eco_2`     | `EcoThreeView.vue`  |
| `laz_1`     | `LazTwoView.vue`    |
| `laz_2`     | `LazThreeView.vue`  |
| `ino_0`     | `InoOneView.vue`    |
| ...         | ...                 |

**Regra:** `categoria_{N}` → `{Categoria}{NumeroExtenso}View.vue`
(onde N=0 vira One, N=1 vira Two, etc.)

#### 1.2 Identificar elementos-chave

Ao analisar o código legado, identifique:

- **Elementos arrastáveis** (`draggable`)
- **Zonas de drop** (`droppable`)
- **Animações** (jsMovie)
- **Áudios** (new Audio, play, stop)
- **Lógica de validação** (verificações, contadores)
- **Condição de sucesso** (quando vai para próxima fase)
- **Textos de ajuda** (popover, modals)

**Exemplo do ino_0 (bebedouro):**

```javascript
// v0/desafios.js - linha 1536
function ino_0() {
  // 3 itens arrastáveis
  $("#imgVaso, #imgGarrafao, #imgBalde").draggable({...})

  // Zona de drop aceita apenas #imgBalde
  $("#aceitaBalde").droppable({
    accept: "#imgBalde",
    drop: function() { ... }
  })

  // Animação de água pingando
  $('#animacaoPingando').jsMovie({
    sequence: 'bebedouro_000##.png',
    from: 0, to: 10, fps: 8
  })

  // Contador de tentativas
  var contTetativasBebedouro = 0;

  // Som de água
  var audio_aguapingando = new Audio(...)
}
```

---

### 2. Preparar Animações (se necessário)

Se o desafio usa animações com jsMovie, você precisa:

#### 2.1 Verificar se a animação existe

```bash
ls src/assets/animations/
```

#### 2.2 Adicionar nova animação em `_animations.js`

**Arquivo:** `src/consts/_animations.js`

```javascript
// 1. Importar sprite e JSON
import {nome}Img from '@/assets/animations/{pasta}/sprite.png'
import {nome}Json from '@/assets/animations/{pasta}/sprite.json'

// 2. Criar objeto Image
const image{Nome} = new Image()
image{Nome}.src = {nome}Img

// 3. Criar objeto de exportação
const {nome} = {
  sprite: image{Nome},
  json: {nome}Json
}

// 4. Exportar
export {
  // ... outras animações
  {nome}
}
```

**Exemplo real - bebedouro:**

```javascript
// src/consts/_animations.js
import drinkingFountainImg from '@/assets/animations/drinking-fountain/sprite.png'
import drinkingFountainJson from '@/assets/animations/drinking-fountain/sprite.json'

const imageDrinkingFountain = new Image()
imageDrinkingFountain.src = drinkingFountainImg

const drinkingFountain = {
  sprite: imageDrinkingFountain,
  json: drinkingFountainJson
}

export {
  // ...
  drinkingFountain
}
```

---

### 3. Adicionar Áudios no Store (se necessário)

#### 3.1 Verificar se áudio existe

O arquivo de áudio compilado está em: `src/assets/audios/audio.mp3`
Os sprites estão mapeados em: `src/assets/audios/audio.json`

```json
// src/assets/audios/audio.json
{
  "sprite": {
    "ino_help0": [4567, 6000], // [início_ms, duração_ms]
    "feedback_inovacao_agua_pingando": [12345, 2000]
  }
}
```

#### 3.2 Adicionar função de áudio loop (se necessário)

Se o desafio precisa de áudio em loop (ex: água pingando continuamente):

**Arquivo:** `src/stores/effects.js`

```javascript
// Já existe no projeto:
const effectsAudiosLoop = ref(
  useSound(audio, {
    sprite: sprites.sprite,
    loop: true // ← Loop ativado
  })
)

function playAudioLoop(name) {
  if (isAudio.value) effectsAudiosLoop.value.play({ id: name })
}

// Exportar
export {
  // ...
  playAudioLoop,
  effectsAudiosLoop // ← Importante exportar para controle direto
}
```

---

### 4. Criar consts.js (se necessário)

Se o desafio tem dados complexos (arrays de itens, configurações), crie um arquivo separado.

**Arquivo:** `src/views/challenge/{categoria}/consts.js`

#### 4.1 Para elementos drag & drop

```javascript
export const elements = [
  {
    name: 'item-1', // ID único
    sprite: 'sprite_class', // Classe CSS do spritesheet
    bottom: '200px', // Posição inicial
    left: '500px',
    droppedBottom: '100px', // Posição após drop (opcional)
    droppedLeft: '600px'
  }
  // ... mais itens
]
```

#### 4.2 Para dados de jogo (pontos, mensagens, etc)

```javascript
// Exemplo do eco (economia)
export const balls = [
  {
    value: 10,
    type: 'good',
    text: '+10 por vender um brinquedo antigo',
    img: planta_item1_eco_bom,
    x: 750,
    y: 680
  }
  // ...
]
```

#### 4.3 Para animações locais ao desafio

```javascript
import machineImg from '@/assets/animations/machine/sprite.png'
import machineJson from '@/assets/animations/machine/sprite.json'

const imageMachine = new Image()
imageMachine.src = machineImg

export const machine = {
  sprite: imageMachine,
  json: machineJson
}
```

---

### 5. Criar o Componente Vue

**Arquivo:** `src/views/challenge/{categoria}/{Nome}View.vue`

#### 5.1 Estrutura básica

```vue
<script setup>
// ====== IMPORTS ======
import Popper from 'vue3-popper'  // Para tooltips (opcional)
import { {animacao} } from '@/consts/_animations'  // Se usa animação
// import { elements } from './consts'  // Se criou consts.js

// ====== STORES ======
const router = useRouter()
const effectsStore = useEffectsStore()

// ====== STATE ======
const isCompleted = ref(false)
const attempts = ref(0)
const showHint = ref(true)

// ====== REFS ======
const refAnimation = ref(null)  // Para controlar animação

// ====== DADOS ======
const draggableItems = [
  {
    name: 'item-correto',
    sprite: 'sprite_class',
    bottom: '200px',
    left: '500px'
  },
  // ... outros itens
]

// ====== MÉTODOS ======
function onDragStart() {
  showHint.value = false
}

function onDragEnd() {
  if (isCompleted.value) return
  attempts.value++
}

function onDrop(el) {
  const { dataTransfer } = el

  if (dataTransfer === 'item-correto') {
    // ✅ Resposta correta
    isCompleted.value = true

    // Parar animações/sons se necessário
    if (refAnimation.value) {
      refAnimation.value.stop()
    }
    effectsStore.effectsAudiosLoop.stop()

    // Som de sucesso
    effectsStore.playAudio('feedback_botao_01')

    // Navegar após delay
    setTimeout(() => {
      router.push({
        name: 'congratulation',
        params: { challenge: '{categoria}', level: {numero} }
      })
    }, 2000)
  } else {
    // ❌ Resposta errada
    effectsStore.playAudio('feedback_mouse_over_itens')
  }
}

// ====== LIFECYCLE ======
onMounted(() => {
  // Iniciar sons em loop (se necessário)
  effectsStore.playAudioLoop('feedback_{categoria}_{som}')
})
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet bg-{sprite-fundo}">
    <!-- Cenário/Fundo -->
    <BaseImg img="sprite_cenario" class="absolute top-[100px]" />

    <!-- Animação (se houver) -->
    <BaseAnimation
      v-if="!isCompleted"
      ref="refAnimation"
      :spritesheet="{ animacao }.sprite"
      :json="{ animacao }.json"
      :fps="8"
      autoplay
      :isLoop="true"
      width="30%"
      class="absolute top-[200px] left-[500px]"
    />

    <!-- Elementos arrastáveis -->
    <DragElement
      v-for="item in draggableItems"
      :key="item.name"
      :dataTransfer="item.name"
      :style="{ bottom: item.bottom, left: item.left }"
      :class="isCompleted && item.name === 'item-correto' ? 'hidden' : ''"
      @start-drag="onDragStart"
      @end-drag="onDragEnd"
    >
      <div class="spritesheet" :class="item.sprite"></div>
    </DragElement>

    <!-- Item correto após sucesso -->
    <BaseImg
      v-if="isCompleted"
      img="sprite_item_correto"
      class="absolute bottom-[100px] left-[600px]"
    />

    <!-- Zona de drop -->
    <DropElement
      :expected="['item-correto']"
      @dropped="onDrop"
      class="absolute w-[300px] h-[350px] top-[500px] left-[700px]"
    />

    <!-- Hint de arrastar -->
    <CursorDrag v-if="showHint" class="absolute top-[400px] left-[600px]" />

    <!-- Tooltip de informação (opcional) -->
    <div class="absolute top-[50px] right-[100px]">
      <Popper placement="bottom-start" offsetDistance="40" locked hover>
        <template #content>
          <div class="w-[400px] rounded-md">
            <div class="text-3xl font-bold pb-2 bg-gray-200 px-4 py-2">Saiba Mais</div>
            <div class="text-2xl px-4 py-2">Texto explicativo do desafio...</div>
          </div>
        </template>
        <BaseButton name="btn-toggle-info" width="90px"></BaseButton>
      </Popper>
    </div>

    <!-- Balão de fala com instruções -->
    <SpeechBubble
      title="Título do desafio"
      description="Descrição das instruções"
      audio="{categoria}_help{numero}"
      :time="6000"
    />
  </main>
</template>
```

---

### 6. Verificar/Ajustar Router

O router já deve estar configurado, mas verifique:

**Arquivo:** `src/router/index.js`

```javascript
{
  path: '/{categoria}-{numero}',
  name: '{categoria}-{numero}',
  component: () => import('../views/challenge/{categoria}/{Nome}View.vue')
}
```

---

## Componentes Disponíveis

### DragElement

Torna um elemento arrastável.

```vue
<DragElement
  :dataTransfer="identificador"
  :style="{ bottom: '100px', left: '200px' }"
  @start-drag="onDragStart"
  @end-drag="onDragEnd"
>
  <div class="spritesheet sprite_class"></div>
</DragElement>
```

**Props:**

- `dataTransfer`: String/Object - ID do elemento
- `isSigmoid`: Boolean - Rotação ao arrastar (padrão: true)

**Eventos:**

- `@start-drag` - Quando começa a arrastar
- `@end-drag` - Quando termina de arrastar

---

### DropElement

Define uma zona onde elementos podem ser soltos.

```vue
<DropElement
  :expected="['item-1', 'item-2']"
  @dropped="onDrop"
  class="absolute w-[300px] h-[400px] top-[500px] left-[700px]"
/>
```

**Props:**

- `expected`: Array/String - IDs aceitos

**Eventos:**

- `@dropped` - Quando um item é solto
  - Retorna: `{ event, dataTransfer }`

---

### BaseAnimation

Exibe animações de sprites.

```vue
<BaseAnimation
  :spritesheet="animation.sprite"
  :json="animation.json"
  :fps="10"
  autoplay
  :isLoop="true"
  width="50%"
  class="absolute top-[100px] left-[200px]"
  ref="refAnimation"
/>
```

**Props:**

- `spritesheet`: Image - Sprite sheet image object
- `json`: Object - JSON com frames da animação
- `fps`: Number - Frames por segundo (padrão: 10)
- `autoplay`: Boolean - Iniciar automaticamente
- `isLoop`: Boolean - Loop infinito (padrão: true)
- `width`: String - Largura (padrão: '100%')

**Métodos expostos (via ref):**

- `play(from, to)` - Iniciar animação
- `stop()` - Parar animação

**Exemplo de uso:**

```vue
<script setup>
const refAnimation = ref(null)

function stopAnimation() {
  refAnimation.value.stop()
}
</script>

<template>
  <BaseAnimation ref="refAnimation" ... />
</template>
```

---

### BaseImg

Exibe sprites do spritesheet CSS.

```vue
<BaseImg img="sprite_name" class="absolute top-[100px]" width="200px" />
```

**Props:**

- `img`: String - Nome da classe do sprite (sem `spritesheet.`)
- `width`: String - Largura (opcional)
- `height`: String - Altura (opcional)

---

### SpeechBubble

Balão de fala do robô com instruções.

```vue
<SpeechBubble
  title="Título"
  description="Descrição do desafio"
  audio="categoria_help0"
  :time="6000"
/>
```

**Props:**

- `title`: String - Título
- `description`: String - Descrição
- `audio`: String - ID do áudio
- `time`: Number - Duração da animação do robô (ms)

---

### CursorDrag

Animação de cursor arrastando (hint visual).

```vue
<CursorDrag class="absolute top-[400px] left-[600px]" width="50%" />
```

---

### CursorClick

Animação de cursor clicando (hint visual).

```vue
<CursorClick class="absolute bottom-[100px] right-[200px]" />
```

---

### CursorKeyboard

Animação de teclas do teclado (hint visual).

```vue
<CursorKeyboard v-if="showHint" class="absolute scale-[2] opacity-70" />
```

---

### BaseButton

Botão do sistema de sprites.

```vue
<BaseButton name="btn-toggle-next" width="180px" @click="handleClick" />
```

**Props:**

- `name`: String - Nome do sprite do botão
- `width`: String - Largura

---

### Popper (vue3-popper)

Tooltip/Popover para informações adicionais.

```vue
<Popper placement="bottom-start" offsetDistance="40" locked hover>
  <template #content>
    <div class="w-[400px] rounded-md">
      <div class="text-3xl font-bold bg-gray-200 px-4 py-2">
        Título
      </div>
      <div class="text-2xl px-4 py-2">
        Conteúdo...
      </div>
    </div>
  </template>
  <BaseButton name="btn-toggle-info" width="90px" />
</Popper>
```

---

### ModalAtention

Modal de atenção/aviso padronizado.

```vue
<ModalAtention v-model="showModal" @close="showModal = false">
  <div class="mt-8">Mensagem de aviso aqui!</div>
</ModalAtention>
```

**Props:**

- `modelValue`: Boolean - Controla visibilidade
- `contentFont`: String - Classe de fonte (ex: 'font-exo2')

---

### TopBarControl

Barra superior com controles (Home, Som, Música).

```vue
<TopBarControl :show-home="true" :show-sound="true" :show-music="true" @home="goHome" />
```

---

### BaseInputText

Campo de entrada de texto estilizado.

```vue
<BaseInputText v-model="inputValue" placeholder="Digite aqui" class="w-[300px]" />
```

---

### BaseInputSelect

Campo de seleção estilizado.

```vue
<BaseInputSelect
  v-model="selectedValue"
  :options="['Opção 1', 'Opção 2']"
  placeholder="Selecione"
/>
```

---

## Sistema de Áudio

### useEffectsStore

Store principal para efeitos sonoros.

```javascript
const effectsStore = useEffectsStore()

// 🔊 Tocar som único
effectsStore.playAudio('feedback_botao_01')

// 🔁 Tocar som em loop
effectsStore.playAudioLoop('feedback_inovacao_agua_pingando')

// ⏹️ Parar loop
effectsStore.effectsAudiosLoop.stop()

// 🎉 Som de parabéns
effectsStore.playCongratsEffect()

// 🖱️ Sons padrão de botões
effectsStore.playClickButton()
effectsStore.plaHoverButton()
```

### Sons Comuns Disponíveis

```javascript
// Feedbacks gerais
'feedback_botao_01' // Click em botão
'feedback_mouse_over_itens' // Hover em item
'feedback_sucesso_geral' // Sucesso geral

// Por categoria
'feedback_economia_moeda_entrando'
'feedback_economia_moeda_saindo'
'feedback_mapa_drag'
'feedback_inovacao_agua_pingando' // Loop

// Falas de ajuda
'{categoria}_help0'
'{categoria}_help1'
'{categoria}_help2'
```

### useLinesStore

Para falas do robô (narração).

```javascript
const linesStore = useLinesStore()

// Tocar fala
linesStore.playAudio('ino_help0')

// Parar fala
linesStore.linesAudios.stop()
```

---

## Sistema de Animações

### Animações Disponíveis

Importar de `@/consts/_animations`:

```javascript
import {
  robotBlue, // Robô azul
  robotOrange, // Robô laranja
  robotFull, // Robô completo
  counterAnimation, // Contador
  cursorDrag, // Cursor arrastando
  cursorKeyboard, // Teclado
  cursorClick, // Cursor clicando
  radioTower, // Torre de rádio
  drinkingFountain // Bebedouro
} from '@/consts/_animations'
```

### Estrutura do Objeto de Animação

```javascript
{
  sprite: ImageObject,  // new Image() com src definido
  json: {
    frames: [...]       // Array de frames
  }
}
```

---

## Sprites e Imagens

### Sistema de Sprites CSS

Os sprites estão em classes CSS geradas automaticamente.

**Localização:** `src/assets/style/generated-sprites/spritesheet{N}.css`

### Como usar sprites

#### 1. Com BaseImg

```vue
<BaseImg img="bebedouro_vasinho" />
```

#### 2. Direto com div

```vue
<div class="spritesheet bebedouro_vasinho"></div>
```

### Convenção de nomes

````
{categoria}_{descritor}_{variacao}

Exemplos:
- `bebedouro_vasinho`
- `campinho_crianca1_vermelha`

### Localização dos Arquivos de Imagem

As imagens originais que geram os sprites estão em:
`src/assets/images/sprites/{categoria}/`

Exemplos:
- `src/assets/images/sprites/economia/`
- `src/assets/images/sprites/educacao/`
- `src/assets/images/sprites/governo/`

Se precisar adicionar uma nova imagem, adicione na pasta correta e o sistema de build deve atualizar o spritesheet (verifique o comando de geração de sprites no `package.json` se disponível, ou se é automático).

---

## Guia de Estilos (Tailwind & Fonts)

O projeto utiliza Tailwind CSS com configurações personalizadas.

### Cores Personalizadas (`tailwind.config.js`)

| Nome | Classe Tailwind | Hex |
|------|-----------------|-----|
| **Azul** | `text-primary-blue`, `bg-primary-blue` | `#376296` |
| Azul Light | `text-primary-blue-light` | `#247ba0` |
| Azul Dark | `text-primary-blue-dark` | `#305882` |
| **Verde** | `text-primary-green`, `bg-primary-green` | `#3c9c74` |
| Verde Light | `text-primary-green-light` | `#70c1b3` |
| **Amarelo** | `text-primary-yellow`, `bg-primary-yellow` | `#ffe066` |
| **Laranja** | `text-primary-orange`, `bg-primary-orange` | `#f25f5c` |
| **Marrom** | `text-primary-brown`, `bg-primary-brown` | `#92492d` |
| Cinza | `text-gray-500` | `#333` |

### Fontes

> [!IMPORTANT]
> **Não tente encontrar uma fonte "equivalente" no Tailwind padrão.**
> O projeto utiliza fontes específicas que devem ser respeitadas. Use **apenas** as classes listadas abaixo. Se o design legado usar uma fonte diferente, consulte o time de design ou use a mais próxima dentre as opções oficiais (geralmente `font-exo2` para textos gerais).

| Nome | Classe Tailwind | Uso Comum |
|------|-----------------|-----------|
| **Norwester** | `font-norwester` | Títulos, Números grandes |
| **Front** | `font-front` | Textos de destaque |
| **Exo 2** | `font-exo2` | Textos gerais, corpo |
| **Viga** | `font-viga` | Títulos alternativos |
| **PoetsenOne** | `font-poetsenone` | Títulos divertidos |
| **Bungee** | `font-bungee` | Títulos retro/tech |

---

## Migração de Posicionamento

Uma das partes mais críticas da migração é converter o posicionamento absoluto do CSS legado (baseado em porcentagem) para o novo padrão do Vue (baseado em pixels fixos em container 1920x1080).

### ⚠️ Regra de Ouro: Conversão Exata

Não tente "adivinhar" a posição olhando para a tela. **Você deve calcular a posição exata** baseada no CSS original. O posicionamento "no olho" quase sempre resulta em elementos desalinhados em diferentes resoluções.

### Padrão de Conversão

O legado (`v0`) utilizava um container com aspecto 16:9 e posicionamento em `%`.
O novo projeto utiliza um container fixo de referência **1920px x 1080px**.

**Fórmula de Conversão:**

| Propriedade | Legado (%) | Novo (px) | Fórmula Matemática |
|-------------|------------|-----------|--------------------|
| **Left** | `left: 50%` | `left-[960px]` | `Valor(%) * 19.2` |
| **Top** | `top: 20%` | `top-[216px]` | `Valor(%) * 10.8` |
| **Bottom** | `bottom: 10%` | `bottom-[108px]` | `Valor(%) * 10.8` |
| **Width** | `width: 10%` | `w-[192px]` | `Valor(%) * 19.2` |
| **Height** | `height: 10%` | `h-[108px]` | `Valor(%) * 10.8` |

> **Dica Prática:** Use a calculadora!
> - Para **Horizontal** (Left, Right, Width): Multiplique a porcentagem por **19.2**
> - Para **Vertical** (Top, Bottom, Height): Multiplique a porcentagem por **10.8**

### Exemplo Passo a Passo

1. **Identifique o CSS original:**
   ```css
   /* v0/style.css */
   #personagem {
       left: 25%;
       top: 40%;
   }
   ```

2. **Aplique a fórmula:**
   - **Left:** 25 * 19.2 = **480**
   - **Top:** 40 * 10.8 = **432**

3. **Escreva o código Vue:**
   ```vue
   <BaseImg class="absolute left-[480px] top-[432px]" ... />
   ```

> **Nota:** Pequenos ajustes manuais podem ser necessários para alinhar perfeitamente (±5px), pois o ponto de ancoragem ou o recorte do sprite pode variar levemente em relação à imagem original. Mas **sempre comece pelo valor calculado**.

### Exemplo Comparativo (Governo - Campinho)

**Legado (`style.css`):**
```css
#criancaV1 {
  position: absolute;
  bottom: 60%;
  left: 20%;
  width: 6.5%;
}
````

**Novo (`GovOneView.vue` / `consts.js`):**

```javascript
{
  name: 'children-red-1',
  bottom: '630px', // 60 * 10.8 = 648 (Ajustado para 630)
  left: '350px',   // 20 * 19.2 = 384 (Ajustado para 350)
  // Width é controlado pelo sprite ou scale
}
```

### Escala (Scale)

No legado, o tamanho era frequentemente controlado por `width: %`. No novo projeto, usamos o tamanho natural do sprite. Se o sprite for muito grande ou pequeno, use a classe `scale-` do Tailwind.

Exemplo:

```html
<!-- Aumentar 25% -->
<BaseImg class="scale-125" ... />

<!-- Dobrar tamanho -->
<BaseImg class="scale-[2]" ... />
```

---

### Como encontrar o nome correto

1. **Inspecionar no código legado:**

```html
<!-- v0/views/ino_0.html -->
<img id="imgVaso" src="img/desafios/inovacao/bebedouro/vasinho.png" />
```

2. **Procurar no CSS:**

```bash
grep -r "vasinho" src/assets/style/generated-sprites/
```

3. **Resultado:**

```css
.spritesheet.bebedouro_vasinho {
  background-image: url('...');
  background-position: -220px -150px;
  width: 150px;
  height: 200px;
}
```

4. **Usar:** `bebedouro_vasinho`

---

## Exemplos Práticos

### Exemplo 1: Desafio Simples (Drag & Drop)

**Baseado em:** `ino_0` (bebedouro)

```vue
<script setup>
import { drinkingFountain } from '@/consts/_animations'

const router = useRouter()
const effectsStore = useEffectsStore()
const isCompleted = ref(false)
const showHint = ref(true)
const refWaterAnimation = ref(null)

const items = [
  { name: 'vasinho', sprite: 'bebedouro_vasinho', bottom: '880px', left: '666px' },
  { name: 'regador', sprite: 'bebedouro_regador', bottom: '200px', left: '1323px' },
  { name: 'garrafao', sprite: 'bebedouro_garrafao', bottom: '208px', left: '330px' }
]

function onDrop(el) {
  if (el.dataTransfer === 'regador') {
    effectsStore.effectsAudiosLoop.stop()
    isCompleted.value = true
    refWaterAnimation.value.stop()

    setTimeout(() => {
      router.push({ name: 'congratulation', params: { challenge: 'ino', level: 1 } })
    }, 2000)
  }
}

onMounted(() => {
  effectsStore.playAudioLoop('feedback_inovacao_agua_pingando')
})
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet bg-bebedouro">
    <BaseImg img="bebedouro_bebedouro" class="absolute top-[180px]" />

    <BaseAnimation
      v-if="!isCompleted"
      ref="refWaterAnimation"
      :spritesheet="drinkingFountain.sprite"
      :json="drinkingFountain.json"
      :fps="6"
      autoplay
      :isLoop="true"
      width="31%"
      class="absolute top-[295px] left-[6px]"
    />

    <DragElement
      v-for="item in items"
      :key="item.name"
      :dataTransfer="item.name"
      :style="{ bottom: item.bottom, left: item.left }"
      :class="isCompleted && item.name === 'regador' ? 'hidden' : ''"
      @start-drag="showHint = false"
    >
      <div class="spritesheet" :class="item.sprite"></div>
    </DragElement>

    <BaseImg
      v-if="isCompleted"
      img="bebedouro_regador"
      class="absolute bottom-[76px] left-[870px]"
    />

    <DropElement
      :expected="['regador']"
      @dropped="onDrop"
      class="absolute w-[300px] h-[350px] top-[675px] left-[825px]"
    />

    <CursorDrag v-if="showHint" class="absolute top-[600px] left-[600px]" />

    <SpeechBubble
      title="Fique atento!"
      description="Observe a cena e tente resolver o problema."
      audio="ino_help0"
      :time="6000"
    />
  </main>
</template>
```

---

### Exemplo 2: Desafio com Múltiplas Zonas de Drop

**Baseado em:** `gov_0` (separar times)

```vue
<script setup>
import { elementsOne as elements } from './consts'

const router = useRouter()
const droppeds = ref([])

function onDrop(el) {
  droppeds.value.push(el.dataTransfer)

  if (droppeds.value.length === elements.length) {
    setTimeout(() => {
      router.push({ name: 'congratulation', params: { challenge: 'gov', level: 1 } })
    }, 1000)
  }
}

const droppedsElements = computed(() =>
  droppeds.value.map((name) => elements.find((el) => el.name === name))
)

function verifyDropped(name) {
  return droppeds.value.includes(name)
}
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet cenario1_governo">
    <BaseImg img="campinho_campinho" class="absolute top-[464px]" />

    <!-- Elementos arrastáveis -->
    <DragElement
      v-for="el in elements"
      :key="el.name"
      :style="{ bottom: el.bottom, left: el.left }"
      :dataTransfer="el.name"
      :class="verifyDropped(el.name) ? 'hidden' : ''"
    >
      <div class="spritesheet" :class="el.image"></div>
    </DragElement>

    <!-- Elementos já soltos -->
    <BaseImg
      v-for="(dropped, index) in droppedsElements"
      :key="index"
      :img="dropped.image"
      :style="{ bottom: dropped.droppedBottom, left: dropped.droppedLeft }"
      class="absolute"
    />

    <!-- Zona de drop - Time Vermelho -->
    <DropElement
      :expected="['children-red-1', 'children-red-2', 'children-red-3']"
      @dropped="onDrop"
      class="absolute w-[700px] h-[520px] top-[480px] left-[240px]"
    />

    <!-- Zona de drop - Time Amarelo -->
    <DropElement
      :expected="['children-yellow-1', 'children-yellow-2', 'children-yellow-3']"
      @dropped="onDrop"
      class="absolute w-[700px] h-[520px] top-[480px] left-[960px]"
    />

    <SpeechBubble
      title="Hora de brincar!"
      description="Organize as brincadeiras separando os times."
      audio="gov_help0"
      :time="8300"
    />
  </main>
</template>
```

**consts.js:**

```javascript
export const elementsOne = [
  {
    name: 'children-red-1',
    image: 'campinho_crianca1_vermelha',
    type: 'red',
    bottom: '630px',
    left: '350px',
    droppedBottom: '140px',
    droppedLeft: '480px'
  }
  // ... mais elementos
]
```

---

### Exemplo 3: Desafio com Canvas e Movimento

**Baseado em:** `eco_0` (pegar moedas)

```vue
<script setup>
import robotImage from '@/assets/images/sprites/economia/planta_cabeca_robo.png'
import { balls } from './consts'

const robot = new Image()
robot.src = robotImage

const canvasRef = ref(null)
const ctx = computed(() => canvasRef.value?.getContext('2d'))
const x = ref(600)
const y = ref(750)
const allBalls = ref(balls)
const total = ref(0)
const router = useRouter()
const effectsStore = useEffectsStore()

function draw() {
  ctx.value?.clearRect(0, 0, 1227, 850)
  ctx.value?.drawImage(robot, x.value, y.value)
  allBalls.value.forEach((ball) => {
    if (!ball.colided) drawBall(ball)
  })
}

function handleKeyDown(event) {
  const { keyCode } = event
  if (keyCode === 37 && x.value > 0) x.value -= 10
  else if (keyCode === 39 && x.value < 1130) x.value += 10
  // ... outras direções
  draw()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  setInterval(draw, 24)
})
</script>

<template>
  <main class="spritesheet bg_fundo_economia1 flex justify-center items-center flex-col">
    <BaseImg img="planta_plantacasa_eco" class="ml-8">
      <canvas ref="canvasRef" :width="1227" :height="850" class="absolute top-[25px] left-[68px]" />
    </BaseImg>

    <div class="bg-[#e5e5e5] text-5xl font-front absolute px-[50px] py-[19px] rounded-full">
      {{ total }}
    </div>

    <SpeechBubble
      title="Cofrinho cheio!"
      description="Pegue as moedas verdes e fuja das vermelhas."
      audio="eco_help0"
      :time="9000"
    />
  </main>
</template>
```

---

### Exemplo 4: Desafio com Seleção de Itens

**Baseado em:** `edu_0` (escolher melhorias da escola)

```vue
<script setup>
import { featuresOne as features } from './consts'

const selected = ref(
  features.reduce((acc, f) => {
    acc[f.key] = false
    return acc
  }, {})
)

const isMaxSelected = computed(() => Object.values(selected.value).filter(Boolean).length >= 5)

function toggleItem(key) {
  if (isMaxSelected.value && !selected.value[key]) {
    alert('Máximo de 5 itens!')
    return
  }
  selected.value[key] = !selected.value[key]
}

const visibleFeatures = computed(() => features.filter((f) => selected.value[f.key]))
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet cenarioescola_fora">
    <div class="spritesheet barradeitens relative bottom-[-435px] flex justify-evenly">
      <BaseButton
        v-for="feature in features"
        :key="feature.key"
        :name="selected[feature.key] ? feature.checkedIcon : feature.normalIcon"
        @click="toggleItem(feature.key)"
      />
    </div>

    <BaseImg img="escolaf_escolafora_antes" class="absolute bottom-[380px]" />

    <template v-for="feature in visibleFeatures" :key="feature.key">
      <BaseImg v-for="(img, i) in feature.images" :key="i" :img="img.src" :class="img.class" />
    </template>
  </main>
</template>
```

---

## Checklist de Migração

Use esta checklist ao migrar um desafio:

### Análise

- [ ] Localizei o HTML em `v0/views/`
- [ ] Localizei a função JavaScript em `v0/desafios.js`
- [ ] Identifiquei todos os elementos arrastáveis
- [ ] Identifiquei as zonas de drop e validações
- [ ] Identifiquei as animações (jsMovie)
- [ ] Identifiquei os áudios utilizados
- [ ] Identifiquei os sprites/imagens necessários
- [ ] Entendi a lógica de sucesso do desafio

### Preparação

- [ ] Verifiquei se a animação existe em `src/assets/animations/`
- [ ] Adicionei animação em `_animations.js` (se necessário)
- [ ] Verifiquei se os áudios existem em `audio.json`
- [ ] Adicionei função de áudio em `effects.js` (se necessário)
- [ ] Criei `consts.js` com dados do desafio (se necessário)

### Implementação

- [ ] Criei o arquivo `{Nome}View.vue`
- [ ] Implementei estrutura `<script setup>`
- [ ] Importei stores necessários (router, effectsStore)
- [ ] Criei state (refs) para controle do desafio
- [ ] Implementei lógica de drag & drop ou interação
- [ ] Implementei validação de resposta
- [ ] Implementei navegação para congratulations
- [ ] Adicionei animações (BaseAnimation)
- [ ] Adicionei sons (playAudio, playAudioLoop)
- [ ] Adicionei sprites (BaseImg, classes CSS)
- [ ] Adicionei componentes de UI (SpeechBubble, cursores)
- [ ] Ajustei posicionamento (absolute, top, left, etc)

### Testes

- [ ] O desafio carrega sem erros
- [ ] Elementos arrastáveis funcionam
- [ ] Drop zones aceitam/rejeitam corretamente
- [ ] Animações rodam corretamente
- [ ] Áudios tocam/param corretamente
- [ ] Validação funciona (certo/errado)
- [ ] Navegação para congratulations funciona
- [ ] Hints visuais aparecem quando esperado
- [ ] Tooltips/popovers funcionam
- [ ] Responsive (se aplicável)

---

## Dicas e Boas Práticas

### 1. Posicionamento

Use sempre **absolute** com Tailwind classes:

```vue
<BaseImg img="sprite" class="absolute top-[100px] left-[200px]" />
```

### 2. Controle de Visibilidade

Use `v-if` para mostrar/ocultar:

```vue
<!-- Animação só aparece quando não completou -->
<BaseAnimation v-if="!isCompleted" ... />

<!-- Item correto só aparece após completar -->
<BaseImg v-if="isCompleted" ... />
```

### 3. Classes Condicionais

```vue
<!-- Esconde item quando já foi arrastado -->
:class="droppeds.includes(item.name) ? 'hidden' : ''"

<!-- Múltiplas condições -->
:class="{ 'hidden': isCompleted && item.name === 'correto', 'opacity-50': attempts > 3 }"
```

### 4. Parar Áudios/Animações

Sempre pare sons/animações ao completar:

```vue
function onSuccess() { effectsStore.effectsAudiosLoop.stop() if (refAnimation.value) {
refAnimation.value.stop() } }
```

### 5. Delays para Transições

Use setTimeout para dar tempo de ver o resultado:

```vue
setTimeout(() => { router.push({ name: 'congratulation', ... }) }, 2000) // 2 segundos
```

### 6. Computed para Arrays Filtrados

```vue
const droppedItems = computed(() => items.filter(item => droppeds.value.includes(item.name)) )
```

### 7. Navegação Correta

```vue
router.push({ name: 'congratulation', params: { challenge: '{categoria}', // eco, edu, gov, ino,
laz, mei, sau level: {numero} // 1, 2, 3... } })
```

### 8. Audio ID Pattern

```
{categoria}_help{numero}
feedback_{categoria}_{descricao}

Exemplos:
- ino_help0
- feedback_inovacao_agua_pingando
- eco_help1
```

---

## Troubleshooting

### Sprite não aparece

1. Verifique o nome no CSS:

```bash
grep -r "nome_sprite" src/assets/style/generated-sprites/
```

2. Use exatamente o nome da classe (sem `spritesheet.`):

```vue
<BaseImg img="bebedouro_vasinho" />
<!-- OU -->
<div class="spritesheet bebedouro_vasinho"></div>
```

### Animação não funciona

1. Verifique se importou corretamente:

```javascript
import { drinkingFountain } from '@/consts/_animations'
```

2. Verifique se adicionou em `_animations.js`

3. Verifique props do BaseAnimation:

```vue
<BaseAnimation
  :spritesheet="animation.sprite"  <!-- Image object -->
  :json="animation.json"            <!-- JSON object -->
  autoplay
  :isLoop="true"
/>
```

### Áudio não toca

1. Verifique se existe em `audio.json`:

```bash
grep "nome_audio" src/assets/audios/audio.json
```

2. Verifique se está chamando corretamente:

```javascript
effectsStore.playAudio('nome_correto')
```

3. Para loops, use `playAudioLoop`:

```javascript
effectsStore.playAudioLoop('nome_audio')
```

### Drop não funciona

1. Verifique se `dataTransfer` do DragElement corresponde ao `expected` do DropElement:

```vue
<DragElement :dataTransfer="'item-1'" ... />
<DropElement :expected="['item-1']" @dropped="onDrop" />
```

2. Verifique se a área do DropElement cobre a zona desejada:

```vue
<DropElement ... class="absolute w-[300px] h-[350px] top-[500px] left-[700px]" />
```

---

## Recursos Adicionais

### Estrutura de Pastas Detalhada

```
src/
├── assets/
│   ├── animations/
│   │   └── {nome}/
│   │       ├── sprite.png
│   │       └── sprite.json
│   ├── audios/
│   │   ├── audio.mp3         # Sprite audio compilado
│   │   └── audio.json        # Mapa de sprites
│   └── images/
│       └── sprites/
├── components/
│   ├── animations/
│   │   ├── BaseAnimation.vue
│   │   ├── CursorClick.vue
│   │   ├── CursorDrag.vue
│   │   ├── CursorKeyboard.vue
│   │   ├── RobotAnimate.vue
│   │   └── SpeechBubble.vue
│   ├── interact/
│   │   ├── DragElement.vue
│   │   └── DropElement.vue
│   ├── layout/
│   │   ├── BoxComment.vue
│   │   ├── BoxCongrats.vue
│   │   └── ModalAtention.vue
│   └── media/
│       └── BaseImg.vue
├── consts/
│   ├── _animations.js        # Animações centralizadas
│   └── index.js
├── stores/
│   ├── effects.js            # Efeitos sonoros
│   ├── lines.js              # Falas/narração
│   └── sound.js              # Controle geral de som
└── views/
    └── challenge/
        └── {categoria}/
            ├── {Nome}View.vue
            ├── consts.js      # (opcional)
            └── components/    # (opcional)
```

### Referências Rápidas

#### Auto-imports disponíveis

O projeto usa unplugin-auto-import, então não precisa importar:

- `ref`, `computed`, `watch`, `onMounted`, etc. (Vue)
- `useRouter`, `useRoute` (Vue Router)
- Todas as stores (`useEffectsStore`, `useLinesStore`, etc.)
- Componentes globais

#### Tailwind Classes Comuns

```css
/* Posicionamento */
absolute, relative, fixed
top-[{px}], left-[{px}], bottom-[{px}], right-[{px}]

/* Display */
flex, flex-col, items-center, justify-center
hidden, block, inline-block

/* Sizing */
w-[{px}], h-[{px}]
scale-[{número}]

/* Espaçamento */
p-[{px}], m-[{px}]
px-[{px}], mx-[{px}]  /* horizontal */
py-[{px}], my-[{px}]  /* vertical */

/* Z-index */
z-[{número}]

/* Opacity */
opacity-{0-100}

/* Transformações */
rotate-[{deg}]
```

---

## Conclusão

Este guia cobre todo o processo de migração de desafios legados para Vue.js. Use-o como referência durante o desenvolvimento e adapte conforme necessário para cada desafio específico.

**Lembre-se:**

1. Analise cuidadosamente o código legado
2. Reutilize componentes existentes
3. Siga os padrões do projeto
4. Teste cada funcionalidade
5. Mantenha o código organizado e legível

Bom trabalho! 🚀
