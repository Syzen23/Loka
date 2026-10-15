import React from 'react';
import { ServicesContent, ThemeConfig } from '../../types/schema';
import { Sparkles, Utensils, Scissors, Coffee, Award, Shield, Check, Flame, Clock } from 'lucide-react';

interface Props {
  content: ServicesContent;
  theme: ThemeConfig;
  isEditor?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  coffee: <Coffee className="w-6 h-6" />,
  scissors: <Scissors className="w-6 h-6" />,
  utensils: <Utensils className="w-6 h-6" />,
  flame: <Flame className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  award: <Award className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  check: <Check className="w-6 h-6" />,
  clock: <Clock className="w-6 h-6" />,
};

export const ServicesSection: React.FC<Props> = ({ content, theme }) => {
  const primaryColor = theme.primaryColor || '#2563eb';

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {content.items?.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md border border-slate-200/80 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Image or Icon */}
                {item.imageUrl ? (
                  <div className="overflow-hidden rounded-xl h-44 w-full mb-2">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                ) : (
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xs"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {ICON_MAP[item.icon || 'check'] || <Check className="w-6 h-6" />}
                  </div>
                )}

                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.price && (
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Tarif / Harga</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900" style={{ color: primaryColor }}>
                    {item.price}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
