'use client'

import { usePathname } from 'next/navigation'
import Nav from '@/components/Nav'
import IPhoneNotification from '@/components/IPhoneNotification'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      {isHome && <IPhoneNotification />}
      {!isHome && <Nav />}
      {children}
    </>
  )
}
