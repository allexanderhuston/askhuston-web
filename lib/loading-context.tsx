'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Ctx = { loaded: boolean; setLoaded: () => void }
const LoadingContext = createContext<Ctx>({ loaded: false, setLoaded: () => {} })

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <LoadingContext.Provider value={{ loaded, setLoaded: () => setLoaded(true) }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)
