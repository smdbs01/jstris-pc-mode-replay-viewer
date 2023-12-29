<template>
  <button :class="iconClass" class="w-6 h-6 relative bg-teal-600 hover:bg-teal-800 rounded-md hover:cursor-pointer focus:outline-none focus:bg-teal-300 transition-all duration-100">
  </button>
</template>

<script setup>
  defineProps({
    iconClass: String,
  })
</script>

<style>

</style>