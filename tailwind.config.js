/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Feline Harmony Color Palette
        primary: {
          DEFAULT: '#FD9859',
          dark: '#97480D',
          light: '#FFDBC9',
          container: '#F59153',
        },
        secondary: {
          DEFAULT: '#2D5D7B',
          dark: '#001E2E',
          light: '#C8E6FF',
          container: '#ACDAFD',
        },
        tertiary: {
          DEFAULT: '#9B59B6',
          dark: '#320047',
          light: '#F8D8FF',
          container: '#D68FF1',
        },
        neutral: {
          DEFAULT: '#F9F7F5',
          dark: '#1B1C1B',
          surface: '#FBF9F7',
          border: '#E4E2E0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
