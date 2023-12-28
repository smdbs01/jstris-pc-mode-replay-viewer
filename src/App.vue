<template>
  <main class="w-full h-screen flex flex-col items-center bg-gray-200">
    <h1 class="mt-4 text-3xl font-bold text-gray-800">
      Jstris PC Mode Replay Viewer
    </h1>

    <ViewerItem />
    <FileUploader />

    

  </main>
</template>

<script setup>
  import { ref } from 'vue'
  import ViewerItem from './components/ViewerItem.vue'
  import FileUploader from './components/FileUploader.vue'

  const pieceTable = {
    'I': 2,
    'O': 3,
    'T': 5,
    'L': 7,
    'J': 11,
    'S': 13,
    'Z': 17,
    'N': 19
  }


</script>

<style scoped>

</style>
