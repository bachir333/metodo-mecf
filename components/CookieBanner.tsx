import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies-accepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookies-accepted", "1");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookies-accepted", "0");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-zinc-950 border-t border-primary/20 px-6 py-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-white/70 font-mono leading-relaxed max-w-2xl">
          Esta web usa cookies propias para mejorar tu experiencia. No compartimos datos con terceros.{" "}
          <a href="#" className="text-primary underline underline-offset-2">Más información</a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors px-3 py-2"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="font-mono text-[10px] uppercase tracking-widest bg-primary text-black px-5 py-2 hover:bg-white transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
