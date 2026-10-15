import React from 'react';
import { HeroContent, ThemeConfig } from '../../types/schema';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  content: HeroContent;
  theme: ThemeConfig;
  isEditor?: boolean;
}

export const HeroSection: React.FC<Props> = ({ content, theme, isEditor }) => {
  const primaryColor = theme.primaryColor || '#2563eb';
  const isCenter = content.alignment === 'center';

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Decorative background glow */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />
      <div
        className="absolute bottom-10 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: theme.accentColor || primaryColor }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 ${isCenter ? 'text-center' : 'lg:grid-cols-12'} gap-12 items-center`}>
          {/* Text Content */}
          <div className={`${isCenter ? 'max-w-3xl mx-auto' : 'lg:col-span-7'} space-y-6`}>
            {content.badge && (
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-slate-200 bg-white/80 shadow-xs backdrop-blur-sm text-slate-800 ${isCenter ? 'mx-auto' : ''}`}>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{content.badge}</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight">
              {content.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {content.description}
            </p>

            {/* Buttons */}
            <div className={`pt-2 flex flex-wrap gap-4 items-center ${isCenter ? 'justify-center' : ''}`}>
              {content.buttonText && (
                <a
                  href={isEditor ? '#!' : (content.buttonUrl || '#contact')}
                  target={isEditor ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white shadow-md hover:shadow-lg active:scale-95 transition-all"
                  style={{ backgroundColor: primaryColor }}
                  onClick={(e) => {
                    if (isEditor) e.preventDefault();
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{content.buttonText}</span>
                </a>
              )}

              {content.secondaryButtonText && (
                <a
                  href={isEditor ? '#!' : (content.secondaryButtonUrl || '#services')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-base font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
                  onClick={(e) => {
                    if (isEditor) e.preventDefault();
                  }}
                >
                  <span>{content.secondaryButtonText}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
              )}
            </div>
          </div>

          {/* Hero Image */}
          {content.imageUrl && (
            <div className={`${isCenter ? 'max-w-2xl mx-auto w-full' : 'lg:col-span-5'}`}>
              <div className="relative group">
                <div
                  className="absolute -inset-1 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"
                  style={{ backgroundColor: primaryColor }}
                />
                <img
                  src={content.imageUrl}
                  alt={content.title}
                  className="relative rounded-2xl sm:rounded-3xl shadow-xl w-full h-[280px] sm:h-[380px] lg:h-[440px] object-cover border border-slate-100"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
