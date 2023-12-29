<template>
  <div class="w-28 h-14 flex flex-col">
    <div v-for="row, index in minos" :key="index" class="w-28 h-7 flex">
      <div v-for="mino, index in row" :key="index" class="w-7 h-7">
        <MinoItem v-if="mino" :skin="skin" :type="type" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import MinoItem from './MinoItem.vue';

const props = defineProps({
  skin: String,
  type: String
})

const minos = computed(() => {
  switch (props.type) {
    case "T":
      return [[0, 1, 0, 0], [1, 1, 1, 0]]
    case "O":
      return [[0, 1, 1, 0], [0, 1, 1, 0]]
    case "I":
      return [[0, 0, 0, 0], [1, 1, 1, 1]]
    case "L":
      return [[0, 0, 1, 0], [1, 1, 1, 0]]
    case "J":
      return [[1, 0, 0, 0], [1, 1, 1, 0]]
    case "S":
      return [[0, 1, 1, 0], [1, 1, 0, 0]]
    case "Z":
      return [[1, 1, 0, 0], [0, 1, 1, 0]]

  }
  return []
})

</script>

<style scoped></style>