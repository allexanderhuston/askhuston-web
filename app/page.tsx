import type { Metadata } from 'next'
import HomeWidgets from '@/components/HomeWidgets'

export const metadata: Metadata = {
  title: 'Alex Boyanov — AI Creative Director',
  description:
    'AI Creative Director based in Sofia. Hyper-realistic campaigns for fashion, lifestyle, and beverage brands.',
}

export default function Home() {
  return <HomeWidgets />
}
