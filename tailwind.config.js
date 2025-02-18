/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",   // Include all files in the pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // And also in the components directory (if you have one)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

