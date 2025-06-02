/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f0f5fa',
          200: '#e1eaf4',
          300: '#c9daeb',
          400: '#9cb3d0',
          500: '#718db4',
          600: '#5a739a',
          700: '#445a7a',
          800: '#364963',
          900: '#2b3a4f',
          950: '#1a2333',
        },
        accent: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          light: '#bfdbfe',
          dark: '#1d4ed8',
        },
        surface: {
          DEFAULT: '#ffffff',
          secondary: '#f8fafc',
          tertiary: '#f0f5fa',
        },
        border: {
          light: '#e1eaf4',
          DEFAULT: '#c9daeb',
          dark: '#9cb3d0',
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ],
        display: [
          'Inter',
          'system-ui',
          '-apple-system',
          'sans-serif'
        ],
      },
      boxShadow: {
        'card': '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
        'card-hover': '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
        'button': '0px 1px 2px rgba(16, 24, 40, 0.05)',
        'button-hover': '0px 2px 4px rgba(16, 24, 40, 0.08)',
        'subtle': '0px 1px 2px rgba(16, 24, 40, 0.04)',
        'focus': '0px 0px 0px 4px rgba(59, 130, 246, 0.2)',
      },
      borderRadius: {
        'DEFAULT': '0.5rem',
        'sm': '0.375rem',
        'lg': '0.75rem',
      },
      spacing: {
        '18': '4.5rem',
      },
      ringWidth: {
        'DEFAULT': '1px',
      },
      ringColor: {
        'DEFAULT': 'rgba(59, 130, 246, 0.3)',
      },
      borderColor: {
        'DEFAULT': '#e1eaf4',
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out forwards',
        'slide-in-bottom': 'slide-in-bottom 0.3s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.3s ease-out forwards',
        'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
