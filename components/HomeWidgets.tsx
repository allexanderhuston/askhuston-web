'use client'

import { useRef, useState, useEffect } from 'react'
import { glass } from '@/lib/glass'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import HomeEmailRow from '@/components/HomeEmailRow'
import FloatingHead from '@/components/FloatingHead'
import { useTheme } from '@/lib/theme-context'
import { useLoading } from '@/lib/loading-context'

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

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function HomeThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="flex items-center justify-center rounded-full overflow-hidden"
      style={{
        width: 28,
        height: 28,
        background: 'var(--glass-hover)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--glass-border)',
        color: 'var(--t4)',
      }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="flex items-center justify-center"
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

export default function HomeWidgets() {
  const containerRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)
  const { loaded } = useLoading()
  // True if we're navigating back (loading screen already ran)
  const isReturn = useRef(loaded)
  useEffect(() => { setMounted(true) }, [])

  return (
    <main
      ref={containerRef}
      className="h-screen w-screen overflow-hidden relative"
      style={{ background: 'transparent' }}
    >

      <FloatingHead />

      {/* ── Centered column: email + main card ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col gap-2 w-[400px] px-4">

          {/* Email block — drops from top on return */}
          <motion.div
            {...drag}
            dragConstraints={containerRef}
            className="cursor-grab active:cursor-grabbing rounded-2xl"
            style={glass}
            initial={isReturn.current
              ? { opacity: 0, y: -80, rotate: -2 }
              : { opacity: 0, y: 24 }}
            animate={loaded
              ? { opacity: 1, y: 0, rotate: 0 }
              : { opacity: 0, y: isReturn.current ? -80 : 24 }}
            transition={{ delay: isReturn.current ? 0.15 : 0.3, duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
          >
            <HomeEmailRow />
          </motion.div>

          {/* Main card — rises from bottom on return */}
          <motion.div
            className="rounded-3xl"
            style={{ ...glass, overflow: 'hidden' }}
            initial={isReturn.current
              ? { opacity: 0, y: 100, rotate: 1.5 }
              : { opacity: 0, y: 24 }}
            animate={loaded
              ? { opacity: 1, y: 0, rotate: 0 }
              : { opacity: 0, y: isReturn.current ? 100 : 24 }}
            transition={{ delay: isReturn.current ? 0.25 : 0.45, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Portfolio */}
            <div className="px-2 pt-1.5 pb-0.5">
              <Link href="/portfolio" className="flex items-center gap-3 px-4 py-2 rounded-full transition-all group relative">
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 0 20px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.05)' }}
                />
                <div className="w-5 flex items-center justify-center shrink-0 relative z-10"><SparklesIcon /></div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5 relative z-10">
                  <span className="font-ui text-sm font-semibold text-t1">Work</span>
                  <span className="font-mono text-[11px] text-t4">See what&apos;s possible</span>
                </div>
                <span className="font-mono text-[11px] text-t6 group-hover:text-t4 transition-colors shrink-0 relative z-10">01</span>
              </Link>
            </div>

            {/* Work with Me */}
            <div className="px-2">
              <Link href="/work-with-me" className="flex items-center gap-3 px-4 py-2 rounded-full transition-all group relative">
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 0 20px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.05)' }}
                />
                <div className="w-5 flex items-center justify-center shrink-0 relative z-10"><SendIcon /></div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5 relative z-10">
                  <span className="font-ui text-sm font-semibold text-t1">Let's Build</span>
                  <span className="font-mono text-[11px] text-t4">Let&apos;s make something</span>
                </div>
                <span className="font-mono text-[11px] text-t6 group-hover:text-t4 transition-colors shrink-0 relative z-10">02</span>
              </Link>
            </div>

            {/* About */}
            <div className="px-2 pb-1.5">
              <Link href="/the-human" className="flex items-center gap-3 px-4 py-2 rounded-full transition-all group relative">
                <motion.span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 0 20px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.05)' }}
                />
                <div className="w-5 flex items-center justify-center shrink-0 relative z-10"><PersonIcon /></div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5 relative z-10">
                  <span className="font-ui text-sm font-semibold text-t1">The Human</span>
                  <span className="font-mono text-[11px] text-t4">AI Creative Director</span>
                </div>
                <span className="font-mono text-[11px] text-t6 group-hover:text-t4 transition-colors shrink-0 relative z-10">03</span>
              </Link>
            </div>

            {/* Social + toggle */}
            <div className="px-6 py-6">
              <p className="font-mono text-[10px] tracking-[0.15em] text-t5 mb-4">follow for more</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                {[
                  { icon: <InstaIcon />, label: 'Instagram', href: 'https://instagram.com/askhuston' },
                  { icon: <TikTokIcon />, label: 'TikTok', href: 'https://tiktok.com/@askhuston' },
                  { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://linkedin.com/in/alexanderboyanov' },
                  { icon: <XIcon />, label: 'X', href: 'https://x.com/askhuston' },
                ].map(({ icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-t3 hover:text-t1 transition-colors">
                    {icon}
                    <span className="font-mono text-[10px]">{label}</span>
                  </a>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <HomeThemeToggle />
              </div>
            </div>

          </motion.div>

        </div>
      </div>

    </main>
  )
}
