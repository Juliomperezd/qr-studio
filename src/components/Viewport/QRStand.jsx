import React from 'react'
import { RoundedBox, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import useAppStore from '../../store/useAppStore.js'
import ShimmerPlane from './ShimmerPlane.jsx'

// Acrylic block dimensions (landscape, like the photo)
const BW = 3.6   // block width
const BH = 2.4   // block height
const BD = 0.55  // block depth/thickness
const CW = 3.1   // inner card width
const CH = 2.0   // inner card height

export default function QRStand({ texture }) {
  const { roughness, clearcoat, iridescence, shimmerSweep } = useAppStore()

  return (
    <group>
      {/* ── Inner printed card ─────────────────────────────────────── */}
      {/* Black card body */}
      <mesh position={[0, 0, 0]} renderOrder={1}>
        <boxGeometry args={[CW, CH, 0.018]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* QR / uploaded image on card front face */}
      {texture && (
        <mesh position={[0, 0, 0.01]} renderOrder={2}>
          <planeGeometry args={[CW * 0.96, CH * 0.96]} />
          <meshBasicMaterial
            map={texture}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Shimmer overlay */}
      {shimmerSweep && <ShimmerPlane z={BD / 2 + 0.004} w={CW * 0.96} h={CH * 0.96} />}

      {/* ── Acrylic block ───────────────────────────────────────────── */}
      <RoundedBox
        args={[BW, BH, BD]}
        radius={0.04}
        smoothness={4}
        renderOrder={10}
      >
        <MeshTransmissionMaterial
          transmission={1}
          thickness={BD}
          roughness={0.04}
          chromaticAberration={0.015}
          anisotropy={0.08}
          distortion={0.04}
          distortionScale={0.25}
          temporalDistortion={0.05}
          ior={1.49}
          clearcoat={clearcoat}
          clearcoatRoughness={0.06}
          iridescence={iridescence * 0.3}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[0, 800]}
          attenuationDistance={4}
          attenuationColor="#e8f4ff"
          color="#f5f8ff"
          envMapIntensity={1.2}
          side={THREE.FrontSide}
        />
      </RoundedBox>

    </group>
  )
}
