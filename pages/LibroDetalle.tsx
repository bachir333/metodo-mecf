import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { libroBloques } from "@/data/libro";
import SeoHead from "@/components/SeoHead";

export default function LibroDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const bloque = libroBloques.find((b) => b.slug === slug);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, [slug]);

  if (!bloque) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-mono text-primary text-xs tracking-widest uppercase">Error 404</p>
          <h1 className="text-3xl font-serif font-bold">Capítulo no encontrado</h1>
          <Link href="/" className="inline-block font-mono text-xs text-primary hover:underline">← Volver al inicio</Link>
        </div>
      </div>
    );
  }

  const idx = libroBloques.findIndex((b) => b.slug === slug);
  const prev = idx > 0 ? libroBloques[idx - 1] : null;
  const next = idx < libroBloques.length - 1 ? libroBloques[idx + 1] : null;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <SeoHead
        title={`${bloque.title} — El Libro MECF`}
        description={bloque.desc}
        canonical={`/libro/${bloque.slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": bloque.title,
          "description": bloque.desc,
          "url": `https://metodomecf.com/libro/${bloque.slug}`,
          "author": { "@type": "Person", "name": "El Bachir Chekhad" },
          "publisher": { "@type": "Organization", "name": "Método MECF", "url": "https://metodomecf.com" }
        }}
      />

      {/* NAV */}
      <header className="fixed top-0 w-full border-b border-white/5 bg-background/90 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-lg tracking-widest text-primary">MECF</Link>
          <Link href="/#libro" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            ← El Libro
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-5xl font-bold text-primary/15 select-none">{bloque.num}</span>
            <div className="h-px flex-1 bg-primary/20" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/50">EL LIBRO · BLOQUE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-5">
            {bloque.title}
          </h1>
          <p className="text-lg text-muted-foreground font-light border-l-2 border-primary pl-5 leading-relaxed">
            {bloque.desc}
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="pb-10">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xl font-serif font-light leading-relaxed text-white/80">
            {bloque.intro}
          </p>
        </div>
      </section>

      {/* SECCIONES */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6 space-y-0">
          {bloque.secciones.map((s, i) => (
            <div key={i} className="border-t border-white/8 py-10 group">
              <div className="flex gap-6 items-start">
                <span className="font-mono text-primary/30 text-sm shrink-0 mt-1">0{i + 1}</span>
                <div className="space-y-3">
                  <h2 className="text-xl font-serif font-bold group-hover:text-primary transition-colors duration-300">
                    {s.titulo}
                  </h2>
                  <p className="text-muted-foreground font-light leading-relaxed text-base">
                    {s.texto}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CIERRE */}
      <section className="py-10 border-t border-white/8">
        <div className="max-w-3xl mx-auto px-6">
          <div className="font-mono text-sm text-muted-foreground p-8 border border-white/10 bg-white/[0.02] leading-relaxed">
            <p className="text-primary mb-2 text-[10px] tracking-widest uppercase">&gt; Siguiente bloque</p>
            <p>{bloque.cierre}</p>
          </div>
        </div>
      </section>

      {/* CTA LIBRO */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-5">
          <p className="font-mono text-xs tracking-widest uppercase text-primary/60">Disponible ahora</p>
          <h3 className="text-2xl md:text-3xl font-serif font-bold">
            Lee el libro completo
          </h3>
          <p className="text-muted-foreground font-light">
            13 capítulos. 4 bloques. El manual de usuario que te fue negado al nacer.
          </p>
          <a
            href="https://www.letrame.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-primary/50 text-primary font-mono font-bold px-10 py-4 uppercase tracking-widest text-sm hover:bg-primary/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            Obtener el Libro →
          </a>
        </div>
      </section>

      {/* NAV PREV / NEXT */}
      <section className="py-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 flex justify-between items-center gap-4">
          {prev ? (
            <Link href={`/libro/${prev.slug}`} className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
              <span className="text-lg">←</span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/20 group-hover:text-primary/40">Anterior</p>
                <p className="font-serif text-sm">{prev.title}</p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/libro/${next.slug}`} className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-right">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/20 group-hover:text-primary/40">Siguiente</p>
                <p className="font-serif text-sm">{next.title}</p>
              </div>
              <span className="text-lg">→</span>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 border-t border-white/10 bg-black">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-serif font-bold text-primary tracking-widest text-sm">MECF</div>
          <p className="text-xs font-mono text-muted-foreground">
            &copy; {new Date().getFullYear()} El Bachir Chekhad · @METODO-MECF
          </p>
          <Link href="/" className="text-xs font-mono text-primary hover:underline">Volver al inicio</Link>
        </div>
      </footer>

    </div>
  );
}
