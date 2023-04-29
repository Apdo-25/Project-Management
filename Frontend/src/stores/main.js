import { defineStore } from 'pinia'

export interface User {
  id: number,
  username: string,
  email: string,
  password: string,
  first_name: string,
  last_name: string
}

export interface State {
  user: User

}

export const useMainStore = defineStore('main', () => ({
  state: () => ({
    user: {} as User
  }),

  getters: {
    getUser: (state) => state.user,

    isAuthenticated: (state) => (state.user.id ? true : false)
  },

  actions: {
    async getUser() {},

    async login() {},

    async logout() {},

    async register() {},

    async refresh() {}
  }
}))
