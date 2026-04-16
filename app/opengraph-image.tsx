import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Alexander Huston — Creative Director'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  // Fetch Space Grotesk bold from Google Fonts
  const fontBold = await fetch(
    'https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mF71Q-gozuEnF.woff2'
  ).then((r) => r.arrayBuffer()).catch(() => null)

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0d0d0d',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          fontFamily: fontBold ? 'SpaceGrotesk' : 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background texture — subtle grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(200,56,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,56,42,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Red accent bar top-left */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 80,
            width: 48,
            height: 4,
            background: '#c8382a',
            borderRadius: '0 0 4px 4px',
          }}
        />

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#c8382a',
              boxShadow: '0 0 12px rgba(200,56,42,0.8)',
            }}
          />
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              letterSpacing: '0.2em',
              color: '#c8382a',
              textTransform: 'uppercase',
            }}
          >
            askhuston.com
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 13,
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
            }}
          >
            Creative Direction · AI Production
          </div>

          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
            }}
          >
            Alexander
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: '#c8382a',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              marginTop: -4,
            }}
          >
            Huston.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            Based in Sofia · Works everywhere
          </span>

          {/* Right tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 20px',
              border: '1px solid rgba(200,56,42,0.3)',
              borderRadius: 100,
              background: 'rgba(200,56,42,0.08)',
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 13,
                color: '#c8382a',
                letterSpacing: '0.1em',
              }}
            >
              Campaigns that don&apos;t look AI
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontBold
        ? [{ name: 'SpaceGrotesk', data: fontBold, style: 'normal', weight: 700 }]
        : [],
    }
  )
}
