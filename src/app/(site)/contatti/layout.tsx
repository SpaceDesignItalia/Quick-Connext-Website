import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti · Parla con un esperto | QuickConnext Building",
  description:
    "Consulenza gratuita, preventivi e analisi di conformità BACS della tua struttura. Chiamaci al (+39) 011 036 04 21 o scrivici: ti ricontattiamo entro 24 ore lavorative.",
  alternates: {
    canonical: "/contatti",
  },
  openGraph: {
    title: "Contatti · Parla con un esperto | QuickConnext Building",
    description:
      "Consulenza gratuita, preventivi e analisi di conformità BACS della tua struttura. Ti ricontattiamo entro 24 ore lavorative.",
    type: "website",
    images: ["/images/cta-night.png"],
  },
};

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
