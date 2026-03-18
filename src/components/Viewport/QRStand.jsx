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

// Corner bolt positions
const BOLT_CORNERS = [
  [-BW / 2 + 0.18,  BH / 2 - 0.18],
  [ BW / 2 - 0.18,  BH / 2 - 0.18],
  [-BW / 2 + 0.18, -BH / 2 + 0.18],
  [ BW / 2 - 0.18, -BH / 2 + 0.18],
]

function CornerBolt({ x, y, z }) {
  return (
    <group position={[x, y, z]}>
      {/* Bolt head */}
      <mesh>
        <cylinderGeometry args={[0.055, 0.055, 0.04, 16]} />
        <meshPhysicalMaterial
          color="#c4956a"
          metalness={0.85}
          roughness={0.15}
          clearcoat={0.9}
        />
      </mesh>
      {/* Bolt slot cross */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.001]}>
        <boxGeometry args={[0.06, 0.008, 0.003]} />
        <meshStandardMaterial color="#a07050" />
      </mesh>
      <mesh rotation={[Math.PI / 2, Math.PI / 2, 0]} position={[0, 0, 0.001]}>
        <boxGeometry args={[0.06, 0.008, 0.003]} />
        <meshStandardMaterial color="#a07050" />
      </mesh>
    </group>
  )
}

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

      {/* ── Corner bolts on both faces ──────────────────────────────── */}
      {BOLT_CORNERS.map(([x, y], i) => (
        <React.Fragment key={i}>
          {/* Front face bolt */}
          <CornerBolt x={x} y={y} z={BD / 2 + 0.018} />
          {/* Back face bolt */}
          <CornerBolt x={x} y={y} z={-BD / 2 - 0.018} />
        </React.Fragment>
      ))}
    </group>
  )
}
