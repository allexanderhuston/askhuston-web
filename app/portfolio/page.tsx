import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getAllProjects } from '@/lib/projects'
import photos from '@/lib/photos'
import { getAllInfluencers } from '@/lib/influencers'
import PortfolioGrid from '@/components/PortfolioGrid'

export const metadata: Metadata = {
  title: 'Portfolio — @askhuston',
  description:
    'AI-generated campaigns for fashion, lifestyle, and beverage brands.',
}

export default function Portfolio() {
  const projects = getAllProjects()
  const influencers = getAllInfluencers()

  return (
    <main className="min-h-screen pt-16">
      <Suspense>
        <PortfolioGrid projects={projects} photos={photos} influencers={influencers} />
      </Suspense>
    </main>
  )
}
