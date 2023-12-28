<template>
  <button :class="iconClass" class="w-6 h-6 m-2 relative bg-teal-600 hover:bg-teal-800 rounded-md hover:cursor-pointer focus:outline-none focus:bg-teal-800" @click="$emit(emitEvent)">
  </button>
</template>

<script setup>
  defineProps({
    iconClass: String,
    emitEvent: String
  })
</script>

<style>

</style>