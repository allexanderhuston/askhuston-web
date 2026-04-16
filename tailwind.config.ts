import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
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
        // CSS variable tokens — respond to dark mode automatically
        t1: 'var(--t1)',
        t2: 'var(--t2)',
        t3: 'var(--t3)',
        t4: 'var(--t4)',
        t5: 'var(--t5)',
        t6: 'var(--t6)',
        t7: 'var(--t7)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        // keep old aliases pointing to body so existing classes don't break
        ui:      ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-body)', 'system-ui', 'sans-serif'],
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
