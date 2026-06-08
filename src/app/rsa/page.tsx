"use client";

import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowLeft } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=85";

export default function RsaPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[60vh] min-h-[480px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Struttura sanitaria RSA"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(7,14,26,0.3) 0%, rgba(7,14,26,0.92) 100%)",
          }}
        />
        <div className="absolute inset-0 z-[2] noise-texture dot-grid-dark pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-4">
          <span className="section-label">HEALTHCARE & SENIOR LIVING</span>
          <h1 className="heading-h1">RSA / Sanitario</h1>
          <p className="text-white text-base max-w-2xl leading-relaxed font-sans opacity-60">
            Automazione e sicurezza assistita per cliniche, ospedali e strutture per la terza età.
          </p>
        </div>
      </section>

      <section className="py-24 section-light noise-texture dot-grid-light text-center">
        <div className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-teal">
            <Activity className="w-8 h-8" />
          </div>
          <h2 className="heading-h2-light mt-4">Contenuto in arrivo</h2>
          <p className="body-text text-brand-navy">
            Stiamo sviluppando le pagine descrittive per i sistemi di monitoraggio parametri ambientali,
            controllo qualità dell&apos;aria, rilevamento cadute integrato e controllo accessi specifici per reparti protetti.
            Il modulo per le RSA e il settore Sanitario sarà disponibile a breve.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Link
              href="/"
              className="cta-button text-brand-teal hover:text-brand-navy"
            >
              <ArrowLeft size={16} />
              Torna alla Home
            </Link>
            <Link href="/contatti" className="cta-button-primary">
              Richiedi Informazioni
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
