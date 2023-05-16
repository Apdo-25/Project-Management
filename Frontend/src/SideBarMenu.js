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
    to: '/kanban',
    label: 'Kanban',
    icon: mdiTable
  }
]
