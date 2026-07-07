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
  TrendingUp,
} from "lucide-react";
import type { SectorConfig } from "@/components/sector/types";
import { sharedAssistance, sharedComparison, sharedFinance } from "./shared";

/* ⚠️ TESTI NON DOCUMENTATI — il verticale RSA / Sanitario NON è presente nei
 * documenti forniti dal cliente (lo ZIP copre Hotel, Industria/logistica,
 * Terziario direzionale e Retail/GDO). I contenuti qui sotto sono ESTRAPOLATI
 * applicando le capacità generali del prodotto (clima, qualità aria/CO₂,
 * sicurezza, manutenzione predittiva) al contesto sanitario; alcune voci
 * (es. "chiamata infermieri") non compaiono nei documenti. Da validare con
 * materiale ufficiale del cliente prima della pubblicazione.
 *
 * L'angolo del verticale è la CURA: comfort come parte della terapia, personale
 * sgravato dalle incombenze tecniche, direzione con pieno controllo. */
export const rsaSectorConfig: SectorConfig = {
  slug: "rsa",
  metaTitle: "RSA e Sanitario · Ambienti di cura connessi | QuickConnext Building",
  metaDescription:
    "Comfort, qualità dell'aria, sicurezza e chiamata infermieri integrati. La piattaforma BACS per RSA, cliniche e strutture sanitarie.",
  heroImage: "/images/sector-rsa.png",
  heroLabel: "Building Automation · RSA e Sanitario",
  heroTitle: "La tecnologia che non si vede, ",
  heroAccent: "la cura che si sente.",
  heroSubtitle:
    "Comfort costante, aria sana e risposta rapida alle chiamate, senza che ospiti e personale debbano pensarci: la struttura veglia da sola, giorno e notte.",
  heroVariant: "cinematic",
  heroKpis: [
    { value: "+30%", label: "soddisfazione ospiti" },
    { value: "−35%", label: "consumi energetici" },
    { value: "−60%", label: "incidenti di sicurezza" },
  ],
  heroLiveEvents: [
    {
      title: "Stanza 18 · comfort ottimale",
      detail: "23° e umidità al 50%, regolati sul benessere dell'ospite",
    },
    {
      title: "Qualità dell'aria",
      detail: "CO₂ a 620 ppm, ricambio d'aria nella norma in ogni ambiente",
    },
    {
      title: "Stanza 22 · chiamata gestita",
      detail: "Instradata al personale di turno, risposta in 1m 40s",
    },
    {
      title: "Sala comune",
      detail: "Scenario giorno attivo: luce e clima pronti per le attività",
    },
  ],
  hideSceneNav: true,
  heroCards: [],
  introLabel: "La piattaforma per la sanità",
  introTitle: "Il comfort è parte della cura.",
  introText:
    "In una struttura sanitaria la temperatura giusta, l'aria sana e una risposta rapida non sono comodità: sono qualità del servizio. QuickConnext le garantisce in automatico, stanza per stanza — così il personale si dedica alle persone e la direzione ha pieno controllo su comfort, consumi e sicurezza.",
  scenes: [
    {
      icon: Thermometer,
      label: "Comfort e Salute",
      title: "Ogni stanza, il suo equilibrio.",
      desc: "Chi vive la struttura è spesso fragile: clima, luce e aria vengono regolati in automatico sul benessere di ogni stanza, senza sbalzi e senza sprechi.",
      bullets: [
        "Clima — HVAC regolato stanza per stanza e per reparto",
        "Aria — CO₂ e qualità dell'aria monitorate in continuo",
        "Luce — scenari dolci per giorno, sera e notte",
        "Costanza — comfort stabile nelle 24 ore, senza intervento manuale",
        "+30% soddisfazione degli ospiti",
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
      title: "Spazi che invitano a stare insieme.",
      desc: "Refettorio, sale comuni e aree relax cambiano volto con la giornata: un tocco e l'ambiente è pronto per i pasti, le attività o il riposo.",
      bullets: [
        "Scenari — pasti, attività e relax attivabili con un tocco",
        "Clima e luce — coordinati in refettorio e sale comuni",
        "Benessere — comfort acustico e visivo per ospiti e personale",
        "Consumi — aree comuni ottimizzate quando non sono in uso",
        "−35% consumi energetici",
      ],
      image: "/images/rsa-common.png",
      cards: [
        { icon: Lightbulb, title: "Sala comune", detail: "Scenario giorno attivo", position: "left-4 top-8 sm:-left-6 sm:top-12" },
        { icon: Gauge, title: "Consumi", detail: "−29% vs media", position: "bottom-6 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
    {
      icon: ShieldCheck,
      label: "Sicurezza e Risposta",
      title: "Protezione discreta, risposta immediata.",
      desc: "La sicurezza in una struttura di cura non deve farsi notare: accessi, antincendio e chiamate lavorano in silenzio e arrivano subito a chi è di turno.",
      bullets: [
        "Chiamata — richieste instradate al personale giusto, con priorità",
        "Accessi — controllati per area e ruolo, con storico completo",
        "Antincendio — rilevazione fumi e fughe gas integrate",
        "Notifiche — immediate al personale, ovunque si trovi",
        "−60% incidenti di sicurezza",
      ],
      image: "/images/rsa-security.png",
      cards: [
        { icon: BellRing, title: "Stanza 22", detail: "Chiamata gestita", status: "Risposta 1m 40s", position: "left-4 top-6 sm:-left-6 sm:top-12" },
        { icon: Flame, title: "Antincendio", detail: "Sensori operativi", position: "bottom-8 right-4 sm:-right-6 sm:bottom-10" },
      ],
    },
  ],
  sectorLive: {
    afterSceneIndex: 2,
    kind: "rsa-care",
    label: "Il turno di notte, live",
    title: "Una notte tranquilla, sotto controllo.",
    subtitle:
      "La struttura veglia da sola: comfort notturno in ogni stanza, e quando arriva una chiamata viene instradata subito a chi è di turno — gestita, tracciata, risolta.",
  },
  grid: {
    label: "In ogni dettaglio",
    title: "Cura in ogni dettaglio.",
    subtitle:
      "Le stesse attenzioni delle stanze, estese a tutta la struttura — e a tutte le sedi.",
    features: [
      { icon: HeartPulse, title: "Chiamata infermieri", desc: "Richieste instradate al personale giusto, con priorità." },
      { icon: Wind, title: "Qualità dell'aria", desc: "Ricambio d'aria e CO₂ controllati in ogni ambiente." },
      { icon: Camera, title: "Videosorveglianza", desc: "Aree comuni e perimetro monitorati con discrezione." },
      { icon: Gauge, title: "Energia", desc: "Consumi ridotti senza compromessi sul comfort." },
      { icon: Activity, title: "Manutenzione predittiva", desc: "Impianti critici sempre efficienti e sicuri." },
      { icon: Building2, title: "Multi-struttura", desc: "Gestisci più sedi da un'unica piattaforma." },
    ],
  },
  statsSection: {
    label: "Perché investire nella struttura",
    title: "La qualità della cura si misura.",
    subtitle:
      "Benessere delle persone, efficienza dei conti, sicurezza degli ambienti e valore dell'immobile: quattro risultati concreti.",
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
  statGroups: [
    {
      icon: HeartPulse,
      title: "Benessere",
      stat: { value: "+30%", label: "soddisfazione ospiti" },
      desc: "Comfort costante e aria sana in ogni stanza, con risposta rapida alle chiamate: le persone vivono meglio, le famiglie lo notano.",
    },
    {
      icon: Gauge,
      title: "Efficienza",
      stat: { value: "−35%", label: "consumi energetici" },
      desc: "Il clima segue l'uso reale degli ambienti e le aree comuni si ottimizzano da sole: il risparmio non toglie nulla al comfort.",
      secondary: { value: "+2", label: "classi energetiche APE" },
    },
    {
      icon: ShieldCheck,
      title: "Sicurezza",
      stat: { value: "−60%", label: "incidenti di sicurezza" },
      desc: "Accessi controllati, antincendio integrato e impianti critici sotto diagnostica continua, giorno e notte.",
      secondary: { value: "−45%", label: "guasti non pianificati" },
    },
    {
      icon: TrendingUp,
      title: "Valore",
      stat: { value: "+15%", label: "valore dell'immobile" },
      desc: "L'investimento si ripaga con i risparmi generati, e le agevolazioni pubbliche lo rendono sostenibile fin da subito.",
      secondary: { value: "95%", label: "pratiche di agevolazione approvate" },
    },
  ],
  comparisonSection: {
    label: "Il confronto",
    title: "Un solo partner, nessun pensiero in più.",
    subtitle:
      "QuickConnext Building a confronto con un system integrator a protocollo proprietario.",
  },
  comparisonTraditionalLabel: "System Integrator mono-protocollo",
  comparison: sharedComparison,
  finance: sharedFinance("rendiamo l'investimento sostenibile per le strutture sanitarie."),
  assistance: sharedAssistance,
  ctaTitle: "Vuoi vedere QuickConnext nella tua struttura?",
  ctaSubtitle:
    "Prenota una demo: ti mostriamo come migliorare comfort, sicurezza e consumi della tua RSA o struttura sanitaria.",
  ctaImage: "/images/cta-night.png",
};
