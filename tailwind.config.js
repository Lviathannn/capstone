import tailwindAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "xl": "1300px",
      },
    },
    extend: {
      fontFamily: {
        "jakarta-sans": ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
       
        primary: {
          DEFAULT: "#0A6847",
          foreground: "hsl(var(--primary-foreground))",
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
          DEFAULT: "F3CA52",
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
          50: "#FAFAFA",
          100: "#EAEAEA",
          200: "#D5D5D5",
          300: "#BFBFBF",
          400: "#AAAAAA",
          500: "#959595",
          600: "#777777",
          700: "#595959",
          800: "#3C3C3C",
          900: "#1E1E1E",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindAnimate],
};
