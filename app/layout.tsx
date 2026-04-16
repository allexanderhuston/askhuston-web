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

const SITE_URL = 'https://askhuston.com'
const OG_DESCRIPTION = "AI-powered creative direction. Campaigns that feel real, cost less than a studio, and don't look generated. Based in Sofia. Built for everywhere."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Alexander Huston — Creative Director',
    template: '%s — Alexander Huston',
  },
  description: OG_DESCRIPTION,
  keywords: [
    'Alexander Huston',
    'askhuston',
    'AI Creative Director',
    'AI campaign production',
    'AI brand films',
    'AI video production',
    'creative director Sofia',
    'AI generated campaigns',
    'brand content AI',
    'AI influencer',
    'campaign films',
    'fashion campaigns AI',
  ],
  authors: [{ name: 'Alexander Huston', url: SITE_URL }],
  creator: 'Alexander Huston',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Alexander Huston',
    title: 'Alexander Huston — Creative Director',
    description: OG_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Alexander Huston — Creative Director',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alexander Huston — Creative Director',
    description: OG_DESCRIPTION,
    images: ['/opengraph-image'],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Alexander Huston',
                alternateName: 'askhuston',
                url: 'https://askhuston.com',
                image: 'https://askhuston.com/alex.png',
                jobTitle: 'Creative Director',
                description: "AI-powered creative direction. Campaigns that feel real, cost less than a studio, and don't look generated.",
                sameAs: [
                  'https://www.linkedin.com/in/alexanderboyanov/',
                  'https://www.instagram.com/askhuston',
                ],
                knowsAbout: [
                  'Creative Direction',
                  'AI Campaign Production',
                  'Brand Films',
                  'Art Direction',
                  'Video Production',
                  'Brand Strategy',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Alexander Huston',
                url: 'https://askhuston.com',
                description: "AI-powered creative direction. Campaigns that feel real, cost less than a studio, and don't look generated.",
                author: {
                  '@type': 'Person',
                  name: 'Alexander Huston',
                },
              },
            ]),
          }}
        />
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
