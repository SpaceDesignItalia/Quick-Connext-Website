import { BadgeCheck, Headset, Plug, Timer } from "lucide-react";
import type { ComparisonRow, GridFeature } from "@/components/sector/types";

export const sharedComparison: ComparisonRow[] = [
  {
    aspect: "Fornitori",
    quick: "Un unico partner per tutto l'impianto",
    traditional: "Più aziende che non dialogano tra loro",
  },
  {
    aspect: "Protocolli",
    quick: "Aperti: KNX, Modbus, BACnet, qualsiasi marca",
    traditional: "Proprietari, con vincolo al produttore",
  },
  {
    aspect: "Tempi di intervento",
    quick: "Diagnostica da remoto e intervento entro 24h",
    traditional: "~Sopralluoghi e tempi variabili",
  },
  {
    aspect: "Aggiornamenti",
    quick: "Software aggiornabile nel tempo",
    traditional: "Sistemi chiusi, difficili da evolvere",
  },
  {
    aspect: "Costi nascosti",
    quick: "Canone trasparente, ROI misurabile",
    traditional: "~Extra ricorrenti e licenze separate",
  },
  {
    aspect: "Dati e reportistica",
    quick: "Un cruscotto unico con dati in tempo reale",
    traditional: "Dati frammentati su sistemi diversi",
  },
];

export const sharedAssistance: GridFeature[] = [
  { icon: Headset, title: "Supporto 24/7", desc: "Un team sempre raggiungibile, ogni giorno dell'anno." },
  { icon: Timer, title: "Intervento in 24h", desc: "Tempi di risposta garantiti per le emergenze." },
  { icon: BadgeCheck, title: "Garanzia 24 mesi", desc: "Due anni di garanzia completa su tutto l'impianto." },
  { icon: Plug, title: "Plug & play", desc: "Installazione rapida, senza fermare la tua attività." },
];

export function sharedFinance(focus: string) {
  return {
    label: "Finanza di progetto",
    title: "L'investimento si ripaga da solo.",
    text: `Accediamo per te alle agevolazioni pubbliche e, con il modello ESCo, ${focus} L'efficienza generata copre nel tempo l'investimento iniziale.`,
    points: [
      { title: "95%", desc: "tasso di approvazione delle pratiche di agevolazione gestite per i nostri clienti." },
      { title: "0€", desc: "investimento iniziale possibile con il modello ESCo: paghi con il risparmio generato." },
      { title: "+100M€", desc: "di progetti finanziati e gestiti sul territorio italiano." },
      { title: "ROI", desc: "tempo di ritorno chiaro e misurabile, calcolato prima di partire." },
    ],
  };
}
