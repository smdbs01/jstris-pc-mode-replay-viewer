<template>
  <div class="w-20 h-10 flex flex-col">
    <div v-for="row, index in minos" :key="index" class="w-20 h-5 flex">
      <div v-for="mino, index in row" :key="index" class="w-5 h-5">
        <div v-if="mino" class="w-5 h-5 shadow" :style="{ backgroundImage: 'url(src/assets/imgs/skins/' + skin + '/' + type + '.png)'}"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

  const props = defineProps({
    skin: String,
    type: String
  })

  const minos = computed(() => {
    switch (props.type) {
      case "T":
        return [[0, 1, 0, 0], [1, 1, 1, 0] ]
      case "O":
        return [[0, 1, 1, 0], [0, 1, 1, 0] ]
      case "I":
        return [[0, 0, 0, 0], [1, 1, 1, 1] ]
      case "L":
        return [[0, 0, 1, 0], [1, 1, 1, 0] ]
      case "J":
        return [[1, 0, 0, 0], [1, 1, 1, 0] ]
      case "S":
        return [[0, 1, 1, 0], [1, 1, 0, 0] ]
      case "Z":
        return [[1, 1, 0, 0], [0, 1, 1, 0] ]
      
    }
    return []
  })

</script>

<style scoped>
</style>