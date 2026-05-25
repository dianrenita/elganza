import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EVENT_PACKAGES, EVENT_ADDONS } from '../data';
import { BookingInquiry } from '../types';
import { Send, FileCheck2, Sparkles, CheckSquare, Calendar, Users, Phone, Mail, User2, RefreshCw } from 'lucide-react';

interface InquiryFormProps {
  initialPackageId: string;
  initialAddons: string[];
  initialVenuePreference?: 'indoor' | 'outdoor';
}

export default function InquiryForm({ initialPackageId, initialAddons, initialVenuePreference }: InquiryFormProps) {
  // Form State
  const [formData, setFormData] = useState<Omit<BookingInquiry, 'selectedAddons'>>({
    fullName: '',
    email: '',
    phone: '',
    packageId: EVENT_PACKAGES[0].id,
    venuePreference: 'indoor',
    guestCount: 100,
    date: '',
    additionalNotes: ''
  });

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Sync with initial states when triggers change (like clicked from calculator)
  useEffect(() => {
    if (initialPackageId) {
      setFormData(prev => ({ 
        ...prev, 
        packageId: initialPackageId,
        venuePreference: initialVenuePreference || 'indoor'
      }));
    }
  }, [initialPackageId, initialVenuePreference]);

  useEffect(() => {
    if (initialAddons) {
      setSelectedAddons(initialAddons);
    }
  }, [initialAddons]);

  // Find target package
  const selectedPackage = useMemo(() => {
    return EVENT_PACKAGES.find(pkg => pkg.id === formData.packageId) || EVENT_PACKAGES[0];
  }, [formData.packageId]);

  // Pricing calculations
  const summaryCost = useMemo(() => {
    const base = selectedPackage.basePrice;
    const addonsCost = selectedAddons.reduce((sum, addonId) => {
      const addon = EVENT_ADDONS.find(a => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);
    return base + addonsCost;
  }, [selectedPackage, selectedAddons]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guestCount' ? parseInt(value) || 0 : value
    }));
  };

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.date) {
      alert("Mohon lengkapi seluruh pilar informasi utama.");
      return;
    }

    // Generate classy booking code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const dateFormatted = formData.date.replace(/-/g, '');
    const code = `ELZ-PROPOSAL-${dateFormatted}-${randomNum}`;
    setBookingCode(code);
    setIsSubmitted(true);

    // Scroll to success card
    setTimeout(() => {
      const finishSection = document.getElementById('booking-view-top');
      if (finishSection) {
        finishSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      packageId: EVENT_PACKAGES[0].id,
      venuePreference: 'indoor',
      guestCount: 100,
      date: '',
      additionalNotes: ''
    });
    setSelectedAddons([]);
    setIsSubmitted(false);
  };

  return (
    <section id="inquiry-section" className="py-24 bg-[#0a0a0a] text-white">
      <div id="booking-view-top" className="max-w-6xl mx-auto px-6 sm:px-12">
        
        {/* Dynamic Success View or Form */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              
              {/* Left Side Form Structure: 7 Cols */}
              <div className="lg:col-span-7 bg-[#0d0d0d] border border-gray-900 p-8 rounded-sm relative">
                
                {/* Decorative border */}
                <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                
                <span className="text-[10px] text-[#D4AF37] font-mono tracking-[0.3em] uppercase block mb-3">
                  👑 BOOKING INQUIRY FORM 👑
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-6">Ajukan Rencana Acara Elit Anda</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Nama Lengkap Anda</label>
                      <div className="relative">
                        <User2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D4AF37]" />
                        <input
                          id="input-fullname"
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Contoh: Dian Renita"
                          required
                          className="w-full bg-black/60 border border-gray-800 text-white pl-11 pr-4 py-3.5 text-xs outline-none focus:border-[#D4AF37] rounded-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Alamat Surat Elekronik (Email)</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D4AF37]" />
                        <input
                          id="input-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="alamat@domain.com"
                          required
                          className="w-full bg-black/60 border border-gray-800 text-white pl-11 pr-4 py-3.5 text-xs outline-none focus:border-[#D4AF37] rounded-sm transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phone & Event Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Nomor WhatsApp / Telepon</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D4AF37]" />
                        <input
                          id="input-phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 081234567890"
                          required
                          className="w-full bg-black/60 border border-gray-800 text-white pl-11 pr-4 py-3.5 text-xs outline-none focus:border-[#D4AF37] rounded-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Tanggal Pelaksanaan Acara</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#D4AF37] pointer-events-none" />
                        <input
                          id="input-date"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-black/60 border border-gray-800 text-white pl-11 pr-4 py-3.5 text-xs outline-none focus:border-[#D4AF37] rounded-sm transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Selected Package & Venue Preference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Paket Pokok yang Diinginkan</label>
                      <select
                        id="form-booking-pkg"
                        name="packageId"
                        value={formData.packageId}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-gray-800 text-white px-4 py-3.5 text-xs outline-none focus:border-[#D4AF37] rounded-sm transition-all"
                      >
                        {EVENT_PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.name} | {formatIDR(pkg.basePrice)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Preferensi Tempat (Venue)</label>
                      <select
                        id="form-booking-venue"
                        name="venuePreference"
                        value={formData.venuePreference}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-gray-800 text-white px-4 py-3.5 text-xs outline-none focus:border-[#D4AF37] rounded-sm transition-all"
                      >
                        <option value="indoor">Dalam Ruangan (Indoor Premium Hotel/Chamber)</option>
                        <option value="outdoor">Luar Ruangan (Outdoor Al-Fresco Garden/Rooftop)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Guest count estimator limits */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium flex justify-between">
                      <span>Estimasi Volume Tamu Undangan</span>
                      <span className="text-[#D4AF37] font-mono">{formData.guestCount} Undangan</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <Users className="h-4 w-4 text-[#D4AF37] shrink-0" />
                      <input
                        id="input-guest-range"
                        type="range"
                        name="guestCount"
                        min="20"
                        max="500"
                        step="10"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                      />
                    </div>
                    <span className="text-[10px] text-gray-500 block mt-1.5">
                      Sewa katering, suvenir kit, undangan fisik otomatis disesuaikan secara berimbang di atas 100 undangan standard.
                    </span>
                  </div>

                  {/* Row 5: Notes & Wishes */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1.5 font-medium">Gagasan Impian & Kebutuhan Kustom (Wishes)</label>
                    <textarea
                      id="input-notes"
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Contoh: Tema warna yang kami sukai violet & emas murni, tolong adakan panggung dansa lantai kaca..."
                      className="w-full bg-black/60 border border-gray-800 text-white p-4 text-xs outline-none focus:border-[#D4AF37] rounded-sm transition-all leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="btn-booking-submit"
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-amber-600 via-[#D4AF37] to-amber-500 hover:brightness-110 active:scale-98 transition-all duration-300 text-black font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm shadow-[0_10px_20px_rgba(212,175,55,0.15)]"
                  >
                    <Send className="h-4 w-4 stroke-[2.5]" />
                    Serahkan Proposal Rencana Elit
                  </button>

                </form>
              </div>

              {/* Right Side: Fast Package benefits summary card: 5 cols */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Details layout */}
                <div className="bg-[#0e0e0e] border border-gray-900 p-6 rounded-sm">
                  <h4 className="font-serif text-lg text-[#D4AF37] mb-3">
                    {selectedPackage.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                    {selectedPackage.description}
                  </p>

                  <div className="space-y-3">
                    <span className="text-[10px] tracking-widest font-mono text-gray-500 uppercase block">Benefit Termuat (Garansi):</span>
                    {selectedPackage.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs">
                        <CheckSquare className="h-3.5 w-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span className="text-gray-300 font-light leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub Addon Overview inside booking */}
                <div className="bg-black/80 border border-gray-950 p-6 rounded-sm">
                  <span className="text-[10px] tracking-widest text-[#D4AF37] font-mono uppercase block mb-3">Add-On Elit Tersemat</span>
                  {selectedAddons.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">Belum ada add-on premium yang Anda saring di kalkulator.</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedAddons.map(addonId => {
                        const addon = EVENT_ADDONS.find(a => a.id === addonId)!;
                        return (
                          <div key={addon.id} className="flex justify-between items-center bg-black/60 p-2 border border-gray-900">
                            <span className="text-xs text-gray-300 truncate max-w-[170px] font-light">• {addon.name}</span>
                            <span className="text-xs text-[#D4AF37] font-serif pr-1">{formatIDR(addon.price)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="border-t border-gray-900 pt-4 mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Investasi Estimasi</span>
                    <span className="text-base font-serif text-[#D4AF37] font-semibold">{formatIDR(summaryCost)}</span>
                  </div>
                </div>

              </div>

            </motion.div>
          ) : (
            
            // Success view: elegant golden proposal certificate layout
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto bg-[#0d0d0d] border-2 border-[#D4AF37]/50 p-8 sm:p-12 rounded-sm text-center shadow-[0_25px_60px_rgba(212,175,55,0.15)] relative overflow-hidden"
            >
              {/* Luxury backgrounds and designs */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-radial from-amber-500/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-radial from-[#D4AF37]/10 to-transparent pointer-events-none" />

              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  <FileCheck2 className="h-8 w-8" />
                </div>
              </div>

              <span className="text-xs text-[#D4AF37] font-mono tracking-[0.4em] uppercase block mb-1">
                GOLDEN SEAL RESERVATION
              </span>
              <h3 className="text-3xl font-serif text-white mb-3">Proposal Sukses Diterbitkan</h3>
              
              <div className="inline-block px-4 py-2 bg-black border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37] tracking-widest mt-2 mb-8 uppercase">
                Kode Registrasi: {bookingCode}
              </div>

              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-6" />

              {/* Elegant summary card */}
              <div className="text-left bg-black p-6 rounded-sm border border-gray-900 mb-8 max-w-xl mx-auto font-sans leading-relaxed">
                <span className="text-[10px] tracking-widest text-[#D4AF37] font-mono block mb-3 uppercase font-semibold">Tanda Terima Pemohon</span>
                
                <div className="grid grid-cols-2 gap-y-3.5 text-xs text-gray-300">
                  <span className="text-gray-500 font-light">Nama Pengirim</span>
                  <span className="text-white font-medium text-right">{formData.fullName}</span>

                  <span className="text-gray-500 font-light">Tautan Kontak</span>
                  <span className="text-right truncate text-white">{formData.phone} / {formData.email}</span>

                  <span className="text-gray-500 font-light">Paket Pokok pilihan</span>
                  <span className="text-[#D4AF37] font-serif text-right">{selectedPackage.name}</span>

                  <span className="text-gray-500 font-light">Preferensi Lokasi</span>
                  <span className="text-white text-right capitalize">{formData.venuePreference} Premier</span>

                  <span className="text-gray-500 font-light">Sewa Tanggal</span>
                  <span className="text-white text-right">{new Date(formData.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>

                  <span className="text-gray-500 font-light">Estimasi Tamu</span>
                  <span className="text-white text-right">{formData.guestCount} Undangan</span>

                  <span className="text-gray-500 text-xs font-semibold pt-4 border-t border-gray-900 mt-2">Dukungan Investasi (Total)</span>
                  <span className="text-gold font-serif text-sm font-semibold text-[#D4AF37] text-right pt-4 border-t border-gray-900 mt-2">{formatIDR(summaryCost)}</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 font-light leading-relaxed max-w-lg mx-auto mb-8">
                Terima kasih atas kepercayaan mulia Anda pada <strong className="font-semibold text-white">Eleganza Events Organizer</strong>. Konsultan pribadi VIP kami akan meninjau ketersediaan lokasi pilihan Anda dan segera menghubungi Anda dalam kurun waktu 1x24 jam untuk mengirimkan proposal format fisik elegan beserta kontrak aslinya.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  id="btn-whatsapp-shortcut"
                  onClick={() => {
                    const waText = window.encodeURIComponent(`Halo Eleganza Events Organizer, saya telah mengirimkan proposal booking dengan Kode Registrasi: ${bookingCode} atas nama ${formData.fullName} untuk paket ${selectedPackage.name}. Mohon segera tindak lanjuti.`);
                    window.open(`https://wa.me/628123456789?text=${waText}`, '_blank');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:brightness-110 text-white font-medium text-xs uppercase tracking-widest transition-all rounded-sm"
                >
                  Hubungi Via WhatsApp
                </button>
                <button
                  id="btn-reset-booking"
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-800 hover:border-gray-500 text-gray-400 hover:text-white font-medium text-xs uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Buat Pengajuan Baru
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
