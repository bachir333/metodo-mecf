import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { PAIN_ITEMS } from "@/data/painItems";
import SeoHead from "@/components/SeoHead";

export default function ProblemaDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const item = PAIN_ITEMS.find((p) => p.slug === slug);
  const idx = PAIN_ITEMS.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? PAIN_ITEMS[idx - 1] : null;
  const next = idx < PAIN_ITEMS.length - 1 ? PAIN_ITEMS[idx + 1] : null;

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, [slug]);

  if (!item) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-mono text-primary text-xs tracking-widest uppercase">Error 404</p>
          <h1 className="text-3xl font-serif font-bold">Sección no encontrada</h1>
          <Link href="/#problema" className="inline-block font-mono text-xs text-primary hover:underline">← Volver</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <SeoHead
        title={`${item.t} — ¿Te reconoces aquí? | Método MECF`}
        description={item.d}
        canonical={`/problema/${item.slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": item.t,
          "description": item.d,
          "url": `https://metodomecf.com/problema/${item.slug}`,
          "author": { "@type": "Person", "name": "El Bachir Chekhad" },
          "publisher": { "@type": "Organization", "name": "Método MECF", "url": "https://metodomecf.com" }
        }}
      />

      {/* NAV */}
      <header className="fixed top-0 w-full border-b border-white/5 bg-background/90 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-lg tracking-widest text-primary">MECF</Link>
          <Link href="/#problema" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            ← Volver
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-16 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 70%)" }}
        />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-5xl font-bold text-primary/15 select-none">{item.n}</span>
            <div className="h-px flex-1 bg-primary/20" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/50">¿TE RECONOCES AQUÍ?</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-5">{item.t}</h1>
          <p className="text-lg text-muted-foreground font-light border-l-2 border-primary pl-5 leading-relaxed">
            {item.d}
          </p>
        </div>
      </section>

      {/* SEPARADOR */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      {/* CUERPO */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          {item.body.map((paragraph, i) => (
            <p key={i} className="text-base text-amber-100/80 font-light leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60">— La solución existe —</p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold">
            El Método MECF mapea esto con<br />
            <span className="text-primary">precisión técnica.</span>
          </h2>
          <Link
            href="/modulos"
            className="inline-block mt-2 px-8 py-4 bg-primary text-black font-mono text-xs tracking-widest uppercase font-bold hover:bg-primary/90 transition-colors"
          >
            Ver los módulos
          </Link>
        </div>
      </section>

      {/* NAVEGACIÓN ENTRE SECCIONES */}
      {(prev || next) && (
        <nav className="border-t border-primary/10 py-8">
          <div className="max-w-3xl mx-auto px-6 flex justify-between items-center">
            {prev ? (
              <Link
                href={`/problema/${prev.slug}`}
                className="group flex flex-col gap-1 max-w-[45%]"
              >
                <span className="font-mono text-[10px] tracking-widest uppercase text-primary/40 group-hover:text-primary transition-colors">← Anterior</span>
                <span className="font-serif text-sm text-white/70 group-hover:text-white transition-colors">{prev.t}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/problema/${next.slug}`}
                className="group flex flex-col gap-1 items-end max-w-[45%]"
              >
                <span className="font-mono text-[10px] tracking-widest uppercase text-primary/40 group-hover:text-primary transition-colors">Siguiente →</span>
                <span className="font-serif text-sm text-white/70 group-hover:text-white transition-colors text-right">{next.t}</span>
              </Link>
            ) : <div />}
          </div>
        </nav>
      )}
    </div>
  );
}
