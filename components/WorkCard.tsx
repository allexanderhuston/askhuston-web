'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/projects'

interface WorkCardProps {
  project: Project
  index: number
}

export default function WorkCard({ project, index }: WorkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.19, 1, 0.22, 1],
      }}
    >
      <Link href={`/work/${project.slug}`} className="group block relative overflow-hidden">
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] overflow-hidden bg-surface">
          {/* Gradient cover — replaced by real image/video thumbnail when available */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.coverGradient} transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105`}
          />

          {/* Subtle noise overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />

          {/* In progress badge */}
          {project.status === 'in-progress' && (
            <div className="absolute top-4 right-4 bg-bg/80 border border-border px-2 py-1">
              <span className="font-mono text-[10px] text-muted tracking-[0.15em] uppercase">
                In Production
              </span>
            </div>
          )}

          {/* Hover content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
            <p
              className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
              style={{ color: project.accentColor }}
            >
              {project.category}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-text leading-tight">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-muted mt-1">
              {project.brand} — {project.year}
            </p>
          </div>
        </div>

        {/* Card label — visible by default, hidden on hover */}
        <div className="pt-4 pb-2 flex items-start justify-between group-hover:opacity-0 transition-opacity duration-300">
          <div>
            <h3 className="font-mono text-sm text-text/80 tracking-wide">
              {project.brand}
            </h3>
            <p className="font-mono text-[10px] text-muted tracking-[0.15em] uppercase mt-0.5">
              {project.category}
            </p>
          </div>
          <span className="font-mono text-xs text-muted mt-0.5">{project.year}</span>
        </div>
      </Link>
    </motion.div>
  )
}
