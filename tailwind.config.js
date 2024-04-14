/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      screens: {
        sm: "375px",
      },
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"], // font-weight: 100
        pextralight: ["Poppins-ExtraLight", "sans-serif"], // font-weight: 200
        plight: ["Poppins-Light", "sans-serif"], // font-weight: 300
        pregular: ["Poppins-Regular", "sans-serif"], // font-weight: 400
        pmedium: ["Poppins-Medium", "sans-serif"], // font-weight: 500
        psemibold: ["Poppins-SemiBold", "sans-serif"], // font-weight: 600
        pbold: ["Poppins-Bold", "sans-serif"], // font-weight: 700
        pextrabold: ["Poppins-ExtraBold", "sans-serif"], // font-weight: 800
        pblack: ["Poppins-Black", "sans-serif"], // font-weight: 900
      },
    },
  },
  plugins: [],
};
