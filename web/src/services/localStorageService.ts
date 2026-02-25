import type { Status } from '../types'

const OVERRIDES_KEY = 'kanban_status_overrides'

type StatusOverrides = Record<number, Status>

export const getStatusOverrides = (): StatusOverrides => {
  const stored = localStorage.getItem(OVERRIDES_KEY)
  try {
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export const setStatusOverride = (taskId: number, status: Status): void => {
  const overrides = getStatusOverrides()
  overrides[taskId] = status
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides))
}

export const removeStatusOverride = (taskId: number): void => {
  const overrides = getStatusOverrides()
  delete overrides[taskId]
  localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides))
}

export const clearAllOverrides = (): void => {
  localStorage.removeItem(OVERRIDES_KEY)
}
