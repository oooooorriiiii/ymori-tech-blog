import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/blog/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/blog/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/typography'), 
  ],
};
export default config;