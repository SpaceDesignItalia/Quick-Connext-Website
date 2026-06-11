import {
  Thermometer,
  Lightbulb,
  ShieldCheck,
  Gauge,
  Wrench,
  Activity,
  Headset,
  Timer,
  BadgeCheck,
  Plug,
  HardHat,
  MapPin,
  Users,
} from "lucide-react";
import type { SectorConfig } from "@/components/sector/types";

const hotelComparison: SectorConfig["comparison"] = [
  {
    aspect: "Posso cambiare fornitore",
    quick: "Piattaforma aperta, nessun vendor lock-in",
    traditional: "Vincolo al protocollo e al marchio",
  },
  {
    aspect: "Aggiunta di nuovi dispositivi in autonomia",
    quick: "Scalabile senza difficoltà con qualunque marchio",
    traditional: "Solo su stesso protocollo e marchio",
  },
  {
    aspect: "Continuità di servizio",
    quick: "Backup dell'alimentazione e accesso anche senza rete",
    traditional: "Solo se impostata correttamente la ridondanza",
  },
  {
    aspect: "Multi-protocollo",
    quick: "KNX, Modbus e BACnet gestiti simultaneamente",
    traditional: "Solo sul mono protocollo gestito",
  },
  {
    aspect: "Interfaccia software personalizzabile",
    quick: "Configurabile sulle esigenze del cliente",
    traditional: "Non personalizzabile",
  },
  {
    aspect: "Installazione semplice",
    quick: "Configurazione guidata, plug & play, poco cablaggio",
    traditional: "Installazione complessa",
  },
  {
    aspect: "Manutenzione semplice",
    quick: "Aggiornamenti remoti e diagnostica centralizzata",
    traditional: "Manutenzione onerosa",
  },
  {
    aspect: "Customer service",
    quick: "Assistenza diretta dedicata",
    traditional: "Assistenza non dedicata",
  },
  {
    aspect: "API verso sistemi terzi",
    quick: "API aperte verso ERP, BMS e piattaforme cloud",
    traditional: "Nessuna API aperta",
  },
  {
    aspect: "Conformità di legge",
    quick: "Classe B per Decreto Requisiti minimi 28/10/2025",
    traditional: "Non conforme",
  },
  {
    aspect: "Unico partner",
    quick: "Progettazione, installazione, configurazione software e cablaggio elettrico",
    traditional: "Più fornitori separati",
  },
  {
    aspect: "Cyber Security",
    quick: "Certificazioni ISO 27001 · ISO 27017 · ISO 27018",
    traditional: "Da verificare sulla singola azienda",
  },
];

export const hotelSectorConfig: SectorConfig = {
  slug: "hotel",
  metaTitle: "Hotel — L'hotel che si gestisce da solo | Quick Connext Building",
  metaDescription:
    "La soluzione completa di Building Automation progettata per l'hotellerie moderna. Controllo centralizzato, risparmio energetico e ospitalità di eccellenza.",
  heroImage: "/images/hero-hotel.png",
  heroLabel: "Building Automation · Hotel",
  heroTitle: "L'hotel che ",
  heroAccent: "si gestisce da solo.",
  heroSubtitle:
    "Una sola piattaforma intelligente per controllo centralizzato, risparmio energetico e un'ospitalità di eccellenza.",
  heroVariant: "cinematic",
  heroDemoCard: {
    title: "Camera 412 — Check-in completato",
    detail: "Temperatura: 22° · Luci: Relax · Tende: Aperte",
    status: "Attivazione automatica al check-in",
  },
  heroLiveEvents: [
    {
      title: "Camera 412 — Check-in completato",
      detail: "Clima 22° · luci Relax · tende aperte",
    },
    {
      title: "Piscina — Parametri regolari",
      detail: "Temperatura acqua · pH · cloro in automatico",
    },
    {
      title: "Energia — Consumi ottimizzati",
      detail: "Riduzione media dei costi energetici del 25–40%",
    },
    {
      title: "Manutenzione preventiva",
      detail: "Analisi predittiva dei guasti prima che impattino gli ospiti",
    },
  ],
  heroKpis: [
    { value: "−35%", label: "consumi energetici" },
    { value: "+30%", label: "soddisfazione ospite" },
    { value: "−45%", label: "guasti non pianificati" },
  ],
  interactive: { commandCenter: true, roi: false },
  hideIntro: false,
  heroCards: [],
  introLabel: "Il mercato hotel in Italia",
  introTitle: "Una certezza per il prossimo decennio.",
  introText:
    "Il turismo italiano vive il suo decennio d'oro. Chi investe oggi in tecnologia alberghiera moderna intercetta una domanda in crescita strutturale — e arriva preparato alle nuove normative sull'efficienza energetica.",
  marketStats: [
    { value: "476 mln", label: "presenze turistiche 2025 (+2,1%)" },
    { value: "108,8 mld€", label: "impatto economico del turismo 2025" },
    { value: "+100 mln", label: "presenze attese in Q1 2026 · effetto Olimpiadi" },
  ],
  marketStatsSource: "Fonte: Unioncamere–Isnart, 2025",
  gridPosition: "before",
  grid: {
    label: "Cos'è la domotica",
    title: "Un solo sistema per gestire, con semplicità, ogni parte del tuo hotel.",
    subtitle:
      "I sistemi BACS mettono sotto controllo camere, impianti, consumi e richieste degli ospiti da un'unica piattaforma: il clima segue la presenza, le luci si spengono nelle stanze vuote, il fermo impianti scende fino all'80%.",
    features: [
      {
        icon: Thermometer,
        title: "Clima automatico",
        desc: "La temperatura segue la presenza degli ospiti, camera per camera, senza sprechi.",
      },
      {
        icon: Lightbulb,
        title: "Luci intelligenti",
        desc: "Le luci si spengono quando la stanza è vuota e si adattano agli scenari d'uso.",
      },
      {
        icon: Gauge,
        title: "Consumi sotto controllo",
        desc: "Monitoraggio in tempo reale e ottimizzazione continua di energia e impianti.",
      },
      {
        icon: Activity,
        title: "Fino a −80% fermo impianti",
        desc: "Il controllo da remoto previene e risolve i guasti prima che diventino disservizi.",
      },
      {
        icon: Users,
        title: "Ospiti più soddisfatti",
        desc: "Comfort costante e personalizzato: più recensioni positive e clienti che tornano.",
      },
      {
        icon: Wrench,
        title: "Meno costi di gestione",
        desc: "Manutenzione ridotta e bollette più basse: il risparmio si vede da subito.",
      },
    ],
  },
  scenes: [],
  statsSection: {
    label: "Perché investire in domotica hotel",
    title: "Non è un gioco. È lo strumento del presente.",
    subtitle: "Efficienza · Ospitalità · Sicurezza · Redditività",
  },
  stats: [
    { value: "−35%", label: "consumi energetici ottimizzati" },
    { value: "+30%", label: "soddisfazione ospite e recensioni positive" },
    { value: "−45%", label: "guasti grazie alla manutenzione preventiva" },
    { value: "−60%", label: "incidenti e criticità di sicurezza" },
    { value: "BACS 2026", label: "EPBD e Decreto Requisiti Minimi · Classe B" },
    { value: "+2", label: "classi APE — salto di classe energetica" },
    { value: "+15%", label: "incremento del valore dell'immobile" },
    { value: "+100M€", label: "progetti gestiti" },
  ],
  comparisonSection: {
    label: "Perché noi",
    title: "QCB, il top di gamma per il settore.",
    subtitle:
      "Quick Connext Building a confronto con un System Integrator a protocollo proprietario.",
  },
  comparisonTraditionalLabel: "System Integrator mono-protocollo",
  comparison: hotelComparison,
  finance: {
    label: "Finanza di Progetto",
    title: "Azzera il costo del tuo investimento.",
    text: "Identifichiamo e gestiamo internamente contributi a fondo perduto, crediti d'imposta e finanziamenti agevolati — Industria 4.0 e 5.0, bandi MIMIT, fondi ZES e POR, Conto Termico 3.0, SIMEST e INVITALIA — spesso cumulabili tra loro. E con il modello ESCo finanziamo direttamente l'intervento: l'investimento si ripaga con i risparmi energetici realmente generati.",
    points: [
      { title: "+100 mln€", desc: "progetti gestiti" },
      { title: "95%", desc: "tasso di approvazione delle pratiche presentate" },
      { title: "Team", desc: "dedicato interno" },
    ],
  },
  assistanceSection: {
    label: "Assistenza, Installazione & Certificazioni",
    title: "Un unico partner, dall'inizio alla fine.",
  },
  assistance: [
    {
      icon: Headset,
      stat: "24/7",
      title: "Assistenza dedicata",
      desc: "Numero dedicato, sempre attivo. Solo marchi primari internazionali.",
    },
    {
      icon: Timer,
      stat: "24h",
      title: "Intervento on-site",
      desc: "E controllo da remoto di ogni componente dell'impianto.",
    },
    {
      icon: BadgeCheck,
      stat: "24 mesi",
      title: "Garanzia estesa",
      desc: "Di serie, oltre quanto previsto dalla legge.",
    },
    {
      icon: HardHat,
      title: "Installazione completa",
      desc: "Personale interno: progettazione, hardware, software, cablaggio e avviamento.",
    },
    {
      icon: MapPin,
      title: "Copertura nazionale",
      desc: "Manutenzione su tutto il territorio italiano.",
    },
    {
      icon: Plug,
      title: "Plug & play",
      desc: "Nuovi dispositivi in autonomia; qualsiasi installatore può intervenire.",
    },
    {
      icon: ShieldCheck,
      title: "Certificazioni",
      desc: "ISO 27001 · 27017 · 27018 · Cyber Security · BACS Classe B",
    },
  ],
  ctaLabel: "Contattaci",
  ctaTitle: "Parliamo del tuo progetto.",
  ctaSubtitle:
    "L'hotel che si gestisce da solo non è il futuro: è una scelta che puoi fare oggi.",
  ctaImage: "/images/cta-night.png",
};
