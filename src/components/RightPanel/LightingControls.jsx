import React from 'react'
import useAppStore from '../../store/useAppStore.js'
import KeyDirectionJoystick from './KeyDirectionJoystick.jsx'

const LIGHT_PROPS = [
  { key: 'keyLight',  label: 'Key Light',  max: 3 },
  { key: 'fillLight', label: 'Fill Light', max: 2 },
  { key: 'rimLight',  label: 'Rim Light',  max: 2 },
]

export default function LightingControls() {
  const store = useAppStore()

  return (
    <div>
      {LIGHT_PROPS.map(({ key, label, max }) => (
        <div key={key} className="slider-row">
          <span className="slider-label">{label}</span>
          <input
            type="range"
            min="0" max={max} step="0.01"
            value={store[key]}
            onChange={(e) => store.setLighting(key, parseFloat(e.target.value))}
          />
          <span className="slider-value">{store[key].toFixed(2)}</span>
        </div>
      ))}
      <KeyDirectionJoystick />
    </div>
  )
}
