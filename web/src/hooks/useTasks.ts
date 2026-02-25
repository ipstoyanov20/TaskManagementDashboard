
import { useState, useCallback } from 'react'
import type { Task, PriorityLabels, Status } from '../types'
import * as service from '../services/taskService'
import * as storage from '../services/localStorageService'


export const PriorityMap: Record<number, PriorityLabels> = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
}


export const PriorityReverseMap: Record<PriorityLabels, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  
  const fetchTasks = useCallback(async (priorityFilter?: PriorityLabels, searchQuery?: string) => {
    setLoading(true)
    try {
      const priorityNum = priorityFilter ? PriorityReverseMap[priorityFilter] : undefined
      const allTasks = await service.listTasks(priorityNum, searchQuery)
      const overrides = storage.getStatusOverrides()

      
      const mergedTasks = allTasks.map(task => ({
        ...task,
        status: overrides[task.id] || task.status || 'To Do'
      }))

      setTasks(mergedTasks)
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const addTask = async (taskData: Omit<Task, 'id'>) => {
    const created = await service.addTask(taskData as Task)
    
    if (taskData.status) {
      storage.setStatusOverride(created.id, taskData.status)
    }
    const newTask: Task = { ...created, status: taskData.status || 'To Do' }
    setTasks(prev => [...prev, newTask])
    return newTask
  }

  const updateTask = async (id: number, data: Partial<Task>) => {
    const updated = await service.updateTask(id, data)
    
    if (data.status) {
      storage.setStatusOverride(id, data.status)
    }
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updated, status: data.status || t.status } : t))
  }

  const deleteTask = async (id: number) => {
    await service.removeTask(id)
    storage.removeStatusOverride(id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const moveTask = (taskId: number, newStatus: Status) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
    storage.setStatusOverride(taskId, newStatus)
  }

  const syncChanges = async () => {
    setLoading(true)
    try {
      
      await fetchTasks()
    } catch (error) {
      console.error('Failed to refresh tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearCache = async () => {
    storage.clearAllOverrides()
    await fetchTasks()
  }

  
  const getPriorityLabel = (priorityNum: number): PriorityLabels => PriorityMap[priorityNum] || 'Low'

  return { 
    tasks, 
    loading, 
    fetchTasks, 
    addTask, 
    updateTask, 
    deleteTask, 
    moveTask, 
    syncChanges,
    clearCache,
    setTasks, 
    getPriorityLabel 
  }
}