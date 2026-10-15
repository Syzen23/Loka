import { GoogleGenAI } from '@google/genai';
import { BusinessInfo, SectionContent, SectionType, ThemeConfig } from '../types/schema';

export interface GeneratedWebsiteData {
  business: {
    name: string;
    category: string;
    tagline?: string;
    location: string;
  };
  theme: ThemeConfig;
  sections: Array<{
    type: SectionType;
    content: SectionContent;
  }>;
}

export async function generateWebsiteWithGemini(businessInfo: BusinessInfo): Promise<GeneratedWebsiteData> {
  const apiKey = process.env.GEMINI_API_KEY;

  // Curated category photography helper
  const categoryImages: Record<string, string[]> = {
    coffee: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    ],
    barber: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
    ],
    laundry: [
      'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80',
    ],
    food: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    ],
    service: [
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
    ],
  };

  // Determine palette style
  const stylePalettes: Record<string, ThemeConfig> = {
    modern: { primaryColor: '#2563eb', secondaryColor: '#0f172a', font: 'sans', accentColor: '#38bdf8', backgroundColor: '#f8fafc' },
    minimalist: { primaryColor: '#18181b', secondaryColor: '#71717a', font: 'sans', accentColor: '#09090b', backgroundColor: '#fafafa' },
    warm: { primaryColor: '#b45309', secondaryColor: '#1c1917', font: 'sans', accentColor: '#f59e0b', backgroundColor: '#fffbeb' },
    bold: { primaryColor: '#dc2626', secondaryColor: '#111827', font: 'sans', accentColor: '#f97316', backgroundColor: '#fef2f2' },
    elegant: { primaryColor: '#0f766e', secondaryColor: '#134e4a', font: 'serif', accentColor: '#14b8a6', backgroundColor: '#f0fdfa' },
  };

  const chosenStyle = businessInfo.preferredStyle || 'modern';
  const defaultTheme = stylePalettes[chosenStyle] || stylePalettes.modern;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const prompt = `
Anda adalah seorang Creative Director, Senior Copywriter, dan Website Architect untuk platform SaaS builder landing page UMKM Indonesia.
Tugas Anda adalah menghasilkan struktur konten lengkap landing page bisnis lokal dalam format JSON murni.

Informasi Bisnis Pengguna:
- Nama Bisnis: ${businessInfo.name}
- Kategori: ${businessInfo.category}
- Deskripsi: ${businessInfo.description}
- Lokasi: ${businessInfo.location}
- Nomor WhatsApp: ${businessInfo.whatsapp}
- Instagram: ${businessInfo.instagram || '-'}
- Layanan / Produk Utama: ${businessInfo.services || '-'}
- Target Pelanggan: ${businessInfo.targetCustomer || '-'}
- Gaya Visual Pilihan: ${businessInfo.preferredStyle || 'modern'}

Instruksi Output:
- Hasilkan copywriting persuasif, profesional, komunikatif dalam Bahasa Indonesia yang alami dan memikat bagi pelanggan lokal.
- Sertakan link WhatsApp langsung (https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}?text=Halo%20${encodeURIComponent(businessInfo.name)},%20saya%20ingin%20tanya) pada tombol CTA.
- Format response HARUS JSON valid dengan struktur:
{
  "business": {
    "name": "${businessInfo.name}",
    "category": "${businessInfo.category}",
    "tagline": "...",
    "location": "${businessInfo.location}"
  },
  "theme": {
    "primaryColor": "${defaultTheme.primaryColor}",
    "secondaryColor": "${defaultTheme.secondaryColor}",
    "font": "${defaultTheme.font}",
    "accentColor": "${defaultTheme.accentColor}"
  },
  "sections": [
    {
      "type": "navbar",
      "content": {
        "brandName": "${businessInfo.name}",
        "links": [
          { "label": "Tentang", "href": "#about" },
          { "label": "Layanan", "href": "#services" },
          { "label": "Keunggulan", "href": "#features" },
          { "label": "Kontak", "href": "#contact" }
        ],
        "ctaText": "Hubungi Kami",
        "ctaUrl": "https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}",
        "phone": "${businessInfo.whatsapp}"
      }
    },
    {
      "type": "hero",
      "content": {
        "badge": "...",
        "title": "...",
        "description": "...",
        "buttonText": "Pesan via WhatsApp",
        "buttonUrl": "https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}?text=Halo%20${encodeURIComponent(businessInfo.name)}",
        "secondaryButtonText": "Lihat Layanan",
        "secondaryButtonUrl": "#services",
        "imageUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
        "alignment": "left"
      }
    },
    {
      "type": "about",
      "content": {
        "badge": "Tentang Kami",
        "title": "...",
        "story": "...",
        "imageUrl": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
        "stats": [
          { "label": "Pelanggan Terlayani", "value": "1.000+" },
          { "label": "Kepuasan", "value": "99%" },
          { "label": "Pengalaman", "value": "5+ Tahun" }
        ],
        "highlights": ["...", "...", "..."]
      }
    },
    {
      "type": "services",
      "content": {
        "badge": "Layanan Kami",
        "title": "...",
        "subtitle": "...",
        "items": [
          { "title": "...", "description": "...", "price": "Rp ...", "icon": "check" },
          { "title": "...", "description": "...", "price": "Rp ...", "icon": "sparkles" },
          { "title": "...", "description": "...", "price": "Rp ...", "icon": "award" }
        ]
      }
    },
    {
      "type": "features",
      "content": {
        "badge": "Kenapa Memilih Kami",
        "title": "...",
        "subtitle": "...",
        "items": [
          { "title": "...", "description": "...", "icon": "shield" },
          { "title": "...", "description": "...", "icon": "clock" },
          { "title": "...", "description": "...", "icon": "smile" }
        ]
      }
    },
    {
      "type": "testimonials",
      "content": {
        "badge": "Ulasan Pelanggan",
        "title": "Apa Kata Mereka",
        "subtitle": "...",
        "items": [
          {
            "name": "Budi Santoso",
            "role": "Pelanggan Setia",
            "comment": "...",
            "rating": 5,
            "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
          },
          {
            "name": "Siti Rahma",
            "role": "Klien Lokal",
            "comment": "...",
            "rating": 5,
            "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
          }
        ]
      }
    },
    {
      "type": "cta",
      "content": {
        "badge": "Tunggu Apa Lagi?",
        "title": "...",
        "description": "...",
        "buttonText": "Chat WhatsApp Sekarang",
        "buttonUrl": "https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}?text=Halo%20${encodeURIComponent(businessInfo.name)},%20saya%20tertarik",
        "note": "Konsultasi gratis & respon cepat!"
      }
    },
    {
      "type": "contact",
      "content": {
        "badge": "Hubungi Kami",
        "title": "Kunjungi Lokasi Kami",
        "subtitle": "Kami siap menyambut Anda dengan senang hati.",
        "address": "${businessInfo.location}",
        "phone": "${businessInfo.whatsapp}",
        "whatsapp": "${businessInfo.whatsapp}",
        "email": "info@${businessInfo.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com",
        "operatingHours": "Buka Setiap Hari: 08.00 - 21.00 WIB",
        "instagram": "${businessInfo.instagram || ''}"
      }
    },
    {
      "type": "footer",
      "content": {
        "tagline": "${businessInfo.name} — Pilihan Utama di ${businessInfo.location}",
        "copyrightText": "© 2026 ${businessInfo.name}. All rights reserved.",
        "socialLinks": [
          { "platform": "whatsapp", "url": "https://wa.me/${businessInfo.whatsapp.replace(/\D/g, '')}" }
        ]
      }
    }
  ]
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const rawText = response.text?.trim() || '';
      if (rawText) {
        const parsed = JSON.parse(rawText) as GeneratedWebsiteData;
        if (parsed.sections && Array.isArray(parsed.sections) && parsed.sections.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Gemini AI generation error, falling back to smart dynamic generator:', err);
    }
  }

  // High quality local fallback generator when API key is not configured or fails
  const cleanPhone = businessInfo.whatsapp.replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=Halo%20${encodeURIComponent(businessInfo.name)},%20saya%20tertarik%20dengan%20layanan%20Anda`;

  return {
    business: {
      name: businessInfo.name,
      category: businessInfo.category,
      tagline: `Solusi Terbaik ${businessInfo.category} Terpercaya di ${businessInfo.location}`,
      location: businessInfo.location,
    },
    theme: defaultTheme,
    sections: [
      {
        type: 'navbar',
        content: {
          brandName: businessInfo.name,
          links: [
            { label: 'Tentang Kami', href: '#about' },
            { label: 'Layanan', href: '#services' },
            { label: 'Keunggulan', href: '#features' },
            { label: 'Kontak', href: '#contact' },
          ],
          ctaText: 'Hubungi Kami',
          ctaUrl: waUrl,
          phone: businessInfo.whatsapp,
        },
      },
      {
        type: 'hero',
        content: {
          badge: `⭐ Pilihan Terbaik di ${businessInfo.location}`,
          title: `${businessInfo.name}: Kualitas Prima & Pelayanan Ramah untuk Anda`,
          description: businessInfo.description,
          buttonText: 'Pesan Sekarang via WhatsApp',
          buttonUrl: waUrl,
          secondaryButtonText: 'Pelajari Layanan Kami',
          secondaryButtonUrl: '#services',
          imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80',
          alignment: 'left',
        },
      },
      {
        type: 'about',
        content: {
          badge: 'Tentang Kami',
          title: `Membangun Kepercayaan Sejak Hari Pertama di ${businessInfo.location}`,
          story: `${businessInfo.name} berdedikasi menghadirkan standar layanan ${businessInfo.category} bermutu tinggi. Kami mengedepankan kepuasan pelanggan, kejujuran, dan pengerjaan tepat waktu untuk setiap pelanggan kami.`,
          imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
          stats: [
            { label: 'Pelanggan Puas', value: '1.200+' },
            { label: 'Rating Ulasan', value: '4.9 ⭐' },
            { label: 'Dedikasi Layanan', value: '100%' },
          ],
          highlights: [
            'Dikerjakan oleh tim yang berpengalaman dan teliti',
            'Harga terjangkau dengan mutu terbaik di kelasnya',
            'Layanan cepat dan responsif melalui WhatsApp',
          ],
        },
      },
      {
        type: 'services',
        content: {
          badge: 'Produk & Layanan',
          title: `Layanan Unggulan ${businessInfo.name}`,
          subtitle: 'Pilihan layanan komprehensif yang dirancang untuk kenyamanan dan kebutuhan Anda.',
          items: [
            {
              title: `Paket Reguler ${businessInfo.category}`,
              description: `Solusi harian lengkap dengan standar kualitas terbaik untuk masyarakat ${businessInfo.location}.`,
              price: 'Harga Bersahabat',
              icon: 'check',
            },
            {
              title: `Layanan Prioritas / VIP`,
              description: 'Pengerjaan cepat dengan perhatian ekstra terhadap setiap detail pesanan Anda.',
              price: 'Paling Diminati',
              icon: 'sparkles',
            },
            {
              title: 'Konsultasi & Custom Order',
              description: 'Diskusikan kebutuhan spesifik Anda langsung dengan tim kami untuk hasil maksimal.',
              price: 'Gratis Konsultasi',
              icon: 'award',
            },
          ],
        },
      },
      {
        type: 'features',
        content: {
          badge: 'Mengapa Memilih Kami?',
          title: '3 Alasan Utama Pelanggan Mempercayai Kami',
          subtitle: 'Komitmen kami terhadap kepuasan Anda tidak pernah berkurang.',
          items: [
            {
              title: 'Respons Cepat & Ramah',
              description: 'Kami selalu siap melayani pertanyaan dan kebutuhan Anda kapan saja via WhatsApp.',
              icon: 'clock',
            },
            {
              title: 'Transparan & Bergaransi',
              description: 'Tanpa biaya tersembunyi, semua pengerjaan jelas dan transparan sejak awal.',
              icon: 'shield',
            },
            {
              title: 'Kualitas Teruji',
              description: 'Menggunakan standar kerja terbaik dan bahan pilihan demi kepuasan tahan lama.',
              icon: 'award',
            },
          ],
        },
      },
      {
        type: 'testimonials',
        content: {
          badge: 'Kata Pelanggan',
          title: `Pengalaman Nyata Bersama ${businessInfo.name}`,
          subtitle: 'Simak pengalaman menyenangkan dari para pelanggan setia kami.',
          items: [
            {
              name: 'Aris Prasetyo',
              role: 'Pelanggan di ' + businessInfo.location,
              comment: `Pelayanan di ${businessInfo.name} luar biasa cepat dan ramah! Sangat saya rekomendasikan untuk siapa saja yang butuh ${businessInfo.category}.`,
              rating: 5,
              avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            },
            {
              name: 'Nadia Safitri',
              role: 'Ibu Rumah Tangga',
              comment: 'Hasilnya memuaskan, komunikasinya sangat enak dan harga bersaing. Sukses terus untuk usahanya!',
              rating: 5,
              avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            },
          ],
        },
      },
      {
        type: 'cta',
        content: {
          badge: 'Mulai Sekarang',
          title: `Siap Menikmati Layanan Terbaik dari ${businessInfo.name}?`,
          description: `Hubungi kami sekarang juga untuk pemesanan atau konsultasi tanpa biaya. Tim kami siap membantu Anda!`,
          buttonText: 'Chat WhatsApp Sekarang',
          buttonUrl: waUrl,
          note: '⚡ Fast response via WhatsApp di jam operasional.',
        },
      },
      {
        type: 'contact',
        content: {
          badge: 'Kontak & Lokasi',
          title: 'Kunjungi atau Hubungi Kami',
          subtitle: 'Kami senang dapat melayani dan mendengar dari Anda.',
          address: businessInfo.location,
          phone: businessInfo.whatsapp,
          whatsapp: businessInfo.whatsapp,
          email: `halo@${businessInfo.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
          operatingHours: 'Setiap Hari: 08.00 - 21.00 WIB',
          instagram: businessInfo.instagram,
        },
      },
      {
        type: 'footer',
        content: {
          tagline: `${businessInfo.name} — Sahabat Terpercaya Anda di ${businessInfo.location}.`,
          copyrightText: `© 2026 ${businessInfo.name}. All rights reserved.`,
          socialLinks: [
            { platform: 'whatsapp', url: waUrl },
            ...(businessInfo.instagram ? [{ platform: 'instagram' as const, url: `https://instagram.com/${businessInfo.instagram.replace('@', '')}` }] : []),
          ],
        },
      },
    ],
  };
}
