import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#7a1f1f",
          dark: "#5e1717",
          light: "#8f2a2a",
        },
        forest: {
          DEFAULT: "#123c30",
          dark: "#0d2e25",
        },
        gold: {
          DEFAULT: "#c9972f",
          light: "#e8c987",
        },
        cream: "#fbf5ec",
        ink: "#241c14",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
