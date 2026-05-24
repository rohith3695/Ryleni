/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed",
        primaryDark: "#6d28d9",
        primaryLight: "#a78bfa",
      },
      fontFamily: {
        myfont: ['Monument', 'sans-serif'],
        clashfont: ['Monument', 'sans-serif'],
        instrument: ['Instrument', 'serif'],
        season: ['Monument', 'sans-serif']
      },
    },
  },
  plugins: [],
}