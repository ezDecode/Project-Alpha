/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'overused': ['OverusedGrotesk', 'system-ui', 'sans-serif'],
        'roslindale': ['Roslindale', 'Georgia', 'Times New Roman', 'serif'],
        'roslindale-text': ['RoslindaleText', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
