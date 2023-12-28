<template>
  <main class="w-full h-screen flex flex-col items-center bg-gray-200">
    <h1 class="mt-4 text-3xl font-bold text-gray-800">
      Jstris PC Mode Replay Viewer
    </h1>

    <ViewerItem v-if="replayObj.length" :data="replayObj"/>
    <FileUploader @replay-uploaded="loadReplay"/>

  </main>
</template>

<script setup>
  import { ref } from 'vue'
  import ViewerItem from './components/ViewerItem.vue'
  import FileUploader from './components/FileUploader.vue'

  const replayObj = ref([])

  function loadReplay (obj) {
    replayObj.value = obj
  }

</script>

<style scoped>

</style>
