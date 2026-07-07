import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/MotionProvider";
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
  // Rende assoluti i path relativi di OG, canonical e twitter su tutte le pagine.
  metadataBase: new URL("https://quickconnext.eu"),
  icons: {
    icon: "/logo-brand.png",
  },
  title: "QuickConnext Building · Una piattaforma per tutto l'edificio",
  description:
    "Controlla clima, accessi, energia e sicurezza del tuo edificio da un'unica piattaforma BACS. Per hotel, industria, sanità e uffici. Protocolli aperti, zero vendor lock-in.",
  keywords:
    "building automation, domotica hotel, BACS 2026, efficienza energetica hotel, controllo accessi albergo, Più Sviluppo, smart building",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "QuickConnext Building · Una piattaforma per tutto l'edificio",
    description:
      "La piattaforma BACS per hotel, industria, sanità e uffici. Conforme BACS 2026.",
    url: "https://quickconnext.eu",
    siteName: "QuickConnext Building",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/images/hero-hotel.png",
        width: 1200,
        height: 630,
        alt: "QuickConnext Building · Building automation per hotel, industria, sanità e uffici",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickConnext Building · Una piattaforma per tutto l'edificio",
    description:
      "La piattaforma BACS per hotel, industria, sanità e uffici. Conforme BACS 2026.",
    images: ["/images/hero-hotel.png"],
  },
};

/* Dati strutturati Organization: nome, sede e contatti come da footer. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "QuickConnext Building",
  legalName: "Più Sviluppo s.r.l.",
  url: "https://quickconnext.eu",
  logo: "https://quickconnext.eu/logo-brand.png",
  email: "info@quickconnext.eu",
  telephone: "+39 011 036 04 21",
  vatID: "IT12028010010",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Plava 62",
    postalCode: "10135",
    addressLocality: "Torino",
    addressRegion: "TO",
    addressCountry: "IT",
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
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
