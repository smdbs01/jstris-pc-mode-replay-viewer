<template>
  <div class="w-10 h-full absolute left-full top-0 flex flex-col justify-center items-end overflow-hidden">
    <div v-for="button in buttonList" :key="button.label">
      <PCUtilButton v-if="button.enabled" :label="button.label" :enabled="button.enabled" @click="button.enabled ? $emit(button.onClick) : () => {}"
        class="mt-20">
      </PCUtilButton>
    </div>
  </div>
</template>

<script setup>
import PCUtilButton from './PCUtilButton.vue';

defineProps({
  buttonList: Array
})


</script>

<style scoped></style>