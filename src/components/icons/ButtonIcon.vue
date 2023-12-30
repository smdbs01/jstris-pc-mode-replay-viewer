<template>
  <div tabindex="0" :title="title"
    class="relative text-teal-600 hover:text-teal-700 rounded-md hover:cursor-pointer outline-none focus:text-teal-300 active:text-teal-400 active:border-0 transition-all duration-100">
    <slot>
      <!-- A svg here -->
    </slot>
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>

<style></style>