import { useEffect } from 'react'
import useExport from '../../hooks/useExport.js'

// This inner component lives inside Canvas so it can call useThree
let globalDownload = null

export function ExportTrigger({ registerRef }) {
  const { downloadPNG } = useExport()
  useEffect(() => {
    if (registerRef) registerRef(downloadPNG)
  }, [downloadPNG, registerRef])
  return null
}
