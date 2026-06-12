import { useState, useEffect, useRef } from "react";
import SeoHead from "@/components/SeoHead";

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  });
  return t;
}

function Pad({ n }: { n: number }) {
  return <span>{String(n).padStart(2, "0")}</span>;
}

function LeadForm({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), source }),
      });
      if (r.ok || r.status === 409) {
        try { (window as any).fbq?.("track", "Lead", { content_name: source }); } catch (_) {}
        try { (window as any).dataLayer?.push({ event: "lead_capture", source }); } catch (_) {}
        setState("done");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="border border-primary/30 bg-primary/5 px-6 py-5 text-center space-y-2">
        <p className="text-primary font-mono text-xs tracking-widest uppercase">✓ Recibido</p>
        <p className="text-white/60 text-sm font-light">Revisa tu bandeja — te enviamos el acceso en unos minutos.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className="flex-1 bg-zinc-900 border border-white/10 px-4 py-4 font-mono text-sm text-white placeholder-white/20 outline-none focus:border-primary/50 transition-colors"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="bg-primary text-black font-mono font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-white transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
      >
        {state === "loading" ? "ENVIANDO…" : "ACCEDER GRATIS →"}
      </button>
    </form>
  );
}

const DEADLINE = new Date(Date.now() + 23 * 3600000 + 59 * 60000 + 59000);

const TESTIMONIALS = [
  { t: "Llevaba años tomando decisiones en el momento equivocado. El informe me mostró que no era suerte — era el ciclo.", a: "Martina R., Madrid" },
  { t: "Compré el módulo ÁRBOL por curiosidad. Dos semanas después entendí por qué tres generaciones de mi familia repiten el mismo patrón.", a: "Carlos V., Barcelona" },
  { t: "El análisis SYNERGY con mi socio explicó los bloqueos que teníamos mejor que cualquier coach de empresa.", a: "Irina M., Valencia" },
];

export default function LandingAds() {
  const ct = useCountdown(DEADLINE);
  const formRef = useRef<HTMLDivElement>(null);

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden font-sans">
      <SeoHead
        title="El Código Maestro del Destino — Análisis de ciclos biográficos"
        description="Descubre el sistema de patrones que define tus ventanas de expansión y bloqueo. Informe PDF personalizado. Descarga inmediata."
        noindex={true}
      />

      {/* ── BARRA URGENCIA ── */}
      <div className="w-full bg-primary text-black text-center py-2.5 font-mono text-[10px] tracking-widest uppercase font-bold sticky top-0 z-50">
        Precio especial termina en&nbsp;
        <Pad n={ct.h} />h <Pad n={ct.m} />m <Pad n={ct.s} />s
        &nbsp;—&nbsp;
        <button onClick={scrollToForm} className="underline underline-offset-2 hover:no-underline">
          Reservar mi acceso →
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="pt-20 pb-16 px-6 text-center max-w-3xl mx-auto space-y-8">
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-primary/60">
          Método MECF · v6.0 · Letrame Grupo Editorial
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
          Hay un sistema detrás<br />
          <span className="text-primary italic">de tus bloqueos.</span><br />
          <span className="text-white/80">Y tiene fecha exacta.</span>
        </h1>
        <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
          El Código Maestro del Destino identifica los 5 nodos cronológicos donde tu frecuencia cambia de dirección.
          No astrología. No motivación. <strong className="text-white/90">Análisis técnico de tus ciclos biográficos.</strong>
        </p>
        <button
          onClick={scrollToForm}
          className="inline-block bg-primary text-black font-mono font-bold px-12 py-5 text-sm uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-[0_0_60px_rgba(212,175,55,0.4)]"
        >
          Quiero ver mis ciclos →
        </button>
        <p className="text-xs font-mono text-white/25 tracking-widest">Pago único · sin suscripción · descarga inmediata</p>
      </section>

      {/* ── DIVISOR ── */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      {/* ── SÍNTOMAS ── */}
      <section className="py-16 px-6 max-w-3xl mx-auto space-y-10">
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-primary/50 text-center">— El diagnóstico —</p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center leading-snug">
          ¿Reconoces alguno de estos patrones?
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Tomas decisiones importantes y el resultado es siempre el mismo",
            "Hay años donde todo fluye y otros donde todo se bloquea — sin razón aparente",
            "Sientes que llegas tarde a las oportunidades o que actúas fuera de tiempo",
            "Los mismos conflictos se repiten en tu entorno laboral o personal",
            "Tienes claridad mental en ciertos momentos y niebla total en otros",
            "Algo te dice que hay un patrón, pero no consigues identificarlo",
          ].map(s => (
            <div key={s} className="flex items-start gap-3 border border-white/6 bg-zinc-950 px-5 py-4">
              <span className="text-primary text-sm shrink-0 mt-0.5">◈</span>
              <p className="text-white/65 text-sm font-light leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-white/40 font-mono text-xs tracking-widest">
          Si reconoces 3 o más — tienes el sistema activo sin saberlo.
        </p>
      </section>

      {/* ── QUÉ RECIBES ── */}
      <section className="py-16 px-6 bg-zinc-950 border-y border-primary/10">
        <div className="max-w-3xl mx-auto space-y-10">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-primary/50 text-center">— Lo que obtienes —</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center">Tu informe incluye</h2>
          <div className="space-y-5">
            {[
              ["01", "Los 5 nodos cronológicos de tu ciclo biográfico", "Las fechas exactas donde tu frecuencia experimenta un cambio de dirección — expansión o contracción."],
              ["02", "Diagnóstico de tu voltaje actual", "El grupo energético en el que operas hoy y cómo afecta a tus decisiones, relaciones y resultados."],
              ["03", "Ventanas de intervención activa", "Los periodos donde actuar tiene mayor retorno y los que es mejor usar para consolidar, no para iniciar."],
              ["04", "Análisis de patrones heredados (módulo Árbol)", "Identificación de lealtades invisibles y memorias repetitivas del sistema familiar que operan en ti."],
              ["05", "Coherencia relacional y de negocio (módulo Synergy)", "Análisis algoritmo-relacional entre dos operadores — socios, parejas, colaboradores."],
            ].map(([n, title, desc]) => (
              <div key={n} className="flex gap-6 border-b border-white/5 pb-5 last:border-0">
                <span className="font-mono text-primary/30 text-4xl font-bold shrink-0 leading-none mt-1">{n}</span>
                <div>
                  <p className="font-mono text-xs tracking-widest uppercase text-white/80 mb-1">{title}</p>
                  <p className="text-white/45 text-sm font-light leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 px-6 max-w-3xl mx-auto space-y-8">
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-primary/50 text-center">— Resultados reales —</p>
        <div className="space-y-4">
          {TESTIMONIALS.map(({ t, a }) => (
            <div key={a} className="border border-primary/15 bg-zinc-950/60 px-7 py-6 space-y-3">
              <p className="text-white/75 text-sm font-light leading-relaxed italic">"{t}"</p>
              <p className="font-mono text-[10px] tracking-widest uppercase text-primary/50">— {a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LEAD CAPTURE / CTA ── */}
      <section ref={formRef} className="py-20 px-6 bg-zinc-950 border-t border-primary/15">
        <div className="max-w-xl mx-auto space-y-8 text-center">
          <div>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-primary/60 mb-4">— Primer paso —</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold leading-snug mb-4">
              Empieza con el<br /><span className="text-primary italic">diagnóstico gratuito</span>
            </h2>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              Introduce tu email y accede al quiz de diagnóstico MECF. Te identificamos el módulo exacto que necesitas — sin compromiso.
            </p>
          </div>
          <LeadForm source="lp-ads" />
          <div className="h-px bg-primary/10" />
          <p className="font-mono text-[9px] tracking-widest uppercase text-primary/30">¿Ya sabes qué módulo quieres?</p>
          <a
            href="/protocolo"
            className="inline-block border border-primary/40 text-primary font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-primary hover:text-black transition-all duration-300"
          >
            Ir directo al protocolo — desde 24,99€ →
          </a>
          <p className="text-xs font-mono text-white/20">Sin suscripción · Descarga inmediata · PDF personalizado</p>
        </div>
      </section>

      {/* ── MINI FOOTER ── */}
      <footer className="py-6 border-t border-white/5 text-center">
        <p className="font-mono text-[10px] text-white/20 tracking-widest">
          © {new Date().getFullYear()} El Bachir Chekhad · Letrame Grupo Editorial ·{" "}
          <a href="/privacidad" className="hover:text-primary transition-colors">Privacidad</a>
        </p>
      </footer>
    </div>
  );
}
