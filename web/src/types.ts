export type PriorityLabels = 'Low' | 'Medium' | 'High'
export type Status = 'To Do' | 'In Progress' | 'Done'

export interface Task {
  id: number
  title: string
  description?: string
  priority: number
  status: Status
  deadline?: string
}

export interface ActivityLog {
  taskID: number
  action: 'create' | 'update' | 'delete'
  oldValue?: string
  newValue?: string
}