import { Link } from "wouter";
import { TERMS } from "@/data/glosarioData";
import SeoHead from "@/components/SeoHead";

function GoldRule() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="h-px flex-1" style={{ background: "linear-gradient(to right, #d4af37, transparent)" }} />
      <span style={{ color: "#d4af37", fontSize: 9 }}>◆</span>
      <div className="h-px flex-1" style={{ background: "linear-gradient(to left, #d4af37, transparent)" }} />
    </div>
  );
}

export default function Glosario() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-black">
      <SeoHead
        title="Glosario MECF — Términos del Método explicados en palabras simples"
        description="Todos los términos del Método MECF explicados sin jerga: Software, Hardware, Firmware, Voltaje, Nodo, Árbol biográfico, Protocolo, Actualización, Ciclo biográfico y Código MECF."
        canonical="/glosario"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Glosario Método MECF",
          "description": "Términos técnicos del Método MECF explicados en lenguaje cotidiano",
          "url": "https://metodomecf.com/glosario",
          "itemListElement": TERMS.map((t, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": t.term,
            "description": t.simple,
            "url": `https://metodomecf.com/glosario/${t.slug}`
          }))
        }}
      />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-primary/10 bg-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <span className="font-serif font-bold text-lg tracking-widest text-primary cursor-pointer hover:opacity-80 transition-opacity">MECF</span>
          </Link>
          <Link href="/protocolo">
            <span className="font-mono text-[10px] uppercase tracking-widest border px-4 py-2 transition-all cursor-pointer hover:border-primary/60 hover:text-primary"
              style={{ borderColor: "rgba(212,175,55,0.3)", color: "rgba(212,175,55,0.65)" }}>
              Ver módulos →
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
            — Sin jerga técnica —
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Glosario <em className="italic" style={{ color: "#d4af37" }}>MECF</em>
          </h1>
          <GoldRule />
          <p className="text-white/80 text-lg font-light leading-relaxed mt-6 max-w-2xl mx-auto">
            El Método MECF usa lenguaje técnico porque describe sistemas técnicos. Aquí tienes cada
            término explicado en palabras normales, con su analogía cotidiana y su aplicación concreta.
          </p>
        </div>
      </section>

      {/* ── TERMS GRID — cada card es un link a su subpágina ── */}
      <section className="py-8 border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6 space-y-2">
          {TERMS.map(t => (
            <Link key={t.slug} href={`/glosario/${t.slug}`}>
              <div
                className="border flex items-center gap-4 px-6 py-5 cursor-pointer group transition-all duration-200 hover:bg-primary/5"
                style={{ borderColor: "rgba(212,175,55,0.15)", background: "rgba(212,175,55,0.02)" }}
              >
                <span className="shrink-0 text-lg transition-colors" style={{ color: "#d4af37" }}>{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-serif font-bold text-lg text-white group-hover:text-primary transition-colors">{t.term}</span>
                    <span className="text-white/45 text-sm font-light">— {t.simple}</span>
                  </div>
                </div>
                <span
                  className="shrink-0 font-mono text-xs transition-all group-hover:translate-x-1 duration-200"
                  style={{ color: "rgba(212,175,55,0.5)" }}
                >→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-primary/10 text-center">
        <div className="max-w-xl mx-auto px-6 space-y-5">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: "rgba(212,175,55,0.6)" }}>
            — Ya tienes el vocabulario —
          </p>
          <h2 className="text-3xl font-serif font-bold">
            ¿Listo para leer tu<br />
            <em className="italic" style={{ color: "#d4af37" }}>código maestro</em>?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/protocolo">
              <span className="inline-block bg-primary text-black font-mono font-bold px-10 py-4 uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 cursor-pointer">
                Ver módulos →
              </span>
            </Link>
            <Link href="/contacto">
              <span className="inline-block border border-primary/50 text-primary font-mono text-sm px-8 py-4 uppercase tracking-widest hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                Tengo más preguntas
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-6 border-t border-primary/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-serif font-bold text-primary tracking-widest text-sm">MECF</div>
          <p className="text-xs font-mono text-white/35">
            &copy; {new Date().getFullYear()} El Bachir Chekhad · metodomecf.com
          </p>
          <div className="flex items-center gap-4">
            <Link href="/quienes-somos"><span className="text-xs font-mono text-white/35 hover:text-primary transition-colors cursor-pointer">Quiénes somos</span></Link>
            <Link href="/contacto"><span className="text-xs font-mono text-white/35 hover:text-primary transition-colors cursor-pointer">Contacto</span></Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
