<template>
  <div tabindex="0"
    class="group relative text-teal-600 hover:text-teal-700 rounded-md hover:cursor-pointer outline-none focus:text-teal-300 active:text-teal-400 active:border-0 transition-all duration-100">
    <slot>
      <!-- A svg here -->
    </slot>
    <div
      class="w-[400%] absolute bottom-[110%] -left-[150%] flex items-center justify-center
      invisible group-hover:visible">
      <span class="px-2 outline-1 text-teal-300 outline-white bg-gray-600 rounded text-sm md:text-base font-mono tracking-tighter select-none
      opacity-0 group-hover:opacity-100 transition-all">
        {{ title }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>

<style></style>