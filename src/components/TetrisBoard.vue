<template>
  <div class="w-[65%] h-[95%]">
    <!-- Hold and Queue, + current falling piece if screen width too small -->
    <div class="flex justify-between">
      <!-- Hold -->
      <TetriminoItem class="w-20 h-20" skin="purecolor" type="I" />
      
      <!-- Queue -->
      <div class="w-20 c-[90%] flex flex-col">
        <TetriminoItem v-for="t, index in q" class="mt-5" :key="index" :skin="t.skin" :type="t.type" />
      </div>
    </div>
    
  </div>
</template>

<script setup>
  import { computed } from 'vue';
import TetriminoItem from './TetriminoItem.vue';

  defineProps({
		board: String,
    queue: String,
    PCLoopIndicator: Number
	})

  const q = computed(() => {
    return [{
      type: "J",
      skin: "purecolor"
    },
    {
      type: "O",
      skin: "purecolor"
    },
    {
      type: "T",
      skin: "purecolor"
    },
    {
      type: "S",
      skin: "purecolor"
    },
    {
      type: "Z",
      skin: "purecolor"
    }]
  })
</script>

<style scoped>

</style>