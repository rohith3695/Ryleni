/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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