import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Award, Zap, Code, Smartphone, Check, Cpu, Mic, Layers, ShieldCheck } from 'lucide-react';

export const MetricsBento: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="habilidades" className="py-16 sm:py-24 bg-white/50 dark:bg-[#0c0e12]/50 border-t border-neutral-200/70 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="font-serif italic text-sm text-neutral-400 dark:text-neutral-500 mb-2">
            / Habilidades & Competências
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Matriz de Competências Práticas
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
            Habilidades agrupadas por especialidade desenvolvidas no mercado e em projetos próprios.
          </p>
        </div>

        {/* Skills Categories Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {data.skills.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#13161c] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-brand-lime mb-3.5">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/50 dark:border-neutral-700/60"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bento Grid 3 Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: GestooApp Highlight */}
          <div className="bg-neutral-900 dark:bg-[#14171e] text-white p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group border border-neutral-800">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-brand-lime mb-6">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-2">Automação por Voz & SaaS</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Co-criação da plataforma GestooApp com captação inteligente de lançamentos financeiros via comando de voz e sincronização automática de estoque.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-brand-lime">
              <span>gestooapp.com</span>
              <span>•</span>
              <span>Arquitetura SaaS</span>
            </div>
          </div>

          {/* Card 2: Doce Bênção */}
          <div className="bg-gradient-to-br from-brand-lime/15 via-white dark:via-[#13161c] to-white dark:to-[#13161c] p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-brand-lime flex items-center justify-center text-black mb-6 shadow-xs">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Gestão Comercial & CMV</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Fundador da Doce Bênção, gerenciando engenharia de receitas, precificação para atacado e catálogo digital com captação de pedidos.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5">
              <a
                href="https://docebencao.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-brand-lime transition-colors"
              >
                docebencao.com.br
              </a>
              <a
                href="https://instagram.com/docebencao.oficial"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-brand-lime transition-colors"
              >
                @docebencao.oficial
              </a>
            </div>
          </div>

          {/* Card 3: Hardware & Performance */}
          <div className="bg-white dark:bg-[#13161c] p-6 sm:p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-neutral-100 mb-6">
                <Cpu className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Hardware & Diagnóstico</h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Montagem de máquinas gamer e estações de trabalho do zero, cable management de precisão, controle térmico e formatações limpas Windows 10/11.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-brand-lime">
                <ShieldCheck className="w-4 h-4" />
                Manutenção Preventiva
              </span>
              <span className="font-mono text-neutral-400">AMD / Intel / RTX</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
