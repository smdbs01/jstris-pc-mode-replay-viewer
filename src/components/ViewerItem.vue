<template>
  <div class="mx-4 my-2 flex flex-col items-center bg-gray-800 relative">
    <div class="w-[90%] h-[90%] mx-4 mt-4 py-2 flex justify-between items-center overflow-hidden">
      <TetrisBoard class="w-full sm:w-[70%] h-[95%]" :board="board" :queue="queue" :PCLoopIndicator="PCLoopIndicator" />
      <sideUtility :loopArrays="loopArrays" :activeLoop="PCLoopIndicator" :activePage="currentPage[0] + 1"
        @change-page="updatePage" />
    </div>

    <footer class="w-[90%] h-[5%] mx-4 my-4 p-2 flex items-center justify-between absolute bottom-0">
      <div class="flex">
        <RewindIcon class="mr-2" @click="reset()" />
        <SkipbackIcon class="mr-2" @click="backPC()" />
        <ArrowleftIcon class="mr-2" @click="backPiece()" />
        <ArrowrightIcon class="mr-2" @click="forwardPiece()" />
        <SkipforwardIcon class="mr-2" @click="forwardPC()" />

        <!-- Unocss implementation -->
        <!-- <ButtonItem icon-class="i-ph-rewind" class="mr-2" "> -->
        <!-- <ButtonItem icon-class="i-ph-skip-back" class="mr-2" @click="backPC()" /> -->
        <!-- <ButtonItem icon-class="i-ph-arrow-left" class="mr-2" @click="backPiece()" /> -->
        <!-- <ButtonItem icon-class="i-ph-arrow-right" class="mr-2" @click="forwardPiece()" /> -->
        <!-- <ButtonItem icon-class="i-ph-skip-forward" class="mr-2" @click="forwardPC()" />  -->
      </div>

      <div class="flex items-center text-teal-600">
        <input type="number"
          class="w-7 inline-block mr-1 text-center rounded border-1 shadow-teal-600 bg-gray-600 text-teal-200 focus:outline-none hover:bg-gray-500 focus:bg-gray-300 focus:text-gray-700 hover:shadow-gray-300 focus:shadow-gray-300 transition-color"
          :value="currentPage[0] + 1" @input="updatePage($event.target.value)" /> / {{ props.data.length }} PC
      </div>

      <OptionIcon @click="openOptions()" />
      <!-- <ButtonItem iconClass="i-ph-option" @click="openOptions()" /> -->
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import TetrisBoard from './TetrisBoard.vue';
import sideUtility from './SideUtility.vue';

import RewindIcon from './icons/RewindIcon.vue';
import SkipbackIcon from './icons/SkipbackIcon.vue'
import ArrowleftIcon from './icons/ArrowleftIcon.vue';
import ArrowrightIcon from './icons/ArrowrightIcon.vue';
import SkipforwardIcon from './icons/SkipforwardIcon.vue';
import OptionIcon from './icons/OptionIcon.vue';



onMounted(() => {
  console.log(props.data.length)
})

const props = defineProps({
  data: Object
})

const currentPage = ref([0, 0])

const loopArrays = computed(() => {
  const ret = {}
  for (let i = 0; i < props.data.length; i++) {
    const loop = props.data[i].PCLoopIndicator
    if (ret[loop] === undefined) {
      ret[loop] = []
    }

    ret[loop].push({
      PCNumber: i + 1,
      initialQueue: props.data[i].stateArray[0].queue,
    })
  }
  return ret
})

const board = computed(() => {
  return props.data[currentPage.value[0]].stateArray[currentPage.value[1]].board
})

const queue = computed(() => {
  return props.data[currentPage.value[0]].stateArray[currentPage.value[1]].queue
})

const PCLoopIndicator = computed(() => {
  return props.data[currentPage.value[0]].PCLoopIndicator
})

function updatePage(newPage) {
  if (newPage > 0 && newPage <= props.data.length) {
    currentPage.value[0] = newPage - 1
    currentPage.value[1] = 0
  } else if (newPage <= 0) {
    currentPage.value[0] = 0
  } else {
    currentPage.value[0] = props.data.length - 1
  }
}

/*
 * Onclick events
 */
function reset() {
  currentPage.value = [0, 0]
}

function backPC() {
  if (currentPage.value[0] > 0) {
    currentPage.value[0] -= 1
    currentPage.value[1] = 0
  } else {
    currentPage.value[1] = 0
  }
}

function backPiece() {
  if (currentPage.value[1] > 0) {
    currentPage.value[1] -= 1
  } else if (currentPage.value[0] > 0) {
    currentPage.value[0] -= 1
    currentPage.value[1] = props.data[currentPage.value[0]].stateArray.length - 1
  }
}

function forwardPiece() {
  if (currentPage.value[1] < props.data[currentPage.value[0]].stateArray.length - 1) {
    currentPage.value[1] += 1
  } else if (currentPage.value[0] < props.data.length - 1) {
    currentPage.value[0] += 1
    currentPage.value[1] = 0
  }
}
function forwardPC() {
  if (currentPage.value[0] < props.data.length - 1) {
    currentPage.value[0] += 1
    currentPage.value[1] = 0
  } else {
    currentPage.value[1] = props.data[currentPage.value[0]].stateArray.length - 1
  }
}

function openOptions() {
  console.log('open options')
}

</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>