import React, { useState, useEffect } from 'react'
import { Column } from './Column'
import { useTasks } from '../hooks/useTasks'
import type { Status, PriorityLabels, Task } from '../types'
import { FilterBar } from './FilterBar'
import { TaskModal } from './TaskModal'
import { Link } from 'react-router-dom'
import { LoadingShimmer } from './LoadingShimmer'

const statuses: Status[] = ['To Do', 'In Progress', 'Done']

export const KanbanBoard: React.FC = () =>
{
  const { tasks, loading, fetchTasks, moveTask, addTask, updateTask, deleteTask, syncChanges } = useTasks()
  const [filter, setFilter] = useState<PriorityLabels | undefined>()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() =>
  {
    const delayDebounceFn = setTimeout(() =>
    {
      fetchTasks(filter, searchTerm)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [fetchTasks, filter, searchTerm])

  const handleCreateNew = () =>
  {
    setEditingTask(undefined)
    setIsModalOpen(true)
  }

  const handleEditTask = (task: Task) =>
  {
    setEditingTask(task)
    setIsModalOpen(true)
  }

  const handleSaveTask = async (formData: any) =>
  {
    if (editingTask)
    {
      await updateTask(editingTask.id, formData)
    } else
    {
      await addTask(formData)
    }
    setIsModalOpen(false)
  }

  if (loading && tasks.length === 0) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '100px', color: 'var(--text-secondary)' }}>
      <LoadingShimmer />
    </div>
  )


  return (
    <div className="kanban-wrapper">
      <header className={`header glass-panel ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="header-top">
          <h1 className="app-title">Task Dashboard</h1>
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        <div className={`header-actions ${isMenuOpen ? 'show' : ''}`}>
          <nav className="header-nav">
            <Link to="/statistics" className="nav-link stats-link">Statistics</Link>
          </nav>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <FilterBar filter={filter} setFilter={setFilter} />

          <button
            className="sync-btn"
            onClick={syncChanges}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Board'}
          </button>
        </div>
      </header>

      <div className="board">
        {statuses.map(status => (
          <Column
            key={status}
            status={status}
            tasks={tasks.filter(t => t.status === status)}
            onEdit={handleEditTask}
            onDelete={deleteTask}
            onMove={moveTask}
          />
        ))}
      </div>

      <button className="fab" onClick={handleCreateNew}>
        +
      </button>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  )
}