import type { Config } from 'tailwindcss';

const config: Config = {
  // 1. Point to all files in all workspaces
  content: [
    './apps/**/*.{js,ts,jsx,tsx}',
    './packages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'wolf-red': '#b22d15',       // Primary wolf color
        'wolf-gold': '#de8538',      // Accent color
        'wolf-brown-dark': '#2d1810',// Text color
        'wolf-brown-light': '#8b7355',// Subtext color
        'wolf-bg-light': '#fdfcf2',  // Light background
        'wolf-border': '#e8d5c4',    // Border color
      },
      backgroundImage: {
        'wolf-gradient': 'linear-gradient(135deg, #b22d15, #de8538)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;