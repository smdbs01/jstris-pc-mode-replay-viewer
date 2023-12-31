<template>
  <div>
    <div class="flex flex-col items-center mt-4">
      <label tabindex="0" class="p-2 focus:outline-none focus:bg-teal-600 hover:bg-teal-600 border-solid border-2 border-teal-600 rounded-xl focus:text-gray-200 hover:text-gray-200
     text-teal-600 hover:cursor-pointer transition-all duration-100" @click="isInputWindowOpened = true">
        {{ label }}
      </label>
      <!-- Shader -->
      <div v-if="isInputWindowOpened" class="w-full h-full flex flex-col items-center fixed z-50 top-0 left-0">
        <div class="w-[100vw] h-[100vh] absolute z-50 top-0 left-0 bg-gray-800 bg-opacity-80" @click="closePopup()">
        </div>
        <div
          class="w-[80vw] max-w-xl h-[40vh] p-4 z-50 border-2 border-solid border-gray-700 bg-gray-800 rounded-xl flex flex-col shadow-sm items-center justify-start relative top-1/4">
          <textarea
            class="w-[95%] h-[80%] bg-gray-700 text-gray-300 rounded-xl mx-2 p-2 resize-none focus:outline-none focus:text-gray-200"
            placeholder="Paste your replay link or replay code, examples: &#10;&#10;https://jstris.jezevec10.com/replay/48791348&#10;or&#10;N4IgxiBcoG5QzAOngGhAZwPYDMAuARAJ0wAcBJAEygCY0BzAQwFsBTAZVwcNygEYA2ACyD4ADgAMAVkm9Jg2iEasAog......"
            @keydown.enter="addFile()" v-model="file"></textarea>
          <div class="w-[95%] mt-4 flex justify-around">
            <button
              class="w-[7.5rem] bg-gray-700 text-gray-300 border-gray-800 border-2 border-solid rounded-xl mx-2 p-2 appearance-none focus:outline-none hover:bg-gray-600 focus:bg-gray-600 transition-all duration-100"
              @click="closePopup()">Close</button>
            <button
              class="w-[7.5rem] bg-gray-700 text-gray-300 border-gray-800 border-2 border-solid rounded-xl mx-2 p-2 appearance-none focus:outline-none hover:bg-gray-600 focus:bg-gray-600 transition-all duration-100"
              @click="addFile()">Upload</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { decoder } from 'tetris-fumen'
import { compressToEncodedURIComponent } from 'lz-string'

const emit = defineEmits(['replay-uploaded'])

const getDefaultLabel = function (){
  return window.innerWidth < 640 ? "Link/Code Upload" : "Upload a Replay Code/Link"
}
const label = ref(getDefaultLabel())

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

function invalid() {
  label.value = "Invalid Input"
  setTimeout(() => {
    label.value = "upload a replay code"
  }, 2000)
}

function parseFile(txt) {
  // Check if it is a url
  // Credits: https://github.com/cringemoment/
  const target = "jstris.jezevec10.com"
  if (txt.indexOf(target) >= 0) {
    const parts = txt.split("/")
    if (parts.length < 5) {
      invalid()
      return
    }

    if (parts[3] != "replay" || !parts[2].endsWith(target)) {
      invalid()
      return
    }

    let id = parts[4]
    if (parts.length > 5) {
      id = parts[5]
    }

    const url = 'https://corsproxy.io/?' + encodeURIComponent("https://" + parts[2] + "/replay/data?id=" + id + "&type=0");
    fetch(url).then((response) => {
      if (!response.ok) {
        invalid()
      }
      response.text().then((text) => {
        const comp = compressToEncodedURIComponent(text)
        codeToFumen(comp)
      })
    })
  } else {
    codeToFumen(txt)
  }
}

function codeToFumen(replayCode) {
  fetch(`https://fumen.tstman.net/jstris`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: `replay=${replayCode}`
  }).then((response) => {
    if (!response.ok) {
      invalid()
    } else {
      response.json().then((data) => {
        parseFumen(data.fumen)
      })
    }
  })
}

function parseFumen(fumenUrl) {
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
    } else if (idx < pages.length - 1) {
      label.value = "Replay too long!"
      setTimeout(() => {
        label.value = "upload a replay code"
      }, 5000);

      console.log("Didn't parse all pages, replay too long? Use the Json method.")
      break

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