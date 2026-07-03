import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--brand-surface)",
        border: "var(--brand-line)",
        muted: {
          foreground: "var(--brand-stone)",
        },
        navy: {
          DEFAULT: "#0F1E30",
          foreground: "#FFFFFF",
          muted: "rgba(255,255,255,0.65)",
        },
        brand: {
          DEFAULT: "#B05A33",
          bright: "#C77A4F",
          /* Light surfaces — warm cream */
          ivory: {
            DEFAULT: "#FAF7F0",
            deep: "#F1EBDD",
            card: "#FFFFFF",
          },
          /* Navy — headings & dark sections */
          navy: {
            DEFAULT: "#0F1E30",
            dark: "#0F1E30",
            light: "#1E3047",
            muted: "#5A6472",
          },
          /* Terracotta accent (token named "teal" for class compatibility) */
          teal: {
            DEFAULT: "#B05A33",
            dark: "#8F4526",
            light: "#C77A4F",
            glow: "rgba(176, 90, 51, 0.10)",
          },
          /* Gold / brass — decorative line-work on dark sections */
          gold: {
            DEFAULT: "#C2A36B",
            soft: "rgba(194, 163, 107, 0.14)",
          },
          stone: "#43403A",
          line: "#E2D9C8",
          grid: "rgba(176, 90, 51, 0.06)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "Cambria", "serif"],
        display: ["var(--font-fraunces)", "Georgia", "Cambria", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "3px",
        lg: "6px",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(10,22,40,0.06)",
        card: "0 18px 50px -18px rgba(10,22,40,0.14)",
        float: "0 12px 36px -12px rgba(10,22,40,0.18)",
        nav: "0 1px 0 rgba(229,231,235,0.9), 0 8px 30px -18px rgba(10,22,40,0.10)",
      },
      transitionDuration: {
        hero: "500ms",
      },
    },
  },
  plugins: [],
};
export default config;
