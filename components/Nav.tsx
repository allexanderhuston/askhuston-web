'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/lib/theme-context'

const tabs = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Work' },
  { href: '/work-with-me', label: "Let's Build" },
  { href: '/the-human', label: 'The Human' },
]

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

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="relative ml-1 flex items-center justify-center rounded-full overflow-hidden"
      style={{
        width: 32,
        height: 32,
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--glass-shadow)',
        color: 'var(--t3)',
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

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none">
        {/* Desktop pill */}
        <motion.nav
          className="hidden md:flex pointer-events-auto items-center gap-1 rounded-full px-1.5 py-1.5"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow)',
          }}
        >
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative px-5 py-2 rounded-full font-display text-[12px] font-medium tracking-[0.02em] transition-colors duration-150"
              style={{ color: isActive(tab.href) ? 'var(--t1)' : 'var(--t4)' }}
            >
              {isActive(tab.href) && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'var(--glass-hover)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid var(--glass-border)',
                    boxShadow: 'inset 0 1px 0 var(--glass-border)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 42 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </Link>
          ))}

          {/* Divider */}
          <span className="w-px h-4 mx-1" style={{ background: 'var(--glass-border)' }} />

          {/* Theme toggle */}
          <ThemeToggle />
        </motion.nav>

        {/* Mobile pill */}
        <div
          className="md:hidden pointer-events-auto flex items-center gap-3 rounded-full px-4 py-2"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow)',
          }}
        >
          <Link href="/" className="font-mono text-[11px] tracking-[0.15em] uppercase" style={{ color: 'var(--t3)' }}>
            @askhuston
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-6 h-6 flex flex-col justify-center items-end gap-[4px]"
            aria-label="Toggle menu"
          >
            <span className={`block h-px transition-all duration-300 ${menuOpen ? 'w-5 -rotate-45 translate-y-[5px]' : 'w-5'}`} style={{ background: 'var(--t1)' }} />
            <span className={`block h-px transition-all duration-300 ${menuOpen ? 'opacity-0 w-3' : 'w-3'}`} style={{ background: 'var(--t1)' }} />
            <span className={`block h-px transition-all duration-300 ${menuOpen ? 'w-5 rotate-45 -translate-y-[5px]' : 'w-5'}`} style={{ background: 'var(--t1)' }} />
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
            style={{ background: isDark ? 'rgba(10,10,10,0.97)' : 'rgba(239,239,239,0.97)', backdropFilter: 'blur(24px)' }}
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
                    style={{ color: isActive(tab.href) ? '#c8382a' : 'var(--t1)' }}
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
