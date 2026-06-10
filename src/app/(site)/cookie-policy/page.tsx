"use client";

import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-soft">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-teal hover:text-brand-navy transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Torna alla Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-brand-teal" />
          <h1 className="text-3xl font-black text-brand-navy tracking-tight font-sans">
            Informativa sui Cookie
          </h1>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm md:text-base leading-relaxed font-sans border-t border-slate-100 pt-8">
          <p>
            Questo sito utilizza cookie per migliorare l&apos;esperienza dell&apos;utente e garantire il corretto funzionamento dei nostri servizi. 
            Questa informativa spiega cosa sono i cookie, come li utilizziamo e come gestirli.
          </p>
          
          <h3 className="text-brand-navy font-bold text-lg mt-8 mb-2">1. Cosa sono i Cookie</h3>
          <p>
            I cookie sono piccoli file di testo che i siti visitati dall&apos;utente inviano al suo browser, dove vengono memorizzati 
            per essere poi ritrasmessi agli stessi siti alla visita successiva.
          </p>

          <h3 className="text-brand-navy font-bold text-lg mt-8 mb-2">2. Cookie Utilizzati in questo Sito</h3>
          <p>
            Utilizziamo le seguenti macro-categorie di cookie:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Cookie Tecnici Necessari:</strong> Essenziali per consentire la navigazione all&apos;interno del sito e l&apos;utilizzo di tutte le sue funzionalità (es. apertura popup di prenotazione). Non possono essere disabilitati.
            </li>
            <li>
              <strong>Cookie di Prestazione e Statistici (opzionali):</strong> Raccolgono informazioni anonime sulle modalità di utilizzo del sito per fini di ottimizzazione delle prestazioni (es. pagine più visitate, tempi di caricamento).
            </li>
          </ul>

          <h3 className="text-brand-navy font-bold text-lg mt-8 mb-2">3. Come Disabilitare i Cookie</h3>
          <p>
            L&apos;utente può scegliere in qualsiasi momento di limitare o bloccare i cookie modificando le impostazioni del proprio browser 
            Internet. Tuttavia, la disabilitazione dei cookie tecnici potrebbe compromettere la corretta visualizzazione di alcune sezioni del sito.
          </p>
        </div>
      </div>
    </main>
  );
}
