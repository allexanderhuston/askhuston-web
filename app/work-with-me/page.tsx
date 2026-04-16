'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { glass } from '@/lib/glass'

const PROJECT_TYPES = [
  { label: 'Campaign Film', sub: 'brand story, hero video' },
  { label: 'UGC Series', sub: 'scroll-stopping native ads' },
  { label: 'Brand Identity', sub: 'visual language, direction' },
  { label: 'AI Influencer', sub: 'character build + content' },
  { label: 'Product Drop', sub: 'launch moment, all-in' },
  { label: 'Something Else', sub: 'tell me' },
]

const BUDGETS = [
  { label: '< €1k', sub: 'micro' },
  { label: '€1–3k', sub: 'focused' },
  { label: '€3–7k', sub: 'proper' },
  { label: '€7k+', sub: "let's go" },
  { label: 'TBD', sub: "let's talk" },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.19, 1, 0.22, 1] },
})

const WHAT_YOU_GET = [
  {
    num: '01',
    title: 'No rate card.',
    body: 'I come back with ideas, not a spreadsheet. Every project starts with a concept — if you like it, we build it.',
  },
  {
    num: '02',
    title: 'AI-native production.',
    body: 'Campaign-quality output without the six-figure budget. The tech handles the crew. I handle the vision.',
  },
  {
    num: '03',
    title: 'One point of contact.',
    body: "No account manager, no middleman. You brief me directly. I deliver directly.",
  },
]

export default function WorkWithMe() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    brand: '',
    projectTypes: [] as string[],
    budget: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function set(field: string, val: string) {
    setForm((prev) => ({ ...prev, [field]: val }))
  }

  function toggleProjectType(label: string) {
    setForm((prev) => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(label)
        ? prev.projectTypes.filter((t) => t !== label)
        : [...prev.projectTypes, label],
    }))
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
        body: JSON.stringify({ ...form, _type: 'brief' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen pt-16 pb-12">

      {/* Header — same container as portfolio */}
      <motion.div {...fade(0)} className="flex items-baseline gap-4 px-6 md:px-10 pt-10 pb-6">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-t1 leading-none">let's build</h1>
        <span className="font-mono text-[13px] text-[#c8382a] tracking-[0.12em]">02</span>
      </motion.div>

      <div className="px-6 md:px-10 max-w-3xl mx-auto">

      {/* Hero */}
      <motion.div {...fade(0.06)} className="mb-6">
        <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-black text-t1 leading-[0.96] mb-3">
          let's make<br />
          <span style={{ color: '#c8382a' }}>something</span><br />
          worth watching.
        </h1>
        <p className="font-mono text-[12px] text-t3 leading-relaxed max-w-md">
          AI-native campaigns for brands that want to move culture, not just content calendars.
          Tell me what you're building — I'll tell you how we make it hit.
        </p>
      </motion.div>

      {/* What you get */}
      <motion.div {...fade(0.08)} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {WHAT_YOU_GET.map((item) => (
          <div key={item.num} className="rounded-2xl p-4" style={glass}>
            <p className="font-mono text-[9px] tracking-[0.18em] text-[#c8382a] uppercase mb-2">{item.num}</p>
            <p className="font-display text-[13px] font-bold text-t1 mb-1 leading-snug">{item.title}</p>
            <p className="font-mono text-[10px] text-t3 leading-relaxed">{item.body}</p>
          </div>
        ))}
      </motion.div>

      {/* Form */}
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="rounded-3xl p-12 text-center"
            style={glass}
          >
            <p className="font-mono text-[10px] tracking-[0.22em] text-[#c8382a] uppercase mb-4">brief received</p>
            <p className="font-display text-4xl font-black text-t1 mb-3 leading-tight">
              I'll be in touch<br />with ideas.
            </p>
            <p className="font-mono text-[11px] text-t4 leading-relaxed">
              Usually within 24 hours. Not 48. Not a week.<br />
              If you don't hear from me, check your spam.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="rounded-3xl overflow-hidden flex flex-col gap-0"
            style={glass}
          >

            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderBottom: '1px solid var(--divider)' }}>
              <Field label="Name *" style={{ borderRight: '1px solid var(--divider)' }}>
                <input
                  required
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="Your name"
                  className="font-mono text-[12px] text-t1 bg-transparent w-full focus:outline-none placeholder:text-t6"
                />
              </Field>
              <Field label="Email *">
                <input
                  required
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="you@brand.com"
                  className="font-mono text-[12px] text-t1 bg-transparent w-full focus:outline-none placeholder:text-t6"
                />
              </Field>
            </div>

            {/* Brand */}
            <Field label="Brand / Company" style={{ borderBottom: '1px solid var(--divider)' }}>
              <input
                name="brand"
                type="text"
                value={form.brand}
                onChange={e => set('brand', e.target.value)}
                placeholder="What's the brand?"
                className="font-mono text-[12px] text-t1 bg-transparent w-full focus:outline-none placeholder:text-t6"
              />
            </Field>

            {/* Project Type */}
            <div className="px-5 pt-3.5 pb-3.5" style={{ borderBottom: '1px solid var(--divider)' }}>
              <p className="font-mono text-[9px] tracking-[0.2em] text-t5 uppercase mb-3">What do you need?</p>
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((pt) => {
                  const active = form.projectTypes.includes(pt.label)
                  return (
                    <motion.button
                      type="button"
                      key={pt.label}
                      onClick={() => toggleProjectType(pt.label)}
                      whileTap={{ scale: 0.92 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      className="flex flex-col items-start px-4 py-2.5 rounded-xl transition-all duration-200"
                      style={{
                        background: active ? 'rgba(200,56,42,0.08)' : 'var(--chip-bg)',
                        border: active ? '1px solid rgba(200,56,42,0.3)' : '1px solid var(--chip-border)',
                        boxShadow: active ? '0 0 0 1px rgba(200,56,42,0.15)' : 'none',
                      }}
                    >
                      <span className="font-mono text-[11px] font-medium" style={{ color: active ? '#c8382a' : 'var(--t2)' }}>
                        {pt.label}
                      </span>
                      <span className="font-mono text-[9px]" style={{ color: active ? '#c8382a80' : 'var(--t6)' }}>
                        {pt.sub}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Budget */}
            <div className="px-5 pt-3.5 pb-3.5" style={{ borderBottom: '1px solid var(--divider)' }}>
              <p className="font-mono text-[9px] tracking-[0.2em] text-t5 uppercase mb-3">Budget range</p>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => {
                  const active = form.budget === b.label
                  return (
                    <motion.button
                      type="button"
                      key={b.label}
                      onClick={() => set('budget', active ? '' : b.label)}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200"
                      style={{
                        background: active ? 'rgba(200,56,42,0.08)' : 'var(--chip-bg)',
                        border: active ? '1px solid rgba(200,56,42,0.3)' : '1px solid var(--chip-border)',
                      }}
                    >
                      <span className="font-mono text-[11px] font-medium" style={{ color: active ? '#c8382a' : 'var(--t2)' }}>
                        {b.label}
                      </span>
                      <span className="font-mono text-[9px]" style={{ color: active ? '#c8382a80' : 'var(--t6)' }}>
                        {b.sub}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Message */}
            <Field label="Tell me about it *" style={{ borderBottom: '1px solid var(--divider)' }}>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={e => set('message', e.target.value)}
                placeholder="The brand, the vibe, what you want people to feel. No brief needed — just talk."
                rows={4}
                className="font-mono text-[12px] text-t1 bg-transparent w-full focus:outline-none placeholder:text-t6 resize-none"
              />
            </Field>

            {/* Error */}
            {status === 'error' && (
              <div className="px-6 pt-3">
                <p className="font-mono text-[10px] text-[#c8382a]">
                  Something broke. Email me directly: alex@askhuston.com
                </p>
              </div>
            )}

            {/* Submit */}
            <div className="px-5 py-4">
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-full py-3 rounded-2xl font-display text-[14px] font-bold tracking-[0.02em] disabled:opacity-50 overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === 'loading' ? (
                    <motion.span
                      key="loading"
                      className="flex items-center justify-center gap-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.span
                        className="w-3 h-3 rounded-full border border-white/30 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                        style={{ display: 'inline-block' }}
                      />
                      sending...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      send the brief →
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              <p className="font-mono text-[9px] text-t6 text-center mt-3 tracking-[0.1em]">
                no commitment. just a conversation.
              </p>
            </div>

          </motion.form>
        )}
      </AnimatePresence>

      {/* Calendly */}
      <motion.a
        {...fade(0.2)}
        href="https://calendly.com/allexanderhuston/quick-creative-audit"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-stretch mt-3 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
        style={glass}
      >
        {/* Time block */}
        <div
          className="flex flex-col items-center justify-center px-6 shrink-0"
          style={{ background: 'rgba(200,56,42,0.07)', borderRight: '1px solid rgba(200,56,42,0.12)' }}
        >
          <span className="font-display text-3xl font-black text-[#c8382a] leading-none">15</span>
          <span className="font-mono text-[9px] text-[#c8382a] tracking-[0.1em] uppercase mt-0.5">min</span>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-6 py-4 flex-1">
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#999] uppercase mb-1">or skip the form</p>
          <p className="font-display text-[15px] font-bold text-t1 leading-tight">steal my brain</p>
          <p className="font-mono text-[10px] text-t6 mt-0.5">quick creative audit · free · no pitch</p>
        </div>

        {/* Arrow */}
        <div className="flex items-center pr-6">
          <span className="font-mono text-[#c8382a] text-sm group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </motion.a>

      </div>
    </main>
  )
}

function Field({
  label,
  children,
  style,
}: {
  label: string
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div className="flex flex-col gap-1.5 px-5 py-3.5" style={style}>
      <p className="font-mono text-[9px] tracking-[0.2em] text-t5 uppercase">{label}</p>
      {children}
    </div>
  )
}
