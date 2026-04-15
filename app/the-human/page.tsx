'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const glass = {
  background: 'rgba(255,255,255,0.35)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.6)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.19, 1, 0.22, 1] },
})

const skills = [
  'AI Campaign Direction',
  'AI Video Production',
  'Brand Strategy',
  'Art Direction',
  'Kling 3.0',
  'Higgsfield',
  'Midjourney',
  'ElevenLabs',
  'Blender / VFX',
  'Premiere Pro',
  'Shopify',
  'Paid Social',
]

export default function About() {
  return (
    <main className="min-h-screen pt-16 pb-16">

      {/* Header — same container as portfolio */}
      <motion.div {...fade(0)} className="flex items-baseline gap-4 px-6 md:px-10 pt-10 pb-6">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-[#1a1a1a] leading-none">the human</h1>
        <span className="font-mono text-[13px] text-[#c8382a] tracking-[0.12em]">03</span>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-start">

          {/* ── LEFT — big bio card ── */}
          <motion.div
            {...fade(0.05)}
            className="md:col-span-3 rounded-3xl p-8 flex flex-col gap-8"
            style={glass}
          >
            {/* Name + label */}
            <div>
              <h2 className="font-ui text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
                Alex Boyanov
              </h2>
              <p className="font-mono text-[11px] text-[#999] mt-1">Sofia, Bulgaria — works globally</p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.4)' }} />

            {/* Bio */}
            <div className="space-y-4 font-mono text-[12.5px] text-[#555] leading-[1.9]">
              <p>
                I make hyper-realistic campaign films for fashion, beverage, and lifestyle brands — without a studio, crew, or six-figure budget. The work looks like it was shot on location. It wasn&apos;t.
              </p>
              <p>
                The difference between AI content that looks generated and AI content that looks like a{' '}
                <span className="text-[#1a1a1a] font-medium">€30,000 production</span> is in how you direct it: the shot language, the light source, the subject behaviour, the film texture. I build those decisions the same way a director does on set.
              </p>
              <p>
                Before this I ran a streetwear brand in Sofia for five years — which taught me that how you present something matters as much as what it is.
              </p>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.4)' }} />

            {/* Timeline */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#999] uppercase mb-6">Journey</p>
              <div className="flex flex-col gap-5">
                {[
                  {
                    period: '2024 — Now',
                    title: 'AI Creative Director',
                    desc: 'Building full campaign productions for fashion, lifestyle and beverage brands using AI video tools.',
                    active: true,
                  },
                  {
                    period: '2019 — 2024',
                    title: 'Founder, The Culture Tokyo',
                    desc: 'Founded and ran a streetwear and sneaker brand in Sofia. Branding, campaigns, social, and full e-commerce operations.',
                    active: false,
                  },
                  {
                    period: 'Earlier',
                    title: 'VFX & Shopify Freelance',
                    desc: 'Freelance 3D/VFX work in Blender and Shopify development. Where I learned that making things look expensive is a skill.',
                    active: false,
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex flex-col items-center pt-1">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: item.active ? '#22c55e' : '#d0d0d0' }}
                      />
                      <span className="w-px flex-1 mt-1" style={{ background: 'rgba(0,0,0,0.08)' }} />
                    </div>
                    <div className="pb-2">
                      <p className="font-mono text-[10px] text-[#999] mb-1">{item.period}</p>
                      <p className="font-ui text-sm font-semibold text-[#1a1a1a] mb-1">{item.title}</p>
                      <p className="font-mono text-[11px] text-[#777] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/work-with-me"
              className="flex items-center justify-between px-6 py-4 rounded-2xl group transition-all mt-auto"
              style={{ background: 'rgba(200,56,42,0.10)', border: '1px solid rgba(200,56,42,0.22)' }}
            >
              <div>
                <p className="font-ui text-sm font-semibold text-[#1a1a1a]">Let's Build</p>
                <p className="font-mono text-[11px] text-[#888]">Open for projects &amp; collaborations</p>
              </div>
              <span className="font-mono text-sm text-[#c8382a] group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

          {/* ── RIGHT column ── */}
          <div className="md:col-span-2 flex flex-col gap-3">

            {/* Photo card */}
            <motion.div
              {...fade(0.1)}
              className="rounded-3xl overflow-hidden"
              style={{ ...glass, padding: 0 }}
            >
              <div className="relative w-full" style={{ height: 400 }}>
                <Image
                  src="/alex.png"
                  alt="Alex Boyanov"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '50% 8%' }}
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-20"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12))' }}
                />
              </div>
              <div className="px-6 py-5">
                <p className="font-ui text-sm font-semibold text-[#1a1a1a]">Alex Boyanov</p>
                <p className="font-mono text-[10px] text-[#c8382a] tracking-[0.12em] uppercase mt-0.5">
                  AI Creative Director
                </p>
              </div>
            </motion.div>

            {/* Skills card */}
            <motion.div
              {...fade(0.18)}
              className="rounded-3xl px-6 py-6"
              style={glass}
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#999] uppercase mb-5">Skills &amp; Tools</p>
              <div className="flex flex-col gap-2.5">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ background: '#c8382a' }}
                    />
                    <span className="font-mono text-[11px] text-[#555]">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Available badge */}
            <motion.div {...fade(0.24)} className="rounded-3xl px-6 py-5" style={glass}>
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <div>
                  <p className="font-mono text-[11px] text-[#1a1a1a] font-medium">Available for work</p>
                  <p className="font-mono text-[10px] text-[#999] mt-0.5">Open to new projects</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  )
}
