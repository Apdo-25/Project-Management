<script setup>
import { ref, watch } from 'vue'
import { useProjectStore } from '@/stores/project'
import { useRouter } from 'vue-router'
import SectionMain from '@/components/SectionMain.vue'
import Layout from '@/layouts/Layout.vue'

const projectStore = useProjectStore()
const router = useRouter()
const projectId = ref(router.currentRoute.value.params.id)
const project = ref(null)

watch(projectId, async (newProjectId) => {
  if (newProjectId) {
    project.value = await projectStore.getProject(newProjectId)
  }
})
</script>

<template>
  <Layout>
    <SectionMain>
      <div v-if="project">
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>
        <h3>Boards:</h3>
        <ul>
          <li v-for="board in project.boards" :key="board._id">
            {{ board.name }}
          </li>
        </ul>
        <h3>Members:</h3>
        <ul>
          <li v-for="member in project.members" :key="member">
            {{ member }}
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading project details...</p>
      </div>
    </SectionMain>
  </Layout>
</template>
