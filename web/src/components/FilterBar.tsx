import React from 'react'
import type { PriorityLabels } from '../types'

interface FilterBarProps
{
    filter?: PriorityLabels
    setFilter: (priority?: PriorityLabels) => void
}

export const FilterBar: React.FC<FilterBarProps> = ({ filter, setFilter }) =>
{
    const priorities: PriorityLabels[] = ['Low', 'Medium', 'High']

    return (
        <div className="filter-bar">
            <span className="filter-label">Filter by Priority:</span>
            <select
                value={filter || ''}
                onChange={(e) => setFilter((e.target.value as PriorityLabels) || undefined)}
                className="filter-select"
            >
                <option value="">All Priorities</option>
                {priorities.map(p => (
                    <option key={p} value={p}>{p}</option>
                ))}
            </select>
        </div>
    )
}