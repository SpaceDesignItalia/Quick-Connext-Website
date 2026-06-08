"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Factory,
  Hotel as HotelIcon,
  Activity,
  Building as BuildingIcon,
  ArrowRight,
  AirVent,
  Lightbulb,
  Flame,
  Cctv,
  Thermometer,
  ScanLine,
  Gauge,
  TabletSmartphone,
} from "lucide-react";

const archLeft = [
  { icon: AirVent, label: "Climatizzazione HVAC", sub: "Clima per zona" },
  { icon: Lightbulb, label: "Illuminazione smart", sub: "Scenari & presenza" },
  { icon: Flame, label: "Rilevazione incendi", sub: "Sicurezza attiva" },
  { icon: Cctv, label: "Videosorveglianza", sub: "Controllo varchi" },
];

const archRight = [
  { icon: Thermometer, label: "Termostato camera", sub: "22.0 °C" },
  { icon: ScanLine, label: "Controllo accessi", sub: "Badge & keyless" },
  { icon: Gauge, label: "Energia & consumi", sub: "Monitoraggio live" },
  { icon: TabletSmartphone, label: "Supervisione remota", sub: "Da ogni device" },
];

const heroSectors = [
  {
    id: "hotel",
    category: "HOSPITALITY",
    title: "Hotel",
    description: "Accessi, comfort ed energia in un'unica regia, per un'ospitalità di eccellenza.",
    bgImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1100&q=80",
    icon: HotelIcon,
    href: "/hotel",
  },
  {
    id: "industry",
    category: "AUTOMATION",
    title: "Industry",
    description: "Monitoraggio e controllo degli impianti industriali in tempo reale.",
    bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1100&q=80",
    icon: Factory,
    href: "/industry",
  },
  {
    id: "rsa",
    category: "HEALTHCARE",
    title: "RSA / Sanitario",
    description: "Sicurezza e comfort assistito per case di cura e cliniche.",
    bgImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1100&q=80",
    icon: Activity,
    href: "/rsa",
  },
  {
    id: "building",
    category: "BUSINESS",
    title: "Building / Direzionale",
    description: "Efficienza BACS e automazione intelligente per uffici e spazi commerciali.",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1100&q=80",
    icon: BuildingIcon,
    href: "/building",
  },
];

const benefits = [
  {
    title: "Efficienza Energetica",
    stat: "01",
    description: "Algoritmi di climatizzazione predittiva ed illuminazione automatizzata tagliano gli sprechi energetici all'istante.",
  },
  {
    title: "Esperienza Ospite",
    stat: "02",
    description: "Accessi keyless contactless e scenari di comfort personalizzati (luci, HVAC) creano soggiorni da sogno.",
  },
  {
    title: "Manutenzione Preventiva",
    stat: "03",
    description: "Allarmi istantanei e diagnostica centralizzata prevengono i guasti critici prima che danneggino il servizio.",
  },
  {
    title: "Conformità BACS 2026",
    stat: "2026",
    description: "Adempimento obbligatorio alla direttiva EPBD per impianti termici ed elettrici non residenziali sopra i 290 kW.",
  },
  {
    title: "+2 Classi Energetiche APE",
    stat: "+2",
    description: "Il passaggio a BACS Classe A incrementa il valore dell'immobile migliorando sensibilmente l'indice APE.",
  },
];

const certifications = [
  "BACS CLASSE A EN 15232",
  "ISO 27001 SICUREZZA",
  "ISO 27017 CLOUD",
  "ISO 27018 PRIVACY",
  "CE MARK",
  "KNX PARTNER",
  "MODBUS READY",
  "BACNET DIRECT",
];

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen">
      {/* ================= HERO — 4 PILLARS ================= */}
      <section className="relative min-h-screen flex flex-col section-light tech-grid">
        <div className="grid-fade absolute inset-0" />
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[620px] w-[920px] rounded-full opacity-[0.12]"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--brand-teal-light) 0%, transparent 70%)",
          }}
        />

        {/* Headline */}
        <div className="max-w-[1280px] mx-auto w-full px-6 md:px-12 pt-32 md:pt-40 pb-9 md:pb-12 relative z-10">
          <div className="hero-rise max-w-4xl">
            <span className="mono-label">Sistema di Building Automation</span>
            <h1 className="heading-h1 mt-5">
              Un solo cervello per{" "}
              <span className="italic text-brand-teal">l&apos;intero edificio.</span>
            </h1>
            <p className="body-text mt-6 max-w-2xl">
              Clima, luce, accessi, energia e sicurezza in un&apos;unica
              piattaforma aperta. Scegli il tuo settore: progettiamo,
              installiamo e gestiamo tutto noi.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row border-t border-brand-line lg:min-h-[56vh]">
          {heroSectors.map((s, i) => {
            const Icon = s.icon;
            const media = (s as { media?: string }).media;
            const isVideo = media ? /\.(mp4|webm)$/i.test(media) : false;
            const isActive = hoveredIndex === i;
            const isDim = hoveredIndex !== null && !isActive;
            return (
              <Link
                key={s.id}
                href={s.href}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative overflow-hidden border-b lg:border-b-0 lg:border-r border-brand-line last:border-0 flex transition-[flex-grow] duration-500 ease-out"
                style={{ flexGrow: isActive ? 1.9 : 1 }}
              >
                {/* media (video / gif / image) */}
                <div
                  className={`absolute inset-0 overflow-hidden transition-opacity duration-700 ${
                    isDim ? "opacity-40" : "opacity-100"
                  }`}
                >
                  {isVideo ? (
                    <video
                      className="w-full h-full object-cover kenburns-soft"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={s.bgImage}
                    >
                      <source src={media} />
                    </video>
                  ) : (
                    <div
                      className="w-full h-full bg-cover bg-center kenburns"
                      style={{
                        backgroundImage: `url(${media || s.bgImage})`,
                        transformOrigin: [
                          "center",
                          "top right",
                          "bottom left",
                          "top center",
                        ][i % 4],
                      }}
                    />
                  )}
                </div>
                {/* petrol cohesion overlay */}
                <div className="absolute inset-0 bg-brand-navy-dark/45 group-hover:bg-brand-navy-dark/20 transition-colors duration-500" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,42,43,0.92) 0%, rgba(11,42,43,0.25) 45%, transparent 78%)",
                  }}
                />
                {/* top accent */}
                <span
                  className={`absolute top-0 left-0 h-[3px] bg-brand-teal-light transition-all duration-500 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />

                {/* content */}
                <div className="relative z-10 w-full min-h-[30vh] lg:min-h-0 flex flex-col justify-between p-7 lg:p-8">
                  <div className="flex items-center justify-end">
                    <span className="hero-panel-icon group-hover:border-brand-teal-light group-hover:text-brand-teal-light transition-colors">
                      <Icon className="w-5 h-5" />
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-teal-light">
                      {s.category}
                    </span>
                    <h2 className="font-serif text-3xl lg:text-[34px] font-semibold text-white mt-2 leading-none">
                      {s.title}
                    </h2>
                    <p
                      className={`text-sm text-white/75 leading-snug mt-3 max-w-xs transition-all duration-500 lg:overflow-hidden ${
                        isActive
                          ? "lg:opacity-100 lg:max-h-24"
                          : "lg:opacity-0 lg:max-h-0"
                      }`}
                    >
                      {s.description}
                    </p>
                    <span
                      className={`cta-link text-white mt-4 transition-all duration-500 ${
                        isActive
                          ? "lg:opacity-100 lg:translate-y-0"
                          : "lg:opacity-0 lg:translate-y-2"
                      }`}
                    >
                      Scopri di più
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ================= WHAT IS BUILDING AUTOMATION ================= */}
      <section className="py-24 section-light noise-texture dot-grid-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20">
            <div>
              <span className="section-label">TECNOLOGIA INTEGRATA</span>
              <h2 className="heading-h2-light mt-4">
                Cos&apos;è la Building Automation?
              </h2>
            </div>
            <p className="body-text text-brand-navy pt-2">
              È il cervello intelligente del tuo edificio. QuickConnext Building unifica
              tutti gli impianti tecnologici autonomi — riscaldamento, climatizzazione (HVAC),
              controllo accessi, rilevamento incendi e illuminazione — all&apos;interno di una piattaforma
              software proprietaria. Un unico pannello di controllo centralizzato per massimizzare
              l&apos;efficienza e azzerare gli sprechi gestionali.
            </p>
          </div>

          {/* Stats Row */}
          <div className="relative">
            <div className="teal-rule mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {[
                {
                  value: "-35%",
                  label: "Consumi energetici",
                  desc: "Abbattimento dei consumi elettrici e termici grazie a logiche di accensione e spegnimento automatizzate basate sulla presenza reale.",
                },
                {
                  value: "+30%",
                  label: "Soddisfazione ospiti",
                  desc: "Regolazione intelligente di luci e clima all'ingresso dell'ospite in camera o in ufficio, garantendo il comfort ideale istantaneamente.",
                },
                {
                  value: "-45%",
                  label: "Guasti non pianificati",
                  desc: "Monitoraggio continuo dei parametri di funzionamento con invio istantaneo di allarmi e logiche di prevenzione guasti.",
                },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-4">
                    <div className="stat-bar" />
                    <div className="stat-number">{stat.value}</div>
                  </div>
                  <h3 className="text-[13px] font-bold uppercase tracking-widest text-gray-500">
                    {stat.label}
                  </h3>
                  <p className="body-text text-brand-navy text-sm">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="teal-rule mt-12" />
          </div>
        </div>
      </section>

      {/* ================= ARCHITECTURE ================= */}
      <section className="relative py-24 section-muted tech-grid overflow-hidden">
        <div className="grid-fade absolute inset-0" />
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-2xl mb-14">
            <span className="mono-label">La nostra architettura</span>
            <h2 className="heading-h2-light mt-4">
              Un ecosistema, un solo punto di controllo
            </h2>
            <p className="body-text mt-4">
              Ogni dispositivo dell&apos;edificio — clima, luce, accessi,
              sicurezza, energia — dialoga con la stessa piattaforma. Protocolli
              aperti (KNX, Modbus), nessun vendor lock-in.
            </p>
          </div>

          {/* Diagram */}
          <div className="relative grid grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)] gap-4 lg:gap-6 items-center">
            {/* Left devices */}
            <div className="flex flex-col gap-4 lg:gap-7 order-2 lg:order-1">
              {archLeft.map((d, i) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.label}
                    className="product-card float-card lg:ml-auto"
                    style={{ animationDelay: `${i * 0.5}s` }}
                  >
                    <span className="product-card-icon">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="text-[13px] font-semibold text-brand-navy leading-tight">
                        {d.label}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-brand-stone mt-0.5">
                        {d.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center render */}
            <div className="relative order-1 lg:order-2 col-span-2 lg:col-span-1">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-brand-line bg-brand-ivory-card tech-grid shadow-card">
                <div className="absolute inset-0 grid-fade" />
                <Image
                  src="/edificio.png"
                  alt="Sezione 3D dell'edificio QuickConnext con tutti gli impianti integrati"
                  fill
                  className="object-contain z-10 p-2"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Right devices */}
            <div className="flex flex-col gap-4 lg:gap-7 order-3">
              {archRight.map((d, i) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.label}
                    className="product-card float-card lg:mr-auto"
                    style={{ animationDelay: `${i * 0.5 + 0.25}s` }}
                  >
                    <span className="product-card-icon">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="text-[13px] font-semibold text-brand-navy leading-tight">
                        {d.label}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-brand-stone mt-0.5">
                        {d.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY INVEST IN QUICKCONNEXT ================= */}
      <section className="py-24 section-dark noise-texture dot-grid-dark text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-16">
            <span className="section-label">VALORE PATRIMONIALE ED EFFICIENZA</span>
            <h2 className="heading-h2-dark mt-4">
              Perché investire in QuickConnext
            </h2>
            <p className="body-text text-slate-300 mt-4 max-w-2xl">
              L&apos;automazione degli edifici non è più solo una scelta di comfort, ma una necessità strategica.
              Ecco i vantaggi di affidarsi al sistema QuickConnext Building.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left column — statement */}
            <div className="lg:col-span-5 relative">
              <span
                className="absolute -top-4 -left-2 text-[120px] md:text-[160px] font-black text-brand-teal leading-none select-none pointer-events-none"
                style={{ opacity: 0.12 }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="relative z-10 teal-accent-left pl-8">
                <p className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white leading-tight tracking-tightest">
                  Non è un&apos;opzione. È lo strumento del presente.
                </p>
              </blockquote>
            </div>

            {/* Right column — benefits list */}
            <div className="lg:col-span-7 border-t border-white/10">
              {benefits.map((benefit, i) => (
                <div key={i} className="benefit-row">
                  <div className="flex-1 pr-6">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {benefit.title}
                      </h3>
                      <span className="text-lg font-black text-brand-teal flex-shrink-0">
                        {benefit.stat}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mt-2 font-sans opacity-80">
                      {benefit.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="benefit-arrow text-brand-teal flex-shrink-0 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATIONS STRIP ================= */}
      <section className="relative py-12 section-light noise-texture dot-grid-light border-y border-slate-200 overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="w-full flex items-center relative z-10">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {certifications.concat(certifications).map((cert, index) => (
              <span
                key={index}
                className="text-slate-400 font-extrabold text-xs md:text-sm tracking-[0.25em] flex items-center gap-3 uppercase shrink-0"
              >
                <div className="w-5 h-px bg-brand-teal" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTOR SOLUTIONS ================= */}
      <section id="soluzioni" className="py-24 section-light noise-texture dot-grid-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-2xl mb-16">
            <span className="section-label">SOLUZIONI SU MISURA</span>
            <h2 className="heading-h2-light mt-4">
              Soluzioni per ogni settore
            </h2>
            <p className="body-text text-brand-navy mt-4">
              Seleziona la tua area di competenza per scoprire le funzionalità e i moduli dedicati.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Industry",
                desc: "Sistemi integrati di controllo carichi, monitoraggio impianti e data logging.",
                image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
                href: "/industry",
              },
              {
                title: "Hotel",
                desc: "Gestione ospiti, clima intelligente, accessi intelligenti ed efficienza energetica.",
                image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
                href: "/hotel",
              },
              {
                title: "RSA / Sanitario",
                desc: "Monitoraggio parametri ambientali, sicurezza varchi e comfort assistenziale.",
                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
                href: "/rsa",
              },
              {
                title: "Building / Direzionale",
                desc: "Sistemi BACS Classe A, termoregolazione a zone e controllo qualità dell'aria.",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
                href: "/building",
              },
            ].map((sol, i) => (
              <Link
                key={i}
                href={sol.href}
                className="group relative aspect-[3/4] overflow-hidden border-l border-brand-teal hover:border hover:border-brand-teal transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url(${sol.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                <div className="absolute bottom-0 left-0 right-0 glass-panel-bottom p-5 flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tightest">
                    {sol.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed font-sans line-clamp-3 opacity-80">
                    {sol.desc}
                  </p>
                  <span className="cta-button text-brand-teal mt-1 group-hover:text-white transition-colors">
                    Scopri di più
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
