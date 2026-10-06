import React, { useState } from 'react';
import { Eye, MapPin, ShoppingBag, Sparkles, Check, ChevronRight } from 'lucide-react';
import { ROOM_PRESETS, PRODUCTS } from '../data/furnitureData';

export default function RoomVisualizer({ onAddToCart, currency, formatPrice }) {
  const [activeRoom, setActiveRoom] = useState(ROOM_PRESETS[0]);
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <section id="visualizer" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F1EA] border-b border-[#E6DFD5]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#D8CEBE] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#4A453E]">
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Spatial Interior Studio</span>
          </div>
          <h2 className="font-serif-lim text-4xl sm:text-5xl text-[#1C1B18] font-light tracking-tight">
            Architectural Room Visualizer
          </h2>
          <p className="text-sm sm:text-base text-[#6E6659]">
            Visualize Count Kustomzz bespoke pieces in minimalist residential sanctuaries. Click hotspots to inspect scale & materiality.
          </p>
        </div>

        {/* Room Preset Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {ROOM_PRESETS.map((room) => (
            <button
              key={room.id}
              onClick={() => {
                setActiveRoom(room);
                setActiveHotspot(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeRoom.id === room.id
                  ? 'bg-[#1C1B18] text-[#FAF8F5] shadow-md'
                  : 'bg-[#FAF8F5] text-[#4A453E] border border-[#E0D7C9] hover:bg-[#EAE4DA]'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Room Interactive Display Canvas */}
        <div className="relative aspect-[16/9] min-h-[400px] sm:min-h-[550px] rounded-3xl overflow-hidden border border-[#E0D7C9] shadow-2xl bg-[#1C1B18]">
          <img
            src={activeRoom.image}
            alt={activeRoom.name}
            className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"></div>

          {/* Hotspot Markers */}
          {activeRoom.hotspots.map((spot, idx) => {
            const product = PRODUCTS.find(p => p.id === spot.productId);
            const isSelected = activeHotspot && activeHotspot.productId === spot.productId;

            return (
              <div
                key={idx}
                className="absolute z-20 transition-transform hover:scale-110"
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
              >
                <button
                  onClick={() => setActiveHotspot(product)}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-[#D4AF37] text-[#1C1B18] ring-4 ring-white shadow-2xl scale-125'
                      : 'bg-[#1C1B18]/90 text-[#FAF8F5] border border-white/50 hover:bg-[#D4AF37] hover:text-[#1C1B18]'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span className="absolute -inset-1 rounded-full bg-[#D4AF37]/40 animate-ping pointer-events-none"></span>
                </button>

                {/* Hotspot Tooltip */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-[#1C1B18]/95 text-[#FAF8F5] backdrop-blur px-3 py-1.5 rounded-lg border border-stone-700 text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap pointer-events-none shadow-lg">
                  {spot.name}
                </div>
              </div>
            );
          })}

          {/* Bottom Room Label */}
          <div className="absolute bottom-6 left-6 z-10 text-left text-white space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-black/60 px-2.5 py-1 rounded backdrop-blur">
              Sanctuary View
            </span>
            <h3 className="font-serif-lim text-2xl sm:text-3xl font-medium">
              {activeRoom.name}
            </h3>
          </div>
        </div>

        {/* Selected Hotspot Detailed Product Card */}
        {activeHotspot && (
          <div className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-2xl p-6 shadow-xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-left animate-fadeIn">
            <img
              src={activeHotspot.image}
              alt={activeHotspot.name}
              className="w-28 h-28 object-cover rounded-xl border border-[#E0D7C9]"
            />
            <div className="space-y-2 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7C7569]">
                Selected Room Piece
              </span>
              <h4 className="font-serif-lim text-2xl font-medium text-[#1C1B18]">
                {activeHotspot.name}
              </h4>
              <p className="text-xs text-[#6E6659]">
                {activeHotspot.dimensions} • {activeHotspot.material}
              </p>
              <div className="font-serif-lim text-xl font-semibold text-[#1C1B18]">
                {formatPrice(activeHotspot.price, currency)}
              </div>
            </div>
            <button
              onClick={() => onAddToCart(activeHotspot)}
              className="bg-[#1C1B18] text-[#FAF8F5] px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#38352F] transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span>Add to Inquiry</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
