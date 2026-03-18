import React from 'react'
import useAppStore from '../../store/useAppStore.js'
import './BackgroundSwatches.css'

const SWATCHES = [
  { color: '#000000', label: 'Black' },
  { color: '#c8f23a', label: 'Lime' },
  { color: '#f0f0f0', label: 'White' },
  { color: '#1a2a4a', label: 'Navy' },
  { color: 'transparent', label: 'Clear' },
]

export default function BackgroundSwatches() {
  const { bgColor, transparentBG, setBgColor, setTransparentBG } = useAppStore()

  const handleClick = (color) => {
    if (color === 'transparent') {
      setTransparentBG(true)
      setBgColor('#000000')
    } else {
      setTransparentBG(false)
      setBgColor(color)
    }
  }

  return (
    <div>
      <div className="swatches-row">
        {SWATCHES.map(({ color, label }) => {
          const isActive = color === 'transparent'
            ? transparentBG
            : !transparentBG && bgColor === color

          return (
            <button
              key={color}
              className={`swatch ${isActive ? 'active' : ''}`}
              style={color !== 'transparent' ? { background: color } : {}}
              onClick={() => handleClick(color)}
              title={label}
            >
              {color === 'transparent' && (
                <svg width="100%" height="100%" viewBox="0 0 20 20">
                  <rect width="10" height="10" fill="#999"/>
                  <rect x="10" y="10" width="10" height="10" fill="#999"/>
                  <rect x="10" y="0" width="10" height="10" fill="#555"/>
                  <rect x="0" y="10" width="10" height="10" fill="#555"/>
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
