import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { MessageSquare, Mail, Copy, Check, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contato" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-brand-lime/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="font-serif italic text-sm text-neutral-400 dark:text-neutral-500 mb-2">
            / Contato Direto
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
            Vamos conversar sobre o seu projeto?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Estou disponível para novas oportunidades profissionais (presencial, híbrido ou remoto em Caruaru/PE e todo o Brasil), consultoria de sistemas web, manutenção de computadores ou mídia visual para eventos.
          </p>
        </div>

        {/* 2 Direct Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Card 1: WhatsApp Direto */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#13161c] border border-neutral-200/90 dark:border-neutral-800 shadow-2xs flex flex-col justify-between hover:border-brand-lime/50 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-brand-lime flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-brand-lime border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-1">
                WhatsApp Oficial
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                Canal mais rápido para alinhamento direto de projetos e contratações.
              </p>
              <p className="font-mono text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {personalInfo.whatsapp}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <a
                href={personalInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-neutral-950 dark:bg-brand-lime text-white dark:text-black text-xs sm:text-sm font-bold hover:opacity-90 transition-all shadow-md group-hover:scale-[1.01]"
              >
                <span>Conversar no WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: E-mail Direto */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#13161c] border border-neutral-200/90 dark:border-neutral-800 shadow-2xs flex flex-col justify-between hover:border-brand-lime/50 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-sky-400 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-sky-400 border border-blue-500/20">
                  E-mail Oficial
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-1">
                Envio de Propostas
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                Ideal para envio de escopos formais, convites e propostas comerciais.
              </p>
              <p className="font-mono text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate select-all">
                {personalInfo.email}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex gap-2">
              <button
                onClick={handleCopyEmail}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-bold transition-all border border-neutral-200 dark:border-neutral-700 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>E-mail Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar E-mail</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
