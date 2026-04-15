'use client'

import { useState } from 'react'

const projectTypes = [
  'Speculative Campaign',
  'Brand Film',
  'UGC Series',
  'Product Photography',
  'Other',
]

const budgets = [
  'Under $1,000',
  '$1,000 – $3,000',
  '$3,000 – $7,500',
  '$7,500+',
  'Not sure yet',
]

const glass = {
  background: 'rgba(255,255,255,0.55)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
}

const inputStyle = {
  background: 'rgba(255,255,255,0.18)',
  border: '1px solid rgba(255,255,255,0.6)',
  borderRadius: '10px',
  color: '#1a1a1a',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
}

export default function WorkWithMe() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    brand: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID
    if (!formId) { setStatus('success'); return }

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _type: 'inquiry' }),
      })
      if (res.ok) { setStatus('success') } else { setStatus('error') }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full font-mono text-xs px-4 py-3 focus:outline-none transition-colors placeholder:text-[#aaa]'

  return (
    <main className="min-h-screen pt-24 pb-24 max-w-2xl mx-auto px-6 md:px-10">

      {/* Header glass card */}
      <div className="rounded-2xl px-8 py-6 mb-6" style={glass}>
        <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-1">
          Let&apos;s Collaborate
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-black text-[#1a1a1a] mb-3">
          Work with Me
        </h1>
        <p className="font-mono text-[11px] text-[#777] leading-relaxed">
          Tell me about your brand and what you&apos;re building. I&apos;ll come back with ideas,
          not a rate card.
        </p>
      </div>

      {/* Form glass card */}
      <div className="rounded-2xl overflow-hidden" style={glass}>
        {status === 'success' ? (
          <div className="px-8 py-16 text-center">
            <p className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase mb-3">
              Received
            </p>
            <p className="font-display text-2xl font-black text-[#1a1a1a] mb-2">
              I&apos;ll be in touch.
            </p>
            <p className="font-mono text-xs text-[#777]">Usually within 24–48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-0">

            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.35)' }}>
              <div className="flex flex-col gap-1.5 px-6 py-5" style={{ borderRight: '1px solid rgba(255,255,255,0.35)' }}>
                <label className="font-mono text-[9px] tracking-[0.2em] text-[#999] uppercase">Name *</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Alex"
                  className={inputClass + ' rounded-lg'}
                  style={inputStyle}
                />
              </div>
              <div className="flex flex-col gap-1.5 px-6 py-5">
                <label className="font-mono text-[9px] tracking-[0.2em] text-[#999] uppercase">Email *</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@brand.com"
                  className={inputClass + ' rounded-lg'}
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Brand */}
            <div className="flex flex-col gap-1.5 px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.35)' }}>
              <label className="font-mono text-[9px] tracking-[0.2em] text-[#999] uppercase">Brand / Company</label>
              <input
                name="brand"
                type="text"
                value={form.brand}
                onChange={handleChange}
                placeholder="Brand name"
                className={inputClass + ' rounded-lg'}
                style={inputStyle}
              />
            </div>

            {/* Project Type + Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.35)' }}>
              <div className="flex flex-col gap-1.5 px-6 py-5" style={{ borderRight: '1px solid rgba(255,255,255,0.35)' }}>
                <label className="font-mono text-[9px] tracking-[0.2em] text-[#999] uppercase">Project Type</label>
                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  className={inputClass + ' rounded-lg appearance-none cursor-pointer'}
                  style={inputStyle}
                >
                  <option value="">Select type</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5 px-6 py-5">
                <label className="font-mono text-[9px] tracking-[0.2em] text-[#999] uppercase">Budget</label>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className={inputClass + ' rounded-lg appearance-none cursor-pointer'}
                  style={inputStyle}
                >
                  <option value="">Select range</option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5 px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.35)' }}>
              <label className="font-mono text-[9px] tracking-[0.2em] text-[#999] uppercase">Tell me about your project *</label>
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="What are you building, what's the vibe, what do you need?"
                rows={4}
                className={inputClass + ' rounded-lg resize-none'}
                style={inputStyle}
              />
            </div>

            {/* Error */}
            {status === 'error' && (
              <div className="px-6 py-3">
                <p className="font-mono text-[10px] text-accent/70">
                  Something went wrong. Try again or email alex@askhuston.com.
                </p>
              </div>
            )}

            {/* Submit */}
            <div className="px-6 py-5">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full font-ui text-xs font-bold tracking-[0.15em] uppercase py-3.5 rounded-xl transition-all disabled:opacity-50"
                style={{
                  background: 'rgba(26,26,26,0.9)',
                  color: '#efefef',
                }}
              >
                {status === 'loading' ? 'Sending...' : 'Send →'}
              </button>
            </div>

          </form>
        )}
      </div>

    </main>
  )
}
