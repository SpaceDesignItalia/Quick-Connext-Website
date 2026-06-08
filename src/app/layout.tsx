import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "QuickConnext Building | Building Automation per Hotel e Aziende",
  description: "QuickConnext Building è il prodotto leader nella building automation per hotel, rsa, building commerciali e industria. Riduci i consumi fino al 35% con la conformità BACS 2026.",
  keywords: "building automation, domotica hotel, BACS 2026, efficienza energetica hotel, controllo accessi albergo, Più Sviluppo, smart building",
  openGraph: {
    title: "QuickConnext Building | Building Automation per Hotel e Aziende",
    description: "Sperimenta la building automation di livello superiore. Conformità BACS 2026, risparmio energetico e comfort integrato in un'unica piattaforma intelligente.",
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
    <html lang="it" className="scroll-smooth">
      <body
        className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} font-sans antialiased text-brand-navy bg-brand-ivory`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
