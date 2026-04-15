import type { Metadata } from 'next'
import WorkCard from '@/components/WorkCard'
import AnimatedSection from '@/components/AnimatedSection'
import { getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'AI campaign films, short films, and UGC series for fashion, lifestyle, and beverage brands.',
}

export default function WorkPage() {
  const projects = getAllProjects()

  return (
    <>
      <section className="pt-32 pb-12 px-6 md:px-10 max-w-7xl mx-auto">
        <AnimatedSection delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase mb-6">
            Selected Work
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-black leading-none text-text">
            Work
          </h1>
        </AnimatedSection>
      </section>

      <section className="px-6 md:px-10 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {projects.map((project, i) => (
            <div key={project.slug} className="bg-bg">
              <WorkCard project={project} index={i} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
