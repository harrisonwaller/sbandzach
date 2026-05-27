import type { Config } from "tailwindcss";

/**
 * The palette and type system are the whole brand. Tailwind is used here only
 * for layout/spacing utilities — every colour and font below maps to the
 * editorial design tokens, so no default Tailwind colour (gray-500, blue-600…)
 * should ever appear in the markup.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    // Intentionally replace Tailwind's default palette so stray utilities fail
    // loudly rather than introducing off-brand colour.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      cream: "#f5f0e6",
      "cream-deep": "#ebe3d2",
      ink: "#1a1612",
      "ink-soft": "#3d342b",
      gold: "#a87841",
      "gold-soft": "#c69b6d",
      stone: "#8a8478",
      white: "#ffffff",
      black: "#000000",
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      letterSpacing: {
        editorial: "0.3em",
        wide: "0.4em",
        widest: "0.5em",
      },
      transitionTimingFunction: {
        // Slow, refined easing used across reveals and motion.
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        chapter: "1200px",
        gallery: "1400px",
        prose: "540px",
      },
      colors: {
        rule: "rgba(26, 22, 18, 0.15)",
        "rule-light": "rgba(245, 240, 230, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
