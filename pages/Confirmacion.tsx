import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import SeoHead from "@/components/SeoHead";

type VerifyState = "verifying" | "confirmed" | "pending" | "error";

const MOD_CFG: Record<string, { color: string; label: string; code: string; tagline: string; price: string }> = {
  INDIVIDUAL: { color: "#00f2ff", label: "MÓDULO INDIVIDUAL MECF", code: "ACS-01", tagline: "Sistema operativo del operador individual", price: "24.99" },
  ÁRBOL:      { color: "#bc00ff", label: "MÓDULO ÁRBOL GENEALÓGICO", code: "AVR-02", tagline: "Decodificación de lealtades transgeneracionales", price: "49.99" },
  SYNERGY:    { color: "#00ff88", label: "MÓDULO SOCIOS & PAREJAS", code: "SYN-03", tagline: "Mapeo del sistema sinérgico relacional", price: "34.99" },
};

const ALL_MODS = ["INDIVIDUAL", "ÁRBOL", "SYNERGY"] as const;

export default function Confirmacion() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const sessionId = params.get("session_id") ?? "";

  const storedMod = (() => { try { return localStorage.getItem("mecf_module") ?? "INDIVIDUAL"; } catch { return "INDIVIDUAL"; } })();
  const mod = MOD_CFG[storedMod] ?? MOD_CFG["INDIVIDUAL"];
  const upsellMods = ALL_MODS.filter(m => m !== storedMod);

  const [verifyState, setVerifyState] = useState<VerifyState>(
    sessionId.startsWith("cs_") ? "verifying" : "confirmed"
  );
  const [phase, setPhase] = useState(0);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);

    if (sessionId.startsWith("cs_")) {
      fetch(`/api/stripe/verify-payment?session_id=${sessionId}`)
        .then(r => r.json())
        .then((d: { paid?: boolean }) => setVerifyState(d.paid ? "confirmed" : "pending"))
        .catch(() => setVerifyState("error"));
    }

    const t = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => { setPhase(2); setGlitch(true); }, 900),
      setTimeout(() => setGlitch(false), 1300),
      setTimeout(() => setPhase(3), 1700),
      setTimeout(() => setPhase(4), 3200),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  const c = mod.color;

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "'Space Mono', monospace", overflowX: "hidden" }}>
      <SeoHead
        title="Protocolo activado — Método MECF"
        description="Tu pago ha sido confirmado. Tu informe MECF está en camino."
        noindex
      />

      <style>{`
        @keyframes scanLine {
          0%   { top: 0%;   opacity: 1; }
          90%  { top: 95%;  opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      {/* Header */}
      <header style={{ position: "fixed", top: 0, width: "100%", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", color: c, textDecoration: "none" }}>MECF</Link>
          {phase >= 2 && (
            <span style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 7, letterSpacing: "0.4em", color: "rgba(255,255,255,0.2)" }}>
              ◈ PROTOCOLO ACTIVADO
            </span>
          )}
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: 60 }}>

        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.4,
          backgroundImage: `linear-gradient(${c}12 1px, transparent 1px), linear-gradient(90deg, ${c}12 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }} />

        {/* Corner marks */}
        {[["0","0","right","bottom"], ["0","auto","right","auto"], ["auto","0","auto","bottom"], ["auto","auto","auto","auto"]].map(([t2,r2,b2,l2], i) => (
          <div key={i} style={{ position: "absolute", top: t2 === "auto" ? "auto" : 40, bottom: b2 === "auto" ? "auto" : 40, left: l2 === "auto" ? "auto" : 40, right: r2 === "auto" ? "auto" : 40, width: 20, height: 20, borderTop: i < 2 ? `1px solid ${c}40` : "none", borderBottom: i >= 2 ? `1px solid ${c}40` : "none", borderLeft: [0,2].includes(i) ? `1px solid ${c}40` : "none", borderRight: [1,3].includes(i) ? `1px solid ${c}40` : "none" }} />
        ))}

        {/* Scanner line */}
        {phase >= 1 && (
          <div style={{
            position: "absolute", left: 0, right: 0, height: 2, zIndex: 5,
            background: `linear-gradient(90deg, transparent 0%, ${c} 30%, ${c} 70%, transparent 100%)`,
            boxShadow: `0 0 24px ${c}, 0 0 48px ${c}60`,
            animation: "scanLine 1.1s ease-out forwards",
          }} />
        )}

        <div style={{ maxWidth: 680, width: "100%", padding: "0 24px", position: "relative", zIndex: 2, textAlign: "center" }}>

          {/* Verifying spinner */}
          {verifyState === "verifying" && phase < 2 && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <div style={{ width: 40, height: 40, border: `2px solid ${c}30`, borderTop: `2px solid ${c}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              <p style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 8, letterSpacing: "0.4em", color: `${c}80` }}>VERIFICANDO PAGO…</p>
            </div>
          )}

          {/* Main content */}
          {phase >= 2 && (
            <div>
              {/* Status tag */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${c}30`, padding: "6px 16px", marginBottom: 32, background: `${c}08` }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: c, boxShadow: `0 0 8px ${c}`, display: "inline-block", animation: "blink 1.5s ease infinite" }} />
                <span style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 7, letterSpacing: "0.4em", color: c }}>SISTEMA DESBLOQUEADO</span>
              </div>

              {/* Title */}
              <h1 style={{
                fontFamily: "'Syncopate', sans-serif",
                fontSize: "clamp(32px, 7vw, 64px)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                lineHeight: 1.05,
                margin: "0 0 8px",
                filter: glitch ? `drop-shadow(3px 0 #ff00ff) drop-shadow(-3px 0 ${c})` : "none",
                transition: "filter 0.08s",
              }}>
                PROTOCOLO
              </h1>
              <h1 style={{
                fontFamily: "'Syncopate', sans-serif",
                fontSize: "clamp(32px, 7vw, 64px)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: c,
                lineHeight: 1.05,
                margin: "0 0 36px",
                filter: glitch ? `drop-shadow(-3px 0 #ff00ff) drop-shadow(3px 0 ${c})` : "none",
                transition: "filter 0.08s",
                textShadow: `0 0 40px ${c}60`,
              }}>
                ACTIVADO
              </h1>

              {/* Module badge */}
              <div style={{ display: "inline-block", border: `1px solid ${c}35`, background: `${c}0d`, padding: "10px 24px", marginBottom: 48 }}>
                <p style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 8, letterSpacing: "0.35em", color: `${c}cc`, margin: 0 }}>
                  {mod.code} · {mod.label}
                </p>
              </div>
            </div>
          )}

          {/* Content body */}
          {phase >= 3 && (
            <div style={{ animation: "fadeUp 0.7s ease forwards" }}>

              {/* Steps card */}
              <div style={{ border: `1px solid ${c}18`, background: "rgba(255,255,255,0.02)", padding: "28px 32px", marginBottom: 20, textAlign: "left" }}>
                {[
                  { n: "01", t: "Tu informe PDF ha sido generado y se está enviando a tu email ahora mismo." },
                  { n: "02", t: "Si no lo recibes en los próximos 5 minutos, revisa la carpeta de spam." },
                  { n: "03", t: "¿No llegó? Puedes recuperarlo en cualquier momento desde el área de clientes." },
                ].map(({ n, t }) => (
                  <div key={n} style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                    <span style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 9, color: c, minWidth: 24, paddingTop: 3, flexShrink: 0 }}>{n}</span>
                    <p style={{ color: "rgba(255,255,255,0.60)", fontSize: 13, lineHeight: 1.75, margin: 0 }}>{t}</p>
                  </div>
                ))}
              </div>

              {/* Primer paso */}
              <div style={{ border: `1px solid ${c}18`, background: `${c}07`, padding: "20px 28px", marginBottom: 28, textAlign: "left" }}>
                <p style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 7, letterSpacing: "0.4em", color: c, marginBottom: 10 }}>PRIMER PASO OPERATIVO</p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.75, margin: 0 }}>
                  Lee tu informe con calma. Identifica tu nodo más próximo y anota la fecha de apertura. Esa es tu primera ventana de intervención activa.
                </p>
              </div>

              {/* CTA buttons */}
              <Link href="/acceso" style={{
                display: "block", width: "100%", padding: "16px",
                textAlign: "center", fontFamily: "'Syncopate', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.3em",
                color: "#000", background: c, textDecoration: "none", boxSizing: "border-box", marginBottom: 12,
              }}>
                IR AL ÁREA DE CLIENTES →
              </Link>
              <Link href="/" style={{
                display: "block", padding: "8px", textAlign: "center",
                fontFamily: "'Syncopate', sans-serif", fontSize: 7, letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.22)", textDecoration: "none",
              }}>
                ← VOLVER AL INICIO
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── UPSELL ── */}
      {phase >= 4 && (
        <section style={{ borderTop: `1px solid ${c}12`, background: "#050505", padding: "80px 24px 100px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <p style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 7, letterSpacing: "0.5em", color: c, marginBottom: 18 }}>
                ◈ AMPLÍA TU PROTOCOLO ◈
              </p>
              <h2 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: "clamp(18px, 4vw, 30px)", fontWeight: 700, letterSpacing: "0.1em", color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>
                UN SOLO MÓDULO<br />NO ES EL SISTEMA COMPLETO
              </h2>
              <p style={{ color: "rgba(255,255,255,0.40)", fontSize: 13, lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>
                El Protocolo MECF se activa por capas. Cada módulo decodifica una dimensión distinta de tu sistema operativo.
              </p>
            </div>

            {/* Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {upsellMods.map(key => {
                const m = MOD_CFG[key];
                return (
                  <div key={key} style={{ border: `1px solid ${m.color}22`, background: `${m.color}06`, padding: "32px 28px", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${m.color}90, transparent)` }} />

                    <p style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 7, letterSpacing: "0.4em", color: m.color, marginBottom: 10 }}>{m.code}</p>
                    <h3 style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: "0.08em", lineHeight: 1.35, marginBottom: 12 }}>
                      {key === "ÁRBOL" ? "ÁRBOL GENEALÓGICO" : key}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 12, lineHeight: 1.7, marginBottom: 24 }}>{m.tagline}</p>

                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 24 }}>
                      <span style={{ fontFamily: "'Syncopate', sans-serif", fontSize: 24, fontWeight: 700, color: m.color }}>{m.price}€</span>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.30)", letterSpacing: "0.1em" }}>pago único</span>
                    </div>

                    <Link href={`/protocolo?modulo=${encodeURIComponent(key)}`} style={{
                      display: "block", width: "100%", padding: "13px",
                      textAlign: "center", fontFamily: "'Syncopate', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.3em",
                      color: "#000", background: m.color, textDecoration: "none", boxSizing: "border-box",
                    }}>
                      ACTIVAR MÓDULO →
                    </Link>
                  </div>
                );
              })}
            </div>

            <p style={{ textAlign: "center", fontFamily: "'Syncopate', sans-serif", fontSize: 7, letterSpacing: "0.3em", color: "rgba(255,255,255,0.15)", marginTop: 36 }}>
              PAGO ÚNICO · SIN SUSCRIPCIÓN · DESCARGA INMEDIATA
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
