import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AnimatedSection from '@/components/AnimatedSection'
import VideoEmbed from '@/components/VideoEmbed'
import { getProjectBySlug, getAllProjects, getAdjacentProjects } from '@/lib/projects'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}

  return {
    title: `${project.title} — ${project.brand}`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — ${project.brand} | @askhuston`,
      description: project.tagline,
    },
  }
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const { prev, next } = getAdjacentProjects(params.slug)

  return (
    <>
      {/* PROJECT HEADER */}
      <section className="pt-32 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        <AnimatedSection delay={0.1}>
          <Link
            href="/work"
            className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-muted hover:text-text transition-colors uppercase mb-12 group"
          >
            <span className="block w-6 h-px bg-current group-hover:w-3 transition-all duration-300" />
            All work
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
            <div>
              <p
                className="font-mono text-[10px] tracking-[0.2em] uppercase mb-4"
                style={{ color: project.accentColor }}
              >
                {project.category} — {project.year}
              </p>
              <h1 className="font-display text-[clamp(2.5rem,7vw,7rem)] font-black leading-none text-text">
                {project.title}
              </h1>
            </div>
            <p className="font-mono text-sm text-muted md:text-right max-w-xs">
              {project.brand}
            </p>
          </div>
        </AnimatedSection>

        {project.status === 'in-progress' && (
          <AnimatedSection delay={0.25}>
            <div className="mt-4 inline-flex items-center gap-2 border border-border px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.15em] text-muted uppercase">
                In Production
              </span>
            </div>
          </AnimatedSection>
        )}
      </section>

      {/* HERO MEDIA */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto mb-6">
        <AnimatedSection delay={0.3}>
          {project.videoUrl && project.embedType ? (
            <VideoEmbed
              videoUrl={project.videoUrl}
              embedType={project.embedType}
              title={`${project.title} — ${project.brand}`}
            />
          ) : (
            /* Gradient placeholder — replace with <Image> when media is ready */
            <div
              className={`relative aspect-video bg-gradient-to-br ${project.coverGradient} overflow-hidden`}
            >
              <div className="absolute inset-0 flex items-end p-8 md:p-12">
                <div>
                  <p
                    className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2 opacity-60"
                    style={{ color: project.accentColor }}
                  >
                    Media placeholder
                  </p>
                  <p className="font-mono text-xs text-text/40 max-w-sm leading-relaxed">
                    Replace this gradient with the campaign video or hero image.
                    Drop the file in /public/work/{project.slug}/ and update{' '}
                    lib/projects.ts
                  </p>
                </div>
              </div>
            </div>
          )}
        </AnimatedSection>
      </section>

      {/* PROJECT DETAILS */}
      <section className="px-6 md:px-10 max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {/* Tagline */}
          <div className="md:col-span-2 bg-bg pr-0 md:pr-16 pt-0 md:pt-0 pb-12 md:pb-0">
            <AnimatedSection delay={0.1}>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-6">
                Project
              </p>
              <p className="font-display text-xl md:text-2xl font-bold text-text leading-snug mb-10 max-w-xl">
                {project.tagline}
              </p>
            </AnimatedSection>
          </div>

          {/* Tools sidebar */}
          <div className="bg-surface border-l border-border pl-8 pt-8 pb-8 pr-8">
            <AnimatedSection delay={0.15}>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-4">
                Tools
              </p>
              <ul className="space-y-2">
                {project.tools.map((tool) => (
                  <li
                    key={tool}
                    className="font-mono text-xs text-text/70 flex items-center gap-2"
                  >
                    <span
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    {tool}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>

        {/* Brief + Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mt-px">
          <div className="bg-bg py-10 pr-0 md:pr-12">
            <AnimatedSection delay={0.2}>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-5">
                The Brief
              </p>
              <p className="font-mono text-sm text-text/70 leading-[1.9] max-w-prose">
                {project.brief}
              </p>
            </AnimatedSection>
          </div>

          <div className="bg-surface border-l border-border py-10 pl-8 pr-8">
            <AnimatedSection delay={0.25}>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase mb-5">
                The Approach
              </p>
              <p className="font-mono text-sm text-text/70 leading-[1.9]">
                {project.approach}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* NEXT / PREV NAV */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group bg-bg hover:bg-surface transition-colors p-8 md:p-12 flex flex-col gap-4"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                ← Previous
              </p>
              <div>
                <p className="font-mono text-xs text-muted mb-1">{prev.brand}</p>
                <h3 className="font-display text-2xl font-bold text-text group-hover:text-accent transition-colors">
                  {prev.title}
                </h3>
              </div>
            </Link>
          ) : (
            <div className="bg-bg p-8 md:p-12" />
          )}

          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group bg-bg hover:bg-surface transition-colors p-8 md:p-12 flex flex-col items-end gap-4 border-l border-border"
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                Next →
              </p>
              <div className="text-right">
                <p className="font-mono text-xs text-muted mb-1">{next.brand}</p>
                <h3 className="font-display text-2xl font-bold text-text group-hover:text-accent transition-colors">
                  {next.title}
                </h3>
              </div>
            </Link>
          ) : (
            <div className="bg-bg p-8 md:p-12 border-l border-border" />
          )}
        </div>
      </section>
    </>
  )
}
