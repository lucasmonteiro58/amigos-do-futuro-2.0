<script setup>
const obj = ref({
  accessibility: false,
  paint: false,
  trees: false,
  bus: false,
  garden: false,
  park: false,
  trash: false
})

function setVisibility(type) {
  obj.value[type] = !obj.value[type]
}
</script>

<template>
  <main class="spritesheet cenarioescola_fora flex justify-center items-center flex-col">
    <div class="spritesheet barradeitens relative bottom-[-435px] flex justify-evenly">
      <BaseButton
        name="escolaf_bt_acessib_normal"
        @click="setVisibility('accessibility')"
      ></BaseButton>
      <BaseButton name="escolaf_bt_pintar_normal" @click="setVisibility('paint')"></BaseButton>
      <BaseButton name="escolaf_bt_arbori_normal" @click="setVisibility('trees')"></BaseButton>
      <BaseButton name="escolaf_bt_bus_normal" @click="setVisibility('bus')"></BaseButton>
      <BaseButton name="escolaf_bt_horta_normal" @click="setVisibility('garden')"></BaseButton>
      <BaseButton name="escolaf_bt_parque_normal" @click="setVisibility('park')"></BaseButton>
      <BaseButton name="escolaf_bt_lixo_png" @click="setVisibility('trash')"></BaseButton>
    </div>
    <BaseImg img="escolaf_escolafora_antes" class="absolute bottom-[380px]"></BaseImg>
    <BaseImg
      v-if="obj.paint"
      img="escolaf_escolafora_pintada"
      class="absolute bottom-[380px]"
    ></BaseImg>
    <BaseImg
      v-if="obj.accessibility"
      img="escolaf_rampaacessibilidade"
      class="absolute bottom-[338px] left-[885px]"
    ></BaseImg>
    <BaseImg
      v-if="obj.trees"
      img="escolaf_arvores1"
      class="absolute bottom-[240px] left-[-60px]"
    ></BaseImg>
    <BaseImg
      v-if="obj.trees"
      img="escolaf_arvores2"
      class="absolute bottom-[390px] right-[-20px]"
    ></BaseImg>
    <BaseImg
      v-if="obj.bus"
      img="escolaf_onibusescolar"
      class="absolute bottom-[280px] left-[490px]"
    ></BaseImg>
    <BaseImg
      v-if="obj.garden"
      img="escolaf_horta"
      class="absolute bottom-[320px] left-[150px]"
    ></BaseImg>
    <BaseImg
      v-if="obj.park"
      img="escolaf_parquinho"
      class="absolute bottom-[320px] left-[1440px]"
    ></BaseImg>
    <BaseImg
      v-if="obj.trash"
      img="escolaf_lixeirasseletivas"
      class="absolute bottom-[388px] left-[1155px]"
    ></BaseImg>
    <SpeechBubble
      title="Super Escola!"
      description="Adicione 5 coisas que você gostaria que tivesse na sua escola e veja o que acontece."
      audio="edu_help0"
      :time="7500"
    ></SpeechBubble>
  </main>
</template>
