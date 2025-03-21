// TODO: add Tailwind configuration
import plugin from "tailwindcss/plugin";
import animatePlugin from "tailwindcss-animate";
import theme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...theme.fontFamily.sans],
        serif: ["var(--font-serif)", ...theme.fontFamily.serif],
      },

      fontWeight: {
        regular: "400",
        medium: "500",
        bold: "700",
      },

      colors: {
        black: "var(--black)",
        white: "var(--white)",
        dark: "var(--dark)",
        light: "var(--light)",
        green: "var(--green)",

        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        theme: "hsl(var(--theme) / <alpha-value>)",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(2rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        fade: "fadeInUp 200ms both",
      },
    },
  },
  plugins: [
    animatePlugin,
    plugin(({ addVariant }) => {
      addVariant("intersect", "&:not([no-intersect])");
    }),
  ],
};

export default config;
