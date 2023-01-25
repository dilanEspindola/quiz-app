/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#e2e8f0",
      },
      boxShadow: {
        sidebar: "10px 0 20px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [require("daisyui")],
};
