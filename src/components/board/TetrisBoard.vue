<template>
  <div class="flex flex-col justify-between items-center relative">
    <!-- Hold and Queue + LG Board-->
    <div class="w-full h-[70%] ml-4 lg:h-full flex justify-between">
      <!-- Hold + PC # -->
      <div class="w-[7.5rem] h-full flex flex-col justify-between relative">
        <div>
          <div class="h-[5.25rem] w-[7.5rem] relative">
            <TetriminoItem class="pr-2 pb-2 xs:absolute xs:right-2" skin="purecolor" :type="computedHold"
              :class="{ 'hidden': !hasHold }" />
          </div>
          <div class="pl-7 pt-7 text-teal-400 font-medium text-3xl sm:hidden">{{ computedLoopIndicator }}</div>
        </div>
        
        <!-- XS: Current piece -->
        <div class="w-28 h-14 relative sm:hidden">
          <TetriminoItem class="sm:hidden absolute bottom-[-1rem]" skin="purecolor"
            :type="computedCurrentPiece" />
        </div>
      </div>


      <!-- SM: Current piece -->
      <div class="w-28 h-full flex-col justify-end relative hidden sm:flex lg:hidden">
        <TetriminoItem class="absolute right-7 bottom-[-1rem]" skin="purecolor" :type="computedCurrentPiece" />
      </div>

      <!-- LG: Board -->
      <div class="w-[17.5rem] h-full border-2 border-indigo-200 border-solid border-t-0 hidden lg:flex lg:flex-col lg:justify-end lg:items-center">
        <!-- LG: Current -->
        <div class="w-28 flex-col justify-end relative hidden lg:flex">
          <TetriminoItem class="absolute bottom-[7.5rem]" skin="purecolor" :type="computedCurrentPiece" />
        </div>

        <!-- LG: Board -->
        <div v-for="row, index in computedBoard" :key="index" class="w-[17.5rem] h-7 flex border-2 border-indigo-200 border-solid border-y-0">
          <MinoItem v-for="t, index in row" :key="index" skin="purecolor" :type="t" class="w-7 h-7" :class="{'opacity-0': t === 'N'}"/>
        </div>
      </div>

      <!-- Queue -->
      <div class="w-28 c-[90%] flex flex-col">
        <TetriminoItem v-for="t, index in computedQueue" :class="{ 'mt-7': index > 0 }" :key="index" :skin="t.skin"
          :type="t.type" />
      </div>
    </div>

    <!-- XS: Board -->
    <div
      class="w-[17.5rem] h-[25%] mt-2 border-2 border-indigo-200 border-solid border-t-0 flex flex-col justify-end xs:absolute xs:left-0 xs:bottom-0 lg:hidden">
      <div v-for="row, index in computedBoard" :key="index" class="w-full h-7 flex">
        <MinoItem v-for="t, index in row" :key="index" skin="purecolor" :type="t" class="w-7 h-7" :class="{'opacity-0': t === 'N'}" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import TetriminoItem from './TetriminoItem.vue';
import MinoItem from './MinoItem.vue';

const props = defineProps({
  board: String,
  queue: String,
  PCLoopIndicator: Number
})

onMounted(() => {

})

const suffix = ["0", "st", "nd", "rd", "th"]
const computedLoopIndicator = computed(() => {
  return props.PCLoopIndicator + suffix[Math.min(props.PCLoopIndicator, 4)]
})

const hasHold = computed(() => {
  return props.queue.length === 7
})

const computedHold = computed(() => {
  if (!hasHold.value) return
  return props.queue[0]
})

const computedQueue = computed(() => {
  const n = props.queue.length
  let ret = []
  for (let i = n - 5; i < n; i++) {
    ret.push({
      type: props.queue[i],
      skin: "purecolor"
    })
  }
  return ret;
})

const computedCurrentPiece = computed(() => {
  return hasHold.value ? props.queue[1] : props.queue[0]
})

const computedBoard = computed(() => {
  const ret = []
  for (let i = 0; i < 4; i++) {
    const row = []
    for (let j = 0; j < 10; j++) {
      row.push(props.board[i * 10 + j])
    }
    ret.push(row)
  }
  return ret
})
</script>

<style scoped></style>