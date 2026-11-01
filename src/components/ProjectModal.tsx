import React, { useEffect } from 'react';
import { ProjectItem } from '../types';
import { X, ExternalLink, CheckCircle2, UserCheck } from 'lucide-react';
import { GithubIcon, InstagramIcon } from './SocialIcons';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#13161c] rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 no-scrollbar text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image Cover */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-neutral-900">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full ${project.id === 'gestoo-app' || project.id === 'doce-bencao' ? 'object-contain p-4 bg-white' : 'object-cover'} object-center opacity-95`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-all duration-200 hover:rotate-90"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on cover */}
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-lime text-black mb-2 shadow-xs">
              {project.categoryLabel}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
              Visão Geral do Projeto / Serviço
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Features / Capabilities List */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
                O que o projeto / serviço entrega:
              </h3>
              <div className="space-y-2.5">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-brand-lime shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Partner Spotlight if applicable (e.g. Gabriel Arantes no GestooApp) */}
          {project.partner && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    {project.partner.role}
                  </h4>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">
                    {project.partner.name}
                  </p>
                </div>
              </div>

              <a
                href={project.partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 transition-colors shadow-2xs shrink-0"
              >
                <span>Ver Portfólio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Technologies / Tags */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2.5">
              Tecnologias & Habilidades Envolvidas
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 dark:bg-brand-lime text-white dark:text-black text-xs sm:text-sm font-semibold hover:opacity-90 transition-colors shadow-xs"
              >
                <span>Acessar Plataforma Oficial</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Repositório GitHub</span>
              </a>
            )}

            {project.instagram && (
              <a
                href={project.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-pink-500" />
                <span>Instagram Oficial</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
