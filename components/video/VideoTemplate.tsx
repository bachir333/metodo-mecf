import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video/hooks';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';
import { Scene6 } from './video_scenes/Scene6';
import { useAudioMusic } from './AudioEngine';

const SCENE_DURATIONS = {
  fecha: 4500,
  secreto: 4500,
  universo: 5500,
  desciframos: 5500,
  titulo: 5500,
  codigo: 5500
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({ durations: SCENE_DURATIONS });
  useAudioMusic();

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#080808] text-white">
      {/* Global noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay z-50"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Persistent gold particles that transform across scenes */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-[#d4af37]/30 blur-[80px] pointer-events-none z-10"
        animate={{
          left: ['20vw', '80vw', '50vw', '10vw', '50vw', '50vw'][currentScene],
          top: ['30vh', '70vh', '50vh', '20vh', '50vh', '50vh'][currentScene],
          scale: [1, 1.5, 2, 0.8, 2.5, 1.2][currentScene],
          opacity: [0.2, 0.4, 0.3, 0.5, 0.6, 0.3][currentScene]
        }}
        transition={{ duration: 2.5, ease: [0.25, 1, 0.5, 1] }}
      />
      
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full border border-[#d4af37]/10 pointer-events-none z-10"
        animate={{
          x: '-50%',
          y: '-50%',
          left: '50%',
          top: '50%',
          rotate: [0, 45, 90, 135, 180, 225][currentScene],
          scale: [0.5, 0.8, 1.2, 1.5, 1.8, 2][currentScene],
          opacity: [0, 0.2, 0.5, 0.2, 0.8, 0][currentScene]
        }}
        transition={{ duration: 3, ease: [0.25, 1, 0.5, 1] }}
      />

      <AnimatePresence mode="popLayout">
        {currentScene === 0 && <Scene1 key="s1" />}
        {currentScene === 1 && <Scene2 key="s2" />}
        {currentScene === 2 && <Scene3 key="s3" />}
        {currentScene === 3 && <Scene4 key="s4" />}
        {currentScene === 4 && <Scene5 key="s5" />}
        {currentScene === 5 && <Scene6 key="s6" />}
      </AnimatePresence>
    </div>
  );
}