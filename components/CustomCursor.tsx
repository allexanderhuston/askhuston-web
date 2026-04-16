'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useCursor } from '@/lib/cursor-context'

export default function CustomCursor() {
  const { state } = useCursor()
  const isHover = state === 'view-project'

  // Detect touch device — initialised synchronously to avoid flash
  const [isTouch] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  )

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const trailX = useSpring(dotX, { stiffness: 80, damping: 20, mass: 0.8 })
  const trailY = useSpring(dotY, { stiffness: 80, damping: 20, mass: 0.8 })

  useEffect(() => {
    if (isTouch) return
    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [dotX, dotY, isTouch])

  // All hooks called above — safe to return null now
  if (isTouch) return null

  return (
    <>
      {/* Blurred trail */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: trailX, y: trailY,
          translateX: '-50%', translateY: '-50%',
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: 'rgba(200, 56, 42, 0.25)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 99997,
        }}
      />

      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#c8382a',
            boxShadow: '0 0 8px rgba(200,56,42,0.6)',
            flexShrink: 0,
          }}
        />
        <AnimatePresence>
          {isHover && (
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              style={{
                fontFamily: 'var(--font-body), system-ui, sans-serif',
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: '0.1em',
                color: '#c8382a',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              view project
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
