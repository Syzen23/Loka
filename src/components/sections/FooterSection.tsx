import React from 'react';
import { FooterContent, ThemeConfig } from '../../types/schema';
import { MessageCircle, Instagram, MapPin, Globe } from 'lucide-react';

interface Props {
  content: FooterContent;
  theme: ThemeConfig;
  isEditor?: boolean;
}

export const FooterSection: React.FC<Props> = ({ content, isEditor }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          {/* Tagline */}
          <div className="text-center md:text-left space-y-1">
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              {content.tagline || 'Solusi Landing Page Bisnis Lokal Profesional'}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {content.socialLinks?.map((soc, idx) => (
              <a
                key={idx}
                href={isEditor ? '#!' : soc.url}
                target={isEditor ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition"
                onClick={(e) => {
                  if (isEditor) e.preventDefault();
                }}
              >
                {soc.platform === 'whatsapp' && <MessageCircle className="w-4 h-4" />}
                {soc.platform === 'instagram' && <Instagram className="w-4 h-4" />}
                {soc.platform === 'maps' && <MapPin className="w-4 h-4" />}
                {soc.platform !== 'whatsapp' && soc.platform !== 'instagram' && soc.platform !== 'maps' && (
                  <Globe className="w-4 h-4" />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom copyright and badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{content.copyrightText || '© 2026 Seluruh hak cipta dilindungi.'}</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Dibuat dengan</span>
            <span className="font-semibold text-slate-300">LokalSite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
