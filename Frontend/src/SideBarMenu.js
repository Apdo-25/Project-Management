import { mdiMonitor, mdiTable } from '@mdi/js'

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
    to: '/KanbanBoard',
    label: 'Kanban Board',
    icon: mdiTable
  }
]
