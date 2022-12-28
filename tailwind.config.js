/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'query': { 'raw': '(min-width: 1450px)' },
        'MaxQuery': {'raw': '(max-width:1450px) and (min-width:1280px)'},
        'MaxQuery2': {'raw': '(max-width:1120px) and (min-width:900px) '},
        'MaxPhone': {'raw': '(max-width:500px)'},
      }
    },
  },
  plugins: [],
}