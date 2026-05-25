/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, Crown, Flame, Award, ArrowUp, Menu, X, Landmark, GraduationCap } from 'lucide-react';

// Sub-components
import HeroSlideshow from './components/HeroSlideshow';
import PackageExplorer from './components/PackageExplorer';
import AIConsultant from './components/AIConsultant';
import InquiryForm from './components/InquiryForm';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cross-component states to feed Estimator choices into the Booking Form
  const [selectedPkgId, setSelectedPkgId] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedVenueType, setSelectedVenueType] = useState<'indoor' | 'outdoor'>('indoor');

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackageForInquiry = (pkgId: string, addons: string[], venueType: 'indoor' | 'outdoor') => {
    setSelectedPkgId(pkgId);
    setSelectedAddons(addons);
    setSelectedVenueType(venueType);
    
    // Smooth scroll down to the inquiry section safely
    const inquirySection = document.getElementById('inquiry-section');
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#D4AF37] selection:text-black antialiased overflow-x-hidden">
      
      {/* 1. Header Luxury Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black/95 border-b border-[#D4AF37]/15 backdrop-blur-md px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Brand Name */}
          <div 
            onClick={() => scrollToSection('hero-section')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="relative w-10 h-10 border border-[#D4AF37]/50 rounded-full flex items-center justify-center bg-black hover:border-amber-400 transition-colors">
              <span className="font-serif text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-[#D4AF37] to-amber-200">E</span>
              <div className="absolute inset-0.5 rounded-full border border-dashed border-[#D4AF37]/25 animate-spin-slow pointer-events-none" />
            </div>
            <div>
              <span className="font-serif text-lg tracking-[0.22em] text-[#D4AF37] uppercase font-light block">
                ELEGANZA
              </span>
              <span className="text-[8px] tracking-[0.45em] text-gray-500 uppercase font-mono block -mt-1 font-semibold">
                EVENTS ORGANIZER
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-[0.2em] uppercase">
            {[
              { id: 'hero-section', label: 'Home' },
              { id: 'about-section', label: 'Eksklusivitas' },
              { id: 'packages-section', label: 'Koleksi Paket' },
              { id: 'consultant-section', label: 'AI Planner VIP' },
              { id: 'inquiry-section', label: 'Pemesanan' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-400 hover:text-[#D4AF37] transition-all cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            aria-label="Toggle Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#D4AF37] hover:text-amber-400 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-black border-b border-[#D4AF37]/20 py-6 px-8 flex flex-col gap-5 text-xs font-mono tracking-widest uppercase text-center"
          >
            {[
              { id: 'hero-section', label: 'Home' },
              { id: 'about-section', label: 'Eksklusivitas' },
              { id: 'packages-section', label: 'Koleksi Paket' },
              { id: 'consultant-section', label: 'AI Planner VIP' },
              { id: 'inquiry-section', label: 'Pemesanan' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-300 hover:text-[#D4AF37] py-2 border-b border-gray-900"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </nav>

      {/* 2. Background Slideshow Hero Component */}
      <HeroSlideshow
        onExplorePackages={() => scrollToSection('packages-section')}
        onOpenConsultant={() => scrollToSection('consultant-section')}
      />

      {/* 3. Elegance Philosophy & Prestigious Stats Section */}
      <section id="about-section" className="py-24 bg-gradient-to-b from-black to-[#0a0a0a] border-b border-[#D4AF37]/10 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Philosophy: 7 cols */}
            <div className="lg:col-span-7">
              <span className="text-[#D4AF37] font-mono text-[10px] tracking-[0.4em] uppercase block mb-3">
                ✦ THE ART OF COMMEMORATION ✦
              </span>
              <h2 className="text-3xl md:text-5xl font-light font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-105 via-[#D4AF37] to-amber-200 mb-6 leading-tight">
                Kesempurnaan Momen Elit di Tangan Profesional
              </h2>
              <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6">
                Di <strong className="font-semibold text-white">Eleganza Events Organizer</strong>, kami mendefinisikan kembali arti dari sebuah perayaan. Kami percaya bahwa setiap jabat tangan dalam seminar bisnis, kepulan lilin ulang tahun, dan malam penganugerahan formal layak dibalut dengan estetika termewah dan logistik yang mulus tanpa cacat.
              </p>
              <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-8">
                Dengan pengalaman mengurasi lebih dari ratusan perayaan eksklusif baik di dalam gedung-gedung megah bergaya klasik Eropa hingga helipad pencakar langit yang romantis, kami menjamin kepuasan level tertinggi dengan standar keramahan premium.
              </p>

              {/* Three Pillars benefits items */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-900 border-dashed">
                <div className="flex gap-3">
                  <Crown className="h-8 w-8 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-white tracking-wider uppercase mb-1">Tailor-Made Design</h4>
                    <p className="text-[11px] text-gray-500 font-light leading-normal">Setiap dekorasi dan alur acara sepenuhnya kustom dan unik bagi Anda.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Award className="h-8 w-8 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-white tracking-wider uppercase mb-1">Elite Venues Access</h4>
                    <p className="text-[11px] text-gray-500 font-light leading-normal">Koneksi eksklusif ke hotel bintang lima, pulau privat & rooftop mewah.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Flame className="h-8 w-8 text-[#D4AF37] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-white tracking-wider uppercase mb-1">Impeccable Timing</h4>
                    <p className="text-[11px] text-gray-500 font-light leading-normal">Manajemen waktu profesional berakurasi militer untuk kesempurnaan.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Elite Stats: 5 cols */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0c0c0e] to-[#050505] p-8 border border-[#D4AF37]/20 rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block mb-4">👑 RECORD OF EXCELLENCE</span>
              <div className="space-y-6">
                <div>
                  <span className="text-4xl md:text-5xl font-serif font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-105 to-amber-200 tracking-wide block">Rp 120M+</span>
                  <span className="text-xs tracking-wider uppercase text-gray-400 font-mono mt-1 block">Aset Acara Terlindungi</span>
                  <p className="text-[10px] text-gray-600 font-light mt-0.5">Asuransi dan standar keamanan VVIP terintegrasi penuh.</p>
                </div>
                <div className="h-[1px] bg-gray-900" />
                <div>
                  <span className="text-4xl md:text-5xl font-serif font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-105 to-amber-200 tracking-wide block">500+</span>
                  <span className="text-xs tracking-wider uppercase text-gray-400 font-mono mt-1 block">Luxury Events Executed</span>
                  <p className="text-[10px] text-gray-600 font-light mt-0.5">Ulang tahun elit, konferensi multinasional, dan gala privat bergengsi.</p>
                </div>
                <div className="h-[1px] bg-gray-900" />
                <div>
                  <span className="text-4xl md:text-5xl font-serif font-semibold text-[#D4AF37] tracking-wide block">99.8%</span>
                  <span className="text-xs tracking-wider uppercase text-gray-400 font-mono mt-1 block">Kepuasan Klien VIP</span>
                  <p className="text-[10px] text-gray-600 font-light mt-0.5">Berdasarkan audit kepuasan independen pasca-acara konsekutif.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Interactive Packages & Real-Time Price Estimator */}
      <PackageExplorer
        onSelectPackageForInquiry={handleSelectPackageForInquiry}
      />

      {/* 5. Custom Prominent Royal Testimonials Showcase */}
      <section className="py-24 bg-[#09090a] border-t border-b border-[#D4AF37]/10 relative">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 text-center">
          <span className="text-[#D4AF37] font-mono text-xs tracking-[0.3em] uppercase block mb-3">✦ VERIFIED SOVEREIGNS ✦</span>
          <h3 className="text-2xl md:text-4xl font-serif font-medium text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 to-amber-200 mb-12">Catatan Apresiasi Klien Elit</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Eleganza merancang panggung seminar nasional kami dengan begitu megah. Screen LED Wall gantung dan Silent sound-system mutakhirnya membuat 200 pemegang saham kami berdecak kagum dan penuh fokus.",
                author: "Bpk. Hendra Kusuma",
                title: "Direktur Utama Nexus Business Group",
                event: "Seminar Summit Class Indoor"
              },
              {
                quote: "Tidak ada kata yang mampu mengekspresikan perayaan ulang tahun ke-30 bertema Golden Oasis yang mereka gelar di rooftop kami. Lampu gantung kristal di malam terbuka luar biasa cantik!",
                author: "Angelina Widjaja",
                title: "Fashion Designer & Public Figure",
                event: "Golden Oasis Outdoor Birthday"
              },
              {
                quote: "Perjamuan Majestic Royal Gala di ballroom istana benar-benar berkelas royal. Pelayanan fine dining dari Sommelier terakreditasi dan alunan live orchestra menyentuh sukma seluruh kolega VVIP kami.",
                author: "Suryo Atmodjo",
                title: "Pengusaha Industri & Kolektor Seni",
                event: "The Majestic Royal Gala Dinner"
              }
            ].map((testi, idx) => (
              <div key={idx} className="bg-black border border-gray-900 p-6 sm:p-8 flex flex-col justify-between text-left hover:border-[#D4AF37]/30 transition-all duration-300">
                <span className="text-[#D4AF37] text-4xl font-serif leading-none block h-4 select-none animate-pulse">“</span>
                <p className="text-xs sm:text-sm text-gray-300 font-light italic leading-relaxed mb-6 mt-2">
                  {testi.quote}
                </p>
                <div>
                  <div className="h-[1px] w-12 bg-[#D4AF37]/40 mb-3" />
                  <h4 className="text-xs font-semibold text-white tracking-wide uppercase">{testi.author}</h4>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">{testi.title}</p>
                  <span className="inline-block px-2 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] font-mono tracking-widest uppercase rounded-sm mt-2">
                    {testi.event}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AI Consultant Lounge Section */}
      <AIConsultant currentPkgId={selectedPkgId} />

      {/* 7. Booking Registration Inquiry Form Section */}
      <InquiryForm
        initialPackageId={selectedPkgId}
        initialAddons={selectedAddons}
        initialVenuePreference={selectedVenueType}
      />

      {/* 8. Footer Block */}
      <footer className="bg-black text-gray-400 py-16 border-t border-gray-900 px-6 sm:px-12 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 font-sans">
          
          {/* Logo Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#D4AF37]/50 rounded-full flex items-center justify-center bg-black">
                <span className="font-serif text-lg font-bold text-[#D4AF37]">E</span>
              </div>
              <div>
                <span className="font-serif text-lg tracking-[0.22em] text-[#D4AF37] uppercase font-light">
                  ELEGANZA
                </span>
                <span className="text-[8px] tracking-[0.45em] text-gray-600 uppercase font-mono block -mt-1 font-semibold">
                  EVENTS ORGANIZER
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-light max-w-sm leading-relaxed">
              Mewujudkan kesempurnaan momen prestisius Anda melalui rancangan kustom premium, kuliner kelas dunia, dan teknologi termutakhir bertema hitam emas mewah terpadu.
            </p>
            <p className="text-[10px] text-gray-600 font-mono tracking-wider">
              © 2026 Eleganza Events Organizer. All rights reserved.
            </p>
          </div>

          {/* Quick links Column */}
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold block mb-4">Navigasi Elit</span>
            <ul className="space-y-2.5 text-xs">
              {['Home', 'Eksklusivitas', 'Koleksi Paket', 'AI Planner VIP', 'Pemesanan'].map((link, idx) => {
                const ids = ['hero-section', 'about-section', 'packages-section', 'consultant-section', 'inquiry-section'];
                return (
                  <li key={idx}>
                    <button
                      onClick={() => scrollToSection(ids[idx])}
                      className="hover:text-white transition-colors cursor-pointer text-gray-550"
                    >
                      {link}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact details Column */}
          <div>
            <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold block mb-4">Kantor Pemasaran VIP</span>
            <ul className="space-y-2.5 text-xs text-gray-500 font-light leading-relaxed">
              <li>
                <strong className="text-gray-305 font-medium">The Sovereign Tower</strong><br />
                Puncak Lantai 88, Suite 09A<br />
                Kawasan Pusat Elit, Jakarta, ID.
              </li>
              <li>
                <strong className="text-gray-305 font-medium">Layanan Telepon:</strong><br />
                +62 (21) 8800-9999
              </li>
              <li>
                <strong className="text-gray-305 font-medium">Alamat Surat:</strong><br />
                concierge@eleganzaorganizer.com
              </li>
            </ul>
          </div>

        </div>

        {/* Back to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute bottom-6 right-6 p-3 bg-gradient-to-tr from-amber-600 to-[#D4AF37] rounded-sm text-black hover:brightness-110 active:scale-95 transition-all text-center focus:outline-none cursor-pointer"
          aria-label="Back to Top"
        >
          <ArrowUp className="h-4 w-4 stroke-[3]" />
        </button>
      </footer>

    </div>
  );
}
