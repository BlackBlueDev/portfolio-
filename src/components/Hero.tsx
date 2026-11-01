import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  return (
    <section id="hero" className="relative pt-24 sm:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background ambient subtle glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] lg:w-[720px] h-[340px] sm:h-[580px] lg:h-[720px] hero-glow rounded-full pointer-events-none -z-10 blur-2xl opacity-90 animate-pulse-subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Title Area */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08]">
            {personalInfo.headline}
            <span className="block font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl mt-1 text-neutral-900 dark:text-neutral-100 drop-shadow-xs">
              {personalInfo.titleItalic}
            </span>
          </h1>
        </div>

        {/* Central Visual Composition */}
        <div className="relative max-w-5xl mx-auto min-h-[460px] sm:min-h-[540px] lg:min-h-[620px] flex flex-col items-center justify-between">
          
          {/* Top-Left Status Pill (Mirrors Reference) */}
          <div className="w-full lg:absolute lg:top-8 lg:left-0 flex justify-center lg:justify-start z-20 mb-6 lg:mb-0">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 dark:bg-[#13161c]/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-700/80 shadow-xs hover:shadow transition-shadow">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-lime"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {personalInfo.status}
              </span>
            </div>
          </div>

          {/* Center Cutout Profile Photo with Lime Green Halo */}
          <div className="relative w-full flex justify-center items-end my-2 lg:my-0">
            {/* Direct intense lime green aura centered behind portrait */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[380px] lg:w-[460px] h-[260px] sm:h-[380px] lg:h-[460px] bg-[#bdf800] rounded-full filter blur-[45px] sm:blur-[60px] opacity-90 z-0 pointer-events-none" />

            <div className="relative z-10 w-[270px] sm:w-[360px] lg:w-[440px] aspect-[4/5] flex items-end justify-center">
              <img
                src={personalInfo.profileImage || '/profile_clean.png'}
                alt={personalInfo.fullName}
                className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.22)] select-none pointer-events-none transition-transform duration-500 hover:scale-[1.02]"
                loading="eager"
              />
            </div>
          </div>

          {/* Bottom Floating Information Row (Desktop Split, Mobile Stack) */}
          <div className="w-full mt-6 lg:mt-0 flex flex-col lg:flex-row items-center justify-between gap-6 z-20">
            
            {/* Left: Location & Multi-disciplinary Badges */}
            <div className="flex items-center gap-3.5 bg-white/90 dark:bg-[#13161c]/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-700/80 shadow-xs max-w-sm">
              <div className="w-10 h-10 rounded-xl bg-brand-lime/20 text-black dark:text-brand-lime flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-neutral-900 dark:text-brand-lime" />
              </div>
              <div className="text-xs text-neutral-600 dark:text-neutral-300 font-medium leading-tight">
                <span className="font-bold text-neutral-900 dark:text-white block mb-0.5">
                  {personalInfo.city} — Brasil
                </span>
                Atuação em Tecnologia · Negócios · Mídia Visual · Operações
              </div>
            </div>

            {/* Right: Short Bio & CTA Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-end gap-3 text-center lg:text-right max-w-md">
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed max-w-xs sm:max-w-sm">
                {personalInfo.shortBio}
              </p>

              <button
                onClick={onContactClick}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-neutral-950 dark:bg-brand-lime text-white dark:text-black text-xs sm:text-sm font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Entrar em Contato</span>
                <span className="w-6 h-6 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center group-hover:bg-brand-lime group-hover:text-black transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
