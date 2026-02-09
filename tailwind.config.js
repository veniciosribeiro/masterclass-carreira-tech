/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#19e65e",
        "background-dark": "#0D1117",
        "surface-dark": "#161B22",
        "border-dark": "#30363D",
        "text-main": "#C9D1D9",
        "text-header": "#FFFFFF",
        "glow-purple": "#7c3aed",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "mono": ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"]
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(124, 58, 237, 0.5)',
      }
    },
  },
  plugins: [],
}