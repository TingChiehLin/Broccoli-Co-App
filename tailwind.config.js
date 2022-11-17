/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primaryDark: "#1B1C1D",
      primaryGray: "#232424",
      button: "#D55F52",
      hover: "#DB7B71",
      error: "#D55F52",
    },
    extend: {},
  },
  plugins: [],
};
