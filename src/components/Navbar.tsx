import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X, Settings, ArrowUpRight, Sun, Moon, Palette, Trophy, Sparkles } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const { data, theme, setTheme, setIsAdminOpen } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Sobre Mim', href: '#sobre' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Habilidades', href: '#habilidades' },
    { label: 'Contato', href: '#contato' },
  ];

  const cycleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-[#0c0e12]/85 backdrop-blur-md shadow-xs border-b border-neutral-200/80 dark:border-neutral-800/80 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a
            href="#hero"
            className="group flex items-center gap-2 text-neutral-900 dark:text-white transition-opacity"
          >
            <span className="font-serif italic font-bold text-2xl sm:text-3xl tracking-tight">
              Mickael
            </span>
            <span className="w-2 h-2 rounded-full bg-brand-lime self-end mb-1.5 animate-pulse" />
          </a>

          {/* Award / Location Badge */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700/80 text-xs font-medium text-neutral-700 dark:text-neutral-300 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span className="font-semibold">{data.personalInfo.location}</span>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-500 dark:text-neutral-400">24 anos</span>
          </div>

          {/* Desktop Navigation Links & Controls */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-700" />

            {/* Quick Theme Toggle Button */}
            <button
              onClick={cycleTheme}
              className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Alternar para Tema Claro' : 'Alternar para Tema Dark'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-800" />}
            </button>

            {/* Password-protected Settings Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
              title="Configurações (Acesso protegido por senha)"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Contact CTA */}
            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 dark:bg-brand-lime text-white dark:text-black text-xs font-bold hover:opacity-90 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Falar Comigo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Theme button mobile */}
            <button
              onClick={cycleTheme}
              className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 cursor-pointer"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-800" />}
            </button>

            {/* Admin Settings mobile */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              aria-label="Abrir configurações"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-white/95 dark:bg-[#13161c]/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-xl space-y-3">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configurações & Edições (Mickael)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onContactClick();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-950 dark:bg-brand-lime text-white dark:text-black text-sm font-bold shadow-xs"
              >
                <span>Falar no WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
