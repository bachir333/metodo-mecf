import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Scene3() {
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
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#080808]"
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ scale: 1.5, opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-screen"
        src={`${import.meta.env.BASE_URL}videos/geometry.mp4`}
      />
      <div className="absolute inset-0 bg-[#080808]/50" />

      <div className="relative z-20 w-full max-w-6xl px-12 flex flex-col items-center">
        <motion.div 
          className="w-[2px] bg-[#d4af37] origin-top mb-12"
          initial={{ height: 0 }}
          animate={phase >= 1 ? { height: '15vh' } : { height: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div
          className="text-[4vw] font-['Space_Mono'] text-white uppercase tracking-[0.4em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Nosotros
        </motion.div>

        <motion.div
          className="text-[6vw] font-['Cinzel'] font-bold text-[#d4af37] tracking-[0.2em] uppercase"
          initial={{ scale: 1.2, filter: 'blur(20px)', opacity: 0 }}
          animate={phase >= 3 ? { scale: 1, filter: 'blur(0px)', opacity: 1 } : { scale: 1.2, filter: 'blur(20px)', opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          lo desciframos
        </motion.div>
      </div>
    </motion.div>
  );
}