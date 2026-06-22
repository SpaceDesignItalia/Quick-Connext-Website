import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BlogPostCta() {
  return (
    <section className="relative py-24 section-dark noise-texture dot-grid-dark text-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10">
        <span className="section-label">PARLIAMONE</span>
        <h2 className="heading-h2-dark mt-4">
          Vuoi applicare queste soluzioni al tuo edificio?
        </h2>
        <p className="body-text text-slate-300 mt-6">
          Prenota una demo gratuita con il team QuickConnext Building: analizziamo
          la tua struttura e definiamo un piano su misura per efficienza,
          conformità e comfort.
        </p>
        <Link
          href="/contatti"
          className="inline-flex items-center gap-2 mt-10 rounded-full px-8 py-3.5 bg-brand-teal text-brand-navy-dark font-semibold text-sm uppercase tracking-wider hover:bg-white transition-colors duration-300"
        >
          Contattaci
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
