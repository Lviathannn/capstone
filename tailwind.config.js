/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Plus Jakarta Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          50: "#ECF3F1",
          100: "#CEE1DA",
          200: "#9DC3B5",
          300: "#6CA491",
          400: "#3B866C",
          500: "#0A6847",
          600: "#085339",
          700: "#063E2B",
          800: "#042A1C",
          900: "#02150E",
        },
        secondary: {
          50: "#FDF4DC",
          100: "#FAEABA",
          200: "#F8DF97",
          300: "#F5D575",
          400: "#F3CA52",
          500: "#C2A242",
          600: "#927931",
          700: "#615121",
          800: "#312810",
        },
        neutral: {
          50: "#EAEAEA",
          100: "#D5D5D5",
          200: "#BFBFBF",
          300: "#AAAAAA",
          400: "#959595",
          500: "#777777",
          600: "#595959",
          700: "#3C3C3C",
          800: "#1E1E1E",
        },
        info: {
          50: "#E0F2FD",
          100: "#C2E5FB",
          200: "A3D8F9",
          300: "#85CBF7",
          400: "#67BEF5",
          500: "#5298C4",
          600: "#3D7293",
          700: "#294D62",
          800: "#142631",
        },
        danger: {
          50: "#F3D5CF",
          100: "#E7ABA0",
          200: "#DC8070",
          300: "#D05641",
          400: "#C42C11",
          500: "#9D230E",
          600: "#761A0A",
          700: "#4E1207",
          800: "#270903",
        },
      },
    },
  },
  plugins: [],
}