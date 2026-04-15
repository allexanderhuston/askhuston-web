'use client'

import { useState } from 'react'

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.75" strokeLinecap="round" className="shrink-0">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default function HomeEmailRow() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID
    if (!formId) { setStatus('success'); setEmail(''); return }

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _type: 'email-list' }),
      })
      if (res.ok) { setStatus('success'); setEmail('') } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 px-5 py-3">
        <MailIcon />
        <span className="font-mono text-xs text-accent flex-1">You&apos;re in. I&apos;ll be in touch.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 px-5 py-3">
      <MailIcon />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Stay in the loop — enter your email"
        required
        className="flex-1 bg-transparent font-mono text-[11px] focus:outline-none min-w-0"
        style={{ color: '#1a1a1a' }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="text-muted/50 hover:text-text/80 transition-colors disabled:opacity-40 shrink-0"
        aria-label="Subscribe"
      >
        {status === 'loading' ? (
          <span className="font-mono text-xs">...</span>
        ) : (
          <SendIcon />
        )}
      </button>
    </form>
  )
}
