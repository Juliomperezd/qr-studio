import React from 'react'
import useAppStore from '../../store/useAppStore.js'

const EFFECTS = [
  { key: 'dropShadow',    label: 'Drop Shadow' },
  { key: 'floatAnimation', label: 'Float Animation' },
  { key: 'shimmerSweep',  label: 'Shimmer Sweep' },
  { key: 'lightParallax', label: 'Light Parallax' },
  { key: 'metallicEdge',  label: 'Metallic Edge' },
]

export default function EffectsToggles() {
  const store = useAppStore()

  return (
    <div>
      {EFFECTS.map(({ key, label }) => (
        <div key={key} className="toggle-row">
          <span className="toggle-label">{label}</span>
          <label className="toggle">
            <input
              type="checkbox"
              checked={store[key]}
              onChange={(e) => store.setEffect(key, e.target.checked)}
            />
            <span className="toggle-track" />
          </label>
        </div>
      ))}
    </div>
  )
}
