import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { GoldUnderlineHeading } from './GoldUnderlineHeading';

export const Philosophy: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="tentang" className="py-24 px-6 md:px-16 bg-[#0a0704] border-t border-[#c9973e]/15">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Visual Stack */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-sm overflow-hidden border border-[#c9973e]/20 shadow-xl aspect-[4/5]">
                <img
                  src="img/barista_real.jpg"
                  alt="Barista Pancong Donto Menyeduh Kopi"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-center text-xs italic text-[#c9973e] font-serif">
                diseduh dengan sepenuh hati
              </p>
            </div>

            <div className="space-y-4 pt-8">
              <div className="rounded-sm overflow-hidden border border-[#c9973e]/20 shadow-xl aspect-[4/5]">
                <img
                  src="img/sevenov_beans_real.jpg"
                  alt="Signature Blend Coffee Beans"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-center text-xs italic text-[#c9973e] font-serif">
                biji kopi pilihan nusantara 
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Story & Stats */}
        <div ref={ref} className="flex flex-col justify-center">
          <GoldUnderlineHeading subtitle="CERITA KAMI">
            Dari Kehangatan Dapur Tradisional
          </GoldUnderlineHeading>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 space-y-5 text-[#a0988e] text-[15px] sm:text-[16px] font-sans font-light leading-relaxed"
          >
            <p>
              Pancong Donto berdiri dari kebiasaan sederhana: <em>ngobrol santai sore hari menunggu camilan pancong hangat yang baru diangkat dari cetakan arang</em>. Sejak 2018 di Cianjur, kami berkomitmen menyajikan pancong bertekstur lumer sempurna di dalam dan garing renyah di luar.
            </p>
            <p>
              Tak hanya camilan, kami meracik kopi dengan biji pilihan <strong>Signature Blend</strong> &mdash; memadukan karakter mantap <strong>Robusta</strong> dan aroma floral khas <strong>Arabica</strong> agar setiap tegukan memberikan ketenangan dan kehangatan.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-[#c9973e]/10 border border-[#c9973e]/30 text-[#c9973e] text-xs font-sans rounded-full">
                Arabica & Robusta
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#c9973e]/15">
              <div className="p-3 rounded bg-white/[0.02] border border-[#c9973e]/15 text-center">
                <strong className="block text-2xl font-serif text-[#c9973e]">6+</strong>
                <span className="text-[11px] text-[#a0988e] uppercase tracking-wider font-sans">Tahun Berdiri</span>
              </div>
              <div className="p-3 rounded bg-white/[0.02] border border-[#c9973e]/15 text-center">
                <strong className="block text-2xl font-serif text-[#c9973e]">17+</strong>
                <span className="text-[11px] text-[#a0988e] uppercase tracking-wider font-sans">Varian Pancong</span>
              </div>
              <div className="p-3 rounded bg-white/[0.02] border border-[#c9973e]/15 text-center">
                <strong className="block text-2xl font-serif text-[#c9973e]">18+</strong>
                <span className="text-[11px] text-[#a0988e] uppercase tracking-wider font-sans">Varian Minuman</span>
              </div>
              <div className="p-3 rounded bg-white/[0.02] border border-[#c9973e]/15 text-center">
                <strong className="block text-2xl font-serif text-[#c9973e]">100%</strong>
                <span className="text-[11px] text-[#a0988e] uppercase tracking-wider font-sans">Bahan Segar</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
