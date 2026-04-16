import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Human',
  description:
    'Creative director, video producer, fashion brand founder. Alexander Huston spent years learning how businesses think, how visuals move people, and what it takes to make work that pays for itself.',
  openGraph: {
    title: 'The Human — Alexander Huston',
    description:
      'Creative director, video producer, fashion brand founder. Based in Sofia. Works everywhere.',
  },
}

export default function TheHumanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
