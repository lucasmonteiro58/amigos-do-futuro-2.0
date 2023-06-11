<script setup>
const router = useRouter()

function startGame() {
  router.push({ name: 'form' })
}
</script>

<template>
  <div class="spritesheet bg-home flex items-center justify-center flex-col">
    <BaseImg img="logo-complete"></BaseImg>
    <div class="font-norwester mt-[60px] mb-[20px] text-center font-bold text-[85px]">00000</div>
    <BaseButton name="btn-start" @click="startGame"></BaseButton>
    <div class="text-xl mt-8">
      Aqui é a quantidade de Amigos do Futuro que já passaram por aqui.
    </div>
  </div>
</template>
