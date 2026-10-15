import React, { useState, useEffect } from 'react';
import { Website } from '../types/schema';
import { WebsiteRenderer } from '../components/renderer/WebsiteRenderer';
import { AlertCircle, ArrowLeft, Globe } from 'lucide-react';

interface Props {
  slug: string;
}

export const PublicSitePage: React.FC<Props> = ({ slug }) => {
  const [website, setWebsite] = useState<Website | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDraft, setIsDraft] = useState(false);

  useEffect(() => {
    async function loadPublicSite() {
      try {
        setLoading(true);
        setErrorMsg(null);
        setIsDraft(false);

        const res = await fetch(`/api/public/sites/${slug}`);
        if (!res.ok) {
          const data = await res.json();
          if (data.isDraft) {
            setIsDraft(true);
          }
          throw new Error(data.error || 'Website tidak ditemukan');
        }

        const data = await res.json();
        setWebsite(data.website);
      } catch (err: any) {
        console.error('Fetch public site failed:', err);
        setErrorMsg(err.message || 'Halaman tidak dapat diakses.');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadPublicSite();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-500">Memuat landing page...</p>
        </div>
      </div>
    );
  }

  if (isDraft) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center max-w-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Website Belum Dipublikasikan</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Halaman ini masih dalam status draft oleh pemilik bisnis. Silakan periksa kembali nanti atau hubungi pemilik usaha secara langsung.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ke Beranda LokalSite</span>
          </a>
        </div>
      </div>
    );
  }

  if (errorMsg || !website) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center max-w-md space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Halaman Tidak Ditemukan (404)</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {errorMsg || 'Alamat website yang Anda tuju tidak ditemukan atau telah dipindahkan.'}
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition"
          >
            <span>Buka LokalSite</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <WebsiteRenderer
        sections={website.sections || []}
        theme={website.theme}
        isEditor={false}
      />
    </div>
  );
};
