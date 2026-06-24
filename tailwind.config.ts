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
        afghan: {
          ivory:        '#FAF6F0',
          linen:        '#EFE8DC',
          blush:        '#E8C9B8',
          'dusty-rose': '#C9897A',
          muted:        '#A3705F',
          sage:         '#A8B5A0',
          stone:        '#8C7B70',
          warm:         '#5C4A42',
          'off-white':  '#FDFAF7',
          border:       '#DDD3C8',
          cream:        '#F8F0E3',
          charcoal:     '#3D332C',
          terracotta:   '#C1623E',
          burgundy:     '#6B1A2A',
          saffron:      '#DCA54A',
          gold:         '#C28B33',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1':      ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h2':      ['2rem',   { lineHeight: '1.25' }],
        'h3':      ['1.5rem', { lineHeight: '1.3' }],
        'h4':      ['1.25rem',{ lineHeight: '1.4' }],
      },
      boxShadow: {
        'soft':  '0 2px 12px rgba(92, 74, 66, 0.07)',
        'card':  '0 4px 24px rgba(92, 74, 66, 0.10)',
        'lift':  '0 8px 32px rgba(92, 74, 66, 0.14)',
      },
      borderRadius: {
        'sm':  '4px',
        'md':  '8px',
        'lg':  '12px',
        'xl':  '16px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
      transitionTimingFunction: {
        'soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
