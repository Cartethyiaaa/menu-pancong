import React from 'react';
import { CartProvider } from './context/CartContext';
import { GrainOverlay } from './components/GrainOverlay';
import { Navbar } from './components/Navbar';
import GlassHeadlineHero from './components/ui/glass-headline-hero';
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
        {/* Visual Effect: Fine Grain Paper Texture Overlay */}
        <GrainOverlay />

        {/* Navigation Bar */}
        <Navbar />

        <main>
          {/* Page Awal / First Landing Hero: WebGL2 Thick Refractive Glass Headline Hero */}
          <GlassHeadlineHero
            id="home"
            eyebrow="SPECIALTY PANCONG &bull; CIANJUR SEJAK 2018"
            title="Baseuh Dijero Garing Diluar"
            description="Kue pancong lumer autentik dengan lelehan topping melimpah mulai 5rb dan racikan kopi spesial Sevenov Signature Blend."
            colors={["#0d0905", "#e5a65e", "#ff7a29", "#c9973e", "#f5f0e8"]}
            primaryAction={{
              label: "Jelajahi Menu",
              href: "#bestseller",
            }}
            secondaryAction={{
              label: "Pesan via WhatsApp",
              href: "https://wa.me/6285782203468?text=Halo%20Pancong%20Donto,%20saya%20mau%20pesan",
            }}
            height="100svh"
            className="border-b border-[#c9973e]/20"
          />

          {/* 3D Coverflow Carousel Menu & Foto */}
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
