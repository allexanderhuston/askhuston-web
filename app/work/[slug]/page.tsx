import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllProjects, getAdjacentProjects } from '@/lib/projects'
import ProjectPage from '@/components/ProjectPage'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: project.brand,
    description: project.tagline,
    openGraph: {
      title: `${project.brand} — Alexander Huston`,
      description: project.tagline,
      type: 'article',
      ...(project.coverImage ? { images: [{ url: project.coverImage, alt: project.brand }] } : {}),
    },
  }
}

export default function Page({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()
  const { prev, next } = getAdjacentProjects(params.slug)
  return <ProjectPage project={project} next={next} prev={prev} />
}
