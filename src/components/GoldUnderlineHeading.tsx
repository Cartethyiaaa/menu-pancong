import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface Props {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}

export const GoldUnderlineHeading: React.FC<Props> = ({ children, className = '', subtitle }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {subtitle && (
        <span className="block text-xs uppercase tracking-[0.25em] text-[#c9973e] mb-2 font-sans font-normal">
          {subtitle}
        </span>
      )}
      <h2
        className="text-4xl md:text-6xl font-light tracking-wide text-[#f5f0e8]"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        {children}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
        style={{
          originX: 0,
          backgroundColor: '#c9973e',
          height: '1px',
          width: '100%',
          marginTop: '12px',
        }}
      />
    </div>
  );
};
