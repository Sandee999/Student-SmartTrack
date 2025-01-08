/** @type {import('tailwindcss').Config} */
module.exports = {
  // Include paths to your component files
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
      // Regular Variants
      pthin: ["Poppins-Thin", "sans-serif"],
      pextralight: ["Poppins-ExtraLight", "sans-serif"],
      plight: ["Poppins-Light", "sans-serif"],
      pregular: ["Poppins-Regular", "sans-serif"],
      pmedium: ["Poppins-Medium", "sans-serif"],
      psemibold: ["Poppins-SemiBold", "sans-serif"],
      pbold: ["Poppins-Bold", "sans-serif"],
      pextrabold: ["Poppins-ExtraBold", "sans-serif"],
      pblack: ["Poppins-Black", "sans-serif"],

      // Italic Variants
      pithin: ["Poppins-ThinItalic", "sans-serif"],
      piextralight: ["Poppins-ExtraLightItalic", "sans-serif"],
      pilight: ["Poppins-LightItalic", "sans-serif"],
      piregular: ["Poppins-Italic", "sans-serif"],
      pimedium: ["Poppins-MediumItalic", "sans-serif"],
      pisemibold: ["Poppins-SemiBoldItalic", "sans-serif"],
      pibold: ["Poppins-BoldItalic", "sans-serif"],
      piextrabold: ["Poppins-ExtraBoldItalic", "sans-serif"],
      piblack: ["Poppins-BlackItalic", "sans-serif"],
      },
    },
  },

  plugins: [],
};
