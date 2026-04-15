import type { Metadata } from 'next'
import { Playfair_Display, DM_Mono, Syne } from 'next/font/google'
import './globals.css'
import SiteShell from '@/components/SiteShell'
import AnimatedBackground from '@/components/AnimatedBackground'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Alex Boyanov — AI Creative Director',
    template: '%s — @askhuston',
  },
  description:
    'AI Creative Director based in Sofia. I make hyper-realistic campaigns for fashion, lifestyle, and beverage brands — no studio, no crew, full production value.',
  keywords: [
    'AI Creative Director',
    'AI campaigns',
    'fashion campaigns',
    'AI video production',
    'brand films',
    'AI filmmaking',
    'Kling',
    'Higgsfield',
  ],
  authors: [{ name: 'Alex Boyanov', url: 'https://askhuston.com' }],
  creator: 'Alex Boyanov',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://askhuston.com',
    siteName: '@askhuston',
    title: 'Alex Boyanov — AI Creative Director',
    description:
      "I make campaigns that don't look AI-generated. Fashion, lifestyle, beverage — no studio required.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alex Boyanov — AI Creative Director',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Boyanov — AI Creative Director',
    description:
      "I make campaigns that don't look AI-generated. Fashion, lifestyle, beverage — no studio required.",
    images: ['/og-image.jpg'],
    creator: '@askhuston',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmMono.variable} ${syne.variable}`}
    >
      <body className="text-text font-mono min-h-screen flex flex-col">
        <AnimatedBackground />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
