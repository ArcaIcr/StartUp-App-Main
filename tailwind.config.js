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
        primaryLight: "#d4eaf7", // Light Blue
        primaryMedium: "#b6ccd8", // Medium Blue
        primaryDark: "#3b3c3d", // Dark Gray

        accentLight: "#71c4ef", // Sky Blue
        accentDark: "#00668c", // Deep Blue

        textDark: "#1d1c1c", // Dark Text
        textMedium: "#313d44", // Medium Text

        bgLight: "#fffefb", // Off White
        bgMedium: "#f5f4f1", // Light Gray
        bgDark: "#cccbc8", // Gray
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
        typing: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "black" },
        },
      },
      animation: {
        "gradient-bg": "gradient 6s ease infinite",
        "fade-in-up": "fadeInUp 1s ease-out both",
        typing:
          "typing 4s steps(40, end) forwards, blink 0.75s step-end infinite",
      },
      // Extend width values for the sidebar collapse states
      spacing: {
        16: "4rem", // This will be the width for the collapsed sidebar (16rem)
        64: "16rem", // This is the expanded sidebar width (64rem)
      },
      // Custom transition class for smooth sidebar toggle
      transitionProperty: {
        width: "width",
      },
      transitionDuration: {
        300: "300ms",
      },
      transitionTimingFunction: {
        "ease-in-out": "ease-in-out",
      },
    },
  },
  plugins: [],
};
