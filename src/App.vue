<template>
  <main class="w-full h-screen flex flex-col items-center bg-gray-200 relative">
    <h1 class="mt-4 text-2xl font-bold text-gray-800 tracking-tight">
      Jstris PC Mode Replay Viewer
    </h1>

    <ViewerItem class="min-w-80 sm:w-135 lg:w-220 min-h-[700px] h-[80%] rounded-xl shadow-md" v-if="replayObj.length"
      :data="replayObj" />
    <div class="w-sm mt-4 flex justify-between">
      <FileUploader @replay-uploaded="loadReplay" />
      <ReplayCodeUploader @replay-uploaded="loadReplay" />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import ViewerItem from './components/ViewerItem.vue'
import FileUploader from './components/FileUploader.vue'
import ReplayCodeUploader from './components/ReplayCodeUploader.vue'

const replayObj = ref([])

function loadReplay(obj) {
  replayObj.value = obj
}

</script>

<style>
* {
  font-family: Helvetica, sans-serif, Arial;
  /* debug */
  /*
    outline: red 1px solid;
    */
}
</style>
