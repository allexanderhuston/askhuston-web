'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useLoading } from '@/lib/loading-context'

export default function LoadingScreen() {
  const { setLoaded } = useLoading()
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true)
      // Small delay so FloatingHead mounts just as the overlay starts fading
      setTimeout(() => setLoaded(), 80)
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
          style={{ background: '#0d0d0d' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Face — layoutId hands off to FloatingHead on exit */}
          <motion.div
            layoutId="floating-head"
            style={{ width: 260, filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.6))' }}
          >
            <Image
              src="/head.png"
              alt="Alex Boyanov"
              width={400}
              height={500}
              priority
              style={{ width: '100%', height: 'auto' }}
            />
          </motion.div>

          {/* Red progress line */}
          <div
            className="mt-8 rounded-full overflow-hidden"
            style={{ width: 200, height: 1, background: 'rgba(255,255,255,0.08)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: '#c8382a', originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
