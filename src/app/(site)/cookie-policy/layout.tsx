import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informativa sui Cookie | QuickConnext Building",
  description:
    "Quali cookie utilizza il sito quickconnext.eu, a cosa servono e come gestire il consenso.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
