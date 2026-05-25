import { EventPackage, EventAddon } from './types';

export const HERO_SLIDES = [
  {
    image: '/src/assets/images/luxury_birthday_1779684906262.png',
    title: 'Royal Birthday Celebrations',
    subtitle: 'Mewujudkan pesta ulan tahun termewah bertema hitam emas yang glamor.',
  },
  {
    image: '/src/assets/images/luxury_outdoor_1779684927892.png',
    title: 'Elite Outdoor Banquets',
    subtitle: 'Mengukir kenangan abadi di bawah kanopi cahaya malam al-fresco.',
  },
  {
    image: '/src/assets/images/luxury_seminar_1779684947170.png',
    title: 'Prestige Seminars & Keynotes',
    subtitle: 'Meningkatkan wibawa bisnis Anda melalui tata panggung profesional.',
  },
  {
    image: '/src/assets/images/luxury_gala_1779684971946.png',
    title: 'Majestic Private Galas',
    subtitle: 'Perayaan intim nan eksklusif dengan standar pelayanan bintang lima.',
  },
];

export const EVENT_PACKAGES: EventPackage[] = [
  {
    id: 'bday-indoor',
    name: 'The Imperial Birthday',
    category: 'birthday',
    venueType: 'indoor',
    basePrice: 29000000,
    description: 'Pesta ulang tahun dalam ruangan termegah yang dirancang khusus untuk Anda yang mendambakan prestise dan kenyamanan eksklusif.',
    benefits: [
      'Sewa Ballroom Hotel Bintang 5 eksklusif (6 Jam)',
      'Dekorasi eksklusif bertema Imperial Black & Gold',
      'Kue ulang tahun kustom berlapis foil emas 24k (3 Tingkat)',
      'Sajian Buffet mewah hidangan lokal & internasional (Up to 100 pax)',
      'Tim Dokumentasi profesional: 2 Fotografer, 1 Videografer dengan edit video sinematik',
      'Master of Ceremony (MC) profesional bersertifikat',
      'Premium Sound System & lighting theatrical grid terpusat'
    ],
    image: '/src/assets/images/luxury_birthday_1779684906262.png',
    maxGuests: 100,
    durationHours: 6,
  },
  {
    id: 'bday-outdoor',
    name: 'The Golden Oasis Birthday',
    category: 'birthday',
    venueType: 'outdoor',
    basePrice: 35000000,
    description: 'Pesta ulang tahun outdoor dengan konsep taman malam yang magis, dihiasi ribuan lampu hangat gantung berpola megah di bawah langit berbintang.',
    benefits: [
      'Penggunaan Exclusive Garden/Private Lawn Venue (6 Jam)',
      'Arsitektur panggung luar ruangan beralaskan kaca temper & bunga segar',
      'Kanopi kayu mahoni yang dipasangi tirai sutra hitam dan lampu gantung kristal',
      'Live Acoustic Band papan atas untuk iringan musik eksklusif',
      'Sajian Premium Al-Fresco Dining & Gourmet Snack bar (Up to 120 pax)',
      'Drone Shoot & Dokumentasi video 4K cinematic lengkap',
      'Sistem pendingin udara luar ruangan (Mist Fan deluxe) & Backup Generator'
    ],
    image: '/src/assets/images/luxury_gala_1779684971946.png',
    maxGuests: 120,
    durationHours: 6,
  },
  {
    id: 'seminar-indoor',
    name: 'Summit Class Corporate Conference',
    category: 'seminar',
    venueType: 'indoor',
    basePrice: 55000000,
    description: 'Seminar dan konferensi kelas tertinggi dalam ruangan dengan integrasi multimedia modern yang mendemonstrasikan otoritas luar biasa brand Anda.',
    benefits: [
      'Sewa Executive Auditorium / Premium Convention Hall (8 Jam)',
      'Layar LED Wall resolusi tinggi (12m x 4m) sebagai backdrop utama',
      'Sistem Audio termutakhir dengan kalibrasi akustik ruangan',
      'Gourmet Coffee Break (2 Sesi) dan Premium Lunch Box oleh Chef Bintang 5',
      'Exclusive Seminar Kit: Buku jurnal kulit berlogo emas & pulpen parker kustom',
      'Ruang VVIP Speaker Lounge dengan fasilitas refreshment kelas premium',
      'Operator multimedia & kru panggung profesional (12 personil)'
    ],
    image: '/src/assets/images/luxury_seminar_1779684947170.png',
    maxGuests: 200,
    durationHours: 8,
  },
  {
    id: 'seminar-outdoor',
    name: 'Al-Fresco Network Symposium',
    category: 'seminar',
    venueType: 'outdoor',
    basePrice: 62000000,
    description: 'Seminar luar ruangan yang santai namun berwibawa tinggi, menggabungkan transfer wawasan kelas dunia dengan sesi networking kelas elit.',
    benefits: [
      'Exclusive Private Beachfront / Luxury Rooftop Terrace (8 Jam)',
      'Konsep panggung seminar terbuka berdesain geometris hitam emas modern',
      'Wireless Ultra-Low Latency Headset (Silent Seminar Technology) untuk 150 pax',
      'Gourmet Tapas & Mocktail Bar premium beroperasi sepanjang acara',
      'Name Tag seminar berukir laser berbahan kulit sintetis premium',
      'Sesi Networking Cocktail Dinner eksklusif menjelang petang',
      'Dokumentasi liputan media partner lokal lengkap dengan rilis pers'
    ],
    image: '/src/assets/images/luxury_outdoor_1779684927892.png',
    maxGuests: 150,
    durationHours: 8,
  },
  {
    id: 'gala-indoor',
    name: 'The Majestic Royal Gala',
    category: 'gala',
    venueType: 'indoor',
    basePrice: 95000000,
    description: 'Malam penganugerahan dan perayaan formal super megah di dalam istana modern, menghadirkan nuansa malam bangsawan Eropa klasik berlapis emas.',
    benefits: [
      'Sewa Royal Palace Ballroom mewah (8 Jam)',
      'Red Carpet Entrance dengan pilar-pilar dilapisi emas murni',
      'Pertunjukan Orkes Simfoni Mini (Live Orchestra) menyambut para tamu',
      'Fine Dining 5-Course Chef de Cuisine Signature Menu (Up to 150 pax)',
      'Sewa gaun/tuksedo VIP bagi 5 tokoh utama acara',
      'Dekorasi meja mewah berlapis sutra hitam dengan lilin aroma emas',
      'Tim pengamanan privat (Bodyguard) & Valet Parking VIP tak terbatas'
    ],
    image: '/src/assets/images/luxury_birthday_1779684906262.png',
    maxGuests: 150,
    durationHours: 8,
  },
  {
    id: 'gala-outdoor',
    name: 'Celestial Rooftop Sovereign',
    category: 'gala',
    venueType: 'outdoor',
    basePrice: 120000000,
    description: 'Perayaan malam gala outdoor di atas puncak gedung tertinggi dengan pemandangan 360 derajat kota yang berkilauan, menyajikan level kemewahan tiada dua.',
    benefits: [
      'Penyewaan Full Private Rooftop Helipad & Lounge (8 Jam)',
      'Panggung transparan di atas kolam renang / kaca infinity',
      'Sky Projection Light Show & Kembang Api berkoordinasi militer (3 Menit)',
      'Caviar & Vintage Champagne Towers dengan Sommelier bersertifikat',
      'Chef Masakan Dunia yang memasak secara langsung di depan tamu',
      'Dokumentasi Sinematografi Udara (Drone termutakhir & Crew Kamera Gimbal)',
      'Akses VIP Helikopter untuk kedatangan 2 tamu kehormatan'
    ],
    image: '/src/assets/images/luxury_outdoor_1779684927892.png',
    maxGuests: 80,
    durationHours: 8,
  }
];

export const EVENT_ADDONS: EventAddon[] = [
  {
    id: 'addon-carpet',
    name: 'Red Carpet & Gold Stanchions',
    price: 3500000,
    description: 'Karpet beludru merah sepanjang 15 meter lengkap dengan tiang pembatas pilar emas berkilau untuk menyambut kedatangan tamu kehormatan.',
    category: 'decor'
  },
  {
    id: 'addon-mc',
    name: 'Celebrity Master of Ceremony',
    price: 15000000,
    description: 'Dipandu oleh MC tingkat nasional berpasangan terkemuka untuk menceriakan suasana dengan pembawaan bergengsi.',
    category: 'talent'
  },
  {
    id: 'addon-orchestra',
    name: 'Royal Live Orchestra Ensemble',
    price: 25000000,
    description: 'Pertunjukan musik simfoni megah berisi 12 musisi profesional dengan biola, selo, harpa, dan piano akustik klasik.',
    category: 'talent'
  },
  {
    id: 'addon-pyro',
    name: 'Grand Synchronized Fireworks',
    price: 18000000,
    description: 'Pertunjukan kembang api megah di luar ruangan selama 2 menit penuh yang disinkronisasi dengan musik klimaks acara.',
    category: 'effect'
  },
  {
    id: 'addon-catering',
    name: 'Upgrade to Michelin-Starred Food Menu',
    price: 30000000,
    description: 'Meningkatkan seluruh standar menu buffet dan fine dining untuk dikurasi secara langsung oleh Chef berpredikat michelin-star.',
    category: 'catering'
  }
];
