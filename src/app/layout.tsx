import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const geistMonoLocal = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo-brand.png",
  },
  title: "QuickConnext Building · Una piattaforma per tutto l'edificio",
  description:
    "Controlla clima, accessi, energia e sicurezza del tuo edificio da un'unica piattaforma BACS. Per hotel, industria, sanità e uffici. Protocolli aperti, zero vendor lock-in.",
  keywords:
    "building automation, domotica hotel, BACS 2026, efficienza energetica hotel, controllo accessi albergo, Più Sviluppo, smart building",
  openGraph: {
    title: "QuickConnext Building · Una piattaforma per tutto l'edificio",
    description:
      "La piattaforma BACS per hotel, industria, sanità e uffici. Conforme BACS 2026.",
    url: "https://quickconnext.eu",
    siteName: "QuickConnext Building",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`scroll-smooth ${inter.variable} ${fraunces.variable} ${geistMonoLocal.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
