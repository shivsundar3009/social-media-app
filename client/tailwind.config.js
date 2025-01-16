import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths as needed
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [daisyui, 'tailwind-animate'],
  daisyui: {
    themes: ["light"], // Ensures DaisyUI uses light mode by default
  }
};