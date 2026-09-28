import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const PhotoModal: React.FC = () => {
  const { activePhoto, setActivePhoto, addToCart } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
      }
    };
    if (activePhoto) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhoto, setActivePhoto]);

  return (
    <AnimatePresence>
      {activePhoto && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-md bg-[#160e08] border border-[#c9973e]/40 rounded-sm overflow-hidden shadow-2xl shadow-black/80"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 text-[#f5f0e8] hover:text-[#c9973e] hover:bg-black/90 flex items-center justify-center transition-colors border border-white/10"
              aria-label="Tutup preview foto"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Photo Wrap */}
            <div className="w-full aspect-square bg-[#0d0905] overflow-hidden relative">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160e08] via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>

            {/* Modal Body / Footer */}
            <div className="p-6 bg-[#160e08] flex items-center justify-between gap-4 border-t border-[#c9973e]/20">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c9973e] font-sans font-medium">
                  FOTO MENU ASLI
                </span>
                <h4
                  className="text-2xl font-normal text-[#f5f0e8] leading-tight mt-0.5"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {activePhoto.title}
                </h4>
                <p className="text-[17px] font-bold text-[#c9973e] font-serif tracking-wider mt-1">
                  Rp {activePhoto.price.toLocaleString('id-ID')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  addToCart(activePhoto.title, activePhoto.price, activePhoto.src);
                  setActivePhoto(null);
                }}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.16em] font-sans font-semibold text-[#0d0905] bg-[#c9973e] hover:bg-[#e0aa48] transition-all shadow-[0_0_20px_rgba(201,151,62,0.3)] active:scale-95 flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                Pesan
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
