export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "bacs-2026-cosa-cambia",
    title: "BACS 2026: cosa cambia per hotel e edifici commerciali",
    excerpt:
      "La direttiva EPBD impone sistemi di automazione edifici entro il 2026. Guida pratica agli obblighi, alle scadenze e alle opportunità di risparmio.",
    category: "Normativa",
    date: "15 Mag 2026",
    readTime: "6 min",
    image: "/images/sector-edifici.png",
  },
  {
    slug: "clima-intelligente-hotel",
    title: "Clima intelligente in hotel: comfort ospite ed efficienza",
    excerpt:
      "Termoregolazione per camera, presenza rilevata e scenari automatici: come ridurre i consumi HVAC fino al 35% senza compromettere l'esperienza.",
    category: "Hospitality",
    date: "2 Mag 2026",
    readTime: "5 min",
    image: "/images/hotel-room.png",
  },
  {
    slug: "protocolli-aperti-knx-modbus",
    title: "Perché i protocolli aperti (KNX, Modbus, BACnet) contano",
    excerpt:
      "Evitare il vendor lock-in significa libertà di espansione, manutenzione competitiva e integrazione futura con qualsiasi dispositivo certificato.",
    category: "Tecnologia",
    date: "20 Apr 2026",
    readTime: "7 min",
    image: "/images/industria-control.png",
  },
  {
    slug: "manutenzione-predictive-rsa",
    title: "Manutenzione predittiva nelle strutture sanitarie",
    excerpt:
      "Allarmi centralizzati, diagnostica remota e conformità ambientale: la building automation come alleato della sicurezza assistenziale.",
    category: "Healthcare",
    date: "8 Apr 2026",
    readTime: "4 min",
    image: "/images/sector-rsa.png",
  },
];
