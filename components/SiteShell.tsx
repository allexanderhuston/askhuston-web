'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Nav from '@/components/Nav'
import IPhoneNotification from '@/components/IPhoneNotification'
import { useCursor } from '@/lib/cursor-context'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { setState } = useCursor()

  useEffect(() => {
    setState('default')
  }, [pathname, setState])

  return (
    <>
      {isHome && <IPhoneNotification />}
      {!isHome && <Nav />}
      {children}
    </>
  )
}
