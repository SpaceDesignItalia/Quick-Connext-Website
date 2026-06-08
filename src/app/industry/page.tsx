"use client";

import Link from "next/link";
import { Factory, ArrowLeft } from "lucide-react";

export default function IndustryPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[60vh] w-full flex items-center justify-center section-dark noise-texture dot-grid-dark overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-assembling-parts-in-a-factory-42861-large.mp4"
            type="video/mp4"
          />
        </video>
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-4">
          <span className="section-label">INDUSTRIA & AUTOMAZIONE</span>
          <h1 className="heading-h1">Industry</h1>
          <p className="text-white text-base max-w-2xl leading-relaxed font-sans opacity-60">
            Soluzioni ad alta affidabilità per il telecontrollo impianti e la gestione energetica industriale.
          </p>
        </div>
      </section>

      <section className="py-24 section-light noise-texture dot-grid-light text-center">
        <div className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-6 relative z-10">
          <div className="w-16 h-16 bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-teal">
            <Factory className="w-8 h-8" />
          </div>
          <h2 className="heading-h2-light mt-4">Contenuto in arrivo</h2>
          <p className="body-text text-brand-navy">
            Stiamo definendo le schede tecniche dettagliate dei moduli di integrazione PLC,
            data logger e controllo carichi industriali per la conformità alla Transizione 5.0.
            Il modulo per il settore Industry sarà disponibile a breve.
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
