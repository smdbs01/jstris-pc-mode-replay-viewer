/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],  
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['system-ui', 'ui-sans-serif'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['SFMono-Regular', '"Fira Code"', '"Fira Mono:400,700"', 'ui-monospace'],
    },
    screens: {
      'xs': '320px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}

