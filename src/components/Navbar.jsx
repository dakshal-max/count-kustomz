import React, { useState } from 'react';
import { ShoppingBag, Sliders, Eye, Sparkles, Compass, Menu, X, ArrowUpRight } from 'lucide-react';
import Instagram from './InstagramIcon';
import WhatsAppIcon from './WhatsAppIcon';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, WHATSAPP_URL, WHATSAPP_DISPLAY } from '../data/furnitureData';

export default function Navbar({ cartCount, onOpenCart, activeSection, setActiveSection, currency, setCurrency }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'collection', label: 'Collection & Live-Edge' },
    { id: 'configurator', label: '3D Configurator', badge: 'Interactive' },
    { id: 'visualizer', label: 'Room Visualizer' },
    { id: 'instagram', label: 'Instagram', icon: Instagram },
    { id: 'bespoke', label: 'Bespoke Inquiry' },
    { id: 'philosophy', label: 'LIM Philosophy' },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-lim border-b border-[#E6DFD5]/80 transition-all duration-300">
      {/* Top micro announcement bar */}
      <div className="bg-[#1C1B18] text-[#FAF8F5] text-[11px] font-medium tracking-widest uppercase py-1.5 px-4 text-center flex items-center justify-center gap-3">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
        <span className="truncate">COUNT KUSTOM ATELIER — BESPOKE & LIVE-EDGE SLAB CRAFTSMANSHIP</span>
        
        <div className="hidden md:flex items-center gap-4 ml-2 border-l border-stone-700 pl-3 text-[#D8CEBE] shrink-0">
          <a 
            href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hello! I'd like to enquire about live-edge & bespoke furniture.")}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#25D366] transition-colors"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
            <span>WA: {WHATSAPP_DISPLAY}</span>
          </a>

          <a 
            href={INSTAGRAM_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
          >
            <span>{INSTAGRAM_HANDLE}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[4.5rem] py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo - Clean single-line responsive typography */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="text-left group flex flex-col justify-center focus:outline-none shrink-0 max-w-[65%] sm:max-w-none"
        >
          <span className="font-serif-lim text-lg sm:text-2xl md:text-2xl lg:text-3xl font-semibold tracking-wider text-[#1C1B18] group-hover:text-[#6E6659] transition-colors uppercase whitespace-nowrap leading-tight">
            COUNT KUSTOM ATELIER
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] font-medium text-[#7C7569] uppercase whitespace-nowrap block mt-0.5">
            LIM Studio • Bespoke Furniture
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-all rounded-full flex items-center gap-1.5 ${
                activeSection === item.id
                  ? 'bg-[#1C1B18] text-[#FAF8F5]'
                  : 'text-[#4A453E] hover:text-[#1C1B18] hover:bg-[#EAE4DA]'
              }`}
            >
              {item.label}
              {item.badge && (
                <span className="bg-[#D4AF37]/20 text-[#8C6D1F] text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right side controls: WhatsApp, Currency, IG link, Inquiry Drawer */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Currency Switcher */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-[#EAE4DA]/70 border border-[#D8CEBE] text-[#1C1B18] text-xs uppercase px-2 py-1.5 rounded-md focus:outline-none focus:border-[#1C1B18] font-medium cursor-pointer"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
          </select>

          {/* WhatsApp Direct Link */}
          <a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hello! I'd like to enquire about your live-edge & bespoke furniture.")}`}
            target="_blank"
            rel="noopener noreferrer"
            title={`WhatsApp Enquiry: ${WHATSAPP_DISPLAY}`}
            className="p-2 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white rounded-full transition-all flex items-center gap-1.5 border border-[#25D366]/30 font-medium text-xs"
          >
            <WhatsAppIcon className="w-4 h-4 fill-[#25D366] group-hover:fill-white" />
            <span className="hidden xl:inline text-[11px] font-mono tracking-wider">{WHATSAPP_DISPLAY}</span>
          </a>

          {/* Instagram Direct Link Badge */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Instagram @countkustom.atelier"
            className="p-2 text-[#1C1B18] hover:text-[#D4AF37] hover:bg-[#EAE4DA] rounded-full transition-all flex items-center gap-1.5 border border-[#E0D8CC]"
          >
            <Instagram className="w-4 h-4" />
            <span className="hidden xl:inline text-[11px] font-semibold tracking-wider uppercase">IG</span>
          </a>

          {/* Cart / Inquiry Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative bg-[#1C1B18] text-[#FAF8F5] px-3.5 py-2 sm:px-4 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center gap-2 hover:bg-[#33312C] transition-all shadow-sm group"
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Inquiry list</span>
            <span className="bg-[#D4AF37] text-[#1C1B18] text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1C1B18] hover:bg-[#EAE4DA] rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E6DFD5] px-6 py-6 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD5]">
            <span className="text-xs uppercase tracking-widest text-[#7C7569] font-semibold">Navigation</span>
            <div className="flex items-center gap-3">
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#25D366] flex items-center gap-1"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" /> WA
              </a>
              <a 
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#D4AF37] flex items-center gap-1"
              >
                {INSTAGRAM_HANDLE} <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="w-full text-left py-2.5 text-sm font-medium tracking-wider uppercase text-[#1C1B18] hover:text-[#7C7569] flex items-center justify-between border-b border-[#F0EBE1]"
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="bg-[#D4AF37]/20 text-[#8C6D1F] text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
