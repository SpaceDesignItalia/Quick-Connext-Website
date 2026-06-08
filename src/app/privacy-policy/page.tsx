"use client";

import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            Informativa sulla Privacy
          </h1>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-sm md:text-base leading-relaxed font-sans border-t border-slate-100 pt-8">
          <p>
            Gentile Utente, in conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR - Regolamento UE 2016/679), 
            questa pagina descrive le modalità di trattamento dei dati personali degli utenti che consultano il sito web <strong>quickconnext.eu</strong>.
          </p>
          
          <h3 className="text-brand-navy font-bold text-lg mt-8 mb-2">1. Titolare del Trattamento</h3>
          <p>
            Il Titolare del Trattamento è <strong>Più Sviluppo S.r.l.</strong>, con sede legale in Via del Lavoro, 12, 24100 Bergamo (BG), Italia. 
            E-mail di contatto: <a href="mailto:info@quickconnext.eu" className="text-brand-teal font-semibold hover:underline">info@quickconnext.eu</a>.
          </p>

          <h3 className="text-brand-navy font-bold text-lg mt-8 mb-2">2. Tipi di Dati Raccolti</h3>
          <p>
            Attraverso il modulo di contatto o la richiesta di demo, raccogliamo: Nome e Cognome, Nome dell&apos;Azienda, Indirizzo E-mail, 
            Numero di Telefono e il Settore professionale. Raccogliamo inoltre dati di navigazione anonimi (indirizzi IP, browser utilizzato) 
            per scopi statistici.
          </p>

          <h3 className="text-brand-navy font-bold text-lg mt-8 mb-2">3. Finalità del Trattamento</h3>
          <p>
            I dati personali forniti volontariamente dagli utenti sono utilizzati esclusivamente per:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Rispondere alle richieste di informazioni o di demo gratuita;</li>
            <li>Inviare proposte commerciali inerenti i sistemi QuickConnext Building;</li>
            <li>Adempiere agli obblighi legali e fiscali vigenti.</li>
          </ul>

          <h3 className="text-brand-navy font-bold text-lg mt-8 mb-2">4. Sicurezza dei Dati</h3>
          <p>
            I dati raccolti sono ospitati su server protetti situati all&apos;interno dell&apos;Unione Europea e trattati applicando 
            le misure di sicurezza previste dagli standard <strong>ISO 27001</strong>, <strong>ISO 27017</strong> e <strong>ISO 27018</strong>.
          </p>
        </div>
      </div>
    </main>
  );
}
