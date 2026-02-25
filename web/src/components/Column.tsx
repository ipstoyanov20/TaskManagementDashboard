import React from 'react'
import type { Task, Status } from '../types'
import { TaskCard } from './TaskCard'

interface ColumnProps
{
  status: Status
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  onMove: (id: number, status: Status) => void
}

export const Column: React.FC<ColumnProps> = ({ status, tasks, onEdit, onDelete, onMove }) =>
{
  const dotClass = `status-dot dot-${status.toLowerCase().replace(' ', '')}`

  const handleDragOver = (e: React.DragEvent) =>
  {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) =>
  {
    e.preventDefault()
    const taskId = Number(e.dataTransfer.getData('taskId'))
    if (taskId)
    {
      onMove(taskId, status)
    }
  }

  return (
    <div
      className="column glass-panel"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <h2 className="column-title">
          <span className={dotClass}></span>
          {status}
        </h2>
        <span className="task-count">{tasks.length}</span>
      </div>

      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </div>
  )
}