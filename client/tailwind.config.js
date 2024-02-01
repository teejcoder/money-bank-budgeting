/**
 * Tailwind CSS Configuration File
 *
 * This file is used to configure the Tailwind CSS framework for the project.
 * It includes settings for colors, fonts, and other styling options.
 */

/** @type {import('tailwindcss').Config} */

module.exports = {
  // Specify the files to be processed by Tailwind CSS
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  // Enable dark mode with the 'class' option
  darkMode: 'class',
  
  // Extend the default theme with additional customisations
  theme: {
    extend: {
      // Define custom colors for buttons
      colors: {
        btnDark: '#8447FF', //purple
        btnLight: '#98E2FF', //blue
      },
      // Customise background colors for light and dark modes
      backgroundColor: {
        light: '#FBF5F3',
        dark: '#2B2C28',
      },
      // Customise button background colors for light and dark modes
      btnBackgroundColor: {
        light: '#8447FF',
        dark: '#2EC0F9',
      },
      // Customise text colors for light and dark modes
      textColor: {
        light: '#000000',
        dark: '#FBF5F3',
      },
      // Define custom font families
      fontFamily: {
        'montserrat': ['Montserrat'],
        'lato': ['Lato'],
        'garamond': ['Garamond']
      }
    },
  },
  // No additional plugins at the moment
  plugins: [],
}
