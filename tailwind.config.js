/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // make sure Tailwind scans your files
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary-color))",
        },
        secondary: "var(--secondary-color)", 
        gray: {
          500: "#6B7280", // safe gray (hex instead of oklch)
        },
      },
    },
    corePlugins: {
        preflight: false, // optional: disables modern reset
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
