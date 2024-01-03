<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center z-50 fixed top-0 left-0 ">
    <!-- Shader -->
    <div class="w-[100vw] h-[100vh] absolute z-1 top-0 left-0 bg-gray-800 bg-opacity-80" @click="$emit('close-popup')">
    </div>

    <!-- Option Window -->
    <div
      class="w-1/2 min-w-[350px] max-w-[550px] h-1/2 p-4 flex flex-col items-center justify-start text-gray-300 border-2 border-gray-700 bg-gray-800 rounded-md z-10">
      <h1 class="text-2xl font-bold">NOT IMPLEMENTED</h1>
      <!-- Key bindings -->
      <div class="flex flex-col items-start gap-2">
        <div v-for="(key, funcName) in newOption" :key="funcName" class="grid grid-cols-8 items-center justify-center">
          <div class="text-center col-span-4">{{ funcNameTable[funcName] }}</div>
          <!-- A key binding-->
          <input class="col-start-5 col-span-4 text-center bg-gray-600 text-teal-300" spellcheck="false" type="text"
            v-model="newOption[funcName]" />

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

defineEmits(['close-popup'])

const props = defineProps({
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

const newOption = ref({})
onMounted(() => {
  console.log(props.options)
  for (const [key, value] of Object.entries(props.options)) {
    newOption.value[key] = value
  }
})

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