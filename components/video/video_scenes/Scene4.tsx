import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#080808]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)' }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
        src={`${import.meta.env.BASE_URL}videos/math.mp4`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080808_80%)]" />

      <div className="relative z-20 text-center px-12 w-full flex flex-col items-center">
        <motion.div
          className="w-[8vw] h-[8vw] border border-[#d4af37]/50 rounded-full flex items-center justify-center mb-12"
          initial={{ rotate: -180, scale: 0, opacity: 0 }}
          animate={phase >= 1 ? { rotate: 0, scale: 1, opacity: 1 } : { rotate: -180, scale: 0, opacity: 0 }}
          transition={{ duration: 1.5, type: 'spring', bounce: 0.4 }}
        >
          <motion.div
            className="w-[6vw] h-[6vw] border border-[#d4af37] rounded-full"
            initial={{ scale: 0 }}
            animate={phase >= 2 ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </motion.div>

        <motion.h1 
          className="text-[7.5vw] font-['Cinzel'] font-black text-white uppercase tracking-[0.15em] leading-[1.1] drop-shadow-2xl"
          initial={{ opacity: 0, y: 40, rotateX: 45 }}
          animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: 45 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          El Código Maestro
        </motion.h1>
        
        <motion.h2
          className="text-[4vw] font-['Cinzel'] text-[#d4af37] uppercase tracking-[0.4em] mt-4"
          initial={{ opacity: 0, filter: 'blur(10px)', x: -50 }}
          animate={phase >= 3 ? { opacity: 1, filter: 'blur(0px)', x: 0 } : { opacity: 0, filter: 'blur(10px)', x: -50 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          del Destino
        </motion.h2>
      </div>
    </motion.div>
  );
}