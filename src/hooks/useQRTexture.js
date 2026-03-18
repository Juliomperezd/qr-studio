import { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'
import QRCode from 'qrcode'
import useAppStore from '../store/useAppStore.js'

export default function useQRTexture() {
  const [, forceUpdate] = useState(0)
  const textureRef = useRef(null)
  const canvasRef = useRef(null)
  const { qrMode, qrInputText, qrImageDataURL } = useAppStore()

  // Initialize canvas and texture once
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1024
    canvasRef.current = canvas

    const tex = new THREE.CanvasTexture(canvas)
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.colorSpace = THREE.SRGBColorSpace
    textureRef.current = tex
    forceUpdate(1)

    return () => tex.dispose()
  }, [])

  // Generate QR from text
  useEffect(() => {
    if (qrMode !== 'generate' || !qrInputText || !canvasRef.current) return
    QRCode.toCanvas(canvasRef.current, qrInputText, {
      width: 1024,
      margin: 3,
      color: { dark: '#000000', light: '#ffffff' },
      errorCorrectionLevel: 'H',
    }).then(() => {
      if (textureRef.current) {
        textureRef.current.needsUpdate = true
        forceUpdate((n) => n + 1)
      }
    }).catch(() => {
      if (!canvasRef.current) return
      const ctx = canvasRef.current.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 1024, 1024)
      ctx.fillStyle = '#222222'
      ctx.fillRect(80, 80, 864, 864)
      if (textureRef.current) {
        textureRef.current.needsUpdate = true
        forceUpdate((n) => n + 1)
      }
    })
  }, [qrMode, qrInputText])

  // Load uploaded image
  useEffect(() => {
    if (qrMode !== 'upload' || !qrImageDataURL || !canvasRef.current) return
    const img = new Image()
    img.onload = () => {
      const ctx = canvasRef.current.getContext('2d')
      ctx.clearRect(0, 0, 1024, 1024)
      ctx.drawImage(img, 0, 0, 1024, 1024)
      if (textureRef.current) {
        textureRef.current.needsUpdate = true
        forceUpdate((n) => n + 1)
      }
    }
    img.src = qrImageDataURL
  }, [qrMode, qrImageDataURL])

  return textureRef.current
}
