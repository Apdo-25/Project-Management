import { defineStore } from 'pinia'
import { useApi, useApiPrivate } from '../services/useApi'
import jwtDecode from 'jwt-decode'

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
      accessToken: '',
      authReady: false
    }
  },

  getters: {
    userDetail: (state: State) => state.user,
    isAuthenticated: (state: State) => !!state.accessToken
  },

  actions: {
    //setuser
    async setUser(user: User) {
      this.user = user
    },

    async setAccessToken() {
      const loginData = localStorage.getItem(STORAGE_KEY)
      if (loginData) {
        const { accessToken } = JSON.parse(loginData)
        if (accessToken) {
          this.accessToken = accessToken
        }
      }
    },

    async initialize() {
      const loginData = localStorage.getItem(STORAGE_KEY)

      if (loginData) {
        const { accessToken, user } = JSON.parse(loginData)

        if (accessToken) {
          this.accessToken = accessToken
          this.user = user
          this.authReady = true

          return this.getUser().catch((error) => {
            console.error('Error retrieving user details:', error)
            return Promise.resolve()
          })
        }
      }

      return Promise.resolve()
    },

    async attempt() {
      if (!this.accessToken) {
        // No access token found, resolve immediately
        return Promise.resolve()
      }

      const currentTime = Date.now() / 1000 // Current time in seconds
      const tokenExpiration = this.decodeTokenExpiration(this.accessToken) // Decode the token expiration time

      if (tokenExpiration && tokenExpiration < currentTime) {
        // Token has expired, renew the access token
        try {
          const { data } = await this.refreshToken()
          this.accessToken = data.access_token
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ accessToken: this.accessToken, user: this.user })
          )
        } catch (error) {
          // Token refresh failed, handle the error
          console.error('Token refresh failed:', error)
        }
      }

      // Token is valid or renewed, continue with user retrieval
      try {
        await this.getUser()
      } catch (error) {
        // Handle error while retrieving user details
        console.error('Error retrieving user details:', error)
      }
    },

    async refreshToken() {
      // Send a refresh token request to the server
      // You can use an API endpoint to refresh the token
      const refreshToken = localStorage.getItem('refreshToken')

      try {
        const { data } = await useApi().post('/api/auth/refresh', {
          refresh_token: refreshToken
        })
        return data
      } catch (error) {
        // Token refresh failed, handle the error
        throw new Error('Token refresh failed. Please log in again.')
      }
    },

    decodeTokenExpiration(token) {
      try {
        const decodedToken = jwtDecode(token)
        if (decodedToken && decodedToken.exp) {
          return decodedToken.exp
        }
      } catch (error) {
        console.error('Error decoding token:', error)
      }

      return null
    },

    // Rest of the actions...

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
          lastLogin: new Date().toISOString(),
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
        return Promise.reject(new Error('No access token found.'))
      }

      try {
        const { data } = await useApi().post('/api/auth/refresh')
        this.accessToken = data.access_token
        return data
      } catch (error: Error | any) {
        throw error.message
      }
    }
  }
})
