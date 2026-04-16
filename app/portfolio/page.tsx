import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getAllProjects } from '@/lib/projects'
import photos from '@/lib/photos'
import { getAllInfluencers } from '@/lib/influencers'
import PortfolioGrid from '@/components/PortfolioGrid'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Campaign films, UGC series, AI influencers and brand identities. AI-native creative production for fashion, lifestyle, and beverage brands.',
  openGraph: {
    title: 'Work — Alexander Huston',
    description: 'Campaign films, UGC series, AI influencers and brand identities.',
  },
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
