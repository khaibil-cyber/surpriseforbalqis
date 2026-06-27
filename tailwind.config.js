/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'dancing': ['Dancing Script', 'cursive'],
        'great-vibes': ['Great Vibes', 'cursive'],
        'sacramento': ['Sacramento', 'cursive'],
        'body': ['Quicksand', 'sans-serif'],
        'romantic': ['Cormorant Garamond', 'serif'],
        'elegant': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins
