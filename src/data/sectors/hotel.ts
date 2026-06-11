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
  scenes: [
    {
      icon: Layers,
      label: "La nostra Architettura",
      title: "Aperta. Scalabile. Senza vincoli.",
      desc: "Un'unica piattaforma che parla tutti i linguaggi del building: integra qualsiasi marchio, cresce con la tua struttura e non ti lega mai a un singolo fornitore.",
      bullets: [
        "Supervisione — Cloud & App: dashboard centralizzata, controllo da remoto e API verso ERP, PMS e BMS",
        "Integrazione — Gateway multi-protocollo: KNX, Modbus e BACnet dialogano tra loro in un'unica logica",
        "Campo — Dispositivi & Sensori: clima, luci, accessi, presenza e sicurezza di marchi primari",
        "Continuità — Backup & Ridondanza: funzionamento garantito anche senza rete, con alimentazione di backup",
        "Nessun vendor lock-in: piattaforma aperta, cambi fornitore quando vuoi",
        "Plug & Play: aggiungi nuovi dispositivi in autonomia, con qualunque marchio compatibile",
        "API aperte: integrazione nativa verso ERP, PMS, BMS e piattaforme cloud di terze parti",
      ],
      image: "/images/industria-control.png",
      beforeImage: "/images/hotel-architecture.png",
      cards: [
        { icon: Cloud, title: "Supervisione", detail: "Cloud & App", position: "left-4 top-6 sm:-left-6 sm:top-10" },
        { icon: Network, title: "Integrazione", detail: "KNX · Modbus · BACnet", position: "bottom-6 right-4 sm:-right-6 sm:bottom-12" },
      ],
    },
    {
      icon: KeyRound,
      label: "Controllo Accessi",
      title: "Sicurezza senza attriti.",
      desc: "Dal check-in al check-out, ogni camera si attiva da sola. L'ospite vive un'esperienza fluida, lo staff lavora con la massima tranquillità. Tecnologie partner: Vimar · Comelit · Bticino.",
      bullets: [
        "Lettore accessi personalizzabile — colori, logo e finiture su misura",
        "Tasca attivazione camera — porta badge che attiva l'energia della stanza",
        "Creazione badge — emissione e gestione credenziali ospite e staff",
        "Sensori di presenza — rilevamento occupazione integrato",
        "Funzioni Non disturbare e Riordinare la camera gestite in automatico",
        "Attivazione e disattivazione automatica della camera al check-in/out",
        "Profilo ospite con preferenze di temperatura e illuminazione memorizzate",
        "Gestione automatica del servizio non disturbare e del servizio in camera",
      ],
      image: "/images/hotel-reception.png",
      beforeImage: "/images/hotel-access-before.png",
      cards: [
        { icon: KeyRound, title: "Check-in / check-out", detail: "Attivazione automatica camera", position: "left-4 top-6 sm:-left-6 sm:top-10" },
        { icon: DoorOpen, title: "Profilo ospite", detail: "Preferenze temperatura e luci", position: "bottom-6 right-4 sm:-right-6 sm:bottom-12" },
      ],
    },
    {
      icon: Thermometer,
      label: "Comfort delle Camere",
      title: "Clima, luce e benessere.",
      desc: "Ogni camera trova da sola il suo equilibrio perfetto. L'ospite entra e l'ambiente è già accogliente; quando esce, i consumi si azzerano. Tecnologie partner: Vimar · Comelit · Bticino.",
      bullets: [
        "Controllo clima HVAC per singola camera con sensori di presenza e occupazione",
        "Regolazione automatica di temperatura, umidità e ventilazione",
        "Illuminazione smart con scenari personalizzabili: relax, lavoro, notte",
        "Veneziane e tende motorizzate integrate con luce naturale e orari",
        "Profilo ospite — temperatura e luci preferite memorizzate e riproposte",
        "Riduzione automatica dei consumi quando la camera è vuota",
        "Fino al 30% di risparmio energetico per camera",
        "Comfort costante 24/7 per ogni ospite",
      ],
      image: "/images/hotel-room.png",
      cards: [
        { icon: Thermometer, title: "Clima HVAC", detail: "Presenza e occupazione", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Blinds, title: "Tende motorizzate", detail: "Integrate con luce naturale", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: ShieldCheck,
      label: "Sicurezza",
      title: "Protezione totale, sempre sotto controllo.",
      desc: "Telecamere, pannello di controllo, allarmi e antincendio integrati in un'unica supervisione.",
      bullets: [
        "Videosorveglianza — telecamere integrate con registrazione e accesso da remoto",
        "Pannello di controllo — plancia unica per gestire e supervisionare tutta la struttura",
        "Allarmi intelligenti — notifiche in tempo reale al responsabile a ogni anomalia",
        "Antincendio — rilevazione fumi e gestione integrata della sicurezza attiva",
      ],
      image: "/images/hotel-corridor.png",
      cards: [
        { icon: Camera, title: "Videosorveglianza", detail: "Registrazione e accesso remoto", position: "left-4 top-8 sm:-left-6 sm:top-12" },
        { icon: Flame, title: "Antincendio", detail: "Rilevazione fumi integrata", position: "bottom-6 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: Waves,
      label: "Aree Comuni e Servizi",
      title: "Lobby, ristorante, piscina, spa.",
      desc: "Illuminazione, climatizzazione e qualità dell'aria coordinati per ogni area funzionale dell'hotel.",
      bullets: [
        "Illuminazione delle aree comuni con scenari programmabili per orario ed evento",
        "Controllo della piscina: temperatura acqua, pH e cloro in automatico",
        "Climatizzazione separata per ogni area funzionale dell'hotel",
        "Controllo qualità aria con ricambio per normativa in base a presenze",
        "Esperienza ospite migliorata con comfort costante 24/7",
      ],
      image: "/images/hotel-pool.png",
      cards: [
        { icon: Waves, title: "Piscina", detail: "Temperatura · pH · cloro automatici", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Lightbulb, title: "Aree comuni", detail: "Scenari per orario ed evento", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: Gauge,
      label: "Energia e Consumi",
      title: "Comfort elevato, consumi ridotti.",
      desc: "Monitoraggio, ottimizzazione e reporting: ogni kilowatt è misurato, analizzato e messo a rendere.",
      layout: "dominant",
      bullets: [
        "Comfort elevato, consumi ridotti",
        "Ottimizzazione dell'esperienza di soggiorno con consumi sotto controllo",
        "Blocco automatico per risparmio quando la camera è senza badge",
        "Consumi energetici e manutenzione impianti",
        "Riduzione media dei costi energetici del 25–40%",
      ],
      image: "/images/hero-hotel.png",
      cards: [
        { icon: Gauge, title: "Monitoraggio", detail: "Elettrico, termico e idrico", position: "left-4 top-8 sm:-left-6 sm:top-12" },
        { icon: Activity, title: "Reporting", detail: "Per zona, piano o camera", position: "bottom-6 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: Wrench,
      label: "Manutenzione Preventiva",
      title: "Risolviamo il guasto prima dell'ospite.",
      desc: "Diagnostica, allarmi e intervento preventivo: gli impianti si controllano da soli e avvisano il tecnico prima che un problema diventi un disservizio.",
      bullets: [
        "Monitoraggio continuo di ogni componente degli impianti",
        "Allarmi in tempo reale inviati al responsabile tecnico",
        "Analisi predittiva dei guasti prima che impattino sugli ospiti",
        "Storico degli interventi e pianificazione automatica della manutenzione",
        "Riduzione dei fermi impianto con diagnostica proattiva",
        "Riduzione del 45% dei guasti non pianificati",
      ],
      image: "/images/industria-control.png",
      cards: [
        { icon: Activity, title: "Analisi predittiva", detail: "Guasti previsti in anticipo", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Wrench, title: "Diagnostica proattiva", detail: "Intervento prima del disservizio", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
  ],
  statPause: {
    afterSceneIndex: 3,
    value: "−45%",
    label: "guasti non pianificati",
    explanation:
      "Monitoraggio continuo degli elementi. Analisi predittiva dei guasti prima che impattino gli ospiti.",
  },
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
