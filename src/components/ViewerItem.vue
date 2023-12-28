<template>
  <div class="mx-4 flex flex-col items-center bg-gray-800 relative">
		<div class="w-[90%] h-[90%] mx-4 mt-4 p-2 flex justify-between items-center">
			<TetrisBoard :board="board" :queue="queue" :PCLoopIndicator="PCLoopIndicator"/>
			<sideUtility />
		</div>

		<footer class="w-[90%] h-[5%] mx-4 mt-4 p-2 flex items-center justify-between absolute bottom-0">
      <div class="">
        <ButtonItem icon-class="i-ph-rewind" @click="reset()"/>
        <ButtonItem icon-class="i-ph-skip-back" @click="backPC()"/>
        <ButtonItem icon-class="i-ph-arrow-left" @click="backPiece()"/>
        <ButtonItem icon-class="i-ph-arrow-right" @click="forwardPiece()"/>
        <ButtonItem icon-class="i-ph-skip-forward" @click="forwardPC()"/>
      </div>
			<ButtonItem iconClass="i-ph-option" @click="openOptions()"/>
		</footer>
  </div>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	import ButtonItem from './ButtonItem.vue';
	import TetrisBoard from './TetrisBoard.vue';
	import sideUtility from './SideUtility.vue';

  onMounted(() => {
    console.log('mounted')
    console.log(props.data[currentPage.value[0]].stateArray[currentPage.value[1]].queue)
  })

	const props = defineProps({
		data: Object
	})

  const currentPage = ref([0, 4])

  const board = computed(() => {
    return props.data[currentPage.value[0]].stateArray[currentPage.value[1]].board
  })

  const queue = computed(() => {
    return props.data[currentPage.value[0]].stateArray[currentPage.value[1]].queue
  })

  const PCLoopIndicator = computed(() => {
    return props.data[currentPage.value[0]].PCLoopIndicator
  })

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
    console.log(currentPage.value)
  }

  function backPiece() {
    if (currentPage.value[1] > 0) {
      currentPage.value[1] -= 1
    } else if (currentPage.value[0] > 0) {
      currentPage.value[0] -= 1
      currentPage.value[1] = props.data[currentPage.value[0]].stateArray.length - 1
    }
    console.log(currentPage.value)
  }

  function forwardPiece() {
    if (currentPage.value[1] < props.data[currentPage.value[0]].stateArray.length - 1) {
      currentPage.value[1] += 1
    } else if (currentPage.value[0] < props.data.length - 1) {
      currentPage.value[0] += 1
      currentPage.value[1] = 0
    }
    console.log(currentPage.value)
  }
  function forwardPC() {
    if (currentPage.value[0] < props.data.length - 1) {
      currentPage.value[0] += 1
      currentPage.value[1] = 0
    } else {
      currentPage.value[1] = props.data[currentPage.value[0]].stateArray.length - 1
    }
    console.log(currentPage.value)
  }

</script>

<style scoped>

</style>