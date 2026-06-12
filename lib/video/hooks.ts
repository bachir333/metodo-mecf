import { useState, useEffect, useRef } from 'react';

export function useVideoPlayer({ durations }: { durations: Record<string, number> }) {
  const keys = Object.keys(durations);
  const [currentScene, setCurrentScene] = useState(0);
  const hasStartedRecording = useRef(false);
  const hasStoppedRecording = useRef(false);

  useEffect(() => {
    // Start recording on mount
    if (typeof window !== 'undefined' && !hasStartedRecording.current) {
      if ((window as any).startRecording) {
        (window as any).startRecording();
      }
      hasStartedRecording.current = true;
    }

    const currentKey = keys[currentScene];
    const duration = durations[currentKey];

    const timer = setTimeout(() => {
      if (currentScene === keys.length - 1) {
        // Stop recording after the first full pass
        if (typeof window !== 'undefined' && !hasStoppedRecording.current) {
          if ((window as any).stopRecording) {
            (window as any).stopRecording();
          }
          hasStoppedRecording.current = true;
        }
        // Loop back to start
        setCurrentScene(0);
      } else {
        setCurrentScene((prev) => prev + 1);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [currentScene, durations, keys]);

  return { currentScene };
}
