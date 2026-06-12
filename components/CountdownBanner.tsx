import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-30T23:59:59");

function pad(n: number) { return String(n).padStart(2, "0"); }

export default function CountdownBanner() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tick = () => {
      const diff = TARGET.getTime() - Date.now();
      if (diff <= 0) { setVisible(false); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!visible) return null;

  return (
    <div className="w-full bg-primary text-black py-2 px-4 text-center z-[60] relative">
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <span className="font-mono text-[10px] tracking-widest uppercase font-bold">
          Precio especial — termina en
        </span>
        <div className="flex items-center gap-1.5 font-mono font-bold text-sm">
          {[
            { v: time.d, l: "d" },
            { v: time.h, l: "h" },
            { v: time.m, l: "m" },
            { v: time.s, l: "s" },
          ].map(({ v, l }) => (
            <span key={l} className="flex items-baseline gap-0.5">
              <span className="bg-black/15 px-1.5 py-0.5 text-xs tabular-nums">{pad(v)}</span>
              <span className="text-[9px] opacity-70">{l}</span>
            </span>
          ))}
        </div>
        <a href="/modulos" className="font-mono text-[10px] tracking-widest uppercase underline underline-offset-2 hover:opacity-70 transition-opacity">
          Activar ahora →
        </a>
      </div>
    </div>
  );
}
