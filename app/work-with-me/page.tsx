'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

const glass = {
  background: 'rgba(255,255,255,0.35)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.6)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
}

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
    body: 'No account manager, no middleman. You brief me directly. I deliver directly.',
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
    <main className="min-h-screen pt-16 pb-24">

      {/* Header — same container as portfolio */}
      <motion.div {...fade(0)} className="flex items-baseline gap-4 px-6 md:px-10 pt-10 pb-6">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-[#1a1a1a] leading-none">brief me</h1>
        <span className="font-mono text-[13px] text-[#c8382a] tracking-[0.12em]">02</span>
      </motion.div>

      <div className="px-6 md:px-10 max-w-3xl mx-auto">

      {/* Hero */}
      <motion.div {...fade(0.06)} className="mb-14">
        <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-black text-[#1a1a1a] leading-[0.96] mb-6">
          let's make<br />
          <span style={{ color: '#c8382a' }}>something</span><br />
          worth watching.
        </h1>
        <p className="font-mono text-[13px] text-[#666] leading-relaxed max-w-md">
          AI-native campaigns for brands that want to move culture, not just content calendars.
          Tell me what you're building — I'll tell you how we make it hit.
        </p>
      </motion.div>

      {/* What you get */}
      <motion.div {...fade(0.08)} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12">
        {WHAT_YOU_GET.map((item) => (
          <div key={item.num} className="rounded-2xl p-6" style={glass}>
            <p className="font-mono text-[9px] tracking-[0.18em] text-[#c8382a] uppercase mb-3">{item.num}</p>
            <p className="font-display text-[15px] font-bold text-[#1a1a1a] mb-2 leading-snug">{item.title}</p>
            <p className="font-mono text-[11px] text-[#666] leading-relaxed">{item.body}</p>
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
            <p className="font-display text-4xl font-black text-[#1a1a1a] mb-3 leading-tight">
              I'll be in touch<br />with ideas.
            </p>
            <p className="font-mono text-[11px] text-[#888] leading-relaxed">
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
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <Field label="Name *" style={{ borderRight: '1px solid rgba(0,0,0,0.06)' }}>
                <input
                  required
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="Your name"
                  className="font-mono text-[12px] text-[#1a1a1a] bg-transparent w-full focus:outline-none placeholder:text-[#bbb]"
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
                  className="font-mono text-[12px] text-[#1a1a1a] bg-transparent w-full focus:outline-none placeholder:text-[#bbb]"
                />
              </Field>
            </div>

            {/* Brand */}
            <Field label="Brand / Company" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <input
                name="brand"
                type="text"
                value={form.brand}
                onChange={e => set('brand', e.target.value)}
                placeholder="What's the brand?"
                className="font-mono text-[12px] text-[#1a1a1a] bg-transparent w-full focus:outline-none placeholder:text-[#bbb]"
              />
            </Field>

            {/* Project Type */}
            <div className="px-6 pt-5 pb-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#999] uppercase mb-3">What do you need?</p>
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((pt) => {
                  const active = form.projectTypes.includes(pt.label)
                  return (
                    <button
                      type="button"
                      key={pt.label}
                      onClick={() => toggleProjectType(pt.label)}
                      className="flex flex-col items-start px-4 py-2.5 rounded-xl transition-all duration-200"
                      style={{
                        background: active ? 'rgba(200,56,42,0.08)' : 'rgba(255,255,255,0.5)',
                        border: active ? '1px solid rgba(200,56,42,0.3)' : '1px solid rgba(0,0,0,0.07)',
                        boxShadow: active ? '0 0 0 1px rgba(200,56,42,0.15)' : 'none',
                      }}
                    >
                      <span className="font-mono text-[11px] font-medium" style={{ color: active ? '#c8382a' : '#333' }}>
                        {pt.label}
                      </span>
                      <span className="font-mono text-[9px]" style={{ color: active ? '#c8382a80' : '#bbb' }}>
                        {pt.sub}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Budget */}
            <div className="px-6 pt-5 pb-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#999] uppercase mb-3">Budget range</p>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => {
                  const active = form.budget === b.label
                  return (
                    <button
                      type="button"
                      key={b.label}
                      onClick={() => set('budget', active ? '' : b.label)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200"
                      style={{
                        background: active ? 'rgba(200,56,42,0.08)' : 'rgba(255,255,255,0.5)',
                        border: active ? '1px solid rgba(200,56,42,0.3)' : '1px solid rgba(0,0,0,0.07)',
                      }}
                    >
                      <span className="font-mono text-[11px] font-medium" style={{ color: active ? '#c8382a' : '#333' }}>
                        {b.label}
                      </span>
                      <span className="font-mono text-[9px]" style={{ color: active ? '#c8382a80' : '#bbb' }}>
                        {b.sub}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Message */}
            <Field label="Tell me about it *" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={e => set('message', e.target.value)}
                placeholder="The brand, the vibe, what you want people to feel. No brief needed — just talk."
                rows={4}
                className="font-mono text-[12px] text-[#1a1a1a] bg-transparent w-full focus:outline-none placeholder:text-[#bbb] resize-none"
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
            <div className="px-6 py-5">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-2xl font-display text-[15px] font-bold tracking-[0.02em] transition-all duration-200 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                {status === 'loading' ? 'sending...' : 'send the brief →'}
              </button>
              <p className="font-mono text-[9px] text-[#bbb] text-center mt-3 tracking-[0.1em]">
                no commitment. just a conversation.
              </p>
            </div>

          </motion.form>
        )}
      </AnimatePresence>

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
    <div className="flex flex-col gap-2 px-6 py-5" style={style}>
      <p className="font-mono text-[9px] tracking-[0.2em] text-[#999] uppercase">{label}</p>
      {children}
    </div>
  )
}
