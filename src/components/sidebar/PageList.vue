<template>
  <div class="w-[80%] rounded overflow-clip">
    <div v-for="pc, index in PCArrays" :key="index" :id="'P' + pc.PCNumber"
      class="w-full h-8 flex justify-center items-center hover:cursor-pointer" @click="$emit('pageClicked', pc.PCNumber)">
      <div class="text-sm leading-6 group hover:opacity-100 transition-all duration-200 font-mono"
        :class="{ 'opacity-60': pc.PCNumber != activePage, 'font-semibold': pc.PCNumber == activePage }">
        <span class="font-mono select-none text-gray-100 group-hover:text-teal-300 hidden lg:inline">{{ pc.PCNumber + " "}}</span>
        <span class="font-mono select-none text-gray-100 group-hover:text-teal-300"
          :class="{ 'text-red-400': badSaveHightlight && isBadSave(pc.initialQueue) }">{{ pc.initialQueue.substring(0,
            queueSplitter) + " " }}</span>
        <span class="font-mono select-none text-gray-400 group-hover:text-teal-500" v-if="loop != '1'">{{
          pc.initialQueue.substring(queueSplitter) }}</span>
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
  isActive: Boolean,
  badSaveHightlight: Boolean
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

// https://github.com/smdbs01/jstris-pc-mode-replay-viewer/issues/1
function isBadSave(queue) {
  if (queue.length < 7) {
    return false
  }

  const pieces = queue2Pieces(queue.substring(0, queueSplitter.value))

  // Some bad switch-case
  switch (props.loop) {
    case "1":
      return pieces['T'] == 0 && (pieces['Z'] > 1 || pieces['S'] > 1)
    case "2":
      return pieces['T'] == 0 && (pieces['J'] + pieces['L'] % 2 == 1)
    case "3":
      return pieces['T'] == 0 && pieces['O'] == 0 && pieces['I'] == 0
    case "4":
      return pieces['T'] == 0 && (pieces['J'] + pieces['L'] == 1)
    case "5":
      return pieces['T'] == 0 && pieces['I'] == 0 && (pieces['J'] + pieces['L'] < 2) && (pieces['S'] + pieces['Z'] > 0)
    case "6":
      return pieces['T'] == 0 || pieces['I'] == 0
    case "7":
      return false
    default:
      return false
  }
}

function queue2Pieces(queue) {
  const ret = { 'I': 0, 'O': 0, 'T': 0, 'L': 0, 'J': 0, 'S': 0, 'Z': 0 }
  for (let i = 0; i < queue.length; i++) {
    ret[queue[i]] += 1
  }
  return ret
}


</script>

<style scoped></style>