<script setup>
import SectionMain from '@/components/SectionMain.vue'
import Layout from '@/layouts/Layout.vue'
import useProjectStore from '@/stores/project'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'

const projectStore = useProjectStore()

projectStore.createProject = async () => {
  const projectData = {
    name: 'New Project',
    description: 'Project description'
    // Add other properties as needed
  }

  try {
    const createdProject = await projectStore.createProject(projectData)
    console.log('Project created:', createdProject)
    // Handle success, e.g., show a success message or redirect to the project page
  } catch (error) {
    console.error('Error creating project:', error)
    // Handle error, e.g., show an error message to the user
  }
}
</script>

<template>
  <Layout>
    <SectionMain>
      <h1>Create Project</h1>
      <BaseButtons>
        <BaseButton type="button" color="success" label="Create Project" @click="submit" />
      </BaseButtons>
      <button @click="createProject">Create Project</button>
    </SectionMain>
  </Layout>
</template>
