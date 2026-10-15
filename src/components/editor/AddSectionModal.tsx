import React from 'react';
import { SectionType } from '../../types/schema';
import {
  X,
  Compass,
  Sparkles,
  UserCheck,
  ShoppingBag,
  Award,
  Image,
  MessageSquare,
  Flame,
  MapPin,
  FileText,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddSection: (type: SectionType, defaultContent: any) => void;
  businessName: string;
}

interface SectionOption {
  type: SectionType;
  title: string;
  description: string;
  icon: React.ReactNode;
  defaultContent: (name: string) => any;
}

export const AddSectionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAddSection,
  businessName,
}) => {
  if (!isOpen) return null;

  const SECTION_OPTIONS: SectionOption[] = [
    {
      type: 'hero',
      title: 'Hero Banner',
      description: 'Header utama dengan headline persuasif, tombol WhatsApp, dan foto produk.',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      defaultContent: (name) => ({
        badge: '✨ Selamat Datang',
        title: `${name} — Solusi Tepat untuk Kebutuhan Anda`,
        description: 'Kami memberikan layanan terbaik dengan dedikasi tinggi dan kepuasan terjamin.',
        buttonText: 'Hubungi via WhatsApp',
        buttonUrl: '#contact',
        secondaryButtonText: 'Lihat Layanan',
        secondaryButtonUrl: '#services',
        imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80',
        alignment: 'left',
      }),
    },
    {
      type: 'about',
      title: 'Tentang Kami (About)',
      description: 'Ceritakan kisah, visi, poin keunggulan, dan pencapaian bisnis Anda.',
      icon: <UserCheck className="w-5 h-5 text-blue-500" />,
      defaultContent: (name) => ({
        badge: 'Tentang Kami',
        title: `Kisah Perjalanan & Dedikasi ${name}`,
        story: 'Kami memulai usaha ini dengan satu tujuan: memberikan pengalaman terbaik dan kualitas tanpa kompromi untuk seluruh pelanggan setia kami.',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
        stats: [
          { label: 'Pelanggan Puas', value: '1.000+' },
          { label: 'Rating Ulasan', value: '4.9 ⭐' },
          { label: 'Pelayanan Ramah', value: '100%' },
        ],
        highlights: [
          'Pengalaman terpercaya di bidangnya',
          'Respon cepat dan harga kompetitif',
          'Garansi kepuasan pelanggan',
        ],
      }),
    },
    {
      type: 'services',
      title: 'Layanan & Produk (Services)',
      description: 'Katalog daftar produk, menu, atau layanan beserta rincian tarif.',
      icon: <ShoppingBag className="w-5 h-5 text-emerald-500" />,
      defaultContent: () => ({
        badge: 'Pilihan Layanan',
        title: 'Layanan Favorit Kami',
        subtitle: 'Pilihan paket terbaik yang dapat disesuaikan dengan kebutuhan Anda.',
        items: [
          {
            title: 'Paket Basic',
            description: 'Layanan standar lengkap untuk pemula dengan harga sangat terjangkau.',
            price: 'Rp 50.000',
            icon: 'check',
          },
          {
            title: 'Paket Pro / Unggulan',
            description: 'Layanan premium paling diminati pelanggan dengan fitur terlengkap.',
            price: 'Rp 100.000',
            icon: 'sparkles',
          },
          {
            title: 'Layanan Kustom',
            description: 'Konsultasikan kebutuhan spesifik Anda untuk penawaran khusus.',
            price: 'Sesuai Kebutuhan',
            icon: 'award',
          },
        ],
      }),
    },
    {
      type: 'features',
      title: 'Keunggulan (Why Us)',
      description: 'Alasan utama pelanggan harus memilih bisnis Anda dibanding kompetitor.',
      icon: <Award className="w-5 h-5 text-purple-500" />,
      defaultContent: () => ({
        badge: 'Mengapa Memilih Kami',
        title: 'Standar Kualitas Tertinggi untuk Anda',
        subtitle: 'Kami berkomitmen memberikan pengalaman terbaik di setiap transaksi.',
        items: [
          {
            title: 'Proses Cepat & Tepat',
            description: 'Waktu Anda sangat berharga, kami selalu menyelesaikan pesanan tepat waktu.',
            icon: 'clock',
          },
          {
            title: '100% Bergaransi',
            description: 'Jaminan kualitas layanan yang aman, nyaman, dan terpercaya.',
            icon: 'shield',
          },
          {
            title: 'Pelayanan Ramah',
            description: 'Tim kami selalu siap menjawab setiap pertanyaan dengan hangat.',
            icon: 'smile',
          },
        ],
      }),
    },
    {
      type: 'gallery',
      title: 'Galeri Foto (Gallery)',
      description: 'Tampilkan foto suasana tempat, hasil karya, atau dokumentasi produk.',
      icon: <Image className="w-5 h-5 text-pink-500" />,
      defaultContent: () => ({
        badge: 'Dokumentasi',
        title: 'Galeri Momen & Karya Kami',
        subtitle: 'Lihat langsung kualitas dan keaslian suasana layanan kami.',
        images: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
            caption: 'Suasana Nyaman',
          },
          {
            imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
            caption: 'Kualitas Terjaga',
          },
          {
            imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
            caption: 'Bahan Pilihan',
          },
          {
            imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80',
            caption: 'Area Ramah Pelanggan',
          },
        ],
      }),
    },
    {
      type: 'testimonials',
      title: 'Ulasan Pelanggan (Testimonials)',
      description: 'Tingkatkan kepercayaan pengunjung dengan review dan rating dari pelanggan.',
      icon: <MessageSquare className="w-5 h-5 text-indigo-500" />,
      defaultContent: (name) => ({
        badge: 'Kata Pelanggan',
        title: 'Apa Kata Mereka yang Sudah Mencoba?',
        subtitle: 'Ulasan nyata dari para pelanggan setia kami.',
        items: [
          {
            name: 'Rian Hidayat',
            role: 'Pelanggan Setia',
            comment: `Sangat puas dengan pelayanan ${name}! Responnya kilat dan hasilnya melebihi ekspektasi.`,
            rating: 5,
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          },
          {
            name: 'Dewi Lestari',
            role: 'Klien',
            comment: 'Tempatnya nyaman, pelayanannya sangat sopan dan profesional. Pasti akan balik lagi!',
            rating: 5,
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          },
        ],
      }),
    },
    {
      type: 'cta',
      title: 'Call to Action (CTA)',
      description: 'Banner ajakan bertindak untuk mengonversi pengunjung menjadi pembeli via WhatsApp.',
      icon: <Flame className="w-5 h-5 text-rose-500" />,
      defaultContent: (name) => ({
        badge: 'Peluang Terbatas',
        title: `Ingin Berkonsultasi atau Memesan di ${name}?`,
        description: 'Hubungi admin kami sekarang via WhatsApp dan dapatkan penawaran spesial hari ini.',
        buttonText: 'Chat WhatsApp Sekarang',
        buttonUrl: '#contact',
        note: 'Respon cepat setiap hari!',
      }),
    },
    {
      type: 'contact',
      title: 'Kontak & Lokasi (Contact)',
      description: 'Informasi alamat lengkap, tombol chat WhatsApp, jam buka, dan sosial media.',
      icon: <MapPin className="w-5 h-5 text-teal-500" />,
      defaultContent: () => ({
        badge: 'Lokasi & Kontak',
        title: 'Kunjungi atau Hubungi Kami',
        subtitle: 'Kami buka setiap hari untuk menyambut Anda.',
        address: 'Jl. Utama Bisnis No. 10, Pusat Kota',
        phone: '0812-3456-7890',
        whatsapp: '6281234567890',
        operatingHours: 'Setiap Hari: 08.00 - 21.00 WIB',
        email: 'kontak@usaha.com',
        instagram: '@usahalokal',
      }),
    },
    {
      type: 'navbar',
      title: 'Navigation Bar',
      description: 'Menu navigasi di bagian atas dengan logo, link menu, dan tombol order.',
      icon: <Compass className="w-5 h-5 text-slate-700" />,
      defaultContent: (name) => ({
        brandName: name,
        links: [
          { label: 'Tentang', href: '#about' },
          { label: 'Layanan', href: '#services' },
          { label: 'Kontak', href: '#contact' },
        ],
        ctaText: 'Pesan Sekarang',
        ctaUrl: '#contact',
        phone: '0812-3456-7890',
      }),
    },
    {
      type: 'footer',
      title: 'Footer',
      description: 'Bagian penutup paling bawah dengan copyright dan tautan media sosial.',
      icon: <FileText className="w-5 h-5 text-slate-500" />,
      defaultContent: (name) => ({
        tagline: `${name} — Mitra Terbaik untuk Anda.`,
        copyrightText: `© 2026 ${name}. Hak cipta dilindungi undang-undang.`,
        socialLinks: [{ platform: 'whatsapp', url: 'https://wa.me' }],
      }),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Tambah Section Baru</h3>
            <p className="text-xs text-slate-500">Pilih jenis section yang ingin ditambahkan ke landing page Anda.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {SECTION_OPTIONS.map((opt) => (
            <button
              key={opt.type}
              type="button"
              onClick={() => {
                onAddSection(opt.type, opt.defaultContent(businessName));
                onClose();
              }}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition group flex items-start gap-3.5"
            >
              <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-white group-hover:shadow-xs transition shrink-0">
                {opt.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                  {opt.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                  {opt.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
