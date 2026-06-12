import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ReelScene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 5000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: '10%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
    >
      <video
        src={`${import.meta.env.BASE_URL}videos/geometry.mp4`}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      <div className="absolute inset-0 bg-[#080808]/40" />

      <div className="relative z-20 text-center px-8 w-full">
        <motion.h1 
          className="text-[14vw] leading-[1.1] font-bold uppercase tracking-tight flex flex-col items-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <motion.span 
            className="block text-white mb-8"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={phase >= 1 ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          >
            NOSOTROS
          </motion.span>
          
          <motion.div
            className="h-[2px] bg-[#d4af37] w-1/2 mb-8"
            initial={{ scaleX: 0 }}
            animate={phase >= 1 ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          />

          <motion.span 
            className="block text-[#d4af37] text-[11vw]"
            initial={{ opacity: 0, y: 40 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          >
            LO DESCIFRAMOS
          </motion.span>
        </motion.h1>
      </div>
      
      <motion.img
        src={`${import.meta.env.BASE_URL}images/numbers.png`}
        alt=""
        className="absolute top-10 right-10 w-[40vw] object-contain opacity-[0.03]"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src={`${import.meta.env.BASE_URL}images/numbers.png`}
        alt=""
        className="absolute bottom-10 left-10 w-[40vw] object-contain opacity-[0.03] scale-x-[-1]"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}