import { defineStore } from 'pinia'
import { useApi } from '../services/useApi'

export interface Project {
  id: number
  name: string
  description: string
  users: User[]
  tasks: Task[]
}

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  full_name?: string
}

export interface Task {
  id: number
  name: string
  description: string
  status: string
  project: number
  assigned_to: User
}

export interface State {
  projects: Project[]
  project: Project | null
  projectLoading: boolean
  projectError: any
  projectCreateLoading: boolean
  projectCreateError: any
  projectUpdateLoading: boolean
  projectUpdateError: any
  projectDeleteLoading: boolean
  projectDeleteError: any
  projectAddUserLoading: boolean
  projectAddUserError: any
  projectRemoveUserLoading: boolean
  projectRemoveUserError: any
  projectAddTaskLoading: boolean
  projectAddTaskError: any
  projectRemoveTaskLoading: boolean
  projectRemoveTaskError: any
  projectUpdateTaskLoading: boolean
  projectUpdateTaskError: any
}

export const useProjectStore = defineStore('project', {
  state: (): State => {
    return {
      projects: [],
      project: null,
      projectLoading: false,
      projectError: null,
      projectCreateLoading: false,
      projectCreateError: null,
      projectUpdateLoading: false,
      projectUpdateError: null,
      projectDeleteLoading: false,
      projectDeleteError: null,
      projectAddUserLoading: false,
      projectAddUserError: null,
      projectRemoveUserLoading: false,
      projectRemoveUserError: null,
      projectAddTaskLoading: false,
      projectAddTaskError: null,
      projectRemoveTaskLoading: false,
      projectRemoveTaskError: null,
      projectUpdateTaskLoading: false,
      projectUpdateTaskError: null
    }
  },

  getters: {
    getProjectDetail: (state) => state.project,
    getProjectLoading: (state) => state.projectLoading,
    getProjectError: (state) => state.projectError,
    getProjectCreateLoading: (state) => state.projectCreateLoading,
    getProjectCreateError: (state) => state.projectCreateError,
    getProjectUpdateLoading: (state) => state.projectUpdateLoading,
    getProjectUpdateError: (state) => state.projectUpdateError,
    getProjectDeleteLoading: (state) => state.projectDeleteLoading,
    getProjectDeleteError: (state) => state.projectDeleteError,
    getProjectAddUserLoading: (state) => state.projectAddUserLoading,
    getProjectAddUserError: (state) => state.projectAddUserError,
    getProjectRemoveUserLoading: (state) => state.projectRemoveUserLoading,
    getProjectRemoveUserError: (state) => state.projectRemoveUserError,
    getProjectAddTaskLoading: (state) => state.projectAddTaskLoading,
    getProjectAddTaskError: (state) => state.projectAddTaskError,
    getProjectRemoveTaskLoading: (state) => state.projectRemoveTaskLoading,
    getProjectRemoveTaskError: (state) => state.projectRemoveTaskError,
    getProjectUpdateTaskLoading: (state) => state.projectUpdateTaskLoading,
    getProjectUpdateTaskError: (state) => state.projectUpdateTaskError
  },

  actions: {
    async getProjects() {
      this.projects = []

      try {
        const { data } = await useApi().get('/api/project/projects')
        this.projects = data
      } catch (error) {
        console.log(error)
      }
    },

    async getProject(id) {
      this.project = null
      this.projectLoading = true
      this.projectError = null

      try {
        const { data } = await useApi().get(`/api/project/projects/${id}`)
        this.project = data || null
      } catch (error) {
        this.projectError = error
      } finally {
        this.projectLoading = false
      }
    },

    async createProject(payload) {
      this.projectCreateLoading = true
      this.projectCreateError = null

      try {
        await useApi().post('/api/project/projects', payload)
        await this.getProjects()
      } catch (error) {
        this.projectCreateError = error
      } finally {
        this.projectCreateLoading = false
      }
    },

    async updateProject(payload) {
      this.projectUpdateLoading = true
      this.projectUpdateError = null

      try {
        await useApi().patch(`/api/project/projects/${payload.id}`, payload)
        await this.getProject(payload.id)
      } catch (error) {
        this.projectUpdateError = error
      } finally {
        this.projectUpdateLoading = false
      }
    },

    async deleteProject(id) {
      this.projectDeleteLoading = true
      this.projectDeleteError = null

      try {
        await useApi().delete(`/api/project/projects/${id}`)
        await this.getProjects()
      } catch (error) {
        this.projectDeleteError = error
      } finally {
        this.projectDeleteLoading = false
      }
    },

    async addUserToProject(payload) {
      this.projectAddUserLoading = true
      this.projectAddUserError = null

      try {
        await useApi().post(`/api/project/projects/${payload.projectId}/add-user`, payload)
        await this.getProject(payload.projectId)
      } catch (error) {
        this.projectAddUserError = error
      } finally {
        this.projectAddUserLoading = false
      }
    },

    async removeUserFromProject(payload) {
      this.projectRemoveUserLoading = true
      this.projectRemoveUserError = null

      try {
        await useApi().post(`/api/project/projects/${payload.projectId}/remove-user`, payload)
        await this.getProject(payload.projectId)
      } catch (error) {
        this.projectRemoveUserError = error
      } finally {
        this.projectRemoveUserLoading = false
      }
    },

    async addTaskToProject(payload) {
      this.projectAddTaskLoading = true
      this.projectAddTaskError = null

      try {
        await useApi().post(`/api/project/projects/${payload.projectId}/add-task`, payload)
        await this.getProject(payload.projectId)
      } catch (error) {
        this.projectAddTaskError = error
      } finally {
        this.projectAddTaskLoading = false
      }
    },

    async removeTaskFromProject(payload) {
      this.projectRemoveTaskLoading = true
      this.projectRemoveTaskError = null

      try {
        await useApi().post(`/api/project/projects/${payload.projectId}/remove-task`, payload)
        await this.getProject(payload.projectId)
      } catch (error) {
        this.projectRemoveTaskError = error
      } finally {
        this.projectRemoveTaskLoading = false
      }
    },

    async updateTaskInProject(payload) {
      this.projectUpdateTaskLoading = true
      this.projectUpdateTaskError = null

      try {
        await useApi().post(`/api/project/projects/${payload.projectId}/update-task`, payload)
        await this.getProject(payload.projectId)
      } catch (error) {
        this.projectUpdateTaskError = error
      } finally {
        this.projectUpdateTaskLoading = false
      }
    }
  }
})
