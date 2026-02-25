import React, { useState, useEffect } from 'react'
import type { Task, Status } from '../types'

interface TaskModalProps
{
    task?: Task
    onClose: () => void
    onSave: (task: any) => void
}

export const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onSave }) =>
{
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 1,
        status: 'To Do' as Status
    })

    useEffect(() =>
    {
        if (task)
        {
            setFormData({
                title: task.title,
                description: task.description || '',
                priority: task.priority,
                status: task.status
            })
        }
    }, [task])

    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} style={{ animation: 'slideIn 0.3s ease' }}>
                <h2 className="modal-title">{task ? 'Edit Task' : 'New Task'}</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            placeholder="What needs to be done?"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            rows={3}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Add more details..."
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Priority</label>
                            <select
                                value={formData.priority}
                                onChange={e => setFormData({ ...formData, priority: Number(e.target.value) })}
                            >
                                <option value={1}>Low</option>
                                <option value={2}>Medium</option>
                                <option value={3}>High</option>
                            </select>
                        </div>

                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Initial Status</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value as Status })}
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary">{task ? 'Save Changes' : 'Create Task'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
