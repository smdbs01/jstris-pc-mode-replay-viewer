<template>
  <div class="w-[25%] h-[95%] flex-col items-center overflow-y-scroll scroll-auto b-l-dashed b-l-gray-700">
    <PageButton v-for="page, index in pages" :key="index" :loop="page.loop" :index="index" :isActive="currentPage === index" 
    class="mt-1"/>
    
  </div>
</template>

<script setup>
  import PageButton from './PageButton.vue';

  defineProps({
    pages: Array,
    currentPage: Number
  })

</script>

<style scoped></style>