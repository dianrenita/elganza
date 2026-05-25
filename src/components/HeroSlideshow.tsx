import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_SLIDES } from '../data';
import { ChevronLeft, ChevronRight, Sparkles, ArrowDown } from 'lucide-react';

interface HeroSlideshowProps {
  onExplorePackages: () => void;
  onOpenConsultant: () => void;
}

export default function HeroSlideshow({ onExplorePackages, onOpenConsultant }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: 1.08,
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 1.2, ease: 'easeInOut' },
        scale: { duration: 6, ease: 'easeOut' }, // elegant zoom/ken burns effect
      },
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      transition: {
        opacity: { duration: 1.2, ease: 'easeInOut' },
      },
    },
  };

  return (
    <div id="hero-section" className="relative h-[95vh] w-full overflow-hidden bg-black text-white">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={HERO_SLIDES[currentIndex].image}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute h-full w-full object-cover filter brightness-[0.35]"
            referrerPolicy="no-referrer"
            alt={HERO_SLIDES[currentIndex].title}
          />
        </AnimatePresence>
      </div>

      {/* Luxury Gold Gradients & Vignettes Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
      
      {/* Golden Sparkling Particles Decoration */}
      <div className="absolute top-10 right-10 flex items-center gap-2 text-[#D4AF37] opacity-60 text-xs tracking-[0.3em] font-mono select-none">
        <Sparkles className="h-4 w-4 animate-pulse" />
        <span>ELEGANZA PREMIUM LIFE</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 md:px-24 max-w-7xl mx-auto">
        <span className="mb-3 text-[10px] sm:text-xs tracking-[0.4em] text-[#D4AF37] font-semibold uppercase block animate-fade-in">
          ELEGANT & LUXURIOUS EXPERIENCES
        </span>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
          <span className="block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-[#D4AF37] to-amber-200">
            {HERO_SLIDES[currentIndex].title.split(" ")[0]}
          </span>
          <span className="block font-sans font-extralight tracking-wide -mt-1">
            {HERO_SLIDES[currentIndex].title.split(" ").slice(1).join(" ")}
          </span>
        </h1>

        <p className="text-gray-300 text-sm sm:text-lg max-w-xl font-light leading-relaxed mb-10 border-l-2 border-[#D4AF37]/40 pl-4">
          {HERO_SLIDES[currentIndex].subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            id="btn-explore-packages"
            onClick={onExplorePackages}
            className="relative px-8 py-4 bg-gradient-to-r from-amber-600 via-[#D4AF37] to-amber-500 text-black font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 text-center"
          >
            Jelajahi Paket Mulia
          </button>
          <button
            id="btn-consult-ai"
            onClick={onOpenConsultant}
            className="px-8 py-4 bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] font-medium text-sm tracking-widest uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-300 active:scale-95 text-center flex items-center justify-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            Rancang Bersama AI
          </button>
        </div>
      </div>

      {/* Nav Arrows */}
      <button
        id="btn-hero-prev"
        aria-label="Previous Slide"
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-[#D4AF37]/20 bg-black/40 text-white hover:bg-[#D4AF37] hover:text-black hover:border-transparent transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        id="btn-hero-next"
        aria-label="Next Slide"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-[#D4AF37]/20 bg-black/40 text-white hover:bg-[#D4AF37] hover:text-black hover:border-transparent transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-1.5 transition-all duration-500 ${
              idx === currentIndex ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Bottom Scroll Indicator Scroll Arrow */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-gray-500 animate-bounce">
        <span className="text-[9px] tracking-widest font-mono text-[#D4AF37]/70 uppercase">scroll</span>
        <ArrowDown className="h-3 w-3 text-[#D4AF37]" />
      </div>
    </div>
  );
}
