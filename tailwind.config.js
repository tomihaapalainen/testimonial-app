const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      gray: colors.gray,
      emerald: colors.emerald,
      green: colors.green,
      red: colors.red,
      white: colors.white,
      black: colors.black,
      lime: colors.lime,
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      display: ["group-hover", "hover"],
    },
  },
  plugins: [],
};
