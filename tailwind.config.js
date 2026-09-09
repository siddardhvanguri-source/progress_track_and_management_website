/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surface tokens
        bg:         'hsl(210 13% 10%)',
        elevated:   'hsl(215 14% 13%)',
        overlay:    'hsl(215 14% 17%)',

        // Border tokens
        border:     { DEFAULT: 'hsl(215 13% 22%)', subtle: 'hsl(215 13% 18%)' },

        // Text tokens
        primary:    { DEFAULT: 'hsl(210 40% 96%)', foreground: 'hsl(210 13% 10%)' },
        secondary:  'hsl(215 16% 60%)',
        tertiary:   'hsl(215 12% 42%)',

        // Accent
        accent:     { DEFAULT: 'hsl(252 95% 70%)', bg: 'hsl(252 60% 20%)' },

        // Status colors
        success:    { DEFAULT: 'hsl(142 76% 45%)', bg: 'hsl(142 60% 15%)' },
        warning:    { DEFAULT: 'hsl(38 92% 50%)',  bg: 'hsl(38 60% 15%)' },
        danger:     { DEFAULT: 'hsl(0 84% 60%)',   bg: 'hsl(0 60% 15%)' },
        info:       { DEFAULT: 'hsl(217 91% 60%)', bg: 'hsl(217 60% 18%)' },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        lg: '14px',
        xl: '18px',
      },
      boxShadow: {
        card:   '0 1px 3px 0 rgba(0,0,0,0.3), 0 1px 2px -1px rgba(0,0,0,0.2)',
        popup:  '0 16px 48px -8px rgba(0,0,0,0.5)',
        glow:   '0 0 20px 2px hsl(252 95% 70% / 0.2)',
      },
      animation: {
        'fade-up': 'fadeUp 0.2s ease-out both',
        'fade-in': 'fadeIn 0.15s ease-out both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
