<script setup>
const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}

const showModal = ref(false)

const data = useVModel(showModal, 'modelValue', emit)
</script>

<template>
  <ModalAtention v-model="data" @close="closeModal" is-custom>
    <div class="relative spritesheet box-other-badges p-5">
      <div class="flex items-center justify-center py-12 flex-col">
        <BaseButton
          name="btn-toggle-close"
          class="absolute right-[-2%] top-[-2%]"
          width="140px"
          @click="closeModal"
        />
        <h1 class="text-7xl font-bold font-bungee text-primary-blue-text mb-12">Créditos</h1>

        <div class="flex items-center justify-center gap-4 mt-20">
          <BaseImg img="logo-complete" width="350px" />
          <ul class="font-bold text-2xl">
            <li>Débora - Programação</li>
            <li>Lucas - Programação</li>
            <li>Gabriel -Ilustração/Animação</li>
            <li>Raissa - Design de Interface/Animação</li>
            <li>Samuel - Ilustração/Animação</li>
            <li>Vitória - Gestão de Projetos/Conteúdo</li>
          </ul>
        </div>
        <div class="flex items-center justify-center gap-4 mt-20">
          <BaseImg img="logoceara" width="400px" />
        </div>
      </div>
    </div>
  </ModalAtention>
</template>
