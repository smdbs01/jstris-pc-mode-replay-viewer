<template>
  <div tab-index="0"
    class="w-16 p-3 pr-1 bg-gray-300 shadow-sm border-[1px] border-gray-800 rounded-md text-gray-800 text-xl font-sans font-semibold tracking-[-0.1em] select-none 
    hover:cursor-pointer hover:bg-gray-400 hover:text-gray-900 transition-all duration-150"
    style="writing-mode: vertical-rl; text-orientation: upright;">
    {{ label }}
  </div>
</template>

<script setup>
defineProps({
  label: String,
  enabled: Boolean
})
</script>

<style scoped></style>