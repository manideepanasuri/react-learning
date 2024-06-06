/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.html","./src/**/*.{jsx,html,js}"],
  theme: {
    extend: {
      colors:{
        primary:"#3cd2af",
        secondary:"#7ef1d6",
        background:"#fafdfc",
        accent:"#4bfdd4",
        textcolor:"#070c0a"
      }
    },
  },
  plugins: [],
}

