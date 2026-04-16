'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useLoading } from '@/lib/loading-context'

const BAR_COUNT = 24

export default function LoadingScreen() {
  const { setLoaded } = useLoading()
  const [exiting, setExiting] = useState(false)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const animDelay = 200   // ms before counter starts
    const animDuration = 1450 // ms to go 0 → 100
    let raf: number

    function tick() {
      const elapsed = Date.now() - startTime - animDelay
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return }
      const t = Math.min(elapsed / animDuration, 1)
      // Cubic ease-in-out
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      setPct(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setPct(100)
    }
    raf = requestAnimationFrame(tick)

    const exitTimer = setTimeout(() => {
      setExiting(true)
      setTimeout(() => setLoaded(), 80)
    }, 2000)

    return () => {
      clearTimeout(exitTimer)
      cancelAnimationFrame(raf)
    }
  }, [])

  const filledBars = Math.round((pct / 100) * BAR_COUNT)

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

          {/* Percentage + bars */}
          <div className="mt-10 flex flex-col items-center gap-4">
            {/* Percentage counter */}
            <p style={{
              fontFamily: 'var(--font-body), monospace',
              fontSize: 11,
              letterSpacing: '0.14em',
              color: '#c8382a',
              lineHeight: 1,
              minWidth: '3ch',
              textAlign: 'right',
            }}>
              {pct}%
            </p>

            {/* Bars */}
            <div style={{ display: 'flex', gap: 4, alignItems: 'stretch' }}>
              {Array.from({ length: BAR_COUNT }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 3,
                    height: 20,
                    borderRadius: 4,
                    background: i < filledBars ? '#c8382a' : 'rgba(200,56,42,0.13)',
                    transition: 'background 0.06s linear',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
