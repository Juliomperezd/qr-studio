import React from 'react'
import useAppStore from '../../store/useAppStore.js'
import './ExportPanel.css'

const RESOLUTIONS = ['1x', '2x', '3x', '4k']

export default function ExportPanel() {
  const { exportResolution, transparentBG, setExportResolution, setTransparentBG } = useAppStore()

  const handleDownload = () => {
    window.dispatchEvent(new CustomEvent('qr:download'))
  }

  return (
    <div>
      <div className="resolution-row">
        {RESOLUTIONS.map((res) => (
          <button
            key={res}
            className={`res-btn ${exportResolution === res ? 'active' : ''}`}
            onClick={() => setExportResolution(res)}
          >
            {res}
          </button>
        ))}
      </div>

      <div className="toggle-row" style={{ marginTop: 10, marginBottom: 14 }}>
        <span className="toggle-label">Transparent BG</span>
        <label className="toggle">
          <input
            type="checkbox"
            checked={transparentBG}
            onChange={(e) => setTransparentBG(e.target.checked)}
          />
          <span className="toggle-track" />
        </label>
      </div>

      <button className="btn-primary" onClick={handleDownload}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Download PNG
      </button>
    </div>
  )
}
