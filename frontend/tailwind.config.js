/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,txs}",
  ],
  theme: {
    fontFamily: {
      '"Open Sans"': ['"Open Sans"', 'sans-serif'],
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'tablet': '500px',
      
      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {                
    },
  },
  plugins: []
}

