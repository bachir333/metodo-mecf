import { motion } from "framer-motion";
import { Link } from "wouter";

const TESTIMONIALS = [
  {
    name: "Laura M.",
    location: "Barcelona",
    module: "Socios & Parejas",
    code: "9",
    antes: "Llevaba 4 años peleando con mi pareja en los mismos puntos. Pensábamos que éramos incompatibles.",
    despues: "Ahora tenemos un mapa, no una pelea. El MECF nos dio un lenguaje que sustituye el conflicto.",
  },
  {
    name: "Andrés R.",
    location: "Buenos Aires",
    module: "Individual",
    code: "3",
    antes: "Era escéptico. Lo compré por curiosidad, sin ninguna expectativa real de que me aportara algo.",
    despues: "Mi ciclo 2026 es exactamente lo que estoy viviendo. Escalofriante de preciso. Lo leí tres veces.",
  },
  {
    name: "Marta G.",
    location: "Madrid",
    module: "Árbol Genealógico",
    code: "6",
    antes: "Años buscando por qué repito los mismos patrones en mis relaciones. Terapia, libros, nada llegaba al fondo.",
    despues: "El MECF lo decodificó en 20 páginas. Vi de dónde viene el patrón, quién lo instaló y cuándo.",
  },
  {
    name: "Carlos V.",
    location: "México DF",
    module: "Árbol Genealógico",
    code: "1",
    antes: "Sabía que había algo heredado pero no podía verlo. Era una intuición sin mapa.",
    despues: "El análisis del linaje materno fue brutal. Patrones que mi madre tiene, su madre tuvo, y yo reproducía sin saberlo.",
  },
  {
    name: "Sofía T.",
    location: "Valencia",
    module: "Individual",
    code: "8",
    antes: "Gastaba en cursos de desarrollo personal sin resultado duradero. Empezaba y volvía al mismo punto.",
    despues: "En 24,99€ me di más cuenta de mí misma que en meses de trabajo. No sustituye nada — pero va a la raíz.",
  },
  {
    name: "Javier P.",
    location: "Bilbao",
    module: "Individual",
    code: "4",
    antes: "Nunca había confiado en este tipo de análisis. Me parecía demasiado cercano al misticismo.",
    despues: "La claridad técnica del MECF es lo que lo diferencia. Rigor total, sin misticismo vacío. Eso me convenció.",
  },
];

function GoldRule() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="h-px flex-1" style={{ background: "linear-gradient(to right, #d4af37, transparent)" }} />
      <span style={{ color: "#d4af37", fontSize: 8 }}>◆</span>
      <div className="h-px flex-1" style={{ background: "linear-gradient(to left, #d4af37, transparent)" }} />
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 border-t border-primary/10 bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(212,175,55,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4">— Antes y después —</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            Lo que cambia cuando <span className="text-primary italic">lees tu código</span>
          </h2>
          <GoldRule />
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase mt-5" style={{ color: "rgba(212,175,55,0.5)" }}>
            Más de 1.000 informes entregados · 3 continentes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex flex-col relative overflow-hidden group"
              style={{ border: "1px solid rgba(212,175,55,0.14)", background: "#080808" }}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.35), transparent)" }} />

              <div className="p-6 flex flex-col gap-4 flex-1">
                {/* ANTES */}
                <div>
                  <span className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2 block"
                    style={{ color: "rgba(255,255,255,0.25)" }}>
                    ANTES
                  </span>
                  <p className="text-white/45 text-sm font-light leading-relaxed italic">
                    "{t.antes}"
                  </p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1" style={{ background: "rgba(212,175,55,0.2)" }} />
                  <span className="font-mono text-[8px] tracking-widest uppercase"
                    style={{ color: "rgba(212,175,55,0.5)" }}>MECF</span>
                  <div className="h-px flex-1" style={{ background: "rgba(212,175,55,0.2)" }} />
                </div>

                {/* DESPUÉS */}
                <div className="flex-1">
                  <span className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2 block"
                    style={{ color: "#d4af37" }}>
                    DESPUÉS
                  </span>
                  <p className="text-white/88 text-sm font-light leading-relaxed">
                    "{t.despues}"
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3"
                  style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 flex items-center justify-center font-mono font-bold text-sm"
                      style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#d4af37" }}>
                      {t.code}
                    </div>
                    <div>
                      <p className="font-mono text-[10px] font-bold text-white">{t.name}</p>
                      <p className="font-mono text-[8px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>{t.location}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[8px] tracking-widest uppercase border px-2 py-0.5"
                    style={{ color: "rgba(212,175,55,0.55)", borderColor: "rgba(212,175,55,0.2)" }}>
                    {t.module}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA bottom */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/protocolo">
            <motion.span
              className="inline-block font-mono font-bold text-xs uppercase tracking-widest px-10 py-4 text-black cursor-pointer"
              style={{ background: "#d4af37" }}
              whileHover={{ scale: 1.04, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              Obtener mi informe MECF →
            </motion.span>
          </Link>
          <p className="font-mono text-[9px] tracking-widest uppercase mt-4" style={{ color: "rgba(212,175,55,0.35)" }}>
            Descarga inmediata · Pago único · Sin suscripción
          </p>
        </motion.div>
      </div>
    </section>
  );
}
