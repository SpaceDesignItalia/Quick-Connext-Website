import {
  KeyRound,
  Thermometer,
  Lightbulb,
  Blinds,
  ShieldCheck,
  Camera,
  Flame,
  Waves,
  Gauge,
  Wrench,
  Activity,
  DoorOpen,
  Zap,
} from "lucide-react";
import type { SectorConfig } from "@/components/sector/types";
import { sharedAssistance, sharedComparison, sharedFinance } from "./shared";

export const hotelSectorConfig: SectorConfig = {
  slug: "hotel",
  metaTitle: "Hotel — L'hotel che si gestisce da solo | QuickConnext Building",
  metaDescription:
    "Check-in automatico, comfort camera, sicurezza ed energia gestiti da un'unica piattaforma. Più comfort per gli ospiti, meno costi e guasti per l'hotel.",
  heroImage: "/images/cta-night.png",
  heroLabel: "Soluzione Hotel",
  heroTitle: "L'hotel che ",
  heroAccent: "si gestisce da solo.",
  heroSubtitle:
    "Dal check-in al comfort della camera, dalla sicurezza all'energia: tutto connesso e automatico. Più qualità per i tuoi ospiti, meno lavoro e meno costi per te.",
  heroVariant: "cinematic",
  heroDemoCard: {
    title: "Camera 412 — Check-in completato",
    detail: "Temperatura: 22° · Luci: Relax · Tende: Aperte",
    status: "Live dal gestionale",
  },
  heroLiveEvents: [
    {
      title: "Camera 412 — Check-in completato",
      detail: "Clima 22° · luci Benvenuto · tende aperte",
    },
    {
      title: "Piscina — Parametri regolari",
      detail: "28,1° · pH 7,3 · cloro nella norma",
    },
    {
      title: "Energia — Carichi bilanciati",
      detail: "−32% rispetto alla media di oggi",
    },
    {
      title: "Caldaia A — Anomalia prevista tra 9 giorni",
      detail: "Manutenzione già pianificata · zero impatti",
    },
  ],
  heroKpis: [
    { value: "−35%", label: "consumi energetici" },
    { value: "+30%", label: "soddisfazione ospiti" },
    { value: "24/7", label: "assistenza dedicata" },
  ],
  interactive: { commandCenter: true, roi: true },
  hideIntro: true,
  heroCards: [],
  statPause: {
    afterSceneIndex: 2,
    value: "−45%",
    label: "guasti non pianificati",
    explanation:
      "La manutenzione predittiva interviene prima del guasto — meno emergenze, meno costi, zero sorprese per gli ospiti.",
  },
  introLabel: "La piattaforma per l'ospitalità",
  introTitle: "Un hotel che anticipa i bisogni di chi lo vive.",
  introText:
    "QuickConnext collega ogni stanza, ogni area comune e ogni impianto in un'unica regia. L'ospite trova sempre l'ambiente perfetto, lo staff lavora con meno interruzioni e la direzione vede tutto da un solo cruscotto.",
  scenes: [
    {
      icon: KeyRound,
      label: "Controllo Accessi",
      title: "Check-in e check-out senza attese.",
      desc: "Badge, smartphone e profili ospite gestiti automaticamente. La camera si attiva all'arrivo e si mette a riposo alla partenza.",
      bullets: [
        "Badge e chiavi digitali su smartphone",
        "Check-in e check-out automatici",
        "Profilo ospite con preferenze salvate",
        "Accessi alle aree riservate sempre tracciati",
      ],
      image: "/images/hotel-reception.png",
      before: [
        "Chiavi da consegnare a mano",
        "Code alla reception",
        "Accessi non tracciati",
      ],
      cards: [
        { icon: KeyRound, title: "Camera 412", detail: "Check-in completato", status: "Accesso attivo", position: "left-4 top-6 sm:-left-6 sm:top-10" },
        { icon: DoorOpen, title: "Profilo ospite", detail: "Preferenze applicate", position: "bottom-6 right-4 sm:-right-6 sm:bottom-12" },
      ],
    },
    {
      icon: Thermometer,
      label: "Comfort Camera",
      title: "La stanza perfetta, sempre pronta.",
      desc: "Clima, luci e veneziane si regolano da soli in base a presenza, ora del giorno e preferenze dell'ospite. Comfort impeccabile, sprechi azzerati.",
      bullets: [
        "Clima HVAC per zona, stanza per stanza",
        "Illuminazione smart con scenari automatici",
        "Veneziane e tende motorizzate",
        "Stand-by intelligente a camera libera",
      ],
      image: "/images/hotel-room.png",
      before: [
        "Clima acceso in camera vuota",
        "Termostato regolato a mano",
        "Sprechi invisibili fino alla bolletta",
      ],
      cards: [
        { icon: Thermometer, title: "Camera 412", detail: "22° · umidità 45%", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Blinds, title: "Tende", detail: "Aperte al 60%", status: "Scenario mattino", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: ShieldCheck,
      label: "Sicurezza",
      title: "Tutto sotto controllo, giorno e notte.",
      desc: "Videosorveglianza, allarmi e rilevazione antincendio integrati. Le anomalie diventano notifiche immediate, prima che diventino problemi.",
      bullets: [
        "Telecamere con notifiche intelligenti",
        "Allarmi intrusione per aree e fasce orarie",
        "Rilevazione fumo e antincendio integrata",
        "Storico eventi sempre consultabile",
      ],
      image: "/images/hotel-corridor.png",
      before: [
        "Telecamere e allarmi separati",
        "Anomalie scoperte a danno fatto",
      ],
      cards: [
        { icon: Camera, title: "Piano 4", detail: "Corridoio · tutto regolare", status: "Sorveglianza attiva", position: "left-4 top-8 sm:-left-6 sm:top-12" },
        { icon: Flame, title: "Antincendio", detail: "Sensori operativi", position: "bottom-6 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: Waves,
      label: "Aree Comuni",
      title: "Lobby, piscina e spa a regola d'arte.",
      desc: "Dalla temperatura della lobby ai parametri della piscina, ogni area comune è monitorata in continuo per offrire sempre il massimo del comfort e della sicurezza.",
      bullets: [
        "Clima e illuminazione di lobby e ristorante",
        "Piscina: temperatura, pH e cloro monitorati",
        "Spa e saune con scenari dedicati",
        "Consumi delle aree comuni ottimizzati",
      ],
      image: "/images/hotel-pool.png",
      before: [
        "Piscina controllata a mano due volte al giorno",
        "Luci e clima accesi a sale vuote",
      ],
      cards: [
        { icon: Waves, title: "Piscina", detail: "28° · pH 7,3 · cloro ok", status: "Parametri ottimali", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Lightbulb, title: "Area spa", detail: "Scenario relax attivo", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: Gauge,
      label: "Energia e Consumi",
      title: "Risparmio reale, misurato in tempo reale.",
      desc: "Monitora ogni consumo per camera, piano e impianto. Riduci gli sprechi e taglia i costi energetici dal 25 al 40%, con dati sempre alla mano.",
      layout: "dominant",
      bullets: [
        "Monitoraggio dei consumi in tempo reale",
        "−25/40% sui costi energetici",
        "Report per camera, piano e impianto",
        "Fino a +2 classi energetiche APE",
      ],
      image: "/images/hero-hotel.png",
      before: [
        "Consumi noti solo a bolletta arrivata",
        "Nessun dato per camera o piano",
      ],
      cards: [
        { icon: Gauge, title: "Consumi oggi", detail: "−32% vs media", status: "In tempo reale", position: "left-4 top-8 sm:-left-6 sm:top-12" },
        { icon: Zap, title: "Picco evitato", detail: "Carichi bilanciati", position: "bottom-6 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: Wrench,
      label: "Manutenzione Preventiva",
      title: "I guasti li vedi prima che accadano.",
      desc: "La diagnostica continua e l'analisi predittiva segnalano in anticipo cosa sta per rompersi. Meno fermi, meno chiamate urgenti, meno disagi per gli ospiti.",
      bullets: [
        "Diagnostica continua di tutti gli impianti",
        "Allarmi automatici sulle anomalie",
        "Analisi predittiva dei guasti",
        "−45% guasti non pianificati",
      ],
      image: "/images/industria-control.png",
      before: [
        "Il guasto lo scopre l'ospite",
        "Interventi urgenti a prezzo pieno",
      ],
      cards: [
        { icon: Activity, title: "Caldaia A", detail: "Anomalia prevista tra 9 gg", status: "Manutenzione pianificata", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Wrench, title: "Stato impianti", detail: "98% operativi", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
  ],
  stats: [
    { value: "−35%", label: "consumi energetici" },
    { value: "+30%", label: "soddisfazione ospiti" },
    { value: "−45%", label: "guasti non pianificati" },
    { value: "−60%", label: "incidenti di sicurezza" },
    { value: "+2", label: "classi energetiche APE" },
    { value: "+15%", label: "valore dell'immobile" },
    { value: "+100M€", label: "progetti gestiti" },
    { value: "95%", label: "tasso approvazione pratiche" },
  ],
  comparison: sharedComparison,
  finance: sharedFinance("trasformiamo l'investimento iniziale in un canone sostenibile."),
  assistance: sharedAssistance,
  ctaTitle: "Vuoi vedere QuickConnext nel tuo hotel?",
  ctaSubtitle:
    "Prenota una demo: ti mostriamo come sarebbe il tuo hotel connesso, con scenari e numeri reali sulla tua struttura.",
  ctaImage: "/images/cta-night.png",
};
