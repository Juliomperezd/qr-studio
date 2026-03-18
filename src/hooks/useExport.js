import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import useAppStore from '../store/useAppStore.js'

export default function useExport() {
  const { gl, scene, camera } = useThree()
  const { exportResolution, transparentBG, bgColor } = useAppStore()

  const downloadPNG = () => {
    const canvasWidth = gl.domElement.width / gl.getPixelRatio()
    const ratioMap = {
      '1x': 1,
      '2x': 2,
      '3x': 3,
      '4k': Math.max(1, Math.round(4096 / canvasWidth)),
    }
    const ratio = ratioMap[exportResolution] || 2

    const originalRatio = gl.getPixelRatio()
    const originalBg = scene.background

    gl.setPixelRatio(ratio)

    if (transparentBG) {
      scene.background = null
      gl.setClearColor(0x000000, 0)
    } else {
      scene.background = new THREE.Color(bgColor)
    }

    gl.render(scene, camera)
    const dataURL = gl.domElement.toDataURL('image/png')

    // Restore
    gl.setPixelRatio(originalRatio)
    scene.background = originalBg

    const a = document.createElement('a')
    a.href = dataURL
    a.download = 'qr-mockup.png'
    a.click()
  }

  return { downloadPNG }
}
