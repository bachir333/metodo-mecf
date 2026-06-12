import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ReelScene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 5000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#d4af37]"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
    >
      <video
        src={`${import.meta.env.BASE_URL}videos/math.mp4`}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-multiply"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000]/80" />

      <div className="relative z-20 text-center px-6 w-full h-full flex flex-col justify-center items-center">
        <motion.div
          className="text-[#080808] font-bold text-[5vw] tracking-[0.2em] mb-12 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
        >
          Presentamos
        </motion.div>

        <motion.h1 
          className="text-[16vw] leading-[0.9] font-black uppercase tracking-tighter text-[#080808] w-full flex flex-col gap-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <motion.span 
            className="block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            EL CÓDIGO
          </motion.span>
          <motion.span 
            className="block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          >
            MAESTRO
          </motion.span>
        </motion.h1>

        <motion.div 
          className="mt-12 text-[9vw] text-white font-light tracking-wide uppercase italic"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        >
          DEL DESTINO
        </motion.div>
      </div>
    </motion.div>
  );
}