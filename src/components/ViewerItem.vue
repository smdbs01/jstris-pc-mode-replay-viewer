<template>
  <div class="mx-4 my-2 flex flex-col items-center bg-gray-800 relative">
    <div class="w-[90%] h-[90%] mx-4 mt-4 py-2 flex justify-between items-center overflow-hidden">
      <TetrisBoard class="w-full sm:w-[70%] h-[95%]" :board="board" :queue="queue" :PCLoopIndicator="PCLoopIndicator" />
      <sideUtility :loopArrays="loopArrays" :activeLoop="PCLoopIndicator" :activePage="currentPage[0] + 1"
        @change-page="updatePage" />
    </div>

    <BottomUtility :current-page="currentPage" :mxPC="props.data.length" @changePage="updatePage" @openOptions="openOptions" @backPiece="backPiece"
      @forwardPiece="forwardPiece" @backPC="backPC" @forwardPC="forwardPC" @reset="reset" />


  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import TetrisBoard from './board/TetrisBoard.vue';
import sideUtility from './sidebar/SideUtility.vue';
import BottomUtility from './footer/BottomUtility.vue';

onMounted(() => {
  console.log(props.data.length)
})

const props = defineProps({
  data: Object
})

const currentPage = ref([0, 0])
watch(() => props.data.length, () => {
  currentPage.value = [0, 0]
})

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

/*
 * Events
 */

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