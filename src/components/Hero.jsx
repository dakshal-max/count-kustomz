import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Sliders, ShieldCheck, Compass, Layers } from 'lucide-react';
import Instagram from './InstagramIcon';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/furnitureData';

const HERO_SLIDES = [
  {
    image: '/limed-oak-dining-table.jpg',
    title: 'Kustom Limed Oak Dining Table',
    material: 'Organic Solid Wood Slab & Studio Base',
    location: 'Studio Prototype 01'
  },
  {
    image: '/arm-chair.jpg',
    title: 'Tactile Wooden Arm Chair',
    material: 'Solid Wood Frame & Cream Linen',
    location: 'Living Sanctuary'
  },
  {
    image: '/stone-coffee-table.jpg',
    title: 'Monolithic Stone Coffee Table',
    material: 'Natural Raw Stone Boulder Slab',
    location: 'Architectural Pavilion'
  }
];

export default function Hero({ onExploreConfigurator, onExploreCollection, onOpenBespoke }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] overflow-hidden border-b border-[#E6DFD5]">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        
        {/* Left Editorial Content */}
        <div className="lg:col-span-6 space-y-8 text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#EAE4DA] border border-[#D8CEBE] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#4A453E]">
            <span className="w-2 h-2 rounded-full bg-[#1C1B18]"></span>
            <span>LIM Aesthetic • Bespoke Furniture Studio</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="font-serif-lim text-5xl sm:text-6xl xl:text-7xl font-light text-[#1C1B18] tracking-tight leading-[1.05]">
              Monolithic Forms. <br />
              <span className="font-semibold italic text-[#5C5549]">Quiet Elegance.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#5A544A] max-w-xl font-normal leading-relaxed">
              Count Kustom Atelier crafts custom architectural furniture defined by tactile purity, hand-selected organic timber, raw stone, and timeless geometric restraint.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreConfigurator}
              className="bg-[#1C1B18] text-[#FAF8F5] px-7 py-4 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[#38352F] transition-all flex items-center gap-3 shadow-md hover:shadow-lg group"
            >
              <Sliders className="w-4 h-4 text-[#D4AF37] group-hover:rotate-45 transition-transform" />
              <span>Launch 3D Configurator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreCollection}
              className="bg-transparent border border-[#1C1B18] text-[#1C1B18] px-7 py-4 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-[#1C1B18] hover:text-[#FAF8F5] transition-all flex items-center gap-2"
            >
              <span>Explore Collection</span>
            </button>
          </div>

          {/* Instagram highlight pill */}
          <div className="pt-4 border-t border-[#E6DFD5] flex flex-wrap items-center justify-between gap-4 text-xs text-[#6E6659]">
            <div className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-[#1C1B18]" />
              <span>Official Instagram:</span>
              <a 
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#1C1B18] hover:text-[#D4AF37] underline decoration-stone-400"
              >
                {INSTAGRAM_HANDLE}
              </a>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-medium tracking-wider uppercase">
              <span>✓ Bespoke Sizes</span>
              <span>✓ Sustainable Timber</span>
            </div>
          </div>

        </div>

        {/* Right Hero Image Slider & Spec Frame */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#E0D7C9] bg-[#EAE4DA]">
            
            {/* Slide Images */}
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B18]/70 via-transparent to-transparent"></div>
              </div>
            ))}

            {/* Slide Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-left text-white z-10 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] bg-[#1C1B18]/80 px-2.5 py-1 rounded backdrop-blur">
                  Featured Build
                </span>
                <h3 className="font-serif-lim text-2xl sm:text-3xl font-medium mt-2 text-[#FAF8F5]">
                  {HERO_SLIDES[currentSlide].title}
                </h3>
                <p className="text-xs text-[#D8CEBE] font-light mt-1">
                  {HERO_SLIDES[currentSlide].material} • {HERO_SLIDES[currentSlide].location}
                </p>
              </div>

              {/* Slider dots */}
              <div className="flex gap-2 mb-1">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentSlide ? 'bg-[#D4AF37] w-6' : 'bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Floating LIM Aesthetic Seal */}
          <div className="absolute -top-6 -right-6 hidden sm:flex bg-[#1C1B18] text-[#FAF8F5] p-5 rounded-2xl shadow-xl flex-col items-start max-w-[200px] border border-stone-700 text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
              COUNT KUSTOM ATELIER
            </span>
            <span className="font-serif-lim text-lg leading-tight font-medium mt-1">
              LIM Aesthetic
            </span>
            <p className="text-[11px] text-stone-300 mt-1 font-light">
              Light • Implicit • Minimalist custom creations.
            </p>
          </div>

        </div>

      </div>

      {/* Feature Pillar Strip */}
      <div className="max-w-7xl mx-auto w-full pt-12 mt-8 border-t border-[#E6DFD5] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">01 / Bespoke Sizes</span>
          <p className="text-xs text-[#6E6659]">Custom dimensions tailored to millimeter exactness.</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">02 / Natural Materials</span>
          <p className="text-xs text-[#6E6659]">Limed Oak, Smoked Walnut, Travertine & Linen.</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">03 / Artisan Crafted</span>
          <p className="text-xs text-[#6E6659]">Handcrafted in small batches by master joiners.</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">04 / Direct Instagram DM</span>
          <p className="text-xs text-[#6E6659]">Instant order requests & consultation via @countkustom.atelier.</p>
        </div>
      </div>

    </section>
  );
}
