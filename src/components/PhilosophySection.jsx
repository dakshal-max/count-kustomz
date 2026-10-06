import React from 'react';
import { Compass, ShieldCheck, TreePine, Sparkles, Layers, Download } from 'lucide-react';

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E6DFD5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7C7569]">
              THE LIM PHILOSOPHY
            </span>
            <h2 className="font-serif-lim text-4xl sm:text-5xl xl:text-6xl font-light text-[#1C1B18] tracking-tight leading-tight">
              Light. Implicit. <br />
              <span className="font-semibold italic text-[#6E6659]">Minimalist Craft.</span>
            </h2>
            <p className="text-base text-[#5C5549] leading-relaxed font-normal">
              At Count Kustomzz, we believe furniture should not compete with space, but anchor it in profound tranquility. Form is stripped of non-essential ornamentation, allowing raw grain, architectural shadow, and organic texture to speak.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-[#E0D7C9]">
              <div>
                <span className="font-serif-lim text-3xl font-semibold text-[#1C1B18]">100%</span>
                <p className="text-xs text-[#6E6659] mt-1 font-medium uppercase tracking-wider">Sustainable Timber Sourcing</p>
              </div>
              <div>
                <span className="font-serif-lim text-3xl font-semibold text-[#1C1B18]">0%</span>
                <p className="text-xs text-[#6E6659] mt-1 font-medium uppercase tracking-wider">Synthetic Solvents or Plastics</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1546484475-7f7bd55792da?auto=format&fit=crop&w=600&q=80"
                alt="Woodworking craftsmanship"
                className="w-full h-64 object-cover rounded-2xl border border-[#E0D7C9] shadow-md"
              />
              <div className="bg-[#F5F1EA] p-5 rounded-2xl border border-[#E0D7C9] space-y-1">
                <h4 className="font-serif-lim text-lg font-semibold text-[#1C1B18]">Hand-Brushed Limed Oil</h4>
                <p className="text-xs text-[#6E6659]">Deep organic penetration preserving tactile wood pores.</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="bg-[#1C1B18] text-[#FAF8F5] p-5 rounded-2xl space-y-2 text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">JOINERY CODE</span>
                <h4 className="font-serif-lim text-lg font-medium">Mortise & Tenon Precision</h4>
                <p className="text-xs text-[#D8CEBE]">Traditional joinery designed to last generations without structural fatigue.</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80"
                alt="Minimalist room finish"
                className="w-full h-64 object-cover rounded-2xl border border-[#E0D7C9] shadow-md"
              />
            </div>
          </div>

        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left pt-8 border-t border-[#E6DFD5]">
          
          <div className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#E0D7C9] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1C1B18] text-[#D4AF37] flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-serif-lim text-2xl font-semibold text-[#1C1B18]">Purity of Line</h3>
            <p className="text-xs text-[#6E6659] leading-relaxed">
              Every curve, shadow gap, and bevel is calculated to create quiet visual balance without unneeded noise.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#E0D7C9] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1C1B18] text-[#D4AF37] flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-serif-lim text-2xl font-semibold text-[#1C1B18]">Honest Materiality</h3>
            <p className="text-xs text-[#6E6659] leading-relaxed">
              We celebrate natural grain variations, porous travertine stone inclusions, and linen slubs as organic signatures.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#E0D7C9] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#1C1B18] text-[#D4AF37] flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-serif-lim text-2xl font-semibold text-[#1C1B18]">Bespoke Adaptability</h3>
            <p className="text-xs text-[#6E6659] leading-relaxed">
              Every build is individually customized for scale, timber species, and finish to harmonize with your interior.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
