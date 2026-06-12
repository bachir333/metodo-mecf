import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen"
        src={`${import.meta.env.BASE_URL}videos/cosmos.mp4`}
      />
      
      <div className="relative z-20 text-center px-8">
        <motion.p 
          className="font-['Space_Mono'] text-[#d4af37] text-[1.5vw] tracking-[0.5em] uppercase mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          [ SECUENCIA INICIADA ]
        </motion.p>
        
        <div className="overflow-hidden">
          <motion.h2 
            className="text-[5vw] font-['Cinzel'] font-bold text-white uppercase tracking-widest leading-[1.1] drop-shadow-2xl"
            initial={{ y: "100%", rotateX: 90, opacity: 0 }}
            animate={phase >= 2 ? { y: "0%", rotateX: 0, opacity: 1 } : { y: "100%", rotateX: 90, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "bottom" }}
          >
            Tu fecha de<br/>
            nacimiento
          </motion.h2>
        </div>
        
        <div className="overflow-hidden mt-6">
          <motion.h2 
            className="text-[3vw] font-['Cinzel'] text-[#d4af37] uppercase tracking-widest"
            initial={{ y: "-100%", opacity: 0 }}
            animate={phase >= 3 ? { y: "0%", opacity: 1 } : { y: "-100%", opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            guarda un secreto
          </motion.h2>
        </div>
      </div>
    </motion.div>
  );
}