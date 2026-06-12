import { useMemo } from "react";

export default function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      delay: `${Math.random() * 12}s`,
      duration: `${10 + Math.random() * 14}s`,
      size: Math.random() > 0.7 ? 3 : 2,
      opacity: 0.15 + Math.random() * 0.25,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary particle-float"
          style={{
            left: p.left,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
