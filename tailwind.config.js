/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        myfont: ['Season', 'serif'],
        clashfont: ['Season', 'serif'],
        instrument: ['Instrument', 'serif'],
        season: ['Season', 'serif']
      },
    },
  },
  plugins: [],
}