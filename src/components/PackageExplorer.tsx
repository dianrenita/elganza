import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EVENT_PACKAGES, EVENT_ADDONS } from '../data';
import { EventPackage } from '../types';
import { Check, Info, Sparkles, Building2, Trees, CircleDollarSign, Plus, FileText } from 'lucide-react';

interface PackageExplorerProps {
  onSelectPackageForInquiry: (pkgId: string, addons: string[], venueType: 'indoor' | 'outdoor') => void;
}

export default function PackageExplorer({ onSelectPackageForInquiry }: PackageExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'birthday' | 'seminar' | 'gala'>('all');
  const [activeVenue, setActiveVenue] = useState<'all' | 'indoor' | 'outdoor'>('all');
  
  // Calculator States
  const [selectedPkgId, setSelectedPkgId] = useState<string>(EVENT_PACKAGES[0].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Filtering Logic
  const filteredPackages = useMemo(() => {
    return EVENT_PACKAGES.filter((pkg) => {
      const matchCategory = activeCategory === 'all' || pkg.category === activeCategory;
      const matchVenue = activeVenue === 'all' || pkg.venueType === activeVenue;
      return matchCategory && matchVenue;
    });
  }, [activeCategory, activeVenue]);

  // Selected Package details for Calculator
  const selectedPackage = useMemo(() => {
    return EVENT_PACKAGES.find(pkg => pkg.id === selectedPkgId) || EVENT_PACKAGES[0];
  }, [selectedPkgId]);

  // Pricing calculations
  const totalCost = useMemo(() => {
    const base = selectedPackage.basePrice;
    const addonsCost = selectedAddons.reduce((sum, addonId) => {
      const addon = EVENT_ADDONS.find(a => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);
    return base + addonsCost;
  }, [selectedPackage, selectedAddons]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <section id="packages-section" className="py-24 bg-gradient-to-b from-[#050505] to-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-mono text-xs tracking-[0.3em] uppercase block mb-3">
            👑 ELEGANZA PACKAGES 👑
          </span>
          <h2 className="text-3xl md:text-5xl font-light font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-[#D4AF37] to-amber-200 mb-4">
            Katalog Paket Eksklusif
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 font-light max-w-2xl mx-auto text-sm md:text-base">
            Sesuaikan impian perayaan Anda dengan portofolio layanan berkualitas premium kami. Dari jamuan mewah dalam hotel mewah hingga simposium megah di bawah bintang-bintang.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-[#D4AF37]/10 pb-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {['all', 'birthday', 'seminar', 'gala'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-5 py-2.5 text-xs tracking-widest uppercase transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-black border-transparent font-semibold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'bg-black/30 text-gray-400 border-gray-800 hover:text-[#D4AF37] hover:border-[#D4AF37]/30'
                }`}
              >
                {cat === 'all' ? 'Semua Kategori' : cat === 'birthday' ? 'Ulang Tahun' : cat === 'seminar' ? 'Seminar' : 'Gala & Penghargaan'}
              </button>
            ))}
          </div>

          {/* Venue Type Filter */}
          <div className="flex gap-2 bg-black/60 p-1 border border-gray-800 rounded-sm">
            {[
              { id: 'all', label: 'Semua Venue', icon: Sparkles },
              { id: 'indoor', label: 'Indoor Only', icon: Building2 },
              { id: 'outdoor', label: 'Outdoor Only', icon: Trees },
            ].map((venue) => {
              const IconComp = venue.icon;
              return (
                <button
                  key={venue.id}
                  onClick={() => setActiveVenue(venue.id as any)}
                  className={`px-4 py-2 text-xs flex items-center gap-2 transition-all duration-300 ${
                    activeVenue === venue.id
                      ? 'bg-[#D4AF37]/15 text-[#D4AF37] font-medium border-b-2 border-[#D4AF37]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  {venue.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg) => (
              <motion.div
                layout
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group relative bg-[#111111] border border-[#D4AF37]/15 overflow-hidden flex flex-col justify-between hover:border-[#D4AF37]/45 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.12)]"
              >
                {/* Image & Badges */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
                  
                  {/* Category & Venue type Icons */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-black/80 border border-amber-500/30 text-[#D4AF37] text-[10px] uppercase font-mono tracking-widest">
                      {pkg.category === 'birthday' ? 'Ulang Tahun' : pkg.category === 'seminar' ? 'Seminar' : 'Gala'}
                    </span>
                    <span className="px-3 py-1 bg-[#D4AF37] text-black text-[10px] uppercase font-semibold tracking-widest flex items-center gap-1">
                      {pkg.venueType === 'indoor' ? (
                        <Building2 className="h-3 w-3" />
                      ) : (
                        <Trees className="h-3 w-3" />
                      )}
                      {pkg.venueType.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl tracking-wide group-hover:text-[#D4AF37] transition-colors duration-300 text-white mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-4 line-clamp-3">
                      {pkg.description}
                    </p>
                    
                    {/* Benefits preview */}
                    <div className="space-y-2 mb-6 border-t border-gray-900 pt-4">
                      <span className="text-[10px] tracking-widest uppercase text-gray-500 font-semibold block mb-2">Benefit Utama INCLUDE:</span>
                      {pkg.benefits.slice(0, 3).map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <Check className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span className="text-gray-300 font-light line-clamp-1">{benefit}</span>
                        </div>
                      ))}
                      {pkg.benefits.length > 3 && (
                        <span className="text-[10px] text-[#D4AF37]/70 italic block mt-1">
                          + {pkg.benefits.length - 3} Benefit Premium lainnya...
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing / CTA */}
                  <div className="border-t border-gray-900 pt-4 mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-gray-500 tracking-wider block uppercase">Mulai Mulia Dari</span>
                      <span className="text-lg font-serif font-semibold text-[#D4AF37] tracking-wider">
                        {formatIDR(pkg.basePrice)}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedPkgId(pkg.id);
                        const calculatorSection = document.getElementById('price-estimator-section');
                        if (calculatorSection) {
                          calculatorSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-4 py-2 border border-[#D4AF37]/30 text-xs text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:border-transparent font-medium"
                    >
                      Kalkulasi
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Live Premium Price Estimator Section */}
        <div id="price-estimator-section" className="relative p-8 md:p-12 bg-[#090909] border border-[#D4AF37]/20 rounded-sm">
          {/* Subtle gold decoration design element */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Selection Grid: 7 cols */}
            <div className="lg:col-span-7">
              <span className="text-xs text-[#D4AF37] font-mono tracking-widest block mb-2 uppercase flex items-center gap-1.5 animate-pulse">
                <CircleDollarSign className="h-4 w-4 text-[#D4AF37]" />
                Kalkulator Anggaran Elit
              </span>
              <h3 className="text-2xl font-serif text-white mb-6">Sesuaikan Item Paket & Add-On</h3>
              
              {/* Select Package dropdown */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Pilih Paket Pokok:</label>
                <select
                  id="calc-package-sync"
                  value={selectedPkgId}
                  onChange={(e) => setSelectedPkgId(e.target.value)}
                  className="w-full bg-[#121212] border border-gray-800 text-white p-3.5 outline-none rounded-sm font-sans focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                >
                  {EVENT_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} - ({pkg.venueType.toUpperCase()}) | {formatIDR(pkg.basePrice)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Display selected Package Info summary */}
              <div className="mb-8 p-4 bg-black/60 border border-gray-900 rounded-sm flex items-start gap-3">
                <Info className="h-5 w-5 text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold uppercase text-gold tracking-wider text-[#D4AF37]">
                    Kapasitas Terbuka & Durasi
                  </h4>
                  <p className="text-xs text-gray-300 font-light mt-1">
                    Hingga <strong className="font-semibold text-white">{selectedPackage.maxGuests} Tamu</strong> dengan durasi layanan terpadu <strong className="font-semibold text-white">{selectedPackage.durationHours} Jam</strong>. Tambahan pax dapat disesuaikan didiskusikan gratis.
                  </p>
                </div>
              </div>

              {/* Interactive Addons List */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-3 font-semibold">
                  Sempurnakan dengan Layanan Tambahan (Add-On Premium):
                </label>
                <div className="space-y-3">
                  {EVENT_ADDONS.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-4 border rounded-sm cursor-pointer transition-all duration-300 flex items-center justify-between ${
                          isChecked
                            ? 'bg-[#D4AF37]/5 border-[#D4AF37] text-white'
                            : 'bg-black/30 border-gray-800 text-gray-400 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1 pr-4">
                          <div className={`w-5 h-5 rounded-sm border shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                            isChecked ? 'bg-[#D4AF37] border-transparent text-black' : 'border-gray-700 bg-[#121212]'
                          }`}>
                            {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <span className={`text-xs font-semibold block ${isChecked ? 'text-white' : 'text-gray-300'}`}>
                              {addon.name}
                            </span>
                            <span className="text-[11px] text-gray-500 font-light leading-relaxed block mt-0.5">
                              {addon.description}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-medium font-serif text-[#D4AF37] shrink-0">
                          + {formatIDR(addon.price)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Invoice Receipt Mockup: 5 cols */}
            <div className="lg:col-span-5 border border-[#D4AF37]/30 bg-[#0d0d0d] p-6 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-radial from-amber-500/10 to-transparent pointer-events-none" />
              
              {/* Elegant Wax Seal Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-black">
                  <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                </div>
              </div>

              <div className="text-center mb-6">
                <span className="font-serif text-sm tracking-widest text-gray-400 uppercase font-light">Estimasi Anggaran Acara</span>
                <p className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase mt-1">Sertifikat Proposal Elit</p>
              </div>

              {/* Receipt Body */}
              <div className="font-mono text-xs border-t border-b border-[#D4AF37]/20 py-4 space-y-3.5 mb-6 leading-relaxed">
                
                {/* Package Base price */}
                <div className="flex justify-between gap-2">
                  <span className="text-gray-400 truncate max-w-[200px]">{selectedPackage.name} (Base)</span>
                  <span className="text-white font-serif font-semibold">{formatIDR(selectedPackage.basePrice)}</span>
                </div>

                {/* Separator */}
                <span className="block text-gray-600 border-b border-dashed border-gray-800" />

                {/* Added items list */}
                {selectedAddons.length === 0 ? (
                  <div className="text-center py-2 text-gray-600 text-[11px] italic">
                    Belum ada Add-on opsional dipilih
                  </div>
                ) : (
                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {selectedAddons.map((addonId) => {
                      const addon = EVENT_ADDONS.find(a => a.id === addonId)!;
                      return (
                        <div key={addon.id} className="flex justify-between gap-2">
                          <span className="text-gray-400 text-[11px] truncate max-w-[180px]">• {addon.name}</span>
                          <span className="text-gray-300 font-serif text-[11px]">{formatIDR(addon.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Standard tax and service charge (included or specified) */}
                <span className="block text-gray-600 border-b border-dashed border-gray-800" />
                <div className="flex justify-between text-gray-500 text-[11px]">
                  <span>Pajak (VAT) & Hospitality Service</span>
                  <span className="text-white italic">TERMASUK (0% Extra)</span>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex justify-between items-center mb-8 bg-black p-4 border border-[#D4AF37]/10">
                <span className="text-xs uppercase text-gray-400 tracking-wider font-semibold">Total Investasi</span>
                <span className="text-xl font-serif text-[#D4AF37] font-semibold tracking-wide">
                  {formatIDR(totalCost)}
                </span>
              </div>

              {/* Call to action booking proposal */}
              <button
                id="btn-calc-submit"
                onClick={() => onSelectPackageForInquiry(selectedPackage.id, selectedAddons, selectedPackage.venueType)}
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-[#D4AF37] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Ajukan Proposal Pemesanan
              </button>

              <p className="text-[10px] text-gray-500 text-center leading-relaxed font-sans mt-3">
                Kalkulasi ini bersifat estimasi awal. Konsultan perencana vip kami akan menghubungi Anda kembali untuk melakukan penyesuaian detail demi kesempurnaan momen berharga Anda.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
