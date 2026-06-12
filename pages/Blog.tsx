import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import SeoHead from "@/components/SeoHead";
import { ARTICLES } from "@/data/blogData";

const CATEGORY_COLORS: Record<string, { text: string; border: string }> = {
  "Conceptos clave": { text: "#d4af37", border: "rgba(212,175,55,0.3)" },
  "Transgeneracional": { text: "#f59e0b", border: "rgba(245,158,11,0.3)" },
  "El método": { text: "#34d399", border: "rgba(52,211,153,0.3)" },
};

const DEFAULT_COLOR = { text: "rgba(255,255,255,0.4)", border: "rgba(255,255,255,0.1)" };

export default function Blog() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog — Método MECF",
    "url": "https://metodomecf.com/blog",
    "description": "Artículos sobre ciclos biográficos, nodos cronológicos, lealtades invisibles y el Método MECF por El Bachir Chekhad.",
    "publisher": {
      "@type": "Person",
      "name": "El Bachir Chekhad",
      "url": "https://metodomecf.com/quienes-somos"
    },
    "blogPost": ARTICLES.map((a) => ({
      "@type": "BlogPosting",
      "headline": a.title,
      "description": a.description,
      "datePublished": a.date,
      "url": `https://metodomecf.com/blog/${a.slug}`,
      "author": { "@type": "Person", "name": "El Bachir Chekhad" }
    }))
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <SeoHead
        title="Blog — Método MECF | Ciclos biográficos y códigos de destino"
        description="Artículos sobre nodos cronológicos, ciclos biográficos, lealtades invisibles y el Método MECF. Por El Bachir Chekhad — metodomecf.com"
        canonical="/blog"
        type="website"
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
        <div className="max-w-4xl mx-auto px-6">

          {/* Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white/30 mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-primary/70">Blog</span>
            </nav>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4">— Artículos —</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 title-glow">
              El blog del<br /><span className="text-primary italic">Método MECF</span>
            </h1>
            <p className="text-white/50 font-light max-w-xl leading-relaxed">
              Conceptos, herramientas y lecturas técnicas sobre ciclos biográficos, nodos cronológicos y el marco de la ingeniería álmica.
            </p>
          </motion.div>

          {/* Featured first article */}
          {ARTICLES.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-8"
            >
              <Link href={`/blog/${ARTICLES[0].slug}`} className="group block">
                <motion.article
                  className="relative border border-primary/20 bg-zinc-950 p-8 overflow-hidden"
                  whileHover={{ borderColor: "rgba(212,175,55,0.5)", y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)" }} />
                  <div className="absolute top-4 right-4 font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border"
                    style={{ color: "#d4af37", borderColor: "rgba(212,175,55,0.25)" }}>
                    DESTACADO
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    {(() => {
                      const c = CATEGORY_COLORS[ARTICLES[0].category] ?? DEFAULT_COLOR;
                      return (
                        <span className="font-mono text-[9px] tracking-widest uppercase border px-2 py-0.5"
                          style={{ color: c.text, borderColor: c.border }}>
                          {ARTICLES[0].category}
                        </span>
                      );
                    })()}
                    <span className="font-mono text-[9px] text-white/25 tracking-wider">
                      {ARTICLES[0].readTime} min lectura
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors duration-300 leading-snug mb-4">
                    {ARTICLES[0].title}
                  </h2>
                  <p className="text-white/50 font-light leading-relaxed mb-6 max-w-2xl">
                    {ARTICLES[0].description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-white/25">
                      {new Date(ARTICLES[0].date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-primary/60 group-hover:text-primary transition-colors">
                      Leer artículo →
                    </span>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          )}

          {/* Rest of articles */}
          <div className="grid md:grid-cols-2 gap-5">
            {ARTICLES.slice(1).map((article, i) => {
              const color = CATEGORY_COLORS[article.category] ?? DEFAULT_COLOR;
              return (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={`/blog/${article.slug}`} className="group block h-full">
                    <motion.article
                      className="relative border border-primary/15 bg-zinc-950 p-6 h-full flex flex-col gap-4 overflow-hidden"
                      whileHover={{ borderColor: "rgba(212,175,55,0.4)", y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
                        style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.2), transparent)", opacity: 0 }} />

                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="font-mono text-[9px] tracking-widest uppercase border px-2 py-0.5"
                          style={{ color: color.text, borderColor: color.border }}
                        >
                          {article.category}
                        </span>
                        <span className="font-mono text-[9px] text-white/25 tracking-wider">
                          {article.readTime} min
                        </span>
                      </div>

                      <div className="flex-1">
                        <h2 className="font-serif text-lg font-bold text-white group-hover:text-primary transition-colors duration-300 leading-snug mb-3">
                          {article.title}
                        </h2>
                        <p className="text-white/50 text-sm font-light leading-relaxed">
                          {article.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-primary/10">
                        <span className="font-mono text-[9px] tracking-widest uppercase text-white/25">
                          {new Date(article.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                        <span className="font-mono text-[9px] tracking-widest uppercase text-primary/60 group-hover:text-primary transition-colors">
                          Leer →
                        </span>
                      </div>
                    </motion.article>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA bottom */}
          <motion.div
            className="mt-16 text-center border border-primary/15 p-10 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ background: "rgba(212,175,55,0.03)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px]"
              style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.35), transparent)" }} />
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/50 mb-4">— Más allá del blog —</p>
            <h3 className="font-serif text-2xl font-bold mb-3">¿Listo para ver tu propio código?</h3>
            <p className="text-white/50 text-sm font-light mb-6 max-w-md mx-auto">
              Los artículos explican el marco. El informe MECF te da tu análisis personal — fechas, nodos y patrones concretos.
            </p>
            <Link href="/protocolo">
              <motion.span
                className="inline-block bg-primary text-black font-mono font-bold px-8 py-4 uppercase tracking-widest text-sm cursor-pointer"
                whileHover={{ scale: 1.04, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                Obtener mi informe — desde 24,99€
              </motion.span>
            </Link>
          </motion.div>

        </div>
      </main>

      <footer className="border-t border-primary/10 py-10 bg-black">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-white/20">© 2025 Método MECF — El Bachir Chekhad</span>
          <div className="flex gap-6">
            <Link href="/protocolo" className="font-mono text-[10px] tracking-widest uppercase text-white/30 hover:text-primary transition-colors">Obtener informe</Link>
            <Link href="/glosario" className="font-mono text-[10px] tracking-widest uppercase text-white/30 hover:text-primary transition-colors">Glosario</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
