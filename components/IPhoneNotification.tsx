'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useLoading } from '@/lib/loading-context'

// ── Audio unlock + sound ──────────────────────────────────────────
type AC = typeof AudioContext
let actx: AudioContext | null = null
let soundPending = false

function getCtx(): AudioContext | null {
  try {
    const AudioCtx: AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: AC }).webkitAudioContext
    if (!actx) actx = new AudioCtx()
    return actx
  } catch { return null }
}

function playBell(ctx: AudioContext) {
  // Apple-style tri-tone: C6 → E6 → G6 with bell harmonics
  const notes = [
    { freq: 1046.5, start: 0.0  },
    { freq: 1318.5, start: 0.13 },
    { freq: 1567.0, start: 0.26 },
  ]
  notes.forEach(({ freq, start }) => {
    const t = ctx.currentTime + start
    // Fundamental
    const tone = (f: number, vol: number, dur: number) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.connect(g); g.connect(ctx.destination)
      o.type = 'sine'; o.frequency.value = f
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(vol, t + 0.008)
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      o.start(t); o.stop(t + dur + 0.01)
    }
    tone(freq,        0.32, 0.35)   // fundamental
    tone(freq * 2,    0.10, 0.20)   // octave
    tone(freq * 2.756, 0.06, 0.15)  // bell partial
  })
}

function playNotificationSound() {
  const ctx = getCtx()
  if (!ctx) return
  ctx.resume().then(() => playBell(ctx))
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

// Persists across SPA navigation, resets on full page refresh
let shownThisLoad = false

export default function IPhoneNotification() {
  const { loaded } = useLoading()
  const [visible, setVisible] = useState(false)
  const [instant, setInstant] = useState(false)
  const [time, setTime] = useState('')

  // Set time once on mount
  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }))
  }, [])

  // Trigger notification when loading completes
  useEffect(() => {
    // Return visit (SPA nav back to home) — show instantly, no sound
    if (shownThisLoad) {
      setInstant(true)
      setVisible(true)
      return
    }

    // Wait for loading screen to finish
    if (!loaded) return

    // Loading done — show after short pause
    const showTimer = setTimeout(() => {
      setVisible(true)
      shownThisLoad = true
    }, 400)

    // Sound plays on first gesture (browser autoplay policy)
    let soundFired = false
    const EVENTS = ['mousemove', 'mousedown', 'pointerdown', 'keydown', 'touchstart', 'click']

    const onFirstGesture = () => {
      if (soundFired) return
      soundFired = true
      EVENTS.forEach(ev => document.removeEventListener(ev, onFirstGesture))
      playNotificationSound()
    }

    EVENTS.forEach(ev => document.addEventListener(ev, onFirstGesture))

    return () => {
      clearTimeout(showTimer)
      EVENTS.forEach(ev => document.removeEventListener(ev, onFirstGesture))
    }
  }, [loaded])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={instant ? false : { y: -120, opacity: 0, scale: 0.9 }}
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
              <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 14, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.3, margin: 0 }}>
                Alexander Huston
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
                <p style={{ fontFamily: 'var(--font-body), system-ui, sans-serif', fontSize: 11, color: '#555', margin: 0, lineHeight: 1.3, whiteSpace: 'nowrap' }}>
                  let&apos;s build something cool
                </p>
                <span style={{ fontSize: 16, lineHeight: 1 }}>👀</span>
              </div>
            </div>

            <span style={{ fontFamily: 'var(--font-body), system-ui, sans-serif', fontSize: 11, color: '#999', flexShrink: 0, alignSelf: 'flex-start', marginTop: 2 }}>
              {time}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
