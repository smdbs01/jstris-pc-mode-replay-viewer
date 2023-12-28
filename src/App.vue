<template>
  <main class="w-full h-screen flex flex-col items-center bg-gray-200 relative">
    <h1 class="mt-4 text-2xl font-bold text-gray-800 tracking-tight">
      Jstris PC Mode Replay Viewer
    </h1>

    <ViewerItem class="w-60 sm:w-135 lg:w-220 h-[80%] rounded-xl shadow-md" v-if="replayObj.length" :data="replayObj"/>
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

<style>
  * {
    font-family: Helvetica, sans-serif, Arial;
    /* debug */
    /* border: red 1px solid; */
  }
</style>
