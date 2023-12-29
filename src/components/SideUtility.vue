<template>
  <div class="w-[25%] h-[95%] b-l-1 b-l-dashed b-l-gray-600 hidden sm:flex flex-col items-end">
    <div v-for="loop in Object.keys(loopArrays)" :key="loop" class="w-[80%] max-w-[12rem] h-8 mt-3">
      <PageButton :loop="loop" :activeLoop="activeLoop" :isActive="loop == activeLoop" />
      <PageList />
    </div>
  </div>

</template>

<script setup>
import { onMounted } from 'vue';
import PageButton from './PageButton.vue';
import PageList from './PageList.vue';

const props = defineProps({
  loopArrays: Object,
  activeLoop: Number,
  activePage: Number
})

onMounted(() => {
  console.log(props.loopArrays)
  console.log(props.activeLoop)
})
</script>

<style scoped></style>