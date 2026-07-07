import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industria · Stabilimenti efficienti e sicuri | QuickConnext Building",
  description:
    "Energia, sicurezza, supervisione e manutenzione predittiva per stabilimenti e magazzini. Un'unica piattaforma BACS con protocolli aperti.",
  alternates: {
    canonical: "/industry",
  },
  openGraph: {
    title: "Industria · Stabilimenti efficienti e sicuri | QuickConnext Building",
    description:
      "Energia, sicurezza, supervisione e manutenzione predittiva per stabilimenti e magazzini. Un'unica piattaforma BACS con protocolli aperti.",
    type: "website",
    images: ["/images/industria-warehouse.png"],
  },
};

export default function IndustryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
