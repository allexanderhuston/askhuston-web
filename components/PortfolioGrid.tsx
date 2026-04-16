'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import type { Project, ProjectCategory } from '@/lib/projects'
import type { Photo } from '@/lib/photos'
import type { Influencer } from '@/lib/influencers'
import { useCursor } from '@/lib/cursor-context'
import InfluencerBoard from '@/components/InfluencerBoard'
import { glass } from '@/lib/glass'

const VIDEO_FILTERS: { label: string; value: ProjectCategory | 'all' }[] = [
  { label: 'all', value: 'all' },
  { label: 'campaign', value: 'Speculative Campaign' },
  { label: 'ugc', value: 'UGC Series' },
  { label: 'ai influencer', value: 'AI Influencer' },
]

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { setState } = useCursor()
  const isEven = index % 2 === 0
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 150, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 150, damping: 22 })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(x * 6)
    rotateX.set(-y * 6)
  }

  function onMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="rounded-2xl overflow-hidden"
      style={{
        rotateX: springX,
        rotateY: springY,
        perspective: 1000,
        ...glass,
      }}
    >
      <Link
        href={`/work/${project.slug}`}
        onMouseEnter={() => setState('view-project')}
        onMouseLeave={() => setState('default')}
        className={`group flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-stretch min-h-[320px] md:min-h-[380px]`}
      >
        <div className={`relative w-[55%] overflow-hidden shrink-0 ${isEven ? 'rounded-l-2xl' : 'rounded-r-2xl'}`}>
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.brand}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="55vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${project.coverGradient} transition-transform duration-700 group-hover:scale-105`} />
          )}
          {project.status === 'in-progress' && (
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full"
              style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <span className="font-mono text-[8px] text-white/70 tracking-[0.15em] uppercase">In Production</span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between px-10 py-10">
          <div className="flex items-start justify-between gap-4">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: project.accentColor }}>
              {project.category}
            </span>
            <span className="font-mono text-[11px] text-t7">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] text-t5">{project.year}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-t1 leading-tight group-hover:text-[#c8382a] transition-colors duration-300">
              {project.brand}
            </h2>
            <p className="font-mono text-[12px] text-t3 leading-relaxed max-w-xs">
              {project.tagline}
            </p>
          </div>
          <div className="flex items-center gap-2 text-t6 group-hover:text-[#c8382a] transition-colors duration-300">
            <span className="font-mono text-[10px] tracking-[0.12em] uppercase">view project</span>
            <span className="text-xs">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function PhotoGrid({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-mono text-[12px] text-t6 py-24 text-center"
      >
        photos coming soon
      </motion.p>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="columns-2 md:columns-3 lg:columns-4 gap-3"
    >
      {photos.map((photo, i) => (
        <motion.div
          key={photo.src}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="relative mb-3 rounded-xl overflow-hidden break-inside-avoid"
          style={glass}
        >
          <Image
            src={photo.src}
            alt={photo.alt ?? ''}
            width={600}
            height={800}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

type Tab = 'motion' | 'stills'

export default function PortfolioGrid({ projects, photos, influencers }: { projects: Project[]; photos: Photo[]; influencers: Influencer[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [tab, setTab] = useState<Tab>((searchParams.get('tab') as Tab) ?? 'motion')
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | 'all'>(
    (searchParams.get('filter') as ProjectCategory | 'all') ?? 'all'
  )

  // Sync state → URL whenever tab or filter changes
  useEffect(() => {
    const params = new URLSearchParams()
    if (tab !== 'motion') params.set('tab', tab)
    if (activeFilter !== 'all') params.set('filter', activeFilter)
    const qs = params.toString()
    router.replace(qs ? `/portfolio?${qs}` : '/portfolio', { scroll: false })
  }, [tab, activeFilter])

  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter)

  return (
    <div>
      {/* Header */}
      <div className="flex items-baseline gap-4 px-6 md:px-10 pt-10 pb-6">
        <h1 className="font-display text-5xl md:text-6xl font-bold text-t1 leading-none">work</h1>
        <span className="font-mono text-[13px] text-[#c8382a] tracking-[0.12em]">01</span>
        {tab === 'motion' && (
          <span className="font-mono text-[10px] text-t6 tracking-[0.15em] uppercase ml-auto">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </span>
        )}
        {tab === 'stills' && (
          <span className="font-mono text-[10px] text-t6 tracking-[0.15em] uppercase ml-auto">
            {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
          </span>
        )}
      </div>

      {/* Tab toggle */}
      <div className="px-6 md:px-10 pb-5 flex items-center gap-1">
        <div
          className="flex items-center gap-1 p-1 rounded-full"
          style={{
            background: 'rgba(255,255,255,0.4)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          {(['motion', 'stills'] as Tab[]).map((t) => (
            <motion.button
              key={t}
              onClick={() => setTab(t)}
              whileTap={{ scale: 0.93 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="relative px-5 py-1.5 rounded-full font-display text-[12px] font-medium transition-colors duration-200"
              style={{ color: tab === t ? '#1a1a1a' : '#999' }}
            >
              {tab === t && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(255,255,255,1)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1)',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 42 }}
                />
              )}
              <span className="relative z-10">{t}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'motion' && (
          <motion.div
            key="motion"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {/* Video filters */}
            <div className="px-6 md:px-10 pb-6 flex flex-wrap gap-2">
              {VIDEO_FILTERS.map(({ label, value }) => (
                <motion.button
                  key={value}
                  onClick={() => setActiveFilter(value)}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="relative px-4 py-1.5 rounded-full font-mono text-[10px] tracking-[0.1em] transition-colors duration-200"
                  style={{ color: activeFilter === value ? '#1a1a1a' : '#999' }}
                >
                  {activeFilter === value && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(255,255,255,0.9)',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1)',
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 42 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </motion.button>
              ))}
            </div>

            {/* Influencer board or project rows */}
            {activeFilter === 'AI Influencer' ? (
              <div className="px-6 md:px-10 pb-10">
                <InfluencerBoard influencers={influencers} />
              </div>
            ) : (
              <div className="flex flex-col gap-3 px-6 md:px-10 pb-10">
                <AnimatePresence mode="popLayout">
                  {filtered.map((project, i) => (
                    <ProjectRow key={project.slug} project={project} index={i} />
                  ))}
                  {filtered.length === 0 && (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-[12px] text-t6 py-16 text-center"
                    >
                      nothing here yet — check back soon
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}

        {tab === 'stills' && (
          <motion.div
            key="stills"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="px-6 md:px-10 pb-10"
          >
            <PhotoGrid photos={photos} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
