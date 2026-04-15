'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-bg/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-xs tracking-[0.2em] text-text/80 hover:text-text transition-colors uppercase"
          >
            @askhuston
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-ui text-xs tracking-[0.15em] uppercase transition-colors ${
                  pathname === link.href
                    ? 'text-text'
                    : 'text-muted hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center items-end gap-[5px] group"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px bg-text transition-all duration-300 ${
                menuOpen ? 'w-6 -rotate-45 translate-y-[7px]' : 'w-6'
              }`}
            />
            <span
              className={`block h-px bg-text transition-all duration-300 ${
                menuOpen ? 'opacity-0 w-4' : 'w-4'
              }`}
            />
            <span
              className={`block h-px bg-text transition-all duration-300 ${
                menuOpen ? 'w-6 rotate-45 -translate-y-[7px]' : 'w-6'
              }`}
            />
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
            className="fixed inset-0 z-40 bg-bg/98 flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-4xl font-bold text-text hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-10 left-8 flex items-center gap-6"
            >
              <a
                href="https://instagram.com/askhuston"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted hover:text-text transition-colors tracking-wider"
              >
                Instagram
              </a>
              <span className="text-border">—</span>
              <a
                href="https://linkedin.com/in/alexanderboyanov"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted hover:text-text transition-colors tracking-wider"
              >
                LinkedIn
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
