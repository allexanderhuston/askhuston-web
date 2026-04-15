'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

function playNotificationSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioCtx()
    const notes = [
      { freq: 988.0,  start: 0.0,  dur: 0.12 },
      { freq: 1174.7, start: 0.13, dur: 0.12 },
      { freq: 1318.5, start: 0.26, dur: 0.22 },
    ]
    notes.forEach(({ freq, start, dur }) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.value = freq
      const t = ctx.currentTime + start
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.28, t + 0.015)
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur)
      osc.start(t)
      osc.stop(t + dur + 0.01)
    })
  } catch { /* silent fail */ }
}

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.28)',
  backdropFilter: 'blur(48px) saturate(200%)',
  WebkitBackdropFilter: 'blur(48px) saturate(200%)',
  border: '1px solid rgba(255,255,255,0.6)',
  boxShadow: '0 12px 48px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
  borderRadius: 22,
  padding: '12px 14px',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
}

export default function IPhoneNotification() {
  const [visible, setVisible] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const now = new Date()
    setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }))
    const t = setTimeout(() => {
      setVisible(true)
      playNotificationSound()
    }, 2500)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -120, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -120, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            position: 'fixed',
            top: 18,
            left: `calc(50% - 170px)`,
            width: 340,
            maxWidth: 'calc(100vw - 32px)',
            zIndex: 9999,
          }}
        >
          {/* Stack card 3 — furthest back */}
          <div style={{ ...card, position: 'absolute', top: 10, left: 16, right: 16, height: 74, opacity: 0.4, transform: 'scaleX(0.88)', transformOrigin: 'bottom center', zIndex: 1, pointerEvents: 'none' }} />

          {/* Stack card 2 — middle */}
          <div style={{ ...card, position: 'absolute', top: 5, left: 8, right: 8, height: 74, opacity: 0.62, transform: 'scaleX(0.94)', transformOrigin: 'bottom center', zIndex: 2, pointerEvents: 'none' }} />

          {/* Main card */}
          <div style={{ ...card, position: 'relative', zIndex: 3 }}>
            <div style={{ width: 50, height: 50, borderRadius: 13, overflow: 'hidden', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
              <Image
                src="/alex.png"
                alt="Alex"
                width={50}
                height={50}
                style={{ objectFit: 'cover', objectPosition: '50% 8%', width: '100%', height: '100%' }}
              />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: 'var(--font-syne), system-ui, sans-serif', fontSize: 14, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.3, margin: 0 }}>
                Alexander Huston
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                <span style={{ position: 'relative', width: 7, height: 7, flexShrink: 0, display: 'inline-block' }}>
                  <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e', opacity: 0.7, animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }} />
                  <span style={{ position: 'absolute', inset: 1, borderRadius: '50%', background: '#22c55e' }} />
                </span>
                <p style={{ fontFamily: 'var(--font-dm-mono), monospace', fontSize: 11, color: '#555', margin: 0, lineHeight: 1.3 }}>
                  let&apos;s build something cool
                </p>
              </div>
            </div>

            <span style={{ fontFamily: 'var(--font-dm-mono), monospace', fontSize: 11, color: '#999', flexShrink: 0, alignSelf: 'flex-start', marginTop: 2 }}>
              {time}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
