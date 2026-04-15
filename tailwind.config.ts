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
        bg: '#efefef',
        surface: '#e4e4e4',
        'surface-2': '#d8d8d8',
        border: '#d0d0d0',
        text: '#1a1a1a',
        muted: '#777777',
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
