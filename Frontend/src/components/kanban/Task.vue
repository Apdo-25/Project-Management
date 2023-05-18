<template>
  <CardBox
    class="bg-white p-4 mb-3 shadow-md border-t border-r border-l border-gray-100 rounded-md flex flex-col-reverse space-y-2 space-y-reverse relative hover:cursor-move"
  >
    <div>{{ task.title }}</div>
    <div class="text-gray-400 text-sm">
      {{ getUser(task.creator)?.username }}, {{ task.created_at }}
    </div>

    <div
      v-if="task.level == 'Low Level'"
      class="absolute top-4 right-4 bg-green-100 text-green-700 font-semibold text-sm px-3 rounded-full"
    >
      {{ task.level }}
    </div>
    <div
      v-if="task.level == 'Medium Level'"
      class="absolute top-4 right-4 bg-yellow-100 text-yellow-700 font-semibold text-sm px-3 rounded-full"
    >
      {{ task.level }}
    </div>
    <div
      v-if="task.level == 'High Level'"
      class="absolute top-4 right-4 bg-red-100 text-red-700 font-semibold text-sm px-3 rounded-full"
    >
      {{ task.level }}
    </div>
    <div class="flex justify-end space-x-2">
      <button @click="editTask" class="text-blue-500">Edit</button>
      <button @click="deleteTask" class="text-red-500">Delete</button>
    </div>
  </CardBox>
</template>

<script setup>
import { defineProps } from 'vue'
import { useTaskStore } from '@/stores/task'
import { useAuthStore } from '@/stores/auth' // import the auth store
import CardBox from '@/components/CardBox.vue'
import BaseButton from '../BaseButton.vue'

const props = defineProps({
  task: Object
})

const taskStore = useTaskStore()
const authStore = useAuthStore() // initialize the auth store

// Add a method to get the user by id
const getUser = (id) => {
  return authStore.AllUsers.find((user) => user.id === id)
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
