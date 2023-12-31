<template>
  <div class="w-[25%] h-[95%] hidden sm:block overflow-y-scroll">
    <div class="w-[90%] h-[100%] mr-[-1rem] hidden sm:flex flex-col items-end">
      <div v-for="loop in Object.keys(loopArrays)" :key="loop" class="w-[80%] max-w-[12rem] mt-3 flex flex-col items-end">
        <PageButton :loop="loop" :isActive="loop == activeLoop" @loopClicked="loopClicked" class="top-0" :class="{ 'sticky': expandedLoops[loop] }"/>
        <PageList v-if="expandedLoops[loop]" :loop="loop" :isActive="loop == activeLoop" :PCArrays="loopArrays[loop]"
          :activePage="activePage" @pageClicked="$emit('changePage', $event)" />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch, onMounted} from 'vue';
import PageButton from './PageButton.vue';
import PageList from './PageList.vue';

const props = defineProps({
  loopArrays: Object,
  activeLoop: Number,
  activePage: Number
})

const defaultExpanded = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
}

onMounted(() => {
  expandedLoops.value[1] = true
})

const expandedLoops = ref({
  ...defaultExpanded
})

defineEmits(['changePage'])

watch(() => props.activePage, () => {
  expandedLoops.value = {
    ...defaultExpanded
  }
  expandedLoops.value[props.activeLoop] = true
  const activePage = document.getElementById('P' + props.activePage)
  if (activePage) {
    activePage.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
})

function loopClicked(loop) {
  expandedLoops.value[loop] = !expandedLoops.value[loop]
}
</script>

<style scoped>
/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: none;
  scrollbar-color: rgb(45, 212, 191) rgb(31, 41, 55);
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  display: none;
  width: 10px;
}

*::-webkit-scrollbar-track {
  background: rgb(31, 41, 55);
}

*::-webkit-scrollbar-thumb {
  background-color: rgb(45, 212, 191);
  border-radius: 10px;
  border: 3px none #ffffff;
}
</style>