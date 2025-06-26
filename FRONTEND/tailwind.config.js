/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}" // Required for Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin") // Enables Flowbite components
  ],
}