<template>
  <div class="w-10 h-full absolute left-full top-0 flex flex-col justify-center items-end overflow-hidden">
    <PCUtilButton v-for="button in buttonList" :key="button.label" :label="button.label" @click="$emit(button.onClick)"
      class="mt-20">
    </PCUtilButton>
  </div>
</template>

<script setup>
import PCUtilButton from './PCUtilButton.vue';

defineProps({
  buttonList: Array
})


</script>

<style scoped></style>