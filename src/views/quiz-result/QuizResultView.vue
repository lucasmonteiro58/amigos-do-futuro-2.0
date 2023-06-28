<script setup>
import { robotBlue } from '@/consts/'
</script>

<template>
  <main class="spritesheet bg-congrats flex justify-center items-center">
    <BaseImg img="box-comment" class="overflow-visible mt-16">
      <div class="px-[160px] py-[70px] w-full h-full relative">
        <div>
          <RobotAnimate
            :animation="robotBlue"
            :time="1000"
            class="mb-6 animation__zoomIn absolute top-[-60px] left-[260px]"
            width="400px"
          >
          </RobotAnimate>
          <BaseImg
            img="box-robot-comment-down"
            width="500px"
            class="absolute top-[340px] left-[190px]"
          >
            <div class="pt-[100px] px-[30px]">
              <div class="text-3xl font-bungee text-primary-blue">
                Você é amigo do governo. Parabéns!
              </div>
            </div>
          </BaseImg>
        </div>
      </div>
    </BaseImg>
  </main>
</template>
