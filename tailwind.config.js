/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        'sm-max': {'max': '600px'},
        'md-range': {'min': '601px', 'max': '900px'},
        'lg-range': {'min': '901px'},
      },
    },
  },
  plugins: [],
}

