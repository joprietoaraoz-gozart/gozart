import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#292A22",
        graphite: "#484640",
        stone: "#848271",
        sand: "#C1BDB4",
        cream: "#F0F3E0",
      },
      fontFamily: {
        display: ["var(--font-poller)", "sans-serif"],
        script: ["var(--font-pinyon)", "cursive"],
        sans: ["var(--font-arimo)", "Helvetica", "Arial", "sans-serif"],
      },
      letterSpacing: {
        // Aproximación del -10 de tracking que usás en Figma (las unidades no son
        // 1:1 con CSS). Ajustá este valor a ojo comparando con el logo en Figma.
        logo: "-0.05em",
      },
    },
  },
  plugins: [],
};
export default config;
