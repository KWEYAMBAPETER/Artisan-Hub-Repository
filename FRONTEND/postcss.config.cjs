module.exports = {
  plugins: {
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "36em",
      },
    },
    "@tailwindcss/postcss": {},  // Replace "tailwindcss" with this
    "autoprefixer": {},
  },
};