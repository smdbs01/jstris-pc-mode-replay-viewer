<template>
  <div class="mx-4 flex flex-col items-center bg-gray-800 relative">
		<div class="w-[90%] h-[90%] mx-4 mt-4 p-2 flex">

		</div>

		<footer class="w-[90%] h-[5%] mx-4 mt-4 p-2 flex items-center justify-between absolute bottom-0">
			<div>
				<ButtonItem v-for="item in buttonList" :key="item.icon" :iconClass="item.icon" :emitEvent="item.event" />
			</div>
			<ButtonItem iconClass="i-ph-option" emitEvent="option" />
		</footer>
  </div>
</template>

<script setup>
	import ButtonItem from './ButtonItem.vue';

	defineProps({
		data: Object
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