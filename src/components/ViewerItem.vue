<template>
  <div class="mx-4 my-2 flex flex-col items-center bg-gray-800 relative shadow-md">
    <div class="w-[90%] h-[90%] mx-4 mt-4 py-2 flex justify-between items-center overflow-hidden">
      <TetrisBoard class="w-full sm:w-[70%] h-[95%]" :board="board" :queue="queue" :PCLoopIndicator="PCLoopIndicator" />
      <sideUtility :loopArrays="loopArrays" :activeLoop="PCLoopIndicator" :activePage="currentPage[0] + 1"
        @change-page="updatePage" />
    </div>

    <BottomUtility :current-page="currentPage" :mxPC="props.data.length" @changePage="updatePage"
      @openOptions="openOptions" @backPiece="backPiece" @forwardPiece="forwardPiece" @backPC="backPC"
      @forwardPC="forwardPC" @reset="reset" />

    <PCUtils :button-list="buttonList" @open-solver="openSolver" @open-fumen="openFumen" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { Field, encoder } from 'tetris-fumen';

import TetrisBoard from './board/TetrisBoard.vue';
import sideUtility from './sidebar/SideUtility.vue';
import BottomUtility from './footer/BottomUtility.vue';
import PCUtils from './pcutil/PCUtils.vue';

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

/**
 * Array of 7 types of PC
 */
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

/**
 * Current Board
 */
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
 * Button Events
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

/**
 * PC Utility
 */

const buttonList = [
  {
    label: "solver",
    onClick: 'open-solver',
    enabled: true
  },
  {
    label: "fumen",
    onClick: 'open-fumen',
    enabled: false
  }
]

const pieceTable = {
  'I': 2, 2: 'I',
  'O': 3, 3: 'O',
  'T': 5, 5: 'T',
  'L': 7, 7: 'L',
  'J': 11, 11: 'J',
  'S': 13, 13: 'S',
  'Z': 17, 17: 'Z'
}
const bagProduct = 510510

function openSolver() {
  if (currentPage.value[1] < 3) {
    console.log('Less than 3 pieces placed')
    return
  }

  // https://github.com/JstrisPlus/jstris-plus-userscript
  const msg = {
    field: Field.create(board.value.replaceAll('N', '_')),
    comment: generateQueue()
  }
  let fumen = encoder.encode([msg])

  window.open(`https://wirelyre.github.io/tetra-tools/pc-solver.html?fumen=${encodeURIComponent(fumen)}`, '_blank')
}

function openFumen() {
  const msg = {
    field: Field.create(board.value.replaceAll('N', '_')),
    comment: generateFumenQueue()
  }
  let fumen = encoder.encode([msg])

  window.open(`https://fumen.zui.jp/?${fumen}`, '_blank')
}

function generateQueue() {
  const lim = Math.min(10 - currentPage.value[1] + 1, queue.value.length)

  let r = queue.value.substring(0, lim)
  if (queue.value.length === 7 && PCLoopIndicator.value === 2 && currentPage.value[1] === 3) {
    let bag = 1
    for (let i = 1; i < 7; i++) {
      let cur = queue.value.substring(i, i + 1)
      bag = bag * pieceTable[cur]
    }
    r += pieceTable[parseInt(bagProduct / bag)]
  }
  return r
}

function generateFumenQueue() {
  const r1 = queue.value.substring(0, 1)
  let q = ""
  if (queue.value.length === 7) {
    const r2 = queue.value.substring(1, 2)

    // if PCLoopIndicator = 2 and currentPage = 3, then flag = 1
    const flag = (PCLoopIndicator.value === 2 && currentPage.value[1] === 3) ? 1 : 0
    let bag = pieceTable[r2]
    q = `#Q=[${r2}](${r1})`

    for (let i = 2; i < 7; i++) {
      let cur = queue.value.substring(i, i + 1)
      q += cur
      bag = bag * pieceTable[cur]
    }

    if (flag === 1) { // We need to add the last piece
      q += pieceTable[parseInt(bagProduct / bag)]
    }
  } else {
    q = `#Q=[](${r1})` + queue.value.substring(1)
  }
  return q
}

</script>

<style scoped></style>