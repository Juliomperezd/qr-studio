import React from 'react'
import MaterialControls from './MaterialControls.jsx'
import LightingControls from './LightingControls.jsx'
import EffectsToggles from './EffectsToggles.jsx'
import ExportPanel from './ExportPanel.jsx'
import './RightPanel.css'

export default function RightPanel() {
  return (
    <aside className="right-panel">
      <div className="panel-section">
        <div className="section-label">Material</div>
        <MaterialControls />
      </div>

      <div className="panel-section">
        <div className="section-label">Lighting</div>
        <LightingControls />
      </div>

      <div className="panel-section">
        <div className="section-label">Effects</div>
        <EffectsToggles />
      </div>

      <div className="panel-section">
        <div className="section-label">Export</div>
        <ExportPanel />
      </div>
    </aside>
  )
}
