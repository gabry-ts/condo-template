/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(172, 40%, 96%)',
          100: 'hsl(172, 38%, 90%)',
          200: 'hsl(172, 35%, 78%)',
          300: 'hsl(172, 40%, 58%)',
          400: 'hsl(172, 45%, 40%)',
          500: 'hsl(172, 50%, 22%)',
          600: 'hsl(172, 52%, 17%)',
          700: 'hsl(172, 55%, 13%)',
          800: 'hsl(172, 58%, 9%)',
          900: 'hsl(172, 60%, 6%)',
        },
        accent: {
          50: 'hsl(32, 80%, 96%)',
          100: 'hsl(32, 78%, 90%)',
          200: 'hsl(32, 75%, 78%)',
          300: 'hsl(32, 80%, 65%)',
          400: 'hsl(32, 85%, 52%)',
          500: 'hsl(32, 85%, 45%)',
          600: 'hsl(32, 85%, 38%)',
        },
        success: {
          50: 'hsl(152, 50%, 95%)',
          100: 'hsl(152, 45%, 88%)',
          500: 'hsl(152, 55%, 40%)',
          600: 'hsl(152, 55%, 32%)',
        },
        destructive: {
          50: 'hsl(4, 80%, 96%)',
          100: 'hsl(4, 70%, 90%)',
          500: 'hsl(4, 70%, 50%)',
          600: 'hsl(4, 70%, 42%)',
        },
        warning: {
          50: 'hsl(38, 90%, 95%)',
          100: 'hsl(38, 85%, 88%)',
          500: 'hsl(38, 85%, 50%)',
          600: 'hsl(38, 85%, 42%)',
        },
        info: {
          50: 'hsl(213, 60%, 96%)',
          100: 'hsl(213, 55%, 90%)',
          500: 'hsl(213, 60%, 50%)',
          600: 'hsl(213, 60%, 42%)',
        },
        gray: {
          50: 'hsl(210, 20%, 98%)',
          100: 'hsl(210, 16%, 95%)',
          200: 'hsl(210, 14%, 89%)',
          300: 'hsl(210, 12%, 80%)',
          400: 'hsl(210, 10%, 60%)',
          500: 'hsl(210, 8%, 46%)',
          600: 'hsl(210, 10%, 34%)',
          700: 'hsl(210, 12%, 24%)',
          800: 'hsl(210, 15%, 14%)',
          900: 'hsl(210, 18%, 8%)',
        },
        fornitore: {
          accent: 'hsl(28, 60%, 50%)',
        },
        superuser: {
          accent: 'hsl(220, 15%, 50%)',
          bg: 'hsl(220, 15%, 8%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        '2xl': '16px',
        xl: '12px',
      },
      keyframes: {
        'page-enter': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'modal-enter': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'sheet-enter': {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
        'toast-enter': {
          from: { opacity: '0', transform: 'translateX(100%)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'reveal-up': {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-scale': {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'page-enter': 'page-enter 250ms ease-out',
        'modal-enter': 'modal-enter 200ms ease-out',
        'sheet-enter': 'sheet-enter 300ms cubic-bezier(0.32, 0.72, 0, 1)',
        'toast-enter': 'toast-enter 300ms ease-out',
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        'fade-in': 'fade-in 200ms ease-out',
        'reveal-up': 'reveal-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'reveal-scale': 'reveal-scale 500ms cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
