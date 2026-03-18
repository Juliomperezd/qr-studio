import React, { useRef, useCallback } from 'react'
import useAppStore from '../../store/useAppStore.js'
import './KeyDirectionJoystick.css'

export default function KeyDirectionJoystick() {
  const { keyDirection, setKeyDirection } = useAppStore()
  const trackRef = useRef(null)
  const dragging = useRef(false)

  const getPosition = useCallback((e) => {
    const rect = trackRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height))
    return { x, y }
  }, [])

  const onPointerDown = (e) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    setKeyDirection(getPosition(e))
  }

  const onPointerMove = (e) => {
    if (!dragging.current) return
    setKeyDirection(getPosition(e))
  }

  const onPointerUp = () => { dragging.current = false }

  return (
    <div className="joystick-section">
      <div className="slider-label" style={{ marginBottom: 8 }}>Key Direction</div>
      <div
        ref={trackRef}
        className="joystick-track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div
          className="joystick-dot"
          style={{
            left: `${keyDirection.x * 100}%`,
            top: `${(1 - keyDirection.y) * 100}%`,
          }}
        />
        {/* Cross guides */}
        <div className="joystick-guide-h" />
        <div className="joystick-guide-v" />
      </div>
    </div>
  )
}
