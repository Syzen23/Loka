import React from 'react';
import { TestimonialsContent, ThemeConfig } from '../../types/schema';
import { Star, Quote } from 'lucide-react';

interface Props {
  content: TestimonialsContent;
  theme: ThemeConfig;
  isEditor?: boolean;
}

export const TestimonialsSection: React.FC<Props> = ({ content, theme }) => {
  const primaryColor = theme.primaryColor || '#2563eb';

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {content.items?.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border border-slate-200/90 bg-slate-50/40 relative flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-slate-200 absolute top-6 right-6" />

              <div className="space-y-4 mb-6">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-base italic leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                {item.avatarUrl ? (
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-xs"
                  />
                ) : (
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {item.name?.charAt(0) || 'U'}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                  {item.role && <p className="text-xs text-slate-500">{item.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
