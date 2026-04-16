'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from '@/components/Nav'
import IPhoneNotification from '@/components/IPhoneNotification'
import LoadingScreen from '@/components/LoadingScreen'
import { useCursor } from '@/lib/cursor-context'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { setState } = useCursor()
  const [barVisible, setBarVisible] = useState(false)
  const prevPath = useRef(pathname)
  const isFirst = useRef(true)

  useEffect(() => {
    setState('default')
    if (isFirst.current) { isFirst.current = false; return }
    if (prevPath.current !== pathname) {
      setBarVisible(true)
      const t = setTimeout(() => setBarVisible(false), 600)
      prevPath.current = pathname
      return () => clearTimeout(t)
    }
  }, [pathname, setState])

  return (
    <>
      <LoadingScreen />
      <AnimatePresence>
        {barVisible && (
          <motion.div
            key="progress-bar"
            className="fixed top-0 left-0 right-0 z-[999] h-[3px]"
            style={{ background: 'linear-gradient(90deg, #c8382a 0%, #ff6b5b 100%)', originX: 0 }}
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>
      {isHome && <IPhoneNotification />}
      {!isHome && <Nav />}
      {children}
    </>
  )
}
