'use client'

import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { Influencer } from '@/lib/influencers'
import BgRemovedImage from '@/components/BgRemovedImage'

const CARD_W = 120
const CARD_H = 158

const POSITIONS = [
  { fx: 0.10, fy: 0.08 },
  { fx: 0.70, fy: 0.22 },
  { fx: 0.20, fy: 0.65 },
]

const CURVE_AMOUNTS = [0.28, -0.24, 0.32]

function computePath(cx: number, cy: number, ex: number, ey: number, index: number): string {
  const dx = ex - cx
  const dy = ey - cy
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const perpX = -dy / len
  const perpY = dx / len
  const amount = CURVE_AMOUNTS[index % CURVE_AMOUNTS.length] * len
  const qx = (cx + ex) / 2 + perpX * amount
  const qy = (cy + ey) / 2 + perpY * amount
  return `M ${cx} ${cy} Q ${qx} ${qy} ${ex} ${ey}`
}

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
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const offsetX = useRef(0)
  const offsetY = useRef(0)
  const dragStart = useRef({ mouseX: 0, mouseY: 0, offX: 0, offY: 0 })
  const dragging = useRef(false)
  const totalMove = useRef(0)

  const updateCords = (ox: number, oy: number) => {
    const cardCX = initialX + ox + CARD_W / 2
    const cardCY = initialY + oy + CARD_H / 2
    const d = computePath(centerX, centerY, cardCX, cardCY, index)
    ;['base', 'mid', 'twist'].forEach(layer => {
      const el = document.getElementById(`cord-${layer}-${influencer.id}`) as SVGPathElement | null
      if (el) el.setAttribute('d', d)
    })
  }

  // Set initial cord paths once mounted
  useEffect(() => { updateCords(0, 0) }, []) // eslint-disable-line

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
    updateCords(newX, newY)
  }

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    e.currentTarget.releasePointerCapture(e.pointerId)
    if (cardRef.current) {
      cardRef.current.style.transform = `translate(${offsetX.current}px, ${offsetY.current}px) scale(1)`
      cardRef.current.style.zIndex = '10'
    }
    // Navigate only if it was a tap, not a drag
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
          <g key={inf.id}>
            <path id={`cord-base-${inf.id}`}  d={initialPaths[i]} stroke="#5a1008" strokeWidth="4"   fill="none" strokeLinecap="round" opacity="0.3"  />
            <path id={`cord-mid-${inf.id}`}   d={initialPaths[i]} stroke="#c8382a" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.9"  />
            <path id={`cord-twist-${inf.id}`} d={initialPaths[i]} stroke="#f07060" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.65" strokeDasharray="6 10" />
          </g>
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
        <BgRemovedImage src="/head.png" width={130} />
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, color: '#1a1a1a', marginTop: 4, letterSpacing: '0.05em' }}>
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
