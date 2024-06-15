/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      animation: {
        placeholderFadeIn: 'placeholderFadeIn 1s ease-in-out forwards',
        placeholderFadeOut: 'placeholderFadeOut 1s ease-in-out forwards',
      },
      keyframes: {
        placeholderFadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        placeholderFadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
}

