import React, { useState } from 'react';
import { ArrowUpRight, Check, Send } from 'lucide-react';
import Instagram from './InstagramIcon';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/furnitureData';

export default function Footer() {
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscribedEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1C1B18] text-[#FAF8F5] py-20 px-4 sm:px-6 lg:px-8 border-t border-stone-800 text-left">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Brand Info (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="font-serif-lim text-3xl font-semibold tracking-wider text-[#FAF8F5] uppercase">
                COUNT KUSTOM ATELIER
              </h3>
              <p className="text-xs text-[#D8CEBE] font-mono tracking-widest uppercase mt-1">
                LIM STUDIO • BESPOKE FURNITURE ARCHITECTURE
              </p>
            </div>

            <p className="text-xs text-stone-400 max-w-md font-light leading-relaxed">
              Crafting monolithic furniture forms with tactile minimalism, organic timber, honed travertine, and raw linen. Designed for silent residential and gallery spaces.
            </p>

            <div className="pt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FAF8F5] text-[#1C1B18] px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#D4AF37] transition"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow {INSTAGRAM_HANDLE}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Studio Navigation
            </span>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <a href="#collection" className="hover:text-[#D4AF37] transition">Curated Collection</a>
              </li>
              <li>
                <a href="#configurator" className="hover:text-[#D4AF37] transition">3D Interactive Configurator</a>
              </li>
              <li>
                <a href="#visualizer" className="hover:text-[#D4AF37] transition">Architectural Room Visualizer</a>
              </li>
              <li>
                <a href="#instagram" className="hover:text-[#D4AF37] transition">Instagram Feed (@countkustomzz)</a>
              </li>
              <li>
                <a href="#bespoke" className="hover:text-[#D4AF37] transition">Bespoke Custom Inquiry</a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-[#D4AF37] transition">The LIM Philosophy</a>
              </li>
            </ul>
          </div>

          {/* Small Batch Drop Newsletter (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Small Batch Drop Register
            </span>
            <p className="text-xs text-stone-400 font-light">
              Receive private invitations to limited bespoke furniture edition releases and timber arrival notes.
            </p>

            {subscribed ? (
              <div className="bg-stone-800 text-[#D4AF37] p-4 rounded-xl text-xs flex items-center gap-2 border border-stone-700">
                <Check className="w-4 h-4" />
                <span>You are registered for upcoming studio drops!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={subscribedEmail}
                  onChange={(e) => setSubscribedEmail(e.target.value)}
                  className="bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#D4AF37] text-[#1C1B18] px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} COUNT KUSTOM ATELIER STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>LIM AESTHETIC STUDIO</span>
            <span>•</span>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37]">
              INSTAGRAM: {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
