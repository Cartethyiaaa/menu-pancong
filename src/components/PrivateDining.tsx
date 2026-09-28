import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { GoldUnderlineHeading } from './GoldUnderlineHeading';

export const PrivateDining: React.FC = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="private-dining" className="py-24 px-6 md:px-16 bg-[#0d0905]">
      <div
        ref={ref}
        className="max-w-6xl mx-auto relative rounded-sm overflow-hidden border border-[#c9973e]/25 shadow-2xl bg-[#140d07]"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
            alt="Private dining room with candlelit long table"
            className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.1]"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(13,9,5,0.96) 0%, rgba(13,9,5,0.88) 55%, rgba(13,9,5,0.65) 100%)',
            }}
          />
        </div>

        {/* Content Box */}
        <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <GoldUnderlineHeading subtitle="EXCLUSIVE EXPERIENCES">
              An Evening All Your Own
            </GoldUnderlineHeading>

            <h3
              className="mt-4 text-xl sm:text-2xl italic font-serif text-[#c9973e] tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Private Dining at Ember &amp; Stone
            </h3>

            <p className="mt-6 text-[#a0988e] text-[15px] sm:text-[16px] font-sans font-light leading-relaxed">
              Our private dining room accommodates up to 22 guests, with a dedicated sommelier, custom
              menu development, and a team committed to making your event unforgettable. Available for
              corporate dinners, celebrations, and intimate gatherings.
            </p>

            <div className="mt-6 py-4 border-y border-[#c9973e]/20 text-xs sm:text-sm text-[#f5f0e8]/80 font-sans tracking-wide">
              <span>Capacity: 8–22 guests</span>
              <span className="mx-2 text-[#c9973e]">&bull;</span>
              <span>Full AV available</span>
              <span className="mx-2 text-[#c9973e]">&bull;</span>
              <span>Custom menus from $95pp</span>
            </div>

            <div className="mt-8">
              <a
                href="#reservations"
                className="inline-flex items-center justify-center px-8 py-4 text-[12px] uppercase tracking-[0.18em] text-[#0d0905] bg-[#c9973e] hover:bg-[#e0aa48] transition-all duration-300 font-sans font-semibold shadow-[0_0_24px_rgba(201,151,62,0.25)] hover:shadow-[0_0_32px_rgba(201,151,62,0.4)] active:scale-95"
              >
                Inquire About Private Dining
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
