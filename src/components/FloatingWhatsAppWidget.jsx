import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from '../data/furnitureData';

export default function FloatingWhatsAppWidget() {
  const message = encodeURIComponent("Hello Count Kustom Atelier! I'd like to enquire about your live-edge & custom furniture builds.");
  const directLink = `${WHATSAPP_URL}?text=${message}`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
      <a
        href={directLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-[#25D366] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-3 hover:bg-[#20ba5a] transition-all transform hover:scale-105"
        title={`WhatsApp Enquiry: ${WHATSAPP_DISPLAY}`}
      >
        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none"></span>

        <WhatsAppIcon className="w-6 h-6 fill-white" />

        <div className="hidden sm:flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100">
            WhatsApp Enquiry
          </span>
          <span className="text-xs font-semibold font-mono tracking-wide">
            {WHATSAPP_DISPLAY}
          </span>
        </div>
      </a>
    </div>
  );
}
