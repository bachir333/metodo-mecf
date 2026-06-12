import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ReelScene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 5000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-[#080808]">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15)_0%,transparent_70%)]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-20 text-center px-6">
        <motion.h1 
          className="text-[15vw] leading-tight font-bold text-white tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
          animate={phase >= 1 ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
          transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
        >
          ¿CUÁL ES
          <br/>
          <span className="text-[#d4af37]">TU CÓDIGO?</span>
        </motion.h1>
      </div>

      <motion.div
        className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] border border-[#d4af37]/20 rounded-full"
        style={{ transform: 'translate(-50%, -50%)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={phase >= 1 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[120vw] h-[120vw] border border-[#d4af37]/10 rounded-full"
        style={{ transform: 'translate(-50%, -50%)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={phase >= 2 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
    </motion.div>
  );
}