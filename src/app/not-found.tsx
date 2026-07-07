import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Pagina non trovata | QuickConnext Building",
};

/* 404 brandizzata: al posto della pagina grigia di default, orientiamo il
   visitatore verso home, settori e contatti. */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
        <Compass className="size-7" aria-hidden />
      </span>
      <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        Errore 404
      </p>
      <h1 className="mt-4 max-w-xl text-balance font-display text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl">
        Questa pagina non esiste.
      </h1>
      <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
        L&apos;indirizzo potrebbe essere cambiato o non essere mai esistito.
        Riparti dalla home oppure raccontaci di cosa hai bisogno.
      </p>
      <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-base font-semibold text-white transition-colors hover:bg-brand-navy"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Torna alla home
        </Link>
        <Link
          href="/contatti"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brand-line px-7 text-base font-semibold text-brand-navy transition-colors hover:border-brand-teal hover:text-brand-teal"
        >
          Contattaci
        </Link>
      </div>
    </main>
  );
}
