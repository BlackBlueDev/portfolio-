import React from 'react';

export const TechMarquee: React.FC = () => {
  const partnersLogos = [
    { name: 'O GestooApp', icon: '✦' },
    { name: 'Doce Bênção', icon: '◈' },
    { name: 'BlackBlueDev', icon: '◒' },
    { name: 'Cloudflare', icon: '❖' },
    { name: 'Hardware Pro', icon: '◇' },
    { name: 'Mídia & Eventos', icon: '▲' },
  ];

  const techLogos = [
    { name: 'React', badge: '⚛️ React 19' },
    { name: 'Tailwind CSS', badge: '🎨 Tailwind' },
    { name: 'TypeScript', badge: '🔷 TypeScript' },
    { name: 'JavaScript', badge: '🟨 JavaScript' },
    { name: 'Node.js', badge: '🟢 Node.js' },
    { name: 'Automação IA', badge: '🎙️ Voz & IA' },
    { name: 'Windows 11 Hardware', badge: '💻 Hardware' },
    { name: 'Mobile First', badge: '📱 Mobile-First' },
  ];

  return (
    <div className="border-y border-neutral-200/70 dark:border-neutral-800 bg-white/60 dark:bg-[#0c0e12]/60 backdrop-blur-xs py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle label */}
        <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
          Ecossistema de Tecnologia & Negócios Práticos
        </p>

        {/* Brand Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 opacity-75 hover:opacity-100 transition-opacity">
          {partnersLogos.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors select-none"
            >
              <span className="text-sm font-mono text-neutral-400">{brand.icon}</span>
              <span className="text-sm sm:text-base font-semibold tracking-tight">{brand.name}</span>
            </div>
          ))}
        </div>

        {/* Tech Badges Row */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {techLogos.map((tech, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700"
            >
              {tech.badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
