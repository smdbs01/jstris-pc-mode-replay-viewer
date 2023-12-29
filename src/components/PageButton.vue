<template>
  <div class="w-20 h-12 rounded-md text-center">
  {{ index + ", " + loop +
      suffix[Math.min(loop, 4)] }}
  </div>
</template>

<script setup>
defineProps({
  loop: Number,
  index: Number,
  isActive: Boolean
})

const suffix = ["0", "st", "nd", "rd", "th"]
</script>

<style scoped></style>