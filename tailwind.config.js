/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f6f3f0',
          100: '#ebe3d9',
          200: '#ddceb8',
          300: '#cbb192',
          400: '#bb9572',
          500: '#a88365', /* FlowMail Primary */
          600: '#9b7156',
          700: '#8f6e52', /* FlowMail Primary Hover */
          800: '#6d5244',
          900: '#584338',
        },
        surface: '#ffffff',
        background: '#faf9f7',
        textPrimary: '#2a2927',
        textSecondary: '#6b665c',
        borderLight: '#dcdad5',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 4px 10px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 8px 20px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      }
    },
  },
  plugins: [],
}
