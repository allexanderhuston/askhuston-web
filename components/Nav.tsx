'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const tabs = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'The Work' },
  { href: '/work-with-me', label: 'Brief Me' },
  { href: '/about', label: 'The Human' },
]

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  // close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* ── Centered pill nav ── */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none">
        {/* Desktop pill */}
        <nav
          className="hidden md:flex pointer-events-auto items-center gap-1 rounded-full px-1.5 py-1.5"
          style={{
            background: 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative px-5 py-2 rounded-full font-mono text-[11px] tracking-[0.08em] transition-colors duration-150"
              style={{ color: isActive(tab.href) ? '#1a1a1a' : '#888' }}
            >
              {isActive(tab.href) && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.6)',
                    boxShadow: '0 0 20px rgba(255,255,255,0.5), inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.05)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 42 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile pill — logo + hamburger */}
        <div
          className="md:hidden pointer-events-auto flex items-center gap-3 rounded-full px-4 py-2"
          style={{
            background: 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          <Link href="/" className="font-mono text-[11px] tracking-[0.15em] text-[#1a1a1a]/70 uppercase">
            @askhuston
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-6 h-6 flex flex-col justify-center items-end gap-[4px]"
            aria-label="Toggle menu"
          >
            <span className={`block h-px bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? 'w-5 -rotate-45 translate-y-[5px]' : 'w-5'}`} />
            <span className={`block h-px bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? 'opacity-0 w-3' : 'w-3'}`} />
            <span className={`block h-px bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? 'w-5 rotate-45 -translate-y-[5px]' : 'w-5'}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col justify-center px-8"
            style={{ background: 'rgba(239,239,239,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <nav className="flex flex-col gap-8">
              {tabs.map((tab, i) => (
                <motion.div
                  key={tab.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <Link
                    href={tab.href}
                    className="font-display text-4xl font-bold hover:text-accent transition-colors"
                    style={{ color: isActive(tab.href) ? '#c8382a' : '#1a1a1a' }}
                  >
                    {tab.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
