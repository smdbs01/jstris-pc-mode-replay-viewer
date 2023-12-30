<template>
  <div class="w-full h-8 rounded bg-gray-800 z-10 flex justify-center hover:cursor-pointer" @click="$emit('loopClicked', loop)"
     tabindex="0">
    <div class="py-1 text-gray-200 select-none font-normal text-lg leading-6 hover:text-teal-300 transition-all duration-200"
      :class="{ 'font-semibold': isActive, 'opacity-60': !isActive }">
      {{ computedLoopIndicator }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  loop: String,
  isActive: Boolean,
})

defineEmits(['loopClicked'])

const suffix = ["0", "st", "nd", "rd", "th"]
const computedLoopIndicator = computed(() => {
  return props.loop + suffix[Math.min(parseInt(props.loop), 4)]
})

</script>

<style scoped></style>