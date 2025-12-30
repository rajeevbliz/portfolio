
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link?: string;
  multiLinks?: {
    label: string;
    url: string;
    type: 'desktop' | 'mobile' | 'web';
  }[];
  comingSoon?: boolean;
}

export interface Service {
  title: string;
  description: string;
  items: string[];
}
