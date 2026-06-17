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
                alt="Quick Connext Building"
                width={1024}
                height={903}
                className="h-20 w-auto object-contain sm:h-24"
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
                <span>Via Plava 62<br />10135 Torino (TO), Italia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-teal shrink-0" />
                <a href="tel:+390110360421" className="hover:text-brand-teal transition-colors">
                  (+39) 011 036 04 21
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

        <div className="pt-10 text-xs text-slate-500 font-sans text-center leading-relaxed">
          <p>
            &copy; {new Date().getFullYear()} Più Sviluppo s.r.l.{" "}
            <span className="text-slate-700">|</span>{" "}
            Sede Legale: Via Plava 62, 10135 Torino (Italy){" "}
            <span className="text-slate-700">|</span>{" "}
            <a href="tel:+390110360421" className="hover:text-white transition-colors">
              (+39) 011 036 04 21
            </a>{" "}
            <span className="text-slate-700">|</span>{" "}
            Sedi Operative: Torino - Genova - Roma - Palermo{" "}
            <span className="text-slate-700">|</span>{" "}
            <a href="mailto:company@piusviluppo.it" className="hover:text-white transition-colors">
              company@piusviluppo.it
            </a>{" "}
            <span className="text-slate-700">|</span>{" "}
            P.Iva 12028010010{" "}
            <span className="text-slate-700">|</span>{" "}
            Capitale Sociale € 89.000,00 inter. ver.{" "}
            <span className="text-slate-700">|</span>{" "}
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>{" "}
            <span className="text-slate-700">|</span>{" "}
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              Cookies
            </Link>{" "}
            <span className="text-slate-700">|</span>{" "}
            <Link href="/cookie-policy" className="hover:text-white transition-colors">
              Gestisci consenso
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
