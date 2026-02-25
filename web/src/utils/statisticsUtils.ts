import type { ActivityLog } from '../types'

export interface PieDataEntry {
    name: string
    originalName: string
    value: number
}

export interface StepDataEntry {
    sequence: number
    activity: number
}


export const calculateActionDistribution = (logs: ActivityLog[]): PieDataEntry[] => {
    const counts = logs.reduce((acc, log) => {
        acc[log.action] = (acc[log.action] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const order = ['create', 'update', 'delete']
    return order
        .filter(action => counts[action] !== undefined)
        .map(action => ({
            name: action.charAt(0).toUpperCase() + action.slice(1),
            originalName: action,
            value: counts[action]
        }))
}


export const calculateActivityGrowth = (logs: ActivityLog[]): StepDataEntry[] => {
    return logs.map((_, index) => ({
        sequence: index + 1,
        activity: index + 1
    }))
}
