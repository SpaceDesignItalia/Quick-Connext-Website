import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informativa sulla Privacy | QuickConnext Building",
  description:
    "Come trattiamo i dati personali degli utenti del sito quickconnext.eu, in conformità al GDPR (Regolamento UE 2016/679).",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
