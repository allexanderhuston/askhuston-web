'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useLoading } from '@/lib/loading-context'

export default function FloatingHead() {
  const { loaded } = useLoading()
  // If loaded is already true when this component mounts → return navigation, not first load
  const isReturn = useRef(loaded)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 80, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 80, damping: 22 })

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

  if (!loaded) return null

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
        // On return navigation: fly in from left. On first load: layoutId handles it.
        layoutId={isReturn.current ? undefined : 'floating-head'}
        initial={isReturn.current ? { x: -280, opacity: 0, rotate: -8 } : undefined}
        animate={isReturn.current ? { x: 0, opacity: 1, rotate: 0 } : undefined}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.05 }}
        style={{ filter: 'drop-shadow(0px 12px 28px rgba(0,0,0,0.3))' }}
      >
        <motion.div style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}>
          <Image
            src="/head.png"
            alt="Alex Boyanov"
            width={400}
            height={500}
            priority
            style={{ width: '100%', height: 'auto' }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
