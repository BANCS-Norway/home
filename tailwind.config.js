/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./docs/**/*.{js,ts,vue,md}",
    "./.vitepress/**/*.{js,ts,vue}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bancs: {
          dark: '#0f172a',      // slate-900
          'dark-alt': '#1e1b4b',  // indigo-950
          accent: '#6366f1',     // indigo-500
          'accent-alt': '#8b5cf6', // purple-500
          light: '#ffffff',
          text: '#e2e8f0',       // slate-200
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
