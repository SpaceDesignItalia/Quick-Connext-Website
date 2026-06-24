import Link from "next/link";
import Image from "next/image";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

const sectorLinks = [
  { href: "/hotel", label: "Hotel & Hospitality" },
  { href: "/industry", label: "Industria" },
  { href: "/rsa", label: "RSA / Strutture Sanitarie" },
  { href: "/building", label: "Building / Direzionale" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/progetti", label: "Progetti" },
  { href: "/blog", label: "Blog" },
  { href: "/chi-siamo", label: "Chi Siamo" },
  { href: "/contatti", label: "Contattaci" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie" },
  { href: "/cookie-policy", label: "Gestisci consenso" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {title}
      </h4>
      <ul className="mt-5 flex flex-col gap-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-white/65 transition-colors hover:text-brand-bright"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy text-white/65">
      <div className="tech-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(0,126,120,0.08),transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-20 md:px-12">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="group block w-fit shrink-0 transition-opacity hover:opacity-90"
            >
              <Image
                src="/logo-lungo.png"
                alt="Quick Connext Building"
                width={1024}
                height={903}
                className="h-20 w-auto object-contain sm:h-24"
              />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              Piattaforma di building automation integrata e intelligente per
              ottimizzare consumi, comfort e sicurezza nei settori hospitality,
              business e sanità.
            </p>

            <div className="flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-white/70">
              <Shield size={14} className="text-brand-bright" />
              BACS EN ISO 52120-1 · Conformità 2026
            </div>
          </div>

          <FooterColumn title="Settori" links={sectorLinks} />
          <FooterColumn title="Navigazione" links={navLinks} />

          {/* Contacts */}
          <div>
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Contatti
            </h4>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand-bright" />
                <span className="text-white/65">
                  Via Plava 62
                  <br />
                  10135 Torino (TO), Italia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-brand-bright" />
                <a
                  href="tel:+390110360421"
                  className="text-white/65 transition-colors hover:text-brand-bright"
                >
                  (+39) 011 036 04 21
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-brand-bright" />
                <a
                  href="mailto:info@quickconnext.eu"
                  className="text-white/65 transition-colors hover:text-brand-bright"
                >
                  info@quickconnext.eu
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-6 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs leading-relaxed text-white/40">
            &copy; {year} Più Sviluppo s.r.l. · P.IVA 12028010010 · Cap. Soc. €
            89.000,00 i.v.
            <br className="hidden sm:block" />
            Sede legale: Via Plava 62, 10135 Torino · Sedi operative: Torino ·
            Genova · Roma · Palermo
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/50 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
