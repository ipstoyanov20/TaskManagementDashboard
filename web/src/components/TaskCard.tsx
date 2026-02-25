import React from 'react'
import type { Task, Status } from '../types'
import { PriorityMap } from '../hooks/useTasks'

interface TaskCardProps
{
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  onMove: (id: number, status: Status) => void
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onMove }) =>
{
  const priorityLabel = PriorityMap[task.priority] || 'Low'
  const priorityClass = `p-${priorityLabel.toLowerCase()}`

  const handleDragStart = (e: React.DragEvent) =>
  {
    if (task.id !== undefined && task.id !== null)
    {
      e.dataTransfer.setData('taskId', task.id.toString())
    }
  }

  return (
    <div
      className="task-card"
      draggable
      onDragStart={handleDragStart}
    >
      <div className={`task-priority ${priorityClass}`}>{priorityLabel}</div>
      <h3 className="task-title">{task.title}</h3>
      {task.description && <p className="task-desc">{task.description}</p>}

      <div className="task-footer">
        <select
          className="status-select"
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value as Status)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <div className="task-actions">
          <button className="icon-btn" onClick={() => onEdit(task)}>
            ✎
          </button>
          <button className="icon-btn icon-delete" onClick={() => onDelete(task.id)}>
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}