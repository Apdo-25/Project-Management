<script setup>
import { reactive, ref, watch, computed } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import SectionMain from '@/components/SectionMain.vue'
import Layout from '@/layouts/Layout.vue'
import layoutS from '@/layouts/LayoutS.vue'
const projectStore = useProjectStore()
const projects = projectStore.projects
const projectLoading = projectStore.projectLoading
const projectError = projectStore.projectError
const projectCreateLoading = projectStore.projectCreateLoading

const createNewProject = () => {
  // Logic to create a new project
}

const viewProject = async (projectId) => {
  projectStore.getProject(projectId)
}

const currentProject = computed(() => projectStore.projectDetail)
</script>

<template>
  <Layout>
    <layoutS>
      <SectionMain>
        <h1>My Projects</h1>
        <button @click="createNewProject" :disabled="projectCreateLoading">
          {{ projectCreateLoading ? 'Creating...' : 'Create New Project' }}
        </button>
        <ul>
          <li v-for="project in projects" :key="project.id" @click="viewProject(project.id)">
            {{ project.name }}
          </li>
        </ul>

        <div v-if="projectLoading">Loading project...</div>

        <div v-if="projectError">Error loading project: {{ projectError.message }}</div>

        <div v-if="currentProject">
          <h2>Current Project: {{ currentProject.name }}</h2>
          <!-- Display project details and perform actions -->
        </div>
      </SectionMain>
    </layoutS>
  </Layout>
</template>
