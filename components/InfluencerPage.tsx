'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Influencer } from '@/lib/influencers'
import { glass } from '@/lib/glass'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.19, 1, 0.22, 1] },
})

function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="font-mono text-[9px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
      style={{ background: 'var(--chip-bg)', border: '1px solid var(--chip-border)', color: color ?? 'var(--t3)' }}
    >
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[0.18em] text-[#c8382a] uppercase mb-4">{children}</p>
  )
}

export default function InfluencerPage({ influencer }: { influencer: Influencer }) {
  const router = useRouter()
  const hasImages = influencer.images && influencer.images.length > 0

  return (
    <main className="min-h-screen pt-20 pb-20 px-6 md:px-10">

      {/* Back */}
      <motion.div {...fade(0)} className="mb-8">
        <button
          onClick={() => router.back()}
          className="font-mono text-[10px] text-t6 hover:text-[#c8382a] transition-colors tracking-[0.1em]"
        >
          ← back to work
        </button>
      </motion.div>

      {/* Hero */}
      <motion.div {...fade(0.05)} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Left — identity */}
        <div
          className="rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[320px]"
          style={glass}
        >
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[9px] tracking-[0.15em] uppercase px-3 py-1 rounded-full"
              style={{ background: influencer.status === 'live' ? 'rgba(34,197,94,0.12)' : 'rgba(200,56,42,0.10)', color: influencer.status === 'live' ? '#16a34a' : '#c8382a', border: `1px solid ${influencer.status === 'live' ? 'rgba(34,197,94,0.2)' : 'rgba(200,56,42,0.2)'}` }}
            >
              {influencer.status === 'live' ? 'live' : 'in production'}
            </span>
            <span className="font-mono text-[9px] text-t6 tracking-[0.1em]">{influencer.niche}</span>
          </div>

          <div>
            <h1 className="font-display text-6xl md:text-7xl font-bold text-t1 leading-none mb-2">
              {influencer.name}
            </h1>
            <p className="font-mono text-[12px] text-t4 mb-1">{influencer.handle}</p>
            {influencer.age && influencer.basedIn && (
              <p className="font-mono text-[11px] text-t6">{influencer.age} · {influencer.basedIn}</p>
            )}
          </div>

          {influencer.bio && (
            <p className="font-mono text-[12px] text-t2 leading-relaxed max-w-sm">
              &ldquo;{influencer.bio}&rdquo;
            </p>
          )}

          {influencer.personality && (
            <div className="flex flex-wrap gap-2 mt-2">
              {influencer.personality.map(t => (
                <Tag key={t} color={influencer.accentColor}>{t}</Tag>
              ))}
            </div>
          )}
        </div>

        {/* Right — cover visual */}
        <div
          className={`rounded-3xl overflow-hidden min-h-[320px] bg-gradient-to-br ${influencer.coverGradient} relative`}
        >
          {influencer.heroPhoto && (
            <Image src={influencer.heroPhoto} alt={influencer.name} fill className="object-cover" />
          )}
          {!influencer.heroPhoto && (
            <div className="absolute inset-0 flex items-end p-8">
              <p className="font-mono text-[10px] text-white/40 tracking-[0.15em] uppercase">visual coming soon</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Middle row — character brief + build */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Character brief */}
        <motion.div {...fade(0.1)} className="rounded-3xl p-8" style={glass}>
          <SectionLabel>the character</SectionLabel>
          {influencer.characterBrief && (
            <p className="font-mono text-[12px] text-t2 leading-relaxed mb-6">
              {influencer.characterBrief}
            </p>
          )}
          {influencer.platforms && (
            <div>
              <p className="font-mono text-[9px] text-t6 tracking-[0.12em] uppercase mb-2">platforms</p>
              <div className="flex flex-wrap gap-2">
                {influencer.platforms.map(p => <Tag key={p}>{p}</Tag>)}
              </div>
            </div>
          )}
        </motion.div>

        {/* The build */}
        <motion.div {...fade(0.12)} className="rounded-3xl p-8" style={glass}>
          <SectionLabel>the build</SectionLabel>
          {influencer.consistencyMethod && (
            <p className="font-mono text-[12px] text-t2 leading-relaxed mb-6">
              {influencer.consistencyMethod}
            </p>
          )}
          {influencer.tools && (
            <div>
              <p className="font-mono text-[9px] text-t6 tracking-[0.12em] uppercase mb-2">tools</p>
              <div className="flex flex-wrap gap-2">
                {influencer.tools.map(t => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Content grid */}
      <motion.div {...fade(0.14)} className="rounded-3xl p-8 mb-6" style={glass}>
        <div className="flex items-baseline justify-between mb-6">
          <SectionLabel>content</SectionLabel>
          <span className="font-mono text-[9px] text-t6 tracking-[0.1em]">
            {hasImages ? `${influencer.images!.length} posts` : 'coming soon'}
          </span>
        </div>

        {hasImages ? (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {influencer.images!.map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden relative group">
                <Image src={src} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="rounded-2xl grid grid-cols-3 md:grid-cols-6 gap-2"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl bg-gradient-to-br ${influencer.coverGradient}`}
                style={{ opacity: 0.15 + i * 0.06 }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Bottom row — strategy + brand fit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Strategy */}
        <motion.div {...fade(0.16)} className="rounded-3xl p-8" style={glass}>
          <SectionLabel>strategy</SectionLabel>

          {influencer.targetAudience && (
            <div className="mb-6">
              <p className="font-mono text-[9px] text-t6 tracking-[0.12em] uppercase mb-2">target audience</p>
              <p className="font-mono text-[12px] text-t2 leading-relaxed">{influencer.targetAudience}</p>
            </div>
          )}

          {influencer.contentPillars && (
            <div>
              <p className="font-mono text-[9px] text-t6 tracking-[0.12em] uppercase mb-2">content pillars</p>
              <div className="flex flex-col gap-2">
                {influencer.contentPillars.map((p, i) => (
                  <div key={p} className="flex items-center gap-3">
                    <span className="font-mono text-[9px] text-[#c8382a]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-mono text-[11px] text-t2">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Brand fit + CTA */}
        <motion.div {...fade(0.18)} className="rounded-3xl p-8 flex flex-col justify-between" style={glass}>
          <div>
            <SectionLabel>brand fit</SectionLabel>
            {influencer.brandFit && (
              <div className="flex flex-wrap gap-2 mb-8">
                {influencer.brandFit.map(b => <Tag key={b} color={influencer.accentColor}>{b}</Tag>)}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] text-t6 tracking-[0.12em] uppercase">want {influencer.name} for your brand?</p>
            <Link
              href="/work-with-me"
              className="flex items-center justify-between px-5 py-3 rounded-full transition-all group"
              style={{ background: '#c8382a', color: '#fff' }}
            >
              <span className="font-display text-[13px] font-semibold">brief me</span>
              <span className="font-mono text-[11px] opacity-70 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
          </div>
        </motion.div>
      </div>

    </main>
  )
}
