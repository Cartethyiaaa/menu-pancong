import React from 'react';
import { motion, type Variants } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 35, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-[#0d0905]">
      {/* Visual Effect 1: Full-Screen Looping Video with Pancong/Coffee baking footage */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="img/hero_pancong_stage1.jpg"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105 pointer-events-none opacity-50"
      >
        <source src="hero_video.mp4" type="video/mp4" />
      </video>

      {/* Top Gradient Fade */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(13,9,5,0.7) 0%, transparent 30%, transparent 60%, rgba(13,9,5,0.96) 100%)',
        }}
      />

      {/* Left-Side Ambient Gradient */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(13,9,5,0.95) 0%, rgba(13,9,5,0.75) 45%, rgba(13,9,5,0.3) 80%, transparent 100%)',
        }}
      />

      {/* Hero Content (z-20) */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 pointer-events-none">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl pointer-events-auto"
        >
          {/* Eyebrow Label */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-[11px] md:text-[12px] uppercase tracking-[0.28em] text-[#c9973e] font-sans font-semibold">
              SPECIALTY PANCONG &amp; COFFEE &bull; CIANJUR SEJAK 2018
            </span>
          </motion.div>

          {/* H1 Heading with Slogan */}
          <motion.h1
            variants={itemVariants}
            className="text-[46px] sm:text-[68px] md:text-[92px] lg:text-[108px] font-light text-[#f5f0e8] leading-[1.03] tracking-[0.02em] mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Baseuh Dijero, <br />
            <span className="italic font-light text-[#c9973e]">Garing Diluar</span>
          </motion.h1>

          {/* Meta Tags Pill */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#a0988e] font-sans mb-6"
          >
            <span>GARING DILUAR</span>
            <span className="text-[#c9973e]">&bull;</span>
            <span>LUMER DIJERO</span>
            <span className="text-[#c9973e]">&bull;</span>
            <span>TOPPING MELIMPAH</span>
          </motion.div>

          {/* Subline */}
          <motion.p
            variants={itemVariants}
            className="text-[15px] md:text-[17px] text-[#a0988e] max-w-xl font-sans font-light leading-relaxed mb-8 tracking-[0.01em]"
          >
            Kue pancong lumer autentik dengan lelehan topping melimpah mulai 5rb, dipanggang hangat tiap hari
            bersama kopi spesial Sevenov Signature Blend.
          </motion.p>

          {/* CTA Buttons Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
          >
            <a
              href="#menu"
              className="inline-flex items-center justify-center px-8 py-4 text-[12px] uppercase tracking-[0.18em] text-[#0d0905] bg-[#c9973e] hover:bg-[#e0aa48] transition-all duration-300 font-sans font-semibold shadow-[0_0_24px_rgba(201,151,62,0.3)] hover:shadow-[0_0_32px_rgba(201,151,62,0.5)] active:scale-95 rounded-sm"
            >
              Jelajahi Menu
            </a>
            <a
              href="https://wa.me/6285782203468?text=Halo%20Pancong%20Donto,%20saya%20mau%20pesan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-[12px] uppercase tracking-[0.18em] text-[#f5f0e8] border border-[#f5f0e8]/30 hover:border-[#c9973e] hover:text-[#c9973e] transition-all duration-300 font-sans font-medium hover:bg-[#c9973e]/5 active:scale-95 rounded-sm"
            >
              Pesan via WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#c9973e]/80 mb-2 font-sans">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-[#c9973e]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
