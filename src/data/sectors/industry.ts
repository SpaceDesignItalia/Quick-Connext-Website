import {
  Gauge,
  ShieldCheck,
  Activity,
  Zap,
  Camera,
  Wrench,
  Lightbulb,
  Wind,
  Flame,
  LeafyGreen,
  Building2,
} from "lucide-react";
import type { SectorConfig } from "@/components/sector/types";
import { sharedAssistance, sharedComparison, sharedFinance } from "./shared";

export const industrySectorConfig: SectorConfig = {
  slug: "industry",
  metaTitle: "Industria — Stabilimenti efficienti e sicuri | QuickConnext Building",
  metaDescription:
    "Energia, sicurezza, supervisione e manutenzione predittiva per stabilimenti e magazzini. Un'unica piattaforma BACS con protocolli aperti.",
  heroImage: "/images/industria-warehouse.png",
  heroLabel: "Soluzione Industria",
  heroTitle: "Lo stabilimento che ",
  heroAccent: "non si ferma mai.",
  heroSubtitle:
    "Energia, sicurezza, climatizzazione e supervisione degli impianti sotto un unico controllo. Più efficienza, meno fermi, continuità produttiva garantita.",
  heroCards: [
    { icon: Gauge, title: "Linea 3", detail: "Consumo −18% oggi" },
    { icon: ShieldCheck, title: "Accessi", detail: "Reparto stampi · ok" },
    { icon: Activity, title: "Predittiva", detail: "0 anomalie critiche" },
  ],
  introLabel: "La piattaforma per l'industria",
  introTitle: "Un solo sistema per produzione, energia e sicurezza.",
  introText:
    "QuickConnext integra impianti tecnologici, energia e sicurezza in un'unica regia. Riduci i consumi, previeni i fermi macchina e tieni sotto controllo l'intero stabilimento, anche da remoto.",
  scenes: [
    {
      icon: Gauge,
      label: "Energia e Impianti",
      title: "Ogni kilowatt sotto controllo.",
      desc: "Monitora consumi, picchi e rendimento di ogni linea e impianto. Bilancia i carichi, evita le penali e taglia la bolletta energetica.",
      bullets: [
        "Monitoraggio consumi per linea e reparto",
        "Bilanciamento dei carichi e gestione picchi",
        "Climatizzazione e ventilazione ottimizzate",
        "Report energetici e classe energetica edificio",
      ],
      image: "/images/sector-industria.png",
      cards: [
        { icon: Gauge, title: "Reparto produzione", detail: "−21% consumo oggi", status: "In tempo reale", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Zap, title: "Picco evitato", detail: "Carichi bilanciati", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: ShieldCheck,
      label: "Sicurezza e Accessi",
      title: "Persone e aree sempre protette.",
      desc: "Controllo accessi per reparto, videosorveglianza e allarmi integrati. Solo le persone autorizzate entrano nelle aree giuste, sempre tracciate.",
      bullets: [
        "Accessi per reparto e fascia oraria",
        "Videosorveglianza con notifiche intelligenti",
        "Allarmi intrusione e antincendio",
        "Tracciamento completo degli eventi",
      ],
      image: "/images/industria-warehouse.png",
      cards: [
        { icon: ShieldCheck, title: "Area logistica", detail: "Accessi tracciati", status: "Tutto regolare", position: "left-4 top-8 sm:-left-6 sm:top-12" },
        { icon: Camera, title: "Magazzino", detail: "Sorveglianza attiva", position: "bottom-6 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: Activity,
      label: "Supervisione e Manutenzione",
      title: "I fermi macchina si prevengono.",
      desc: "Una sala controllo virtuale per tutto lo stabilimento. Diagnostica continua e analisi predittiva ti avvisano prima che un guasto fermi la produzione.",
      bullets: [
        "Cruscotto unico di supervisione SCADA",
        "Diagnostica continua degli impianti",
        "Analisi predittiva dei guasti",
        "−45% fermi non pianificati",
      ],
      image: "/images/industria-control.png",
      cards: [
        { icon: Activity, title: "Compressore 2", detail: "Anomalia prevista tra 6 gg", status: "Intervento pianificato", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Wrench, title: "Impianti", detail: "97% operativi", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
  ],
  grid: {
    title: "Tutto l'impianto, una sola regia.",
    features: [
      { icon: Lightbulb, title: "Illuminazione", desc: "Scenari per reparto e gestione automatica della luce naturale." },
      { icon: Wind, title: "Qualità dell'aria", desc: "Ventilazione e parametri ambientali monitorati in continuo." },
      { icon: Flame, title: "Antincendio", desc: "Rilevazione e gestione delle emergenze integrate nel sistema." },
      { icon: LeafyGreen, title: "Sostenibilità", desc: "Dati pronti per rendicontazione ESG e certificazioni." },
      { icon: Activity, title: "Manutenzione predittiva", desc: "Algoritmi che anticipano i guasti sulle macchine critiche." },
      { icon: Building2, title: "Multi-sito", desc: "Controlla più stabilimenti da un'unica piattaforma." },
    ],
  },
  stats: [
    { value: "−35%", label: "consumi energetici" },
    { value: "−45%", label: "fermi non pianificati" },
    { value: "−60%", label: "incidenti di sicurezza" },
    { value: "+2", label: "classi energetiche" },
    { value: "+15%", label: "valore dell'immobile" },
    { value: "+100M€", label: "progetti gestiti" },
    { value: "95%", label: "tasso approvazione pratiche" },
    { value: "24h", label: "tempo di intervento" },
  ],
  comparison: sharedComparison,
  finance: sharedFinance("trasformiamo l'efficienza energetica in un investimento a costo zero."),
  assistance: sharedAssistance,
  ctaTitle: "Vuoi vedere QuickConnext nel tuo stabilimento?",
  ctaSubtitle:
    "Prenota una demo: analizziamo i tuoi impianti e ti mostriamo il risparmio e la sicurezza che puoi ottenere.",
  ctaImage: "/images/cta-night.png",
};
