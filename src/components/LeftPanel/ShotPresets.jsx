import React from 'react'
import useAppStore from '../../store/useAppStore.js'
import './ShotPresets.css'

const PRESETS = [
  { id: 'hero',     label: 'Hero',     icon: HeroIcon },
  { id: 'float',    label: 'Float',    icon: FloatIcon },
  { id: 'portrait', label: 'Portrait', icon: PortraitIcon },
  { id: 'drama',    label: 'Drama',    icon: DramaIcon },
  { id: 'overhead', label: 'Overhead', icon: OverheadIcon },
  { id: 'stack',    label: 'Stack',    icon: StackIcon },
]

function HeroIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="5" y="4" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="10" y1="14" x2="10" y2="17" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  )
}

function FloatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="5" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" transform="rotate(-8 9 10)"/>
    </svg>
  )
}

function PortraitIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="6" y="3" width="8" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  )
}

function DramaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="5" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" transform="rotate(-20 8 10)"/>
      <circle cx="15" cy="5" r="2" fill="currentColor" opacity="0.5"/>
    </svg>
  )
}

function OverheadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="5" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="10" cy="4" r="1.5" fill="currentColor" opacity="0.6"/>
    </svg>
  )
}

function StackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="7" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="8" y="4" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
    </svg>
  )
}

export default function ShotPresets() {
  const { activePreset, setPreset } = useAppStore()

  return (
    <div className="presets-grid">
      {PRESETS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`preset-btn ${activePreset === id ? 'active' : ''}`}
          onClick={() => setPreset(id)}
        >
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}
