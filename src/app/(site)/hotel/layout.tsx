import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotel · L'hotel che si gestisce da solo | QuickConnext Building",
  description:
    "Check-in automatico, comfort camera, sicurezza ed energia gestiti da un'unica piattaforma. Più comfort per gli ospiti, meno costi e guasti per l'hotel.",
  alternates: {
    canonical: "/hotel",
  },
  openGraph: {
    title: "Hotel · L'hotel che si gestisce da solo | QuickConnext Building",
    description:
      "Check-in automatico, comfort camera, sicurezza ed energia gestiti da un'unica piattaforma. Più comfort per gli ospiti, meno costi e guasti per l'hotel.",
    type: "website",
    images: ["/images/hero-hotel.png"],
  },
};

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  return children;
}
