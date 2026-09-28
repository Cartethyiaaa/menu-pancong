import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { GoldUnderlineHeading } from './GoldUnderlineHeading';
import { MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MenuItem['category']>('Pancong Lumer');
  const { addToCart } = useCart();

  const categories: MenuItem['category'][] = [
    'Pancong Lumer',
    'Coffee',
    'Non Coffee',
    'Food Menu',
  ];

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-6 md:px-16 bg-[#0d0905] relative border-t border-[#c9973e]/15">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <GoldUnderlineHeading subtitle="MENU LENGKAP &bull; BASEUH DIJERO">
            Daftar Menu Pancong Donto
          </GoldUnderlineHeading>
          <p className="mt-4 text-[#a0988e] text-sm md:text-base font-sans font-light max-w-lg">
            Harga sudah termasuk pajak. Tersedia opsi matang &amp; setengah matang (lumer) sesuai selera.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 scrollbar-none gap-2 sm:gap-6 border-b border-[#c9973e]/20">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-3 text-[12px] uppercase tracking-[0.2em] font-sans transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'text-[#c9973e] font-semibold'
                    : 'text-[#a0988e] hover:text-[#f5f0e8] font-normal'
                }`}
              >
                {category}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9973e]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid without photos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.035,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                className={`group flex items-center justify-between p-3.5 rounded-sm transition-all duration-300 ${
                  item.isHighlight
                    ? 'bg-white/[0.025] border border-[#c9973e]/15 hover:border-[#c9973e]/35'
                    : 'hover:bg-white/[0.02] border border-transparent'
                }`}
              >
                {/* Info */}
                <div className="flex-1 pr-3 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4
                      className="text-base sm:text-lg font-medium text-[#f5f0e8] group-hover:text-[#c9973e] transition-colors truncate"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {item.name}
                    </h4>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#c9973e]/15 text-[#c9973e] border border-[#c9973e]/30 rounded-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#a0988e] font-sans font-light truncate mt-0.5">
                    {item.description}
                  </p>
                </div>

                {/* Dot Leader */}
                <div className="hidden sm:block flex-1 border-b border-dotted border-[#c9973e]/25 mx-2 mb-1" />

                {/* Price & Add Button */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className="text-base sm:text-lg font-bold text-[#c9973e] font-serif tabular-nums tracking-wide"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {item.formattedPrice}
                  </span>

                  <button
                    type="button"
                    onClick={() => addToCart(item.name, item.price)}
                    className="w-7 h-7 rounded-full bg-[#c9973e]/15 hover:bg-[#c9973e] text-[#c9973e] hover:text-[#0d0905] border border-[#c9973e]/40 flex items-center justify-center transition-all active:scale-90"
                    aria-label={`Tambah ${item.name} ke keranjang`}
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA row */}
        <div className="mt-14 p-6 rounded-sm bg-[#160e08] border border-[#c9973e]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#a0988e] font-sans text-center sm:text-left">
            💬 Mau tanya rekomendasi rasa atau varian setengah matang? Hubungi kami langsung!
          </p>
          <a
            href="https://wa.me/6285782203468?text=Halo%20Pancong%20Donto,%20saya%20mau%20tanya%20menu"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-xs uppercase tracking-wider bg-[#c9973e] text-[#0d0905] font-sans font-bold rounded-sm whitespace-nowrap hover:bg-[#e0aa48] transition-colors"
          >
            Tanya via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
