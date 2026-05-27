export const designTokens = {
  colors: {
    heritageCrimson: {
      hex: '#8B1A1A',
      usage: 'Primary CTAs, active states, navigation highlights',
    },
    estateGold: {
      hex: '#C9A84C',
      usage: 'Accents, highlights, success states, revenue metrics',
    },
    inkBlack: {
      hex: '#1A1A1A',
      usage: 'Primary text, headings, dark UI elements',
    },
    ivoryParchment: {
      hex: '#FAF7F2',
      usage: 'Light backgrounds, cards, secondary surfaces',
    },
    coolGrey: {
      hex: '#E5E5E5',
      usage: 'Borders, dividers, disabled states',
    },
    pureWhite: {
      hex: '#FFFFFF',
      usage: 'Primary card backgrounds, modals, overlays',
    },
  },
  typography: {
    fontSerif: 'Playfair Display',
    fontSans: 'Inter',
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
  },
  shadows: {
    card: '0 2px 16px rgba(26,26,26,0.07)',
    elevated: '0 8px 32px rgba(139,26,26,0.10)',
    gold: '0 4px 24px rgba(201,168,76,0.15)',
  },
  borderRadius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  transitions: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
  },
} as const;

export type DesignTokens = typeof designTokens;
