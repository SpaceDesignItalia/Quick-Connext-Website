import Link from "next/link";
import { ArrowRight, Factory, Hotel as HotelIcon, Activity, Building as BuildingIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progetti | QuickConnext Building",
  description:
    "Case study e progetti realizzati con QuickConnext Building: hotel, industria, RSA e edifici direzionali.",
};

const projects = [
  {
    id: "hotel-alpine",
    title: "Hotel Alpine Resort",
    sector: "Hospitality",
    location: "Dolomiti, IT",
    description:
      "Integrazione HVAC per zona, accessi keyless e supervisione energetica su 120 camere. Riduzione consumi del 32% nel primo anno.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80",
    stats: ["120 camere", "-32% energia", "KNX + BACnet"],
    icon: HotelIcon,
    href: "/hotel",
  },
  {
    id: "plant-bergamo",
    title: "Stabilimento Produttivo Bergamo",
    sector: "Industry",
    location: "Bergamo, IT",
    description:
      "Monitoraggio impianti, data logging e controllo carichi su linea produttiva. Allarmi predittivi e dashboard operativa centralizzata.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
    stats: ["12.000 m²", "Modbus RTU", "24/7 monitoring"],
    icon: Factory,
    href: "/industry",
  },
  {
    id: "rsa-lombardia",
    title: "RSA Lombardia Centro",
    sector: "Healthcare",
    location: "Lombardia, IT",
    description:
      "Controllo ambientale reparti, rilevazione incendi integrata e gestione accessi per personale e visitatori con tracciabilità completa.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
    stats: ["180 posti letto", "BACS Classe A", "ISO 27001"],
    icon: Activity,
    href: "/rsa",
  },
  {
    id: "hq-milano",
    title: "Sede Direzionale Milano",
    sector: "Building",
    location: "Milano, IT",
    description:
      "Retrofit BACS su edificio direzionale anni '90: illuminazione DALI, termoregolazione a zone e qualità dell'aria per 8 piani open space.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    stats: ["8 piani", "+2 classi APE", "DALI + KNX"],
    icon: BuildingIcon,
    href: "/building",
  },
];

export default function ProgettiPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-32 section-dark noise-texture dot-grid-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="section-label">CASE STUDY</span>
            <h1 className="heading-h2-dark mt-4">I nostri progetti</h1>
            <p className="body-text text-slate-300 mt-6">
              Edifici reali, risultati misurabili. Ogni installazione QuickConnext
              unifica clima, luce, accessi e sicurezza in un&apos;unica piattaforma
              di controllo.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 section-light noise-texture dot-grid-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <Link
                  key={project.id}
                  href={project.href}
                  aria-label={`Scopri il progetto: ${project.title}`}
                  className="group relative block overflow-hidden rounded-2xl border border-brand-line bg-white shadow-sm hover:border-brand-teal hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.1fr]">
                    <div
                      className="aspect-[4/3] sm:aspect-auto sm:min-h-[280px] bg-cover bg-center"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="p-7 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-teal">
                          {project.sector}
                        </span>
                        <span className="w-9 h-9 flex items-center justify-center rounded-xl border border-brand-line text-brand-teal group-hover:border-brand-teal transition-colors">
                          <Icon className="w-4 h-4" />
                        </span>
                      </div>
                      <h2 className="font-serif text-2xl font-semibold text-brand-navy leading-tight">
                        {project.title}
                      </h2>
                      <p className="text-xs text-brand-stone mt-1 uppercase tracking-wider">
                        {project.location}
                      </p>
                      <p className="body-text text-brand-navy text-sm mt-4 flex-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {project.stats.map((stat) => (
                          <span
                            key={stat}
                            className="text-[10px] font-mono uppercase tracking-wider text-brand-stone border border-brand-line px-2.5 py-1 rounded-full"
                          >
                            {stat}
                          </span>
                        ))}
                      </div>
                      <span className="cta-link text-brand-teal mt-6">
                        Scopri la soluzione settore
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
        </div>
      </section>
    </main>
  );
}
