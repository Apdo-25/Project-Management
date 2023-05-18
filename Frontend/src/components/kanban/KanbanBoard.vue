<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import draggable from 'vuedraggable'
import Task from './Task.vue'
import CardBox from '../CardBox.vue'
import SectionMain from '../SectionMain.vue'
import SectionTitleLineWithButton from '../SectionTitleLineWithButton.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import { useBoardStore } from '@/stores/board' // import the board store

const boardStore = useBoardStore() // initialize the board store

let lanes = reactive([]) // initial value of lanes

// fetch board on component mounted
onMounted(async () => {
  await boardStore.fetchBoards()
  if (boardStore.getBoards[0]) {
    lanes.value = boardStore.getBoards[0].lanes // replace with the fetched board's lanes
  }
})
const lanesLength = computed(() => (lanes.value ? lanes.value.length : 0))

const dragOptions = computed(() => {
  return {
    animation: 200,
    disabled: false,
    ghostClass: 'ghost'
  }
})
</script>

<template>
  <div class="grid grid-cols-3 gap-6" v-if="lanesLength > 0">
    <CardBox
      v-for="lane in lanes.value"
      :key="lane.name"
      class="border border-gray-300 rounded-md bg-gray-50"
    >
      <!-- CardBoxComponentTitle and other content here... -->

      <div class="p-4 h-full">
        <draggable
          class="min-h-full"
          :list="lane.tasks"
          group="tickets"
          itemKey="name"
          v-bind="dragOptions"
        >
          <template #item="{ element }">
            <Task :task="element" />
            <!-- updated Task component usage -->
          </template>
        </draggable>
      </div>
    </CardBox>
  </div>
</template>
