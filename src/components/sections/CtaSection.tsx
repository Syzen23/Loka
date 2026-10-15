import React from 'react';
import { CtaContent, ThemeConfig } from '../../types/schema';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface Props {
  content: CtaContent;
  theme: ThemeConfig;
  isEditor?: boolean;
}

export const CtaSection: React.FC<Props> = ({ content, theme, isEditor }) => {
  const primaryColor = theme.primaryColor || '#2563eb';

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${primaryColor}, transparent 70%)`,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {content.badge && (
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-white/90 border border-white/15">
            {content.badge}
          </span>
        )}

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          {content.title}
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          {content.description}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={isEditor ? '#!' : (content.buttonUrl || '#contact')}
            target={isEditor ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white shadow-lg active:scale-95 transition-all w-full sm:w-auto justify-center"
            style={{ backgroundColor: primaryColor }}
            onClick={(e) => {
              if (isEditor) e.preventDefault();
            }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>{content.buttonText}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {content.note && (
          <p className="text-xs sm:text-sm text-slate-400 font-medium pt-2">
            {content.note}
          </p>
        )}
      </div>
    </section>
  );
};
