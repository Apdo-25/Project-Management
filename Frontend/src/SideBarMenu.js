import { mdiAccountCircle, mdiMonitor, mdiLock, mdiTable } from '@mdi/js'

export default [
  {
    to: '/',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    to: '/projects',
    label: 'My Projects',
    icon: mdiTable
  },
  {
    to: '/tasks',
    label: 'Tasks',
    icon: mdiTable
  },
  {
    to: '/kanban',
    label: 'Kanban',
    icon: mdiTable
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: mdiAccountCircle
  },
  {
    to: '/CreateProject',
    label: 'CreateProject',
    icon: mdiTable
  },
  {
    to: '/EditProject/:id',
    label: 'EditProject',
    icon: mdiTable
  }
]
