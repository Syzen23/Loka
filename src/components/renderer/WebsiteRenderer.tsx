import React from 'react';
import { Section, ThemeConfig } from '../../types/schema';
import { NavbarSection } from '../sections/NavbarSection';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { ServicesSection } from '../sections/ServicesSection';
import { FeaturesSection } from '../sections/FeaturesSection';
import { GallerySection } from '../sections/GallerySection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { CtaSection } from '../sections/CtaSection';
import { ContactSection } from '../sections/ContactSection';
import { FooterSection } from '../sections/FooterSection';

interface Props {
  sections: Section[];
  theme: ThemeConfig;
  isEditor?: boolean;
  activeSectionId?: string | null;
  onSelectSection?: (sectionId: string) => void;
}

export const WebsiteRenderer: React.FC<Props> = ({
  sections,
  theme,
  isEditor = false,
  activeSectionId,
  onSelectSection,
}) => {
  const sortedSections = [...sections].sort((a, b) => a.position - b.position);

  const getSectionTitle = (type: string) => {
    switch (type) {
      case 'navbar': return 'Navigation Bar';
      case 'hero': return 'Hero Header';
      case 'about': return 'Tentang Kami';
      case 'services': return 'Layanan / Menu';
      case 'features': return 'Keunggulan';
      case 'gallery': return 'Galeri Foto';
      case 'testimonials': return 'Testimoni';
      case 'cta': return 'Call To Action';
      case 'contact': return 'Kontak & Lokasi';
      case 'footer': return 'Footer';
      default: return type;
    }
  };

  const renderSectionComponent = (section: Section) => {
    switch (section.type) {
      case 'navbar':
        return <NavbarSection content={section.content as any} theme={theme} isEditor={isEditor} />;
      case 'hero':
        return <HeroSection content={section.content as any} theme={theme} isEditor={isEditor} />;
      case 'about':
        return <AboutSection content={section.content as any} theme={theme} isEditor={isEditor} />;
      case 'services':
        return <ServicesSection content={section.content as any} theme={theme} isEditor={isEditor} />;
      case 'features':
        return <FeaturesSection content={section.content as any} theme={theme} isEditor={isEditor} />;
      case 'gallery':
        return <GallerySection content={section.content as any} theme={theme} isEditor={isEditor} />;
      case 'testimonials':
        return <TestimonialsSection content={section.content as any} theme={theme} isEditor={isEditor} />;
      case 'cta':
        return <CtaSection content={section.content as any} theme={theme} isEditor={isEditor} />;
      case 'contact':
        return <ContactSection content={section.content as any} theme={theme} isEditor={isEditor} />;
      case 'footer':
        return <FooterSection content={section.content as any} theme={theme} isEditor={isEditor} />;
      default:
        return (
          <div className="p-8 text-center bg-amber-50 text-amber-800 border border-amber-200">
            Section tidak dikenal: {section.type}
          </div>
        );
    }
  };

  return (
    <div
      className={`min-h-screen bg-white transition-all ${
        theme.font === 'serif' ? 'font-serif' : 'font-sans'
      }`}
      style={{
        backgroundColor: theme.backgroundColor || '#ffffff',
      }}
    >
      {sortedSections.map((section) => {
        const isActive = isEditor && activeSectionId === section.id;

        if (!isEditor) {
          return <div key={section.id}>{renderSectionComponent(section)}</div>;
        }

        return (
          <div
            key={section.id}
            onClick={() => onSelectSection && onSelectSection(section.id)}
            className={`relative group cursor-pointer transition-all ${
              isActive
                ? 'ring-3 ring-blue-600 ring-offset-2 z-20'
                : 'hover:ring-2 hover:ring-blue-400 hover:ring-offset-1'
            }`}
          >
            {/* Visual Editor Section Label on Hover or Active */}
            <div
              className={`absolute top-2 left-3 z-30 px-2.5 py-1 rounded-md text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900/80 text-white opacity-0 group-hover:opacity-100'
              }`}
            >
              <span>{getSectionTitle(section.type)}</span>
              {isActive && <span className="text-[10px] bg-blue-700 px-1 rounded">Aktif</span>}
            </div>

            {renderSectionComponent(section)}
          </div>
        );
      })}
    </div>
  );
};
