import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Laptop, TrendingUp, Radio, Wrench, ShieldCheck, Sparkles } from 'lucide-react';

export const Philosophy: React.FC = () => {
  const { data } = usePortfolio();

  const pillars = [
    {
      title: 'Tecnologia & Sistemas',
      desc: 'Desenvolvimento de SaaS web modernos com automação por voz/IA, diagnóstico e montagem completa de computadores.',
      icon: Laptop,
      badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900',
      dot: 'bg-blue-500'
    },
    {
      title: 'Negócios & Gestão',
      desc: 'Gestão de custos (CMV), precificação para atacado e varejo, controle de caixa/estoque e atendimento ao cliente.',
      icon: TrendingUp,
      badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900',
      dot: 'bg-emerald-500'
    },
    {
      title: 'Mídia Visual & Eventos',
      desc: 'Operação de projeção Data Show, iluminação cênica de palco e edição de vídeos para eventos corporativos e institucionais.',
      icon: Radio,
      badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900',
      dot: 'bg-purple-500'
    },
    {
      title: 'Operações & Logística',
      desc: 'Logística de eventos, manutenção predial preventiva, gestão de fluxo produtivo artesanal e organização de estoque.',
      icon: Wrench,
      badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900',
      dot: 'bg-amber-500'
    }
  ];

  return (
    <section id="sobre" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle greeting indicator */}
        <div className="text-center mb-6">
          <span className="font-serif italic text-2xl sm:text-3xl text-neutral-400 dark:text-neutral-500">
            Sobre Mim
          </span>
        </div>

        {/* Central Manifesto Statement */}
        <div className="relative text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white leading-[1.3] sm:leading-[1.25]">
            Perfil prático <span className="font-serif italic font-semibold">"mão na massa"</span>, unindo{' '}
            <span className="underline decoration-brand-lime decoration-4 underline-offset-4">tecnologia</span>,{' '}
            gestão de negócios e operações físicas.
          </h2>

          <p className="mt-6 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Atuação versátil e resolutiva: da programação de plataformas digitais ao suporte de hardware, projeção de grandes eventos e modelagem financeira de empresas.
          </p>
        </div>

        {/* 4 Multi-Disciplinary Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {pillars.map((pil, idx) => {
            const Icon = pil.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-[#13161c] border border-neutral-200/80 dark:border-neutral-800 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-800 dark:text-neutral-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${pil.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${pil.dot}`} />
                      {pil.title}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                    {pil.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
