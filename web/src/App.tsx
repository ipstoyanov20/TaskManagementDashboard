import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { KanbanBoard } from './components/KanbanBoard'
import { Statistics } from './components/Statistics'
import { KineticBackground } from './components/KineticBackground'
import './App.css'

function App()
{
  return (
    <Router>
      <div className="app-container">
        <KineticBackground />
        <Routes>
          <Route path="/" element={<KanbanBoard />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App