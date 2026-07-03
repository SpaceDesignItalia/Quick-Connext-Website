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
} from "lucide-react";
import type { SectorConfig } from "@/components/sector/types";
import { sharedAssistance, sharedComparison, sharedFinance } from "./shared";

export const buildingSectorConfig: SectorConfig = {
  slug: "building",
  metaTitle: "Edifici e Uffici · Direzionali smart e a norma | QuickConnext Building",
  metaDescription:
    "Comfort, accessi, energia e sicurezza per uffici e direzionali. La piattaforma BACS conforme alla direttiva 2026, con protocolli aperti.",
  heroImage: "/images/edifici-lobby.png",
  heroLabel: "Soluzione Edifici",
  heroTitle: "Edifici efficienti, ",
  heroAccent: "sicuri e a norma.",
  heroSubtitle:
    "Comfort per chi lavora, sicurezza per chi entra, controllo totale per chi gestisce. Uffici e direzionali pronti per la direttiva BACS 2026.",
  hideSceneNav: true,
  heroCards: [],
  introLabel: "La piattaforma per gli edifici",
  introTitle: "Un edificio che lavora per chi lo abita.",
  introText:
    "QuickConnext unisce comfort, sicurezza ed efficienza in un'unica piattaforma. Spazi più produttivi, costi sotto controllo e conformità normativa garantita, dal piano terra all'ultimo piano.",
  scenes: [
    {
      icon: Thermometer,
      label: "Comfort e Produttività",
      title: "Ambienti perfetti per lavorare.",
      desc: "Clima, luce e qualità dell'aria si adattano a presenza e orari. Sale riunioni pronte all'uso, spazi sempre confortevoli.",
      bullets: [
        "Clima e illuminazione per zona e piano",
        "Sale riunioni con scenari automatici",
        "Qualità dell'aria e CO₂ monitorate",
        "Comfort su misura, sprechi azzerati",
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
      title: "Chi entra, quando ed esattamente dove.",
      desc: "Controllo accessi, badge e gestione visitatori integrati. Reception più efficiente e sicurezza tracciata in ogni punto dell'edificio.",
      bullets: [
        "Badge e accessi per piano e area",
        "Gestione visitatori semplice",
        "Videosorveglianza integrata",
        "Storico accessi sempre disponibile",
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
      desc: "Monitora i consumi di tutto l'edificio e ottieni i dati richiesti dalla direttiva BACS. Risparmio reale e conformità garantita.",
      bullets: [
        "Monitoraggio consumi per piano e impianto",
        "Conformità alla direttiva BACS 2026",
        "Fino a +2 classi energetiche APE",
        "Reportistica pronta per audit ed ESG",
      ],
      image: "/images/sector-edifici.png",
      cards: [
        { icon: Gauge, title: "Edificio", detail: "−33% consumi", status: "BACS Classe B", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Zap, title: "Picco evitato", detail: "Carichi bilanciati", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
  ],
  grid: {
    title: "Un edificio, infinite possibilità.",
    features: [
      { icon: ShieldCheck, title: "Sicurezza", desc: "Videosorveglianza, allarmi e antincendio integrati." },
      { icon: Car, title: "Parcheggi", desc: "Gestione accessi e posti auto in tempo reale." },
      { icon: Wind, title: "Qualità dell'aria", desc: "Ricambio e CO₂ controllati in ogni ambiente." },
      { icon: Activity, title: "Manutenzione predittiva", desc: "Impianti sempre efficienti, meno fermi." },
      { icon: LeafyGreen, title: "Sostenibilità", desc: "Dati pronti per certificazioni ed ESG." },
      { icon: Building2, title: "Multi-edificio", desc: "Più sedi gestite da un unico cruscotto." },
    ],
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
  comparison: sharedComparison,
  finance: sharedFinance("trasformiamo la riqualificazione in un investimento sostenibile."),
  assistance: sharedAssistance,
  ctaTitle: "Vuoi vedere QuickConnext nel tuo edificio?",
  ctaSubtitle:
    "Prenota una demo: ti mostriamo come rendere il tuo edificio efficiente, sicuro e conforme alla direttiva BACS 2026.",
  ctaImage: "/images/cta-night.png",
};
