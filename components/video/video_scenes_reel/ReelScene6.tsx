import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ReelScene6() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 5000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
    >
      <video
        src={`${import.meta.env.BASE_URL}videos/cosmos.mp4`}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full">
        <motion.div 
          className="text-[25vw] font-black tracking-tighter text-white leading-none"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.8, rotateX: 45 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        >
          MECF
        </motion.div>

        <motion.div 
          className="mt-8 text-[5vw] text-[#d4af37] font-mono tracking-widest uppercase border border-[#d4af37]/30 px-8 py-4 rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        >
          metodomecf.com
        </motion.div>
      </div>
    </motion.div>
  );
}