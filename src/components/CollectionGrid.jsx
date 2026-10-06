import React, { useState } from 'react';
import { ShoppingBag, Eye, X, Check, ArrowRight, Sparkles, Filter, Ruler } from 'lucide-react';
import { PRODUCTS, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/furnitureData';

export default function CollectionGrid({ onAddToCart, currency, formatPrice }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const categories = ['All', 'Dining', 'Seating', 'Tables', 'Storage', 'Objects', 'Architectural'];

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <section id="collection" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E6DFD5]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7C7569]">
              COUNT KUSTOMZZ CATALOGUE
            </span>
            <h2 className="font-serif-lim text-4xl sm:text-5xl text-[#1C1B18] font-light tracking-tight">
              Curated Sanctuary Collection
            </h2>
            <p className="text-sm text-[#6E6659]">
              Architectural furniture pieces handcrafted to order. Each piece is individually stamped, numbered, and documented in our studio register.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1C1B18] text-[#FAF8F5] shadow-sm'
                    : 'bg-[#EAE4DA] text-[#4A453E] hover:bg-[#DCD4C7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#FAF8F5] border border-[#E0D7C9] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-[#1C1B18]/40 transition-all duration-300 flex flex-col justify-between transform"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-[#EAE4DA] overflow-hidden cursor-pointer" onClick={() => setQuickViewProduct(product)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover img-zoom transition-transform duration-700"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#1C1B18]/90 text-[#FAF8F5] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded backdrop-blur">
                      {product.badge}
                    </span>
                  )}

                  {/* Quick View Button Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="bg-[#FAF8F5] text-[#1C1B18] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-white flex items-center gap-1.5 transition-transform hover:scale-105"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick Specs</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-semibold text-[#7C7569] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-serif-lim text-2xl font-medium text-[#1C1B18] group-hover:text-[#6E6659] transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    <span className="font-serif-lim text-xl font-semibold text-[#1C1B18]">
                      {formatPrice(product.price, currency)}
                    </span>
                  </div>

                  <p className="text-xs text-[#6E6659] line-clamp-2">
                    {product.description}
                  </p>

                  <div className="pt-2 border-t border-[#E0D7C9] flex items-center justify-between text-[11px] text-[#7C7569]">
                    <span className="flex items-center gap-1">
                      <Ruler className="w-3 h-3 text-[#1C1B18]" />
                      {product.dimensions}
                    </span>
                    <span className="font-medium text-[#1C1B18]">
                      {product.material}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full bg-[#1C1B18] text-[#FAF8F5] py-3 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#38352F] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add to Bespoke Inquiry</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-3xl w-full border border-[#E0D7C9] shadow-2xl overflow-hidden relative text-left grid grid-cols-1 md:grid-cols-2">
            
            {/* Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-[#1C1B18]/80 text-white rounded-full hover:bg-[#1C1B18] transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Left Image */}
            <div className="relative aspect-square md:aspect-auto bg-[#EAE4DA]">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Right Info */}
            <div className="p-8 space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#7C7569]">
                  {quickViewProduct.category} • {quickViewProduct.badge}
                </span>
                <h3 className="font-serif-lim text-3xl font-medium text-[#1C1B18] mt-1">
                  {quickViewProduct.name}
                </h3>
                <div className="font-serif-lim text-2xl font-semibold text-[#1C1B18] mt-2">
                  {formatPrice(quickViewProduct.price, currency)}
                </div>

                <p className="text-xs text-[#5C5549] mt-4 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Specs List */}
                <div className="mt-6 space-y-2 text-xs border-t border-b border-[#E0D7C9] py-4">
                  <div className="flex justify-between">
                    <span className="text-[#7C7569]">Dimensions:</span>
                    <span className="font-semibold text-[#1C1B18]">{quickViewProduct.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7C7569]">Primary Material:</span>
                    <span className="font-semibold text-[#1C1B18]">{quickViewProduct.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7C7569]">Lead Time:</span>
                    <span className="font-semibold text-emerald-700">{quickViewProduct.leadTime}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    onAddToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="w-full bg-[#1C1B18] text-[#FAF8F5] py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#38352F] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add to Inquiry List</span>
                </button>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#EAE4DA] text-[#1C1B18] py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#DCD4C7] transition-all flex items-center justify-center gap-2 border border-[#D8CEBE]"
                >
                  <span>Ask Question via IG DM ({INSTAGRAM_HANDLE})</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
