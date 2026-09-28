import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMsg, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {toastMsg && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-6 z-[99999] bg-[#1a100a] text-[#f5f0e8] border border-[#c9973e]/50 px-4 py-3 rounded shadow-2xl flex items-center gap-3 backdrop-blur-md"
        >
          <div className="w-5 h-5 rounded-full bg-[#c9973e] text-[#0d0905] flex items-center justify-center flex-shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs font-sans tracking-wide">{toastMsg}</span>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="text-xs uppercase tracking-wider font-semibold text-[#c9973e] hover:underline pl-2 border-l border-white/10"
          >
            Lihat
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const FloatingActions: React.FC = () => {
  const { totalQty, setIsCartOpen } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Floating Cart Button */}
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="relative bg-[#c9973e] hover:bg-[#e0aa48] text-[#0d0905] px-4 py-3 rounded-full flex items-center gap-2 shadow-2xl shadow-black/80 font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Buka Keranjang Pesanan"
      >
        <ShoppingBag className="w-4 h-4" />
        <span className="hidden sm:inline">Keranjang</span>
        {totalQty > 0 && (
          <span className="bg-[#0d0905] text-[#c9973e] text-[11px] font-bold px-2 py-0.5 rounded-full">
            {totalQty}
          </span>
        )}
      </button>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6285782203468?text=Halo%20Pancong%20Donto,%20saya%20mau%20pesan"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-[#0d0905] flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95"
        aria-label="Hubungi WhatsApp Admin"
      >
        <MessageCircle className="w-6 h-6 fill-current text-[#0d0905]" />
      </a>
    </div>
  );
};
