'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Reveal from '@/components/Reveal'
import { glass } from '@/lib/glass'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.19, 1, 0.22, 1] },
})

const skills = [
  'Creative Direction',
  'Campaign Production',
  'Brand Strategy',
  'Art Direction',
  'Video Direction',
  'Social Content',
  'Communications',
]

const chapters = [
  {
    label: 'Chapter I',
    heading: 'I learned how businesses talk.',
    body: 'Spent years in communications and client management. Wrote the emails, managed the relationships, kept things running. Boring on the surface. But it taught me something most creatives never get: how decisions actually get made, and what it takes to convince someone to spend money on something.',
  },
  {
    label: 'Chapter II',
    heading: 'Then I picked up a camera.',
    body: 'Moved into video and photo production. Filmed at music festivals across Europe, produced content for brands, learned that visual storytelling is a completely different kind of intelligence. You cannot fake knowing what a good frame looks like.',
  },
  {
    label: 'Chapter III',
    heading: 'Then I built a brand from nothing.',
    body: 'Five years running a fashion brand in Sofia. Did every job myself at least once: art direction, campaigns, paid ads, retail, operations. By the end I understood something most creative directors never have to: what it feels like when the work has to pay for itself.',
  },
]

const beliefs = [
  {
    n: '01',
    title: 'Direction is everything.',
    body: 'The tool is not the skill. Anyone can run a prompt. Very few people know how to frame a shot, control a light source or make a subject feel like it actually exists in the world. That gap is where all the value is.',
  },
  {
    n: '02',
    title: 'Budget is not quality.',
    body: 'I spent five years watching brands burn money on productions that looked expensive and said nothing. The work that moves people is almost never the most expensive work. It is the most considered.',
  },
  {
    n: '03',
    title: 'Brands are built slowly.',
    body: 'One great campaign is a moment. A point of view held across every piece of content is what builds trust. I ran my own brand long enough to know that consistency beats virality every time.',
  },
]

export default function TheHuman() {
  return (
    <main className="min-h-screen pb-24">

      {/* ── MOBILE HERO — full-bleed photo, name overlaid, visible without scrolling ── */}
      <div className="md:hidden relative w-full aspect-[4/5]">
        <Image
          src="/alex.png"
          alt="Alexander Huston"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: '50% 0%' }}
          sizes="100vw"
        />
        {/* top gradient so nav text is readable */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
        {/* bottom gradient for name overlay */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        {/* name */}
        <div className="absolute bottom-5 left-5 right-5">
          <h2 className="font-display text-3xl font-bold text-white leading-tight">Alexander Huston</h2>
          <p className="font-mono text-[10px] text-[#c8382a] tracking-[0.14em] uppercase mt-1">Creative Director · Sofia</p>
        </div>
      </div>

      {/* Desktop page header */}
      <motion.div {...fade(0)} className="hidden md:flex items-baseline gap-4 px-6 md:px-10 pt-10 pb-6">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-t1 leading-none">the human</h1>
        <span className="font-mono text-[13px] text-[#c8382a] tracking-[0.12em]">03</span>
      </motion.div>

      {/* Mobile page label — compact, below the hero */}
      <div className="md:hidden flex items-baseline gap-3 px-5 pt-4 pb-2">
        <h1 className="font-display text-3xl font-bold text-t1 leading-none">the human</h1>
        <span className="font-mono text-[13px] text-[#c8382a] tracking-[0.12em]">03</span>
      </div>

      <div className="max-w-5xl mx-auto px-5 md:px-10 flex flex-col gap-3">

        {/* ── TOP GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:items-stretch">

          {/* LEFT — bio card */}
          <motion.div
            {...fade(0.05)}
            className="md:col-span-3 rounded-3xl p-6 md:p-8 flex flex-col gap-6 md:gap-8 md:h-full"
            style={glass}
          >
            {/* Name — desktop only (mobile has it in the hero photo) */}
            <div className="hidden md:block">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-t1 leading-tight">
                Alexander Huston
              </h2>
              <p className="font-mono text-[11px] text-t5 mt-1">Based in Sofia. Works everywhere.</p>
            </div>

            <div className="hidden md:block" style={{ height: 1, background: 'var(--divider)' }} />

            <div className="space-y-4 font-mono text-[12px] md:text-[12.5px] text-t2 leading-[1.9]">
              <p>
                I direct creative campaigns powered by AI. While most people are still figuring out how to use it for basic tasks, I am using it to produce full brand campaigns, videos, visuals and social content that used to require big teams and bigger budgets. Faster, sharper and at a fraction of the cost.
              </p>
              <p>
                Most AI content gets clocked in three seconds. Wrong light, weightless objects, subjects that do not inhabit the frame. I have spent years learning how to remove every single one of those tells. The difference between content that looks generated and a campaign that looks like a real production is entirely in how you direct it.
              </p>
              <p>
                Business experience, production skills and a real understanding of AI. I do not just make things look good. I make things that work.
              </p>
            </div>

            <div style={{ height: 1, background: 'var(--divider)' }} />

            {/* CTA */}
            <div className="flex flex-col gap-3 md:mt-auto">
              <Link
                href="/work-with-me"
                className="flex items-center justify-between px-5 py-4 rounded-2xl group transition-all"
                style={{ background: 'rgba(200,56,42,0.10)', border: '1px solid rgba(200,56,42,0.22)' }}
              >
                <div>
                  <p className="font-display text-sm font-semibold text-t1">Let&apos;s build something cool</p>
                  <p className="font-mono text-[11px] text-t4">if you&apos;ve got something worth building</p>
                </div>
                <span className="font-mono text-sm text-[#c8382a] group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <a
                href="https://www.linkedin.com/in/alexanderboyanov/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-t5 hover:text-t3 transition-colors text-center tracking-wide"
              >
                full background on LinkedIn ↗
              </a>
            </div>
          </motion.div>

          {/* RIGHT column — photo hidden on mobile (handled by hero above) */}
          <div className="md:col-span-2 flex flex-col gap-3 md:h-full">

            {/* Photo — desktop only */}
            <Reveal className="hidden md:block rounded-3xl overflow-hidden" style={{ ...glass, padding: 0 }}>
              <div className="relative w-full" style={{ height: 320 }}>
                <Image
                  src="/alex.png"
                  alt="Alexander Huston"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '50% 20%' }}
                  sizes="40vw"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-24"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.18))' }}
                />
              </div>
              <div className="px-6 py-5">
                <p className="font-display text-sm font-semibold text-t1">Alexander Huston</p>
                <p className="font-mono text-[10px] text-[#c8382a] tracking-[0.12em] uppercase mt-0.5">
                  Creative Director
                </p>
              </div>
            </Reveal>

            {/* Skills */}
            <Reveal delay={0.08} className="rounded-3xl px-6 py-6 md:flex-1" style={glass}>
              <p className="font-mono text-[10px] tracking-[0.2em] text-t5 uppercase mb-4">What I do</p>
              <p className="font-mono text-[11.5px] text-t2 leading-relaxed mb-5">
                Started in communications, moved into production, built a fashion brand from zero and ran it for five years. AI just means I can now do all of that without waiting on anyone else.
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] text-t3 px-3 py-1.5 rounded-full"
                    style={{ background: 'var(--chip-bg)', border: '1px solid var(--chip-border)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>

          </div>
        </div>

        {/* ── THREE CHAPTERS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {chapters.map((ch, i) => (
            <Reveal key={ch.label} delay={i * 0.07} className="rounded-3xl px-6 py-6 md:px-7 md:py-7 flex flex-col gap-3" style={glass}>
              <span className="font-mono text-[10px] text-[#c8382a] tracking-[0.15em]">{ch.label}</span>
              <p className="font-display text-sm font-semibold text-t1 leading-snug">{ch.heading}</p>
              <p className="font-mono text-[11px] text-t4 leading-relaxed">{ch.body}</p>
            </Reveal>
          ))}
        </div>

        {/* ── THREE BELIEFS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {beliefs.map((b, i) => (
            <Reveal key={b.n} delay={i * 0.06} className="rounded-3xl px-6 py-6 md:px-7 md:py-7 flex flex-col gap-4" style={glass}>
              <span className="font-mono text-[10px] text-t6 tracking-[0.15em]">{b.n}</span>
              <p className="font-display text-sm font-semibold text-t1 leading-snug">{b.title}</p>
              <p className="font-mono text-[11px] text-t4 leading-relaxed">{b.body}</p>
            </Reveal>
          ))}
        </div>

      </div>
    </main>
  )
}
