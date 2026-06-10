import {
  Thermometer,
  Wind,
  BellRing,
  Lightbulb,
  Gauge,
  ShieldCheck,
  Flame,
  Users,
  HeartPulse,
  Camera,
  Activity,
  Building2,
} from "lucide-react";
import type { SectorConfig } from "@/components/sector/types";
import { sharedAssistance, sharedComparison, sharedFinance } from "./shared";

export const rsaSectorConfig: SectorConfig = {
  slug: "rsa",
  metaTitle: "RSA e Sanitario — Ambienti di cura connessi | QuickConnext Building",
  metaDescription:
    "Comfort, qualità dell'aria, sicurezza e chiamata infermieri integrati. La piattaforma BACS per RSA, cliniche e strutture sanitarie.",
  heroImage: "/images/sector-rsa.png",
  heroLabel: "Soluzione RSA / Sanitario",
  heroTitle: "Ambienti di cura ",
  heroAccent: "sicuri e accoglienti.",
  heroSubtitle:
    "Comfort costante, aria sana, sicurezza h24 e risposta rapida alle chiamate. Tecnologia discreta al servizio del benessere di ospiti, pazienti e personale.",
  heroCards: [
    { icon: Thermometer, title: "Reparto B", detail: "Clima ottimale · 23°" },
    { icon: Wind, title: "Qualità aria", detail: "CO₂ nella norma" },
    { icon: BellRing, title: "Chiamata", detail: "Risposta < 2 min" },
  ],
  introLabel: "La piattaforma per la sanità",
  introTitle: "Il benessere delle persone, gestito con cura.",
  introText:
    "QuickConnext mantiene gli ambienti sempre sani, sicuri e confortevoli. Il personale lavora meglio, gli ospiti vivono in spazi dignitosi e la direzione ha pieno controllo su comfort, consumi e sicurezza.",
  scenes: [
    {
      icon: Thermometer,
      label: "Comfort e Salute",
      title: "Ogni stanza alla temperatura giusta.",
      desc: "Clima, illuminazione e qualità dell'aria regolati per il comfort e la salute di chi vive la struttura, stanza per stanza.",
      bullets: [
        "Clima HVAC per stanza e reparto",
        "Illuminazione dolce e scenari notte",
        "Qualità dell'aria e CO₂ monitorate",
        "Comfort costante senza sprechi",
      ],
      image: "/images/rsa-room.png",
      cards: [
        { icon: Thermometer, title: "Stanza 18", detail: "23° · umidità 50%", status: "Comfort ottimale", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Wind, title: "Aria", detail: "CO₂ 620 ppm · ok", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: Users,
      label: "Aree Comuni e Socialità",
      title: "Spazi luminosi e accoglienti.",
      desc: "Sale comuni, refettori e aree relax sempre alla giusta temperatura e luminosità, per favorire benessere e socialità.",
      bullets: [
        "Clima e luce delle aree comuni",
        "Scenari per pasti, attività e relax",
        "Comfort acustico e visivo",
        "Consumi delle aree comuni ottimizzati",
      ],
      image: "/images/rsa-common.png",
      cards: [
        { icon: Lightbulb, title: "Sala comune", detail: "Scenario giorno attivo", position: "left-4 top-8 sm:-left-6 sm:top-12" },
        { icon: Gauge, title: "Consumi", detail: "−29% vs media", position: "bottom-6 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: ShieldCheck,
      label: "Sicurezza e Accessi",
      title: "Protezione discreta, sempre attiva.",
      desc: "Controllo accessi, videosorveglianza, antincendio e chiamata infermieri integrati. La sicurezza non si vede, ma c'è sempre.",
      bullets: [
        "Accessi controllati per area e ruolo",
        "Chiamata infermieri integrata",
        "Rilevazione antincendio e fughe gas",
        "Notifiche immediate al personale",
      ],
      image: "/images/sector-rsa.png",
      cards: [
        { icon: BellRing, title: "Stanza 22", detail: "Chiamata gestita", status: "Risposta 1m 40s", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Flame, title: "Antincendio", detail: "Sensori operativi", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
  ],
  grid: {
    title: "Cura in ogni dettaglio.",
    features: [
      { icon: HeartPulse, title: "Chiamata infermieri", desc: "Richieste instradate al personale giusto, con priorità." },
      { icon: Wind, title: "Qualità dell'aria", desc: "Ricambio d'aria e CO₂ controllati in ogni ambiente." },
      { icon: Camera, title: "Videosorveglianza", desc: "Aree comuni e perimetro monitorati con discrezione." },
      { icon: Gauge, title: "Energia", desc: "Consumi ridotti senza compromessi sul comfort." },
      { icon: Activity, title: "Manutenzione predittiva", desc: "Impianti critici sempre efficienti e sicuri." },
      { icon: Building2, title: "Multi-struttura", desc: "Gestisci più sedi da un'unica piattaforma." },
    ],
  },
  stats: [
    { value: "+30%", label: "soddisfazione ospiti" },
    { value: "−35%", label: "consumi energetici" },
    { value: "−60%", label: "incidenti di sicurezza" },
    { value: "−45%", label: "guasti non pianificati" },
    { value: "+2", label: "classi energetiche APE" },
    { value: "+15%", label: "valore dell'immobile" },
    { value: "+100M€", label: "progetti gestiti" },
    { value: "95%", label: "tasso approvazione pratiche" },
  ],
  comparison: sharedComparison,
  finance: sharedFinance("rendiamo l'investimento sostenibile per le strutture sanitarie."),
  assistance: sharedAssistance,
  ctaTitle: "Vuoi vedere QuickConnext nella tua struttura?",
  ctaSubtitle:
    "Prenota una demo: ti mostriamo come migliorare comfort, sicurezza e consumi della tua RSA o struttura sanitaria.",
  ctaImage: "/images/cta-night.png",
};
