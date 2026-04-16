import type { CSSProperties } from 'react'

export const glass: CSSProperties = {
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid var(--glass-border)',
  boxShadow: 'var(--glass-shadow)',
}

export const glassDense: CSSProperties = {
  background: 'var(--glass-bg-dense)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid var(--glass-border)',
  boxShadow: 'var(--glass-shadow)',
}
