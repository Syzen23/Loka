import React, { useState } from 'react';
import { Section, ThemeConfig, BusinessInfo } from '../../types/schema';
import {
  Layers,
  Palette,
  Briefcase,
  Plus,
  ChevronUp,
  ChevronDown,
  Trash2,
  GripVertical,
  Sliders,
} from 'lucide-react';

interface Props {
  sections: Section[];
  activeSectionId: string | null;
  onSelectSection: (id: string) => void;
  onMoveSection: (index: number, direction: 'up' | 'down') => void;
  onDeleteSection: (id: string) => void;
  onOpenAddSection: () => void;
  theme: ThemeConfig;
  onUpdateTheme: (theme: ThemeConfig) => void;
  businessInfo: BusinessInfo;
  onUpdateBusinessInfo: (info: BusinessInfo) => void;
  slug: string;
  onUpdateSlug: (slug: string) => void;
}

const COLOR_PRESETS = [
  { name: 'Kopi / Amber', primary: '#78350f', secondary: '#1c1917', bg: '#fef3c7' },
  { name: 'Royal Blue', primary: '#2563eb', secondary: '#0f172a', bg: '#f8fafc' },
  { name: 'Emerald Green', primary: '#059669', secondary: '#064e3b', bg: '#f0fdf4' },
  { name: 'Deep Crimson', primary: '#b91c1c', secondary: '#1c1917', bg: '#fef2f2' },
  { name: 'Sky Cyan', primary: '#0284c7', secondary: '#0f172a', bg: '#f0f9ff' },
  { name: 'Modern Dark', primary: '#18181b', secondary: '#27272a', bg: '#fafafa' },
];

export const EditorLeftSidebar: React.FC<Props> = ({
  sections,
  activeSectionId,
  onSelectSection,
  onMoveSection,
  onDeleteSection,
  onOpenAddSection,
  theme,
  onUpdateTheme,
  businessInfo,
  onUpdateBusinessInfo,
  slug,
  onUpdateSlug,
}) => {
  const [activeTab, setActiveTab] = useState<'sections' | 'theme' | 'business'>('sections');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const getSectionLabel = (type: string) => {
    switch (type) {
      case 'navbar': return 'Navigation Bar';
      case 'hero': return 'Hero Banner';
      case 'about': return 'Tentang Usaha';
      case 'services': return 'Layanan / Menu';
      case 'features': return 'Keunggulan Kami';
      case 'gallery': return 'Galeri Foto';
      case 'testimonials': return 'Testimoni Klien';
      case 'cta': return 'Call to Action';
      case 'contact': return 'Kontak & Lokasi';
      case 'footer': return 'Footer';
      default: return type;
    }
  };

  const sortedSections = [...sections].sort((a, b) => a.position - b.position);

  // Drag and drop handlers for reordering sections
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

    // Shift section to new position
    if (sourceIndex < targetIndex) {
      for (let i = sourceIndex; i < targetIndex; i++) {
        onMoveSection(i, 'down');
      }
    } else {
      for (let i = sourceIndex; i > targetIndex; i--) {
        onMoveSection(i, 'up');
      }
    }
    setDraggedIndex(null);
  };

  return (
    <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 h-[calc(100vh-4rem)]">
      {/* Sidebar Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab('sections')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeTab === 'sections'
              ? 'bg-white text-blue-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Sections ({sections.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('theme')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeTab === 'theme'
              ? 'bg-white text-blue-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Tema</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('business')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${
            activeTab === 'business'
              ? 'bg-white text-blue-600 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Bisnis</span>
        </button>
      </div>

      {/* Tab 1: Sections Manager */}
      {activeTab === 'sections' && (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-3 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Urutan Section
            </span>
            <button
              type="button"
              onClick={onOpenAddSection}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {sortedSections.map((section, idx) => {
              const isActive = activeSectionId === section.id;
              return (
                <div
                  key={section.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, idx)}
                  onClick={() => onSelectSection(section.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer select-none group ${
                    isActive
                      ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-100'
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="text-slate-300 group-hover:text-slate-400 cursor-grab active:cursor-grabbing">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 w-4">
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <p className={`text-xs font-semibold truncate ${isActive ? 'text-blue-700' : 'text-slate-800'}`}>
                        {getSectionLabel(section.type)}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                        {section.type}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    {/* Move Up */}
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => onMoveSection(idx, 'up')}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20 transition"
                      title="Pindahkan ke atas"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    {/* Move Down */}
                    <button
                      type="button"
                      disabled={idx === sortedSections.length - 1}
                      onClick={() => onMoveSection(idx, 'down')}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20 transition"
                      title="Pindahkan ke bawah"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => onDeleteSection(section.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Hapus section"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Theme Settings */}
      {activeTab === 'theme' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Palet Preset
            </label>
            <div className="grid grid-cols-2 gap-2">
              {COLOR_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    onUpdateTheme({
                      ...theme,
                      primaryColor: preset.primary,
                      secondaryColor: preset.secondary,
                      backgroundColor: preset.bg,
                    })
                  }
                  className="p-2.5 rounded-xl border border-slate-200 text-left hover:border-slate-300 transition group flex items-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: preset.primary }} />
                  <span className="text-xs font-medium text-slate-800 truncate">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Warna Utama (Primary / Tombol)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.primaryColor || '#2563eb'}
                  onChange={(e) => onUpdateTheme({ ...theme, primaryColor: e.target.value })}
                  className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={theme.primaryColor || '#2563eb'}
                  onChange={(e) => onUpdateTheme({ ...theme, primaryColor: e.target.value })}
                  className="flex-1 text-xs font-mono px-3 py-2 border border-slate-200 rounded-lg outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Warna Sekunder / Heading
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={theme.secondaryColor || '#0f172a'}
                  onChange={(e) => onUpdateTheme({ ...theme, secondaryColor: e.target.value })}
                  className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={theme.secondaryColor || '#0f172a'}
                  onChange={(e) => onUpdateTheme({ ...theme, secondaryColor: e.target.value })}
                  className="flex-1 text-xs font-mono px-3 py-2 border border-slate-200 rounded-lg outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Gaya Tipografi Font
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateTheme({ ...theme, font: 'sans' })}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition ${
                    theme.font === 'sans'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Modern Sans
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateTheme({ ...theme, font: 'serif' })}
                  className={`py-2 px-3 text-xs font-serif font-semibold rounded-lg border transition ${
                    theme.font === 'serif'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Classic Serif
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Business Information */}
      {activeTab === 'business' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Bisnis
            </label>
            <input
              type="text"
              value={businessInfo.name || ''}
              onChange={(e) => onUpdateBusinessInfo({ ...businessInfo, name: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Slug URL Landing Page
            </label>
            <div className="flex items-center">
              <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-2 border border-r-0 border-slate-200 rounded-l-lg select-none">
                /sites/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => onUpdateSlug(e.target.value)}
                className="flex-1 text-xs px-2.5 py-2 border border-slate-200 rounded-r-lg outline-none font-mono focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Hanya huruf kecil, angka, dan tanda hubung (-)</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nomor WhatsApp
            </label>
            <input
              type="text"
              value={businessInfo.whatsapp || ''}
              onChange={(e) => onUpdateBusinessInfo({ ...businessInfo, whatsapp: e.target.value })}
              placeholder="Contoh: 6281234567890"
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Lokasi / Alamat
            </label>
            <input
              type="text"
              value={businessInfo.location || ''}
              onChange={(e) => onUpdateBusinessInfo({ ...businessInfo, location: e.target.value })}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Instagram Handle
            </label>
            <input
              type="text"
              value={businessInfo.instagram || ''}
              onChange={(e) => onUpdateBusinessInfo({ ...businessInfo, instagram: e.target.value })}
              placeholder="@namabisnis"
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
    </aside>
  );
};
