import { useState } from "react";
import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";

const CHANNELS = [
  {
    icon: "✉",
    label: "Email directo",
    value: "hola@metodomecf.com",
    href: "mailto:hola@metodomecf.com",
  },
  {
    icon: "◈",
    label: "Instagram",
    value: "@mecfmetodo",
    href: "https://www.instagram.com/mecfmetodo/",
  },
  {
    icon: "▶",
    label: "YouTube",
    value: "Misterio y Conciencia",
    href: "https://www.youtube.com/@misterioyconciencia8625",
  },
  {
    icon: "f",
    label: "Facebook",
    value: "Grupo MECF",
    href: "https://www.facebook.com/groups/684784888612881?locale=es_ES",
  },
];

export default function Contacto() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/leads/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-black border border-white/12 text-white font-light px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors placeholder:text-white/25";

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-black">
      <SeoHead
        title="Contacto — Método MECF | hola@metodomecf.com"
        description="Contacta con el equipo del Método MECF: email, Instagram, YouTube y Facebook. Respuesta en 24-48h. Por El Bachir Chekhad."
        canonical="/contacto"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contacto Método MECF",
          "url": "https://metodomecf.com/contacto",
          "mainEntity": {
            "@type": "Organization",
            "name": "Método MECF",
            "email": "hola@metodomecf.com",
            "url": "https://metodomecf.com"
          }
        }}
      />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-primary/10 bg-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <span className="font-serif font-bold text-lg tracking-widest text-primary cursor-pointer hover:opacity-80 transition-opacity">MECF</span>
          </Link>
          <Link href="/quienes-somos">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-primary transition-colors cursor-pointer">
              ← Quiénes somos
            </span>
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.09) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-5" style={{ color: "rgba(212,175,55,0.65)" }}>
            — Estamos aquí —
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Contác<em className="italic" style={{ color: "#d4af37" }}>tanos</em>
          </h1>
          <p className="text-white/80 text-base font-light leading-relaxed">
            ¿Tienes preguntas sobre el método, los módulos o tu informe? Escríbenos.
            Respondemos en menos de 48 h.
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="py-16 border-t border-primary/10">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">

          {/* FORM */}
          <div>
            {status === "ok" ? (
              <div
                className="p-10 text-center"
                style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.3)" }}
              >
                <div className="text-4xl text-primary mb-4">◆</div>
                <h2 className="text-2xl font-serif font-bold mb-3">Mensaje recibido</h2>
                <p className="text-white/72 font-light leading-relaxed mb-6">
                  Gracias por escribirnos. Te responderemos en menos de 48 horas en el email indicado.
                </p>
                <button
                  onClick={() => { setForm({ name: "", email: "", message: "" }); setStatus("idle"); }}
                  className="font-mono text-[10px] uppercase tracking-widest border px-5 py-2.5 transition-all hover:border-primary/60 hover:text-primary"
                  style={{ borderColor: "rgba(212,175,55,0.3)", color: "rgba(212,175,55,0.7)" }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(212,175,55,0.7)" }}>
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Cómo te llamamos"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(212,175,55,0.7)" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className={inputClass}
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(212,175,55,0.7)" }}>
                    Mensaje
                  </label>
                  <textarea
                    rows={6}
                    className={`${inputClass} resize-none`}
                    placeholder="¿En qué podemos ayudarte?"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    required
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm font-mono" style={{ color: "rgba(255,100,100,0.8)" }}>
                    ✕ Hubo un error al enviar. Prueba escribiéndonos directamente a hola@metodomecf.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-primary text-black font-mono font-bold py-4 uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Enviando…" : "Enviar mensaje →"}
                </button>
                <p className="text-[10px] font-mono text-white/30 text-center">
                  No usamos tu mensaje para marketing. Solo para responderte.
                </p>
              </form>
            )}
          </div>

          {/* CONTACT CHANNELS */}
          <div className="space-y-4 pt-1">
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-6" style={{ color: "rgba(212,175,55,0.6)" }}>
              — Otras vías de contacto —
            </p>
            {CHANNELS.map(ch => (
              <a
                key={ch.label}
                href={ch.href}
                target={ch.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 border transition-all group hover:border-primary/40"
                style={{ background: "rgba(212,175,55,0.03)", borderColor: "rgba(212,175,55,0.14)" }}
              >
                <span
                  className="shrink-0 w-9 h-9 flex items-center justify-center border font-mono font-bold text-sm"
                  style={{ borderColor: "rgba(212,175,55,0.3)", color: "#d4af37", background: "rgba(212,175,55,0.07)" }}
                >
                  {ch.icon}
                </span>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/40 mb-0.5">{ch.label}</p>
                  <p className="text-white/85 text-sm group-hover:text-primary transition-colors">{ch.value}</p>
                </div>
                <span className="ml-auto self-center text-white/20 group-hover:text-primary transition-colors text-sm">→</span>
              </a>
            ))}

            <div
              className="mt-8 p-5 border"
              style={{ background: "rgba(212,175,55,0.05)", borderColor: "rgba(212,175,55,0.2)" }}
            >
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: "#d4af37" }}>
                Tiempo de respuesta
              </p>
              <p className="text-white/70 text-sm font-light leading-relaxed">
                Respondemos todos los mensajes en un máximo de <strong className="text-white font-medium">48 horas</strong>,
                de lunes a viernes. Los fines de semana podemos tardar algo más.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-6 border-t border-primary/10 bg-black mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-serif font-bold text-primary tracking-widest text-sm">MECF</div>
          <p className="text-xs font-mono text-white/40">
            &copy; {new Date().getFullYear()} El Bachir Chekhad · metodomecf.com
          </p>
          <div className="flex items-center gap-4">
            <Link href="/quienes-somos">
              <span className="text-xs font-mono text-white/40 hover:text-primary transition-colors cursor-pointer">Quiénes somos</span>
            </Link>
            <Link href="/contacto">
              <span className="text-xs font-mono text-white/40 hover:text-primary transition-colors cursor-pointer">Contacto</span>
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
