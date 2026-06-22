"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function ContattiPage() {
  const [formData, setFormData] = useState({
    nome: "",
    azienda: "",
    email: "",
    telefono: "",
    settore: "",
    messaggio: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    setTimeout(() => {
      setSubmitted(true);
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
                    <div className="font-bold text-white">Sede Operativa</div>
                    <div className="text-slate-400 mt-1">Via del Lavoro, 12<br />24100 Bergamo (BG) - Italia</div>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <Phone size={20} className="text-brand-teal shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Telefono</div>
                    <a href="tel:+39035123456" className="text-slate-400 hover:text-brand-teal transition-colors mt-1 block">
                      +39 035 123 456
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
              
              <div className="bg-white/5 border border-white/10 teal-accent-left pl-4 p-4 text-xs text-slate-400 mt-2 font-sans rounded-xl">
                <strong>Nota di brand:</strong> QuickConnext Building è un prodotto esclusivo sviluppato e supportato da Più Sviluppo S.r.l.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-8 md:p-10 rounded-2xl shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center text-center py-12 gap-5">
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 rounded-full">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-navy tracking-tight">
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
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold text-brand-navy tracking-tight mb-2">
                  Invia un Messaggio
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="nome" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Nome e Cognome *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      className="border border-slate-200 p-3 text-sm rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                      placeholder="Mario Rossi"
                    />
                  </div>

                  {/* Azienda */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="azienda" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Azienda / Struttura *
                    </label>
                    <input
                      type="text"
                      id="azienda"
                      name="azienda"
                      required
                      value={formData.azienda}
                      onChange={handleChange}
                      className="border border-slate-200 p-3 text-sm rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                      placeholder="Hotel Belvedere"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Indirizzo E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="border border-slate-200 p-3 text-sm rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                      placeholder="mario.rossi@email.com"
                    />
                  </div>

                  {/* Telefono */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="telefono" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Numero di Telefono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={handleChange}
                      className="border border-slate-200 p-3 text-sm rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors"
                      placeholder="+39 333 1234567"
                    />
                  </div>
                </div>

                {/* Settore dropdown */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="settore" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Settore di Interesse *
                  </label>
                  <select
                    id="settore"
                    name="settore"
                    required
                    value={formData.settore}
                    onChange={handleChange}
                    className="border border-slate-200 p-3 text-sm rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none bg-white transition-colors"
                  >
                    <option value="">Seleziona un settore...</option>
                    <option value="Hotel">Hotel & Hospitality</option>
                    <option value="Industry">Industria</option>
                    <option value="RSA">RSA / Strutture Sanitarie</option>
                    <option value="Building">Building / Direzionale</option>
                    <option value="Altro">Altro / Consulenza generica</option>
                  </select>
                </div>

                {/* Messaggio */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="messaggio" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Messaggio *
                  </label>
                  <textarea
                    id="messaggio"
                    name="messaggio"
                    required
                    rows={5}
                    value={formData.messaggio}
                    onChange={handleChange}
                    className="border border-slate-200 p-3 text-sm rounded-xl focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-colors resize-none"
                    placeholder="Descrivi brevemente la tua struttura e le tue esigenze tecnologiche..."
                  />
                </div>

                <button
                  type="submit"
                  className="cta-button bg-brand-navy text-white hover:bg-brand-teal hover:text-white border border-brand-navy hover:border-brand-teal py-3.5 px-6 mt-2 rounded-full"
                >
                  Invia Messaggio
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
