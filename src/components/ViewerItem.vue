<template>
  <div class="mx-4 my-2 flex flex-col items-center bg-gray-800 relative">
    <div class="w-[90%] h-[90%] mx-4 mt-4 py-2 flex justify-between items-center overflow-hidden">
      <TetrisBoard class="w-full sm:w-[70%] h-[95%]" :board="board" :queue="queue" :PCLoopIndicator="PCLoopIndicator" />
      <sideUtility :loopArrays="loopArrays" :activeLoop="PCLoopIndicator" :activePage="currentPage[0] + 1"
        @change-page="updatePage" />
    </div>

    <footer class="w-[90%] h-[5%] mx-4 my-4 p-2 flex items-center justify-between absolute bottom-0">
      <div class="flex">
        <!-- Reset -->
        <ButtonIcon class="mr-2 w-6 h-6 sm:w-8 sm:h-8" @click="reset()" :title="'Reset'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path fill="currentColor"
              d="M224 128a96 96 0 0 1-94.71 96H128a95.38 95.38 0 0 1-65.9-26.2a8 8 0 0 1 11-11.63a80 80 0 1 0-1.67-114.78a3.07 3.07 0 0 1-.26.25l-10.54 9.65l17 17A8 8 0 0 1 72 112H24a8 8 0 0 1-8-8V56a8 8 0 0 1 13.66-5.7L49.31 70l10.94-10A96 96 0 0 1 224 128" />
          </svg>
        </ButtonIcon>
        <!-- BackPC -->
        <ButtonIcon class="mr-2 w-6 h-6 sm:w-8 sm:h-8" @click="backPC()" :title="'Last PC'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path fill="currentColor"
              d="M199.81 34a16 16 0 0 0-16.24.43L64 109.23V40a8 8 0 0 0-16 0v176a8 8 0 0 0 16 0v-69.23l119.57 74.78A15.95 15.95 0 0 0 208 208.12V47.88A15.86 15.86 0 0 0 199.81 34M192 208L64.16 128L192 48.07Z" />
          </svg>
        </ButtonIcon>
        <!-- BackPiece -->
        <ButtonIcon class="mr-2 w-6 h-6 sm:w-8 sm:h-8" @click="backPiece()" :title="'Last Piece'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path fill="currentColor"
              d="M224 128a8 8 0 0 1-8 8H59.31l58.35 58.34a8 8 0 0 1-11.32 11.32l-72-72a8 8 0 0 1 0-11.32l72-72a8 8 0 0 1 11.32 11.32L59.31 120H216a8 8 0 0 1 8 8" />
          </svg>
        </ButtonIcon>
        <!-- ForwardPiece -->
        <ButtonIcon class="mr-2 w-6 h-6 sm:w-8 sm:h-8" @click="forwardPiece()" :title="'Next Piece'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="inline-block">
            <path fill="currentColor"
              d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32" />
          </svg>
        </ButtonIcon>
        <!-- ForwardPC -->
        <ButtonIcon class="mr-2 w-6 h-6 sm:w-8 sm:h-8" @click="forwardPC()" :title="'Next PC'">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="inline-block">
            <path fill="currentColor"
              d="M200 32a8 8 0 0 0-8 8v69.23L72.43 34.45A15.95 15.95 0 0 0 48 47.88v160.24a16 16 0 0 0 24.43 13.43L192 146.77V216a8 8 0 0 0 16 0V40a8 8 0 0 0-8-8M64 207.93V48.05l127.84 80Z" />
          </svg>
        </ButtonIcon>
      </div>

      <div class="flex items-center text-teal-600 text-sm sm:text-base">
        <span class="font-semibold mr-2 select-none">{{ currentPage[1] }}p <span
            class="font-normal">@</span></span>
        <input type="number"
          class="w-8 inline-block text-center rounded border-1 shadow-teal-600 bg-gray-600 text-teal-200 focus:outline-none hover:bg-gray-500 focus:bg-gray-300 focus:text-gray-700 hover:shadow-gray-300 focus:shadow-gray-300 transition-color"
          :value="currentPage[0] + 1" @input="updatePage($event.target.value)" />
        <span class="ml-2 hidden sm:inline select-none">
          / {{ props.data.length }} PC
        </span>
      </div>

      <!-- Option -->
      <ButtonIcon class="w-6 h-6 md:w-8 md:h-8" @click="openOptions()" :title="'Option'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="inline-block">
          <path fill="currentColor"
            d="M232 184a8 8 0 0 1-8 8h-63.06a15.92 15.92 0 0 1-14.31-8.84L95.06 80H32a8 8 0 0 1 0-16h63.06a15.92 15.92 0 0 1 14.31 8.84L160.94 176H224a8 8 0 0 1 8 8M152 80h72a8 8 0 0 0 0-16h-72a8 8 0 0 0 0 16" />
        </svg>
      </ButtonIcon>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import TetrisBoard from './board/TetrisBoard.vue';
import sideUtility from './SideUtility.vue';

import ButtonIcon from './icons/ButtonIcon.vue';


onMounted(() => {
  console.log(props.data.length)
  currentPage.value = [0, 0]
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
}</style>