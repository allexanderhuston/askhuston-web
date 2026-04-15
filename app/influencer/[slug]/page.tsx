import { notFound } from 'next/navigation'
import { getInfluencerBySlug, getAllInfluencers } from '@/lib/influencers'
import InfluencerPage from '@/components/InfluencerPage'

export async function generateStaticParams() {
  return getAllInfluencers().map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const influencer = getInfluencerBySlug(params.slug)
  if (!influencer) return {}
  return {
    title: `${influencer.name} — @askhuston`,
    description: influencer.bio,
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const influencer = getInfluencerBySlug(params.slug)
  if (!influencer) notFound()
  return <InfluencerPage influencer={influencer} />
}
