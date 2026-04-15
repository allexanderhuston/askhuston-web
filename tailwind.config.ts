import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        'surface-2': '#161616',
        border: '#1f1f1f',
        text: '#f2ede8',
        muted: '#888888',
        accent: '#c8382a',
        gold: '#c9a84c',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        ui: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}

export default config
