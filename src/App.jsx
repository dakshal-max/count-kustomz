import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConfiguratorStudio from './components/ConfiguratorStudio';
import CollectionGrid from './components/CollectionGrid';
import RoomVisualizer from './components/RoomVisualizer';
import InstagramFeed from './components/InstagramFeed';
import BespokeInquiryForm from './components/BespokeInquiryForm';
import PhilosophySection from './components/PhilosophySection';
import CartInquiryDrawer from './components/CartInquiryDrawer';
import Footer from './components/Footer';
import FloatingWhatsAppWidget from './components/FloatingWhatsAppWidget';
import Preloader from './components/Preloader';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [activeSection, setActiveSection] = useState('hero');
  const [cartOpen, setCartOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [toastMessage, setToastMessage] = useState(null);

  // Currency rate mapping relative to USD
  const currencyRates = {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.78 },
    INR: { symbol: '₹', rate: 83.5 },
  };

  const formatPrice = (priceInUSD, currKey = currency) => {
    const curr = currencyRates[currKey] || currencyRates.USD;
    const converted = priceInUSD * curr.rate;
    if (currKey === 'INR') {
      return `${curr.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${curr.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  };

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    showToast(`Added "${product.name}" to your Bespoke Inquiry List.`);
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1B18] font-sans antialiased selection:bg-[#EAE4DA]">
      
      {/* Animated Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Navigation Header */}
      <Navbar
        cartCount={cart.length}
        onOpenCart={() => setCartOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Banner */}
        <Hero
          onExploreConfigurator={() => scrollToSection('configurator')}
          onExploreCollection={() => scrollToSection('collection')}
          onOpenBespoke={() => scrollToSection('bespoke')}
        />

        {/* 3D Configurator Studio */}
        <ConfiguratorStudio
          onAddToCart={handleAddToCart}
          currency={currency}
          formatPrice={formatPrice}
        />

        {/* Curated Product Collection Grid */}
        <CollectionGrid
          onAddToCart={handleAddToCart}
          currency={currency}
          formatPrice={formatPrice}
        />

        {/* Room Visualizer */}
        <RoomVisualizer
          onAddToCart={handleAddToCart}
          currency={currency}
          formatPrice={formatPrice}
        />

        {/* Instagram Feed (@countkustom.atelier) Showcase */}
        <InstagramFeed />

        {/* Custom Bespoke Inquiry Form */}
        <BespokeInquiryForm />

        {/* LIM Philosophy & Craftsmanship */}
        <PhilosophySection />
      </main>

      {/* Cart & Inquiry Drawer */}
      <CartInquiryDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currency={currency}
        formatPrice={formatPrice}
      />

      {/* Footer */}
      <Footer />

      {/* Floating Sticky WhatsApp Widget */}
      <FloatingWhatsAppWidget />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1B18] text-[#FAF8F5] px-5 py-3.5 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-3 animate-slideUp text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
