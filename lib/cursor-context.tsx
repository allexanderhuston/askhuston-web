'use client'

import { createContext, useContext, useState } from 'react'

type CursorState = 'default' | 'view-project'

const CursorContext = createContext<{
  state: CursorState
  setState: (s: CursorState) => void
}>({ state: 'default', setState: () => {} })

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CursorState>('default')
  return (
    <CursorContext.Provider value={{ state, setState }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  return useContext(CursorContext)
}
