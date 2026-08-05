import { create } from 'zustand';

export interface Project {
  id: string;
  title: string;
  category: string;
  status: 'active' | 'processing' | 'completed' | 'failed' | 'draft';
  progress: number;
  updatedAt: string;
}

interface AppState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  projects: Project[];
  addProject: (title: string, category: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  isModalOpen: false,
  setModalOpen: (open) => set({ isModalOpen: open }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  projects: [
    {
      id: 'proj-1',
      title: 'Cyberpunk Neon Reel',
      category: 'Sci-Fi AI Video',
      status: 'completed',
      progress: 100,
      updatedAt: '10 mins ago',
    },
    {
      id: 'proj-2',
      title: 'Minimalist Product Promo',
      category: 'E-commerce',
      status: 'processing',
      progress: 68,
      updatedAt: '2 mins ago',
    },
    {
      id: 'proj-3',
      title: 'Kinetic Typography Intro',
      category: 'Motion Design',
      status: 'draft',
      progress: 20,
      updatedAt: '1 hour ago',
    },
  ],
  addProject: (title, category) =>
    set((state) => ({
      projects: [
        {
          id: `proj-${Date.now()}`,
          title: title || 'Untitled Kinetic Reel',
          category: category || 'AI Creative',
          status: 'active',
          progress: 0,
          updatedAt: 'Just now',
        },
        ...state.projects,
      ],
    })),
}));
