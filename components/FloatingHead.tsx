'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useLoading } from '@/lib/loading-context'

export default function FloatingHead() {
  const { loaded } = useLoading()
  const isReturn = useRef(loaded)

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 60, damping: 18 })
  const springY = useSpring(rotateY, { stiffness: 60, damping: 18 })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const nx = (e.clientX - window.innerWidth  / 2) / (window.innerWidth  / 2)
      const ny = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
      rotateY.set(nx * 14)
      rotateX.set(-ny * 9)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [rotateX, rotateY])

  if (!loaded) return null

  const containerStyle = isMobile
    ? {
        position: 'absolute' as const,
        left: '50%',
        top: 'calc(50% + 100px)',
        transform: 'translateX(-50%)',
        width: 200,
        zIndex: 30,
        pointerEvents: 'none' as const,
      }
    : {
        position: 'absolute' as const,
        left: 'calc(50% - 320px)',
        top: '50%',
        transform: 'translateY(-58%)',
        width: 190,
        zIndex: 20,
        pointerEvents: 'none' as const,
      }

  const returnInitial = isMobile
    ? { y: 180, opacity: 0 }
    : { x: -280, opacity: 0, rotate: -8 }

  const returnAnimate = isMobile
    ? { y: 0, opacity: 1 }
    : { x: 0, opacity: 1, rotate: 0 }

  return (
    <div style={containerStyle}>
      {/* Layout animation wrapper — handles entry + shared layout transition */}
      <motion.div
        layoutId={isReturn.current ? undefined : 'floating-head'}
        initial={isReturn.current ? returnInitial : undefined}
        animate={isReturn.current ? returnAnimate : undefined}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.05 }}
        style={{ filter: 'drop-shadow(0px 12px 28px rgba(0,0,0,0.3))' }}
      >
        {/* Perspective must be the DIRECT parent of the rotating element */}
        <div style={{ perspective: 600 }}>
          <motion.div style={{ rotateX: springX, rotateY: springY }}>
            <Image
              src="/head.png"
              alt="Alex Boyanov"
              width={400}
              height={500}
              priority
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
