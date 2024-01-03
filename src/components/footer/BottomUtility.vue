<template>
  <footer class="w-[90%] h-[5%] mx-4 my-4 p-2 flex items-center justify-between absolute bottom-0">
    <div class="flex">
      <!-- Reset -->
      <ButtonIcon class="mr-2 w-8 h-8" @click="emit('reset')" :title="'Reset'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path fill="currentColor"
            d="M224 128a96 96 0 0 1-94.71 96H128a95.38 95.38 0 0 1-65.9-26.2a8 8 0 0 1 11-11.63a80 80 0 1 0-1.67-114.78a3.07 3.07 0 0 1-.26.25l-10.54 9.65l17 17A8 8 0 0 1 72 112H24a8 8 0 0 1-8-8V56a8 8 0 0 1 13.66-5.7L49.31 70l10.94-10A96 96 0 0 1 224 128" />
        </svg>
      </ButtonIcon>
      <!-- BackPC -->
      <ButtonIcon class="mr-2 w-8 h-8" @click="emit('backPC')" :title="'Last PC'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path fill="currentColor"
            d="M199.81 34a16 16 0 0 0-16.24.43L64 109.23V40a8 8 0 0 0-16 0v176a8 8 0 0 0 16 0v-69.23l119.57 74.78A15.95 15.95 0 0 0 208 208.12V47.88A15.86 15.86 0 0 0 199.81 34M192 208L64.16 128L192 48.07Z" />
        </svg>
      </ButtonIcon>
      <!-- BackPiece -->
      <ButtonIcon class="mr-2 w-8 h-8" @click="emit('backPiece')" :title="'Last Piece'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path fill="currentColor"
            d="M224 128a8 8 0 0 1-8 8H59.31l58.35 58.34a8 8 0 0 1-11.32 11.32l-72-72a8 8 0 0 1 0-11.32l72-72a8 8 0 0 1 11.32 11.32L59.31 120H216a8 8 0 0 1 8 8" />
        </svg>
      </ButtonIcon>
      <!-- ForwardPiece -->
      <ButtonIcon class="mr-2 w-8 h-8" @click="emit('forwardPiece')" :title="'Next Piece'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="inline-block">
          <path fill="currentColor"
            d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32" />
        </svg>
      </ButtonIcon>
      <!-- ForwardPC -->
      <ButtonIcon class="mr-2 w-8 h-8" @click="emit('forwardPC')" :title="'Next PC'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="inline-block">
          <path fill="currentColor"
            d="M200 32a8 8 0 0 0-8 8v69.23L72.43 34.45A15.95 15.95 0 0 0 48 47.88v160.24a16 16 0 0 0 24.43 13.43L192 146.77V216a8 8 0 0 0 16 0V40a8 8 0 0 0-8-8M64 207.93V48.05l127.84 80Z" />
        </svg>
      </ButtonIcon>
    </div>

    <!-- Piece & PC number-->
    <div class="flex items-center text-teal-600 text-sm sm:text-base">
      <span class="font-semibold mr-2 select-none hidden sm:inline">{{ currentPage[1] }}p <span
          class="font-normal">@</span></span>
      <input type="number"
        class="w-8 inline-block text-center rounded border-1 shadow-teal-600 bg-gray-600 text-teal-200 focus:outline-none hover:bg-gray-500 focus:bg-gray-300 focus:text-gray-700 hover:shadow-gray-300 focus:shadow-gray-300 transition-color"
        :value="currentPage[0] + 1" @input="emit('changePage', $event.target.value)" />
      <span class="ml-2 hidden sm:inline select-none">
        / {{ mxPC }} PC
      </span>
    </div>

    <!-- Option -->
    <div>
      <ButtonIcon class="w-8 h-8" @click="openPopup" :title="'Options'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="inline-block">
          <path fill="currentColor"
            d="M232 184a8 8 0 0 1-8 8h-63.06a15.92 15.92 0 0 1-14.31-8.84L95.06 80H32a8 8 0 0 1 0-16h63.06a15.92 15.92 0 0 1 14.31 8.84L160.94 176H224a8 8 0 0 1 8 8M152 80h72a8 8 0 0 0 0-16h-72a8 8 0 0 0 0 16" />
        </svg>
      </ButtonIcon>

      <OptionPopup v-if="isOptionPopupOpened" :options="optionsMap" class="z-50" @close-popup="closePopup"
        @update-option="updateOption" />
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import ButtonIcon from './icons/ButtonIcon.vue';
import OptionPopup from './OptionPopup.vue';

defineProps({
  mxPC: Number,
  currentPage: Array
})

const emit = defineEmits(['reset', 'openOptions', 'backPiece', 'forwardPiece', 'backPC', 'forwardPC', 'changePage'])

// Key binding
const optionsMap = ref({
  "reset": "r",
  "backPiece": "ArrowLeft",
  "forwardPiece": "ArrowRight",
  "backPC": "ArrowUp",
  "forwardPC": "ArrowDown",
})
const keysMap = ref({
  "r": "reset",
  "ArrowLeft": "backPiece",
  "ArrowRight": "forwardPiece",
  "ArrowUp": "backPC",
  "ArrowDown": "forwardPC",
})

function updateOption(funcName, keyName) {
  if (keysMap.value[keyName]) {
    // key is mapped
    let oldKeyName = optionsMap.value[funcName]
    let newFuncName = keysMap.value[keyName]
    optionsMap.value[newFuncName] = oldKeyName
    keysMap.value[oldKeyName] = newFuncName

    optionsMap.value[funcName] = keyName
    keysMap.value[keyName] = funcName
  } else {
    delete keysMap.value[optionsMap.value[funcName]]

    optionsMap.value[funcName] = keyName
    keysMap.value[keyName] = funcName
  }
}

const keysListener = (event) => {
  if (keysMap.value[event.key]) {
    emit(keysMap.value[event.key])
  }
}

function addKeysListener() {
  document.addEventListener('keydown', keysListener)
}
function removeKeysListener() {
  document.removeEventListener('keydown', keysListener)
}

onMounted(() => {
  addKeysListener()
})

// Option popup
const isOptionPopupOpened = ref(false)
function openPopup () {
  // temporarily disable key bindings
  removeKeysListener()
  isOptionPopupOpened.value = true
}
function closePopup() {
  isOptionPopupOpened.value = false
  // adding them back
  addKeysListener()
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>