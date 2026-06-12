import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SeoHead from "@/components/SeoHead";

const PRIMARY = {
  label: "Obtener mi Informe MECF",
  sub: "Descubre el código que gobierna tu vida",
  href: "/protocolo",
};

const LINKS = [
  {
    label: "Diagnóstico gratuito",
    sub: "¿Qué módulo necesitas? 2 minutos",
    href: "/quiz",
    icon: "◈",
  },
  {
    label: "Cómo funciona el Método",
    sub: "Descubre la ciencia detrás del MECF",
    href: "/modulos",
    icon: "◉",
  },
  {
    label: "Blog — Numerología & Patrones",
    sub: "Artículos sobre timing y ciclos biográficos",
    href: "/blog",
    icon: "◎",
  },
  {
    label: "Recuperar mi informe",
    sub: "¿Ya compraste? Descárgalo aquí",
    href: "/acceso",
    icon: "↓",
  },
  {
    label: "Instagram @mecfmetodo",
    sub: "Síguenos para contenido diario",
    href: "https://www.instagram.com/mecfmetodo/",
    icon: "◐",
    external: true,
  },
  {
    label: "Contacto directo",
    sub: "Escríbenos",
    href: "/contacto",
    icon: "◷",
  },
];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}));

export default function Links() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-start overflow-hidden relative">
      <SeoHead
        title="El Código Maestro del Destino — Links"
        description="Accede al informe MECF, diagnóstico gratuito, blog y más."
        canonical="https://metodomecf.com/links"
      />

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_110%,rgba(212,175,55,0.05),transparent)]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Floating particles */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#d4af37]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.15,
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.05, 0.2, 0.05] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto px-5 pt-14 pb-16 flex flex-col items-center">

        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Sigil */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <motion.div
              className="absolute inset-0 border border-[#d4af37]/30 rotate-45"
              animate={{ rotate: [45, 225, 45] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 border border-[#d4af37]/20 rotate-12"
              animate={{ rotate: [12, -168, 12] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-['Cinzel'] font-bold text-[#d4af37] text-xl tracking-widest">M</span>
            </div>
          </div>

          <h1 className="font-['Cinzel'] font-bold text-white text-lg tracking-[0.25em] uppercase mb-1">
            El Código Maestro
          </h1>
          <p className="font-['Space_Mono'] text-[#d4af37]/60 text-[10px] tracking-[0.4em] uppercase">
            Del Destino · Método MECF
          </p>

          <div className="mt-5 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

          <p className="mt-5 text-white/45 text-[13px] font-light leading-relaxed max-w-[260px] mx-auto">
            Tu fecha de nacimiento guarda un código.<br />
            Nosotros lo desciframos.
          </p>
        </motion.div>

        {/* PRIMARY CTA */}
        <motion.a
          href={PRIMARY.href}
          className="relative w-full mb-6 group"
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHovered("primary")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="relative overflow-hidden bg-[#d4af37] px-6 py-5 text-center transition-all duration-300 group-hover:bg-white">
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              animate={hovered === "primary" ? { x: ["-100%", "200%"] } : { x: "-100%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
            <span className="relative font-['Cinzel'] font-bold text-[#080808] text-sm tracking-[0.2em] uppercase block">
              {PRIMARY.label}
            </span>
            <span className="relative font-['Space_Mono'] text-[#080808]/55 text-[10px] tracking-wider mt-1 block font-normal">
              {PRIMARY.sub}
            </span>
          </div>
          {/* Glow */}
          <div className="absolute inset-0 shadow-[0_0_40px_rgba(212,175,55,0.25)] group-hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] transition-all duration-300 pointer-events-none" />
        </motion.a>

        {/* Secondary links */}
        <div className="w-full space-y-2">
          {LINKS.map(({ label, sub, href, icon, external }, i) => (
            <motion.a
              key={href}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-4 w-full px-5 py-4 border border-white/8 bg-white/[0.02] hover:border-[#d4af37]/40 hover:bg-[#d4af37]/5 transition-all duration-300 group"
              initial={{ opacity: 0, x: -15 }}
              animate={revealed ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHovered(href)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="text-[#d4af37]/50 group-hover:text-[#d4af37] transition-colors duration-300 text-base font-mono w-5 text-center flex-shrink-0">
                {icon}
              </span>
              <div className="flex-1 min-w-0">
                <span className="font-['Space_Mono'] text-white/75 group-hover:text-white text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 block">
                  {label}
                </span>
                <span className="text-white/25 text-[10px] font-light mt-0.5 block">
                  {sub}
                </span>
              </div>
              <motion.span
                className="text-[#d4af37]/0 group-hover:text-[#d4af37]/60 font-mono text-xs transition-colors duration-300"
                animate={hovered === href ? { x: [0, 3, 0] } : { x: 0 }}
                transition={{ duration: 0.4, repeat: hovered === href ? Infinity : 0 }}
              >
                →
              </motion.span>
            </motion.a>
          ))}
        </div>

        {/* Social proof strip */}
        <motion.div
          className="w-full mt-8 px-5 py-4 border border-[#d4af37]/10 bg-[#d4af37]/5"
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="font-['Space_Mono'] text-[#d4af37]/70 text-[9px] tracking-[0.3em] uppercase text-center mb-2">
            Más de 1.000 informes entregados
          </p>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[#d4af37] text-xs">★</span>
            ))}
          </div>
          <p className="text-white/30 text-[10px] text-center mt-2 font-light italic">
            "Por fin entendí por qué ciertos años cambian todo"
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={revealed ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="h-px w-20 mx-auto bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent mb-4" />
          <p className="font-['Space_Mono'] text-[9px] tracking-[0.4em] uppercase text-white/10">
            metodomecf.com · {new Date().getFullYear()}
          </p>
        </motion.div>

      </div>
    </div>
  );
}
