import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    plugin(
      ({
        addUtilities,
      }: {
        addUtilities: (
          utilities: Record<string, any>,
          options?: { variants?: Array<string> }
        ) => void;
      }) => {
        const newUtilities = {
          ".hello": {
            color: "green",
          },
          ".loginContainer": {
            width: "100vw",
            height: "100vh",
            display: "flex",
            gap: "10vh",
            flexDirection: "column",
            paddingTop: "10vh",
            alignItems: "center",
          },
        };

        addUtilities(newUtilities, {
          variants: ["responsive", "hover"],
        });
      }
    ),
  ],
};
export default config;
