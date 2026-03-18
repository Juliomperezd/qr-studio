import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'
import useAppStore from '../../store/useAppStore.js'
import Lights from './Lights.jsx'
import CameraRig from './CameraRig.jsx'
import QRStand from './QRStand.jsx'
import useQRTexture from '../../hooks/useQRTexture.js'
import { ExportTrigger } from './ExportTrigger.jsx'

function SceneInner({ texture, controlsRef, registerExport }) {
  const { bgColor, transparentBG, dropShadow, floatAnimation } = useAppStore()

  return (
    <>
      {!transparentBG && <color attach="background" args={[bgColor]} />}
      {!transparentBG && <fog attach="fog" args={[bgColor, 12, 30]} />}

      <Lights />
      <Environment preset="city" />
      <CameraRig controlsRef={controlsRef} />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        minDistance={2}
        maxDistance={10}
        dampingFactor={0.08}
        enableDamping
      />

      {floatAnimation ? (
        <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.35}>
          <QRStand texture={texture} />
        </Float>
      ) : (
        <QRStand texture={texture} />
      )}

      {dropShadow && (
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.55}
          scale={5}
          blur={2.8}
          far={4}
        />
      )}

      <ExportTrigger registerRef={registerExport} />
    </>
  )
}

export default function Scene({ registerExport }) {
  const controlsRef = useRef()
  const texture = useQRTexture()

  return (
    <Canvas
      camera={{ position: [0, 0.3, 5], fov: 40 }}
      gl={{
        preserveDrawingBuffer: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      shadows
    >
      <SceneInner
        texture={texture}
        controlsRef={controlsRef}
        registerExport={registerExport}
      />
    </Canvas>
  )
}
