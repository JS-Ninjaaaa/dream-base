
import { defaultTheme } from "tailwindcss/defaultTheme";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "375px", // iPhone SE
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
