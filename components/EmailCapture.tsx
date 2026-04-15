'use client'

import { useState } from 'react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || status === 'loading') return

    setStatus('loading')

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID

    if (!formId) {
      setStatus('success')
      setEmail('')
      return
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, _type: 'email-list' }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="text-center">
      <p className="font-mono text-[10px] tracking-[0.25em] text-muted/50 uppercase mb-4">
        Stay in the loop
      </p>

      {status === 'success' ? (
        <p className="font-mono text-xs text-accent tracking-wide">
          You&apos;re in. I&apos;ll be in touch.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-stretch gap-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 bg-transparent border border-border text-text font-mono text-xs px-4 py-3 placeholder:text-muted/30 focus:outline-none focus:border-text/30 transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-text text-bg font-mono text-xs px-5 py-3 hover:bg-accent hover:text-text transition-colors disabled:opacity-50 shrink-0"
          >
            {status === 'loading' ? '...' : '→'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="font-mono text-[10px] text-muted/50 mt-2">
          Something went wrong. Try again.
        </p>
      )}

      <p className="font-mono text-[10px] text-muted/30 tracking-wide mt-3">
        No spam. Work drops &amp; ideas only.
      </p>
    </div>
  )
}
