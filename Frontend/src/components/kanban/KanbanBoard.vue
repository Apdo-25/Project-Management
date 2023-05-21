<template>
  <div class="grid grid-cols-3 gap-6" v-if="lanesLength > 0">
    <CardBox
      v-for="lane in lanes"
      :key="lane._id"
      class="border border-gray-300 rounded-md bg-gray-50"
    >
      <CardBoxComponentHeader>
        <CardBoxComponentTitle :title="lane.name" />
        <div class="flex items-center space-x-2">
          <button @click="editLane(lane._id)" class="text-blue-500">Edit Lane</button>
          <button @click="deleteLane(lane._id)" class="text-red-500">Delete Lane</button>
        </div>
      </CardBoxComponentHeader>
      <CardBoxComponentBody class="p-4 h-full">
        <draggable
          class="min-h-full"
          :list="lane.tasks"
          group="tasks"
          item-key="id"
          v-bind="dragOptions"
          @change="handleTaskDrag"
        >
          <template #item="{ element }">
            <Task :task="element" />
          </template>
        </draggable>
      </CardBoxComponentBody>
    </CardBox>
    <button @click="addLane">Add Lane</button>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps } from 'vue'
import draggable from 'vuedraggable'
import Task from './Task.vue'
import CardBox from '../CardBox.vue'
import CardBoxComponentTitle from '@/components/CardBoxComponentTitle.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import CardBoxComponentBody from '@/components/CardBoxComponentBody.vue'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()

const props = defineProps({
  projectId: {
    type: String,
    required: true
  }
})

const lanes = ref([])
const lanesLength = computed(() => lanes.value.length)
const dragOptions = computed(() => ({
  animation: 200,
  disabled: false,
  ghostClass: 'ghost'
}))

const project = ref(null)

watch(
  () => project.value,
  (newProject) => {
    if (newProject && newProject.board) {
      lanes.value = newProject.board.lanes
    }
  }
)

const deleteLane = async (laneId) => {
  await projectStore.deleteLane(props.projectId, laneId)
}

const editLane = async (laneId) => {
  const laneData = {
    name: lanes.value.find((l) => l._id === laneId).name
  }
  await projectStore.updateLane(props.projectId, laneId, laneData)
}

const addLane = async () => {
  const laneData = {
    name: 'New Lane'
  }
  await projectStore.addLane(props.projectId, laneData)
}

const handleTaskDrag = (event) => {
  const { newIndex, oldIndex, to, from } = event
  const taskId = event.item.dataset.id
  const fromLaneId = from.parentElement.dataset.id
  const toLaneId = to.parentElement.dataset.id

  if (fromLaneId === toLaneId) {
    // Update task order within the same lane
    const laneIndex = lanes.value.findIndex((lane) => lane._id === fromLaneId)
    if (laneIndex !== -1) {
      const tasks = lanes.value[laneIndex].tasks
      const task = tasks.splice(oldIndex, 1)[0]
      tasks.splice(newIndex, 0, task)
    }
  } else {
    // Move task to another lane
    const fromLaneIndex = lanes.value.findIndex((lane) => lane._id === fromLaneId)
    const toLaneIndex = lanes.value.findIndex((lane) => lane._id === toLaneId)

    if (fromLaneIndex !== -1 && toLaneIndex !== -1) {
      const fromTasks = lanes.value[fromLaneIndex].tasks
      const toTasks = lanes.value[toLaneIndex].tasks

      const task = fromTasks.splice(oldIndex, 1)[0]
      toTasks.splice(newIndex, 0, task)
    }
  }
}
</script>
