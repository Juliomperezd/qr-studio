import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useAppStore from '../../store/useAppStore.js'

const PRESETS = {
  hero:     { position: new THREE.Vector3(0, 0.3, 5),    target: new THREE.Vector3(0, 0, 0),     fov: 40 },
  float:    { position: new THREE.Vector3(0.8, 1.2, 4),  target: new THREE.Vector3(0, 0.1, 0),   fov: 38 },
  portrait: { position: new THREE.Vector3(0, 0, 4.5),    target: new THREE.Vector3(0, 0, 0),     fov: 35 },
  drama:    { position: new THREE.Vector3(-2, -0.5, 3),  target: new THREE.Vector3(0.2, 0, 0),   fov: 45 },
  overhead: { position: new THREE.Vector3(0, 5, 1),      target: new THREE.Vector3(0, 0, 0),     fov: 50 },
  stack:    { position: new THREE.Vector3(1.5, 1.5, 3),  target: new THREE.Vector3(-0.2, 0, 0),  fov: 42 },
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
