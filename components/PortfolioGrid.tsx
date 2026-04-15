'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/projects'

const glass = {
  background: 'rgba(255,255,255,0.35)',
  backdropFilter: 'blur(40px) saturate(200%)',
  WebkitBackdropFilter: 'blur(40px) saturate(200%)',
  border: '1px solid rgba(255,255,255,0.5)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group flex flex-col rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
        style={glass}
      >
        {/* Visual — image or gradient */}
        <div className="relative w-full overflow-hidden" style={{ height: '220px' }}>
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.brand}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${project.coverGradient} transition-transform duration-500 group-hover:scale-105`}>
              <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
            </div>
          )}

          {/* In Production badge */}
          {project.status === 'in-progress' && (
            <div
              className="absolute top-3 right-3 px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              <span className="font-mono text-[8px] text-white/80 tracking-[0.15em] uppercase">In Production</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-ui text-sm font-semibold text-[#1a1a1a] leading-tight">{project.brand}</span>
            <span
              className="font-mono text-[9px] tracking-[0.15em] uppercase shrink-0"
              style={{ color: project.accentColor }}
            >
              {project.category}
            </span>
          </div>
          <p className="font-mono text-[11px] text-[#888] leading-relaxed line-clamp-1">
            {project.tagline}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="pt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
