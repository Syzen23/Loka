import React, { useState } from 'react';
import { PRESET_TEMPLATES, PresetTemplate } from '../../templates/presetTemplates';
import { BusinessInfo } from '../../types/schema';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Sparkles,
  LayoutTemplate,
  ArrowRight,
  ArrowLeft,
  Check,
  Coffee,
  Scissors,
  Wrench,
  Utensils,
  ShoppingBag,
  Store,
  Layers,
  MapPin,
  MessageCircle,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onWebsiteCreated: (websiteId: string) => void;
}

export const CreateWebsiteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onWebsiteCreated,
}) => {
  const { token } = useAuth();
  const [step, setStep] = useState<'choose_method' | 'ai_form' | 'template_gallery'>('choose_method');
  const [selectedTemplate, setSelectedTemplate] = useState<PresetTemplate | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // AI Form State
  const [aiForm, setAiForm] = useState<BusinessInfo>({
    name: '',
    category: 'Coffee Shop & Kafe',
    description: '',
    location: '',
    whatsapp: '',
    instagram: '',
    services: '',
    targetCustomer: '',
    preferredStyle: 'modern',
  });

  // Template Form State
  const [templateSiteName, setTemplateSiteName] = useState('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep('choose_method');
    setSelectedTemplate(null);
    setLoading(false);
    setErrorMsg(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  // Submit AI Website Generation
  const handleGenerateAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiForm.name || !aiForm.description || !aiForm.location || !aiForm.whatsapp) {
      setErrorMsg('Harap lengkapi semua field bertanda bintang (*)');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      setLoadingStatus('Gemini AI sedang menganalisis profil bisnis Anda...');

      setTimeout(() => {
        setLoadingStatus('Menyusun copywriting headline, value proposition & CTA...');
      }, 1500);

      setTimeout(() => {
        setLoadingStatus('Membangun struktur 9 section dan palet warna responsif...');
      }, 3000);

      const aiRes = await fetch('/api/ai/generate-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(aiForm),
      });

      if (!aiRes.ok) {
        const err = await aiRes.json();
        throw new Error(err.error || 'Gagal generate AI');
      }

      const aiData = await aiRes.json();
      setLoadingStatus('Menyimpan ke database...');

      // Save as new website
      const createRes = await fetch('/api/websites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: aiForm.name,
          businessInfo: aiForm,
          theme: aiData.data.theme,
          sections: aiData.data.sections,
        }),
      });

      if (!createRes.ok) {
        throw new Error('Gagal menyimpan website ke akun');
      }

      const created = await createRes.json();
      handleClose();
      onWebsiteCreated(created.websiteId);
    } catch (err: any) {
      console.error('AI generate failed:', err);
      setErrorMsg(err.message || 'Terjadi kesalahan saat membuat website dengan AI.');
    } finally {
      setLoading(false);
    }
  };

  // Submit Website from Template
  const handleSelectTemplateSubmit = async (template: PresetTemplate) => {
    const finalName = templateSiteName.trim() || template.name;
    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await fetch('/api/websites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: finalName,
          templateId: template.id,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Gagal membuat website dari template');
      }

      const data = await res.json();
      handleClose();
      onWebsiteCreated(data.websiteId);
    } catch (err: any) {
      console.error('Template create failed:', err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {step !== 'choose_method' && (
              <button
                type="button"
                onClick={() => setStep('choose_method')}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition mr-1"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h3 className="text-base font-bold text-slate-900">
              {step === 'choose_method' && 'Buat Website Baru'}
              {step === 'ai_form' && '✨ Buat dengan Gemini AI'}
              {step === 'template_gallery' && '🎨 Pilih dari Template Siap Pakai'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: CHOOSE METHOD */}
          {step === 'choose_method' && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto space-y-2">
                <h4 className="text-lg font-bold text-slate-900">Bagaimana Anda ingin memulainya?</h4>
                <p className="text-xs text-slate-500">
                  Pilih AI untuk dibuatkan copywriting & section otomatis, atau pilih template yang sudah didesain khusus untuk jenis bisnis Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Option A: AI */}
                <button
                  type="button"
                  onClick={() => setStep('ai_form')}
                  className="p-6 rounded-2xl border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50/30 text-left transition group space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition">
                        Generate dengan AI
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                        Cukup isi info bisnis Anda. AI akan meracik copywriting headline, deskripsi, layanan, dan section otomatis.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs font-bold text-blue-600 gap-1 pt-2">
                    <span>Mulai dengan AI</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </button>

                {/* Option B: Template */}
                <button
                  type="button"
                  onClick={() => setStep('template_gallery')}
                  className="p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-600 hover:bg-indigo-50/30 text-left transition group space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                      <LayoutTemplate className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                        Gunakan Template
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                        Pilih dari 5 template bisnis lokal terpopuler: Coffee Shop, Barbershop, Laundry, Restoran, atau Bengkel.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs font-bold text-indigo-600 gap-1 pt-2">
                    <span>Lihat Galeri Template</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2A: AI FORM */}
          {step === 'ai_form' && (
            <form onSubmit={handleGenerateAI} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Bisnis / Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={aiForm.name}
                    onChange={(e) => setAiForm({ ...aiForm, name: e.target.value })}
                    placeholder="Contoh: Kopi Senja Roastery"
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kategori Bisnis *
                  </label>
                  <select
                    value={aiForm.category}
                    onChange={(e) => setAiForm({ ...aiForm, category: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Coffee Shop & Kafe">Coffee Shop & Kafe</option>
                    <option value="Barbershop & Grooming">Barbershop & Salon</option>
                    <option value="Laundry & Dry Clean">Laundry & Cuci Pakaian</option>
                    <option value="Restoran & Kuliner">Restoran & Rumah Makan</option>
                    <option value="Bengkel & Servis Otomotif">Bengkel & Servis Otomotif</option>
                    <option value="Klinik & Kesehatan">Klinik & Kesehatan</option>
                    <option value="Jasa & UMKM Lokal">Jasa & UMKM Lokal Lainnya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deskripsi Bisnis & Keunggulan Utama *
                </label>
                <textarea
                  required
                  rows={3}
                  value={aiForm.description}
                  onChange={(e) => setAiForm({ ...aiForm, description: e.target.value })}
                  placeholder="Ceritakan apa yang Anda jual, apa keunggulannya, dan suasana tempat Anda..."
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lokasi / Kota *
                  </label>
                  <input
                    type="text"
                    required
                    value={aiForm.location}
                    onChange={(e) => setAiForm({ ...aiForm, location: e.target.value })}
                    placeholder="Contoh: Jl. Sudirman, Bandar Lampung"
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomor WhatsApp Pemesanan *
                  </label>
                  <input
                    type="text"
                    required
                    value={aiForm.whatsapp}
                    onChange={(e) => setAiForm({ ...aiForm, whatsapp: e.target.value })}
                    placeholder="Contoh: 6281234567890"
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Layanan / Produk Utama
                  </label>
                  <input
                    type="text"
                    value={aiForm.services || ''}
                    onChange={(e) => setAiForm({ ...aiForm, services: e.target.value })}
                    placeholder="Contoh: Espresso, Manual Brew, Pastry"
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gaya Desain yang Diinginkan
                  </label>
                  <select
                    value={aiForm.preferredStyle}
                    onChange={(e) => setAiForm({ ...aiForm, preferredStyle: e.target.value as any })}
                    className="w-full text-xs px-3 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="modern">Modern & Clean (Biru)</option>
                    <option value="warm">Warm & Cozy (Cokelat Amber)</option>
                    <option value="bold">Bold & Energetic (Merah Dinamis)</option>
                    <option value="minimalist">Minimalist (Monochrome)</option>
                    <option value="elegant">Elegant (Emerald / Teal)</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 text-center space-y-3">
                  <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs font-bold text-blue-900">{loadingStatus}</p>
                  <p className="text-[11px] text-blue-700">Mohon tunggu beberapa detik...</p>
                </div>
              ) : (
                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('choose_method')}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm flex items-center gap-2 active:scale-95 transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Landing Page Sekarang</span>
                  </button>
                </div>
              )}
            </form>
          )}

          {/* STEP 2B: TEMPLATE GALLERY */}
          {step === 'template_gallery' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PRESET_TEMPLATES.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      setSelectedTemplate(tpl);
                      setTemplateSiteName(tpl.name);
                    }}
                    className={`rounded-2xl border-2 overflow-hidden cursor-pointer transition flex flex-col justify-between group ${
                      selectedTemplate?.id === tpl.id
                        ? 'border-blue-600 ring-2 ring-blue-100 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={tpl.previewImage}
                        alt={tpl.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 shadow-xs">
                          {tpl.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-1">
                      <h5 className="text-xs font-bold text-slate-900 flex items-center justify-between">
                        <span>{tpl.name}</span>
                        {selectedTemplate?.id === tpl.id && (
                          <Check className="w-4 h-4 text-blue-600" />
                        )}
                      </h5>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        {tpl.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedTemplate && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Website / Bisnis Anda:
                    </label>
                    <input
                      type="text"
                      value={templateSiteName}
                      onChange={(e) => setTemplateSiteName(e.target.value)}
                      placeholder={selectedTemplate.name}
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleSelectTemplateSubmit(selectedTemplate)}
                      disabled={loading}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm flex items-center gap-2 active:scale-95 transition disabled:opacity-50"
                    >
                      <span>{loading ? 'Menyiapkan...' : `Gunakan Template ${selectedTemplate.name}`}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
