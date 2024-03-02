import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        yellowPrimary: "#E7CF96",
        yellowAccent: "#FECF5C",
        yellowMuted: "#F2E7DD",
        orange: "#FF9432",
        greenPrimary: "#37725D",
        greenAccent: "#3EAA83",
        bluePrimary: "#A1C3D7",
        mutedWhite: "#E2E2E2",
        gray: "#666C6A",
        red: "#E95151",
      },
      variants: {
        fill: ['hover', 'focus'],
      },
    },
  },
  plugins: [],
};
export default config;
