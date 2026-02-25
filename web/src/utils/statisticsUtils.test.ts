import { describe, it, expect } from 'vitest'
import { calculateActionDistribution, calculateActivityGrowth } from './statisticsUtils'
import type { ActivityLog } from '../types'

describe('statisticsUtils', () => {
    const mockLogs: ActivityLog[] = [
        { taskID: 1, action: 'create' },
        { taskID: 1, action: 'update' },
        { taskID: 2, action: 'delete' },
        { taskID: 3, action: 'create' },
    ]

    describe('calculateActionDistribution', () => {
        it('should correctly count actions and return them in the correct order', () => {
            const result = calculateActionDistribution(mockLogs)
            
            expect(result).toHaveLength(3)
            
            
            expect(result[0]).toEqual({
                name: 'Create',
                originalName: 'create',
                value: 2
            })
            
            
            expect(result[1]).toEqual({
                name: 'Update',
                originalName: 'update',
                value: 1
            })
            
            
            expect(result[2]).toEqual({
                name: 'Delete',
                originalName: 'delete',
                value: 1
            })
        })

        it('should return empty array when no logs provided', () => {
            const result = calculateActionDistribution([])
            expect(result).toEqual([])
        })

        it('should filter out unknown actions', () => {
            const mixedLogs: ActivityLog[] = [
                ...mockLogs,
                { id: 5, action: 'unknown', description: 'Something else', timestamp: '2025-01-05', target_id: 4, target_type: 'task', user_id: 1 } as any
            ]
            const result = calculateActionDistribution(mixedLogs)
            expect(result).toHaveLength(3) 
            expect(result.find(r => r.originalName === 'unknown')).toBeUndefined()
        })
    })

    describe('calculateActivityGrowth', () => {
        it('should return sequence data matching log indices', () => {
            const result = calculateActivityGrowth(mockLogs)
            
            expect(result).toHaveLength(4)
            expect(result[0]).toEqual({ sequence: 1, activity: 1 })
            expect(result[3]).toEqual({ sequence: 4, activity: 4 })
        })

        it('should return empty array for empty logs', () => {
            const result = calculateActivityGrowth([])
            expect(result).toEqual([])
        })
    })
})
