'use client'

import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Influencer } from '@/lib/influencers'

const CARD_W = 120
const CARD_H = 158

const POSITIONS = [
  { fx: 0.10, fy: 0.08 },
  { fx: 0.70, fy: 0.22 },
  { fx: 0.20, fy: 0.65 },
]

function computePath(cx: number, cy: number, ex: number, ey: number, index: number): string {
  const dx = ex - cx
  const dy = ey - cy
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const ux = dx / len
  const uy = dy / len
  const px = -uy
  const py = ux
  const sag = len * 0.36

  const style = index % 3

  if (style === 0) {
    // Lazy S-curve — sweeps one side then the other
    const c1x = cx + dx * 0.28 + px * sag * 1.0
    const c1y = cy + dy * 0.28 + py * sag * 1.0 + 40
    const c2x = cx + dx * 0.72 - px * sag * 0.8
    const c2y = cy + dy * 0.72 - py * sag * 0.8 + 55
    return `M ${cx} ${cy} C ${c1x} ${c1y} ${c2x} ${c2y} ${ex} ${ey}`
  }

  if (style === 1) {
    // Heavy gravity droop — sags down like a clothesline
    const c1x = cx + dx * 0.2
    const c1y = cy + dy * 0.1 + sag * 1.5
    const c2x = cx + dx * 0.8
    const c2y = cy + dy * 0.9 + sag * 1.5
    return `M ${cx} ${cy} C ${c1x} ${c1y} ${c2x} ${c2y} ${ex} ${ey}`
  }

  // style 2: gentle off-axis arc — leans perpendicular with loose slack
  const c1x = cx + dx * 0.2 - px * sag * 0.7
  const c1y = cy + dy * 0.2 - py * sag * 0.7 + 30
  const c2x = cx + dx * 0.75 - px * sag * 1.1
  const c2y = cy + dy * 0.75 - py * sag * 1.1 + 50
  return `M ${cx} ${cy} C ${c1x} ${c1y} ${c2x} ${c2y} ${ex} ${ey}`
}

// Spring constants — tuned for a real-thread feel
const STIFFNESS = 0.08
const DAMPING   = 0.66

function InfluencerNode({
  influencer,
  index,
  initialX,
  initialY,
  centerX,
  centerY,
}: {
  influencer: Influencer
  index: number
  initialX: number
  initialY: number
  centerX: number
  centerY: number
}) {
  const router     = useRouter()
  const cardRef    = useRef<HTMLDivElement>(null)

  // Card position (moves instantly with pointer)
  const offsetX = useRef(0)
  const offsetY = useRef(0)

  // Cord position (lags behind with spring)
  const visualX = useRef(0)
  const visualY = useRef(0)
  const velX    = useRef(0)
  const velY    = useRef(0)
  const rafRef  = useRef<number | null>(null)

  const dragging  = useRef(false)
  const dragStart = useRef({ mouseX: 0, mouseY: 0, offX: 0, offY: 0 })
  const totalMove = useRef(0)

  const updateCordAt = (vx: number, vy: number) => {
    const cardCX = initialX + vx + CARD_W / 2
    const cardCY = initialY + vy + CARD_H / 2
    const d = computePath(centerX, centerY, cardCX, cardCY, index)
    const el = document.getElementById(`cord-${influencer.id}`) as SVGPathElement | null
    if (el) el.setAttribute('d', d)
  }

  const runSpring = () => {
    const fx = (offsetX.current - visualX.current) * STIFFNESS
    const fy = (offsetY.current - visualY.current) * STIFFNESS

    velX.current = velX.current * DAMPING + fx
    velY.current = velY.current * DAMPING + fy

    visualX.current += velX.current
    visualY.current += velY.current

    updateCordAt(visualX.current, visualY.current)

    const settled =
      Math.abs(offsetX.current - visualX.current) < 0.25 &&
      Math.abs(offsetY.current - visualY.current) < 0.25 &&
      Math.abs(velX.current) < 0.25 &&
      Math.abs(velY.current) < 0.25

    if (!settled) {
      rafRef.current = requestAnimationFrame(runSpring)
    } else {
      visualX.current = offsetX.current
      visualY.current = offsetY.current
      updateCordAt(offsetX.current, offsetY.current)
      rafRef.current = null
    }
  }

  const startSpring = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(runSpring)
  }

  useEffect(() => {
    updateCordAt(0, 0)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, []) // eslint-disable-line

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    totalMove.current = 0
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      offX: offsetX.current,
      offY: offsetY.current,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    const newX = dragStart.current.offX + (e.clientX - dragStart.current.mouseX)
    const newY = dragStart.current.offY + (e.clientY - dragStart.current.mouseY)
    totalMove.current += Math.abs(e.movementX) + Math.abs(e.movementY)
    offsetX.current = newX
    offsetY.current = newY

    if (cardRef.current) {
      cardRef.current.style.transform = `translate(${newX}px, ${newY}px) scale(1.04)`
      cardRef.current.style.zIndex = '50'
    }
    startSpring()
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    e.currentTarget.releasePointerCapture(e.pointerId)
    if (cardRef.current) {
      cardRef.current.style.transform = `translate(${offsetX.current}px, ${offsetY.current}px) scale(1)`
      cardRef.current.style.zIndex = '10'
    }
    // Let spring continue so cord bounces/oscillates before settling
    startSpring()
    if (totalMove.current < 6) {
      router.push(`/influencer/${influencer.slug}`)
    }
  }

  return (
    <div
      ref={cardRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: 'absolute',
        left: initialX,
        top: initialY,
        width: CARD_W,
        zIndex: 10,
        cursor: 'grab',
        touchAction: 'none',
        userSelect: 'none',
        willChange: 'transform',
        transition: 'box-shadow 0.2s',
      }}
    >
      <div style={{
          transform: `rotate(${influencer.rotation}deg)`,
          background: '#fff',
          borderRadius: 6,
          overflow: 'hidden',
          boxShadow: '0 6px 24px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)',
        }}>
          <div
            className={`bg-gradient-to-br ${influencer.coverGradient}`}
            style={{ width: CARD_W, height: CARD_W, position: 'relative', overflow: 'hidden' }}
          >
            {influencer.photo && (
              <Image src={influencer.photo} alt={influencer.name} fill className="object-cover" />
            )}
            {influencer.status === 'in-progress' && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 8, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  building
                </span>
              </div>
            )}
          </div>
          <div style={{ padding: '8px 6px 10px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>
              {influencer.name}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 8.5, color: '#999', margin: '2px 0 0', letterSpacing: '0.05em' }}>
              {influencer.niche}
            </p>
          </div>
        </div>
    </div>
  )
}

export default function InfluencerBoard({ influencers }: { influencers: Influencer[] }) {
  const [dims, setDims] = useState({ w: 1000, h: 620 })

  useEffect(() => {
    setDims({ w: window.innerWidth - 80, h: 620 })
  }, [])

  const cx = dims.w / 2
  const cy = dims.h / 2

  const initialPositions = influencers.map((_, i) => ({
    x: POSITIONS[i % POSITIONS.length].fx * dims.w,
    y: POSITIONS[i % POSITIONS.length].fy * dims.h,
  }))

  const initialPaths = influencers.map((_, i) =>
    computePath(cx, cy, initialPositions[i].x + CARD_W / 2, initialPositions[i].y + CARD_H / 2, i)
  )

  if (influencers.length === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="font-mono text-[12px] text-[#bbb]">no influencers yet — coming soon</p>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', height: dims.h, width: '100%', overflow: 'hidden' }}>

      {/* SVG cords */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5, overflow: 'visible' }}>
        {influencers.map((inf, i) => (
          <path
            key={inf.id}
            id={`cord-${inf.id}`}
            d={initialPaths[i]}
            stroke="#c8382a"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.75"
          />
        ))}
      </svg>

      {/* Alex center */}
      <div style={{
        position: 'absolute', left: cx, top: cy,
        transform: 'translate(-50%, -58%)',
        zIndex: 20, textAlign: 'center',
        filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.18))',
        pointerEvents: 'none',
      }}>
        <Image src="/head.png" alt="Alex" width={130} height={163} style={{ width: 130, height: 'auto' }} />
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, color: 'var(--t1)', marginTop: 4, letterSpacing: '0.05em' }}>
          @askhuston
        </p>
      </div>

      {/* Cards */}
      {influencers.map((inf, i) => (
        <InfluencerNode
          key={inf.id}
          influencer={inf}
          index={i}
          initialX={initialPositions[i].x}
          initialY={initialPositions[i].y}
          centerX={cx}
          centerY={cy}
        />
      ))}
    </div>
  )
}
