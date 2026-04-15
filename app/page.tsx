import type { Metadata } from 'next'
import Link from 'next/link'
import WorkCard from '@/components/WorkCard'
import AnimatedSection from '@/components/AnimatedSection'
import { getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Alex Boyanov — AI Creative Director',
  description:
    'AI Creative Director based in Sofia. I make hyper-realistic campaigns for fashion, lifestyle, and beverage brands — no studio, no crew, full production value.',
}

export default function Home() {
  const projects = getAllProjects()

  return (
    <>
      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-end px-6 md:px-10 pb-16 md:pb-24 pt-32 max-w-7xl mx-auto">
        <AnimatedSection delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase mb-8">
            AI Creative Director — Sofia, Bulgaria
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] font-black leading-[0.9] text-text mb-8 max-w-5xl">
            Alex{' '}
            <em className="italic not-italic text-text/30">
              Boyanov
            </em>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <p className="font-mono text-sm md:text-base text-muted max-w-lg leading-relaxed mb-12">
            i make campaigns that don't look AI-generated. fashion,
            lifestyle, beverage — no studio, no crew, full production
            value.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.45}>
          <div className="flex items-center gap-8">
            <Link
              href="/work"
              className="group flex items-center gap-3 font-ui text-xs tracking-[0.15em] uppercase text-text hover:text-accent transition-colors"
            >
              <span>View Work</span>
              <span className="block w-8 h-px bg-current transition-all duration-300 group-hover:w-12" />
            </Link>
            <Link
              href="/contact"
              className="font-ui text-xs tracking-[0.15em] uppercase text-muted hover:text-text transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </AnimatedSection>

        {/* Scroll indicator */}
        <AnimatedSection delay={0.6} className="mt-auto pt-24">
          <div className="flex items-center gap-3">
            <div className="w-px h-12 bg-border" />
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted/50 uppercase">
              Scroll
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* WORK GRID */}
      <section className="px-6 md:px-10 pb-32 max-w-7xl mx-auto">
        <AnimatedSection delay={0.1}>
          <div className="flex items-center justify-between mb-10">
            <p className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
              Selected Work
            </p>
            <Link
              href="/work"
              className="font-mono text-[10px] tracking-[0.15em] text-muted hover:text-text transition-colors uppercase"
            >
              All projects →
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {projects.map((project, i) => (
            <div key={project.slug} className="bg-bg">
              <WorkCard project={project} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase mb-4">
                  Available for campaigns
                </p>
                <h2 className="font-display text-4xl md:text-6xl font-black text-text max-w-xl leading-tight">
                  Got a brand that needs a{' '}
                  <em className="italic">campaign?</em>
                </h2>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 bg-text text-bg font-ui text-sm font-bold tracking-[0.15em] uppercase px-10 py-4 hover:bg-accent hover:text-text transition-colors duration-300"
              >
                Let's talk
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
