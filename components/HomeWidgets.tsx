'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import HomeEmailRow from '@/components/HomeEmailRow'

const glass = {
  background: 'rgba(255,255,255,0.35)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.6)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
}

const drag = {
  drag: true as const,
  dragMomentum: false,
  dragElastic: 0,
  whileDrag: { scale: 1.02, zIndex: 100 },
}

function SparklesIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8382a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8382a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7z" />
    </svg>
  )
}

function InstaIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10V9h4v2a6 6 0 0 1 2-3z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.24l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function PersonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c8382a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.77 0 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 12.67 0l-.01-8.83a8.18 8.18 0 0 0 4.78 1.52V4.55a4.85 4.85 0 0 1-2-.14z" />
    </svg>
  )
}

export default function HomeWidgets() {
  const containerRef = useRef<HTMLElement>(null)

  return (
    <main
      ref={containerRef}
      className="h-screen w-screen overflow-hidden relative"
      style={{ background: 'transparent' }}
    >

      {/* ── Centered column: email + main card ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col gap-2 w-[400px] px-4">

          {/* Email block */}
          <motion.div
            {...drag}
            dragConstraints={containerRef}
            className="cursor-grab active:cursor-grabbing rounded-2xl"
            style={glass}
          >
            <HomeEmailRow />
          </motion.div>

          {/* Main card */}
          <motion.div
            {...drag}
            dragConstraints={containerRef}
            className="cursor-grab active:cursor-grabbing rounded-3xl"
            style={{ ...glass, overflow: 'hidden' }}
          >
            {/* Portfolio */}
            <div className="px-2 pt-1.5 pb-0.5">
              <Link href="/portfolio" onPointerDownCapture={(e) => e.stopPropagation()} className="flex items-center gap-3 px-4 py-2 rounded-full transition-all group relative"
                style={{ ['--hover-bg' as string]: 'rgba(255,255,255,0.95)' }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 0 20px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.05)' }}
                />
                <div className="w-5 flex items-center justify-center shrink-0 relative z-10"><SparklesIcon /></div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5 relative z-10">
                  <span className="font-ui text-sm font-semibold text-[#1a1a1a]">The Work</span>
                  <span className="font-mono text-[11px] text-[#888]">See what&apos;s possible</span>
                </div>
                <span className="font-mono text-xs text-[#888] group-hover:text-[#444] transition-colors shrink-0 relative z-10">View →</span>
              </Link>
            </div>

            {/* Work with Me */}
            <div className="px-2">
              <Link href="/work-with-me" onPointerDownCapture={(e) => e.stopPropagation()} className="flex items-center gap-3 px-4 py-2 rounded-full transition-all group relative">
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 0 20px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.05)' }}
                />
                <div className="w-5 flex items-center justify-center shrink-0 relative z-10"><SendIcon /></div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5 relative z-10">
                  <span className="font-ui text-sm font-semibold text-[#1a1a1a]">Brief Me</span>
                  <span className="font-mono text-[11px] text-[#888]">Let&apos;s make something</span>
                </div>
                <span className="font-mono text-xs text-[#888] group-hover:text-[#444] transition-colors shrink-0 relative z-10">Contact →</span>
              </Link>
            </div>

            {/* About */}
            <div className="px-2 pb-1.5">
              <Link href="/about" onPointerDownCapture={(e) => e.stopPropagation()} className="flex items-center gap-3 px-4 py-2 rounded-full transition-all group relative">
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 0 20px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.05)' }}
                />
                <div className="w-5 flex items-center justify-center shrink-0 relative z-10"><PersonIcon /></div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5 relative z-10">
                  <span className="font-ui text-sm font-semibold text-[#1a1a1a]">The Human</span>
                  <span className="font-mono text-[11px] text-[#888]">AI Creative Director</span>
                </div>
                <span className="font-mono text-xs text-[#888] group-hover:text-[#444] transition-colors shrink-0 relative z-10">More →</span>
              </Link>
            </div>

            {/* Social */}
            <div className="px-6 py-6">
              <p className="font-mono text-[10px] tracking-[0.15em] text-[#999] uppercase mb-4">Follow for more</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {[
                  { icon: <InstaIcon />, label: 'Instagram', href: 'https://instagram.com/askhuston' },
                  { icon: <TikTokIcon />, label: 'TikTok', href: 'https://tiktok.com/@askhuston' },
                  { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://linkedin.com/in/alexanderboyanov' },
                  { icon: <XIcon />, label: 'X', href: 'https://x.com/askhuston' },
                ].map(({ icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-[#666] hover:text-[#1a1a1a] transition-colors">
                    {icon}
                    <span className="font-mono text-[10px]">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Bottom tag */}
            <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <span className="font-mono text-[10px] text-[#999] tracking-wider">@askhuston</span>
              <span className="font-mono text-[10px] text-[#999] tracking-wider">AI Creative Director</span>
            </div>
          </motion.div>

        </div>
      </div>

    </main>
  )
}
