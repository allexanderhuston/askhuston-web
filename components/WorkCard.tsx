'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/projects'
import { useCursor } from '@/lib/cursor-context'

interface WorkCardProps {
  project: Project
  index: number
  isDragging?: React.MutableRefObject<boolean>
}

const glass = {
  background: 'rgba(255,255,255,0.35)',
  backdropFilter: 'blur(40px) saturate(200%)',
  WebkitBackdropFilter: 'blur(40px) saturate(200%)',
  border: '1px solid rgba(255,255,255,0.5)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
}

export default function WorkCard({ project, index, isDragging }: WorkCardProps) {
  const { setState } = useCursor()

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="h-full"
    >
      <Link
        href={`/work/${project.slug}`}
        onClick={(e) => { if (isDragging?.current) e.preventDefault() }}
        onMouseEnter={() => setState('view-project')}
        onMouseLeave={() => setState('default')}
        className="group flex flex-col h-full rounded-2xl overflow-hidden"
        style={glass}
      >
        {/* Gradient fill — top portion */}
        <div className={`relative bg-gradient-to-br ${project.coverGradient} overflow-hidden`} style={{ height: '62%' }}>
          {/* Noise */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

          {/* Category — top left */}
          <div className="absolute top-4 left-5">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: project.accentColor }}>
              {project.category}
            </span>
          </div>

          {/* In Production badge */}
          {project.status === 'in-progress' && (
            <div
              className="absolute top-3 right-4 px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <span className="font-mono text-[8px] text-white/80 tracking-[0.15em] uppercase">In Production</span>
            </div>
          )}

          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.18))' }}
          />
        </div>

        {/* Info section */}
        <div className="flex flex-col justify-between flex-1 px-5 py-5">
          <div className="flex flex-col gap-1.5">
            <span className="font-ui text-base font-semibold text-[#1a1a1a] leading-tight">{project.brand}</span>
            <span className="font-mono text-[11px] text-[#888] leading-relaxed">{project.tagline}</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="font-mono text-[10px] text-[#bbb]">{project.year}</span>
            <span className="font-mono text-[11px] text-[#888] group-hover:text-[#1a1a1a] transition-colors">View →</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
