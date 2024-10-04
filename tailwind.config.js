/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './Screens/**/*.{js,jsx,ts,tsx}',
    './Screens/Auth/**/*.{js,jsx,ts,tsx}',
    './Components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3e6ae9',
        secondary: '#cddef2',
        neutral: '#F8F9FA'
      }
    }
  },
  plugins: []
}
