import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { GoldUnderlineHeading } from './GoldUnderlineHeading';
import { useCart } from '../context/CartContext';

export const Bestsellers: React.FC = () => {
  const { addToCart, setActivePhoto } = useCart();

  const bestsellerItems = [
    {
      name: 'Pancong Mix Topping',
      badge: 'TERLARIS',
      badgeColor: 'bg-[#d88924] text-[#100803]',
      desc: 'Pancong hangat lumer setengah matang dengan perpaduan saus cokelat dan keju parut gurih melimpah.',
      price: 6000,
      unit: '/ buah',
      image: 'img/hero_pancong_stage1.jpg',
    },
    {
      name: 'Butterscotch Coffee',
      badge: 'FAVORIT KEDAI',
      badgeColor: 'bg-[#c9973e] text-[#100803]',
      desc: 'Espresso aromatic Sevenov Blend dengan foam susu lembut dan sentuhan saus butterscotch karamel yang creamy legit.',
      price: 26000,
      unit: '/ gelas',
      image: 'img/menu_iced_coffee.jpg',
    },
    {
      name: 'Pisang Goreng Crispy',
      badge: 'CAMILAN GURIH',
      badgeColor: 'bg-[#3b4c2d] text-[#c9e4b6]',
      desc: 'Pisang manis pilihan digoreng renyah keemasan, disajikan hangat dengan taburan keju atau lelehan cokelat.',
      price: 15000,
      unit: '/ porsi',
      image: 'img/menu_pisang_goreng.jpg',
    },
  ];

  return (
    <section id="bestseller" className="py-24 px-6 md:px-16 bg-[#0d0905] border-t border-[#c9973e]/15">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <GoldUnderlineHeading subtitle="FAVORIT PELANGGAN">
            Menu Best Seller Minggu Ini
          </GoldUnderlineHeading>
          <p className="mt-4 text-[#a0988e] text-sm md:text-base font-sans font-light max-w-lg">
            Sajian yang paling sering dipesan ulang oleh pelanggan setia Pancong Donto Cianjur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestsellerItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group bg-[#160e08] border border-[#c9973e]/20 hover:border-[#c9973e]/60 rounded-sm overflow-hidden flex flex-col shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image Wrap */}
              <div
                className="relative h-60 overflow-hidden bg-black cursor-pointer"
                onClick={() =>
                  setActivePhoto({
                    src: item.image,
                    title: item.name,
                    price: item.price,
                  })
                }
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <span
                  className={`absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-sm ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-[#160e08] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3
                    className="text-2xl font-normal text-[#f5f0e8] group-hover:text-[#c9973e] transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-[#a0988e] font-sans font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#c9973e]/15 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-[#c9973e] font-serif">
                      Rp {item.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-[#a0988e] font-sans ml-1">{item.unit}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(item.name, item.price, item.image)}
                    className="px-4 py-2 bg-[#c9973e] hover:bg-[#e0aa48] text-[#0d0905] text-xs font-sans font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(201,151,62,0.25)] active:scale-95"
                    aria-label={`Tambah ${item.name} ke keranjang`}
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    Pesan
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
