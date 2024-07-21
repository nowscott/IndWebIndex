/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'smiley': ['Smiley Sans Oblique', 'sans-serif'],
        'wenkai': ['LXGW WenKai', 'sans-serif'],
        'oldsong': ['KingHwa_OldSong', 'sans-serif'],
        'pixel': ['MuzaiPixel', 'sans-serif'],
        'marker': ['LXGW Marker Gothic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};