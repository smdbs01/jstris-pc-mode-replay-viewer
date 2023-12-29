<template>
  <div>
    <div class="flex flex-col items-center mt-4">
      <label tabindex="0" class="p-2 focus:outline-none focus:bg-teal-600 hover:bg-teal-600 b-solid b-teal-600 rounded-xl focus:text-gray-200 hover:text-gray-200
     text-teal-600 hover:cursor-pointer transition-all duration-100" @click="isInputWindowOpened = true">
        {{ label }}
      </label>
      <!-- Shader -->
      <div v-if="isInputWindowOpened"
        class="w-[100vw] h-[100vh] fixed z-50 pos-top-0 pos-left-0 bg-gray-800 bg-opacity-50" @click="closePopup()"></div>
      <div v-if="isInputWindowOpened"
        class="w-[80vw] h-[40vh] p-4 b-teal-500 b-solid bg-gray-800 rounded-xl flex flex-col items-center justify-start fixed z-50 pos-top-1/4 pos-left-[6vw]">
        <textarea
          class="w-[95%] h-[80%] bg-gray-800 text-gray-300 rounded-xl mx-2 p-2 focus:outline-none focus:bg-gray-700 focus:text-gray-200"
          placeholder="Paste your replay link or replay code, examples: &#10;&#10;https://jstris.jezevec10.com/replay/48791348&#10;or&#10;N4IgxiBcoG5QzAOngGhAZwPYDMAuARAJ0wAcBJAEygCY0BzAQwFsBTAZVwcNygEYA2ACyD4ADgAMAVkm9Jg2iEasAog......"
          @keydown.enter="addFile()" v-model="file"></textarea>
        <div class="w-[95%] mt-4 flex justify-around">
          <button
            class="w-30 bg-gray-700 text-gray-300 b-gray-800 b-1 rounded-xl mx-2 p-2 appearance-none focus:outline-none focus:bg-gray-700 focus:text-gray-200"
            @click="closePopup()">Close</button>
          <button
            class="w-30 bg-gray-700 text-gray-300 b-gray-800 b-1 rounded-xl mx-2 p-2 appearance-none focus:outline-none focus:bg-gray-700 focus:text-gray-200"
            @click="addFile()">Upload</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import axios from 'axios'
import { ref } from 'vue'
import { decoder } from 'tetris-fumen'
import { compressToEncodedURIComponent } from 'lz-string'

const emit = defineEmits(['replay-uploaded'])
const label = ref("upload a replay code")
const file = ref("")
const isInputWindowOpened = ref(false)

function closePopup() {
  isInputWindowOpened.value = false
  file.value = ""
}
function addFile() {
  parseFile(file.value)
  file.value = ""
  closePopup()
}

function parseFile(txt) {
  // Check if it is a url
  // Credits: https://github.com/cringemoment/
  const target = "jstris.jezevec10.com"
  if (txt.indexOf(target) >= 0) {
    const parts = txt.split("/")
    if (parts.length < 5) {
      label.value = "Invalid Url"
      setTimeout(() => {
        label.value = "Upload a Replay Code"
      }, 2000);
      return
    }

    if (parts[3] != "replay" || !parts[2].endsWith(target)) {
      label.value = "Invalid Url"
      setTimeout(() => {
        label.value = "Upload a Replay Code"
      }, 2000);
      return
    }

    let id = parts[4]
    if (parts.length > 5) {
      id = parts[5]
    }

    const url = "https://" + parts[2] + "/replay/data?id=" + id + "&type=0"
    axios.get(url).then((response) => {
      const comp = compressToEncodedURIComponent(JSON.stringify(response.data))

      fetch(`https://fumen.tstman.net/jstris`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: `replay=${comp}`
      })
        .then((response) => response.json())
        .then((data) => {
          parseFumen(data.fumen)
        })
    })
  }
}

function parseFumen(fumenUrl) {
  console.log(fumenUrl)
  const pages = decoder.decode(fumenUrl)

  const ret = []
  let curStateArrays = []
  let curPCNumber = 0
  let curPCLoopIndicator = 1
  for (let idx = 0; idx < pages.length; idx++) {
    const page = pages[idx]

    let board = ""
    let hasMino = false
    for (let y = 3; y >= 0; y--) {
      for (let x = 0; x < 10; x++) {
        const mino = page.field.at(x, y)
        if (mino !== "_") {
          board += mino
          hasMino = true
        } else {
          board += "N"
        }
      }
    }

    let queue = ""
    const comment = page.comment
    let i;
    if (comment[4] !== ']') {
      queue = comment[4] + comment[7]
      i = 9
    } else {
      queue = comment[6]
      i = 8
    }

    while (queue.length < 7 && i < comment.length) {
      queue += comment[i]
      i += 1
    }

    if (!hasMino && curStateArrays.length > 0) {
      ret.push({
        PCNumber: curPCNumber,
        PCLoopIndicator: curPCLoopIndicator,
        stateArray: curStateArrays
      })
      curStateArrays = []
      curPCNumber += 1
      curPCLoopIndicator = ((idx * 5) % 7) + 1;
    }
    // Probably end of the replay
    if (queue.length === 7) {
      curStateArrays.push({
        board: board,
        queue: queue,
        placedBlocks: idx
      })
    }
  }
  if (curStateArrays.length > 0) {
    ret.push({
      PCNumber: curPCNumber,
      PCLoopIndicator: curPCLoopIndicator,
      stateArray: curStateArrays
    })
  }
  emit('replay-uploaded', ret)
}
</script>

<style></style>