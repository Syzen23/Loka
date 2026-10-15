import { z } from 'zod';

export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export type WebsiteStatus = 'draft' | 'published';

export interface BusinessInfo {
  name: string;
  category: string;
  description: string;
  location: string;
  whatsapp: string;
  instagram?: string;
  services?: string;
  targetCustomer?: string;
  preferredStyle?: 'modern' | 'minimalist' | 'warm' | 'bold' | 'elegant';
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  font: 'sans' | 'serif' | 'display';
  accentColor?: string;
  backgroundColor?: string;
}

export type SectionType =
  | 'navbar'
  | 'hero'
  | 'about'
  | 'services'
  | 'features'
  | 'gallery'
  | 'testimonials'
  | 'cta'
  | 'contact'
  | 'footer';

export interface NavbarContent {
  brandName: string;
  logoUrl?: string;
  links: Array<{ label: string; href: string }>;
  ctaText?: string;
  ctaUrl?: string;
  phone?: string;
}

export interface HeroContent {
  badge?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  imageUrl?: string;
  alignment?: 'left' | 'center';
}

export interface AboutContent {
  badge?: string;
  title: string;
  story: string;
  imageUrl?: string;
  stats?: Array<{ label: string; value: string }>;
  highlights?: string[];
}

export interface ServiceItem {
  id?: string;
  title: string;
  description: string;
  price?: string;
  icon?: string;
  imageUrl?: string;
}

export interface ServicesContent {
  badge?: string;
  title: string;
  subtitle?: string;
  items: ServiceItem[];
}

export interface FeatureItem {
  id?: string;
  title: string;
  description: string;
  icon?: string;
}

export interface FeaturesContent {
  badge?: string;
  title: string;
  subtitle?: string;
  items: FeatureItem[];
}

export interface GalleryItem {
  id?: string;
  imageUrl: string;
  caption?: string;
}

export interface GalleryContent {
  badge?: string;
  title: string;
  subtitle?: string;
  images: GalleryItem[];
}

export interface TestimonialItem {
  id?: string;
  name: string;
  role?: string;
  comment: string;
  rating: number;
  avatarUrl?: string;
}

export interface TestimonialsContent {
  badge?: string;
  title: string;
  subtitle?: string;
  items: TestimonialItem[];
}

export interface CtaContent {
  badge?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  note?: string;
}

export interface ContactContent {
  badge?: string;
  title: string;
  subtitle?: string;
  address: string;
  phone: string;
  whatsapp: string;
  email?: string;
  operatingHours?: string;
  instagram?: string;
}

export interface FooterContent {
  tagline?: string;
  copyrightText: string;
  socialLinks?: Array<{ platform: 'whatsapp' | 'instagram' | 'facebook' | 'maps'; url: string }>;
  quickLinks?: Array<{ label: string; href: string }>;
}

export type SectionContent =
  | NavbarContent
  | HeroContent
  | AboutContent
  | ServicesContent
  | FeaturesContent
  | GalleryContent
  | TestimonialsContent
  | CtaContent
  | ContactContent
  | FooterContent;

export interface Section {
  id: string;
  websiteId: string;
  type: SectionType;
  position: number;
  content: SectionContent;
  createdAt?: string;
  updatedAt?: string;
}

export interface Website {
  id: string;
  userId: string;
  name: string;
  slug: string;
  status: WebsiteStatus;
  template?: string;
  businessInfo: BusinessInfo;
  theme: ThemeConfig;
  createdAt: string;
  updatedAt: string;
  sections?: Section[];
}

// Zod schemas for validation
export const BusinessInfoSchema = z.object({
  name: z.string().min(2, 'Nama bisnis minimal 2 karakter'),
  category: z.string().min(2, 'Kategori bisnis wajib diisi'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  location: z.string().min(2, 'Lokasi wajib diisi'),
  whatsapp: z.string().min(8, 'Nomor WhatsApp wajib diisi'),
  instagram: z.string().optional(),
  services: z.string().optional(),
  targetCustomer: z.string().optional(),
  preferredStyle: z.enum(['modern', 'minimalist', 'warm', 'bold', 'elegant']).default('modern'),
});

export const ThemeConfigSchema = z.object({
  primaryColor: z.string().default('#2563eb'),
  secondaryColor: z.string().default('#0f172a'),
  font: z.enum(['sans', 'serif', 'display']).default('sans'),
  accentColor: z.string().optional(),
  backgroundColor: z.string().optional(),
});

export const SectionSchema = z.object({
  type: z.enum([
    'navbar',
    'hero',
    'about',
    'services',
    'features',
    'gallery',
    'testimonials',
    'cta',
    'contact',
    'footer',
  ]),
  content: z.record(z.string(), z.any()),
});

export const AiWebsiteResponseSchema = z.object({
  business: z.object({
    name: z.string(),
    category: z.string(),
    tagline: z.string().optional(),
    location: z.string(),
  }),
  theme: ThemeConfigSchema,
  sections: z.array(
    z.object({
      type: z.enum([
        'navbar',
        'hero',
        'about',
        'services',
        'features',
        'gallery',
        'testimonials',
        'cta',
        'contact',
        'footer',
      ]),
      content: z.record(z.string(), z.any()),
    })
  ),
});
