<!-- <script setup>
import { useProjectStore } from '@/stores/project'
import { onMounted } from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import Layout from '@/layouts/Layout.vue'
import LayoutS from '@/layouts/LayoutS.vue'

const projectStore = useProjectStore()

onMounted(async () => {
  await projectStore.getProjects()
})
</script>

<template>
  <Layout>
    <LayoutS>
      <SectionMain>
        <h2>Projects</h2>
        <ul>
          <li v-for="project in projects" :key="project.id">{{ project.name }}</li>
        </ul>
        <button @click="createProject">Create New Project</button>
        <button @click="deleteAllProjects">Delete All Projects</button>
        <BaseButtons>
          <BaseButton type="button" color="success" label="Create" @click="createProject" />
          <BaseButton type="button" color="success" label="DeleteAll" @click="deleteAllProjects" />
        </BaseButtons>
      </SectionMain>
    </LayoutS>
  </Layout>
</template> -->
