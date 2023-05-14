import { defineStore } from 'pinia'
import { useApiPrivate } from '../services/useApi'
import { Project, ProjectData, BoardData } from '@/stores/types'

export interface State {
  projects: Project[]
}

export const useProjectStore = defineStore('project', {
  state: (): State => ({
    projects: []
  }),

  getters: {
    getProjects: (state) => state.projects,
    getProjectById: (state) => (id: string) => {
      return state.projects.find((project) => project._id === id)
    }
  },

  actions: {
    async fetchProjects() {
      try {
        const response = await useApiPrivate().get('/api/project/projects')
        this.projects = response.data.projects // Update the projects property with the fetched data
        return this.projects
      } catch (error) {
        console.error('Error fetching projects:', error)
        throw error
      }
    },

    async fetchProjectById(id: string) {
      try {
        const response = await useApiPrivate().get(`/api/project/projects/${id}`)
        return response.data
      } catch (error) {
        console.error('Error fetching project by ID:', error)
        throw error
      }
    },

    async createProject(projectData: ProjectData) {
      try {
        const response = await useApiPrivate().post('/api/project/projects', projectData)
        const project = response.data
        this.projects.push(project)
        return project
      } catch (error) {
        console.error('Error creating project:', error)
        throw error
      }
    },

    async updateProject(id: string, projectData: ProjectData) {
      try {
        const response = await useApiPrivate().put(`/api/project/projects/${id}`, projectData)
        const updatedProject = response.data
        const index = this.projects.findIndex((project) => project._id === id)
        if (index !== -1) {
          this.projects.splice(index, 1, updatedProject)
        }
        return updatedProject
      } catch (error) {
        console.error('Error updating project:', error)
        throw error
      }
    },

    async deleteProject(id: string) {
      try {
        await useApiPrivate().delete(`/api/project/projects/${id}`)
        const index = this.projects.findIndex((project) => project._id === id)
        if (index !== -1) {
          this.projects.splice(index, 1)
        }
      } catch (error) {
        console.error('Error deleting project:', error)
        throw error
      }
    },

    async addBoard(projectId: string, boardData: BoardData) {
      try {
        const response = await useApiPrivate().post(
          `/api/project/projects/${projectId}/boards`,
          boardData
        )
        const project = response.data
        const index = this.projects.findIndex((project) => project._id === projectId)
        if (index !== -1) {
          this.projects.splice(index, 1, project)
        }
        return project
      } catch (error) {
        console.error('Error adding board to project:', error)
        throw error
      }
    },

    async removeBoard(projectId: string, boardId: string) {
      try {
        const response = await useApiPrivate().delete(
          `/api/project/projects/${projectId}/boards/${boardId}`
        )
        const project = response.data
        const index = this.projects.findIndex((project) => project._id === projectId)
        if (index !== -1) {
          this.projects.splice(index, 1, project)
        }
        return project
      } catch (error) {
        console.error('Error removing board from project:', error)
        throw error
      }
    },

    async addMember(projectId: string, memberId: string) {
      try {
        const response = await useApiPrivate().post(`/api/project/projects/${projectId}/members`, {
          memberId
        })
        const project = response.data
        const index = this.projects.findIndex((project) => project._id === projectId)
        if (index !== -1) {
          this.projects.splice(index, 1, project)
        }
        return project
      } catch (error) {
        console.error('Error adding member to project:', error)
        throw error
      }
    },

    async removeMember(projectId: string, memberId: string) {
      try {
        const response = await useApiPrivate().delete(
          `/api/project/projects/${projectId}/members/${memberId}`
        )
        const project = response.data
        const index = this.projects.findIndex((project) => project._id === projectId)
        if (index !== -1) {
          this.projects.splice(index, 1, project)
        }
        return project
      } catch (error) {
        console.error('Error removing member from project:', error)
        throw error
      }
    },

    async deleteAllProjects() {
      try {
        await useApiPrivate().delete(`/api/project/projects`)
        this.projects = []
      } catch (error) {
        console.error('Error deleting all projects:', error)
        throw error
      }
    }
  }
})

//export store
export type ProjectStore = ReturnType<typeof useProjectStore>
export default useProjectStore
