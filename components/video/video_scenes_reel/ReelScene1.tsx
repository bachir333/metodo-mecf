import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ReelScene1() {
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
        src={`${import.meta.env.BASE_URL}videos/cosmos.mp4`}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="relative z-20 text-center px-6 flex flex-col items-center gap-8">
        <motion.div
          className="text-[#d4af37] tracking-widest text-[4vw] uppercase font-mono"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Análisis Cuántico
        </motion.div>

        <motion.h1 
          className="text-[14vw] leading-[1.1] font-bold uppercase tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <motion.span 
            className="block"
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={phase >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 40, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          >
            TU FECHA
          </motion.span>
          <motion.span 
            className="block text-white/50"
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={phase >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 40, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            DE NACIMIENTO
          </motion.span>
        </motion.h1>

        <motion.div 
          className="text-[8vw] font-light tracking-wide text-[#d4af37]"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={phase >= 2 ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        >
          GUARDA UN SECRETO
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-20 w-[1px] h-32 bg-gradient-to-b from-[#d4af37] to-transparent"
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </motion.div>
  );
}