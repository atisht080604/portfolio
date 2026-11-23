/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        'secondary-bg': '#101010',
        card: '#141414',
        'card-hover': '#1a1a1a',
        'primary-text': '#F5F5F5',
        'secondary-text': '#999999',
        'accent-green': '#B7FF6B',
        'accent-blue': '#65C7FF',
        'cyber-border': 'rgba(255, 255, 255, 0.10)',
        'cyber-border-active': 'rgba(183, 255, 107, 0.4)',
        'cyber-border-blue': 'rgba(101, 199, 255, 0.4)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Share Tech Mono"', 'ui-monospace', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.9' },
        }
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'cyber-grid-dense': 'linear-gradient(to right, rgba(183,255,107,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(183,255,107,0.05) 1px, transparent 1px)',
        'radial-vignette': 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(8, 8, 8, 0.85) 100%)',
      }
    },
  },
  plugins: [],
}
