import { LucideIcon } from "lucide-react";

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  rating: number;
  quote: string;
}

export interface ProductOption {
  name: string;
  choices: string[];
}

export interface ServiceDetailData {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string; // Icon name string
  images: string[];
  materials: string[];
  techniques: string[];
  priceRange: string;
  testimonials: Testimonial[];
  isOrderable?: boolean;
  basePrice?: number;
  options?: ProductOption[];
  modelUrl?: string;
}
