import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalQty, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu Favorit', href: '#bestseller' },
    { label: 'Cerita Kami', href: '#tentang' },
    { label: 'Daftar Menu', href: '#menu' },
    { label: 'Paket Hemat', href: '#paket' },
    { label: 'Lokasi', href: '#lokasi' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 h-16 md:h-20 flex items-center px-6 md:px-16 ${
          isScrolled
            ? 'bg-[#0d0905]/95 backdrop-blur-md border-b border-[#c9973e]/25 shadow-lg shadow-black/60'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo & Brand Name */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="img/logo.png"
              alt="Pancong Donto Logo"
              className="w-9 h-9 md:w-11 md:h-11 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span
                className="text-[19px] md:text-[21px] text-[#f5f0e8] group-hover:text-[#c9973e] transition-colors duration-300 font-serif tracking-[0.08em] font-normal leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Pancong Donto
              </span>
              <span className="text-[9px] md:text-[10px] text-[#c9973e] tracking-[0.22em] uppercase font-sans font-medium">
                SPECIALTY PANCONG &amp; COFFEE
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.16em] text-[#a0988e] hover:text-[#c9973e] transition-colors duration-300 font-sans font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons: Keranjang & WA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative px-4 py-2 border border-[#c9973e]/40 hover:border-[#c9973e] text-[#f5f0e8] hover:text-[#c9973e] text-[11px] uppercase tracking-[0.15em] font-sans font-medium transition-colors flex items-center gap-2 rounded-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#c9973e]" />
              <span>Keranjang</span>
              {totalQty > 0 && (
                <span className="bg-[#c9973e] text-[#0d0905] text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {totalQty}
                </span>
              )}
            </button>

            <a
              href="https://wa.me/6285782203468?text=Halo%20Pancong%20Donto,%20saya%20mau%20pesan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-[#0d0905] bg-[#c9973e] hover:bg-[#e0aa48] transition-all duration-300 font-sans font-semibold rounded-sm shadow-[0_0_18px_rgba(201,151,62,0.25)] flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WA Admin</span>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
            aria-label="Buka menu navigasi"
          >
            <span
              className={`block w-6 h-[1.5px] bg-[#c9973e] transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#c9973e] transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-[#c9973e] transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#0d0905]/98 backdrop-blur-xl flex flex-col items-center justify-center px-8 lg:hidden"
          >
            <nav className="flex flex-col items-center space-y-6 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="text-2xl text-[#f5f0e8] hover:text-[#c9973e] transition-colors font-serif font-light tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="pt-6 flex flex-col items-center gap-3 w-full max-w-xs">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full py-3 text-xs uppercase tracking-[0.18em] border border-[#c9973e] text-[#c9973e] font-sans font-semibold rounded-sm flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Keranjang ({totalQty})
                </button>
                <a
                  href="https://wa.me/6285782203468?text=Halo%20Pancong%20Donto,%20saya%20mau%20pesan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 text-xs uppercase tracking-[0.18em] bg-[#c9973e] text-[#0d0905] font-sans font-semibold rounded-sm text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Pesan via WhatsApp
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
