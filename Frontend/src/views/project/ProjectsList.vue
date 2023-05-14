<script setup>
import SectionMain from '@/components/SectionMain.vue'
import Layout from '@/layouts/Layout.vue'
import { ref, onMounted } from 'vue'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()
const projects = ref([])

onMounted(async () => {
  await projectStore.fetchProjects()
  projects.value = projectStore.getProjects()
})
</script>

<template>
  <Layout>
    <SectionMain>
      <div>
        <h2>Projects</h2>
        <ul>
          <li v-for="project in projects" :key="project._id">
            {{ project.name }}
          </li>
        </ul>
      </div>
    </SectionMain>
  </Layout>
</template>
