import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

export const ChefFeature: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0px', '-60px']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[50vh] md:h-[70vh] w-full overflow-hidden bg-[#0d0905] border-t border-[#c9973e]/15"
    >
      {/* Background Image with Parallax */}
      <motion.img
        style={{ y: imageY }}
        src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=80"
        alt="Executive chef portrait in professional kitchen"
        className="absolute -top-12 inset-x-0 w-full h-[120%] object-cover object-center filter brightness-[0.75] contrast-[1.05]"
      />

      {/* Dark Ambient Gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(13,9,5,0.96) 0%, rgba(13,9,5,0.85) 45%, rgba(13,9,5,0.3) 85%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{
          background:
            'linear-gradient(to top, rgba(13,9,5,0.98) 0%, rgba(13,9,5,0.7) 60%, transparent 100%)',
        }}
      />

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex flex-col justify-end py-16 md:pb-20 px-6 md:px-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <span className="block text-[11px] uppercase tracking-[0.3em] text-[#c9973e] font-sans font-medium mb-3">
            EXECUTIVE CHEF
          </span>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-light text-[#f5f0e8] tracking-wide mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Marcus DeLeon
          </h2>

          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#a0988e] font-sans font-light leading-relaxed mb-6 max-w-2xl">
            Chef Marcus has spent two decades in Michelin-starred kitchens across Paris, Copenhagen, and
            New York before bringing his fire-forward philosophy to Chicago. At Ember &amp; Stone, he leads a
            kitchen that believes cooking is an act of devotion — not decoration.
          </p>

          <blockquote
            className="text-lg sm:text-xl text-[#f5f0e8]/90 italic font-serif tracking-wide border-l-2 border-[#c9973e] pl-4 py-1"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            &ldquo;I cook the way I want to eat — honestly, without apology.&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};
