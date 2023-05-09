import { defineStore } from 'pinia'
import { User } from '@/stores/auth'

export interface Project {
  id: string
  name: string
  description: string
  tasks: Task[]
}

export interface Task {
  id: string
  name: string
  description: string
  completed: boolean
}

interface ProjectStoreState {
  projects: Project[]
}

export const useProjectStore = defineStore('project', {
  state: (): ProjectStoreState => ({
    projects: []
  }),

  actions: {
    async getProjects() {
      try {
        const response = await fetch('/api/projects')
        if (response.ok) {
          const projects = await response.json()
          this.projects = projects
        } else {
          console.error('Failed to fetch projects')
        }
      } catch (error) {
        console.error('Error while fetching projects', error)
      }
    },

    async getProject(id: string) {
      try {
        const response = await fetch(`/api/projects/${id}`)
        if (response.ok) {
          const project = await response.json()
          // Do something with the project
        } else {
          console.error(`Failed to fetch project with id: ${id}`)
        }
      } catch (error) {
        console.error(`Error while fetching project with id: ${id}`, error)
      }
    },

    async createProject(project: Project) {
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(project)
        })
        if (response.ok) {
          const createdProject = await response.json()
          // Do something with the created project
        } else {
          console.error('Failed to create project')
        }
      } catch (error) {
        console.error('Error while creating project', error)
      }
    },

    async updateProject(project: Project) {
      try {
        const response = await fetch(`/api/projects/${project.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(project)
        })
        if (response.ok) {
          const updatedProject = await response.json()
          // Do something with the updated project
        } else {
          console.error(`Failed to update project with id: ${project.id}`)
        }
      } catch (error) {
        console.error(`Error while updating project with id: ${project.id}`, error)
      }
    },

    async deleteProject(id: string) {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          // Project deleted successfully
        } else {
          console.error(`Failed to delete project with id: ${id}`)
        }
      } catch (error) {
        console.error(`Error while deleting project with id: ${id}`, error)
      }
    },

    async addTask(projectId: string, task: Task) {
      try {
        const response = await fetch(`/api/projects/${projectId}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task)
        })
        if (response.ok) {
          const updatedProject = await response.json()
          // Do something with the updated project
        } else {
          console.error(`Failed to add task to project with id: ${projectId}`)
        }
      } catch (error) {
        console.error(`Error while adding task to project with id: ${projectId}`, error)
      }
    }
  }
})
