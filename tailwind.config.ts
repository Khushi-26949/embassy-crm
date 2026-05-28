import type { Config } from 'tailwindcss';

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
        crimson: {
          DEFAULT: '#8B1A1A',
          light: '#A52020',
          dark: '#6B1414',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#D4B86A',
          dark: '#A8892E',
        },
        ink: '#1A1A1A',
        ivory: {
          DEFAULT: '#FAF7F2',
          dark: '#F0EBE1',
        },
        coolgrey: '#E5E5E5',
        white: '#FFFFFF',
        night: {
          DEFAULT: '#0F0F0F',
          card: '#1A1A1A',
          surface: '#242424',
          border: '#2A2A2A',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 16px rgba(26,26,26,0.07)',
        elevated: '0 8px 32px rgba(139,26,26,0.10)',
        gold: '0 4px 24px rgba(201,168,76,0.15)',
      },
      keyframes: {
        'toast-in': {
          from: { opacity: '0', transform: 'translateX(100%)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'page-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'modal-in': {
          from: { opacity: '0', transform: 'translateY(8px) scale(0.95)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'toast-in': 'toast-in 200ms ease forwards',
        'page-in': 'page-in 300ms ease forwards',
        'modal-in': 'modal-in 200ms ease forwards',
      },
    },
  },
  plugins: [],
};

export default config;