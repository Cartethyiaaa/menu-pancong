import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { GoldUnderlineHeading } from './GoldUnderlineHeading';
import { MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';

export const PaketSection: React.FC = () => {
  const { addToCart, setActivePhoto } = useCart();
  const paketItems = MENU_ITEMS.filter((item) => item.category === 'Paket Hemat');

  return (
    <section id="paket" className="py-24 px-6 md:px-16 bg-[#0a0704] border-t border-[#c9973e]/15">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <GoldUnderlineHeading subtitle="LEBIH HEMAT &bull; LEBIH PUAS">
            Pilihan Paket Hemat Pancong Lumer
          </GoldUnderlineHeading>
          <p className="mt-4 text-[#a0988e] text-sm md:text-base font-sans font-light max-w-lg">
            Kombinasi pancong lumer hangat dan minuman favorit Sevenov Blend &mdash; ramah di kantong, nikmat di lidah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paketItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group bg-[#140d07] border border-[#c9973e]/20 hover:border-[#c9973e]/60 rounded-sm overflow-hidden flex flex-col shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image Wrap */}
              {item.image && (
                <div
                  className="relative h-48 overflow-hidden bg-black cursor-pointer"
                  onClick={() =>
                    setActivePhoto({
                      src: item.image!,
                      title: item.name,
                      price: item.price,
                    })
                  }
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest bg-[#c9973e] text-[#0d0905] rounded-sm">
                      {item.badge}
                    </span>
                  )}
                  <div className="absolute top-3 right-3 z-10 px-2.5 py-1 text-xs font-bold font-serif bg-black/70 text-[#c9973e] border border-[#c9973e]/40 rounded-sm">
                    {item.formattedPrice}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140d07] via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3
                    className="text-xl font-normal text-[#f5f0e8] group-hover:text-[#c9973e] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-[#a0988e] font-sans font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#c9973e]/15 flex items-center justify-between">
                  <span className="text-xl font-bold text-[#c9973e] font-serif">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>

                  <button
                    type="button"
                    onClick={() => addToCart(item.name, item.price, item.image)}
                    className="px-4 py-2 bg-[#c9973e] hover:bg-[#e0aa48] text-[#0d0905] text-xs font-sans font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(201,151,62,0.25)] active:scale-95"
                    aria-label={`Tambah ${item.name} ke keranjang`}
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    + Keranjang
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
