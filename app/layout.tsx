import type { Metadata } from 'next'
import { Space_Grotesk, Courier_Prime } from 'next/font/google'
import './globals.css'
import SiteShell from '@/components/SiteShell'
import AnimatedBackground from '@/components/AnimatedBackground'
import CustomCursor from '@/components/CustomCursor'
import { CursorProvider } from '@/lib/cursor-context'
import { ThemeProvider } from '@/lib/theme-context'
import { LoadingProvider } from '@/lib/loading-context'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
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
      className={`${spaceGrotesk.variable} ${courierPrime.variable}`}
    >
      <body className="text-text font-body min-h-screen flex flex-col">
        {/* Anti-FOUC: apply saved theme before paint */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}` }} />
        <ThemeProvider>
          <LoadingProvider>
          <CursorProvider>
            <AnimatedBackground />
            <CustomCursor />
            <SiteShell>{children}</SiteShell>
          </CursorProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
