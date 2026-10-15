import { BusinessInfo, SectionContent, SectionType, ThemeConfig } from '../types/schema';

export interface PresetTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  previewImage: string;
  businessInfo: BusinessInfo;
  theme: ThemeConfig;
  sections: Array<{
    type: SectionType;
    content: SectionContent;
  }>;
}

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'coffee-shop',
    name: 'Kopi Senja',
    category: 'Coffee Shop & Cafe',
    description: 'Template hangat dan estetik untuk kedai kopi, roastery, atau kafe kekinian.',
    previewImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    businessInfo: {
      name: 'Kopi Senja Roastery',
      category: 'Coffee Shop & Bakery',
      description: 'Menyajikan biji kopi pilihan nusantara dengan racikan barista berpengalaman dan suasana santai.',
      location: 'Jl. R.A. Kartini No. 45, Bandar Lampung',
      whatsapp: '6281234567890',
      instagram: '@kopisenja.official',
      services: 'Espresso Bar, Manual Brew, Pastry, Co-working Space',
      targetCustomer: 'Anak muda, profesional, penikmat kopi lokal',
      preferredStyle: 'warm',
    },
    theme: {
      primaryColor: '#78350f', // warm amber/brown
      secondaryColor: '#1c1917',
      font: 'sans',
      accentColor: '#d97706',
      backgroundColor: '#fef3c7',
    },
    sections: [
      {
        type: 'navbar',
        content: {
          brandName: 'Kopi Senja',
          logoUrl: '',
          links: [
            { label: 'Tentang Kami', href: '#about' },
            { label: 'Menu Favorit', href: '#services' },
            { label: 'Galeri', href: '#gallery' },
            { label: 'Kontak', href: '#contact' },
          ],
          ctaText: 'Pesan Sekarang',
          ctaUrl: 'https://wa.me/6281234567890?text=Halo%20Kopi%20Senja,%20saya%20ingin%20pesan',
          phone: '0812-3456-7890',
        },
      },
      {
        type: 'hero',
        content: {
          badge: '☕ Biji Kopi Single Origin Terbaik',
          title: 'Nikmati Secangkir Ketenangan di Tengah Hiruk Pikuk Kota',
          description: 'Dari kebun kopi terbaik di Nusantara langsung ke cangkir Anda. Suasana nyaman untuk nongkrong, bekerja, dan bercengkrama.',
          buttonText: 'Lihat Menu & Pesan via WA',
          buttonUrl: 'https://wa.me/6281234567890?text=Halo%20Kopi%20Senja,%20saya%20ingin%20melihat%20menu%20dan%20pesan',
          secondaryButtonText: 'Lokasi Kami',
          secondaryButtonUrl: '#contact',
          imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
          alignment: 'left',
        },
      },
      {
        type: 'about',
        content: {
          badge: 'Tentang Kopi Senja',
          title: 'Dedikasi untuk Cita Rasa Kopi Otentik Nusantara',
          story: 'Berdiri sejak 2019, Kopi Senja berawal dari kecintaan kami terhadap petani kopi lokal di Sumatra dan Jawa. Kami memanggang biji kopi kami sendiri (in-house roasting) untuk memastikan profil rasa yang kaya, segar, dan berkarakter di setiap tegukan.',
          imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=80',
          stats: [
            { label: 'Cangkir Tersaji / Bulan', value: '8.500+' },
            { label: 'Varian Biji Kopi', value: '14+' },
            { label: 'Rating Google Maps', value: '4.9 ⭐' },
          ],
          highlights: [
            'Biji kopi 100% Arabika & Robusta grade specialty',
            'Ruang indoor ber-AC & area outdoor asri',
            'Wi-Fi cepat dan stopkontak di setiap meja',
          ],
        },
      },
      {
        type: 'services',
        content: {
          badge: 'Menu Pilihan',
          title: 'Racikan Signature & Teman Bersantai',
          subtitle: 'Koleksi minuman kopi racikan barista serta aneka camilan fresh baked harian.',
          items: [
            {
              title: 'Es Kopi Susu Senja',
              description: 'Espresso kental dengan gula aren murni organik dan susu segar gurih.',
              price: 'Rp 22.000',
              icon: 'coffee',
              imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Manual Brew V60 Gayo',
              description: 'Seduhan tangan dengan aroma floral, notes jeruk manis dan aftertaste bersih.',
              price: 'Rp 28.000',
              icon: 'flame',
              imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Croissant Butter & Almond',
              description: 'Pastry renyah berlapis dengan mentega Prancis asli, dipanggang hangat setiap pagi.',
              price: 'Rp 25.000',
              icon: 'utensils',
              imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Matcha Latte Uji',
              description: 'Bubuk matcha murni Jepang berpadu lembut dengan oat milk creamy.',
              price: 'Rp 26.000',
              icon: 'sparkles',
              imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
            },
          ],
        },
      },
      {
        type: 'features',
        content: {
          badge: 'Kenapa Memilih Kami',
          title: 'Lebih dari Sekadar Tempat Ngopi',
          subtitle: 'Kenyamanan dan kepuasan Anda adalah prioritas utama setiap hari.',
          items: [
            {
              title: 'Biji Segar Roasting Sendiri',
              description: 'Kami mengontrol profile sangrai biji kopi setiap minggu demi kualitas aroma prima.',
              icon: 'award',
            },
            {
              title: 'Ramah WFC (Work From Cafe)',
              description: 'Koneksi internet fiber 100 Mbps, colokan listrik memadai, dan musik chill.',
              icon: 'wifi',
            },
            {
              title: 'Pelayanan Ramah & Hangat',
              description: 'Barista kami siap merekomendasikan racikan yang paling pas dengan selera Anda.',
              icon: 'smile',
            },
          ],
        },
      },
      {
        type: 'gallery',
        content: {
          badge: 'Suasana Kedai',
          title: 'Galeri Momen di Kopi Senja',
          subtitle: 'Intip suasana hangat dan kebersamaan para pelanggan setia kami.',
          images: [
            {
              imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
              caption: 'Area Indoor Cozy',
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
              caption: 'Pour Over V60 Experience',
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
              caption: 'Fresh Roasted Beans',
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80',
              caption: 'Outdoor Garden Corner',
            },
          ],
        },
      },
      {
        type: 'testimonials',
        content: {
          badge: 'Kata Mereka',
          title: 'Apa Kata Pelanggan Kopi Senja',
          subtitle: 'Testimoni nyata dari pelanggan yang sering menghabiskan sore di tempat kami.',
          items: [
            {
              name: 'Dimas Wicaksono',
              role: 'Product Designer',
              comment: 'Tempat ternyaman untuk kerja remote! Kopinya mantap, kopsu arennya balance banget nggak terlalu manis. Selalu balik ke sini minimal 3 kali seminggu.',
              rating: 5,
              avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            },
            {
              name: 'Anindya Putri',
              role: 'Penikmat Kopi',
              comment: 'Manual brew-nya juara! Baristanya ramah banget mau jelasin asal biji kopi dan cara seduhnya. Croissant-nya juga flaky dan renyah.',
              rating: 5,
              avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
            },
          ],
        },
      },
      {
        type: 'cta',
        content: {
          badge: 'Reservasi & Takeaway',
          title: 'Mau Booking Tempat atau Pesan Antar?',
          description: 'Hubungi barista kami via WhatsApp untuk reservasi meja meeting, pemesanan katering, atau order takeaway tanpa antre.',
          buttonText: 'Hubungi Kami via WhatsApp',
          buttonUrl: 'https://wa.me/6281234567890?text=Halo%20Kopi%20Senja,%20saya%20mau%20reservasi%20atau%20tanya%20menu',
          note: '⚡ Respon cepat dalam 5 - 15 menit setiap hari kerja.',
        },
      },
      {
        type: 'contact',
        content: {
          badge: 'Lokasi & Kontak',
          title: 'Kunjungi Kedai Kopi Senja',
          subtitle: 'Kami buka setiap hari untuk menyambut Anda.',
          address: 'Jl. R.A. Kartini No. 45, Palapa, Kec. Tj. Karang Pusat, Kota Bandar Lampung',
          phone: '0812-3456-7890',
          whatsapp: '6281234567890',
          email: 'halo@kopisenja.id',
          operatingHours: 'Senin - Minggu: 08.00 - 23.00 WIB',
          instagram: '@kopisenja.official',
        },
      },
      {
        type: 'footer',
        content: {
          tagline: 'Kopi Senja — Menemani Setiap Cerita dan Karya Anda.',
          copyrightText: '© 2026 Kopi Senja Roastery. All rights reserved.',
          socialLinks: [
            { platform: 'whatsapp', url: 'https://wa.me/6281234567890' },
            { platform: 'instagram', url: 'https://instagram.com/kopisenja.official' },
            { platform: 'maps', url: 'https://maps.google.com' },
          ],
          quickLinks: [
            { label: 'Menu', href: '#services' },
            { label: 'Tentang', href: '#about' },
            { label: 'Kontak', href: '#contact' },
          ],
        },
      },
    ],
  },
  {
    id: 'barbershop',
    name: 'Gentlemen\'s Cut',
    category: 'Barbershop & Grooming',
    description: 'Template maskulin, elegan, dan profesional untuk barbershop, salon pria, dan grooming studio.',
    previewImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    businessInfo: {
      name: 'Gentlemen\'s Cut Barbershop',
      category: 'Barbershop & Men Grooming',
      description: 'Cukur rambut presisi dengan barber berpengalaman, pijat relaksasi kepala, dan produk pomade premium.',
      location: 'Jl. Ahmad Yani No. 18, Jakarta Selatan',
      whatsapp: '6281399887766',
      instagram: '@gentlemenscut.jkt',
      services: 'Classic Haircut, Beard Trim & Shave, Hair Spa & Coloring, Hot Towel Service',
      targetCustomer: 'Pria modern, eksekutif muda, mahasiswa',
      preferredStyle: 'bold',
    },
    theme: {
      primaryColor: '#0f172a', // deep navy slate
      secondaryColor: '#ca8a04', // golden bronze
      font: 'sans',
      accentColor: '#eab308',
      backgroundColor: '#f8fafc',
    },
    sections: [
      {
        type: 'navbar',
        content: {
          brandName: 'Gentlemen\'s Cut',
          links: [
            { label: 'Layanan', href: '#services' },
            { label: 'Keunggulan', href: '#features' },
            { label: 'Testimoni', href: '#testimonials' },
            { label: 'Lokasi', href: '#contact' },
          ],
          ctaText: 'Booking Jadwal',
          ctaUrl: 'https://wa.me/6281399887766?text=Halo%20Gentlemen%27s%20Cut,%20saya%20ingin%20booking%20jadwal%20cukur',
          phone: '0813-9988-7766',
        },
      },
      {
        type: 'hero',
        content: {
          badge: '✂️ Premium Men Grooming Experience',
          title: 'Tampil Percaya Diri dengan Potongan Rambut Presisi',
          description: 'Kombinasi teknik pangkas klasik dan modern oleh barber master. Dapatkan gaya rambut terbaik yang cocok dengan bentuk wajah Anda.',
          buttonText: 'Booking via WhatsApp Sekarang',
          buttonUrl: 'https://wa.me/6281399887766?text=Halo%20Gentlemen%27s%20Cut,%20saya%20ingin%20booking%20jadwal',
          secondaryButtonText: 'Daftar Layanan & Harga',
          secondaryButtonUrl: '#services',
          imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
          alignment: 'left',
        },
      },
      {
        type: 'about',
        content: {
          badge: 'Tentang Kami',
          title: 'Lebih dari Sekadar Cukur, Ini Soal Karakter',
          story: 'Didirikan dengan filosofi bahwa setiap pria berhak atas penampilan terbaiknya. Kami menghadirkan suasana barbershop vintage modern dengan higienitas sterilisasi alat 100%, handuk hangat aromaterapi, dan konsultasi gaya rambut gratis.',
          imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1000&q=80',
          stats: [
            { label: 'Pelanggan Puas', value: '12.000+' },
            { label: 'Barber Tersertifikasi', value: '8 Orang' },
            { label: 'Tahun Pengalaman', value: '7 Tahun' },
          ],
          highlights: [
            'Sterilisasi pisau dan clipper setiap sesi',
            'Ruang tunggu ber-AC dilengkapi PlayStation 5 & kopi gratis',
            'Garansi potongan rambut rapi sesuai keinginan',
          ],
        },
      },
      {
        type: 'services',
        content: {
          badge: 'Paket & Tarif',
          title: 'Layanan Perawatan Pria Terlengkap',
          subtitle: 'Harga transparan tanpa biaya tersembunyi. Layanan sudah termasuk keramas dan styling pomade.',
          items: [
            {
              title: 'Signature Gentleman Cut',
              description: 'Konsultasi gaya, cuci rambut, potong presisi, pijat bahu & leher, finishing pomade premium.',
              price: 'Rp 65.000',
              icon: 'scissors',
              imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Beard Sculpting & Hot Towel',
              description: 'Bentuk dan rapikan jenggot dengan razor tajam, kompres handuk hangat essential oil.',
              price: 'Rp 45.000',
              icon: 'smile',
              imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Gentleman Hair Spa & Scrub',
              description: 'Perawatan kulit kepala anti-ketombe dengan masker mint pendingin dan pijat relaksasi mendalam.',
              price: 'Rp 75.000',
              icon: 'sparkles',
              imageUrl: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Father & Son Combo',
              description: 'Paket potong rambut ayah dan anak dengan pengalaman menyenangkan dan harga hemat.',
              price: 'Rp 110.000',
              icon: 'users',
              imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80',
            },
          ],
        },
      },
      {
        type: 'features',
        content: {
          badge: 'Standar Kualitas',
          title: 'Alasan Pelanggan Selalu Kembali',
          subtitle: 'Kami mengutamakan presisi, kebersihan, dan kenyamanan waktu Anda.',
          items: [
            {
              title: 'Tanpa Antre Lama',
              description: 'Sistem booking terjadwal via WhatsApp, langsung dilayani saat Anda datang tepat waktu.',
              icon: 'clock',
            },
            {
              title: 'Barber Berpengalaman',
              description: 'Semua barber telah melalui pelatihan styling fade, crop, quiff, dan classic taper.',
              icon: 'award',
            },
            {
              title: 'Higienis & Steril',
              description: 'Alat cukur disterilkan menggunakan UV sterilizer dan disinfectant standar medis.',
              icon: 'shield',
            },
          ],
        },
      },
      {
        type: 'testimonials',
        content: {
          badge: 'Review Pelanggan',
          title: 'Kepercayaan Pelanggan Setia Kami',
          subtitle: 'Lihat apa yang mereka rasakan setelah potong rambut di Gentlemen\'s Cut.',
          items: [
            {
              name: 'Reza Rahardian',
              role: 'Konsultan Keuangan',
              comment: 'Sudah 3 tahun langganan di sini. Barbernya detail banget, potongannya selalu simetris dan rapi. Pijat pundaknya bikin capek kerja hilang!',
              rating: 5,
              avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
            },
            {
              name: 'Bintang Pratama',
              role: 'Content Creator',
              comment: 'Tempat cukur paling rekomen di Jaksel. Booking via WA gampang, tempatnya adem dan wangi, hasil potongan rambut selalu on point buat shooting.',
              rating: 5,
              avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
            },
          ],
        },
      },
      {
        type: 'cta',
        content: {
          badge: 'Jadwalkan Penampilan Baru',
          title: 'Sudah Waktunya Rapikan Rambut Anda?',
          description: 'Pilih barber favorit Anda dan tentukan jam kedatangan tanpa repot mengantre.',
          buttonText: 'Booking Jadwal Cukur via WhatsApp',
          buttonUrl: 'https://wa.me/6281399887766?text=Halo%20Gentlemen%27s%20Cut,%20saya%20mau%20booking%20jadwal%20hari%20ini',
          note: 'Buka setiap hari mulai pukul 10.00 hingga 21.00 WIB.',
        },
      },
      {
        type: 'contact',
        content: {
          badge: 'Studio Kami',
          title: 'Temukan Gentlemen\'s Cut Terdekat',
          subtitle: 'Parkir luas dan nyaman untuk kendaraan roda dua maupun roda empat.',
          address: 'Jl. Ahmad Yani No. 18, Kebayoran Baru, Jakarta Selatan, 12150',
          phone: '0813-9988-7766',
          whatsapp: '6281399887766',
          email: 'contact@gentlemenscut.id',
          operatingHours: 'Senin - Minggu: 10.00 - 21.00 WIB',
          instagram: '@gentlemenscut.jkt',
        },
      },
      {
        type: 'footer',
        content: {
          tagline: 'Gentlemen\'s Cut — Defined Style, Confident You.',
          copyrightText: '© 2026 Gentlemen\'s Cut Studio. All rights reserved.',
          socialLinks: [
            { platform: 'whatsapp', url: 'https://wa.me/6281399887766' },
            { platform: 'instagram', url: 'https://instagram.com/gentlemenscut.jkt' },
            { platform: 'maps', url: 'https://maps.google.com' },
          ],
        },
      },
    ],
  },
  {
    id: 'laundry',
    name: 'Kilau Express Laundry',
    category: 'Laundry Kiloan & Satuan',
    description: 'Template bersih, terpercaya, dan profesional untuk jasa laundry kiloan, bed cover, sepatu, dan cuci kilat.',
    previewImage: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
    businessInfo: {
      name: 'Kilau Express Laundry',
      category: 'Laundry & Dry Clean',
      description: 'Jasa laundry bersih, wangi tahan lama, 1 mesin 1 pelanggan (anti tertukar), dengan fasilitas antar-jemput gratis.',
      location: 'Jl. Melati Raya No. 12, Bandung',
      whatsapp: '6282112345678',
      instagram: '@kilauexpress.laundry',
      services: 'Laundry Kiloan Cuci Kering Setrika, Cuci Sepatu & Tas, Cuci Bed Cover & Selimut, Express 4 Jam',
      targetCustomer: 'Mahasiswa, keluarga muda, pekerja kantoran sibuk',
      preferredStyle: 'modern',
    },
    theme: {
      primaryColor: '#0284c7', // fresh sky/cyan blue
      secondaryColor: '#0f172a',
      font: 'sans',
      accentColor: '#38bdf8',
      backgroundColor: '#f0f9ff',
    },
    sections: [
      {
        type: 'navbar',
        content: {
          brandName: 'Kilau Express',
          links: [
            { label: 'Layanan', href: '#services' },
            { label: 'Keunggulan', href: '#features' },
            { label: 'Tarif', href: '#services' },
            { label: 'Kontak', href: '#contact' },
          ],
          ctaText: 'Pesan Antar Jemput',
          ctaUrl: 'https://wa.me/6282112345678?text=Halo%20Kilau%20Laundry,%20saya%20ingin%20jadwal%20antar%20jemput%20cucian',
          phone: '0821-1234-5678',
        },
      },
      {
        type: 'hero',
        content: {
          badge: '✨ Cuci Bersih, Higienis & Wangi 7 Hari',
          title: 'Cucian Menumpuk? Serahkan Pada Kami, Siap Pakai dan Wangi',
          description: 'Layanan laundry higienis 1 mesin 1 pelanggan. Anti tertukar, anti luntur, setrika uap rapi bergaransi. Gratis antar jemput untuk area sekitar!',
          buttonText: 'Minta Antar-Jemput via WA',
          buttonUrl: 'https://wa.me/6282112345678?text=Halo%20Kilau%20Laundry,%20tolong%20jemput%20cucian%20saya%20di%20alamat',
          secondaryButtonText: 'Cek Daftar Tarif',
          secondaryButtonUrl: '#services',
          imageUrl: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80',
          alignment: 'left',
        },
      },
      {
        type: 'features',
        content: {
          badge: 'Kenapa Kilau Laundry?',
          title: 'Komitmen Kualitas untuk Pakaian Anda',
          subtitle: 'Kami merawat pakaian Anda seperti merawat pakaian kami sendiri.',
          items: [
            {
              title: '1 Mesin 1 Pelanggan',
              description: 'Pakaian Anda tidak pernah dicampur dengan cucian orang lain. 100% higienis.',
              icon: 'shield',
            },
            {
              title: 'Deterjen Ramah Serat Kain',
              description: 'Menggunakan formula pembersih ramah lingkungan yang menjaga warna kain tetap cerah.',
              icon: 'sparkles',
            },
            {
              title: 'Gratis Jemput & Antar',
              description: 'Khusus pesanan minimal 5 kg dalam radius 3 km dari outlet kami.',
              icon: 'truck',
            },
          ],
        },
      },
      {
        type: 'services',
        content: {
          badge: 'Layanan & Biaya',
          title: 'Pilihan Layanan Sesuai Kebutuhan',
          subtitle: 'Proses cepat, pengerjaan rapi, dan kemasan rapi siap masuk lemari.',
          items: [
            {
              title: 'Cuci Komplit Reguler (2 Hari)',
              description: 'Cuci bersih, pelembut premium, setrika uap presisi, packing plastik rapi anti debu.',
              price: 'Rp 8.000 / kg',
              icon: 'check',
            },
            {
              title: 'Express 4 Jam Siap',
              description: 'Solusi kilat darurat bagi Anda yang butuh baju bersih siap pakai dalam hitungan jam.',
              price: 'Rp 16.000 / kg',
              icon: 'clock',
            },
            {
              title: 'Cuci Sepatu & Tas Sneaker Care',
              description: 'Deep clean manual khusus sepatu dan tas kanvas/kulit dengan sabun antibakteri.',
              price: 'Mulai Rp 35.000',
              icon: 'sparkles',
            },
            {
              title: 'Bed Cover & Selimut King Size',
              description: 'Pencucian bed cover tebal dengan pengering suhu stabil, kembali mengembang dan wangi.',
              price: 'Rp 30.000 / pc',
              icon: 'award',
            },
          ],
        },
      },
      {
        type: 'cta',
        content: {
          badge: 'Layanan Antar Jemput',
          title: 'Malas Keluar Rumah? Kami Jemput Cucian Anda!',
          description: 'Cukup kirimkan lokasi Anda via WhatsApp, tim kurir kami siap menjemput cucian kotor Anda tepat waktu.',
          buttonText: 'Kirim Alamat Penjemputan ke WA',
          buttonUrl: 'https://wa.me/6282112345678?text=Halo%20Kilau%20Laundry,%20saya%20ingin%20jemput%20cucian%20di%20lokasi%20saya',
          note: 'Antar jemput beroperasi pukul 08.00 - 19.00 setiap hari.',
        },
      },
      {
        type: 'contact',
        content: {
          badge: 'Outlet Kami',
          title: 'Kunjungi atau Hubungi Kilau Laundry',
          subtitle: 'Lokasi strategis dan mudah dijangkau di pusat pemukiman.',
          address: 'Jl. Melati Raya No. 12, Sukajadi, Kota Bandung, 40161',
          phone: '0821-1234-5678',
          whatsapp: '6282112345678',
          email: 'halo@kilaulaundry.id',
          operatingHours: 'Setiap Hari: 07.00 - 21.00 WIB',
          instagram: '@kilauexpress.laundry',
        },
      },
      {
        type: 'footer',
        content: {
          tagline: 'Kilau Express — Solusi Pakaian Bersih, Rapi & Wangi Tanpa Ribet.',
          copyrightText: '© 2026 Kilau Express Laundry. Hak cipta dilindungi undang-undang.',
          socialLinks: [
            { platform: 'whatsapp', url: 'https://wa.me/6282112345678' },
            { platform: 'instagram', url: 'https://instagram.com/kilauexpress.laundry' },
          ],
        },
      },
    ],
  },
  {
    id: 'restaurant',
    name: 'Dapur Nusantara',
    category: 'Restoran & Katering',
    description: 'Template menggugah selera untuk rumah makan, resto keluarga, kafe masakan nusantara, dan jasa katering.',
    previewImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    businessInfo: {
      name: 'Restoran Dapur Nusantara',
      category: 'Restoran Masakan Khas Tradisional',
      description: 'Menghadirkan resep warisan rempah Indonesia dengan bahan organik segar, cita rasa autentik, dan tempat nyaman untuk keluarga.',
      location: 'Jl. Diponegoro No. 88, Yogyakarta',
      whatsapp: '6285712349999',
      instagram: '@dapurnusantara.yk',
      services: 'Dine-in Keluarga, Paket Nasi Kotak & Tumpeng, Catering Acara Kantor, Reservasi VIP Room',
      targetCustomer: 'Keluarga, rombongan wisata, acara kantor, reuni',
      preferredStyle: 'warm',
    },
    theme: {
      primaryColor: '#b91c1c', // deep rich red / crimson
      secondaryColor: '#1c1917',
      font: 'serif',
      accentColor: '#f59e0b',
      backgroundColor: '#fef2f2',
    },
    sections: [
      {
        type: 'navbar',
        content: {
          brandName: 'Dapur Nusantara',
          links: [
            { label: 'Tentang Resep', href: '#about' },
            { label: 'Menu Andalan', href: '#services' },
            { label: 'Suasana', href: '#gallery' },
            { label: 'Reservasi', href: '#contact' },
          ],
          ctaText: 'Reservasi Meja',
          ctaUrl: 'https://wa.me/6285712349999?text=Halo%20Dapur%20Nusantara,%20saya%20ingin%20reservasi%20meja',
          phone: '0857-1234-9999',
        },
      },
      {
        type: 'hero',
        content: {
          badge: '🌶️ Cita Rasa Rempah Asli Warisan Nusantara',
          title: 'Sensasi Kuliner Otentik yang Menghangatkan Setiap Momen',
          description: 'Dari Rendang Daging Padang hingga Gurame Bakar Bumbu Madu. Diracik dengan bumbu rempah pilihan oleh koki berpengalaman 15 tahun.',
          buttonText: 'Reservasi Meja & Menu via WA',
          buttonUrl: 'https://wa.me/6285712349999?text=Halo%20Dapur%20Nusantara,%20saya%20mau%20pesan%20menu%20dan%20booking%20meja',
          secondaryButtonText: 'Lihat Menu Lengkap',
          secondaryButtonUrl: '#services',
          imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
          alignment: 'center',
        },
      },
      {
        type: 'about',
        content: {
          badge: 'Kisah Kami',
          title: 'Menjaga Kemurnian Resep Leluhur',
          story: 'Dapur Nusantara lahir dari kerinduan akan masakan rumahan Indonesia yang kaya rempah tanpa MSG berlebih. Kami hanya menggunakan rempah-rempah segar lokal, daging pilihan berkualitas, dan minyak kelapa murni untuk menciptakan hidangan yang lezat sekaligus menyehatkan.',
          imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
          stats: [
            { label: 'Porsi Terjual Harian', value: '450+' },
            { label: 'Pilihan Menu Tradisional', value: '35+' },
            { label: 'Ulasan Positif di Google', value: '4.8 ⭐' },
          ],
        },
      },
      {
        type: 'services',
        content: {
          badge: 'Menu Favorit',
          title: 'Hidangan Terlaris Paling Dicari',
          subtitle: 'Nikmati sajian spesial yang selalu habis diburu pelanggan setiap hari.',
          items: [
            {
              title: 'Rendang Sapi Dapur Ibu',
              description: 'Daging sapi tender dimasak perlahan 8 jam dalam santan kental dan 16 macam rempah khas Minang.',
              price: 'Rp 48.000',
              icon: 'utensils',
              imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Gurame Bakar Bumbu Rujak',
              description: 'Ikan gurame segar dibakar dengan olesan bumbu asam manis pedas yang meresap hingga ke duri.',
              price: 'Rp 65.000',
              icon: 'flame',
              imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Ayam Goreng Lengkuas Gurih',
              description: 'Ayam kampung berbumbu kunyit lengkuas dengan taburan serundeng renyah dan sambal terasi matang.',
              price: 'Rp 38.000',
              icon: 'award',
              imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Paket Tumpeng Mini Nusantara',
              description: 'Nasi kuning wangi dengan 7 lauk lengkap, cocok untuk syukuran kantor atau ulang tahun.',
              price: 'Rp 35.000 / porsi',
              icon: 'sparkles',
              imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
            },
          ],
        },
      },
      {
        type: 'cta',
        content: {
          badge: 'Catering & Event',
          title: 'Punya Rencana Acara Keluarga atau Kantor?',
          description: 'Kami melayani pesanan katering nasi kotak, prasmanan, dan sewa ruang VIP ber-AC lengkap dengan sound system.',
          buttonText: 'Konsultasi Menu Katering via WA',
          buttonUrl: 'https://wa.me/6285712349999?text=Halo%20Dapur%20Nusantara,%20saya%20ingin%20konsultasi%20katering%20acara',
          note: 'Tersedia tester gratis untuk pemesanan katering di atas 50 porsi.',
        },
      },
      {
        type: 'contact',
        content: {
          badge: 'Kunjungi Restoran',
          title: 'Lokasi & Reservasi Meja',
          subtitle: 'Dekat dengan pusat kota, parkir bus dan mobil sangat lapang.',
          address: 'Jl. Diponegoro No. 88, Gowongan, Kec. Jetis, Kota Yogyakarta, 55233',
          phone: '0857-1234-9999',
          whatsapp: '6285712349999',
          email: 'kontak@dapurnusantara.id',
          operatingHours: 'Buka Setiap Hari: 10.00 - 22.00 WIB',
          instagram: '@dapurnusantara.yk',
        },
      },
      {
        type: 'footer',
        content: {
          tagline: 'Dapur Nusantara — Cita Rasa Rempah, Hangatnya Keluarga.',
          copyrightText: '© 2026 Dapur Nusantara Resto. Seluruh hak cipta dilindungi.',
          socialLinks: [
            { platform: 'whatsapp', url: 'https://wa.me/6285712349999' },
            { platform: 'instagram', url: 'https://instagram.com/dapurnusantara.yk' },
          ],
        },
      },
    ],
  },
  {
    id: 'service-business',
    name: 'AutoPrima Service',
    category: 'Bengkel & Servis Mobil',
    description: 'Template kredibel, terpercaya, dan to-the-point untuk bengkel mobil, motor, AC, atau jasa reparasi lokal.',
    previewImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    businessInfo: {
      name: 'Bengkel AutoPrima Service',
      category: 'Bengkel Mobil & Perawatan Otomotif',
      description: 'Layanan servis mobil bergaransi dengan mekanik handal, komputer scanning scanner modern, dan transparansi rincian estimasi biaya.',
      location: 'Jl. Soekarno-Hatta No. 102, Semarang',
      whatsapp: '6281987654321',
      instagram: '@autoprima.semarang',
      services: 'Tune Up Mesin, Ganti Oli Cepat, Servis Rem & Suspensi, Servis AC Mobil, Scanning Komputer OBD',
      targetCustomer: 'Pemilik mobil keluarga, operasional armada kantor, mobil harian',
      preferredStyle: 'modern',
    },
    theme: {
      primaryColor: '#2563eb', // trustworthy cobalt blue
      secondaryColor: '#0f172a',
      font: 'sans',
      accentColor: '#f97316', // safety orange
      backgroundColor: '#f8fafc',
    },
    sections: [
      {
        type: 'navbar',
        content: {
          brandName: 'AutoPrima',
          links: [
            { label: 'Servis', href: '#services' },
            { label: 'Keunggulan', href: '#features' },
            { label: 'Ulasan', href: '#testimonials' },
            { label: 'Kontak', href: '#contact' },
          ],
          ctaText: 'Konsultasi Kerusakan',
          ctaUrl: 'https://wa.me/6281987654321?text=Halo%20AutoPrima,%20saya%20mau%20tanya%20kendala%20mobil%20saya',
          phone: '0819-8765-4321',
        },
      },
      {
        type: 'hero',
        content: {
          badge: '🔧 Bengkel Mobil Profesional & Bergaransi',
          title: 'Mobil Bermasalah? Servis Tepat Sasaran Tanpa Akal-akalan',
          description: 'Diagnosa akurat dengan scanner komputer modern, suku cadang original, dan estimasi biaya jelas disetujui di awal sebelum pengerjaan.',
          buttonText: 'Konsultasi Gratis via WhatsApp',
          buttonUrl: 'https://wa.me/6281987654321?text=Halo%20AutoPrima,%20mobil%20saya%20ada%20kendala,%20bisa%20bantu?',
          secondaryButtonText: 'Paket Servis & Harga',
          secondaryButtonUrl: '#services',
          imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
          alignment: 'left',
        },
      },
      {
        type: 'features',
        content: {
          badge: 'Standar Servis Kami',
          title: 'Kenapa Mempercayakan Mobil ke AutoPrima?',
          subtitle: 'Kenyamanan dan keamanan berkendara Anda adalah tanggung jawab kami.',
          items: [
            {
              title: 'Estimasi Biaya Transparan',
              description: 'Rincian biaya sparepart dan jasa diinfokan terlebih dahulu. Tidak ada biaya tiba-tiba membengkak.',
              icon: 'shield',
            },
            {
              title: 'Garansi Pekerjaan 30 Hari',
              description: 'Jika masalah yang sama kembali muncul, kami perbaiki ulang secara gratis tanpa ribet.',
              icon: 'award',
            },
            {
              title: 'Mekanik Bersertifikat',
              description: 'Tim mekanik berpengalaman menangani berbagai merk mobil Jepang, Eropa, dan Asia.',
              icon: 'wrench',
            },
          ],
        },
      },
      {
        type: 'services',
        content: {
          badge: 'Paket Perawatan',
          title: 'Solusi Lengkap Performa Mobil Anda',
          subtitle: 'Daftar layanan terfavorit untuk menjaga mesin mobil tetap prima dan irit BBM.',
          items: [
            {
              title: 'Tune Up Mesin & Carbon Clean',
              description: 'Pembersihan ruang bakar, injector cleaner, pembersihan throttle body, dan resetting komputer ECU.',
              price: 'Mulai Rp 250.000',
              icon: 'settings',
            },
            {
              title: 'Ganti Oli + Filter + General Check',
              description: 'Pilihan oli original berstandar API SP + gratis pemeriksaan 25 titik kondisi mobil.',
              price: 'Mulai Rp 350.000',
              icon: 'check',
            },
            {
              title: 'Servis AC Dingin & Bersih',
              description: 'Cuci evaporator tanpa bongkar dashboard, ganti filter kabin, dan isi freon R134a murni.',
              price: 'Mulai Rp 200.000',
              icon: 'sparkles',
            },
            {
              title: 'Pengereman & Kaki-kaki',
              description: 'Bubut piringan disc brake, ganti kampas rem original, serta peremajaan bushing arm yang aus.',
              price: 'Sesuai tipe mobil',
              icon: 'shield',
            },
          ],
        },
      },
      {
        type: 'testimonials',
        content: {
          badge: 'Kepuasan Pemilik Mobil',
          title: 'Kata Mereka yang Sudah Servis di Sini',
          subtitle: 'Ulasan jujur dari pengemudi harian dan keluarga pelanggan AutoPrima.',
          items: [
            {
              name: 'Hendro Gunawan',
              role: 'Pemilik Avanza 2019',
              comment: 'Bengkel paling jujur yang pernah saya temui di Semarang. Mekanik menjelaskan kerusakan dengan gamblang, harganya sangat masuk akal.',
              rating: 5,
              avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
            },
            {
              name: 'Dr. Silvi Anggraeni',
              role: 'Pemilik Honda HR-V',
              comment: 'AC mobil tadinya cuma keluar angin panas, diservis 2 jam langsung dingin menggigil lagi. Ruang tunggunya juga bersih dan ber-AC.',
              rating: 5,
              avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
            },
          ],
        },
      },
      {
        type: 'cta',
        content: {
          badge: 'Darurat atau Berkala',
          title: 'Ingin Cek Kondisi Mobil Anda Sekarang?',
          description: 'Klik tombol di bawah untuk reservasi jam servis tanpa antre, atau konsultasikan keluhan mobil Anda secara langsung.',
          buttonText: 'Hubungi Mekanik via WhatsApp',
          buttonUrl: 'https://wa.me/6281987654321?text=Halo%20AutoPrima,%20saya%20mau%20jadwalkan%20servis%20mobil%20saya',
          note: 'Layanan darurat towing / derek tersedia di jam operasional.',
        },
      },
      {
        type: 'contact',
        content: {
          badge: 'Kunjungi Bengkel',
          title: 'Lokasi AutoPrima Service',
          subtitle: 'Akses jalan utama mudah dijangkau dengan fasilitas pit stop modern.',
          address: 'Jl. Soekarno-Hatta No. 102, Pedurungan, Kota Semarang, Jawa Tengah 50192',
          phone: '0819-8765-4321',
          whatsapp: '6281987654321',
          email: 'service@autoprima.id',
          operatingHours: 'Senin - Sabtu: 08.00 - 17.00 WIB (Minggu Libur)',
          instagram: '@autoprima.semarang',
        },
      },
      {
        type: 'footer',
        content: {
          tagline: 'AutoPrima Service — Sahabat Perjalanan Aman & Nyaman Anda.',
          copyrightText: '© 2026 AutoPrima Service Center. Seluruh hak cipta dilindungi.',
          socialLinks: [
            { platform: 'whatsapp', url: 'https://wa.me/6281987654321' },
            { platform: 'instagram', url: 'https://instagram.com/autoprima.semarang' },
          ],
        },
      },
    ],
  },
];
