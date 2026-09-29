import React from 'react';
import { Star, Heart, Coffee, ThumbsUp } from 'lucide-react';
import { GoldUnderlineHeading } from './GoldUnderlineHeading';
import { TestimonialStack, type Testimonial } from './ui/glass-testimonial-swiper';

const PANCONG_TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    initials: 'RM',
    name: 'Reza Maulana',
    role: 'Pelanggan Setia • Cianjur',
    quote: 'Pancong lumernya beneran lumer banget! Keju mozzarellanya molor melimpah, beneran mantap. Wajib mampir kalau lagi ke Cianjur!',
    tags: [
      { text: 'TERLARIS', type: 'featured' },
      { text: 'Pancong Lumer', type: 'default' },
    ],
    stats: [
      { icon: Star, text: '5.0 Bintang' },
      { icon: Heart, text: 'Langganan 3 thn' },
    ],
    avatarGradient: 'linear-gradient(135deg, #c9973e, #8c5b1b)',
  },
  {
    id: 'rev-2',
    initials: 'SN',
    name: 'Siti Nurhaliza',
    role: 'Food Enthusiast • Cianjur',
    quote: 'Kopinya enak banget, racikan signature Sevenov blend-nya wangi dan khas. Sekarang jadi spot nongkrong favorit bareng teman tiap sore.',
    tags: [
      { text: 'FAVORIT', type: 'featured' },
      { text: 'Sevenov Blend', type: 'default' },
    ],
    stats: [
      { icon: Coffee, text: 'Kopi Susu Gula Aren' },
      { icon: ThumbsUp, text: 'Verified Review' },
    ],
    avatarGradient: 'linear-gradient(135deg, #d97706, #78350f)',
  },
  {
    id: 'rev-3',
    initials: 'DP',
    name: 'Dandi Pratama',
    role: 'Pelanggan • Bandung',
    quote: 'Harga mulai 5-6rb tapi rasa beneran premium! Butterscotch latte-nya nagih, sekali nongkrong pesan dua gelas sekaligus.',
    tags: [
      { text: 'RECOMMENDED', type: 'featured' },
      { text: 'Butterscotch', type: 'default' },
    ],
    stats: [
      { icon: Star, text: '5.0 Bintang' },
      { icon: ThumbsUp, text: 'Puas Banget' },
    ],
    avatarGradient: 'linear-gradient(135deg, #b45309, #451a03)',
  },
  {
    id: 'rev-4',
    initials: 'AF',
    name: 'Aulia Fitri',
    role: 'Pelajar & Mahasiswi • Cianjur',
    quote: 'Tekstur pancongnya pas: luar garing renyah tapi dalamnya super lumer meleleh. Varian Choco Blast & Keju Susu juaranya!',
    tags: [
      { text: 'VIRAL', type: 'featured' },
      { text: 'Choco Blast', type: 'default' },
    ],
    stats: [
      { icon: Star, text: '5.0 Bintang' },
      { icon: Heart, text: 'Topping Melimpah' },
    ],
    avatarGradient: 'linear-gradient(135deg, #ca8a04, #713f12)',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="ulasan" className="py-24 px-4 sm:px-6 md:px-16 bg-[#0d0905] border-t border-[#c9973e]/15">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <GoldUnderlineHeading subtitle="APA KATA MEREKA">
          Cerita Pelanggan Setia Kami
        </GoldUnderlineHeading>
        <p className="mt-4 text-[#a0988e] text-sm md:text-base font-sans font-light max-w-xl">
          Lebih dari 1000+ pelanggan sudah mampir menikmati hangatnya pancong lumer &amp; racikan kopi Sevenov. Geser kartu ulasan di bawah:
        </p>

        {/* 3D Glass Testimonial Swiper Stack */}
        <div className="mt-12 w-full flex justify-center">
          <TestimonialStack testimonials={PANCONG_TESTIMONIALS} visibleBehind={2} />
        </div>
      </div>
    </section>
  );
};
