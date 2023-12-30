<template>
  <div class="w-[80%] rounded overflow-clip">
    <div v-for="pc, index in PCArrays" :key="index" :id="'P' + pc.PCNumber"
      class="w-full h-8 flex justify-center items-center hover:cursor-pointer" @click="$emit('pageClicked', pc.PCNumber)">
      <div
        class="text-sm leading-6 group hover:opacity-100 transition-all duration-200 font-mono"
        :class="{ 'opacity-60': pc.PCNumber != activePage, 'font-semibold': pc.PCNumber == activePage }">
        <span class="font-mono select-none text-gray-100 group-hover:text-teal-300 hidden lg:inline">{{ pc.PCNumber + " "}}</span>
        <span class="font-mono select-none text-gray-100 group-hover:text-teal-300">{{ pc.initialQueue.substring(0, queueSplitter) + " " }}</span>
        <span class="font-mono select-none text-gray-400 group-hover:text-teal-500" v-if="loop != '1'">{{ pc.initialQueue.substring(queueSplitter) }}</span>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';

onMounted(() => {
  if (!props.isActive) return
  const activePage = document.getElementById('P' + props.activePage)
  if (activePage) {
    activePage.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
})

defineEmits(['pageClicked'])

const props = defineProps({
  PCArrays: Object,
  activePage: Number,
  loop: String,
  isActive: Boolean
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