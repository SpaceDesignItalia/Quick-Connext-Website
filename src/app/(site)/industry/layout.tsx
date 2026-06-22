import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industria · Stabilimenti efficienti e sicuri | QuickConnext Building",
  description:
    "Energia, sicurezza, supervisione e manutenzione predittiva per stabilimenti e magazzini. Un'unica piattaforma BACS con protocolli aperti.",
  openGraph: {
    title: "Industria · Stabilimenti efficienti e sicuri | QuickConnext Building",
    description:
      "Energia, sicurezza, supervisione e manutenzione predittiva per stabilimenti e magazzini. Un'unica piattaforma BACS con protocolli aperti.",
    type: "website",
  },
};

export default function IndustryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
