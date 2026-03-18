import { create } from 'zustand'

const useAppStore = create((set) => ({
  // QR Source
  qrImageDataURL: null,
  qrInputText: 'https://example.com',
  qrMode: 'generate', // 'upload' | 'generate'

  // Camera
  activePreset: 'hero',

  // Background
  bgColor: '#000000',
  transparentBG: false,

  // Material
  metalness: 0.5,
  roughness: 0.2,
  clearcoat: 0.8,
  iridescence: 0.35,

  // Lighting
  keyLight: 1.5,
  fillLight: 0.4,
  rimLight: 0.55,
  keyDirection: { x: 0.6, y: 0.65 },

  // Effects
  dropShadow: true,
  floatAnimation: false,
  shimmerSweep: false,
  lightParallax: false,
  metallicEdge: false,

  // Export
  exportResolution: '2x',

  // Actions
  setQRImage: (url) => set({ qrImageDataURL: url, qrMode: 'upload' }),
  setQRText: (text) => set({ qrInputText: text }),
  setQRMode: (mode) => set({ qrMode: mode }),
  setPreset: (preset) => set({ activePreset: preset }),
  setBgColor: (color) => set({ bgColor: color }),
  setTransparentBG: (val) => set({ transparentBG: val }),
  setMaterial: (key, val) => set({ [key]: val }),
  setLighting: (key, val) => set({ [key]: val }),
  setKeyDirection: (dir) => set({ keyDirection: dir }),
  setEffect: (key, val) => set({ [key]: val }),
  setExportResolution: (res) => set({ exportResolution: res }),
}))

export default useAppStore
