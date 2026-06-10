import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const posts: Record<
  string,
  { title: string; category: string; date: string; readTime: string; content: string[] }
> = {
  "bacs-2026-cosa-cambia": {
    title: "BACS 2026: cosa cambia per hotel e edifici commerciali",
    category: "Normativa",
    date: "15 Mag 2026",
    readTime: "6 min",
    content: [
      "Entro il 2026, gli edifici non residenziali con potenza termica ed elettrica superiore a 290 kW dovranno dotarsi di sistemi di automazione edifici (BACS) conformi alla direttiva EPBD.",
      "Per hotel, uffici e strutture sanitarie questo significa un passaggio obbligatorio verso il monitoraggio centralizzato di HVAC, illuminazione e consumi — con benefici concreti in termini di risparmio energetico e valorizzazione patrimoniale.",
      "QuickConnext Building accompagna i gestori in ogni fase: audit iniziale, progettazione, installazione e messa in servizio con certificazione BACS Classe A.",
    ],
  },
  "clima-intelligente-hotel": {
    title: "Clima intelligente in hotel: comfort ospite ed efficienza",
    category: "Hospitality",
    date: "2 Mag 2026",
    readTime: "5 min",
    content: [
      "La termoregolazione per camera, combinata con sensori di presenza e scenari automatici, permette di ridurre i consumi HVAC fino al 35% mantenendo il comfort percepito dall'ospite.",
      "Integrando accessi keyless e supervisione remota, il personale di reception e manutenzione ha visibilità completa sullo stato di ogni camera in tempo reale.",
    ],
  },
  "protocolli-aperti-knx-modbus": {
    title: "Perché i protocolli aperti (KNX, Modbus, BACnet) contano",
    category: "Tecnologia",
    date: "20 Apr 2026",
    readTime: "7 min",
    content: [
      "I sistemi chiusi legano il cliente a un unico fornitore per manutenzione, espansioni e aggiornamenti. I protocolli aperti eliminano questo vincolo.",
      "QuickConnext Building integra nativamente KNX, Modbus e BACnet, garantendo interoperabilità tra dispositivi di produttori diversi e massima flessibilità nel tempo.",
    ],
  },
  "manutenzione-predictive-rsa": {
    title: "Manutenzione predittiva nelle strutture sanitarie",
    category: "Healthcare",
    date: "8 Apr 2026",
    readTime: "4 min",
    content: [
      "Nelle RSA e nelle cliniche, la continuità operativa degli impianti è critica. Allarmi centralizzati e diagnostica remota permettono di intervenire prima che un guasto impatti assistiti e personale.",
      "La piattaforma QuickConnext unifica rilevazione incendi, controllo accessi e monitoraggio ambientale in un unico cruscotto conforme agli standard di sicurezza del settore.",
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Articolo non trovato" };
  return { title: `${post.title} | QuickConnext Building` };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <main className="min-h-screen">
      <section className="relative py-32 section-dark noise-texture dot-grid-dark text-white overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-brand-teal-light hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Torna al blog
          </Link>
          <span className="section-label">{post.category}</span>
          <h1 className="heading-h2-dark mt-4">{post.title}</h1>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {post.date}
            </span>
            <span>{post.readTime} di lettura</span>
          </div>
        </div>
      </section>

      <section className="py-20 section-light">
        <article className="max-w-3xl mx-auto px-6 md:px-12 body-text text-brand-navy space-y-6">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>
      </section>
    </main>
  );
}
