/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#fcbad3',
          blue: '#a7c7e7',
          green: '#bdecb6',
          yellow: '#fdfd96',
          purple: '#c3aed6',
          orange: '#fddaa8',
        },
      },
      linearGradientColors: theme => theme('colors'),
      // Add any other customizations here
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'), // If not already included
    require('@tailwindcss/forms'), // If not already included
    require('tailwindcss-gradients'),
  ],
}
