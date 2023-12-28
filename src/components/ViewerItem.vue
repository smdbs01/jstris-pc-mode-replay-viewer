<template>
  <div class="mx-4 flex flex-col items-center bg-gray-800 relative">
		<div class="w-[90%] h-[90%] mx-4 mt-4 p-2 flex justify-between items-center">
			<TetrisBoard :board="board" :queue="queue" :PCLoopIndicator="PCLoopIndicator"/>
			<sideUtility />
		</div>

		<footer class="w-[90%] h-[5%] mx-4 mt-4 p-2 flex items-center justify-between absolute bottom-0">
			<div class="">
				<ButtonItem v-for="item in buttonList" :key="item.icon" :iconClass="item.icon" :emitEvent="item.event" />
			</div>
			<ButtonItem iconClass="i-ph-option" emitEvent="option" />
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

	const buttonList = [
		{
			icon: 'i-ph-rewind',
			event: 'reset'
		},
		{
			icon: 'i-ph-skip-back',
			event: 'skip-back'
		},
		{
			icon: 'i-ph-arrow-left',
			event: 'left'
		},
		{
			icon: 'i-ph-arrow-right',
			event: 'right'
		},
		{
			icon: 'i-ph-skip-forward',
			event: 'skip-forward'
		},
	]

</script>

<style scoped>

</style>