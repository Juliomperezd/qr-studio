import React from 'react'
import { useDropzone } from 'react-dropzone'
import useAppStore from '../../store/useAppStore.js'

export default function QRUploader() {
  const { qrMode, qrImageDataURL, setQRImage } = useAppStore()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.svg', '.webp'] },
    maxFiles: 1,
    onDrop: (files) => {
      if (!files[0]) return
      const reader = new FileReader()
      reader.onload = (e) => setQRImage(e.target.result)
      reader.readAsDataURL(files[0])
    },
  })

  if (qrMode !== 'upload') return null

  return (
    <div>
      <div {...getRootProps()} className={`upload-zone ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <span className="upload-icon">↑</span>
        <div className="upload-text">
          {isDragActive ? 'Drop image here' : 'Drag & drop or click\nto upload QR image'}
        </div>
      </div>
      {qrImageDataURL && (
        <img
          src={qrImageDataURL}
          alt="QR preview"
          className="upload-preview"
        />
      )}
    </div>
  )
}
