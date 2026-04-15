'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const projectTypes = [
  'AI Campaign Film',
  'UGC Series',
  'Brand Short Film',
  'Product Photography',
  'Full Campaign (Multi-Format)',
  'Something else',
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    projectType: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('loading')

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID

    if (!formspreeId) {
      // Fallback: open mailto
      const subject = encodeURIComponent(`Campaign inquiry — ${formData.brand}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nBrand: ${formData.brand}\nProject: ${formData.projectType}\n\n${formData.message}`
      )
      window.location.href = `mailto:alex@askhuston.com?subject=${subject}&body=${body}`
      setState('idle')
      return
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setState('success')
        setFormData({ name: '', brand: '', projectType: '', message: '' })
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-border p-10 text-center"
      >
        <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-4">
          Sent.
        </p>
        <p className="font-display text-2xl font-bold text-text mb-3">
          I'll come back to you shortly.
        </p>
        <p className="font-mono text-xs text-muted leading-relaxed">
          If it's urgent: DM on Instagram{' '}
          <a
            href="https://instagram.com/askhuston"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text hover:text-accent transition-colors"
          >
            @askhuston
          </a>
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-px">
      {/* Name + Brand row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
        <FormField label="Your name" id="name" required>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Alex"
            className="w-full bg-surface border-0 border-b border-border px-0 py-4 font-mono text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </FormField>

        <FormField label="Brand or company" id="brand" required>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            placeholder="Your brand name"
            className="w-full bg-surface border-0 border-b border-border px-0 py-4 font-mono text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </FormField>
      </div>

      {/* Project type */}
      <FormField label="What are you working on?" id="projectType" required>
        <select
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          className="w-full bg-surface border-0 border-b border-border px-0 py-4 font-mono text-sm text-text focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
        >
          <option value="" disabled className="text-muted bg-surface">
            Select project type
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type} className="bg-surface">
              {type}
            </option>
          ))}
        </select>
      </FormField>

      {/* Message */}
      <FormField label="Tell me about the project" id="message" required>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="What's the brand, what are you launching, when do you need it?"
          className="w-full bg-surface border-0 border-b border-border px-0 py-4 font-mono text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </FormField>

      {/* Submit */}
      <div className="pt-8">
        <button
          type="submit"
          disabled={state === 'loading'}
          className="group relative w-full md:w-auto bg-text text-bg font-ui text-sm font-bold tracking-[0.15em] uppercase px-12 py-4 hover:bg-accent hover:text-text transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === 'loading' ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-3 h-3 border border-bg/40 border-t-bg rounded-full animate-spin" />
              Sending
            </span>
          ) : (
            'Send enquiry'
          )}
        </button>
      </div>

      {state === 'error' && (
        <p className="font-mono text-xs text-accent mt-4">
          Something went wrong. Email directly:{' '}
          <a
            href="mailto:alex@askhuston.com"
            className="underline hover:text-text transition-colors"
          >
            alex@askhuston.com
          </a>
        </p>
      )}
    </form>
  )
}

function FormField({
  label,
  id,
  required,
  children,
}: {
  label: string
  id: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="bg-surface px-6 py-5 border border-border group focus-within:border-accent/40 transition-colors">
      <label
        htmlFor={id}
        className="block font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-2"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}
