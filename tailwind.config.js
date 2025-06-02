/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#292929',
          950: '#121212',
        },
        accent: {
          DEFAULT: '#000000',
          hover: '#1a1a1a',
          light: '#333333',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'button': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'subtle': '0 1px 2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'DEFAULT': '0.375rem',
      },
      spacing: {
        '18': '4.5rem',
      },
      ringWidth: {
        'DEFAULT': '1px',
      },
      ringColor: {
        'DEFAULT': 'rgba(0, 0, 0, 0.2)',
      },
      borderColor: {
        'DEFAULT': '#e5e5e5',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
