import { defineStore } from 'pinia'
import { useApi } from '@/services/useApi'

interface State {
  projects: any[]
  project: any
  projectTasks: any[]
  projectBoards: any[]
  projectMembers: any[]
}

interface Project {
  name: string
  description: string
  members: any[]
  boards: any[]
  tasks: any[]
}

export const useProjectStore = defineStore('project', {
  state: (): State => {
    return {
      projects: [],
      project: null,
      projectTasks: [],
      projectBoards: [],
      projectMembers: []
    }
  },

  getters: {
    allProjects: (state) => state.projects,
    getProject: (state) => state.project,
    getProjectTasks: (state) => state.projectTasks,
    getProjectBoards: (state) => state.projectBoards,
    getProjectMembers: (state) => state.projectMembers
  },

  actions: {
    async fetchProjects() {
      try {
        const { data } = await useApi().get('/project/projects/')
        this.projects = data
      } catch (error) {
        console.error(error)
        // Handle error
      }
    },

    async getProject(id) {
      try {
        const { data } = await useApi().get(`/project/projects/${id}/`)
        this.project = data
      } catch (error) {
        console.error(error)
        // Handle error
      }
    },

    async createProject() {
      try {
        const { data } = await useApi().post('/project/projects/')
        this.projects.push(data)
      } catch (error) {
        console.error(error)
        // Handle error
      }
    },

    async updateProject() {
      try {
        const { data } = await useApi().put(`/project/projects/${this.project.id}/`)
        this.project = data
      } catch (error) {
        console.error(error)
        // Handle error
      }
    },

    async addBoard() {
      try {
        const { data } = await useApi().post(`/project/projects/${this.project.id}/boards/`)
        this.projectBoards.push(data)
      } catch (error) {
        console.error(error)
        // Handle error
      }
    },

    async addMember() {
      try {
        const { data } = await useApi().post(`/project/projects/${this.project.id}/members/`)
        this.projectMembers.push(data)
      } catch (error) {
        console.error(error)
        // Handle error
      }
    },

    async removeMember() {
      try {
        const { data } = await useApi().delete(`/project/projects/${this.project.id}/members/`)
        this.projectMembers = data
      } catch (error) {
        console.error(error)
        // Handle error
      }
    },

    async deleteAllProjects() {
      try {
        await useApi().delete('/project/projects/')
        this.projects = []
      } catch (error) {
        console.error(error)
        // Handle error
      }
    }
  }
})

export default useProjectStore
