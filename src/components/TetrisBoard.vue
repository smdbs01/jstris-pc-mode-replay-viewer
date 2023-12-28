<template>
  <div class="w-[70%] h-[95%] flex flex-col justify-between items-center relative">
    <!-- Hold and Queue, + board if screen width is large-->
    <div class="w-full h-[70%] lg:h-full flex justify-between">
      <!-- Hold -->
      <TetriminoItem class="w-28 h-28" skin="purecolor" :type="computedHold" :class="{'hidden': !hasHold}"/>
      
      <!-- Current -->
      <div class="w-28 h-full flex flex-col justify-end">
        <TetriminoItem skin="purecolor" :type="computedCurrentPiece" />
      </div>

      <!-- Board if screen width is large -->
      <div class="w-70 h-full hidden lg:flex lg:flex-col lg:justify-end">
        <div v-for="row, index in computedBoard" :key="index" class="w-70 h-7 flex">
          <MinoItem v-for="t, index in row" :key="index" skin="purecolor" :type="t" class="w-7 h-7" />
        </div>
      </div>

      <!-- Queue -->
      <div class="w-28 c-[90%] flex flex-col">
        <TetriminoItem v-for="t, index in computedQueue" :class="{ 'mt-7': index > 0 }" :key="index" :skin="t.skin" :type="t.type" />
      </div>
    </div>

    <!-- Partial board if screen width is small -->
    <div class="w-70 h-[25%] mt-2 b-gray b-solid b-t-none flex flex-col justify-end xs:absolute xs:pos-left-0 xs:bottom-0 lg:hidden">
      <div v-for="row, index in computedBoard" :key="index" class="w-70 h-7 flex">
        <MinoItem v-for="t, index in row" :key="index" skin="purecolor" :type="t" class="w-7 h-7" />
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
    console.log('mounted')
    console.log(props.queue)
  })

  const hasHold = computed(() => {
    return props.queue.length === 7
  })

  const computedHold = computed(() => {
    if (!hasHold.value) return
    return props.queue[1]
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
    return props.queue[0]
  })

  const computedBoard = computed(() => {
    const ret = []
    for (let i = 0; i < 4; i++) {
      const row = []
      for (let j = 0; j < 10; j++) {
        row.push(props.board[i*10+j])
      }
      ret.push(row)
    }
    return ret
  })
</script>

<style scoped>

</style>