import { Link } from "wouter";

const CONTRASTS = [
  { other: "Tú eres tu eneatipo",     mecf: "Tu sistema usa la lógica del Voltaje 3", slug: "voltaje" },
  { other: "Tú eres tu signo",        mecf: "Tu firmware opera bajo esa frecuencia",   slug: "firmware" },
  { other: "Tu trauma te define",     mecf: "Tu árbol ejecuta un programa heredado",   slug: "arbol" },
  { other: "Tu destino está escrito", mecf: "Tus nodos son ventanas, no sentencias",   slug: "nodos" },
  { other: "Estás roto",              mecf: "Tu sistema necesita una actualización",    slug: "actualizacion" },
];

const PYR_W    = 360;
const PYR_H    = 248;
const PYR_INDENT = 86;
const lx = (relY: number) => PYR_INDENT * (1 - relY / PYR_H);
const rx = (relY: number) => PYR_W - lx(relY);
const LAYER_H  = PYR_H / 4;

// SVG layout — badge sits above pyramid, matched to its top width
const BADGE_H   = 40;
const PYR_OFF   = 94; // pyramid starts at this SVG y-coord
const SVG_TOT_H = PYR_OFF + PYR_H + 36;
const CX        = PYR_W / 2;       // 180
const BADGE_X1  = PYR_INDENT;      // = lx(0) = 86
const BADGE_X2  = PYR_W - PYR_INDENT; // = rx(0) = 274

const PYR_LAYERS = [
  { label: "PROTOCOLOS · NODOS · MISIÓN",      fill: 0.22, stroke: 0.55, text: 1.00 },
  { label: "FIRMWARE · ÁRBOL · VOLTAJES",       fill: 0.15, stroke: 0.40, text: 0.78 },
  { label: "CREENCIAS · HÁBITOS · PROGRAMAS",   fill: 0.10, stroke: 0.28, text: 0.58 },
  { label: "EMOCIONES · REACCIONES · SÍNTOMAS", fill: 0.06, stroke: 0.18, text: 0.40 },
];

export default function ObservadorSection() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: "#080808" }}>

      {/* Glow top-center */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: 800, height: 400,
        background: "radial-gradient(ellipse at top, rgba(212,175,55,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <style>{`
        @keyframes observador-pulse {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(212,175,55,0.55)); opacity: 1; }
          50%       { filter: drop-shadow(0 0 18px rgba(212,175,55,1)); opacity: 0.9; }
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── HEADER ── */}
        <div className="text-center mb-20">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-5" style={{ color: "rgba(212,175,55,0.7)" }}>
            — La diferencia que cambia todo —
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-white mb-5">
            El observador siempre está{" "}
            <em style={{ fontStyle: "italic", color: "#d4af37" }}>por encima de la pirámide</em>
          </h2>
          <p className="text-white/82 text-base font-light max-w-lg mx-auto leading-relaxed">
            La mayoría de métodos te meten dentro del sistema. Te convierten en el mapa.{" "}
            <strong className="text-white font-medium">El MECF hace lo contrario.</strong>
          </p>
        </div>

        {/* ── BODY ── */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-start">

          {/* LEFT — unified SVG: badge + connector + pyramid */}
          <div className="flex flex-col items-center">
            <svg
              viewBox={`0 0 ${PYR_W} ${SVG_TOT_H}`}
              width="100%"
              style={{ maxWidth: 400, display: "block" }}
            >
              <defs>
                <linearGradient id="badge-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f5e27a" />
                  <stop offset="100%" stopColor="#c9a020" />
                </linearGradient>
                {PYR_LAYERS.map((layer, i) => (
                  <linearGradient key={i} id={`pyr-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity={layer.fill * 1.4} />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity={layer.fill * 0.55} />
                  </linearGradient>
                ))}
                <filter id="pyr-top-glow" x="-15%" y="-30%" width="130%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* ── BADGE — exact width of pyramid top ── */}
              <g style={{ animation: "observador-pulse 2.4s ease-in-out infinite" }}>
                <rect
                  x={BADGE_X1} y={4}
                  width={BADGE_X2 - BADGE_X1} height={BADGE_H}
                  fill="url(#badge-grad)" rx={1}
                />
                <text
                  x={CX} y={4 + BADGE_H / 2 + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fill="#000" fontSize="10.5" fontWeight="bold"
                  fontFamily="'Courier New', monospace" letterSpacing="3"
                >
                  ◈ EL OBSERVADOR
                </text>
              </g>

              {/* Subtitle */}
              <text
                x={CX} y={4 + BADGE_H + 18}
                textAnchor="middle" dominantBaseline="middle"
                fill="rgba(212,175,55,0.75)" fontSize="8"
                fontFamily="'Courier New', monospace" letterSpacing="2.5"
              >
                TÚ — CONSCIENTE DEL SISTEMA
              </text>

              {/* Connector line */}
              <line
                x1={CX} y1={4 + BADGE_H + 30}
                x2={CX} y2={PYR_OFF - 7}
                stroke="rgba(212,175,55,0.55)" strokeWidth="1"
              />
              {/* Arrow */}
              <polygon
                points={`${CX - 5},${PYR_OFF - 7} ${CX + 5},${PYR_OFF - 7} ${CX},${PYR_OFF}`}
                fill="rgba(212,175,55,0.5)"
              />

              {/* ── PYRAMID LAYERS ── */}
              {PYR_LAYERS.map((layer, i) => {
                const relY0 = i * LAYER_H;
                const relY1 = (i + 1) * LAYER_H;
                const y0 = PYR_OFF + relY0;
                const y1 = PYR_OFF + relY1;
                const pts = `${lx(relY0)},${y0} ${rx(relY0)},${y0} ${rx(relY1)},${y1} ${lx(relY1)},${y1}`;
                const midY = (y0 + y1) / 2;
                return (
                  <g key={i}>
                    <polygon
                      points={pts}
                      fill={`url(#pyr-grad-${i})`}
                      stroke={`rgba(212,175,55,${layer.stroke})`}
                      strokeWidth={i === 0 ? 1.2 : 0.7}
                      filter={i === 0 ? "url(#pyr-top-glow)" : undefined}
                    />
                    {i > 0 && (
                      <line
                        x1={lx(relY0)} y1={y0} x2={rx(relY0)} y2={y0}
                        stroke={`rgba(212,175,55,${layer.stroke * 0.65})`}
                        strokeWidth="0.6"
                      />
                    )}
                    <text
                      x={CX} y={midY + 1}
                      textAnchor="middle" dominantBaseline="middle"
                      fill={`rgba(255,255,255,${layer.text})`}
                      fontSize="8.5" fontFamily="'Courier New', monospace" letterSpacing="2.2"
                    >
                      {layer.label}
                    </text>
                  </g>
                );
              })}

              {/* Base line */}
              <line
                x1={lx(PYR_H)} y1={PYR_OFF + PYR_H}
                x2={rx(PYR_H)} y2={PYR_OFF + PYR_H}
                stroke="rgba(212,175,55,0.14)" strokeWidth="1"
              />

              {/* Footer label */}
              <text
                x={CX} y={PYR_OFF + PYR_H + 20}
                textAnchor="middle" dominantBaseline="middle"
                fill="rgba(212,175,55,0.22)" fontSize="7.5"
                fontFamily="'Courier New', monospace" letterSpacing="3"
              >
                EL SISTEMA — LO QUE OPERA EN TI
              </text>
            </svg>
          </div>

          {/* RIGHT — Contrast table + quote */}
          <div className="flex flex-col">

            {/* Column headers */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div
                className="flex items-center gap-2 px-3 py-2.5"
                style={{ background: "rgba(255,60,60,0.04)", border: "1px solid rgba(255,80,80,0.14)" }}
              >
                <span
                  className="shrink-0 flex items-center justify-center text-[10px] font-bold leading-none"
                  style={{ width: 18, height: 18, background: "rgba(255,80,80,0.10)", color: "rgba(255,100,100,0.6)", border: "1px solid rgba(255,80,80,0.22)" }}
                >✕</span>
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,160,160,0.6)" }}>
                  Otros métodos dicen
                </span>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2.5"
                style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                <span
                  className="shrink-0 flex items-center justify-center text-[9px] leading-none"
                  style={{ width: 18, height: 18, background: "rgba(212,175,55,0.18)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.35)" }}
                >◆</span>
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: "#d4af37" }}>
                  MECF dice
                </span>
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-1.5">
              {CONTRASTS.map((c, i) => (
                <div key={i} className="grid grid-cols-2 gap-2 group">

                  {/* Other method */}
                  <div
                    className="flex items-start gap-2.5 px-3 py-3.5"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      borderLeft: "2px solid rgba(255,80,80,0.25)",
                    }}
                  >
                    <span
                      className="shrink-0 mt-0.5 text-[10px] font-bold leading-none"
                      style={{ color: "rgba(255,100,100,0.55)" }}
                    >✕</span>
                    <span
                      className="text-[12.5px] font-light leading-snug"
                      style={{ color: "rgba(255,150,150,0.45)", textDecoration: "line-through", textDecorationColor: "rgba(255,100,100,0.3)" }}
                    >{c.other}</span>
                  </div>

                  {/* MECF — link */}
                  <Link
                    href={`/observador/${c.slug}`}
                    className="flex items-start gap-2.5 px-3 py-3.5 transition-all"
                    style={{
                      background: "rgba(212,175,55,0.05)",
                      borderLeft: "2px solid rgba(212,175,55,0.4)",
                    }}
                  >
                    <span className="shrink-0 mt-0.5 leading-none text-[10px]" style={{ color: "#d4af37" }}>◆</span>
                    <span className="text-white/88 text-[12.5px] font-normal leading-snug group-hover:text-primary transition-colors">
                      {c.mecf}
                      <span
                        className="inline-block ml-1.5 opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-0.5 text-[11px]"
                        style={{ color: "#d4af37" }}
                      >→</span>
                    </span>
                  </Link>

                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="mt-6 relative overflow-hidden" style={{ border: "1px solid rgba(212,175,55,0.22)" }}>
              {/* top accent bar */}
              <div style={{ height: 2, background: "linear-gradient(to right, #d4af37, rgba(212,175,55,0.1))" }} />
              <div className="px-6 py-5" style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.07) 0%, transparent 60%)" }}>
                {/* decorative quote mark */}
                <div
                  className="font-serif font-bold leading-none mb-3 select-none"
                  style={{ fontSize: 48, color: "rgba(212,175,55,0.15)", lineHeight: 1 }}
                >"</div>
                <p className="text-white/80 text-[14px] font-light leading-relaxed italic -mt-3">
                  Cuando observas un sistema, ya no eres el sistema. Esa es la diferencia entre
                  vivir dentro del mapa y leerlo desde fuera.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div style={{ width: 20, height: 1, background: "#d4af37" }} />
                  <p className="font-mono text-[8.5px] tracking-[0.35em] uppercase" style={{ color: "rgba(212,175,55,0.6)" }}>
                    El Bachir Chekhad · Método MECF
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
