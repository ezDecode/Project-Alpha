/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dmsans': ['DMSans', 'system-ui', 'sans-serif'],
        'instrument': ['InstrumentSerif', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
