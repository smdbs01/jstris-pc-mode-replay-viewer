<template>
  <div class="w-7 h-7" :style="{ backgroundImage: 'url(src/assets/imgs/skins/' + skin + '/' + type + '.png)' }"></div>
</template>

<script setup>
defineProps({
  skin: String,
  type: String
})
</script>

<style scoped></style>