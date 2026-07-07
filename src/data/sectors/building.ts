import {
  Thermometer,
  Lightbulb,
  Gauge,
  ShieldCheck,
  Users,
  KeyRound,
  Zap,
  Car,
  Wind,
  Activity,
  LeafyGreen,
  Building2,
  BadgeCheck,
} from "lucide-react";
import type { SectorConfig } from "@/components/sector/types";
import { sharedAssistance, sharedComparison, sharedFinance } from "./shared";

/* Verticale Edifici / Terziario direzionale — l'angolo è doppio: l'edificio
   che segue le persone (comfort e produttività per chi lavora) e la SCADENZA
   NORMATIVA (direttiva BACS 2026, Decreto Requisiti Minimi · Classe B) per
   chi lo possiede e lo gestisce. Cifre riprese dai contenuti documentati. */
export const buildingSectorConfig: SectorConfig = {
  slug: "building",
  metaTitle: "Edifici e Uffici · Direzionali smart e a norma | QuickConnext Building",
  metaDescription:
    "Comfort, accessi, energia e sicurezza per uffici e direzionali. La piattaforma BACS conforme alla direttiva 2026, con protocolli aperti.",
  heroImage: "/images/edifici-lobby.png",
  heroLabel: "Building Automation · Edifici e Uffici",
  heroTitle: "L'edificio che segue le persone, ",
  heroAccent: "non il contrario.",
  heroSubtitle:
    "Clima e luci accompagnano l'occupazione dei piani, gli accessi restano tracciati e i consumi si azzerano dove non c'è nessuno. E per la direttiva BACS 2026 sei già pronto.",
  heroVariant: "cinematic",
  heroKpis: [
    { value: "−35%", label: "consumi energetici" },
    { value: "+2", label: "classi energetiche APE" },
    { value: "+30%", label: "soddisfazione utenti" },
  ],
  heroLiveEvents: [
    {
      title: "Sala riunioni 3 · pronta all'uso",
      detail: "22° e aria ottima: lo scenario si è attivato da solo",
    },
    {
      title: "Ingresso principale",
      detail: "142 accessi oggi, tutti tracciati · tutto regolare",
    },
    {
      title: "Edificio · −33% consumi",
      detail: "Conformità BACS Classe B, dati pronti per gli audit",
    },
    {
      title: "Open space",
      detail: "Luce naturale +40%: le schermature seguono il sole",
    },
  ],
  hideSceneNav: true,
  heroCards: [],
  introLabel: "La piattaforma per gli edifici",
  introTitle: "Efficiente per chi lo gestisce, confortevole per chi lo vive.",
  introText:
    "Un direzionale ha tre pubblici: chi ci lavora vuole comfort, chi lo gestisce vuole controllo e chi lo possiede vuole valore e conformità. QuickConnext li serve tutti e tre con un'unica piattaforma a protocolli aperti — pronta per la direttiva BACS 2026, dal piano terra all'ultimo piano.",
  scenes: [
    {
      icon: Thermometer,
      label: "Comfort e Produttività",
      title: "Ambienti perfetti per lavorare.",
      desc: "Clima, luce e aria si adattano a presenze e orari, piano per piano: le sale riunioni si preparano da sole e gli spazi vuoti smettono di consumare.",
      bullets: [
        "Zone — clima e illuminazione per piano, area e singola sala",
        "Sale riunioni — scenari automatici, pronte all'uso",
        "Aria — CO₂ monitorata e ricambio a norma in base alle presenze",
        "Presenza — spazi vuoti in eco automatico, sprechi azzerati",
        "+30% soddisfazione di chi lavora",
      ],
      image: "/images/edifici-meeting.png",
      cards: [
        { icon: Thermometer, title: "Sala riunioni 3", detail: "22° · aria ottima", status: "Pronta all'uso", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Lightbulb, title: "Open space", detail: "Luce naturale +40%", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: KeyRound,
      label: "Accessi e Reception",
      title: "Chi entra, quando, esattamente dove.",
      desc: "Badge, visitatori e videosorveglianza in un'unica gestione: la reception lavora meglio e ogni accesso all'edificio resta tracciato.",
      bullets: [
        "Badge — accessi per piano, area e fascia oraria",
        "Visitatori — gestione semplice, direttamente dalla reception",
        "Videosorveglianza — integrata nella stessa supervisione",
        "Storico — ogni accesso tracciato e sempre consultabile",
        "−60% incidenti di sicurezza",
      ],
      image: "/images/edifici-lobby.png",
      cards: [
        { icon: Users, title: "Ingresso", detail: "142 accessi oggi", status: "Tutto regolare", position: "left-4 top-8 sm:-left-6 sm:top-12" },
        { icon: ShieldCheck, title: "Aree riservate", detail: "Accessi tracciati", position: "bottom-6 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: Gauge,
      label: "Energia e Conformità",
      title: "Efficiente oggi, a norma per il 2026.",
      desc: "La direttiva BACS non è un adempimento da rimandare: è l'occasione di tagliare i consumi. Monitoraggio per piano e impianto, dati pronti per gli audit.",
      bullets: [
        "Monitoraggio — consumi per piano, impianto e fascia oraria",
        "Direttiva BACS — conformità Classe B, Decreto Requisiti Minimi",
        "Classe energetica — fino a +2 classi APE dopo l'intervento",
        "Reportistica — pronta per audit, certificazioni ed ESG",
        "−35% consumi energetici",
      ],
      image: "/images/sector-edifici.png",
      cards: [
        { icon: Gauge, title: "Edificio", detail: "−33% consumi", status: "BACS Classe B", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Zap, title: "Picco evitato", detail: "Carichi bilanciati", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
  ],
  sectorLive: {
    afterSceneIndex: 1,
    kind: "building-day",
    label: "Una giornata, live",
    title: "Dall'apertura alla chiusura, da sola.",
    subtitle:
      "I piani si popolano e si svuotano, clima e luci seguono l'occupazione e il carico dell'edificio scende dove non c'è nessuno. Nessun intervento manuale, mai.",
  },
  grid: {
    label: "Oltre gli uffici",
    title: "Un edificio, infinite possibilità.",
    subtitle:
      "La stessa regia copre parcheggi, sicurezza e sostenibilità — su una o più sedi.",
    features: [
      { icon: ShieldCheck, title: "Sicurezza", desc: "Videosorveglianza, allarmi e antincendio integrati." },
      { icon: Car, title: "Parcheggi", desc: "Gestione accessi e posti auto in tempo reale." },
      { icon: Wind, title: "Qualità dell'aria", desc: "Ricambio e CO₂ controllati in ogni ambiente." },
      { icon: Activity, title: "Manutenzione predittiva", desc: "Impianti sempre efficienti, meno fermi." },
      { icon: LeafyGreen, title: "Sostenibilità", desc: "Dati pronti per certificazioni ed ESG." },
      { icon: Building2, title: "Multi-edificio", desc: "Più sedi gestite da un unico cruscotto." },
    ],
  },
  statsSection: {
    label: "Perché adeguarsi conviene",
    title: "La conformità che si ripaga.",
    subtitle:
      "L'adeguamento alla direttiva BACS non è solo un obbligo: è efficienza, comfort e valore dell'immobile, misurabili.",
  },
  stats: [
    { value: "−35%", label: "consumi energetici" },
    { value: "+30%", label: "soddisfazione utenti" },
    { value: "−45%", label: "guasti non pianificati" },
    { value: "−60%", label: "incidenti di sicurezza" },
    { value: "+2", label: "classi energetiche APE" },
    { value: "+15%", label: "valore dell'immobile" },
    { value: "+100M€", label: "progetti gestiti" },
    { value: "95%", label: "tasso approvazione pratiche" },
  ],
  statGroups: [
    {
      icon: Gauge,
      title: "Efficienza",
      stat: { value: "−35%", label: "consumi energetici" },
      desc: "Clima e luci seguono l'occupazione reale dei piani: gli spazi vuoti vanno in eco da soli e i consumi si azzerano dove non c'è nessuno.",
      secondary: { value: "+2", label: "classi energetiche APE" },
    },
    {
      icon: BadgeCheck,
      title: "Conformità",
      stat: { value: "+15%", label: "valore dell'immobile" },
      desc: "Conformità BACS Classe B con dati e reportistica pronti per gli audit: l'edificio è a norma e vale di più.",
      secondary: { value: "BACS 2026", label: "EPBD e Decreto Requisiti Minimi · Classe B" },
    },
    {
      icon: Users,
      title: "Persone",
      stat: { value: "+30%", label: "soddisfazione utenti" },
      desc: "Sale riunioni pronte all'uso, aria monitorata e comfort costante: spazi più produttivi per chi ci lavora ogni giorno.",
    },
    {
      icon: ShieldCheck,
      title: "Sicurezza",
      stat: { value: "−60%", label: "incidenti di sicurezza" },
      desc: "Accessi tracciati per piano e area, videosorveglianza integrata e impianti sotto diagnostica continua.",
      secondary: { value: "−45%", label: "guasti non pianificati" },
    },
  ],
  comparisonSection: {
    label: "Il confronto",
    title: "Aperto oggi, aggiornabile domani.",
    subtitle:
      "QuickConnext Building a confronto con un system integrator a protocollo proprietario.",
  },
  comparisonTraditionalLabel: "System Integrator mono-protocollo",
  comparison: sharedComparison,
  finance: sharedFinance("trasformiamo la riqualificazione in un investimento sostenibile."),
  assistance: sharedAssistance,
  ctaTitle: "Vuoi vedere QuickConnext nel tuo edificio?",
  ctaSubtitle:
    "Prenota una demo: ti mostriamo come rendere il tuo edificio efficiente, sicuro e conforme alla direttiva BACS 2026.",
  ctaImage: "/images/cta-night.png",
};
