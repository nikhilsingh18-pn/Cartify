/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ocean Theme from Image
        ocean: {
          dark: '#003f5c',    // Deep Ocean Blue (Top band)
          teal: '#2f4b7c',    // Teal Blue (Second band) - adjusted for better text contrast
          cyan: '#00b4d8',    // Bright Cyan (Third band)
          mint: '#00ffcc',    // Neon Aqua (Bottom band)
        },
        // Mapping to logical names for the app
        primary: {
          DEFAULT: '#0077b6', // Strong Blue for buttons/highlights
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4',
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
        },
        secondary: {
          DEFAULT: '#00b4d8', // Cyan
        },
        accent: {
          DEFAULT: '#00ffcc', // Neon Mint
        },
        midnight: '#003f5c', // For Header/Footer backgrounds
        background: '#f0f9ff', // Very light blue tint
        foreground: '#1a202c',
        subtle: '#718096',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
