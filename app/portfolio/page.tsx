import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/projects'
import PortfolioGrid from '@/components/PortfolioGrid'

export const metadata: Metadata = {
  title: 'Portfolio — @askhuston',
  description:
    'AI-generated campaigns for fashion, lifestyle, and beverage brands.',
}

export default function Portfolio() {
  const projects = getAllProjects()

  return (
    <main className="min-h-screen pt-20 pb-16 px-4 md:px-6">
      <PortfolioGrid projects={projects} />
    </main>
  )
}
