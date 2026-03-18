import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    float band = sin((vUv.x - vUv.y) * 4.0 - uTime * 1.5);
    float shimmer = smoothstep(0.92, 1.0, band);
    gl_FragColor = vec4(1.0, 1.0, 1.0, shimmer * 0.22);
  }
`

export default function ShimmerPlane({ z = 0.052, w = 1.9, h = 1.9 }) {
  const meshRef = useRef()
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh ref={meshRef} position={[0, 0, z]} renderOrder={3}>
      <planeGeometry args={[w, h]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
