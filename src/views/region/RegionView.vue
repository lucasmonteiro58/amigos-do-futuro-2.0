<script setup>
const userStore = useUserStore()
const region = computed(() => userStore.region)
const router = useRouter()

const robotLine = computed(() => {
  return `Você sabia que o Ceará é dividido em 14 regiões e a sua cidade fica n${region.value?.vowal} <span class='text-primary-green-text'>${region.value?.name}</span>?`
})

const regionImg = computed(() => {
  return `pc_${region.value?.id}`
})

const regionAudio = computed(() => {
  return `regiao_${region.value?.id}`
})

const regionInfo = computed(() => {
  return region.value?.info
})

function goToMap() {
  router.push({ name: 'map' })
}
</script>

<template>
  <div class="flex bg-gradient-to-r from-[#43AD82] to-[#338260] justify-center items-center pt-12">
    <BoxComment :line="robotLine" :time="6700" :audio="regionAudio">
      <BaseImg img="box-regions-left" class="absolute top-[500px] left-[680px]">
        <div
          class="text-center text-3xl w-full h-full flex justify-center items-center font-semibold"
        >
          <div class="pb-1 pr-5" v-html="regionInfo"></div>
        </div>
      </BaseImg>
      <div
        class="absolute flex justify-center items-center w-[400px] h-[400px] top-[400px] left-[1150px]"
      >
        <BaseImg :img="regionImg" class="scale-[1.5]"></BaseImg>
      </div>
      <div class="absolute right-[-40px] top-[400px]">
        <BaseButton name="btn-toggle-next " width="170px" @click="goToMap"></BaseButton>
      </div>
    </BoxComment>
  </div>
</template>
