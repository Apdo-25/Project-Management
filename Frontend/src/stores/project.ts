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
    getProjectById: (state) => (id: string) => state.projects.find((project) => project._id === id)
  },

  actions: {
    async fetchProjects() {
      try {
        const response = await useApiPrivate().get('/api/project/projects')
        this.projects = response.data
        return this.projects
      } catch (error) {
        console.error('Error fetching projects:', error)
        throw error
      }
    },

    async fetchUserProjects(userId) {
      try {
        const response = await useApiPrivate().get(`/api/projects?userId=${userId}`)
        if (response.status === 200) {
          this.projects = response.data
        } else {
          throw new Error(`Request failed with status code ${response.status}`)
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      }
    },

    async fetchMemberProjects(userId: string) {
      try {
        const response = await useApiPrivate().get(`/api/project/projects/member/${userId}`)
        this.projects = response.data
        return this.projects
      } catch (error) {
        console.error(`Error fetching projects for member ${userId}:`, error)
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
        this.projects.push(project) // Add the project to the store's state
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
        await useApiPrivate().delete(`/api/project/projects/${projectId}/boards/${boardId}`)
        const index = this.projects.findIndex((project) => project._id === projectId)
        if (index !== -1) {
          this.projects.splice(index, 1)
        }
      } catch (error) {
        console.error('Error removing board from project:', error)
        throw error
      }
    },

    async addMember(projectId: string, memberId: string) {
      try {
        const response = await useApiPrivate().post(
          `/api/project/projects/${projectId}/members/${memberId}`
        )
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
        await useApiPrivate().delete(`/api/project/projects/${projectId}/members/${memberId}`)
        const index = this.projects.findIndex((project) => project._id === projectId)
        if (index !== -1) {
          this.projects.splice(index, 1)
        }
      } catch (error) {
        console.error('Error removing member from project:', error)
        throw error
      }
    },

    addProject(project: Project) {
      this.projects.push(project)
    }
  }
})

//export store
export type ProjectStore = ReturnType<typeof useProjectStore>

export function useProjectStoreWrapper() {
  return useProjectStore()
}
