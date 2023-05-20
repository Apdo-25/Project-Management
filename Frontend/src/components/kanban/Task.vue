<script setup>
import { defineProps } from 'vue'
import { useTaskStore } from '@/stores/task'
import { useAuthStore } from '@/stores/auth'
import CardBox from '@/components/CardBox.vue'

const props = defineProps({
  task: Object
})

const taskStore = useTaskStore()
const authStore = useAuthStore()

const getUser = (id) => {
  return authStore.users.find((user) => user._id === id)
}

const editTask = () => {
  taskStore.updateTask(props.task._id, {
    /* Updated task data */
  })
}

const deleteTask = () => {
  taskStore.deleteTask(props.task._id)
}
</script>

<template>
  <CardBox
    class="bg-white p-4 mb-3 shadow-md border-t border-r border-l border-gray-100 rounded-md flex flex-col-reverse space-y-2 space-y-reverse relative hover:cursor-move"
  >
    <div>{{ task.name }}</div>
    <div class="text-gray-400 text-sm">
      {{ getUser(task.creator)?.$username }}, {{ task.created_at }}
    </div>

    <div
      v-if="task.priority === 'low'"
      class="absolute top-4 right-4 bg-green-100 text-green-700 font-semibold text-sm px-3 rounded-full"
    >
      {{ task.priority }}
    </div>
    <div
      v-if="task.priority === 'medium'"
      class="absolute top-4 right-4 bg-yellow-100 text-yellow-700 font-semibold text-sm px-3 rounded-full"
    >
      {{ task.priority }}
    </div>
    <div
      v-if="task.priority === 'high'"
      class="absolute top-4 right-4 bg-red-100 text-red-700 font-semibold text-sm px-3 rounded-full"
    >
      {{ task.priority }}
    </div>
    <div class="flex justify-end space-x-2">
      <button @click="editTask" class="text-blue-500">Edit</button>
      <button @click="deleteTask" class="text-red-500">Delete</button>
    </div>
  </CardBox>
</template>
