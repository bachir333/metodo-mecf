import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Scene6() {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
        src={`${import.meta.env.BASE_URL}videos/cosmos.mp4`}
      />
      <div className="absolute inset-0 bg-[#080808]/60" />

      <div className="relative z-20 flex flex-col items-center justify-center text-center">
        <motion.div
          className="text-[4vw] font-['Cinzel'] font-bold text-white tracking-[0.5em] uppercase mb-12 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          MECF
        </motion.div>

        <motion.div
          className="text-[2.5vw] font-['Space_Mono'] text-[#d4af37] tracking-widest uppercase"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={phase >= 2 ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          metodomecf.com
        </motion.div>
      </div>
    </motion.div>
  );
}