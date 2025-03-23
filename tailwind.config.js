/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00E5FF',
        secondary: '#FF00FF',
        glow: '#39FF14',
        dark: '#0D0D0D',
        light: '#F5F5F5',
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      animation: {
        glow: 'glow 2s infinite alternate',
        neon: 'neonPulse 1.5s infinite alternate',
        cardPop: 'cardPop 0.3s ease-in-out forwards',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #00E5FF, 0 0 10px #00E5FF' },
          '100%': { textShadow: '0 0 20px #00E5FF, 0 0 40px #00E5FF' },
        },
        neonPulse: {
          '0%': { boxShadow: '0 0 5px #39FF14, 0 0 10px #39FF14' },
          '100%': { boxShadow: '0 0 20px #39FF14, 0 0 30px #39FF14' },
        },
        cardPop: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
};
