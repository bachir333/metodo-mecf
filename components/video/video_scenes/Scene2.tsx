import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const text = "El universo".split('');

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#080808]"
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten"
        src={`${import.meta.env.BASE_URL}videos/stone.mp4`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent opacity-80" />

      <div className="relative z-20 text-center px-8 w-full">
        <h2 className="text-[6.5vw] font-['Cinzel'] font-bold text-white uppercase tracking-[0.2em] leading-none flex justify-center">
          {text.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
              animate={phase >= 1 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 50, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, delay: phase >= 1 ? i * 0.1 : 0, ease: [0.16, 1, 0.3, 1] }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h2>
        
        <div className="mt-8 overflow-hidden">
          <motion.div
            className="text-[4vw] font-['Cinzel'] text-[#d4af37] tracking-[0.3em] uppercase"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={phase >= 2 ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            lo codificó
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}