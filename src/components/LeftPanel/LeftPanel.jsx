import React from 'react'
import QRUploader from './QRUploader.jsx'
import QRGenerator from './QRGenerator.jsx'
import ShotPresets from './ShotPresets.jsx'
import BackgroundSwatches from './BackgroundSwatches.jsx'
import './LeftPanel.css'

export default function LeftPanel() {
  return (
    <aside className="left-panel">
      <div className="panel-header">
        <span className="panel-logo">QR</span>
        <span className="panel-title">Studio</span>
      </div>

      <div className="panel-section">
        <div className="section-label">QR Image</div>
        <QRGenerator />
        <QRUploader />
      </div>

      <div className="panel-section">
        <div className="section-label">Shot Presets</div>
        <ShotPresets />
      </div>

      <div className="panel-section">
        <div className="section-label">Background</div>
        <BackgroundSwatches />
      </div>
    </aside>
  )
}
