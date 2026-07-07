"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* Ogni campo valido guadagna un check animato; gli errori compaiono solo
   dopo che l'utente ha lasciato il campo (validazione on-blur, mai mentre
   scrive) e spiegano sempre come rimediare. */
const FIELD_ORDER = ["nome", "azienda", "email", "telefono", "settore", "messaggio"] as const;
type FieldName = (typeof FIELD_ORDER)[number];

const validators: Record<FieldName, (v: string) => boolean> = {
  nome: (v) => v.trim().length >= 3,
  azienda: (v) => v.trim().length >= 2,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  telefono: (v) => (v.match(/\d/g) ?? []).length >= 8,
  settore: (v) => v !== "",
  messaggio: (v) => v.trim().length >= 15,
};

const ERROR_MSG: Record<FieldName, string> = {
  nome: "Inserisci nome e cognome.",
  azienda: "Inserisci il nome della tua azienda o struttura.",
  email: "Inserisci un indirizzo e-mail valido (es. nome@azienda.it).",
  telefono: "Inserisci un numero di telefono con almeno 8 cifre.",
  settore: "Seleziona il settore di interesse.",
  messaggio: "Descrivi in almeno due righe la tua esigenza (minimo 15 caratteri).",
};

/* Check verde che "scatta" quando il campo diventa valido: pop a molla del
   badge + tratto della spunta disegnato in stroke. */
function FieldCheck({
  visible,
  className = "right-3 top-1/2 -translate-y-1/2",
}: {
  visible: boolean;
  /** Posizionamento completo del badge (default: centrato a destra). */
  className?: string;
}) {
  return (
    <span
      className={cn("pointer-events-none absolute", className)}
      aria-hidden
    >
      <AnimatePresence>
        {visible && (
          <motion.span
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ type: "spring", stiffness: 520, damping: 24 }}
            className="flex size-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-3">
              <motion.path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.28, delay: 0.08, ease: "easeOut" }}
              />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* Messaggio d'errore sotto il campo, annunciato anche agli screen reader. */
function FieldError({ id, show, message }: { id: string; show: boolean; message: string }) {
  if (!show) return null;
  return (
    <p id={id} role="alert" className="text-xs leading-snug text-red-600">
      {message}
    </p>
  );
}

/* text-base su mobile: sotto i 16px iOS zooma la pagina al focus.
   pr a parte: gli input riservano spazio al check, la select anche alla freccia. */
const inputClass = (valid: boolean, error: boolean, padRight = "pr-10") =>
  cn(
    "border p-3 text-base sm:text-sm rounded-xl outline-none transition-colors duration-300",
    "focus:border-brand-teal focus:ring-1 focus:ring-brand-teal",
    padRight,
    error ? "border-red-300" : valid ? "border-emerald-300" : "border-slate-200",
  );

export default function ContattiPage() {
  const [formData, setFormData] = useState<Record<FieldName, string>>({
    nome: "",
    azienda: "",
    email: "",
    telefono: "",
    settore: "",
    messaggio: "",
  });
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Dopo l'invio il focus va sulla conferma: gli screen reader la leggono subito.
  useEffect(() => {
    if (submitted) successHeadingRef.current?.focus();
  }, [submitted]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isValid = (field: FieldName) => validators[field](formData[field]);
  const showError = (field: FieldName) => !!touched[field] && !isValid(field);
  const allDone = FIELD_ORDER.every(isValid);

  const errorProps = (field: FieldName) =>
    showError(field)
      ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` }
      : {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allDone) {
      // Mostra tutti gli errori e porta il focus sul primo campo da correggere.
      setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])));
      const firstInvalid = FIELD_ORDER.find((f) => !isValid(f));
      if (firstInvalid) {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
          ?.focus();
      }
      return;
    }
    setSending(true);
    // Simulate API submission
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setTouched({});
      setFormData({
        nome: "",
        azienda: "",
        email: "",
        telefono: "",
        settore: "",
        messaggio: "",
      });
    }, 800);
  };

  return (
    <main className="min-h-screen section-light noise-texture dot-grid-light pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-2xl mb-16">
          <span className="section-label">CONTATTACI E PRENOTA</span>
          <h1 className="heading-h2-light mt-4">
            Parla con un nostro esperto
          </h1>
          <p className="body-text text-brand-navy mt-4">
            Siamo a tua disposizione per una consulenza gratuita, stesura di preventivi o analisi di conformità BACS della tua struttura.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Info & Calendly Embed card */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            {/* Contact Details Card */}
            <div className="section-dark noise-texture dot-grid-dark text-white p-8 border border-brand-teal flex flex-col gap-8 relative overflow-hidden rounded-2xl shadow-card">

              <h3 className="text-xl font-bold tracking-tight border-b border-white/10 pb-4">
                Informazioni di Contatto
              </h3>

              <ul className="flex flex-col gap-6 text-sm">
                <li className="flex items-start gap-4">
                  <MapPin size={20} className="text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Sede legale</div>
                    <div className="text-slate-400 mt-1">Via Plava 62<br />10135 Torino (TO) - Italia</div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <Phone size={20} className="text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Telefono</div>
                    <a href="tel:+390110360421" className="text-slate-400 hover:text-brand-teal transition-colors mt-1 block">
                      (+39) 011 036 04 21
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <Mail size={20} className="text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Email</div>
                    <a href="mailto:info@quickconnext.eu" className="text-slate-400 hover:text-brand-teal transition-colors mt-1 block">
                      info@quickconnext.eu
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-8 md:p-10 rounded-2xl shadow-sm">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center py-12 gap-5"
              >
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.15 }}
                  className="w-16 h-16 bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 rounded-full"
                >
                  <CheckCircle className="w-8 h-8" />
                </motion.div>
                <h3
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="text-2xl font-bold text-brand-navy tracking-tight outline-none"
                >
                  Richiesta inviata!
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-md font-sans">
                  Grazie per averci contattato. Il tuo messaggio è stato registrato correttamente.
                  Un nostro ingegnere di Più Sviluppo ti ricontatterà entro 24 ore lavorative.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-brand-teal font-bold text-sm hover:underline mt-4"
                >
                  Invia un altro messaggio
                </button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-brand-navy tracking-tight mb-2">
                  Invia un Messaggio
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="nome" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Nome e Cognome *
                    </label>
                    <div className="relative flex flex-col">
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        required
                        autoComplete="name"
                        value={formData.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass(isValid("nome"), showError("nome"))}
                        placeholder="Mario Rossi"
                        {...errorProps("nome")}
                      />
                      <FieldCheck visible={isValid("nome")} />
                    </div>
                    <FieldError id="nome-error" show={showError("nome")} message={ERROR_MSG.nome} />
                  </div>

                  {/* Azienda */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="azienda" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Azienda / Struttura *
                    </label>
                    <div className="relative flex flex-col">
                      <input
                        type="text"
                        id="azienda"
                        name="azienda"
                        required
                        autoComplete="organization"
                        value={formData.azienda}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass(isValid("azienda"), showError("azienda"))}
                        placeholder="Hotel Belvedere"
                        {...errorProps("azienda")}
                      />
                      <FieldCheck visible={isValid("azienda")} />
                    </div>
                    <FieldError id="azienda-error" show={showError("azienda")} message={ERROR_MSG.azienda} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Indirizzo E-mail *
                    </label>
                    <div className="relative flex flex-col">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass(isValid("email"), showError("email"))}
                        placeholder="mario.rossi@email.com"
                        {...errorProps("email")}
                      />
                      <FieldCheck visible={isValid("email")} />
                    </div>
                    <FieldError id="email-error" show={showError("email")} message={ERROR_MSG.email} />
                  </div>

                  {/* Telefono */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="telefono" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Numero di Telefono *
                    </label>
                    <div className="relative flex flex-col">
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        value={formData.telefono}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass(isValid("telefono"), showError("telefono"))}
                        placeholder="+39 333 1234567"
                        {...errorProps("telefono")}
                      />
                      <FieldCheck visible={isValid("telefono")} />
                    </div>
                    <FieldError id="telefono-error" show={showError("telefono")} message={ERROR_MSG.telefono} />
                  </div>
                </div>

                {/* Settore dropdown */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="settore" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Settore di Interesse *
                  </label>
                  <div className="relative flex flex-col">
                    <select
                      id="settore"
                      name="settore"
                      required
                      value={formData.settore}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={cn(inputClass(isValid("settore"), showError("settore"), "pr-14"), "bg-white")}
                      {...errorProps("settore")}
                    >
                      <option value="">Seleziona un settore...</option>
                      <option value="Hotel">Hotel & Hospitality</option>
                      <option value="Industry">Industria</option>
                      <option value="RSA">RSA / Strutture Sanitarie</option>
                      <option value="Building">Building / Direzionale</option>
                      <option value="Altro">Altro / Consulenza generica</option>
                    </select>
                    {/* right-9: lascia spazio alla freccia nativa della select */}
                    <FieldCheck
                      visible={isValid("settore")}
                      className="right-9 top-1/2 -translate-y-1/2"
                    />
                  </div>
                  <FieldError id="settore-error" show={showError("settore")} message={ERROR_MSG.settore} />
                </div>

                {/* Messaggio */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="messaggio" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Messaggio *
                  </label>
                  <div className="relative flex flex-col">
                    <textarea
                      id="messaggio"
                      name="messaggio"
                      required
                      rows={5}
                      value={formData.messaggio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={cn(inputClass(isValid("messaggio"), showError("messaggio")), "resize-none")}
                      placeholder="Descrivi brevemente la tua struttura e le tue esigenze tecnologiche..."
                      {...errorProps("messaggio")}
                    />
                    <FieldCheck
                      visible={isValid("messaggio")}
                      className="right-3 top-3"
                    />
                  </div>
                  <FieldError id="messaggio-error" show={showError("messaggio")} message={ERROR_MSG.messaggio} />
                </div>

                <motion.button
                  type="submit"
                  disabled={sending}
                  animate={allDone && !sending ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={cn(
                    "cta-button bg-brand-navy text-white hover:bg-brand-teal hover:text-white border border-brand-navy hover:border-brand-teal py-3.5 px-6 mt-2 rounded-full justify-center transition-shadow duration-500",
                    allDone && !sending && "shadow-[0_8px_30px_-8px_rgba(176,90,51,0.55)]",
                    sending && "cursor-wait opacity-80",
                  )}
                >
                  {sending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      Invio in corso…
                    </>
                  ) : (
                    <>
                      Invia Messaggio
                      <AnimatePresence>
                        {allDone && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.4, width: 0 }}
                            animate={{ opacity: 1, scale: 1, width: "auto" }}
                            exit={{ opacity: 0, scale: 0.4, width: 0 }}
                            transition={{ type: "spring", stiffness: 420, damping: 26 }}
                            className="inline-flex overflow-hidden"
                          >
                            <CheckCircle className="size-4" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
