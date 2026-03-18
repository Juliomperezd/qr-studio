import React from 'react'
import LeftPanel from './components/LeftPanel/LeftPanel.jsx'
import Viewport from './components/Viewport/Viewport.jsx'
import RightPanel from './components/RightPanel/RightPanel.jsx'
import './App.css'

export default function App() {
  return (
    <div className="app-shell">
      <LeftPanel />
      <Viewport />
      <RightPanel />
    </div>
  )
}
