import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'

const routes = [
  {
    meta: {
      title: 'dashboard'
    },
    path: '/',
    name: 'dashboard',
    component: Home
  },
  {
    meta: {
      title: 'Projects'
    },
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/ProjectView.vue')
  },
  {
    meta: {
      title: 'Tasks'
    },
    path: '/tasks',
    name: 'Tasks',
    component: () => import('@/views/TaskView.vue')
  },

  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },

  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },

  {
    meta: {
      title: 'Register'
    },
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
