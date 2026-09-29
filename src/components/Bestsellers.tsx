import React from 'react';
import { CoverFlowCarousel, CarouselItem } from './ui/3-d-coverflow-carousel';
import { useCart } from '../context/CartContext';
import { GoldUnderlineHeading } from './GoldUnderlineHeading';

interface CustomCarouselItem extends CarouselItem {
  priceNum: number;
}

export const Bestsellers: React.FC = () => {
  const { addToCart } = useCart();

  const pancongDishes: CustomCarouselItem[] = [
    {
      tag: "#CoffeeSignature",
      titleLine1: "VANILLA LATTE",
      titleLine2: "– COLD FLOAT",
      desc: "Espresso Sevenov Blend dipadu susu segar lembut dan scoop es krim vanilla dingin menyegarkan",
      img: "img/menu_vanilla_latte.jpg",
      ctaText: "+ Keranjang (26K)",
      ctaUrl: "#",
      priceNum: 26000,
    },
    {
      tag: "#NonCoffee",
      titleLine1: "CHOCO BLAST",
      titleLine2: "– DARK CRUMBLE",
      desc: "Dark chocolate pekat dingin mantap bertabur remah biskuit cokelat gurih melimpah",
      img: "img/menu_choco_blast.jpg",
      ctaText: "+ Keranjang (18K)",
      ctaUrl: "#",
      priceNum: 18000,
    },
    {
      tag: "#CamilanManis",
      titleLine1: "PISANG BAKAR",
      titleLine2: "– ES KRIM VANILLA",
      desc: "Pisang manis panggang arang harum disajikan hangat dengan scoop es krim vanilla legit",
      img: "img/menu_pisang_bakar.jpg",
      ctaText: "+ Keranjang (22K)",
      ctaUrl: "#",
      priceNum: 22000,
    },
    {
      tag: "#FavoritNongkrong",
      titleLine1: "ROTI BAKAR",
      titleLine2: "– DOUBLE SCOOP",
      desc: "Roti tebal panggang mentega garing dengan double scoop es krim vanilla & taburan oatmeal renyah",
      img: "img/menu_roti_bakar.jpg",
      ctaText: "+ Keranjang (22K)",
      ctaUrl: "#",
      priceNum: 22000,
    },
    {
      tag: "#Terlaris",
      titleLine1: "PANCONG MIX",
      titleLine2: "– LUMER KEJU COKELAT",
      desc: "Kue pancong lumer hangat setengah matang berpadu lelehan saus cokelat dan keju cheddar gurih",
      img: "img/hero_pancong_stage1.jpg",
      ctaText: "+ Keranjang (7K)",
      ctaUrl: "#",
      priceNum: 7000,
    },
    {
      tag: "#SignatureKedai",
      titleLine1: "BUTTERSCOTCH",
      titleLine2: "– COFFEE LATTE",
      desc: "Espresso aromatic Sevenov Blend dengan foam susu lembut dan saus butterscotch karamel legit",
      img: "img/menu_iced_coffee.jpg",
      ctaText: "+ Keranjang (26K)",
      ctaUrl: "#",
      priceNum: 26000,
    },
    {
      tag: "#GaringGurih",
      titleLine1: "PISANG GORENG",
      titleLine2: "– CRISPY GOLDEN",
      desc: "Pisang manis pilihan digoreng renyah keemasan, disajikan hangat bertabur keju parut gurih",
      img: "img/menu_pisang_goreng.jpg",
      ctaText: "+ Keranjang (15K)",
      ctaUrl: "#",
      priceNum: 15000,
    },
    {
      tag: "#PaketHemat",
      titleLine1: "1 PORSI PANCONG",
      titleLine2: "– ISI 5 PCS",
      desc: "1 Porsi isi 5 buah pancong lumer hangat, bebas pilih aneka topping favorit kesukaanmu",
      img: "img/menu_pancong.jpg",
      ctaText: "+ Keranjang (25K)",
      ctaUrl: "#",
      priceNum: 25000,
    },
  ];

  const handleCtaClick = (item: CarouselItem) => {
    const matched = pancongDishes.find((d) => d.titleLine1 === item.titleLine1);
    const price = matched ? matched.priceNum : 20000;
    addToCart(item.titleLine1, price, item.img);
  };

  return (
    <section id="bestseller" className="w-full bg-[#0d0905] pt-20 pb-10 border-t border-[#c9973e]/15">
      <div className="max-w-6xl mx-auto px-6 mb-4 text-center flex flex-col items-center">
        <GoldUnderlineHeading subtitle="3D INTERACTIVE SHOWCASE">
          Best Sellers Menu
        </GoldUnderlineHeading>
        <p className="mt-4 text-[#a0988e] text-sm md:text-base font-sans font-light max-w-lg">
          Geser atau klik menu di bawah.
        </p>
      </div>

      <CoverFlowCarousel
        items={pancongDishes}
        sectionLabel="FOTO MENU"
        autoplay={true}
        autoplayDelay={4000}
        onCtaClick={handleCtaClick}
        className="!bg-transparent"
      />
    </section>
  );
};
