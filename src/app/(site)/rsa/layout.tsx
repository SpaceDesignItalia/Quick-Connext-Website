import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RSA e Sanitario — Ambienti di cura connessi | QuickConnext Building",
  description:
    "Comfort, qualità dell'aria, sicurezza e chiamata infermieri integrati. La piattaforma BACS per RSA, cliniche e strutture sanitarie.",
  openGraph: {
    title: "RSA e Sanitario — Ambienti di cura connessi | QuickConnext Building",
    description:
      "Comfort, qualità dell'aria, sicurezza e chiamata infermieri integrati. La piattaforma BACS per RSA, cliniche e strutture sanitarie.",
    type: "website",
  },
};

export default function RsaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
