import React, { useRef } from 'react'
import Scene from './Scene.jsx'
import './Viewport.css'

export default function Viewport() {
  const exportFnRef = useRef(null)

  const registerExport = (fn) => {
    exportFnRef.current = fn
  }

  // Expose download trigger globally via custom event
  React.useEffect(() => {
    const handler = () => {
      exportFnRef.current?.()
    }
    window.addEventListener('qr:download', handler)
    return () => window.removeEventListener('qr:download', handler)
  }, [])

  return (
    <div className="viewport">
      <div className="viewport-canvas">
        <Scene registerExport={registerExport} />
      </div>
      <div className="viewport-hint">
        Drag to orbit &nbsp;·&nbsp; Scroll to zoom &nbsp;·&nbsp; Double-click to reset
      </div>
    </div>
  )
}
