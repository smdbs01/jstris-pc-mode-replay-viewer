<template>
  <div class="w-[80%] rounded overflow-clip">
    <div v-for="pc, index in PCArrays" :key="index"
      class="w-full h-8 flex justify-center items-center hover:cursor-pointer" @click="$emit('pageClicked', pc.PCNumber)">
      <div
        class="text-sm line-height-normal group hover:opacity-100 transition-all duration-200"
        :class="{ 'opacity-60': pc.PCNumber != activePage, 'font-600': pc.PCNumber == activePage }">
        <span class="font-mono text-gray-100 group-hover:text-teal-300">{{ pc.initialQueue.substring(0, queueSplitter) + " " }}</span>
        <span class="font-mono text-gray-400 group-hover:text-teal-500" v-if="loop != '1'">{{ pc.initialQueue.substring(queueSplitter) }}</span>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

defineEmits(['pageClicked'])

const props = defineProps({
  PCArrays: Object,
  activePage: Number,
  loop: String
})

const queueSplitter = computed(() => {
  switch (props.loop) {
    case "1":
      return 7
    case "2":
      return 4
    case "3":
      return 1
    case "4":
      return 5
    case "5":
      return 2
    case "6":
      return 6
    case "7":
      return 3
    default:
      return 0
  }
})


</script>

<style scoped>
</style>