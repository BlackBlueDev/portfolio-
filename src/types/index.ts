export type ThemeMode = 'dark' | 'light';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  tag: string;
  description: string;
  features?: string[];
  technologies: string[];
  image: string;
  link?: string;
  github?: string;
  instagram?: string;
  partner?: {
    name: string;
    role: string;
    link: string;
  };
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    fullName: string;
    age: string;
    location: string;
    status: string;
    headline: string;
    titleItalic: string;
    shortBio: string;
    fullBio: string;
    profileImage: string;
    whatsapp: string;
    whatsappLink: string;
    email: string;
    github: string;
    githubLink: string;
    instagram: string;
    instagramLink: string;
    portfolioOfficial: string;
    city: string;
  };
  strengths: {
    title: string;
    description: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  projects: ProjectItem[];
  reviews: ReviewItem[];
}
