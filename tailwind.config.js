/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // make sure Tailwind scans your files
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ["Cairo", "sans-serif"],
        kufi: ['"Noto Kufi Arabic"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary-color))",
        },
        secondary: "var(--secondary-color)",
        gray: {
          500: "#6B7280",
        },
      },
    },
    corePlugins: {
      preflight: false, 
    },
    future: {
      disableColorOpacityUtilitiesByDefault: true,
    },
    experimental: {
      optimizeUniversalDefaults: true,
    },
  },
  plugins: [],
};
