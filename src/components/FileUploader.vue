<template>
  <div class="flex flex-col items-center mt-4">
    <label tabindex="0" class="p-2 focus:outline-none focus:bg-teal-600 hover:bg-teal-600 b-solid b-teal-600 rounded-xl focus:text-gray-200 hover:text-gray-200
     text-teal-600 hover:cursor-pointer transition-all duration-100">
      {{ label }}
      <input class="hidden " type="file" accept="application/json" @change="addFile" />
    </label>

    <div v-if="file" class="mt-2 text-xs font-500">{{ file }}</div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const file = ref("")
  const emit = defineEmits(['replay-uploaded'])
  const label = ref("Upload a Replay Json")

  const pieceTable = {
    'I': 2,
    'O': 3,
    'T': 5,
    'L': 7,
    'J': 11,
    'S': 13,
    'Z': 17,
    'N': 19
  }

  function addFile(e) {
    if (!e.target.files.length) {
      return
    }
    parseFile(e.target.files[0])
  }

  function parseFile(f) {
    const reader = new FileReader()
    reader.readAsText(f)
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result)
      if (validateObj(data)) {
        file.value = f.name
        emit('replay-uploaded', data)
      } else {
        console.log("invalid json")
        label.value = "Invalid Json"
        setTimeout(() => {
          label.value = "Upload a Replay Json"
        }, 2000);
      }

    }
  }

  function validateObj (obj) {
    if (!obj || !obj.length) return false
    for (let i = 0; i < obj.length; i++) {
      if (!('PCNumber' in obj[i]) 
        || !('PCLoopIndicator' in obj[i]) 
        || !('stateArray' in obj[i]) 
        || !(obj[i].stateArray.length)) return false
      for (let j = 0; j < obj[i].stateArray.length; j++) {
        const cur = obj[i].stateArray[j]
        if (!('board' in cur) 
          || !('queue' in cur) 
          || !('placedBlocks' in cur)) return false

        if ((cur.board.length !== 40) 
          || (cur.queue.length < 6 
          || cur.queue.length > 7)) return false

        for (let k = 0; k < cur.board.length; k++) {
          if (pieceTable[cur.board[k]] === undefined) return false
        }
        
        for (let k = 0; k < cur.queue.length; k++) {
          if (pieceTable[cur.queue[k]] === undefined) return false
        }
      }
    }
    return true
  }
</script>

<style scoped>

</style>