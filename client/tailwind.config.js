/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ["./src/**/*.{js,jsx,ts,tsx}", './public/index.html'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'me': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        primary: '#00afb9',
        superb: '#219dbcbf',
        best: '#2a9d90bf',
        good: '#90e1efb4',
        secondary: '#E2F2FD'
      }
    },
  },
  plugins: [],   
}
