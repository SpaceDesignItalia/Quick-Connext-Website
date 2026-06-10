"use client";

import { Shield, Eye, Database, CheckCircle, Award } from "lucide-react";

export default function ChiSiamoPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative py-32 section-dark noise-texture dot-grid-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">LA NOSTRA VISIONE</span>
            <h1 className="heading-h2-dark mt-4">
              L&apos;evoluzione intelligente degli spazi e degli edifici
            </h1>
            <p className="body-text text-slate-300 mt-6">
              QuickConnext Building nasce per ridisegnare il rapporto tra tecnologia ed edilizia,
              creando sistemi che semplificano la gestione operativa e rispettano l&apos;ambiente.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 section-light noise-texture dot-grid-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="flex flex-col gap-6">
              <span className="section-label">IL NOSTRO DNA</span>
              <h2 className="heading-h2-light">
                Un&apos;identità autonoma focalizzata sull&apos;eccellenza BACS
              </h2>
              <div className="teal-rule w-16" />

              <div className="body-text text-brand-navy space-y-6">
                <p>
                  QuickConnext Building è un brand specialistico di <strong>Più Sviluppo S.r.l.</strong> concepito per rispondere alle crescenti esigenze di digitalizzazione ed efficientamento del settore proptech. Pur beneficiando dell&apos;esperienza finanziaria e gestionale della casa madre, QuickConnext vive di un&apos;identità totalmente separata, tecnologica e orientata allo sviluppo di firmware ed integrazioni software proprietarie.
                </p>
                <p>
                  Crediamo che la vera building automation debba superare i limiti storici dell&apos;installazione classica: frammentazione dei protocolli, contratti di manutenzione vincolanti ed elevata complessità di programmazione. Con il nostro approccio software-defined, creiamo un ecosistema flessibile ed espandibile basato su standard aperti come KNX, Modbus e BACnet.
                </p>
                <p>
                  Il nostro obiettivo è chiaro: accompagnare hotel, aziende ed RSA verso l&apos;adeguamento normativo obbligatorio del 2026, riducendo le emissioni energetiche e migliorando l&apos;esperienza quotidiana di gestori ed ospiti.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:mt-8">
              {[
                {
                  title: "Open Protocol",
                  desc: "Rifiutiamo i sistemi chiusi. Lavoriamo solo con standard internazionali condivisi per garantire la massima libertà futura del cliente.",
                  icon: CheckCircle,
                },
                {
                  title: "Cloud & IoT Sicuro",
                  desc: "Monitoraggio e telecontrollo centralizzati basati su server europei ridondati ad altissima sicurezza logica.",
                  icon: Shield,
                },
                {
                  title: "Design Premium",
                  desc: "L&apos;estetica e l&apos;ergonomia dell&apos;interfaccia utente sono per noi fondamentali: creiamo cruscotti puliti e intuitivi in stile medtech.",
                  icon: Eye,
                },
                {
                  title: "Competenza Dedicata",
                  desc: "Dall&apos;analisi delle planimetrie fino al collaudo finale e alla richiesta di agevolazioni ESCO, gestiamo tutto internamente.",
                  icon: Award,
                },
              ].map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-100 border-l-brand-teal p-6 hover:border-brand-teal transition-all duration-300 flex flex-col gap-4"
                  >
                    <div className="w-10 h-10 bg-white border border-slate-200 flex items-center justify-center text-brand-teal">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-navy mb-1.5 text-base tracking-tightest">
                        {value.title}
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed font-sans opacity-80">
                        {value.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 section-light noise-texture dot-grid-light border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mb-20">
            <span className="section-label">STANDARDS DI SICUREZZA EUROPEI</span>
            <h2 className="heading-h2-light mt-4">
              Certificazioni & Conformità GDPR
            </h2>
            <p className="body-text text-brand-navy mt-4">
              Proteggiamo i dati operativi del tuo edificio e la privacy dei tuoi ospiti applicando i più alti standard di sicurezza internazionali.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                code: "ISO 27001",
                title: "Gestione Sicurezza Informazioni",
                desc: "Standard internazionale che certifica l'adozione di un Sistema di Gestione per la Sicurezza delle Informazioni (SGSI). Garantisce riservatezza, integrità e disponibilità dei dati.",
                icon: Shield,
              },
              {
                code: "ISO 27017",
                title: "Sicurezza dei Servizi Cloud",
                desc: "Certificazione specifica che definisce controlli avanzati di sicurezza logica per i servizi di cloud computing erogati da QuickConnext, sia lato fornitore che cliente.",
                icon: Database,
              },
              {
                code: "ISO 27018",
                title: "Protezione Privacy PII in Cloud",
                desc: "Standard dedicato alla protezione delle PII (Personally Identifiable Information) all'interno del cloud pubblico. Garantisce piena conformità alle normative europee del GDPR.",
                icon: Eye,
              },
            ].map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 border-l-brand-teal p-8 flex flex-col gap-6 hover:border-brand-teal transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-brand-teal font-extrabold text-xl font-sans tracking-wide">
                      {cert.code}
                    </div>
                    <div className="w-10 h-10 bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-brand-navy tracking-tightest">
                      {cert.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-sans opacity-80">
                      {cert.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
