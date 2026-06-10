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
          DEFAULT: "#0A1628",
          foreground: "#FFFFFF",
          muted: "rgba(255,255,255,0.65)",
        },
        brand: {
          DEFAULT: "#00C4CC",
          bright: "#00C4CC",
          /* Light surfaces */
          ivory: {
            DEFAULT: "#F7F9FA",
            deep: "#EEF1F4",
            card: "#FFFFFF",
          },
          /* Navy — headings & dark sections */
          navy: {
            DEFAULT: "#0A1628",
            dark: "#0A1628",
            light: "#1E2D4A",
            muted: "#374151",
          },
          /* Teal accent */
          teal: {
            DEFAULT: "#00C4CC",
            dark: "#009BA3",
            light: "#33D9E0",
            glow: "rgba(0,196,204,0.10)",
          },
          stone: "#374151",
          line: "#E5E7EB",
          grid: "rgba(0,196,204,0.06)",
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
