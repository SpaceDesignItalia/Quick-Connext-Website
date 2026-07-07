import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chi siamo | QuickConnext Building",
  description:
    "QuickConnext Building è il brand specialistico di Più Sviluppo S.r.l. per la building automation: standard aperti, personale interno e certificazioni ISO 27001, 27017, 27018.",
  alternates: {
    canonical: "/chi-siamo",
  },
  openGraph: {
    title: "Chi siamo | QuickConnext Building",
    description:
      "QuickConnext Building è il brand specialistico di Più Sviluppo S.r.l. per la building automation: standard aperti, personale interno e certificazioni ISO 27001, 27017, 27018.",
    type: "website",
  },
};

export default function ChiSiamoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
