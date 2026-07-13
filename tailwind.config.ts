import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#39FF14',
          dark: '#2bcc10',
          muted: '#1a8a0a',
        },
        black: '#0a0a0a',
        dark: {
          DEFAULT: '#111111',
          card: '#161616',
          'card-hover': '#1c1c1c',
        },
        gray: {
          900: '#1a1a1a',
          800: '#222222',
          700: '#2a2a2a',
          600: '#333333',
          500: '#555555',
          400: '#888888',
          300: '#aaaaaa',
          200: '#cccccc',
        },
        'off-white': '#f7f7f7',
        red: '#ff4444',
        yellow: '#ffaa00',
        blue: '#4488ff',
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '20px',
        sm: '8px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0,0,0,0.08)',
        md: '0 8px 30px rgba(0,0,0,0.12)',
        lg: '0 20px 60px rgba(0,0,0,0.15)',
        'green-glow': '0 0 80px rgba(57, 255, 20, 0.12)',
        'green-glow-strong': '0 0 24px rgba(57, 255, 20, 0.25)',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      animation: {
        pulse: 'pulse 2s infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
