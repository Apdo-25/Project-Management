export interface Project {
  _id: string
  name: string
  description: string
  tasks: Task[]
  status: string
  members: string[]
  createdAt: string
  updatedAt: string
}

export interface ProjectData {
  name: string
  description: string
  tasks: Task[]
  status: string
  members: string[]
}

export interface Board {
  _id: string
  name: string
  tasks: Task[]
}

export interface BoardData {
  name: string
  tasks: Task[]
}

export interface Task {
  _id: string
  name: string
  description: string
  status: string
  board: Board[]
  project: string
  assignedTo: string
  createdAt: string
  updatedAt: string
}
