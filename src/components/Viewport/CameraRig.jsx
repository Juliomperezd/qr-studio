import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useAppStore from '../../store/useAppStore.js'

const PRESETS = {
  hero:     { position: new THREE.Vector3(0, 0.5, 5.5),   target: new THREE.Vector3(0, 0, 0),     fov: 42 },
  float:    { position: new THREE.Vector3(1.2, 1.5, 5),   target: new THREE.Vector3(0, 0.1, 0),   fov: 40 },
  portrait: { position: new THREE.Vector3(0, 0, 5.5),     target: new THREE.Vector3(0, 0, 0),     fov: 38 },
  drama:    { position: new THREE.Vector3(-2.5, -0.8, 4), target: new THREE.Vector3(0.3, 0, 0),   fov: 48 },
  overhead: { position: new THREE.Vector3(0, 5.5, 1.5),   target: new THREE.Vector3(0, 0, 0),     fov: 52 },
  stack:    { position: new THREE.Vector3(2, 2, 4),       target: new THREE.Vector3(-0.3, 0, 0),  fov: 44 },
}

export default function CameraRig({ controlsRef }) {
  const { camera } = useThree()
  const { activePreset } = useAppStore()
  const targetPos = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())
  const targetFov = useRef(40)

  useEffect(() => {
    const preset = PRESETS[activePreset]
    if (!preset) return
    targetPos.current.copy(preset.position)
    targetLookAt.current.copy(preset.target)
    targetFov.current = preset.fov
  }, [activePreset])

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.06)
    camera.fov += (targetFov.current - camera.fov) * 0.06
    camera.updateProjectionMatrix()
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, 0.06)
      controlsRef.current.update()
    }
  })

  return null
}

export { PRESETS }
