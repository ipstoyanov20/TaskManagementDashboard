import axios from 'axios'
import type { Task, ActivityLog } from '../types' 

const BASE_URL = 'http://localhost:8080' 

export const fetchTasks = async (priority?: number, title?: string): Promise<Task[]> => {
  const params: any = {}
  if (priority !== undefined) params.priority = priority
  if (title) params.title = title

  const res = await axios.get<Task[]>(`${BASE_URL}/tasks`, { params })
  return res.data
}

export const createTask = async (task: Task): Promise<Task> => {
  const res = await axios.post<Task>(`${BASE_URL}/tasks`, task)
  return res.data
}

export const updateTask = async (id: number, data: Partial<Task>): Promise<Task> => {
  if (id === undefined || id === null) throw new Error('Task ID is required for update')
  const res = await axios.put<Task>(`${BASE_URL}/tasks/${id}`, data)
  return res.data
}

export const deleteTask = async (id: number): Promise<void> => {
  if (id === undefined || id === null) throw new Error('Task ID is required for deletion')
  await axios.delete(`${BASE_URL}/tasks/${id}`)
}

export const fetchActivityLogs = async (limit = 100, offset = 0): Promise<ActivityLog[]> => {
  const res = await axios.get<ActivityLog[]>(`${BASE_URL}/tasks/activity-log`, { params: { limit, offset } })
  return res.data
}