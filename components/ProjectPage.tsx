'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/lib/projects'
import VideoEmbed from '@/components/VideoEmbed'

const glass = {
  background: 'rgba(255,255,255,0.35)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.6)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: [0.19, 1, 0.22, 1] },
})

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] tracking-[0.18em] text-[#c8382a] uppercase mb-4">{children}</p>
}

export default function ProjectPage({ project, next, prev }: { project: Project; next: Project | null; prev: Project | null }) {
  const router = useRouter()

  return (
    <main className="min-h-screen pt-20 pb-20 px-6 md:px-10">

      {/* Back */}
      <motion.div {...fade(0)} className="mb-8">
        <button
          onClick={() => router.back()}
          className="font-mono text-[10px] text-[#bbb] hover:text-[#c8382a] transition-colors tracking-[0.1em]"
        >
          ← back to work
        </button>
      </motion.div>

      {/* Video / Hero */}
      <motion.div {...fade(0.05)} className="mb-6">
        {project.videoUrl && project.embedType ? (
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>
            <VideoEmbed videoUrl={project.videoUrl} embedType={project.embedType} title={`${project.brand} — ${project.title}`} />
          </div>
        ) : (
          <div
            className={`w-full rounded-2xl bg-gradient-to-br ${project.coverGradient} flex items-end p-8 md:p-12`}
            style={{ aspectRatio: '16/9' }}
          >
            <div>
              <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/40 mb-1">video coming soon</p>
              <p className="font-mono text-[11px] text-white/25">add a Vimeo URL to lib/projects.ts to embed here</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Title block */}
      <motion.div {...fade(0.08)} className="rounded-3xl p-8 md:p-10 mb-6" style={glass}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: project.accentColor }}>
                {project.category}
              </span>
              <span className="font-mono text-[9px] text-[#ccc]">·</span>
              <span className="font-mono text-[9px] text-[#bbb] tracking-[0.1em]">{project.year}</span>
              {project.status === 'in-progress' && (
                <>
                  <span className="font-mono text-[9px] text-[#ccc]">·</span>
                  <span className="font-mono text-[9px] tracking-[0.12em] uppercase" style={{ color: '#c8382a' }}>in production</span>
                </>
              )}
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[#1a1a1a] leading-none mb-2">
              {project.brand}
            </h1>
            <p className="font-display text-xl md:text-2xl font-medium text-[#888] leading-snug">{project.title}</p>
          </div>
          <p className="font-mono text-[12px] text-[#666] leading-relaxed max-w-sm md:text-right">
            {project.tagline}
          </p>
        </div>
      </motion.div>

      {/* Brief + Approach */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div {...fade(0.10)} className="rounded-3xl p-8" style={glass}>
          <SectionLabel>the brief</SectionLabel>
          <p className="font-mono text-[12px] text-[#555] leading-relaxed">{project.brief}</p>
        </motion.div>
        <motion.div {...fade(0.12)} className="rounded-3xl p-8" style={glass}>
          <SectionLabel>the approach</SectionLabel>
          <p className="font-mono text-[12px] text-[#555] leading-relaxed">{project.approach}</p>
        </motion.div>
      </div>

      {/* Stills */}
      <motion.div {...fade(0.14)} className="rounded-3xl p-8 mb-6" style={glass}>
        <div className="flex items-baseline justify-between mb-6">
          <SectionLabel>stills</SectionLabel>
          <span className="font-mono text-[9px] text-[#bbb]">
            {project.images?.length ? `${project.images.length} frames` : 'coming soon'}
          </span>
        </div>

        {project.images?.length ? (
          <div className="columns-2 md:columns-3 gap-3">
            {project.images.map((src, i) => (
              <div key={i} className="relative mb-3 rounded-xl overflow-hidden break-inside-avoid group">
                <Image
                  src={src}
                  alt={`${project.brand} still ${i + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl bg-gradient-to-br ${project.coverGradient}`}
                style={{ opacity: 0.1 + i * 0.05 }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Tools */}
      <motion.div {...fade(0.16)} className="rounded-3xl p-8 mb-6" style={glass}>
        <SectionLabel>tools</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {project.tools.map(tool => (
            <span
              key={tool}
              className="font-mono text-[9px] tracking-[0.1em] uppercase px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.08)', color: '#666' }}
            >
              {tool}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Prev / Next */}
      {(prev || next) && (
        <motion.div {...fade(0.18)} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="group rounded-2xl p-6 flex flex-col gap-2 transition-all hover:-translate-y-0.5" style={glass}>
              <span className="font-mono text-[9px] text-[#bbb] tracking-[0.1em]">← previous</span>
              <span className="font-display text-lg font-bold text-[#1a1a1a] group-hover:text-[#c8382a] transition-colors">{prev.brand}</span>
              <span className="font-mono text-[10px] text-[#888]">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/work/${next.slug}`} className="group rounded-2xl p-6 flex flex-col items-end gap-2 transition-all hover:-translate-y-0.5" style={glass}>
              <span className="font-mono text-[9px] text-[#bbb] tracking-[0.1em]">next →</span>
              <span className="font-display text-lg font-bold text-[#1a1a1a] group-hover:text-[#c8382a] transition-colors">{next.brand}</span>
              <span className="font-mono text-[10px] text-[#888]">{next.title}</span>
            </Link>
          ) : <div />}
        </motion.div>
      )}

    </main>
  )
}
