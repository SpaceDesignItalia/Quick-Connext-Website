import Link from "next/link";
import Image from "next/image";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-navy-dark text-slate-400 pt-20 pb-10 border-t border-brand-teal relative overflow-hidden noise-texture dot-grid-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5">
          <div className="flex flex-col gap-5">
            <Link href="/" className="group block w-fit transition-opacity hover:opacity-90">
              <Image
                src="/logo-lungo.png"
                alt="QuickConnext Building"
                width={180}
                height={220}
                className="h-[88px] w-auto object-contain"
              />
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed font-sans opacity-80">
              Piattaforma di building automation integrata e intelligente per ottimizzare consumi, comfort e sicurezza nei settori hospitality, business e sanità.
            </p>

            <div className="flex items-center gap-2.5 text-xs text-slate-500 font-semibold bg-white/5 border border-white/5 px-3 py-1.5 w-fit teal-accent-left pl-3">
              <Shield size={14} className="text-brand-teal" />
              BACS EN ISO 52120-1 Conformità 2026
            </div>
          </div>

          <div>
            <h4 className="section-label mb-6">Settori</h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link href="/hotel" className="hover:text-brand-teal transition-colors">
                  Hotel & Hospitality
                </Link>
              </li>
              <li>
                <Link href="/industry" className="hover:text-brand-teal transition-colors">
                  Industria
                </Link>
              </li>
              <li>
                <Link href="/rsa" className="hover:text-brand-teal transition-colors">
                  RSA / Strutture Sanitarie
                </Link>
              </li>
              <li>
                <Link href="/building" className="hover:text-brand-teal transition-colors">
                  Building / Direzionale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="section-label mb-6">Navigazione</h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/progetti" className="hover:text-brand-teal transition-colors">
                  Progetti
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-teal transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/chi-siamo" className="hover:text-brand-teal transition-colors">
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="hover:text-brand-teal transition-colors">
                  Contattaci
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="section-label mb-6">Contatti</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-teal shrink-0 mt-0.5" />
                <span>Via del Lavoro, 12<br />24100 Bergamo (BG) - Italia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-teal shrink-0" />
                <a href="tel:+39035123456" className="hover:text-brand-teal transition-colors">
                  +39 035 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-teal shrink-0" />
                <a href="mailto:info@quickconnext.eu" className="hover:text-brand-teal transition-colors">
                  info@quickconnext.eu
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 text-xs text-slate-500 font-sans">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center md:text-left">
            <span>
              &copy; {new Date().getFullYear()} QuickConnext. Tutti i diritti riservati.
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="text-slate-400 font-semibold">
              Un prodotto di{" "}
              <a
                href="https://piusviluppo.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-teal hover:underline transition-colors"
              >
                Più Sviluppo S.r.l.
              </a>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
