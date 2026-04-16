import type { Metadata } from 'next'
import HomeWidgets from '@/components/HomeWidgets'

export const metadata: Metadata = {
  title: 'Alexander Huston — Creative Director',
  description:
    "AI-powered creative direction. Campaigns that feel real, cost less than a studio, and don't look generated. Based in Sofia. Built for everywhere.",
}

export default function Home() {
  return <HomeWidgets />
}
