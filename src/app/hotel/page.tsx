"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Shield,
  Check,
  X,
  Award,
  Users,
  PhoneCall,
  Clock,
  Zap,
  ArrowRight,
} from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1920&q=85";

const scrollSections = [
  {
    id: "accessi",
    number: "01",
    title: "Controllo Accessi Intelligente",
    subtitle: "Section A — Sicurezza ed Automazione Varchi",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1920&q=80",
    statCallout: "Attivazione automatica del profilo camera al check-in e spegnimento totale al check-out.",
    bullets: [
      "Lettore accessi personalizzabile integrato con le maniglie di design dell'hotel.",
      "Tasca attivazione camera (porta badge) intelligente per disabilitare carichi inutili all'uscita.",
      "Sensori di presenza integrati per prevenire lo spegnimento di luci e clima se l'ospite è in camera.",
      "Attivazione automatica del profilo camera al check-in e spegnimento totale al check-out.",
      "Profilo ospite con preferenze memorizzate (temperatura preferita, scenari luminosi ricorsivi).",
    ],
  },
  {
    id: "comfort",
    number: "02",
    title: "Comfort Camera e Climatizzazione",
    subtitle: "Section B — Termoregolazione Avanzata",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1920&q=80",
    statCallout: "Risparmio energetico del 30% per camera senza compromettere il comfort degli ospiti.",
    bullets: [
      "Controllo clima HVAC indipendente per singola camera, integrato nel software centralizzato.",
      "Regolazione automatica basata su temperatura esterna, umidità relativa e ventilazione.",
      "Illuminazione smart preimpostata: scenari relax (luci calde), lavoro (luci neutre), notte (luci guida).",
      "Controllo veneziane e tende motorizzate per sfruttare al meglio l'apporto solare passivo.",
      "Risparmio energetico del 30% per camera senza compromettere il comfort degli ospiti.",
    ],
  },
  {
    id: "sicurezza",
    number: "03",
    title: "Sicurezza Globale ed Antincendio",
    subtitle: "Section C — Monitoraggio H24",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1920&q=80",
    statCallout: "Pannello controllo allarmi centralizzato con notifica immediata in reception.",
    bullets: [
      "Telecamere dome ad altissima definizione per aree comuni, corridoi e perimetrali dell'hotel.",
      "Pannello controllo allarmi centralizzato con notifica immediata in reception.",
      "Rilevatori di fumo, incendio e allagamento wireless integrati per interventi tempestivi.",
      "Sblocco automatico di tutte le vie di fuga e dei varchi elettronici in caso di emergenza.",
    ],
  },
  {
    id: "comuni",
    number: "04",
    title: "Gestione delle Aree Comuni",
    subtitle: "Section D — Ambienti Condivisi Ottimizzati",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1920&q=80",
    statCallout: "Controllo piscina automatizzato: monitoraggio continuo di temperatura, pH e cloro.",
    bullets: [
      "Illuminazione con scenari programmabili orari per lobby, ristorante, spa e aree esterne.",
      "Controllo piscina automatizzato: monitoraggio continuo di temperatura, pH e cloro.",
      "Climatizzazione separata per area a seconda dell'affluenza programmata e degli orari.",
      "Controllo qualità dell'aria (CO2, VOC) per garantire una ventilazione meccanica ottimale.",
    ],
  },
  {
    id: "energia",
    number: "05",
    title: "Monitoraggio Energia e Consumi",
    subtitle: "Section E — Sostenibilità e Risparmio",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80",
    statCallout: "Riduzione certificata dei costi operativi energetici complessivi del 25-40%.",
    bullets: [
      "Monitoraggio real-time di energia elettrica, acqua calda e fredda consumate.",
      "Blocco automatico dei carichi elettrici e del clima se la camera rimane vuota senza badge.",
      "Analisi dei profili di consumo storici per individuare sprechi occulti nelle aree comuni.",
      "Riduzione certificata dei costi operativi energetici complessivi del 25-40%.",
    ],
  },
  {
    id: "manutenzione",
    number: "06",
    title: "Manutenzione Preventiva",
    subtitle: "Section F — Oltre la Reazione al Guasto",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80",
    statCallout: "Riduzione del 45% dei guasti non pianificati e blocco del deterioramento degli impianti.",
    bullets: [
      "Allarmi real-time automatici inviati al responsabile tecnico via app/e-mail in caso di anomalia.",
      "Analisi predittiva basata sui tempi di funzionamento dei motori clima per pianificare i filtri.",
      "Diagnostica remota istantanea che consente di identificare la causa prima del sopralluogo.",
      "Riduzione del 45% dei guasti non pianificati e blocco del deterioramento degli impianti.",
    ],
  },
];

const comparisonRows = [
  {
    feature: "Integrazione Multi-Protocollo Nativale (KNX, Modbus, BACnet, etc.)",
    qc: "Completa (senza licenze aggiuntive)",
    mono: "Parziale (solo il protocollo nativo)",
    prop: "Nessuna (bloccato su standard proprietario)",
  },
  {
    feature: "Monitoraggio Energetico Real-Time Centralizzato",
    qc: "Incluso (con dashboard integrata)",
    mono: "Opzionale (richiede software esterni)",
    prop: "Limitato (non esportabile)",
  },
  {
    feature: "Manutenzione Predittiva & Allarmistica Cloud",
    qc: "Nativa (con analisi predittiva)",
    mono: "No (solo allarmi base su bus)",
    prop: "No (richiede server dedicati in loco)",
  },
  {
    feature: "Conformità BACS Classe A / BACS 2026",
    qc: "Certificata nativamente",
    mono: "Complessa (richiede programmazione ad-hoc)",
    prop: "Assente o vincolata al costruttore",
  },
  {
    feature: "Integrazione PMS / Controllo Accessi Hotel",
    qc: "Sincronizzazione API bidirezionale nativa",
    mono: "Richiede gateway esterni costosi",
    prop: "Chiusa (solo se acquistato dallo stesso brand)",
  },
  {
    feature: "Scalabilità ed Estensione dell'Impianto",
    qc: "Plug & Play (espandibile autonomamente)",
    mono: "Medio (richiede riprogrammazione del system integrator)",
    prop: "Basso (vincolato ai listini e disponibilità del produttore)",
  },
];

function isNegative(value: string) {
  return (
    value.startsWith("No") ||
    value.startsWith("Nessuna") ||
    value.startsWith("Assente") ||
    value.startsWith("Basso")
  );
}

export default function HotelPage() {
  const [activeCalendly, setActiveCalendly] = useState(false);

  return (
    <main className="min-h-screen bg-brand-navy-dark">
      {/* ================= HERO ================= */}
      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Interno camera hotel di lusso"
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

        <div className="absolute inset-0 z-10 noise-texture pointer-events-none" />

        {/* Main content — left aligned, starts at 50vh */}
        <div className="absolute inset-x-0 top-[50vh] z-20 -translate-y-1/2 pl-6 md:pl-20 pr-6 max-w-[780px]">
          <span className="section-label">HOTEL & HOSPITALITY</span>

          <h1 className="mt-6 text-[clamp(2.5rem,5vw,4.5rem)] font-black text-white leading-none tracking-tightest max-w-[700px]">
            Gestisci il tuo hotel con un&apos;unica piattaforma intelligente
          </h1>

          <p className="mt-6 text-lg font-normal text-white opacity-70 max-w-[500px] leading-relaxed">
            Unifica il controllo accessi, la domotica delle camere e il monitoraggio dei consumi
            con un sistema BACS Classe A conforme alle normative europee.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#caratteristiche"
              className="inline-flex items-center bg-brand-teal text-white px-10 py-4 text-[13px] font-bold uppercase tracking-widest transition-colors hover:bg-white hover:text-brand-teal"
            >
              Scopri le funzionalità
            </a>
            <button
              type="button"
              onClick={() => setActiveCalendly(true)}
              className="inline-flex items-center border border-white text-white bg-transparent px-10 py-4 text-[13px] font-bold uppercase tracking-widest transition-colors hover:bg-white hover:text-brand-navy-dark"
            >
              Prenota una Demo
            </button>
          </div>
        </div>

        {/* Stat pills — bottom left */}
        <div className="absolute bottom-[60px] left-6 md:left-20 z-20 flex flex-wrap gap-3">
          {[
            { value: "-35%", label: "Consumi Energetici" },
            { value: "+30%", label: "Soddisfazione Ospiti" },
            { value: "-45%", label: "Guasti Non Pianificati" },
          ].map((pill) => (
            <div
              key={pill.label}
              className="inline-flex items-center gap-3 border-l border-brand-teal pl-5 pr-5 py-3 text-sm text-white backdrop-blur-md"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <span className="font-black text-brand-teal">{pill.value}</span>
              <span className="opacity-80">{pill.label}</span>
            </div>
          ))}
        </div>

        {/* Rotated certification text — bottom right */}
        <p
          className="absolute right-10 bottom-20 z-20 hidden md:block text-xs text-brand-teal opacity-50 tracking-[0.25em] uppercase whitespace-nowrap origin-bottom-right"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          BACS CLASSE B · ISO 27001 · KNX · MODBUS
        </p>
      </section>

      {/* ================= SCROLL SECTIONS ================= */}
      <section id="caratteristiche">
        {scrollSections.map((section, index) => {
          const imageLeft = index % 2 === 0;

          return (
            <div
              key={section.id}
              className="grid grid-cols-1 lg:grid-cols-2 min-h-screen h-screen"
            >
              {/* Image half */}
              <div
                className={`relative h-[50vh] lg:h-full min-h-[320px] ${
                  imageLeft ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/35" />
              </div>

              {/* Content half */}
              <div
                className={`relative flex flex-col justify-center bg-brand-navy-dark px-8 md:px-[60px] py-16 md:py-20 noise-texture dot-grid-dark ${
                  imageLeft ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <span
                  className="absolute top-8 right-8 md:top-12 md:right-12 text-[80px] font-black text-white leading-none select-none pointer-events-none"
                  style={{ opacity: 0.05 }}
                  aria-hidden="true"
                >
                  {section.number}
                </span>

                <div className="relative z-10 max-w-xl">
                  <span className="section-label">{section.subtitle}</span>

                  <h2 className="mt-5 text-[42px] font-extrabold text-white leading-[1.1] tracking-tightest mb-6">
                    {section.title}
                  </h2>

                  <ul className="flex flex-col">
                    {section.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className={`flex items-start gap-4 py-4 border-t border-white/[0.08] ${
                          bIdx === section.bullets.length - 1 ? "border-b border-white/[0.08]" : ""
                        }`}
                      >
                        <Check className="w-4 h-4 text-brand-teal shrink-0 mt-1 stroke-[3]" />
                        <span className="text-base text-white opacity-80 leading-relaxed">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className="mt-8 px-5 py-4 border"
                    style={{
                      background: "rgba(0,196,204,0.08)",
                      borderColor: "rgba(0,196,204,0.3)",
                    }}
                  >
                    <p className="text-sm text-white opacity-90 leading-relaxed">
                      {section.statCallout}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ================= COMPARISON TABLE ================= */}
      <section className="py-24 bg-brand-navy-dark noise-texture dot-grid-dark relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <span className="section-label">ANALISI TECNICA COMPARATIVA</span>
          <h2 className="mt-4 text-4xl md:text-[56px] font-extrabold text-white leading-none tracking-tightest max-w-3xl">
            Perché scegliere QuickConnext?
          </h2>
          <p className="mt-4 text-base text-white opacity-80 max-w-2xl leading-relaxed">
            Mettiamo a confronto le prestazioni di QuickConnext con i sistemi di automazione tradizionali.
          </p>

          <div className="mt-16 overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[800px]">
              <thead>
                <tr className="text-xs uppercase tracking-widest">
                  <th className="p-5 font-bold text-white/60 w-[34%] border-b border-white/10">
                    Caratteristica
                  </th>
                  <th
                    className="p-5 font-bold text-brand-teal w-[22%] border border-brand-teal relative"
                    style={{ background: "rgba(0,196,204,0.15)" }}
                  >
                    QuickConnext Building
                    <span className="absolute -top-3 right-4 bg-brand-teal text-white text-[8px] font-black px-2 py-0.5 uppercase tracking-wider">
                      Best Choice
                    </span>
                  </th>
                  <th className="p-5 font-semibold text-white/50 w-[22%] border-b border-white/10">
                    SI Mono Protocollo
                  </th>
                  <th className="p-5 font-semibold text-white/50 w-[22%] border-b border-white/10">
                    SI Protocollo Proprietario
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    style={{
                      background: rIdx % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                    }}
                  >
                    <td className="p-5 font-semibold text-white/90 border-b border-white/[0.06] text-sm">
                      {row.feature}
                    </td>
                    <td className="p-5 border border-brand-teal/40 text-sm">
                      <div className="flex items-start gap-2 text-brand-teal font-semibold">
                        <Check className="w-4 h-4 shrink-0 mt-0.5 stroke-[3]" />
                        <span>{row.qc}</span>
                      </div>
                    </td>
                    <td className="p-5 border-b border-white/[0.06] text-sm">
                      <div className="flex items-start gap-2 text-white/60">
                        {isNegative(row.mono) ? (
                          <X className="w-4 h-4 shrink-0 mt-0.5 text-red-500/60" />
                        ) : (
                          <Check className="w-4 h-4 shrink-0 mt-0.5 text-white/30" />
                        )}
                        <span>{row.mono}</span>
                      </div>
                    </td>
                    <td className="p-5 border-b border-white/[0.06] text-sm">
                      <div className="flex items-start gap-2 text-white/60">
                        {isNegative(row.prop) ? (
                          <X className="w-4 h-4 shrink-0 mt-0.5 text-red-500/60" />
                        ) : (
                          <Check className="w-4 h-4 shrink-0 mt-0.5 text-white/30" />
                        )}
                        <span>{row.prop}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= FINANZA DI PROGETTO ================= */}
      <section className="relative bg-brand-navy-dark border-t border-white/[0.06] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">
          {/* Dark left — decorative € */}
          <div className="relative flex flex-col justify-center px-8 md:px-16 py-20 noise-texture dot-grid-dark">
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[280px] font-black text-white select-none pointer-events-none leading-none"
              style={{ opacity: 0.04 }}
              aria-hidden="true"
            >
              €
            </span>
            <div className="relative z-10 max-w-md">
              <span className="section-label">FINANZIAMENTI E RITORNO D&apos;INVESTIMENTO</span>
              <h2 className="mt-5 text-4xl md:text-[48px] font-extrabold text-white leading-none tracking-tightest">
                Finanza di Progetto ed Agevolazioni
              </h2>
              <p className="mt-6 text-base text-white opacity-80 leading-relaxed">
                Realizziamo l&apos;efficientamento tecnologico del tuo hotel riducendo al minimo
                l&apos;esposizione finanziaria, grazie a soluzioni di investimento flessibili e agevolate.
              </p>
            </div>
          </div>

          {/* Right — cards + stats */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-20 bg-[#0a1525]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-brand-navy-dark border-t-2 border-brand-teal p-6 flex flex-col gap-4">
                <div className="w-10 h-10 border border-brand-teal/30 flex items-center justify-center text-brand-teal">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Agevolazioni Pubbliche</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Accesso agevolato a bandi regionali, incentivi statali, Transizione 5.0, Certificati Bianchi ed ecobonus alberghi per finanziare fino al 60% dell&apos;investimento.
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["Transizione 5.0", "Certificati Bianchi", "Ecobonus Alberghi"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider text-brand-teal border border-brand-teal/30 px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-brand-navy-dark border-t-2 border-brand-teal p-6 flex flex-col gap-4">
                <div className="w-10 h-10 border border-brand-teal/30 flex items-center justify-center text-brand-teal">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Investimenti ESCO</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Formula Energy Performance Contract (EPC) tramite ESCO partner: l&apos;impianto viene installato a costo zero e si ripaga interamente tramite i risparmi energetici generati.
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["EPC", "Zero CapEx", "Risparmio Energetico"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider text-brand-teal border border-brand-teal/30 px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/[0.08]">
              {[
                { value: "+100M€", label: "Progetti Gestiti" },
                { value: "+95%", label: "Approvazione Pratiche" },
                { value: "Team", label: "Dedicato Interno" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl md:text-4xl font-black text-brand-teal leading-none tracking-tightest">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ASSISTENZA ================= */}
      <section className="py-24 bg-[#F8FAFB] relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16">
            <span className="section-label">GARANZIA E SUPPORTO CONTINUO</span>
            <h2 className="mt-4 text-4xl md:text-[56px] font-extrabold text-brand-navy leading-none tracking-tightest">
              Assistenza Professionale
            </h2>
            <p className="mt-4 text-base text-brand-navy opacity-80 leading-relaxed">
              Garantiamo la massima continuità operativa del tuo albergo con standard di servizio elevati.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Assistenza H24 / 7",
                desc: "Numero telefonico dedicato ed email diretta con i tecnici per supporto software immediato ed allarmi blocco impianto.",
                icon: PhoneCall,
              },
              {
                title: "Intervento On-Site 24h",
                desc: "Invio del tecnico sul posto garantito entro 24 ore dalla segnalazione dell'anomalia hardware in tutta Italia.",
                icon: Clock,
              },
              {
                title: "Garanzia 24 Mesi",
                desc: "Copertura totale su tutti i controller hardware, sensori e lettori installati, con sostituzione immediata inclusa.",
                icon: Award,
              },
              {
                title: "Plug and Play",
                desc: "La piattaforma viene consegnata pre-configurata e testata nei nostri laboratori per minimizzare i tempi di cantiere in loco.",
                icon: Zap,
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="flex flex-col gap-5 pt-6 border-t-2 border-brand-teal">
                  <Icon className="w-6 h-6 text-brand-teal" />
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certification strip */}
          <div className="mt-20 pt-10 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              {["ISO 27001", "ISO 27017", "ISO 27018"].map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 border-l-2 border-l-brand-teal"
                >
                  <Shield className="w-5 h-5 text-brand-teal" />
                  <span className="text-sm font-black text-brand-navy tracking-wide uppercase">
                    {cert}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative py-32 bg-brand-navy-dark overflow-hidden text-center noise-texture">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,196,204,0.18) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-4xl md:text-[56px] font-extrabold text-white leading-none tracking-tightest">
            Vuoi vedere QuickConnext in azione nel tuo hotel?
          </h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">
            Prenota un incontro virtuale gratuito con un nostro specialista per analizzare la planimetria e stimare il ritorno dell&apos;investimento.
          </p>

          <button
            type="button"
            onClick={() => setActiveCalendly(true)}
            className="mt-10 inline-flex items-center gap-3 bg-brand-teal text-white px-12 py-5 text-[13px] font-bold uppercase tracking-widest transition-colors hover:bg-white hover:text-brand-teal"
          >
            Prenota una demo gratuita
            <ArrowRight size={16} />
          </button>

          <p className="mt-6 text-xs text-gray-500 tracking-wide">
            Nessun impegno · Risposta entro 24h · Demo personalizzata
          </p>
        </div>
      </section>

      {/* ================= CALENDLY MODAL ================= */}
      {activeCalendly && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-brand-navy border border-brand-teal w-full max-w-3xl overflow-hidden relative">
            <div className="bg-brand-navy-dark border-b border-white/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-brand-teal animate-pulse" />
                <span className="text-white text-xs font-bold uppercase tracking-widest">
                  Calendly Booking System
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveCalendly(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 min-h-[400px]">
              <div className="md:w-1/3 flex flex-col justify-between text-slate-300 text-sm gap-6">
                <div>
                  <h3 className="text-white font-extrabold text-xl mb-1.5">Demo QuickConnext Building</h3>
                  <div className="text-xs text-brand-teal font-semibold mb-4">Duration: 30 min</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Un incontro one-to-one per analizzare le specifiche tecniche della tua struttura e definire un piano di fattibilità e agevolazioni.
                  </p>
                </div>
                <div className="text-xs text-slate-500">Operato da Più Sviluppo S.r.l.</div>
              </div>

              <div className="md:w-2/3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
                    Seleziona una Data e Ora
                  </h4>
                  <div className="grid grid-cols-5 gap-2 mb-6">
                    {["Lun 8", "Mar 9", "Mer 10", "Gio 11", "Ven 12"].map((day, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="bg-white/5 border border-white/10 hover:border-brand-teal hover:bg-brand-teal/10 p-2.5 text-center transition-all group"
                      >
                        <div className="text-[10px] text-slate-400 font-bold group-hover:text-brand-teal uppercase">
                          {day.split(" ")[0]}
                        </div>
                        <div className="text-sm font-bold text-white mt-0.5">{day.split(" ")[1]} Giu</div>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {["10:00", "11:30", "14:30", "15:00", "16:30", "17:00"].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => {
                          alert(
                            `Demo prenotata con successo per le ore ${time}! Riceverai una mail di conferma.`
                          );
                          setActiveCalendly(false);
                        }}
                        className="bg-white/5 border border-white/10 hover:border-brand-teal text-white hover:bg-brand-teal hover:text-white py-2 text-center text-xs font-bold transition-all"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-center text-[10px] text-slate-500 border-t border-white/5 pt-4 mt-6">
                  * La simulazione invia una richiesta al team tecnico QuickConnext.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
