import { useEffect, useState } from "react";

export default function ViewerCounter({ small }: { small?: boolean }) {
  const [count, setCount] = useState(() => Math.floor(12 + Math.random() * 8));

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => {
        const delta = Math.random() < 0.5 ? 1 : -1;
        const next = c + delta;
        return next < 8 ? 9 : next > 27 ? 26 : next;
      });
    }, 7000 + Math.random() * 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 py-3">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
      </span>
      <span className={`font-mono tracking-widest uppercase text-white/60 ${small ? "text-[9px]" : "text-[11px]"}`}>
        <span className="text-white font-bold tabular-nums">{count}</span> personas viendo esto ahora
      </span>
    </div>
  );
}
