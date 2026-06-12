import { useEffect } from "react";
import { Link, useParams } from "wouter";
import SeoHead from "@/components/SeoHead";
import { getArticleBySlug, getRelatedArticles, ARTICLES } from "@/data/blogData";

export default function BlogDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug ?? "");

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <SeoHead title="Artículo no encontrado — Método MECF" description="Este artículo no existe." noindex />
        <div className="text-center">
          <p className="font-mono text-primary/60 text-sm mb-4">Artículo no encontrado</p>
          <Link href="/blog" className="font-mono text-xs text-white/40 hover:text-primary transition-colors">← Volver al blog</Link>
        </div>
      </div>
    );
  }

  const related = getRelatedArticles(article.relatedSlugs);
  const currentIndex = ARTICLES.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? ARTICLES[currentIndex - 1] : null;
  const next = currentIndex < ARTICLES.length - 1 ? ARTICLES[currentIndex + 1] : null;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.description,
      "datePublished": article.date,
      "author": { "@type": "Person", "name": "El Bachir Chekhad", "url": "https://metodomecf.com/quienes-somos" },
      "publisher": { "@type": "Person", "name": "El Bachir Chekhad" },
      "url": `https://metodomecf.com/blog/${article.slug}`,
      "image": "https://metodomecf.com/opengraph.jpg",
      "mainEntityOfPage": { "@type": "WebPage", "@id": `https://metodomecf.com/blog/${article.slug}` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://metodomecf.com" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://metodomecf.com/blog" },
        { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://metodomecf.com/blog/${article.slug}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <SeoHead
        title={`${article.title} | Blog Método MECF`}
        description={article.description}
        canonical={`/blog/${article.slug}`}
        type="article"
        jsonLd={jsonLd}
      />

      <header className="fixed top-0 w-full border-b border-white/5 bg-background/90 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-bold tracking-[0.2em] text-white hover:text-primary transition-colors">
            MECF
          </Link>
          <Link
            href="/protocolo"
            className="font-mono text-[10px] tracking-[0.2em] uppercase bg-primary text-black px-5 py-2 font-bold hover:bg-primary/90 transition-colors"
          >
            Obtener acceso
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-6">
          <nav className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white/30 mb-10">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-primary/70 truncate max-w-[160px]">{article.title}</span>
          </nav>

          <header className="mb-12">
            <span className="font-mono text-[9px] tracking-widest uppercase border border-primary/30 text-primary/70 px-2 py-0.5 mb-5 inline-block">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-5 title-glow">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-white/30 font-mono text-[10px] tracking-wider">
              <span>El Bachir Chekhad</span>
              <span>·</span>
              <span>{new Date(article.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span>·</span>
              <span>{article.readTime} min de lectura</span>
            </div>
          </header>

          <div className="prose-mecf space-y-10">
            <p className="text-white/70 text-base leading-relaxed font-light border-l-2 border-primary/40 pl-5 italic">
              {article.intro}
            </p>

            {article.sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-xl font-serif font-bold text-white mb-4">{section.heading}</h2>
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j} className="text-white/65 leading-relaxed font-light mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
              </section>
            ))}

            <div className="border border-primary/20 bg-primary/5 p-6 mt-10">
              <p className="text-white/70 text-sm leading-relaxed font-light">
                {article.conclusion}
              </p>
              <Link
                href="/protocolo"
                className="mt-5 inline-block font-mono text-[10px] tracking-[0.2em] uppercase bg-primary text-black px-6 py-3 font-bold hover:bg-primary/90 transition-colors"
              >
                Obtener mi informe →
              </Link>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="max-w-2xl mx-auto px-6 mt-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-primary/10" />
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-primary/40">Artículos relacionados</span>
              <div className="h-px flex-1 bg-primary/10" />
            </div>
            <div className="grid gap-4">
              {related.map((rel) => (
                <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group block border border-primary/10 bg-zinc-950 p-5 hover:border-primary/30 transition-colors">
                  <p className="font-mono text-[9px] tracking-widest uppercase text-primary/40 mb-2">{rel.category}</p>
                  <h3 className="font-serif font-bold text-white group-hover:text-primary transition-colors">{rel.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-2xl mx-auto px-6 mt-16 flex items-center justify-between gap-4 pt-8 border-t border-primary/10">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="group flex-1">
              <p className="font-mono text-[9px] tracking-widest uppercase text-white/25 mb-1">← Anterior</p>
              <p className="font-serif text-sm text-white/60 group-hover:text-primary transition-colors leading-snug">{prev.title}</p>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link href={`/blog/${next.slug}`} className="group flex-1 text-right">
              <p className="font-mono text-[9px] tracking-widest uppercase text-white/25 mb-1">Siguiente →</p>
              <p className="font-serif text-sm text-white/60 group-hover:text-primary transition-colors leading-snug">{next.title}</p>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </main>

      <footer className="border-t border-primary/10 py-10 bg-black">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-white/20">© 2025 Método MECF — El Bachir Chekhad</span>
          <div className="flex gap-6">
            <Link href="/protocolo" className="font-mono text-[10px] tracking-widest uppercase text-white/30 hover:text-primary transition-colors">Obtener informe</Link>
            <Link href="/blog" className="font-mono text-[10px] tracking-widest uppercase text-white/30 hover:text-primary transition-colors">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
