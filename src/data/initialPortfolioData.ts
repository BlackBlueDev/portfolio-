import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  personalInfo: {
    name: 'Mickael de Lima Silva',
    fullName: 'Mickael de Lima Silva',
    age: '24 anos',
    location: 'Caruaru, PE — Brasil',
    city: 'Caruaru / PE',
    status: 'Disponível para novas oportunidades',
    headline: 'Olá, eu sou Mickael',
    titleItalic: 'Desenvolvedor & Gestor',
    shortBio: 'Profissional multidisciplinar com atuação prática em desenvolvimento de sistemas web (SaaS), manutenção de computadores, projeção visual de eventos e gestão operacional e financeira de negócios.',
    fullBio: 'Olá, sou Mickael de Lima Silva. Sou um profissional multidisciplinar com perfil prático ("mão na massa"), focado em unir tecnologia, gestão de negócios e operações físicas para resolver problemas reais.\n\n• Na Tecnologia & Hardware: Desenvolvo aplicações web modernas (SaaS), sites responsivos, automações com IA/voz e realizo diagnóstico, montagem e manutenção completa de computadores.\n• Na Mídia & Eventos: Opero sistemas de projeção Data Show, dinâmica de apresentação e edição de vídeo institucional e promocional.\n• Nos Negócios e Operações: Tenho experiência real em gestão de custos (CMV), precificação para atacado e varejo, controle de caixa/estoque, logística interna e atendimento ao cliente.',
    profileImage: './profile_clean.png',
    whatsapp: '(81) 99124-5328',
    whatsappLink: 'https://wa.me/5581991245328',
    email: 'mickaeldlima@hotmail.com',
    github: 'BlackBlueDev',
    githubLink: 'https://github.com/BlackBlueDev',
    instagram: '@mickaell754',
    instagramLink: 'https://www.instagram.com/mickaell754/',
    portfolioOfficial: 'https://meuportfolioofc.netlify.app/'
  },
  strengths: [
    {
      title: 'Versatilidade Técnica & Operacional',
      description: 'Facilidade para atuar com agilidade unindo tecnologia, diagnóstico de hardware e gestão de rotinas produtivas com foco em resultados práticos.'
    },
    {
      title: 'Visão de Negócio & Economia',
      description: 'Foco em resolver problemas de forma rápida e inteligente com os recursos disponíveis, modelagem de custos (CMV) e redução de desperdícios.'
    },
    {
      title: 'Comprometimento & Comunicação',
      description: 'Acostumado tanto com rotinas operacionais pesadas e precisão técnica quanto com o trato direto e empático com clientes no balcão e nas vendas.'
    }
  ],
  skills: [
    {
      category: 'Hardware & Suporte',
      items: ['Manutenção de Computadores', 'Montagem de PCs', 'Diagnóstico de Hardware', 'Formatação Windows 10/11', 'Pacote Office']
    },
    {
      category: 'Negócios & Financeiro',
      items: ['Gestão de Custos (CMV)', 'Precificação Atacado/Varejo', 'Controle de Estoque', 'Operador de Caixa', 'Vendas']
    },
    {
      category: 'Mídia Visual & Eventos',
      items: ['Projeção Data Show', 'Edição de Vídeo', 'Pós-Produção Multimídia', 'Softwares de Mídia']
    },
    {
      category: 'Operações & Logística',
      items: ['Controle de Produção', 'Atendimento ao Público', 'Organização de Estoque']
    }
  ],
  projects: [
    {
      id: 'gestoo-app',
      title: 'O GestooApp',
      subtitle: 'SaaS de Gestão Financeira por Comando de Voz',
      category: 'tecnologia',
      categoryLabel: 'Tecnologia & SaaS',
      tag: 'SaaS • Automação por Voz',
      description: 'Plataforma SaaS moderna desenvolvida para descomplicar a rotina financeira de pequenos empreendedores (autônomos no CPF, MEI e Simples Nacional).',
      features: [
        'Captação por Comando de Voz & IA: O empreendedor fala o que vendeu ou gastou, e a plataforma interpreta e lança automaticamente.',
        'Caixa e Estoque Sincronizados: Atualiza o fluxo de caixa na hora e abate/adiciona itens do estoque em tempo real.',
        'Arquitetura SaaS Moderna: Interface rápida para celular e computador com controle de assinaturas recorrentes.'
      ],
      technologies: ['SaaS', 'JavaScript', 'Node.js', 'HTML5', 'CSS3', 'Automação por Voz', 'Gestão Financeira'],
      image: './gestor-logo.jpg',
      link: 'https://gestooapp.com',
      partner: {
        name: 'Gabriel Arantes',
        role: 'Sócio & Co-Desenvolvedor',
        link: 'https://arantes.ga/'
      }
    },
    {
      id: 'doce-bencao',
      title: 'Doce Bênção',
      subtitle: 'Doceria Gourmet & Gestão Comercial',
      category: 'negocios',
      categoryLabel: 'Operações & Gestão',
      tag: 'Negócios • Produção Artesanal',
      description: 'Marca própria de sobremesas artesanais (Dudu Tradicional e Gourmet, pudins e sobremesas no pote) para distribuição em atacado e venda no varejo.',
      features: [
        'Padronização e Produção: Desenvolvimento técnico com mais de 10 linhas de receitas artesanais padronizadas.',
        'Presença Digital e Vendas: Plataforma web para catálogo online e captação de pedidos diretos.',
        'Engenharia de Custos: Modelagem de CMV, precificação para revendedores e controle rigoroso de insumos.'
      ],
      technologies: ['Gestão de Negócios', 'Precificação', 'Produção Artesanal', 'Web Design', 'Marketing Digital'],
      image: './doce-bencao.jpg',
      link: 'https://docebencao.com.br',
      instagram: 'https://instagram.com/docebencao.oficial'
    },
    {
      id: 'manutencao-computadores',
      title: 'Montagem e Manutenção de Computadores',
      subtitle: 'Diagnóstico Técnico & Otimização de Hardware',
      category: 'hardware',
      categoryLabel: 'Hardware & Suporte',
      tag: 'Hardware • Assistência Técnica',
      description: 'Serviço técnico especializado no reparo, montagem e otimização de computadores desktops para uso doméstico, escritório e máquinas gamers de alta performance.',
      features: [
        'Diagnóstico e Reparo: Identificação precisa de falhas em fontes, memórias RAM, SSDs, placas-mãe e placas de vídeo.',
        'Montagem Personalizada: Montagem do zero com cable management profissional e troca preventiva de pasta térmica.',
        'Sistemas & Softwares: Formatação Windows 10/11 limpa, backup seguro, drivers homologados e Pacote Office.'
      ],
      technologies: ['Hardware', 'Montagem de PCs', 'Diagnóstico Técnico', 'Windows 11', 'AMD Ryzen / RTX', 'Pacote Office'],
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'projecao-multimidia',
      title: 'Projeção Visual, Iluminação & Edição de Vídeo',
      subtitle: 'Operação Técnica Multimídia & Eventos Institucionais',
      category: 'midia',
      categoryLabel: 'Mídia Visual & Eventos',
      tag: 'Multimídia • Mídia Visual',
      description: 'Atuação técnica na projeção visual, iluminação cênica de palco e edição de vídeos para eventos corporativos e institucionais.',
      features: [
        'Projeção Data Show: Operação de sistemas de projeção, softwares de apresentação e gerenciamento de mídia em tempo real.',
        'Iluminação Cênica: Configuração e controle de refletores LED e dinamismo de palco.',
        'Edição de Vídeo: Captação e pós-produção de materiais em vídeo para canais institucionais e redes sociais.'
      ],
      technologies: ['Projeção Data Show', 'Iluminação LED', 'Edição de Vídeo', 'Pós-Produção Multimídia', 'Softwares de Mídia'],
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80'
    }
  ],
  reviews: []
};
