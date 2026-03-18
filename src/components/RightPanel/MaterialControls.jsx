import React from 'react'
import useAppStore from '../../store/useAppStore.js'

const MATERIAL_PROPS = [
  { key: 'metalness',   label: 'Metalness' },
  { key: 'roughness',   label: 'Roughness' },
  { key: 'clearcoat',   label: 'Clearcoat' },
  { key: 'iridescence', label: 'Iridescence' },
]

export default function MaterialControls() {
  const store = useAppStore()

  return (
    <div>
      {MATERIAL_PROPS.map(({ key, label }) => (
        <div key={key} className="slider-row">
          <span className="slider-label">{label}</span>
          <input
            type="range"
            min="0" max="1" step="0.01"
            value={store[key]}
            onChange={(e) => store.setMaterial(key, parseFloat(e.target.value))}
          />
          <span className="slider-value">{store[key].toFixed(2)}</span>
        </div>
      ))}
    </div>
  )
}
