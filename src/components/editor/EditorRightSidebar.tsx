import React from 'react';
import { Section } from '../../types/schema';
import { Plus, Trash2, X, Sliders, Image, Link, Type } from 'lucide-react';

interface Props {
  section: Section | null;
  onUpdateContent: (newContent: any) => void;
  onClose: () => void;
}

export const EditorRightSidebar: React.FC<Props> = ({
  section,
  onUpdateContent,
  onClose,
}) => {
  if (!section) {
    return (
      <aside className="w-88 bg-white border-l border-slate-200 flex flex-col shrink-0 h-[calc(100vh-4rem)] p-6 items-center justify-center text-center">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          <Sliders className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-slate-800 mb-1">Pilih Section</h4>
        <p className="text-xs text-slate-500 max-w-[200px]">
          Klik salah satu section di kanvas atau di sidebar kiri untuk mengedit teks, gambar, dan tombolnya.
        </p>
      </aside>
    );
  }

  const content = (section.content || {}) as any;

  const handleChange = (field: string, value: any) => {
    onUpdateContent({
      ...content,
      [field]: value,
    });
  };

  const getSectionTitle = (type: string) => {
    switch (type) {
      case 'navbar': return 'Pengaturan Navbar';
      case 'hero': return 'Pengaturan Hero Banner';
      case 'about': return 'Pengaturan Tentang Kami';
      case 'services': return 'Pengaturan Layanan / Menu';
      case 'features': return 'Pengaturan Keunggulan';
      case 'gallery': return 'Pengaturan Galeri';
      case 'testimonials': return 'Pengaturan Testimoni';
      case 'cta': return 'Pengaturan Call to Action';
      case 'contact': return 'Pengaturan Kontak';
      case 'footer': return 'Pengaturan Footer';
      default: return 'Pengaturan Section';
    }
  };

  return (
    <aside className="w-88 bg-white border-l border-slate-200 flex flex-col shrink-0 h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/50">
        <div>
          <h3 className="text-xs font-bold text-slate-900 tracking-tight">
            {getSectionTitle(section.type)}
          </h3>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">
            Tipe: {section.type}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          title="Tutup Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Form Fields Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {/* COMMON: Badge */}
        {'badge' in content && (
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Badge / Label Atas
            </label>
            <input
              type="text"
              value={content.badge || ''}
              onChange={(e) => handleChange('badge', e.target.value)}
              placeholder="Contoh: ✨ Promo Spesial"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        {/* COMMON: Title */}
        {'title' in content && (
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Judul Utama (Title)
            </label>
            <input
              type="text"
              value={content.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500 font-medium"
            />
          </div>
        )}

        {/* COMMON: Subtitle / Description */}
        {'description' in content && (
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Deskripsi Teks
            </label>
            <textarea
              rows={3}
              value={content.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        {'subtitle' in content && (
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Subjudul (Subtitle)
            </label>
            <input
              type="text"
              value={content.subtitle || ''}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        )}

        {/* HERO SPECIFIC */}
        {section.type === 'hero' && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Teks Tombol Utama (WhatsApp)
              </label>
              <input
                type="text"
                value={content.buttonText || ''}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Link URL Tombol Utama
              </label>
              <input
                type="text"
                value={content.buttonUrl || ''}
                onChange={(e) => handleChange('buttonUrl', e.target.value)}
                placeholder="https://wa.me/..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Teks Tombol Sekunder
              </label>
              <input
                type="text"
                value={content.secondaryButtonText || ''}
                onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
                placeholder="Lihat Layanan"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Link URL Tombol Sekunder
              </label>
              <input
                type="text"
                value={content.secondaryButtonUrl || ''}
                onChange={(e) => handleChange('secondaryButtonUrl', e.target.value)}
                placeholder="#services"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                URL Gambar Hero
              </label>
              <input
                type="text"
                value={content.imageUrl || ''}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none font-mono text-[11px]"
              />
              {content.imageUrl && (
                <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 h-28">
                  <img src={content.imageUrl} alt="Hero preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Alignment Teks
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('alignment', 'left')}
                  className={`py-1.5 px-3 rounded-lg border font-semibold ${
                    content.alignment !== 'center'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Rata Kiri
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('alignment', 'center')}
                  className={`py-1.5 px-3 rounded-lg border font-semibold ${
                    content.alignment === 'center'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Rata Tengah
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NAVBAR SPECIFIC */}
        {section.type === 'navbar' && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nama Brand / Judul Navbar
              </label>
              <input
                type="text"
                value={content.brandName || ''}
                onChange={(e) => handleChange('brandName', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Teks Tombol CTA
              </label>
              <input
                type="text"
                value={content.ctaText || ''}
                onChange={(e) => handleChange('ctaText', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Link URL Tombol CTA
              </label>
              <input
                type="text"
                value={content.ctaUrl || ''}
                onChange={(e) => handleChange('ctaUrl', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nomor Telepon
              </label>
              <input
                type="text"
                value={content.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>
          </div>
        )}

        {/* ABOUT SPECIFIC */}
        {section.type === 'about' && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Cerita / Narasi Bisnis
              </label>
              <textarea
                rows={4}
                value={content.story || ''}
                onChange={(e) => handleChange('story', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                URL Gambar Tentang Kami
              </label>
              <input
                type="text"
                value={content.imageUrl || ''}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none font-mono text-[11px]"
              />
            </div>
          </div>
        )}

        {/* SERVICES SPECIFIC */}
        {section.type === 'services' && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">Daftar Layanan</label>
              <button
                type="button"
                onClick={() => {
                  const items = content.items || [];
                  handleChange('items', [
                    ...items,
                    {
                      title: 'Layanan Baru',
                      description: 'Deskripsi lengkap layanan...',
                      price: 'Rp 50.000',
                      icon: 'check',
                    },
                  ]);
                }}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Item
              </button>
            </div>

            <div className="space-y-3">
              {(content.items || []).map((item: any, idx: number) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 text-[11px]">Item #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const items = [...content.items];
                        items.splice(idx, 1);
                        handleChange('items', items);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => {
                      const items = [...content.items];
                      items[idx] = { ...items[idx], title: e.target.value };
                      handleChange('items', items);
                    }}
                    placeholder="Nama Layanan"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                  <input
                    type="text"
                    value={item.price || ''}
                    onChange={(e) => {
                      const items = [...content.items];
                      items[idx] = { ...items[idx], price: e.target.value };
                      handleChange('items', items);
                    }}
                    placeholder="Harga / Tarif"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                  <textarea
                    rows={2}
                    value={item.description || ''}
                    onChange={(e) => {
                      const items = [...content.items];
                      items[idx] = { ...items[idx], description: e.target.value };
                      handleChange('items', items);
                    }}
                    placeholder="Deskripsi singkat..."
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FEATURES SPECIFIC */}
        {section.type === 'features' && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">Daftar Keunggulan</label>
              <button
                type="button"
                onClick={() => {
                  const items = content.items || [];
                  handleChange('items', [
                    ...items,
                    { title: 'Keunggulan Baru', description: 'Keterangan keunggulan...', icon: 'shield' },
                  ]);
                }}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Poin
              </button>
            </div>

            <div className="space-y-3">
              {(content.items || []).map((item: any, idx: number) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 text-[11px]">Poin #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const items = [...content.items];
                        items.splice(idx, 1);
                        handleChange('items', items);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => {
                      const items = [...content.items];
                      items[idx] = { ...items[idx], title: e.target.value };
                      handleChange('items', items);
                    }}
                    placeholder="Judul Keunggulan"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                  <textarea
                    rows={2}
                    value={item.description || ''}
                    onChange={(e) => {
                      const items = [...content.items];
                      items[idx] = { ...items[idx], description: e.target.value };
                      handleChange('items', items);
                    }}
                    placeholder="Deskripsi keunggulan..."
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TESTIMONIALS SPECIFIC */}
        {section.type === 'testimonials' && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">Daftar Testimoni</label>
              <button
                type="button"
                onClick={() => {
                  const items = content.items || [];
                  handleChange('items', [
                    ...items,
                    {
                      name: 'Nama Pelanggan',
                      role: 'Pelanggan Setia',
                      comment: 'Pelayanan sangat bagus dan memuaskan!',
                      rating: 5,
                    },
                  ]);
                }}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Review
              </button>
            </div>

            <div className="space-y-3">
              {(content.items || []).map((item: any, idx: number) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 text-[11px]">Ulasan #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const items = [...content.items];
                        items.splice(idx, 1);
                        handleChange('items', items);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={item.name || ''}
                    onChange={(e) => {
                      const items = [...content.items];
                      items[idx] = { ...items[idx], name: e.target.value };
                      handleChange('items', items);
                    }}
                    placeholder="Nama Pelanggan"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                  <input
                    type="text"
                    value={item.role || ''}
                    onChange={(e) => {
                      const items = [...content.items];
                      items[idx] = { ...items[idx], role: e.target.value };
                      handleChange('items', items);
                    }}
                    placeholder="Profesi / Domisili"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                  <textarea
                    rows={2}
                    value={item.comment || ''}
                    onChange={(e) => {
                      const items = [...content.items];
                      items[idx] = { ...items[idx], comment: e.target.value };
                      handleChange('items', items);
                    }}
                    placeholder="Komentar review..."
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GALLERY SPECIFIC */}
        {section.type === 'gallery' && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">Foto Galeri</label>
              <button
                type="button"
                onClick={() => {
                  const images = content.images || [];
                  handleChange('images', [
                    ...images,
                    {
                      imageUrl:
                        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
                      caption: 'Foto Baru',
                    },
                  ]);
                }}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Foto
              </button>
            </div>

            <div className="space-y-3">
              {(content.images || []).map((img: any, idx: number) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 text-[11px]">Foto #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const images = [...content.images];
                        images.splice(idx, 1);
                        handleChange('images', images);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={img.imageUrl || ''}
                    onChange={(e) => {
                      const images = [...content.images];
                      images[idx] = { ...images[idx], imageUrl: e.target.value };
                      handleChange('images', images);
                    }}
                    placeholder="URL Gambar"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none font-mono text-[11px]"
                  />
                  <input
                    type="text"
                    value={img.caption || ''}
                    onChange={(e) => {
                      const images = [...content.images];
                      images[idx] = { ...images[idx], caption: e.target.value };
                      handleChange('images', images);
                    }}
                    placeholder="Keterangan Caption"
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA SPECIFIC */}
        {section.type === 'cta' && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Teks Tombol CTA
              </label>
              <input
                type="text"
                value={content.buttonText || ''}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Link URL Tombol CTA
              </label>
              <input
                type="text"
                value={content.buttonUrl || ''}
                onChange={(e) => handleChange('buttonUrl', e.target.value)}
                placeholder="https://wa.me/..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Catatan Bawah (Note)
              </label>
              <input
                type="text"
                value={content.note || ''}
                onChange={(e) => handleChange('note', e.target.value)}
                placeholder="Respon cepat dalam 5 menit"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>
          </div>
        )}

        {/* CONTACT SPECIFIC */}
        {section.type === 'contact' && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Alamat Lengkap
              </label>
              <textarea
                rows={2}
                value={content.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Nomor WhatsApp
              </label>
              <input
                type="text"
                value={content.whatsapp || ''}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Jam Operasional
              </label>
              <input
                type="text"
                value={content.operatingHours || ''}
                onChange={(e) => handleChange('operatingHours', e.target.value)}
                placeholder="Senin - Minggu: 08.00 - 22.00 WIB"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Email
              </label>
              <input
                type="text"
                value={content.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>
          </div>
        )}

        {/* FOOTER SPECIFIC */}
        {section.type === 'footer' && (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tagline Footer
              </label>
              <input
                type="text"
                value={content.tagline || ''}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Teks Hak Cipta
              </label>
              <input
                type="text"
                value={content.copyrightText || ''}
                onChange={(e) => handleChange('copyrightText', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
