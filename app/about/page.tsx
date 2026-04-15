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
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.19, 1, 0.22, 1] },
})

function InstaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10V9h4v2a6 6 0 0 1 2-3z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.24l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
function TikTokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.77 0 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 12.67 0l-.01-8.83a8.18 8.18 0 0 0 4.78 1.52V4.55a4.85 4.85 0 0 1-2-.14z" />
    </svg>
  )
}

const skills = [
  'AI Campaign Direction',
  'AI Video Production',
  'Brand Strategy',
  'Kling 3.0',
  'Higgsfield',
  'Midjourney',
  'Blender / VFX',
  'Premiere Pro',
  'Shopify',
  'Art Direction',
  'ElevenLabs',
  'Paid Social',
]

const socials = [
  { icon: <InstaIcon />, label: 'Instagram', href: 'https://instagram.com/askhuston' },
  { icon: <TikTokIcon />, label: 'TikTok', href: 'https://tiktok.com/@askhuston' },
  { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://linkedin.com/in/alexanderboyanov' },
  { icon: <XIcon />, label: 'X', href: 'https://x.com/askhuston' },
]

export default function About() {
  return (
    <main className="min-h-screen pt-20 pb-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="md:col-span-3 flex flex-col gap-3">

            {/* Name + title card */}
            <motion.div {...fade(0.05)} className="rounded-3xl px-8 py-8" style={glass}>
              <p className="font-mono text-[10px] tracking-[0.25em] text-[#c8382a] uppercase mb-3">
                AI Creative Director
              </p>
              <h1 className="font-ui text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight mb-1">
                Alexander Huston
              </h1>
              <p className="font-mono text-[12px] text-[#999]">Sofia, Bulgaria — works globally</p>
            </motion.div>

            {/* Bio card */}
            <motion.div {...fade(0.12)} className="rounded-3xl px-8 py-8" style={glass}>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#999] uppercase mb-5">About</p>
              <div className="space-y-4 font-mono text-[12.5px] text-[#555] leading-[1.85]">
                <p>
                  I make hyper-realistic campaign films for fashion, beverage, and lifestyle brands — without a studio, crew, or six-figure budget. The work looks like it was shot on location. It wasn't.
                </p>
                <p>
                  The difference between AI content that looks generated and AI content that looks like a <span className="text-[#1a1a1a] font-medium">€30,000 production</span> is in how you direct it: the shot language, the light source, the subject behaviour, the film texture. I build those decisions the same way a director does on set.
                </p>
              </div>
            </motion.div>

            {/* Timeline card */}
            <motion.div {...fade(0.18)} className="rounded-3xl px-8 py-8" style={glass}>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#999] uppercase mb-6">Journey</p>
              <div className="flex flex-col gap-6">
                {[
                  {
                    period: '2024 — Now',
                    title: 'AI Creative Director',
                    desc: 'Building full campaign productions for fashion, lifestyle and beverage brands using AI video tools. Speculative campaigns, client work, and creative partnerships.',
                    active: true,
                  },
                  {
                    period: '2019 — 2024',
                    title: 'Founder, The Culture Tokyo',
                    desc: 'Founded and ran a streetwear and sneaker brand in Sofia. Handled branding, campaign direction, social, and full e-commerce operations.',
                    active: false,
                  },
                  {
                    period: 'Earlier',
                    title: 'VFX & Shopify Freelance',
                    desc: 'Freelance 3D/VFX work in Blender and Shopify development. Where I learned that making things look expensive is a skill on its own.',
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
            </motion.div>

            {/* Skills card */}
            <motion.div {...fade(0.24)} className="rounded-3xl px-8 py-8" style={glass}>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#999] uppercase mb-5">Skills & Tools</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] text-[#555] px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.7)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div {...fade(0.28)}>
              <Link
                href="/work-with-me"
                className="flex items-center justify-between px-8 py-5 rounded-3xl group transition-all"
                style={{ ...glass, background: 'rgba(200,56,42,0.12)', border: '1px solid rgba(200,56,42,0.25)' }}
              >
                <div>
                  <p className="font-ui text-sm font-semibold text-[#1a1a1a]">Work with me</p>
                  <p className="font-mono text-[11px] text-[#888]">Open for projects & collaborations</p>
                </div>
                <span className="font-mono text-sm text-[#c8382a] group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="md:col-span-2 flex flex-col gap-3">

            {/* Photo card */}
            <motion.div
              {...fade(0.08)}
              className="rounded-3xl overflow-hidden"
              style={{ ...glass, padding: 0 }}
            >
              <div className="relative w-full" style={{ height: '480px' }}>
                <Image
                  src="/alex.png"
                  alt="Alex Boyanov"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '50% 8%' }}
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                {/* Subtle bottom fade */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15))' }}
                />
              </div>
              {/* Name below photo inside card */}
              <div className="px-6 py-5">
                <p className="font-ui text-sm font-semibold text-[#1a1a1a]">Alex Boyanov</p>
                <p className="font-mono text-[10px] text-[#c8382a] tracking-[0.12em] uppercase mt-0.5">AI Creative Director</p>
              </div>
            </motion.div>

            {/* Socials card */}
            <motion.div {...fade(0.16)} className="rounded-3xl px-6 py-6" style={glass}>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#999] uppercase mb-4">Follow</p>
              <div className="grid grid-cols-2 gap-3">
                {socials.map(({ icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-3 rounded-2xl text-[#555] hover:text-[#1a1a1a] transition-all group"
                    style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.6)' }}
                  >
                    {icon}
                    <span className="font-mono text-[10px]">{label}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Available badge */}
            <motion.div {...fade(0.22)} className="rounded-3xl px-6 py-5" style={glass}>
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
