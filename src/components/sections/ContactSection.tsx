import React from 'react';
import { ContactContent, ThemeConfig } from '../../types/schema';
import { MapPin, Phone, MessageCircle, Mail, Clock, Instagram } from 'lucide-react';

interface Props {
  content: ContactContent;
  theme: ThemeConfig;
  isEditor?: boolean;
}

export const ContactSection: React.FC<Props> = ({ content, theme, isEditor }) => {
  const primaryColor = theme.primaryColor || '#2563eb';
  const cleanPhone = content.whatsapp ? content.whatsapp.replace(/\D/g, '') : '';
  const waUrl = `https://wa.me/${cleanPhone}?text=Halo,%20saya%20ingin%20menghubungi%20Anda`;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white border-t border-slate-100">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Address */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
              style={{ backgroundColor: primaryColor }}
            >
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Alamat Lokasi</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {content.address}
              </p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-xs">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">WhatsApp Resmi</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                {content.whatsapp}
              </p>
              <a
                href={isEditor ? '#!' : waUrl}
                target={isEditor ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="inline-block text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline mt-1"
                onClick={(e) => {
                  if (isEditor) e.preventDefault();
                }}
              >
                Chat WhatsApp Sekarang →
              </a>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
              style={{ backgroundColor: primaryColor }}
            >
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">Jam Operasional</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {content.operatingHours || 'Buka setiap hari'}
              </p>
            </div>
          </div>

          {/* Phone */}
          {content.phone && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: primaryColor }}
              >
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Telepon</h4>
                <p className="text-xs sm:text-sm text-slate-600 font-normal">
                  {content.phone}
                </p>
              </div>
            </div>
          )}

          {/* Email */}
          {content.email && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: primaryColor }}
              >
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Email</h4>
                <p className="text-xs sm:text-sm text-slate-600 font-normal break-all">
                  {content.email}
                </p>
              </div>
            </div>
          )}

          {/* Instagram */}
          {content.instagram && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Instagram</h4>
                <a
                  href={isEditor ? '#!' : `https://instagram.com/${content.instagram.replace('@', '')}`}
                  target={isEditor ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-slate-700 hover:text-slate-900 font-medium underline"
                  onClick={(e) => {
                    if (isEditor) e.preventDefault();
                  }}
                >
                  {content.instagram}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
