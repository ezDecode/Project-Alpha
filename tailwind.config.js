/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'overused': ['OverusedGrotesk', 'sans-serif'],
        'roslindale': ['Roslindale', 'serif'],
        'roslindale-text': ['RoslindaleText', 'serif'],
      },
    },
  },
  plugins: [],
}
