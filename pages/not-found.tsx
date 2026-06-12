import { useEffect, useState } from "react";
import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";

export default function NotFound() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-6 overflow-hidden relative">
      <SeoHead
        title="Página no encontrada — Método MECF"
        description="La página que buscas no existe. Vuelve al inicio del Método MECF."
        noindex={true}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)",
          animation: "scan 3s ease-in-out infinite",
          top: "40%",
        }}
      />

      <style>{`
        @keyframes scan {
          0%, 100% { top: 20%; opacity: 0; }
          50% { top: 80%; opacity: 1; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.4; }
          94% { opacity: 1; }
          96% { opacity: 0.6; }
          97% { opacity: 1; }
        }
      `}</style>

      <div
        className="relative z-10 text-center max-w-lg mx-auto transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
      >
        {/* Overline */}
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6"
          style={{ color: "rgba(212,175,55,0.6)" }}>
          — Sistema MECF —
        </p>

        {/* 404 */}
        <div
          className="font-mono font-bold leading-none mb-2 select-none"
          style={{
            fontSize: "clamp(6rem, 25vw, 12rem)",
            color: "rgba(212,175,55,0.08)",
            animation: "flicker 8s ease-in-out infinite",
            textShadow: "0 0 60px rgba(212,175,55,0.15)",
            letterSpacing: "-0.02em",
          }}
        >
          404
        </div>

        {/* Title */}
        <h1
          className="font-mono font-bold text-white tracking-widest uppercase mb-3"
          style={{ fontSize: "clamp(0.9rem, 3vw, 1.25rem)", letterSpacing: "0.3em" }}
        >
          Coordenadas no encontradas
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-3 justify-center mb-6">
          <div className="flex-1 h-px max-w-[80px]" style={{ background: "rgba(212,175,55,0.2)" }} />
          <span className="font-mono text-[8px] tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.4)" }}>
            error
          </span>
          <div className="flex-1 h-px max-w-[80px]" style={{ background: "rgba(212,175,55,0.2)" }} />
        </div>

        {/* Body */}
        <p className="font-mono text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
          La página que buscas no existe o ha sido movida.<br />
          El código sigue intacto.
        </p>

        {/* CTA */}
        <Link href="/">
          <button
            className="font-mono text-sm font-bold uppercase tracking-widest px-8 py-4 transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(212,175,55,1)",
              color: "#080808",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#fff";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,1)";
            }}
          >
            Volver al inicio →
          </button>
        </Link>

        {/* Secondary link */}
        <div className="mt-6">
          <Link href="/protocolo">
            <span
              className="font-mono text-[10px] tracking-widest uppercase cursor-pointer transition-colors"
              style={{ color: "rgba(212,175,55,0.45)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(212,175,55,0.9)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = "rgba(212,175,55,0.45)"; }}
            >
              O acceder al informe MECF →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
