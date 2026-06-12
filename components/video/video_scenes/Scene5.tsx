import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#080808]"
      initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      exit={{ opacity: 0, filter: 'blur(30px)' }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background is handled by persistent elements in VideoTemplate */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#111_0%,#080808_100%)]" />

      <div className="relative z-20 text-center w-full px-8">
        <motion.h2 
          className="text-[6.5vw] font-['Cinzel'] text-[#d4af37] uppercase tracking-widest font-bold drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          ¿Cuál es tu código?
        </motion.h2>
        
        <motion.div
          className="w-full max-w-xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-12"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={phase >= 2 ? { scaleX: 1, opacity: 0.5 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}