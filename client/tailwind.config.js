/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--bg-color))",
        bgSecondary: "rgba(var(--bg-color-secondary))",
        bgTertiary: "rgba(var(--bg-color-tertiary))",
        primary: "rgba(var(--primary-color))",
        secondary: "rgba(var(--secondary-color))",
      }
    },
  },
  plugins: [],
}