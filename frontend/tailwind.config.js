/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rsw: {
          50: '#f0f7ff', 100: '#e0efff', 200: '#bae0ff', 300: '#7cc5ff',
          400: '#36a3ff', 500: '#0b84e4', 600: '#006dc4', 700: '#00569e',
          800: '#00467f', 900: '#003b68',
        },
        accent: { DEFAULT: '#ff6b35', dark: '#e55a25' }
      }
    },
  },
  plugins: [],
}
