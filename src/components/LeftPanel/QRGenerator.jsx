import React from 'react'
import useAppStore from '../../store/useAppStore.js'

export default function QRGenerator() {
  const { qrInputText, qrMode, setQRText, setQRMode } = useAppStore()

  return (
    <div>
      <div className="mode-tabs">
        <button
          className={`mode-tab ${qrMode === 'generate' ? 'active' : ''}`}
          onClick={() => setQRMode('generate')}
        >
          Generate
        </button>
        <button
          className={`mode-tab ${qrMode === 'upload' ? 'active' : ''}`}
          onClick={() => setQRMode('upload')}
        >
          Upload
        </button>
      </div>

      {qrMode === 'generate' && (
        <input
          type="text"
          className="qr-input"
          placeholder="https://example.com or any text"
          value={qrInputText}
          onChange={(e) => setQRText(e.target.value)}
        />
      )}
    </div>
  )
}
