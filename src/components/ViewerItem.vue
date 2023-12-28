<template>
  <div class="w-[80%] h-[70%] border-solid border-red">
		<span>{{ data.length }}</span>
  </div>
</template>

<script setup>
	defineProps({
		data: Object
	})

</script>

<style scoped>

</style>