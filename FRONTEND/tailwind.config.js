module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@mantine/core/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.{js,jsx}",
  ],
  plugins: [
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
  ],
};