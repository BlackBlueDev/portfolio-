import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, MessageSquare, Send, Check, Copy, Sparkles, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'saas',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setFormData({ name: '', email: '', service: 'saas', message: '' });
      setFormSubmitted(false);
    }, 6000);
  };

  return (
    <section id="contato" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-lime/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info & Message */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="font-serif italic text-sm text-neutral-400 dark:text-neutral-500 mb-2">
                / Fale Conosco
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                Vamos conversar sobre o seu projeto?
              </h2>
              <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Estou aberto para oportunidades profissionais (presencial, híbrido ou remoto em Caruaru/PE e todo o Brasil), consultoria de sistemas web, manutenção de computadores ou mídia visual para eventos.
              </p>
            </div>

            {/* Quick Email Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#13161c] border border-neutral-200/90 dark:border-neutral-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Email Direto
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-brand-lime">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Resposta Rápida
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/70 dark:border-neutral-700/60">
                <span className="font-mono text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 truncate select-all">
                  {personalInfo.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 transition-colors shadow-2xs shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-brand-lime" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp link */}
              <a
                href={personalInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-neutral-950 dark:bg-brand-lime hover:opacity-90 text-white dark:text-black text-xs sm:text-sm font-bold transition-all shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-brand-lime dark:text-black" />
                <span>Conversar no WhatsApp ({personalInfo.whatsapp})</span>
                <ArrowUpRight className="w-4 h-4 opacity-70" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#13161c] p-6 sm:p-10 rounded-3xl border border-neutral-200/90 dark:border-neutral-800 shadow-2xs relative">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-lime/30 text-neutral-900 mx-auto flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-neutral-950 dark:text-brand-lime" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Mensagem Enviada!</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
                  Obrigado pelo contato! Retornarei o mais breve possível para alinharmos os detalhes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João Ferreira"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                      Seu Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="joao@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                    Tipo de Necessidade / Serviço
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all cursor-pointer"
                  >
                    <option value="saas">Desenvolvimento Web / SaaS / Automação IA</option>
                    <option value="hardware">Manutenção / Montagem de Computador</option>
                    <option value="midia">Projeção Visual, Iluminação & Edição de Vídeo</option>
                    <option value="gestao">Gestão Operacional, Custos ou Vendas</option>
                    <option value="recrutamento">Oportunidade de Contratação (Emprego)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                    Mensagem ou Detalhes *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Descreva a oportunidade, projeto ou dúvida..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-lime transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-neutral-950 dark:bg-brand-lime text-white dark:text-black text-sm font-bold hover:opacity-90 transition-all shadow-md hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Enviar Mensagem</span>
                  <Send className="w-4 h-4 text-brand-lime dark:text-black transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
