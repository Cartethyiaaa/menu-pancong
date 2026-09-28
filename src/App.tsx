import React from 'react';
import { CartProvider } from './context/CartContext';
import { GrainOverlay } from './components/GrainOverlay';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Bestsellers } from './components/Bestsellers';
import { Philosophy } from './components/Philosophy';
import { MenuSection } from './components/MenuSection';
import { PaketSection } from './components/PaketSection';
import { Testimonials } from './components/Testimonials';
import { Reservations } from './components/Reservations';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { PhotoModal } from './components/PhotoModal';
import { Toast, FloatingActions } from './components/Toast';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#0d0905] text-[#f5f0e8] overflow-x-hidden selection:bg-[#c9973e]/30 selection:text-[#f5f0e8]">
        {/* Visual Effect 2: Fine Grain Paper Texture Overlay */}
        <GrainOverlay />

        {/* Navigation */}
        <Navbar />

        <main>
          {/* Visual Effect 1: Full-Screen Looping Video Hero */}
          <Hero />

          {/* Favorit Pelanggan / Best Seller */}
          <Bestsellers />

          {/* Cerita Kami & Sevenov Beans */}
          <Philosophy />

          {/* Daftar Menu Lengkap dengan Foto Highlight */}
          <MenuSection />

          {/* Paket Hemat Pancong & Minuman */}
          <PaketSection />

          {/* Ulasan & Cerita Pelanggan */}
          <Testimonials />

          {/* Visual Effect 5: Glassmorphism Booking & Pre-Order */}
          <Reservations />

          {/* Lokasi Kedai & Google Maps */}
          <LocationSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Modals & Drawers */}
        <CartDrawer />
        <PhotoModal />
        <Toast />
        <FloatingActions />
      </div>
    </CartProvider>
  );
};

export default App;
