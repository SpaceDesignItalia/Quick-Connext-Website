import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edifici e Uffici · Direzionali smart e a norma | QuickConnext Building",
  description:
    "Comfort, accessi, energia e sicurezza per uffici e direzionali. La piattaforma BACS conforme alla direttiva 2026, con protocolli aperti.",
  alternates: {
    canonical: "/building",
  },
  openGraph: {
    title: "Edifici e Uffici · Direzionali smart e a norma | QuickConnext Building",
    description:
      "Comfort, accessi, energia e sicurezza per uffici e direzionali. La piattaforma BACS conforme alla direttiva 2026, con protocolli aperti.",
    type: "website",
    images: ["/images/edifici-lobby.png"],
  },
};

export default function BuildingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
