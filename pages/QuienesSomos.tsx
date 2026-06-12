import { Link } from "wouter";
import { motion } from "framer-motion";
import authorImg from "@assets/bachir_1780591162178.jpg";
import SeoHead from "@/components/SeoHead";

const VALUES = [
  {
    icon: "◈",
    title: "Observación técnica",
    desc: "El MECF no es un sistema de creencias. Es un modelo de análisis que separa al observador del sistema para verlo con claridad.",
  },
  {
    icon: "⬡",
    title: "Geometría de base",
    desc: "Voltaje 3·6·9, secuencia Fibonacci, hardware biológico. La realidad tiene estructura; nosotros la enseñamos a leer.",
  },
  {
    icon: "◆",
    title: "Intervención real",
    desc: "Sin motivación vacía. Cada módulo apunta a una ventana de actuación concreta dentro de tu sistema.",
  },
];

const STATS = [
  { value: "41K+", label: "Personas en la comunidad" },
  { value: "5", label: "Módulos de análisis" },
  { value: "3", label: "Idiomas disponibles" },
  { value: "2019", label: "Año de fundación" },
];

const TIMELINE = [
  { year: "2012", text: "Bachir comienza su investigación personal sobre ciclos biográficos y la física de Tesla." },
  { year: "2016", text: "Primeras aplicaciones del protocolo MECF en sesiones privadas con resultados reproducibles." },
  { year: "2019", text: "Publicación de El Código Maestro del Destino con Letrame Grupo Editorial. Lanzamiento oficial." },
  { year: "2022", text: "La comunidad supera las 20.000 personas. Se añaden inglés y francés al sistema." },
  { year: "2025", text: "Más de 41.000 personas en la comunidad. Más de 1.000 informes PDF entregados." },
];

function GoldRule() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px flex-1" style={{ background: "linear-gradient(to right, #d4af37, transparent)" }} />
      <span style={{ color: "#d4af37", fontSize: 10 }}>◆</span>
      <div className="h-px flex-1" style={{ background: "linear-gradient(to left, #d4af37, transparent)" }} />
    </div>
  );
}

export default function QuienesSomos() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-black">
      <SeoHead
        title="Quiénes somos — El Bachir Chekhad y el Método MECF"
        description="El Bachir Chekhad es el creador del Método MECF, un sistema de análisis técnico de ciclos biográficos con más de 41.000 personas en la comunidad desde 2019."
        canonical="/quienes-somos"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "El Bachir Chekhad",
          "jobTitle": "Creador del Método MECF",
          "url": "https://metodomecf.com/quienes-somos",
          "worksFor": { "@type": "Organization", "name": "Método MECF" },
          "sameAs": ["https://www.instagram.com/mecfmetodo/"]
        }}
      />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-primary/10 bg-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <span className="font-serif font-bold text-lg tracking-widest text-primary cursor-pointer hover:opacity-80 transition-opacity">MECF</span>
          </Link>
          <Link href="/contacto">
            <span className="font-mono text-xs uppercase tracking-widest border border-primary/40 px-4 py-2 text-primary hover:bg-primary hover:text-black transition-all cursor-pointer">
              Contáctanos →
            </span>
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 70%)" }} />
        <motion.div
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-5" style={{ color: "rgba(212,175,55,0.65)" }}>
            — El equipo detrás del método —
          </p>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Quiénes <em className="italic" style={{ color: "#d4af37" }}>somos</em>
          </h1>
          <GoldRule />
          <p className="text-white/80 text-lg font-light leading-relaxed max-w-2xl mx-auto mt-6">
            Somos el equipo detrás del Método MECF — un sistema de análisis biográfico que nació de la
            intersección entre la física de Tesla, la geometría de Fibonacci y el comportamiento humano.
          </p>
        </motion.div>
      </section>

      {/* ── EL BACHIR ── */}
      <section className="py-20 border-t border-primary/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute inset-0 blur-[80px] rounded-full"
                style={{ background: "rgba(212,175,55,0.12)" }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <img
                src={authorImg}
                alt="El Bachir Chekhad"
                className="relative z-10 w-72 md:w-96 border shadow-2xl"
                style={{ borderColor: "rgba(212,175,55,0.2)", boxShadow: "0 0 60px rgba(212,175,55,0.12)" }}
              />
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "rgba(212,175,55,0.65)" }}>
                  — El Fundador —
                </p>
                <h2 className="text-4xl font-serif font-bold mb-1">
                  El Bachir <span style={{ color: "#d4af37" }}>Chekhad</span>
                </h2>
                <GoldRule />
              </div>

              <blockquote className="text-xl font-serif italic border-l-2 pl-5 py-1 text-amber-50/85" style={{ borderColor: "#d4af37" }}>
                "No soy un motivador. Soy un operador técnico."
              </blockquote>

              <p className="text-white/78 font-light leading-relaxed">
                Bachir ha pasado más de una década descifrando la intersección entre el voltaje de Tesla (3·6·9),
                la geometría de Fibonacci y el hardware biológico humano. Lo que comenzó como una investigación
                personal se convirtió en el Método MECF — un sistema reproducible de análisis y actualización
                que hoy usa gente en tres continentes.
              </p>

              <p className="text-white/78 font-light leading-relaxed">
                Su enfoque es técnico, no espiritual. No habla de almas ni de destinos. Habla de sistemas,
                frecuencias y ventanas de intervención. Eso es lo que lo distingue.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="text-center px-3 py-4 border"
                    style={{ background: "rgba(212,175,55,0.04)", borderColor: "rgba(212,175,55,0.18)" }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ borderColor: "rgba(212,175,55,0.45)", y: -2 }}
                  >
                    <div className="font-mono text-primary text-xl font-bold">{s.value}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/45 mt-1">{s.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { label: "YouTube", url: "https://www.youtube.com/@misterioyconciencia8625" },
                  { label: "Facebook", url: "https://www.facebook.com/PscicologiaUniversal?locale=es_ES" },
                  { label: "Instagram", url: "https://www.instagram.com/mecfmetodo/" },
                ].map(s => (
                  <motion.a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-widest px-4 py-2 border transition-colors"
                    style={{ borderColor: "rgba(212,175,55,0.25)", color: "rgba(212,175,55,0.65)" }}
                    whileHover={{ borderColor: "rgba(212,175,55,0.65)", color: "#d4af37", y: -1 }}
                  >
                    {s.label} →
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-20 border-t border-primary/10" style={{ background: "#050505" }}>
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "rgba(212,175,55,0.65)" }}>
              — El origen —
            </p>
            <h2 className="text-3xl font-serif font-bold mb-2">
              Cómo nació el <span style={{ color: "#d4af37" }}>Método MECF</span>
            </h2>
            <GoldRule />
          </motion.div>

          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px" style={{ background: "rgba(212,175,55,0.15)" }} />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="flex gap-6 items-start"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="shrink-0 w-[72px] text-right">
                    <span className="font-mono text-sm font-bold" style={{ color: "#d4af37" }}>{item.year}</span>
                  </div>
                  <div className="relative">
                    <motion.div
                      className="absolute -left-[25px] top-1.5 w-3 h-3 border rotate-45"
                      style={{ borderColor: "rgba(212,175,55,0.5)", background: "#050505" }}
                      whileInView={{ borderColor: "#d4af37" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                    />
                    <p className="text-white/70 text-sm font-light leading-relaxed pt-0.5">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL ── */}
      <section className="py-20 border-t border-primary/10" style={{ background: "#080808" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: "rgba(212,175,55,0.65)" }}>
                  — El sello —
                </p>
                <h2 className="text-3xl font-serif font-bold mb-1">
                  Letrame <span style={{ color: "#d4af37" }}>Grupo Editorial</span>
                </h2>
                <GoldRule />
              </div>
              <p className="text-white/78 font-light leading-relaxed">
                El Método MECF está publicado bajo el sello <strong className="text-white font-medium">Letrame Grupo Editorial</strong>,
                una de las principales editoriales independientes en lengua española. La colaboración garantiza
                los estándares de calidad editorial y distribución internacional que el método merece.
              </p>
              <p className="text-white/78 font-light leading-relaxed">
                Cada informe MECF es un documento técnico de alta precisión — estructurado, verificado y
                diseñado para ser una herramienta de trabajo real, no un souvenir.
              </p>
              <motion.a
                href="https://www.letrame.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-[10px] uppercase tracking-widest border px-5 py-2.5 transition-colors"
                style={{ borderColor: "rgba(212,175,55,0.3)", color: "rgba(212,175,55,0.7)" }}
                whileHover={{ borderColor: "rgba(212,175,55,0.7)", color: "#d4af37" }}
              >
                letrame.com →
              </motion.a>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  className="flex gap-4 p-5 border transition-all"
                  style={{ background: "rgba(212,175,55,0.04)", borderColor: "rgba(212,175,55,0.14)" }}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ borderColor: "rgba(212,175,55,0.35)", x: 4 }}
                >
                  <span className="text-xl shrink-0 mt-0.5" style={{ color: "#d4af37" }}>{v.icon}</span>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "#d4af37" }}>
                      {v.title}
                    </p>
                    <p className="text-white/72 text-sm font-light leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-primary/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 70%)" }} />
        <motion.div
          className="max-w-2xl mx-auto px-6 relative z-10 space-y-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: "rgba(212,175,55,0.6)" }}>
            — Siguiente paso —
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            ¿Listo para leer tu<br />
            <em className="italic" style={{ color: "#d4af37" }}>código maestro</em>?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/protocolo">
              <motion.span
                className="inline-block bg-primary text-black font-mono font-bold px-10 py-4 uppercase tracking-widest text-sm cursor-pointer"
                whileHover={{ scale: 1.04, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.97 }}
              >
                Ver módulos — desde 24,99€
              </motion.span>
            </Link>
            <Link href="/contacto">
              <span className="inline-block border border-primary/50 text-primary font-mono text-sm px-8 py-4 uppercase tracking-widest hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                Contáctanos
              </span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-6 border-t border-primary/10 bg-black">
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
