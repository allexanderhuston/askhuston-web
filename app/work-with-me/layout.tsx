import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Let's Build",
  description:
    'Brief Alexander Huston on your next campaign. AI-native production for brands that want campaign-quality output without the six-figure budget.',
  openGraph: {
    title: "Let's Build — Alexander Huston",
    description:
      'AI-native campaigns for brands that want to move culture, not just content calendars. Tell me what you\'re building.',
  },
}

export default function WorkWithMeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
