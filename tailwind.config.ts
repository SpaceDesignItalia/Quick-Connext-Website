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
        brand: {
          /* Cool light surfaces (token name kept as `ivory` for compatibility) */
          ivory: {
            DEFAULT: "#F4F6F7", // base page / light sections
            deep: "#ECEFF1", // alternate / muted sections
            card: "#FFFFFF", // raised cards
          },
          /* Ink — cool graphite + deep petrol for dark sections */
          navy: {
            DEFAULT: "#14201F", // primary text / light-section headings
            dark: "#0B2A2B", // deep petrol — dark sections
            light: "#103A3A", // dark-section radial highlight
            muted: "#1B2C2B",
          },
          /* Accent — verde benzina / petrolio (from the logo) */
          teal: {
            DEFAULT: "#0E7C82",
            dark: "#0A5E63",
            light: "#38C5C0", // logo turquoise — highlights / glow
            glow: "rgba(56, 197, 192, 0.18)",
          },
          brass: {
            DEFAULT: "#B0894F",
            soft: "#C9A877",
          },
          stone: "#5B6B6A", // muted text on light
          line: "#DCE3E4", // hairlines on light surfaces
          grid: "rgba(14, 124, 130, 0.10)", // technical grid lines
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "Cambria", "serif"],
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
        soft: "0 4px 24px rgba(11, 42, 43, 0.06)",
        card: "0 18px 50px -18px rgba(11, 42, 43, 0.22)",
        float: "0 12px 36px -12px rgba(11, 42, 43, 0.28)",
        nav: "0 1px 0 rgba(220, 227, 228, 0.9), 0 8px 30px -18px rgba(11, 42, 43, 0.22)",
      },
      transitionDuration: {
        hero: "500ms",
      },
    },
  },
  plugins: [],
};
export default config;
