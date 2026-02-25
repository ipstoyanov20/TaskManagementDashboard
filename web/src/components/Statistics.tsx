import React, { useEffect, useState, useMemo } from 'react'
import { listActivityLogs } from '../services/taskService'
import type { ActivityLog } from '../types'
import { Link } from 'react-router-dom'
import { LoadingShimmer } from './LoadingShimmer'
import
{
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts'
import { calculateActionDistribution, calculateActivityGrowth } from '../utils/statisticsUtils'

export const Statistics: React.FC = () =>
{
    const [logs, setLogs] = useState<ActivityLog[]>([])
    const [loading, setLoading] = useState(true)
    const [displayCount, setDisplayCount] = useState(0)

    useEffect(() =>
    {
        const fetchLogs = async () =>
        {
            try
            {
                const data = await listActivityLogs()
                setLogs(data)
            } catch (error)
            {
                console.error('Failed to fetch activity logs:', error)
            } finally
            {
                setLoading(false)
            }
        }
        fetchLogs()
    }, [])

    useEffect(() =>
    {
        if (!loading && logs.length > 0)
        {
            let start = 0
            const end = logs.length
            const duration = 1500
            const stepTime = Math.abs(Math.floor(duration / end))

            const timer = setInterval(() =>
            {
                start += 1
                setDisplayCount(start)
                if (start >= end) clearInterval(timer)
            }, stepTime)

            return () => clearInterval(timer)
        }
    }, [loading, logs.length])

    const pieData = useMemo(() => calculateActionDistribution(logs), [logs])
    const stepData = useMemo(() => calculateActivityGrowth(logs), [logs])


    const getColor = (action: string) =>
    {
        switch (action.toLowerCase())
        {
            case 'create': return '#10b981'
            case 'update': return '#3b82f6'
            case 'delete': return '#ef4444'
            default: return '#818cf8'
        }
    }

    const progressPercentage = logs.length > 0 ? (displayCount / logs.length) * 100 : 0

    return (
        <div className="statistics-container">
            <header className="header glass-panel">
                <div className="header-top">
                    <h1 className="app-title">Visual Analytics</h1>
                    <Link to="/" className="back-link">← Back to Board</Link>
                </div>
            </header>

            <div className="stats-grid">
                <div className="chart-card glass-panel">
                    <h3>Action Distribution</h3>
                    <div className="chart-wrapper">
                        {loading ? (
                            <LoadingShimmer />
                        ) : logs.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={85}
                                        paddingAngle={8}
                                        dataKey="value"
                                        animationBegin={0}
                                        animationDuration={1500}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getColor(entry.originalName)} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            background: 'rgba(15, 23, 42, 0.95)',
                                            border: '1px solid rgba(255, 255, 255, 0.15)',
                                            borderRadius: '12px',
                                            color: '#fff',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                                        }}
                                        itemStyle={{ color: '#fff', fontWeight: 600 }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        formatter={(value) => <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <p>No activity recorded yet</p>
                        )}
                    </div>
                </div>

                <div className="chart-card glass-panel">
                    <h3>Activity Growth</h3>
                    <div className="chart-wrapper">
                        {loading ? (
                            <LoadingShimmer />
                        ) : logs.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={stepData}>
                                    <defs>
                                        <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis
                                        dataKey="sequence"
                                        stroke="rgba(255,255,255,0.4)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        label={{ value: 'Timeline', position: 'insideBottom', offset: -5, fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                                    />
                                    <YAxis
                                        stroke="rgba(255,255,255,0.4)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: 'rgba(15, 23, 42, 0.95)',
                                            border: '1px solid rgba(255, 255, 255, 0.15)',
                                            borderRadius: '12px',
                                            color: '#fff',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                                        }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area
                                        type="stepAfter"
                                        dataKey="activity"
                                        stroke="#818cf8"
                                        fillOpacity={1}
                                        fill="url(#colorActivity)"
                                        strokeWidth={3}
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <p>No activity recorded yet</p>
                        )}
                    </div>
                </div>

                <div className="total-records-card glass-panel">
                    <div className="counter-section">
                        <span className="counter-label">Total Activities Tracked</span>
                        {loading ? (
                            <div style={{ margin: '20px auto' }}><LoadingShimmer /></div>
                        ) : (
                            <h2 className="counter-number">{displayCount}</h2>
                        )}
                    </div>
                    {!loading && (
                        <div className="progress-container">
                            <div
                                className="progress-bar"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
