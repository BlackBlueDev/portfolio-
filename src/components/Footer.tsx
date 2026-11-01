import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, ExternalLink, MessageCircle } from 'lucide-react';
import { GithubIcon, InstagramIcon } from './SocialIcons';
import { ReviewSection } from './ReviewSection';

export const Footer: React.FC = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#0c0e12] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-neutral-100 dark:border-neutral-800">
          {/* Brand & Area Info */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif italic font-bold text-2xl tracking-tight text-neutral-900 dark:text-white">
                Mickael de Lima Silva
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-lime self-end mb-1" />
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Tecnologia · Negócios · Mídia Visual · Operações
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
            </a>
            <a
              href={personalInfo.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="GitHub"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Instagram"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4 text-pink-500" />
            </a>
            <a
              href={personalInfo.portfolioOfficial}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Portfólio Netlify"
              title="Portfólio Netlify Oficial"
            >
              <ExternalLink className="w-4 h-4 text-blue-500" />
            </a>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors ml-2"
            >
              <span>Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Small Review / Feedback Area requested by user */}
        <ReviewSection />

        {/* Bottom copyright row */}
        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 dark:text-neutral-500">
          <p>
            © 2026 Mickael de Lima Silva — Todos os direitos reservados.
          </p>
          <p>
            Desenvolvido por <strong className="text-neutral-700 dark:text-neutral-300 font-semibold">BlackBlueDev</strong>
          </p>
        </div>

      </div>
    </footer>
  );
};
