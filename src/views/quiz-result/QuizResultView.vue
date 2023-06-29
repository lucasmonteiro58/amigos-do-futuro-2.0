<script setup>
import { robotBlue } from '@/consts/'
import { getBadgeName } from '@/utils'

const quizStore = useQuizStore()
const userStore = useUserStore()
const linesStore = useLinesStore()
const idAudio = ref(0)

const badgeName = computed(() => {
  return getBadgeName(quizStore.userBadge)
})

const genderName = computed(() => {
  return userStore.gender === 'boy' ? 'um amigo' : 'uma amiga'
})

const badgeImage = computed(() => {
  return `${quizStore.userBadge}-badge`
})

const audio = computed(() => {
  return userStore.gender === 'boy'
    ? `amigos_${quizStore.userBadge}`
    : `amigos_${quizStore.userBadge}1`
})

function repeat() {
  idAudio.value++
  linesStore.playAudio(audio.value)
}

onMounted(() => {
  idAudio.value++
  linesStore.playAudio(audio.value)
})
</script>

<template>
  <main class="spritesheet bg-congrats flex justify-center items-center">
    <BaseImg img="box-comment" class="overflow-visible mt-16">
      <div class="px-[160px] py-[70px] w-full h-full relative">
        <div>
          <RobotAnimate
            :key="idAudio"
            :animation="robotBlue"
            :time="4500"
            class="mb-6 animation__zoomIn absolute top-[-60px] left-[260px]"
            width="400px"
          >
          </RobotAnimate>
          <BaseImg
            img="box-robot-comment-down"
            width="500px"
            class="absolute top-[340px] left-[190px]"
          >
            <div class="pt-[120px] px-[35px]">
              <div
                class="text-[2.8rem] leading-[1] font-bungee text-primary-blue-text pt-10 text-center"
              >
                Você é {{ genderName }} d{{ badgeName[0] }} {{ badgeName[1] }}. Parabéns!
              </div>
            </div>
            <BaseButton
              @click="repeat"
              name="btn-toggle-repeat"
              width="90px"
              class="absolute right-6 bottom-6"
            ></BaseButton>
          </BaseImg>
        </div>
        <BaseImg :img="badgeImage" width="500px" class="absolute right-80 top-6" />
        <BaseButton
          name="btn-toggle-next"
          width="170px"
          class="absolute right-[-30px] top-[300px]"
        ></BaseButton>
      </div>
    </BaseImg>
  </main>
</template>
