import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, Plus, ExternalLink } from 'lucide-react';

export const SelectedWorks: React.FC = () => {
  const { data, setIsAdminOpen } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'Todos os Cards' },
    { id: 'tecnologia', label: 'Tecnologia & Sistemas' },
    { id: 'negocios', label: 'Operações & Gestão' },
    { id: 'hardware', label: 'Hardware & Suporte' },
    { id: 'midia', label: 'Mídia Visual & Eventos' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? data.projects
    : data.projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projetos" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="font-serif italic text-sm text-neutral-400 dark:text-neutral-500 mb-2">
              / Portfólio & Atuação
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Cards de Projetos & Serviços
            </h2>
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed">
            Plataformas SaaS inovadoras, serviços especializados de hardware, produções multimídia e gestão operacional prática.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === tab.id
                  ? 'bg-neutral-950 dark:bg-brand-lime text-white dark:text-black shadow-xs'
                  : 'bg-white dark:bg-[#13161c] text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white border border-neutral-200/80 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group cursor-pointer bg-white dark:bg-[#13161c] rounded-3xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full ${project.id === 'gestoo-app' || project.id === 'doce-bencao' ? 'object-contain p-3 bg-white' : 'object-cover'} object-center group-hover:scale-105 transition-transform duration-500`}
                  loading="lazy"
                />
                
                {/* Overlay with CTA */}
                <div className="absolute inset-0 bg-neutral-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-white dark:bg-brand-lime text-neutral-950 dark:text-black text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    Ver Detalhes do Card
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-neutral-800 dark:text-neutral-200 shadow-xs">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Tag Badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-black/60 backdrop-blur-md text-white">
                    {project.tag}
                  </span>
                </div>
              </div>

              {/* Card Information */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white group-hover:text-black dark:group-hover:text-brand-lime transition-colors">
                      {project.title}
                    </h3>
                    <div className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 group-hover:bg-brand-lime group-hover:text-black transition-colors shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                    {project.subtitle}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-medium text-neutral-400">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
