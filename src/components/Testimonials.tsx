import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';
import { REVIEWS_DATA } from '../data/reviewsData';
import { GoldUnderlineHeading } from './GoldUnderlineHeading';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = REVIEWS_DATA[currentIndex];

  return (
    <section className="py-24 px-6 md:px-16 bg-[#0d0905] border-t border-[#c9973e]/15">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <GoldUnderlineHeading subtitle="APA KATA MEREKA">
          Cerita Pelanggan Setia Kami
        </GoldUnderlineHeading>
        <p className="mt-4 text-[#a0988e] text-sm md:text-base font-sans font-light">
          Lebih dari 1000+ pelanggan sudah pernah mampir menikmati hangatnya pancong &amp; kopi Sevenov.
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mt-8 text-[#c9973e]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>

        {/* Quote Container */}
        <div className="mt-6 min-h-[170px] sm:min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <blockquote
                className="text-[20px] sm:text-[24px] md:text-[26px] italic font-serif text-[#f5f0e8] leading-relaxed max-w-2xl font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex flex-col items-center">
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#c9973e] font-sans font-bold">
                  {current.name}
                </span>
                <span className="text-[12px] text-[#a0988e] font-sans mt-0.5 font-light">
                  {current.location}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot Navigation */}
        <div className="flex items-center space-x-3 mt-8">
          {REVIEWS_DATA.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? 'w-7 bg-[#c9973e]'
                  : 'w-2 bg-[#c9973e]/30 hover:bg-[#c9973e]/60'
              }`}
              aria-label={`Lihat ulasan ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
