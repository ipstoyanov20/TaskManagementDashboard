import type { Task, ActivityLog } from '../types'
import * as api from '../api/taskApi'

export const listTasks = async (priority?: number, title?: string): Promise<Task[]> => {
  const tasks = await api.fetchTasks(priority, title)
  return tasks.sort((a, b) => a.priority - b.priority)
}

export const addTask = async (task: Task): Promise<Task> => {
  return api.createTask(task)
}

export const updateTask = async (id: number, data: Partial<Task>): Promise<Task> => {
  return api.updateTask(id, data)
}

export const removeTask = async (id: number): Promise<void> => {
  return api.deleteTask(id)
}

export const listActivityLogs = async (limit = 100, offset = 0): Promise<ActivityLog[]> => {
  return api.fetchActivityLogs(limit, offset)
}