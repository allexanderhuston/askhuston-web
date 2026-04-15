'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function FloatingHead() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springX = useSpring(rotateX, { stiffness: 80, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 80, damping: 22 })

  // Canvas background removal
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const img = new window.Image()
    img.onload = () => {
      const w = img.naturalWidth
      const h = img.naturalHeight
      canvas.width  = w
      canvas.height = h
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, w, h)
      const d = imageData.data

      // Average background color from 4 corners
      const samples = [
        [d[0], d[1], d[2]],
        [d[(w - 1) * 4], d[(w - 1) * 4 + 1], d[(w - 1) * 4 + 2]],
        [d[(h - 1) * w * 4], d[(h - 1) * w * 4 + 1], d[(h - 1) * w * 4 + 2]],
        [d[((h - 1) * w + w - 1) * 4], d[((h - 1) * w + w - 1) * 4 + 1], d[((h - 1) * w + w - 1) * 4 + 2]],
      ]
      const bgR = (samples[0][0] + samples[1][0] + samples[2][0] + samples[3][0]) / 4
      const bgG = (samples[0][1] + samples[1][1] + samples[2][1] + samples[3][1]) / 4
      const bgB = (samples[0][2] + samples[1][2] + samples[2][2] + samples[3][2]) / 4

      // Pass 1: color-key against background color
      for (let i = 0; i < d.length; i += 4) {
        const dist = Math.sqrt(
          (d[i] - bgR) ** 2 + (d[i + 1] - bgG) ** 2 + (d[i + 2] - bgB) ** 2
        )
        if (dist < 42)      d[i + 3] = 0
        else if (dist < 80) d[i + 3] = Math.round(255 * (dist - 42) / 38)
      }

      // Pass 2: remove remaining light + desaturated pixels (gradient remnants)
      for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] === 0) continue
        const r = d[i], g = d[i + 1], b = d[i + 2]
        const lum = r * 0.299 + g * 0.587 + b * 0.114
        const max = Math.max(r, g, b)
        const sat = max === 0 ? 0 : (max - Math.min(r, g, b)) / max
        // If very bright and nearly colorless — it's background
        if (lum > 195 && sat < 0.12) {
          const strength = Math.min(1, ((lum - 195) / 60) + ((0.12 - sat) / 0.12))
          d[i + 3] = Math.round(d[i + 3] * (1 - strength))
        }
      }

      ctx.putImageData(imageData, 0, 0)
      setReady(true)
    }
    img.src = '/head.png'
  }, [])

  // Mouse tracking
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const nx = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2)
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
      rotateY.set(nx * 10)
      rotateX.set(-ny * 6)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [rotateX, rotateY])

  return (
    <div
      style={{
        position: 'absolute',
        left: 'calc(50% - 320px)',
        top: '50%',
        transform: 'translateY(-58%)',
        width: 190,
        zIndex: 20,
        pointerEvents: 'none',
        perspective: 400,
      }}
    >
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0px 12px 24px rgba(0,0,0,0.25))',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: 'auto',
            display: ready ? 'block' : 'none',
            mixBlendMode: 'multiply',
          }}
        />
      </motion.div>
    </div>
  )
}
