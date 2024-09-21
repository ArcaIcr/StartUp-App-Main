/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        beige: "#E6E1DB",
        tan: "#C7BCAB",
        darkblue: "#1F2E43",
        lightblue: "#8799A6",
      },
      gridTemplateColumns: {
        "70/30": "70% 30%",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeInUp: {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "gradient-bg": "gradient 6s ease infinite",
        "fade-in-up": "fadeInUp 1s ease-out both",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
