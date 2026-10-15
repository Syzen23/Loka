import React from 'react';
import { FeaturesContent, ThemeConfig } from '../../types/schema';
import { Shield, Clock, Smile, Award, Wifi, Truck, Wrench, CheckCircle } from 'lucide-react';

interface Props {
  content: FeaturesContent;
  theme: ThemeConfig;
  isEditor?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  shield: <Shield className="w-6 h-6" />,
  clock: <Clock className="w-6 h-6" />,
  smile: <Smile className="w-6 h-6" />,
  award: <Award className="w-6 h-6" />,
  wifi: <Wifi className="w-6 h-6" />,
  truck: <Truck className="w-6 h-6" />,
  wrench: <Wrench className="w-6 h-6" />,
};

export const FeaturesSection: React.FC<Props> = ({ content, theme }) => {
  const primaryColor = theme.primaryColor || '#2563eb';

  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.items?.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all space-y-4 text-center sm:text-left"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white mx-auto sm:mx-0 shadow-xs"
                style={{ backgroundColor: primaryColor }}
              >
                {ICON_MAP[item.icon || 'shield'] || <CheckCircle className="w-6 h-6" />}
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
