import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#051329",
        paper: "#f4f6f8",
        sitecore: {
          red: "#eb1f1f",
          "red-dark": "#c41616",
          navy: "#051329",
          "dark-gray": "#333333",
          "light-gray": "#f4f6f8",
        },
        campus: {
          DEFAULT: "#6b2436",
          deep: "#3d121c",
        },
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(28, 25, 23, 0.06), 0 12px 32px rgba(28, 25, 23, 0.06)",
      },
    },
  },
  plugins: [typography],
};

export default config;
