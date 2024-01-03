<template>
  <div class="w-full h-full flex flex-col items-center justify-center fixed top-0 left-0 ">
    <!-- Shader -->
    <div class="w-[100vw] h-[100vh] absolute z-1 top-0 left-0 bg-gray-800 bg-opacity-80" @click="$emit('close-popup')">
    </div>

    <!-- Option Window -->
    <div
      class="w-1/2 min-w-[350px] max-w-[550px] h-1/2 p-4 flex flex-col items-center justify-start text-gray-300 border-2 border-gray-700 bg-gray-800 rounded-md z-10">
      <h1 class="text-2xl font-bold">OPTIONS</h1>
      <h1 class="text-lg font-semibold mt-2">Key Bindings</h1>
      <!-- Key bindings -->
      <div class="flex flex-col items-start gap-2">
        <div v-for="(key, funcName) in options" :key="funcName" class="grid grid-cols-2 items-center justify-center">
          <div class="text-center">{{ funcNameTable[funcName] }}</div>
          <!-- A key binding-->
          <input class="text-center bg-gray-600 text-teal-300 focus:text-gray-300" spellcheck="false" type="text" tabindex="-1"
            @focusin="currentActiveOption = funcName" @focusout="currentActiveOption = ''" @keyup.prevent="setKey"
            :value="funcName == currentActiveOption ? 'Press a key' : key" />
        </div>
      </div>
      <!-- Toggle feature -->

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(['close-popup', 'update-option'])

defineProps({
  options: Object // { [key: string]: () => void }
})

const funcNameTable = {
  'reset': 'Reset',
  'openOptions': 'Open Option',
  'backPiece': 'Back Piece',
  'forwardPiece': 'Forward Piece',
  'backPC': 'Back PC',
  'forwardPC': 'Forward PC',
  'changePage': 'Change Page',
}

const currentActiveOption = ref('')

function setKey(e) {
  if (!currentActiveOption.value) {
    return
  }
  if (e.key === 'Escape' || e.key === 'Tab') {
    e.target.blur()
    return
  }

  emit('update-option', currentActiveOption.value, e.key)
  currentActiveOption.value = ''
  e.target.blur()
}

</script>

<style scoped></style>