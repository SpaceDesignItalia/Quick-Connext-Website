import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case study | QuickConnext Building",
  description:
    "Case study e progetti realizzati con QuickConnext Building: hotel, industria, RSA e edifici direzionali. Edifici reali, risultati misurabili.",
  openGraph: {
    title: "Case study | QuickConnext Building",
    description:
      "Case study e progetti realizzati con QuickConnext Building: hotel, industria, RSA e edifici direzionali. Edifici reali, risultati misurabili.",
    type: "website",
  },
};

export default function ProgettiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
