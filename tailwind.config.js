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
      // Add any other customizations here
    },
  },
  plugins: [],
}
