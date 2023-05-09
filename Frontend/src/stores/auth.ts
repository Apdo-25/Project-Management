import { defineStore } from 'pinia'
import { useApi, useApiPrivate } from '../services/useApi'

const STORAGE_KEY = 'loginData'

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  full_name?: string
}

export interface State {
  user: User
  accessToken: string
  authReady: boolean
  isAuthenticated: boolean
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  first_name: string
  last_name: string
  password: string
  password_confirm: string
}

export const useAuthStore = defineStore('auth', {
  state: (): State => {
    return {
      user: {} as User,
      accessToken: '' as string,
      authReady: false as boolean
    }
  },

  getters: {
    userDetail: (state: State) => state.user,
    isAuthenticated: (state: State) => (state.accessToken ? true : false)
  },

  actions: {
    setAccessToken(token: string) {
      this.accessToken = token
    },

    initialize() {
      const loginData = localStorage.getItem(STORAGE_KEY)
      if (loginData) {
        const { accessToken, user } = JSON.parse(loginData)
        if (accessToken) {
          this.accessToken = accessToken
          this.user = user
          this.authReady = true
          return this.getUser() // Retrieve the user details
        } else {
          // Access token not found, clear the login data
          localStorage.removeItem(STORAGE_KEY)
        }
      }

      // No login data found or access token is empty, resolve immediately
      this.accessToken = ''
      this.user = {} as User
      this.authReady = false
      return Promise.resolve()
    },

    async attempt() {
      try {
        await this.refresh()
        await this.getUser()
        // Store the access token in local storage
        localStorage.setItem('accessToken', this.accessToken)
      } catch (error) {
        // Handle error
        console.error(error)
      }
    },

    async login(payload: LoginData) {
      try {
        const { data } = await useApi().post('/api/auth/login', payload)
        this.accessToken = data.access_token
        await this.getUser()
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ accessToken: this.accessToken, user: this.user })
        )
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async register(payload: RegisterData) {
      try {
        const { data } = await useApi().post('/api/auth/register', payload)
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async getUser() {
      try {
        const { data } = await useApiPrivate().get('/api/auth/user')
        this.user = {
          ...data,
          lastLogin: new Date().toISOString(), // or assign the actual last login value
          fullName: `${data.first_name} ${data.last_name}`,
          avatar: 'https://i.pravatar.cc/300',
          role: 'admin',
          permissions: ['admin', 'user']
        }
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async logout() {
      try {
        const { data } = await useApiPrivate().post('/api/auth/logout')
        this.accessToken = ''
        this.user = {} as User
        this.authReady = false
        localStorage.removeItem(STORAGE_KEY)
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    },

    async refresh() {
      if (!this.accessToken) {
        // No access token found, resolve immediately
        return Promise.reject(new Error('No access token found.'))
      }

      try {
        const { data } = await useApi().post('/api/auth/refresh')
        this.accessToken = data.access_token
        return data
      } catch (error: Error | any) {
        // Handle error
        console.error(error)
        throw error.message
      }
    }
  }
})
