import React, { useState } from 'react';
import { NavbarContent, ThemeConfig } from '../../types/schema';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';

interface Props {
  content: NavbarContent;
  theme: ThemeConfig;
  isEditor?: boolean;
}

export const NavbarSection: React.FC<Props> = ({ content, theme, isEditor }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const primaryColor = theme.primaryColor || '#2563eb';

  return (
    <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand */}
          <div className="flex items-center gap-3">
            {content.logoUrl ? (
              <img src={content.logoUrl} alt={content.brandName} className="h-9 w-auto object-contain rounded" />
            ) : (
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                {content.brandName?.charAt(0) || 'L'}
              </div>
            )}
            <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">
              {content.brandName || 'Nama Bisnis'}
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {content.links?.map((link, idx) => (
              <a
                key={idx}
                href={isEditor ? '#!' : link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                onClick={(e) => {
                  if (isEditor) e.preventDefault();
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-4">
            {content.phone && (
              <a
                href={isEditor ? '#!' : `tel:${content.phone}`}
                className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                onClick={(e) => {
                  if (isEditor) e.preventDefault();
                }}
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{content.phone}</span>
              </a>
            )}

            {content.ctaText && (
              <a
                href={isEditor ? '#!' : (content.ctaUrl || '#contact')}
                target={isEditor ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm hover:opacity-95 active:scale-95 transition-all"
                style={{ backgroundColor: primaryColor }}
                onClick={(e) => {
                  if (isEditor) e.preventDefault();
                }}
              >
                <span>{content.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 flex flex-col gap-3">
            {content.links?.map((link, idx) => (
              <a
                key={idx}
                href={isEditor ? '#!' : link.href}
                className="px-2 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded"
                onClick={(e) => {
                  if (isEditor) e.preventDefault();
                  setMobileMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
            {content.ctaText && (
              <a
                href={isEditor ? '#!' : (content.ctaUrl || '#contact')}
                target={isEditor ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="mt-2 w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm"
                style={{ backgroundColor: primaryColor }}
                onClick={(e) => {
                  if (isEditor) e.preventDefault();
                  setMobileMenuOpen(false);
                }}
              >
                {content.ctaText}
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
