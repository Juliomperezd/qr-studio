import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useAppStore from '../../store/useAppStore.js'

export default function Lights() {
  const keyLightRef = useRef()
  const {
    keyLight, fillLight, rimLight,
    keyDirection, lightParallax, metallicEdge,
  } = useAppStore()

  const mouseOffset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!lightParallax) {
      mouseOffset.current = { x: 0, y: 0 }
      return
    }
    const handler = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mouseOffset.current = {
        x: ((e.clientX - cx) / cx) * 0.5,
        y: ((e.clientY - cy) / cy) * -0.5,
      }
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [lightParallax])

  useFrame(() => {
    if (!keyLightRef.current) return
    const azimuth = keyDirection.x * Math.PI * 2
    const elevation = keyDirection.y * (Math.PI / 2)
    const x = Math.cos(elevation) * Math.sin(azimuth) * 5 + mouseOffset.current.x
    const y = Math.sin(elevation) * 5 + mouseOffset.current.y
    const z = Math.cos(elevation) * Math.cos(azimuth) * 5
    keyLightRef.current.position.set(x, y, z)
  })

  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight ref={keyLightRef} intensity={keyLight} castShadow />
      <directionalLight intensity={fillLight} position={[-3, 1, 3]} />
      <directionalLight intensity={rimLight} position={[0, -2, -4]} />
      {metallicEdge && (
        <>
          <directionalLight intensity={2.5} position={[0, 0, -6]} color="#fffbe6" />
          <directionalLight intensity={1.8} position={[0, 0, -6]} color="#c8f0ff" />
        </>
      )}
    </>
  )
}
