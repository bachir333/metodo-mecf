import { Link, useParams } from "wouter";
import { getTermBySlug, getRelatedTerms, TERMS } from "@/data/glosarioData";
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

export default function GlosarioDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const term = getTermBySlug(slug ?? "");

  if (!term) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
        <p className="font-mono text-white/50 text-sm">Término no encontrado</p>
        <Link href="/glosario">
          <span className="font-mono text-xs text-primary border border-primary/30 px-6 py-3 cursor-pointer hover:bg-primary/10 transition-colors">
            ← Volver al glosario
          </span>
        </Link>
      </div>
    );
  }

  const related = getRelatedTerms(term.related);
  const allTerms = TERMS.filter(t => t.slug !== term.slug);
  const currentIdx = TERMS.findIndex(t => t.slug === term.slug);
  const prevTerm = TERMS[currentIdx - 1] ?? null;
  const nextTerm = TERMS[currentIdx + 1] ?? null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": term.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": term.seoTitle,
    "description": term.seoDesc,
    "url": `https://metodomecf.com/glosario/${term.slug}`,
    "author": { "@type": "Person", "name": "El Bachir Chekhad" },
    "publisher": { "@type": "Organization", "name": "Método MECF", "url": "https://metodomecf.com" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://metodomecf.com/" },
        { "@type": "ListItem", "position": 2, "name": "Glosario", "item": "https://metodomecf.com/glosario" },
        { "@type": "ListItem", "position": 3, "name": term.term, "item": `https://metodomecf.com/glosario/${term.slug}` }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-black">
      <SeoHead
        title={`${term.seoTitle} | Glosario MECF`}
        description={term.seoDesc}
        canonical={`/glosario/${term.slug}`}
        type="article"
        jsonLd={[faqSchema, articleSchema]}
      />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-primary/10 bg-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/">
            <span className="font-serif font-bold text-lg tracking-widest text-primary cursor-pointer hover:opacity-80 transition-opacity">MECF</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/glosario">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-primary transition-colors cursor-pointer">
                ← Glosario
              </span>
            </Link>
            <Link href="/protocolo">
              <span
                className="font-mono text-[10px] uppercase tracking-widest border px-4 py-2 transition-all cursor-pointer hover:border-primary/60 hover:text-primary"
                style={{ borderColor: "rgba(212,175,55,0.3)", color: "rgba(212,175,55,0.65)" }}
              >
                Ver módulos →
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── BREADCRUMB ── */}
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <nav className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/30">
          <Link href="/"><span className="hover:text-primary transition-colors cursor-pointer">Inicio</span></Link>
          <span>›</span>
          <Link href="/glosario"><span className="hover:text-primary transition-colors cursor-pointer">Glosario</span></Link>
          <span>›</span>
          <span style={{ color: "rgba(212,175,55,0.7)" }}>{term.term}</span>
        </nav>
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
        />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl" style={{ color: "#d4af37" }}>{term.icon}</span>
            <p
              className="font-mono text-[10px] tracking-[0.4em] uppercase"
              style={{ color: "rgba(212,175,55,0.6)" }}
            >
              Glosario MECF
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
            {term.seoTitle}
          </h1>
          <GoldRule />
          <p className="text-white/70 text-lg font-light leading-relaxed mt-5">
            {term.seoDesc}
          </p>
        </div>
      </section>

      {/* ── DEFINICIÓN SIMPLE ── */}
      <section className="py-10 border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="p-8 border-l-4"
            style={{ background: "rgba(212,175,55,0.05)", borderColor: "#d4af37" }}
          >
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: "#d4af37" }}>
              En palabras simples
            </p>
            <p className="text-white text-xl font-serif font-semibold leading-relaxed">
              {term.term} —{" "}
              <span className="font-light text-white/80">{term.simple}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── LA ANALOGÍA ── */}
      <section className="py-10 border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-serif font-bold mb-4">
            La <em className="italic" style={{ color: "#d4af37" }}>analogía</em> cotidiana
          </h2>
          <p className="text-white/75 font-light leading-relaxed text-[16px]">{term.analogy}</p>
        </div>
      </section>

      {/* ── EN EL MECF ── */}
      <section className="py-10 border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-serif font-bold mb-4">
            {term.term} en el <em className="italic" style={{ color: "#d4af37" }}>Método MECF</em>
          </h2>
          <p className="text-white/80 font-light leading-relaxed text-[16px]">{term.mecf}</p>
        </div>
      </section>

      {/* ── CONTENIDO EXPANDIDO ── */}
      <section className="py-10 border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          {term.expanded.map((block, i) => (
            <div key={i}>
              <h2 className="text-xl font-serif font-bold mb-3">{block.title}</h2>
              <p className="text-white/75 font-light leading-relaxed text-[15px]">{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-12 border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6"
            style={{ color: "rgba(212,175,55,0.6)" }}
          >
            Preguntas frecuentes
          </p>
          <h2 className="text-2xl font-serif font-bold mb-8">
            Lo que más preguntan sobre{" "}
            <em className="italic" style={{ color: "#d4af37" }}>{term.term}</em>
          </h2>
          <div className="space-y-6">
            {term.faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 border"
                style={{ borderColor: "rgba(212,175,55,0.15)", background: "rgba(212,175,55,0.02)" }}
              >
                <p className="font-serif font-semibold text-white mb-3">{faq.q}</p>
                <p className="text-white/70 font-light leading-relaxed text-[14px]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉRMINOS RELACIONADOS ── */}
      {related.length > 0 && (
        <section className="py-12 border-t border-primary/10">
          <div className="max-w-3xl mx-auto px-6">
            <p
              className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6"
              style={{ color: "rgba(212,175,55,0.6)" }}
            >
              Términos relacionados
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map(r => (
                <Link key={r.slug} href={`/glosario/${r.slug}`}>
                  <div
                    className="flex items-center gap-3 p-4 border cursor-pointer transition-all hover:border-primary/40 hover:bg-primary/5"
                    style={{ borderColor: "rgba(212,175,55,0.12)" }}
                  >
                    <span style={{ color: "#d4af37" }}>{r.icon}</span>
                    <div>
                      <p className="font-serif font-semibold text-white text-sm">{r.term}</p>
                      <p className="text-white/45 text-xs font-light">{r.simple}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PREV / NEXT ── */}
      <section className="py-8 border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between gap-4">
          {prevTerm ? (
            <Link href={`/glosario/${prevTerm.slug}`}>
              <div className="cursor-pointer group">
                <p className="font-mono text-[9px] tracking-widest uppercase text-white/30 mb-1">← Anterior</p>
                <p className="font-serif font-semibold text-white group-hover:text-primary transition-colors">
                  {prevTerm.term}
                </p>
              </div>
            </Link>
          ) : <div />}
          {nextTerm ? (
            <Link href={`/glosario/${nextTerm.slug}`}>
              <div className="cursor-pointer text-right group">
                <p className="font-mono text-[9px] tracking-widest uppercase text-white/30 mb-1">Siguiente →</p>
                <p className="font-serif font-semibold text-white group-hover:text-primary transition-colors">
                  {nextTerm.term}
                </p>
              </div>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 border-t border-primary/10 text-center">
        <div className="max-w-xl mx-auto px-6 space-y-5">
          <p
            className="font-mono text-[10px] tracking-[0.4em] uppercase"
            style={{ color: "rgba(212,175,55,0.6)" }}
          >
            — Ya entiendes el vocabulario —
          </p>
          <h2 className="text-3xl font-serif font-bold">
            Lee tu propio{" "}
            <em className="italic" style={{ color: "#d4af37" }}>Código MECF</em>
          </h2>
          <p className="text-white/55 font-light text-sm">
            Obtén el análisis completo de tu sistema: voltaje, firmware, árbol biográfico,<br />
            nodos y ciclos hasta 2032.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/protocolo">
              <span className="inline-block bg-primary text-black font-mono font-bold px-10 py-4 uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 cursor-pointer">
                Ver módulos →
              </span>
            </Link>
            <Link href="/glosario">
              <span className="inline-block border border-primary/40 text-primary/70 font-mono text-xs px-8 py-4 uppercase tracking-widest hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer">
                Ver todo el glosario
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TODO EL GLOSARIO ── */}
      <section className="py-12 border-t border-primary/10 bg-black/60">
        <div className="max-w-3xl mx-auto px-6">
          <p
            className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6 text-center"
            style={{ color: "rgba(212,175,55,0.4)" }}
          >
            Todos los términos MECF
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {allTerms.map(t => (
              <Link key={t.slug} href={`/glosario/${t.slug}`}>
                <span
                  className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 border cursor-pointer transition-all hover:border-primary/50 hover:text-primary"
                  style={{ borderColor: "rgba(212,175,55,0.15)", color: "rgba(212,175,55,0.5)" }}
                >
                  {t.term}
                </span>
              </Link>
            ))}
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
            <Link href="/glosario"><span className="text-xs font-mono text-white/35 hover:text-primary transition-colors cursor-pointer">Glosario</span></Link>
            <Link href="/quienes-somos"><span className="text-xs font-mono text-white/35 hover:text-primary transition-colors cursor-pointer">Quiénes somos</span></Link>
            <Link href="/contacto"><span className="text-xs font-mono text-white/35 hover:text-primary transition-colors cursor-pointer">Contacto</span></Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
