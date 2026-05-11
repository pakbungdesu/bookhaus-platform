/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",    // This scans your index.jsx
    "./components/**/*.{js,ts,jsx,tsx}", // This scans your Layout/Navbar
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}