import { useEffect, useRef } from 'react';

export function useAudioMusic() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const initAudio = () => {
      if (isPlayingRef.current) return;
      isPlayingRef.current = true;
      
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;

      // Deep bass drone
      const bass = ctx.createOscillator();
      bass.type = 'sine';
      bass.frequency.setValueAtTime(43.65, ctx.currentTime); // F1
      
      const bassGain = ctx.createGain();
      bassGain.gain.setValueAtTime(0, ctx.currentTime);
      bassGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 2);
      
      bass.connect(bassGain);
      bassGain.connect(ctx.destination);
      bass.start();

      // Slow rhythmic pulse
      const pulse = ctx.createOscillator();
      pulse.type = 'triangle';
      pulse.frequency.setValueAtTime(87.31, ctx.currentTime); // F2
      
      const pulseGain = ctx.createGain();
      pulseGain.gain.setValueAtTime(0, ctx.currentTime);
      
      // Create LFO for pulse
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.5, ctx.currentTime); // 0.5 Hz = 2s period
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.15, ctx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(pulseGain.gain);
      
      pulse.connect(pulseGain);
      pulseGain.connect(ctx.destination);
      pulse.start();
      lfo.start();

      // High shimmer
      const shimmer = ctx.createOscillator();
      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(698.46, ctx.currentTime); // F5
      
      const shimmerGain = ctx.createGain();
      shimmerGain.gain.setValueAtTime(0, ctx.currentTime);
      shimmerGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 5);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      
      // Modulate filter
      const filterLfo = ctx.createOscillator();
      filterLfo.type = 'sine';
      filterLfo.frequency.setValueAtTime(0.1, ctx.currentTime); // 10s period
      
      const filterLfoGain = ctx.createGain();
      filterLfoGain.gain.setValueAtTime(400, ctx.currentTime);
      
      filterLfo.connect(filterLfoGain);
      filterLfoGain.connect(filter.frequency);
      
      shimmer.connect(filter);
      filter.connect(shimmerGain);
      shimmerGain.connect(ctx.destination);
      
      shimmer.start();
      filterLfo.start();

      return () => {
        bass.stop();
        pulse.stop();
        lfo.stop();
        shimmer.stop();
        filterLfo.stop();
        ctx.close();
      };
    };

    const cleanup = initAudio();
    
    return () => {
      if (cleanup) cleanup();
      isPlayingRef.current = false;
    };
  }, []);
}
