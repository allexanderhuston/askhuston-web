import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'

export const metadata: Metadata = {
  title: 'About',
  description:
    'AI Creative Director based in Sofia. Background in VFX, Blender, brand building, and streetwear.',
}

const services = [
  {
    title: 'AI Campaign Films',
    desc: 'Full 30–90 second campaign films. Fashion, beverage, lifestyle. Hyper-realistic, character-consistent, no studio.',
  },
  {
    title: 'UGC Series',
    desc: 'Conversion-first UGC content that looks authentic and performs like a produced ad. Built for paid social.',
  },
  {
    title: 'Brand Short Films',
    desc: '1–3 minute brand films with cinematic depth. Jacquemus-coded intimacy or raw documentary energy — your brief, my direction.',
  },
  {
    title: 'Speculative Campaigns',
    desc: 'Cold campaigns built for brands I want to work with. The work comes first. The conversation follows.',
  },
]

const tools = [
  'Kling 3.0',
  'Higgsfield Cinema Studio',
  'Nano Banana Pro',
  'Seedance',
  'ElevenLabs',
  'Premiere Pro',
  'Blender',
]

export default function About() {
  return (
    <>
      {/* HEADER */}
      <section className="pt-32 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        <AnimatedSection delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-8">
            About
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-black leading-none text-text max-w-4xl">
            A director, not a tool user.
          </h1>
        </AnimatedSection>
      </section>

      {/* BIO */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {/* Main bio */}
          <div className="md:col-span-2 bg-bg py-12 pr-0 md:pr-16">
            <AnimatedSection delay={0.1}>
              <div className="space-y-6 font-mono text-sm text-text/70 leading-[1.9] max-w-prose">
                <p>
                  I'm an AI Creative Director based in Sofia, Bulgaria. I make hyper-realistic
                  campaign films for fashion, beverage, and lifestyle brands — without a studio,
                  crew, or six-figure budget.
                </p>
                <p>
                  The work looks like it was shot on location. It wasn't. The difference between
                  AI content that looks generated and AI content that looks like a{' '}
                  <strong className="text-text font-medium">€30,000 production</strong> is in
                  how you direct it: the shot language, the light source, the subject behaviour,
                  the film texture. I build those decisions in the same way a director builds
                  them on set.
                </p>
                <p>
                  Before this, I founded and closed{' '}
                  <strong className="text-text font-medium">The Culture</strong> — a streetwear
                  and sneaker brand based in Sofia, operating from 2019 to 2024. That's where I
                  learned what brand-building actually requires: not just visual identity, but
                  the campaign thinking that makes a visual identity mean something.
                </p>
                <p>
                  I also have a background in VFX (Blender, freelance), Shopify development,
                  and social media strategy. The common thread is making things look like they
                  cost more than they did.
                </p>
                <p>
                  I'm based in Sofia.{' '}
                  <strong className="text-text font-medium">The work ships globally.</strong>
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="bg-surface border-l border-border p-8 space-y-10">
            <AnimatedSection delay={0.15}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-5">
                  Tools
                </p>
                <ul className="space-y-2">
                  {tools.map((tool) => (
                    <li
                      key={tool}
                      className="font-mono text-xs text-text/60 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-5">
                  Based In
                </p>
                <p className="font-mono text-xs text-text/60">Sofia, Bulgaria</p>
                <p className="font-mono text-xs text-muted">Works globally</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-5">
                  Available For
                </p>
                <ul className="space-y-2 font-mono text-xs text-text/60">
                  <li>Campaign direction</li>
                  <li>Art Director roles</li>
                  <li>Creative partnerships</li>
                  <li>Agency subcontracting</li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto pb-16">
        <AnimatedSection delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase mb-10">
            What I Build
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={0.1 + i * 0.05}>
              <div className="bg-bg border-0 p-8 md:p-10 h-full hover:bg-surface transition-colors duration-300">
                <h3 className="font-display text-xl font-bold text-text mb-4">
                  {service.title}
                </h3>
                <p className="font-mono text-xs text-muted leading-[1.9]">{service.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-4">
                  Let's work
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-black text-text">
                  Have a brand that needs a{' '}
                  <em className="italic">campaign?</em>
                </h2>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <Link
                  href="/contact"
                  className="bg-text text-bg font-ui text-sm font-bold tracking-[0.15em] uppercase px-10 py-4 hover:bg-accent hover:text-text transition-colors duration-300 text-center"
                >
                  Get in touch
                </Link>
                <a
                  href="https://instagram.com/askhuston"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border font-ui text-xs font-bold tracking-[0.15em] uppercase px-10 py-3 hover:border-text transition-colors text-center text-muted hover:text-text"
                >
                  @askhuston
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
