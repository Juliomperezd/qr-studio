import React, { useRef } from 'react'
import { RoundedBox } from '@react-three/drei'
import useAppStore from '../../store/useAppStore.js'
import ShimmerPlane from './ShimmerPlane.jsx'

export default function QRStand({ texture }) {
  const { metalness, roughness, clearcoat, iridescence, shimmerSweep } = useAppStore()

  return (
    <group>
      {/* Main panel body */}
      <RoundedBox args={[2.2, 2.2, 0.1]} radius={0.06} smoothness={4} castShadow>
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={metalness}
          roughness={roughness}
          clearcoat={clearcoat}
          clearcoatRoughness={0.08}
          iridescence={iridescence}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          envMapIntensity={1.5}
        />
      </RoundedBox>

      {/* QR texture decal plane — sits just in front of panel face */}
      {texture && (
        <mesh position={[0, 0, 0.051]}>
          <planeGeometry args={[1.9, 1.9]} />
          <meshBasicMaterial
            map={texture}
            transparent={false}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Shimmer sweep overlay */}
      {shimmerSweep && <ShimmerPlane />}

      {/* Subtle stand base */}
      <group position={[0, -1.25, 0]}>
        {/* Neck */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.1, 0.4, 0.06]} />
          <meshPhysicalMaterial
            color="#1a1a1a"
            metalness={metalness}
            roughness={roughness}
            clearcoat={clearcoat * 0.5}
          />
        </mesh>
        {/* Foot */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.7, 0.05, 0.35]} />
          <meshPhysicalMaterial
            color="#1a1a1a"
            metalness={metalness}
            roughness={roughness}
            clearcoat={clearcoat * 0.5}
          />
        </mesh>
      </group>
    </group>
  )
}
