import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import { 
  Lock, Unlock, X, Sun, Moon, Palette, User, Briefcase, 
  Phone, Trash2, Plus, Edit2, Save, RotateCcw, Check, 
  Eye, EyeOff, AlertCircle, Database, Download, Upload, Copy,
  CheckCircle2, HardDrive, ShieldCheck
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const { 
    data, 
    theme, 
    setTheme, 
    isAdminOpen, 
    setIsAdminOpen, 
    isAuthenticated, 
    loginAdmin, 
    logoutAdmin,
    updatePersonalInfo,
    addProject,
    updateProject,
    deleteProject,
    resetToDefault,
    exportDataJSON,
    importDataJSON
  } = usePortfolio();

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'theme' | 'profile' | 'projects' | 'contacts' | 'storage'>('theme');
  const [notification, setNotification] = useState<string | null>(null);
  const [jsonCopied, setJsonCopied] = useState(false);

  // File input ref for backup import
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile form state
  const [profileForm, setProfileForm] = useState({ ...data.personalInfo });

  // Project editing state
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);

  // Keep profileForm in sync with data
  useEffect(() => {
    if (data?.personalInfo) {
      setProfileForm({ ...data.personalInfo });
    }
  }, [data.personalInfo, isAdminOpen]);

  if (!isAdminOpen) return null;

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setPasswordError(false);
      setPasswordInput('');
      showToast('Acesso concedido com sucesso!');
    } else {
      setPasswordError(true);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(profileForm);
    showToast('Informações do perfil atualizadas e salvas com sucesso!');
  };

  const handleStartNewProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      subtitle: '',
      category: 'tecnologia',
      categoryLabel: 'Tecnologia & Sistemas',
      tag: 'Novo Projeto',
      description: '',
      features: [],
      technologies: ['React', 'JavaScript'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      link: ''
    };
    setEditingProject(newProj);
    setIsNewProject(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isNewProject) {
      addProject(editingProject);
      showToast('Novo card adicionado com sucesso!');
    } else {
      updateProject(editingProject);
      showToast('Card atualizado com sucesso!');
    }
    setEditingProject(null);
    setIsNewProject(false);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o projeto "${title}"?`)) {
      deleteProject(id);
      showToast('Card excluído com sucesso.');
    }
  };

  // Export Backup File (.json)
  const handleDownloadBackup = () => {
    try {
      const jsonStr = exportDataJSON();
      const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      link.href = url;
      link.setAttribute('download', `portfolio-mickael-backup-${dateStr}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Arquivo de backup baixado com sucesso!');
    } catch (err) {
      alert('Erro ao gerar arquivo de backup.');
    }
  };

  // Import Backup File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importDataJSON(content);
        if (result.success) {
          showToast('Backup importado com sucesso! Todas as informações foram restauradas.');
        } else {
          alert(`Falha ao importar backup: ${result.error}`);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Copy JSON to clipboard
  const handleCopyJSON = () => {
    const jsonStr = exportDataJSON();
    navigator.clipboard.writeText(jsonStr);
    setJsonCopied(true);
    showToast('JSON copiado para a área de transferência!');
    setTimeout(() => setJsonCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-[#13161c] rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden text-neutral-900 dark:text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#181c24]">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isAuthenticated ? 'bg-brand-lime text-black' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'}`}>
              {isAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                Painel do Administrador
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {isAuthenticated ? 'Edição exclusiva autorizada para Mickael' : 'Acesso protegido por senha'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 text-neutral-700 dark:text-neutral-200 transition-colors"
              >
                Bloquear
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {notification && (
          <div className="bg-emerald-600 text-white text-xs font-medium px-4 py-2.5 text-center animate-pulse flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          {!isAuthenticated ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-10 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 mx-auto flex items-center justify-center">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold">Digite a Senha de Acesso</h4>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  Área restrita exclusivamente para Mickael editar informações, cards e temas.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite a senha..."
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError(false);
                    }}
                    className={`w-full px-4 py-3 pr-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border ${passwordError ? 'border-red-500 focus:ring-red-500' : 'border-neutral-200 dark:border-neutral-700 focus:ring-neutral-900 dark:focus:ring-brand-lime'} text-sm focus:outline-none focus:ring-2`}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {passwordError && (
                  <p className="text-xs text-red-500 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Senha incorreta! Dica: lembre-se do 'M' maiúsculo.
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-neutral-950 dark:bg-brand-lime text-white dark:text-black font-bold text-sm hover:opacity-90 transition-opacity shadow-md"
                >
                  Entrar nas Configurações
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Tabs */
            <div className="space-y-6">
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={() => setActiveTab('theme')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === 'theme'
                      ? 'bg-neutral-950 dark:bg-brand-lime text-white dark:text-black shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  <span>Temas & Cores</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-neutral-950 dark:bg-brand-lime text-white dark:text-black shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Perfil & Hero</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === 'projects'
                      ? 'bg-neutral-950 dark:bg-brand-lime text-white dark:text-black shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Gerenciar Cards ({data.projects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === 'contacts'
                      ? 'bg-neutral-950 dark:bg-brand-lime text-white dark:text-black shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Contatos</span>
                </button>

                <button
                  onClick={() => setActiveTab('storage')}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === 'storage'
                      ? 'bg-neutral-950 dark:bg-brand-lime text-white dark:text-black shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                  }`}
                >
                  <Database className="w-4 h-4 text-emerald-500" />
                  <span>Backup & Dados</span>
                </button>
              </div>

              {/* TAB 1: THEMES */}
              {activeTab === 'theme' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold">Modulação de Temas</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Escolha o visual do seu portfólio. As mudanças são aplicadas instantaneamente e salvas no seu navegador.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Theme Dark (Padrão) */}
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-5 rounded-2xl border text-left transition-all relative ${
                        theme === 'dark'
                          ? 'border-brand-lime bg-neutral-900 ring-2 ring-brand-lime'
                          : 'border-neutral-200 dark:border-neutral-700 bg-neutral-950 text-white hover:border-neutral-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-800 text-neutral-200 flex items-center justify-center">
                          <Moon className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-semibold text-neutral-400 border border-neutral-700 px-2 py-0.5 rounded-full">Padrão</span>
                          {theme === 'dark' && <span className="text-xs font-bold text-black bg-brand-lime px-2 py-0.5 rounded-full">Ativo</span>}
                        </div>
                      </div>
                      <h5 className="font-bold text-sm text-white">Tema Dark (Black)</h5>
                      <p className="text-xs text-neutral-400 mt-1">
                        Estética moderna em preto profundo e carvão, com alto contraste e acentos em verde-limão neon.
                      </p>
                    </button>

                    {/* Theme Light */}
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-5 rounded-2xl border text-left transition-all relative ${
                        theme === 'light'
                          ? 'border-brand-lime bg-lime-50/50 ring-2 ring-brand-lime'
                          : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                          <Sun className="w-4 h-4" />
                        </div>
                        {theme === 'light' && <span className="text-xs font-bold text-black bg-brand-lime px-2 py-0.5 rounded-full">Ativo</span>}
                      </div>
                      <h5 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">Tema Claro</h5>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        Fundo off-white limpo, tipografia contrastante e halo suave.
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: PROFILE & HERO */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold">Informações Pessoais & Topo</h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Edite textos, títulos e a foto de perfil exibida no topo do site.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-lime text-black font-bold text-xs hover:opacity-90 shadow-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Salvar Alterações</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-neutral-600 dark:text-neutral-300">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-neutral-600 dark:text-neutral-300">
                        Status / Disponibilidade (Pílula pulsante)
                      </label>
                      <input
                        type="text"
                        value={profileForm.status}
                        onChange={(e) => setProfileForm({ ...profileForm, status: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-neutral-600 dark:text-neutral-300">
                        Título Principal (ex: Olá, eu sou Mickael)
                      </label>
                      <input
                        type="text"
                        value={profileForm.headline}
                        onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-neutral-600 dark:text-neutral-300">
                        Subtítulo Itálico Editorial
                      </label>
                      <input
                        type="text"
                        value={profileForm.titleItalic}
                        onChange={(e) => setProfileForm({ ...profileForm, titleItalic: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime font-serif italic"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1 text-neutral-600 dark:text-neutral-300">
                        URL da Imagem de Perfil (Fundo transparente)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={profileForm.profileImage}
                          onChange={(e) => setProfileForm({ ...profileForm, profileImage: e.target.value })}
                          className="flex-1 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                        />
                        <button
                          type="button"
                          onClick={() => setProfileForm({ ...profileForm, profileImage: './profile_clean.png' })}
                          className="px-3 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-xs font-medium hover:bg-neutral-300 cursor-pointer"
                        >
                          Restaurar Foto Oficial
                        </button>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1 text-neutral-600 dark:text-neutral-300">
                        Bio Curta (Exibida no topo e pitch de introdução)
                      </label>
                      <textarea
                        rows={2}
                        value={profileForm.shortBio}
                        onChange={(e) => setProfileForm({ ...profileForm, shortBio: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime resize-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1 text-neutral-600 dark:text-neutral-300">
                        Resumo Completo Sobre Mim
                      </label>
                      <textarea
                        rows={4}
                        value={profileForm.fullBio}
                        onChange={(e) => setProfileForm({ ...profileForm, fullBio: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 3: PROJECTS CARDS MANAGER */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  {editingProject ? (
                    /* Project Form Editor */
                    <form onSubmit={handleSaveProject} className="space-y-4 p-4 rounded-2xl bg-neutral-50 dark:bg-[#1a1e27] border border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-base">
                          {isNewProject ? 'Adicionar Novo Card' : `Editar: ${editingProject.title}`}
                        </h5>
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold mb-1">Título do Card *</label>
                          <input
                            type="text"
                            required
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">Subtítulo / Área</label>
                          <input
                            type="text"
                            value={editingProject.subtitle}
                            onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">Categoria</label>
                          <select
                            value={editingProject.category}
                            onChange={(e) => {
                              const val = e.target.value;
                              const labelMap: Record<string, string> = {
                                tecnologia: 'Tecnologia & Sistemas',
                                negocios: 'Operações & Gestão',
                                hardware: 'Hardware & Suporte',
                                midia: 'Mídia Visual & Eventos'
                              };
                              setEditingProject({
                                ...editingProject,
                                category: val,
                                categoryLabel: labelMap[val] || 'Outros'
                              });
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                          >
                            <option value="tecnologia">Tecnologia & Sistemas</option>
                            <option value="negocios">Operações & Gestão</option>
                            <option value="hardware">Hardware & Suporte</option>
                            <option value="midia">Mídia Visual & Eventos</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">Tag Curta</label>
                          <input
                            type="text"
                            value={editingProject.tag}
                            onChange={(e) => setEditingProject({ ...editingProject, tag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold mb-1">URL da Imagem de Capa</label>
                          <input
                            type="text"
                            value={editingProject.image}
                            onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold mb-1">Descrição</label>
                          <textarea
                            rows={3}
                            value={editingProject.description}
                            onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold mb-1">
                            Destaques / Itens Entregues (1 por linha)
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Exemplo:&#10;Captação por Comando de Voz & IA&#10;Sincronização em tempo real de estoque"
                            value={(editingProject.features || []).join('\n')}
                            onChange={(e) => setEditingProject({
                              ...editingProject,
                              features: e.target.value.split('\n').map((line) => line.trim()).filter(Boolean)
                            })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">Link Oficial (Website / Demo)</label>
                          <input
                            type="text"
                            placeholder="https://exemplo.com"
                            value={editingProject.link || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">Link do GitHub (opcional)</label>
                          <input
                            type="text"
                            placeholder="https://github.com/..."
                            value={editingProject.github || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold mb-1">Tecnologias (separadas por vírgula)</label>
                          <input
                            type="text"
                            value={editingProject.technologies.join(', ')}
                            onChange={(e) => setEditingProject({
                              ...editingProject,
                              technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                            })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-xs font-medium cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-lime text-black font-bold text-xs hover:opacity-90 shadow-xs cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Salvar Card</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Project Cards List */
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold">Cards do Portfólio</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            Adicione novos cards, edite detalhes e textos ou exclua itens.
                          </p>
                        </div>
                        <button
                          onClick={handleStartNewProject}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-950 dark:bg-brand-lime text-white dark:text-black font-bold text-xs hover:opacity-90 shadow-xs cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Adicionar Card</span>
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {data.projects.map((proj) => (
                          <div
                            key={proj.id}
                            className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50 dark:bg-[#1a1e27] border border-neutral-200 dark:border-neutral-800 gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={proj.image}
                                alt={proj.title}
                                className={`w-12 h-12 rounded-xl ${proj.id === 'gestoo-app' || proj.id === 'doce-bencao' ? 'object-contain bg-white p-1' : 'object-cover'} shrink-0 border border-neutral-200 dark:border-neutral-700`}
                              />
                              <div className="min-w-0">
                                <h5 className="font-bold text-sm truncate">{proj.title}</h5>
                                <p className="text-xs text-neutral-500 truncate">{proj.subtitle}</p>
                                <span className="inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.2 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                                  {proj.categoryLabel}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={() => {
                                  setEditingProject(proj);
                                  setIsNewProject(false);
                                }}
                                className="p-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                                title="Editar"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id, proj.title)}
                                className="p-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                                title="Excluir"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: CONTACTS & LINKS */}
              {activeTab === 'contacts' && (
                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-bold">Contatos e Redes Oficiais</h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Links diretos para WhatsApp, Instagram, GitHub e E-mail.
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-lime text-black font-bold text-xs hover:opacity-90 shadow-xs cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Salvar Contatos</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">WhatsApp (Número visível)</label>
                      <input
                        type="text"
                        value={profileForm.whatsapp}
                        onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">WhatsApp Link (wa.me/...)</label>
                      <input
                        type="text"
                        value={profileForm.whatsappLink}
                        onChange={(e) => setProfileForm({ ...profileForm, whatsappLink: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">E-mail Oficial</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Instagram (@mickaell754)</label>
                      <input
                        type="text"
                        value={profileForm.instagram}
                        onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">GitHub (BlackBlueDev)</label>
                      <input
                        type="text"
                        value={profileForm.github}
                        onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Portfólio Oficial (Netlify)</label>
                      <input
                        type="text"
                        value={profileForm.portfolioOfficial}
                        onChange={(e) => setProfileForm({ ...profileForm, portfolioOfficial: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm"
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* TAB 5: BACKUP & DATA STORAGE (SOLVES USER'S CONCERN ABOUT DATA LOSS) */}
              {activeTab === 'storage' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold flex items-center gap-2">
                      <Database className="w-5 h-5 text-brand-lime" />
                      <span>Backup & Segurança dos Dados Salvos</span>
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Gerencie o armazenamento, faça download de cópias de segurança (.json) e restaure seus dados em qualquer dispositivo.
                    </p>
                  </div>

                  {/* Status Banner */}
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                        Armazenamento Ativo & Protegido (v2)
                      </h5>
                      <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-0.5 leading-relaxed">
                        Seus dados são salvos localmente no navegador com espelho de contingência na sessão. Para garantir que nunca perca nenhuma alteração ao trocar de computador ou limpar o navegador, baixe um arquivo de backup abaixo.
                      </p>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Action 1: Download Backup */}
                    <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#1a1e27] border border-neutral-200 dark:border-neutral-700 flex flex-col justify-between">
                      <div>
                        <div className="w-9 h-9 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center mb-3">
                          <Download className="w-4 h-4" />
                        </div>
                        <h5 className="font-bold text-sm">Baixar Arquivo de Backup</h5>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          Gera e baixa um arquivo <code>.json</code> completo no seu computador com todas as suas informações pessoais, cards e avaliações.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleDownloadBackup}
                        className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-brand-lime text-white dark:text-black font-bold text-xs hover:opacity-90 shadow-xs cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Baixar Backup (.json)</span>
                      </button>
                    </div>

                    {/* Action 2: Import Backup */}
                    <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#1a1e27] border border-neutral-200 dark:border-neutral-700 flex flex-col justify-between">
                      <div>
                        <div className="w-9 h-9 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center mb-3">
                          <Upload className="w-4 h-4" />
                        </div>
                        <h5 className="font-bold text-sm">Restaurar de um Backup</h5>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          Envie um arquivo <code>.json</code> de backup salvo anteriormente para restaurar todo o seu portfólio neste navegador.
                        </p>
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".json,application/json"
                        onChange={handleFileUpload}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-bold text-xs hover:bg-neutral-300 dark:hover:bg-neutral-600 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Selecionar Arquivo Backup</span>
                      </button>
                    </div>
                  </div>

                  {/* Action 3: Copy JSON to Clipboard */}
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1a1e27] border border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <h5 className="font-bold text-sm">Copiar JSON Completo</h5>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Copia todo o texto dos dados para colar ou salvar onde preferir.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyJSON}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-600 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer shrink-0"
                    >
                      {jsonCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{jsonCopied ? 'Copiado!' : 'Copiar Texto JSON'}</span>
                    </button>
                  </div>

                  {/* Reset to defaults button */}
                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">Restaurar Dados Padrão</p>
                      <p className="text-[11px] text-neutral-500">Recarrega os textos originais limpos do currículo oficial.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Tem certeza que deseja restaurar os dados originais do currículo?')) {
                          resetToDefault();
                          showToast('Dados restaurados para o padrão com sucesso.');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restaurar Padrão</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
