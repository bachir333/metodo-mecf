import { useState } from "react";

function firePixelLead() {
  try { (window as any).fbq?.("track", "Lead"); } catch (_) {}
  try { (window as any).dataLayer?.push({ event: "lead_capture", source: "home" }); } catch (_) {}
}

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Introduce un email válido.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "home" }),
      });
      if (res.ok || res.status === 409) {
        firePixelLead();
        setStatus("ok");
      } else {
        throw new Error("error");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Algo salió mal. Inténtalo de nuevo.");
    }
  };

  return (
    <section className="py-20 border-t border-primary/10 bg-zinc-950 reveal">
      <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60">— No estás listo/a para comprar aún —</p>
        <h2 className="text-2xl md:text-3xl font-serif font-bold">
          Recibe el primer análisis<br /><span className="text-primary italic">gratis por email</span>
        </h2>
        <p className="text-white/60 text-sm font-light max-w-md mx-auto">
          Te enviamos una introducción a tu código MECF y los ciclos clave de 2026 sin compromiso. Sin spam.
        </p>

        {status === "ok" ? (
          <div className="border border-primary/30 bg-primary/5 px-6 py-5 font-mono text-sm text-primary tracking-widest">
            ✓ Apuntado. Revisa tu bandeja de entrada.
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrorMsg(""); setStatus("idle"); }}
              placeholder="tu@email.com"
              className="flex-1 bg-black border-2 border-primary/40 text-white font-mono text-sm px-4 py-3 focus:border-primary focus:outline-none transition-colors placeholder:text-white/20"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-primary text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 shrink-0"
            >
              {status === "loading" ? "Enviando…" : "Quiero el análisis →"}
            </button>
          </form>
        )}

        {errorMsg && (
          <p className="font-mono text-xs text-red-400">{errorMsg}</p>
        )}

        <p className="font-mono text-[9px] tracking-widest uppercase text-white/25">
          Sin spam · Sin suscripciones · Cancela cuando quieras
        </p>
      </div>
    </section>
  );
}
