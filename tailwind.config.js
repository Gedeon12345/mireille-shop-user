/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#7C3AED', dark: '#5B21B6', soft: '#F3EEFF' },
        canvas: '#F8FAFC',
        surface: '#FFFFFF',
        ink: { DEFAULT: '#111827', soft: '#6B7280' },
        line: '#E5E7EB',
        success: '#16A34A',
        danger: '#DC2626',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: { card: '0 1px 2px rgba(17,24,39,.04), 0 4px 16px rgba(17,24,39,.04)' },
    },
  },
  plugins: [],
}
