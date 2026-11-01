import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PortfolioData, ProjectItem, ReviewItem, ThemeMode } from '../types';
import { initialPortfolioData } from '../data/initialPortfolioData';

interface PortfolioContextType {
  data: PortfolioData;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updatePersonalInfo: (info: Partial<PortfolioData['personalInfo']>) => void;
  updateData: (newData: PortfolioData) => void;
  addProject: (project: ProjectItem) => void;
  updateProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;
  addReview: (review: { name: string; rating: number; comment: string }) => void;
  deleteReview: (id: string) => void;
  resetToDefault: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => { success: boolean; error?: string };
}

const STORAGE_KEY = 'mickael_portfolio_data_v4';
const STORAGE_KEY_V3 = 'mickael_portfolio_data_v3';
const STORAGE_KEY_V2 = 'mickael_portfolio_data_v2';
const STORAGE_KEY_V1 = 'mickael_portfolio_data_v1';
const THEME_STORAGE_KEY = 'mickael_portfolio_theme';
const AUTH_STORAGE_KEY = 'mickael_admin_auth';
const ADMIN_PASSWORD = 'Mickael754';

// Deep merge & sanitizer helper to prevent data corruption or missing keys
function sanitizeAndMerge(parsed: any, base: PortfolioData): PortfolioData {
  if (!parsed || typeof parsed !== 'object') return base;

  // Personal Info
  const personalInfo = {
    ...base.personalInfo,
    ...(parsed.personalInfo || {})
  };

  // Strip audio / mesa de som mentions if they persist from previous versions
  if (typeof personalInfo.shortBio === 'string') {
    personalInfo.shortBio = personalInfo.shortBio
      .replace(/sonoplastia de eventos ao vivo/gi, 'projeção visual de eventos')
      .replace(/mesas de som/gi, 'projeção de mídia')
      .replace(/sistemas de som/gi, 'sistemas visuais');
  }

  if (typeof personalInfo.fullBio === 'string') {
    personalInfo.fullBio = personalInfo.fullBio
      .replace(/• No Audiovisual: Opero sistemas de som.*?\n/gi, '• Na Mídia & Eventos: Opero sistemas de projeção Data Show e edição de vídeo.\n')
      .replace(/mesas de som/gi, 'projeção de mídia')
      .replace(/sistemas de som/gi, 'sistemas multimídia')
      .replace(/sonorização/gi, 'projeção visual');
  }

  // [5] Strengths - Substitute "Polivalência Real (Digital + Físico)" with appropriate phrasing
  let strengths = Array.isArray(parsed.strengths) && parsed.strengths.length > 0 
    ? parsed.strengths 
    : base.strengths;
  strengths = strengths.map((s: any, idx: number) => {
    let title = s?.title || '';
    let description = s?.description || '';
    if (idx === 0 || /polivalência/i.test(title)) {
      title = 'Versatilidade Técnica & Operacional';
      description = 'Facilidade para atuar com agilidade unindo tecnologia, diagnóstico de hardware e gestão de rotinas produtivas com foco em resultados práticos.';
    }
    return {
      title,
      description
    };
  });

  // Skills
  let skills = Array.isArray(parsed.skills) && parsed.skills.length > 0
    ? parsed.skills
    : base.skills;

  // [1] Remove category 'Desenvolvimento & Cloud'
  skills = skills.filter((cat: any) => !/desenvolvimento & cloud|desenvolvimento web/i.test(cat?.category || ''));

  // Clean remaining categories
  skills = skills.map((cat: any) => {
    let catName = cat?.category || '';
    if (catName.toLowerCase().includes('audiovisual')) {
      catName = 'Mídia Visual & Eventos';
    }
    // Filter out [2] 'Iluminação LED', [3] 'Logística de Eventos', 'Manutenção Predial', and audio terms
    const filteredItems = (Array.isArray(cat?.items) ? cat.items : [])
      .filter((item: string) => !/mesa de som|mesas de som|sonorização|áudio ao vivo|som ao vivo|sonoplastia|iluminação led|logística de eventos|manutenção predial/i.test(item));

    return {
      category: catName,
      items: filteredItems
    };
  }).filter((cat: any) => cat.items.length > 0);

  // Projects
  let projects: ProjectItem[] = Array.isArray(parsed.projects) && parsed.projects.length > 0
    ? parsed.projects
    : base.projects;
  
  // Clean audio projects from storage
  projects = projects.map((p: any) => {
    let title = p?.title || '';
    let category = p?.category || 'tecnologia';
    let categoryLabel = p?.categoryLabel || 'Tecnologia & Sistemas';
    let description = p?.description || '';
    let technologies = Array.isArray(p?.technologies) ? p.technologies : [];
    let features = Array.isArray(p?.features) ? p.features : [];

    // Migrate audiovisual card to clean visual media card
    if (p.id === 'audiovisual-sonorizacao' || category === 'audiovisual' || /sonorização/i.test(title)) {
      return {
        ...p,
        id: 'projecao-multimidia',
        title: 'Projeção Visual, Iluminação & Edição de Vídeo',
        subtitle: 'Operação Técnica Multimídia & Eventos Institucionais',
        category: 'midia',
        categoryLabel: 'Mídia Visual & Eventos',
        tag: 'Multimídia • Mídia Visual',
        description: 'Atuação técnica na projeção visual e edição de vídeos para eventos corporativos e institucionais.',
        features: [
          'Projeção Data Show: Operação de sistemas de projeção, softwares de apresentação e gerenciamento de mídia em tempo real.',
          'Edição de Vídeo: Captação e pós-produção de materiais em vídeo para canais institucionais e redes sociais.'
        ],
        technologies: ['Projeção Data Show', 'Edição de Vídeo', 'Pós-Produção Multimídia'],
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80'
      };
    }

    // Clean features in GestooApp if mentioning áudio
    features = features.map((f: string) => f.replace(/Captação Inteligente por Áudio/gi, 'Captação por Comando de Voz & IA'));

    let image = p?.image || '';
    if (p.id === 'gestoo-app' || /gestooapp|o gestor/i.test(title)) {
      image = './gestor-logo.jpg';
    } else if (p.id === 'doce-bencao' || /doce b[eê]n[cç][aã]o/i.test(title)) {
      image = './doce-bencao.jpg';
    }

    return {
      ...p,
      title,
      category,
      categoryLabel,
      description,
      technologies,
      features,
      image
    };
  });

  // [4] Reviews - Remove fake/sample reviews (rev-1, rev-2, rev-3 or template reviews) to give room for real reviews
  const rawReviews: ReviewItem[] = Array.isArray(parsed.reviews) ? parsed.reviews : [];
  const reviews: ReviewItem[] = rawReviews.filter((r: ReviewItem) => {
    if (!r || !r.id) return false;
    // Strip template reviews
    if (r.id === 'rev-1' || r.id === 'rev-2' || r.id === 'rev-3') return false;
    if (/Gabriel Arantes|Cliente Manutenção|Cliente Doce Bênção/i.test(r.name)) return false;
    return true;
  });

  return {
    personalInfo,
    strengths,
    skills,
    projects,
    reviews
  };
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: Dark is now default
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {
      console.warn('Storage unavailable for theme:', e);
    }
    return 'dark';
  });

  // Portfolio data state with safe migration and deep merge
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      // 1. Check current v4 storage key
      const savedV4 = localStorage.getItem(STORAGE_KEY);
      if (savedV4) {
        const parsed = JSON.parse(savedV4);
        return sanitizeAndMerge(parsed, initialPortfolioData);
      }

      // 2. Check legacy v3 storage key and migrate
      const savedV3 = localStorage.getItem(STORAGE_KEY_V3);
      if (savedV3) {
        const parsed = JSON.parse(savedV3);
        const migrated = sanitizeAndMerge(parsed, initialPortfolioData);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
          localStorage.removeItem(STORAGE_KEY_V3);
        } catch (err) {}
        return migrated;
      }

      // 3. Check legacy v2 storage key and migrate
      const savedV2 = localStorage.getItem(STORAGE_KEY_V2);
      if (savedV2) {
        const parsed = JSON.parse(savedV2);
        const migrated = sanitizeAndMerge(parsed, initialPortfolioData);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
          localStorage.removeItem(STORAGE_KEY_V2);
        } catch (err) {}
        return migrated;
      }

      // 4. Check legacy v1 storage key and migrate
      const savedV1 = localStorage.getItem(STORAGE_KEY_V1);
      if (savedV1) {
        const parsed = JSON.parse(savedV1);
        const migrated = sanitizeAndMerge(parsed, initialPortfolioData);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
          localStorage.removeItem(STORAGE_KEY_V1);
        } catch (err) {}
        return migrated;
      }
    } catch (e) {
      console.error('Error loading portfolio data from localStorage:', e);
    }
    return initialPortfolioData;
  });

  // Admin authentication state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Persist theme
  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn('Could not save theme to localStorage:', e);
    }
  };

  // Sync theme with DOM document element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-navy');
    root.classList.add(`theme-${theme}`);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.setAttribute('data-theme', theme);
  }, [theme]);

  // Persist data helper with redundancy (localStorage + sessionStorage backup)
  const savePortfolioData = useCallback((newData: PortfolioData) => {
    const sanitized = sanitizeAndMerge(newData, initialPortfolioData);
    setData(sanitized);

    try {
      const serialized = JSON.stringify(sanitized);
      localStorage.setItem(STORAGE_KEY, serialized);
      // Secondary in-session mirror for extra safety
      try {
        sessionStorage.setItem(STORAGE_KEY, serialized);
      } catch {}
    } catch (e) {
      console.error('Critical: Failed to save portfolio data to localStorage:', e);
      alert('Aviso: Não foi possível gravar as alterações no armazenamento local do navegador.');
    }
  }, []);

  const loginAdmin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {}
  };

  const updatePersonalInfo = (info: Partial<PortfolioData['personalInfo']>) => {
    const updated: PortfolioData = {
      ...data,
      personalInfo: {
        ...data.personalInfo,
        ...info
      }
    };
    savePortfolioData(updated);
  };

  const updateData = (newData: PortfolioData) => {
    savePortfolioData(newData);
  };

  const addProject = (project: ProjectItem) => {
    const updated: PortfolioData = {
      ...data,
      projects: [project, ...data.projects]
    };
    savePortfolioData(updated);
  };

  const updateProject = (updatedProject: ProjectItem) => {
    const updated: PortfolioData = {
      ...data,
      projects: data.projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    };
    savePortfolioData(updated);
  };

  const deleteProject = (id: string) => {
    const updated: PortfolioData = {
      ...data,
      projects: data.projects.filter((p) => p.id !== id)
    };
    savePortfolioData(updated);
  };

  const addReview = (newReview: { name: string; rating: number; comment: string }) => {
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    const reviewItem: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: newReview.name.trim() || 'Visitante',
      rating: newReview.rating,
      comment: newReview.comment.trim(),
      date: formattedDate
    };
    const currentReviews = Array.isArray(data.reviews) ? data.reviews : [];
    const updated: PortfolioData = {
      ...data,
      reviews: [reviewItem, ...currentReviews]
    };
    savePortfolioData(updated);
  };

  const deleteReview = (id: string) => {
    const currentReviews = Array.isArray(data.reviews) ? data.reviews : [];
    const updated: PortfolioData = {
      ...data,
      reviews: currentReviews.filter((r) => r.id !== id)
    };
    savePortfolioData(updated);
  };

  const resetToDefault = () => {
    savePortfolioData(initialPortfolioData);
  };

  const exportDataJSON = (): string => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJSON = (jsonString: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Arquivo JSON inválido.' };
      }
      const sanitized = sanitizeAndMerge(parsed, initialPortfolioData);
      savePortfolioData(sanitized);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Falha ao processar arquivo JSON.' };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        theme,
        setTheme,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        loginAdmin,
        logoutAdmin,
        updatePersonalInfo,
        updateData,
        addProject,
        updateProject,
        deleteProject,
        addReview,
        deleteReview,
        resetToDefault,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
