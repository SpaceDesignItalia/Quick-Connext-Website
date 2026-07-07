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
  TrendingUp,
} from "lucide-react";
import type { SectorConfig } from "@/components/sector/types";
import { sharedAssistance, sharedComparison, sharedFinance } from "./shared";

/* Verticale Industria — l'angolo è la CONTINUITÀ PRODUTTIVA: ogni fermo non
   pianificato è un costo, ogni picco di carico una penale. La pagina parla a
   chi gestisce lo stabilimento: energia misurata, guasti previsti, sicurezza
   tracciata. Cifre e claim ripresi dai contenuti già documentati del sito. */
export const industrySectorConfig: SectorConfig = {
  slug: "industry",
  metaTitle: "Industria · Stabilimenti efficienti e sicuri | QuickConnext Building",
  metaDescription:
    "Energia, sicurezza, supervisione e manutenzione predittiva per stabilimenti e magazzini. Un'unica piattaforma BACS con protocolli aperti.",
  heroImage: "/images/industria-warehouse.png",
  heroLabel: "Building Automation · Industria",
  heroTitle: "Lo stabilimento che ",
  heroAccent: "non si ferma mai.",
  heroSubtitle:
    "Energia, sicurezza e impianti sotto un'unica supervisione: i guasti si prevedono prima che fermino la produzione e ogni kilowatt è misurato e messo a rendere.",
  heroVariant: "cinematic",
  heroKpis: [
    { value: "−45%", label: "fermi non pianificati" },
    { value: "−35%", label: "consumi energetici" },
    { value: "24h", label: "tempo di intervento" },
  ],
  heroLiveEvents: [
    {
      title: "Reparto produzione",
      detail: "−21% di consumo oggi · monitoraggio per linea e reparto",
    },
    {
      title: "Picco di carico evitato",
      detail: "Carichi bilanciati in automatico, nessuna penale in bolletta",
    },
    {
      title: "Compressore 2 · analisi predittiva",
      detail: "Anomalia prevista tra 6 giorni, intervento già pianificato",
    },
    {
      title: "Area logistica",
      detail: "Accessi tracciati e sorveglianza attiva · tutto regolare",
    },
  ],
  hideSceneNav: true,
  heroCards: [],
  introLabel: "La piattaforma per l'industria",
  introTitle: "La continuità produttiva non ammette sorprese.",
  introText:
    "In uno stabilimento ogni fermo macchina è un costo e ogni picco di carico una penale. QuickConnext mette impianti, energia e sicurezza sotto un'unica regia con protocolli aperti: la diagnostica continua previene i guasti e i consumi di ogni linea sono misurati in tempo reale, anche da remoto e su più siti.",
  scenes: [
    {
      icon: Gauge,
      label: "Energia e Impianti",
      title: "Ogni kilowatt, misurato e messo a rendere.",
      desc: "Consumi, picchi e rendimento di ogni linea sotto controllo: i carichi si bilanciano da soli, le penali spariscono e la bolletta scende.",
      bullets: [
        "Monitoraggio — consumi elettrici e termici per linea, reparto e impianto",
        "Gestione picchi — bilanciamento automatico dei carichi, niente penali",
        "Climatizzazione — HVAC e ventilazione ottimizzati sulle presenze reali",
        "Report — energetici automatici, pronti per audit e classe energetica",
        "−35% consumi energetici",
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
      desc: "In un sito industriale la sicurezza è fatta di regole precise: chi entra, dove e quando. Qui ogni regola è automatica e ogni evento resta tracciato.",
      bullets: [
        "Accessi — per reparto, ruolo e fascia oraria",
        "Videosorveglianza — telecamere IP con notifiche intelligenti",
        "Allarmi — intrusione e antincendio integrati nella supervisione",
        "Tracciamento — storico completo di eventi e accessi",
        "−60% incidenti di sicurezza",
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
      desc: "Una sala controllo virtuale per tutto lo stabilimento: la diagnostica continua avvisa il tecnico prima che un guasto diventi un fermo di produzione.",
      bullets: [
        "Cruscotto unico — supervisione SCADA di tutti gli impianti",
        "Diagnostica continua — alert proattivi su anomalie e scostamenti",
        "Analisi predittiva — guasti previsti prima che fermino la produzione",
        "Da remoto — diagnostica a distanza e intervento entro 24h",
        "−45% fermi non pianificati",
      ],
      image: "/images/industria-control.png",
      cards: [
        { icon: Activity, title: "Compressore 2", detail: "Anomalia prevista tra 6 gg", status: "Intervento pianificato", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Wrench, title: "Impianti", detail: "97% operativi", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
  ],
  sectorLive: {
    afterSceneIndex: 2,
    kind: "industry-control",
    label: "La sala controllo, live",
    title: "Tutto lo stabilimento in una schermata.",
    subtitle:
      "Il profilo di carico si disegna, il picco viene evitato dal bilanciamento e la diagnostica predittiva pianifica gli interventi: è la supervisione QuickConnext al lavoro.",
  },
  grid: {
    label: "Oltre la produzione",
    title: "Tutto l'impianto, una sola regia.",
    subtitle:
      "La stessa piattaforma governa anche ciò che sta intorno alle linee: aria, luce, emergenze e sostenibilità, su uno o più stabilimenti.",
    features: [
      { icon: Lightbulb, title: "Illuminazione", desc: "Scenari per reparto e gestione automatica della luce naturale." },
      { icon: Wind, title: "Qualità dell'aria", desc: "Ventilazione e parametri ambientali monitorati in continuo." },
      { icon: Flame, title: "Antincendio", desc: "Rilevazione e gestione delle emergenze integrate nel sistema." },
      { icon: LeafyGreen, title: "Sostenibilità", desc: "Dati pronti per rendicontazione ESG e certificazioni." },
      { icon: Activity, title: "Manutenzione predittiva", desc: "Algoritmi che anticipano i guasti sulle macchine critiche." },
      { icon: Building2, title: "Multi-sito", desc: "Controlla più stabilimenti da un'unica piattaforma." },
    ],
  },
  statsSection: {
    label: "Perché investire",
    title: "Risultati che si leggono in bolletta.",
    subtitle:
      "Quattro leve concrete per lo stabilimento: continuità, efficienza, sicurezza e ritorno dell'investimento.",
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
  statGroups: [
    {
      icon: Activity,
      title: "Continuità",
      stat: { value: "−45%", label: "fermi non pianificati" },
      desc: "Diagnostica continua e analisi predittiva: i guasti si prevedono e si pianificano, prima che fermino la produzione.",
      secondary: { value: "24h", label: "intervento on-site garantito" },
    },
    {
      icon: Gauge,
      title: "Efficienza",
      stat: { value: "−35%", label: "consumi energetici" },
      desc: "Consumi misurati per linea e reparto, carichi bilanciati e climatizzazione ottimizzata sulle presenze reali.",
      secondary: { value: "+2", label: "classi energetiche dell'edificio" },
    },
    {
      icon: ShieldCheck,
      title: "Sicurezza",
      stat: { value: "−60%", label: "incidenti di sicurezza" },
      desc: "Accessi per reparto e fascia oraria, videosorveglianza con notifiche intelligenti e ogni evento tracciato.",
    },
    {
      icon: TrendingUp,
      title: "Redditività",
      stat: { value: "+15%", label: "valore dell'immobile" },
      desc: "L'efficienza generata copre nel tempo l'investimento, e le agevolazioni pubbliche fanno il resto.",
      secondary: { value: "95%", label: "pratiche di agevolazione approvate" },
    },
  ],
  comparisonSection: {
    label: "Il confronto",
    title: "Un partner industriale, non un fornitore.",
    subtitle:
      "QuickConnext Building a confronto con un system integrator a protocollo proprietario.",
  },
  comparisonTraditionalLabel: "System Integrator mono-protocollo",
  comparison: sharedComparison,
  finance: sharedFinance("trasformiamo l'efficienza energetica in un investimento a costo zero."),
  assistance: sharedAssistance,
  ctaTitle: "Vuoi vedere QuickConnext nel tuo stabilimento?",
  ctaSubtitle:
    "Prenota una demo: analizziamo i tuoi impianti e ti mostriamo il risparmio e la sicurezza che puoi ottenere.",
  ctaImage: "/images/cta-night.png",
};
