/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9C1F49',
          dark: '#7A1638',
          light: '#F7E3EA',
        },
        secondary: {
          DEFAULT: '#1F5C3D',
          light: '#E3F3EA',
        },
        cream: '#FBF3E7',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
