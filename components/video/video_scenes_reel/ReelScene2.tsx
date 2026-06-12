import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ReelScene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 4000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
    >
      <video
        src={`${import.meta.env.BASE_URL}videos/stone.mp4`}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808] opacity-80" />

      <div className="relative z-20 text-center px-6 flex flex-col items-center justify-center h-full">
        <motion.img
          src={`${import.meta.env.BASE_URL}images/geometry.png`}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] object-contain opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        <motion.h1 
          className="text-[16vw] leading-[1.1] font-bold uppercase tracking-tighter"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <motion.span 
            className="block text-transparent"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}
            initial={{ opacity: 0, x: -50 }}
            animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          >
            EL
          </motion.span>
          <motion.span 
            className="block text-white"
            initial={{ opacity: 0, x: 50 }}
            animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            UNIVERSO
          </motion.span>
        </motion.h1>

        <motion.div 
          className="mt-12 text-[10vw] font-light tracking-widest text-[#d4af37]"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        >
          LO CODIFICÓ
        </motion.div>
      </div>
    </motion.div>
  );
}