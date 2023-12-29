<template>
  <div class="rounded flex justify-center hover:cursor-pointer" @click="expand()"
  :class="[bgColors[loop], hoverColors[loop], { 'opacity-50': !isActive }]" tabindex="0">
    <div class="text-gray-900 font-400 text-lg line-height-normal py-1">
      {{ computedLoopIndicator }}
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';

const props = defineProps({
  loop: String,
  isActive: Boolean,
})

onMounted(() => {
  console.log(props.isActive)
})

const bgColors = [
  "", // Not used
  "bg-slate-300",
  "bg-green-300",
  "bg-purple-300",
  "bg-yellow-300",
  "bg-red-300",
  "bg-orange-500",
  "bg-teal-400"
]

const hoverColors = [
  "",
  "hover:bg-slate-400",
  "hover:bg-green-400",
  "hover:bg-purple-400",
  "hover:bg-yellow-400",
  "hover:bg-red-400",
  "hover:bg-orange-600",
  "hover:bg-teal-500"
]

const suffix = ["0", "st", "nd", "rd", "th"]
const computedLoopIndicator = computed(() => {
  return props.loop + suffix[Math.min(parseInt(props.loop), 4)]
})

</script>

<style scoped></style>