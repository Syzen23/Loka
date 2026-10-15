import React from 'react';
import { GalleryContent, ThemeConfig } from '../../types/schema';

interface Props {
  content: GalleryContent;
  theme: ThemeConfig;
  isEditor?: boolean;
}

export const GallerySection: React.FC<Props> = ({ content, theme }) => {
  const primaryColor = theme.primaryColor || '#2563eb';

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          {content.badge && (
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
            >
              {content.badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.images?.map((img, idx) => (
            <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition duration-300">
              <img
                src={img.imageUrl}
                alt={img.caption || `Galeri foto ${idx + 1}`}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              />
              {img.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4 opacity-90 group-hover:opacity-100 transition">
                  <span className="text-white text-sm font-medium">{img.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
