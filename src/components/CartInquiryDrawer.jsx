import React from 'react';
import { X, Trash2, ShoppingBag, Send, Phone, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import Instagram from './InstagramIcon';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/furnitureData';

export default function CartInquiryDrawer({ isOpen, onClose, cart, onRemoveItem, onClearCart, currency, formatPrice }) {
  if (!isOpen) return null;

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const generateIGSummaryText = () => {
    const lines = cart.map(
      (item, i) => `${i + 1}. ${item.name} | ${item.dimensions} | ${formatPrice(item.price, currency)}`
    );
    return `COUNT KUSTOMZZ INQUIRY:\n${lines.join('\n')}\nTotal Est: ${formatPrice(totalPrice, currency)}`;
  };

  const handleSendIG = () => {
    const text = generateIGSummaryText();
    navigator.clipboard.writeText(text);
    window.open(INSTAGRAM_URL, '_blank');
  };

  const handleSendWhatsApp = () => {
    const text = generateIGSummaryText();
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl border-l border-[#E0D7C9] flex flex-col justify-between text-left">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E0D7C9] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif-lim text-2xl font-semibold text-[#1C1B18]">
                Bespoke Inquiry List
              </h3>
              <span className="bg-[#1C1B18] text-[#FAF8F5] text-xs px-2 py-0.5 rounded-full font-bold">
                {cart.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#7C7569] hover:text-[#1C1B18] hover:bg-[#EAE4DA] rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#EAE4DA] text-[#7C7569] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif-lim text-xl font-medium text-[#1C1B18]">Your Inquiry List is Empty</p>
                  <p className="text-xs text-[#7C7569]">
                    Explore our collection or custom configurator to add bespoke architectural pieces.
                  </p>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/80 p-4 rounded-2xl border border-[#E0D7C9] space-y-3 relative group shadow-sm"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl border border-[#E0D7C9]"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif-lim text-lg font-semibold text-[#1C1B18] line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#6E6659]">
                        {item.dimensions}
                      </p>

                      {item.primaryMaterial && (
                        <p className="text-[10px] text-[#7C7569] bg-[#F5F1EA] px-2 py-0.5 rounded inline-block">
                          Finish: {item.primaryMaterial}
                        </p>
                      )}

                      <div className="font-serif-lim text-base font-semibold text-[#1C1B18] pt-1">
                        {formatPrice(item.price, currency)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Actions */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E0D7C9] bg-[#FAF8F5] space-y-4">
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#7C7569]">
                  <span>Total Bespoke Build Count:</span>
                  <span className="font-semibold text-[#1C1B18]">{cart.length} Pieces</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">
                    Estimated Total Quote
                  </span>
                  <span className="font-serif-lim text-3xl font-semibold text-[#1C1B18]">
                    {formatPrice(totalPrice, currency)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleSendIG}
                  className="w-full bg-[#1C1B18] text-[#FAF8F5] py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#38352F] transition flex items-center justify-center gap-2 shadow-md"
                >
                  <Instagram className="w-4 h-4 text-[#D4AF37]" />
                  <span>Send Inquiry to IG DM ({INSTAGRAM_HANDLE})</span>
                </button>

                <button
                  onClick={handleSendWhatsApp}
                  className="w-full bg-emerald-700 text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-emerald-800 transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>

                <button
                  onClick={onClearCart}
                  className="w-full text-center text-[11px] text-[#7C7569] hover:text-rose-600 transition py-1"
                >
                  Clear Inquiry List
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
