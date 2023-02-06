/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1A1823",
        componentPages: "#16151C",
      },
      boxShadow: {
        sidebar: "10px 0 20px -20px rgba(0, 0, 0, 0.5)",
        link: "0 5px 25px -8px rgba(215, 58, 254, 0.5)",
      },
    },
  },
  plugins: [require("daisyui")],
};
