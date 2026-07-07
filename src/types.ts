export type SpecialtyType = 'zellige' | 'marble' | 'bricklayer' | 'formwork' | 'general_construction';

export interface Artisan {
  id: string;
  name: string;
  phone: string;
  city: string;
  specialty: SpecialtyType;
  rating: number;
  bio: string;
  completedProjectsCount: number;
  yearsOfExperience: number;
  avatar: string;
  skills: string[];
  isAvailable: boolean;
  verified: boolean;
}

export interface JobRequest {
  id: string;
  title: string;
  description: string;
  city: string;
  budget: string;
  specialtyRequired: SpecialtyType | 'all';
  postedBy: string;
  phone: string;
  date: string;
  status: 'open' | 'closed';
}

export interface ProjectShowcase {
  id: string;
  title: string;
  artisanName: string;
  artisanId?: string;
  imageUrl: string;
  category: 'zellige' | 'marble' | 'construction';
  city: string;
  description: string;
  likes: number;
}

export interface CalculatorState {
  type: 'zellige' | 'brick' | 'marble';
  length: number; // in meters
  width: number; // in meters
  brickType?: 'type7' | 'type12'; // 7 holes or 12 holes brick
  thickness?: number; // for marble (in cm)
}
