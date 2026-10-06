import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const brandText = "COUNT KUSTOMz";
  const [lettersRevealed, setLettersRevealed] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Reveal letters one after another
    const interval = setInterval(() => {
      setLettersRevealed((prev) => {
        if (prev < brandText.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          // Trigger smooth fade out after full text reveal
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 700); // duration of fade out
          }, 600);
          return prev;
        }
      });
    }, 120); // 120ms delay per letter

    return () => clearInterval(interval);
  }, []);

  const progressPercent = Math.round((lettersRevealed / brandText.length) * 100);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1C1B18] text-[#FAF8F5] transition-opacity duration-700 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Brand Logo Seal */}
      <div className="w-20 h-20 mb-8 rounded-full border-2 border-[#D4AF37]/50 p-1 shadow-2xl animate-pulse">
        <img
          src="/count-kustom-logo.jpg"
          alt="Count Kustom Atelier Logo"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Animated Letter-by-Letter "COUNT KUSTOMz" */}
      <div className="flex items-center tracking-widest font-serif-lim text-3xl sm:text-5xl md:text-6xl font-light">
        {brandText.split('').map((char, index) => (
          <span
            key={index}
            className={`transition-all duration-500 inline-block ${
              index < lettersRevealed
                ? 'opacity-100 translate-y-0 text-[#FAF8F5] filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.5)]'
                : 'opacity-0 translate-y-6 text-transparent'
            }`}
          >
            {char === ' ' ? '\u00A0\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Expanding Gold Accent Line */}
      <div className="w-56 sm:w-72 h-[2px] bg-stone-800 my-6 relative overflow-hidden rounded-full">
        <div
          className="h-full bg-gradient-to-r from-[#C8B082] via-[#D4AF37] to-[#FAF8F5] transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Sub-tagline reveal */}
      <p
        className={`text-xs uppercase tracking-[0.35em] text-[#D8CEBE] font-medium transition-all duration-700 ${
          lettersRevealed >= brandText.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        Bespoke Architectural Furniture Studio
      </p>

      {/* Bottom Loading Progress Percentage */}
      <div className="absolute bottom-10 flex items-center gap-3 text-[11px] uppercase tracking-widest text-[#7C7569]">
        <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>
        <span>Entering Atelier... <strong>{progressPercent}%</strong></span>
      </div>
    </div>
  );
}
