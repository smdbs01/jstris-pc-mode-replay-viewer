<template>
  <div class="w-full h-8 rounded flex justify-center hover:cursor-pointer" @click="$emit('loopClicked', loop)"
    :class="{ 'opacity-60': !isActive }" tabindex="0">
    <div class="text-gray-200 font-normal text-lg leading-6 py-1 hover:text-teal-300 transition-all duration-200"
      :class="{ 'font-semibold': isActive }">
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