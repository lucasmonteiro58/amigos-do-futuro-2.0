<script setup></script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet cenariogoverno_ong">
    <SpeechBubble
      title="Ajude!"
      description="Receba as doações de alimento do bairro para ajudar a Associação."
      audio="gov_help1"
      :time="6700"
    />
    <BaseImg img="ong_cesta_governo" class="absolute top-[723px] left-[1035px]" />
    <CursorDrag class="absolute bottom-[150px] left-[443px]" />
  </main>
</template>
