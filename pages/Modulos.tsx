import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import SeoHead from "@/components/SeoHead";

const MODS = [
  {
    color: "#fcd34d",
    badge: "MÁS POPULAR",
    num: "01",
    price: "24,99€",
    title: "MECF INDIVIDUAL",
    tagline: "Tu código personal decodificado",
    features: [
      "Informe PDF personalizado",
      "Tus 5 nodos cronológicos de expansión 2026–2032",
      "Identificación de tu código de origen",
      "Patrones de sabotaje recurrente",
      "Ventanas de intervención activas",
      "Descarga inmediata",
    ],
    cta: "ACTIVAR PROTOCOLO INDIVIDUAL",
  },
  {
    color: "#c9a84c",
    badge: "MÁS COMPLETO",
    num: "02",
    price: "49,99€",
    title: "ÁRBOL GENEALÓGICO",
    tagline: "Tu linaje como sistema de datos",
    features: [
      "Informe PDF transgeneracional",
      "Análisis de 3 generaciones",
      "Lealtades invisibles identificadas",
      "Memorias repetitivas del sistema familiar",
      "Programas heredados que operan hoy en ti",
      "Descarga inmediata",
    ],
    cta: "ACTIVAR PROTOCOLO LINAJE",
  },
  {
    color: "#a38728",
    badge: "SINASTRÍA",
    num: "03",
    price: "34,99€",
    title: "SOCIOS & PAREJAS",
    tagline: "Ingeniería relacional de precisión",
    features: [
      "Informe PDF de sinastría algorítmica",
      "Análisis de dos operadores",
      "Índice de coherencia algorítmica",
      "Vectores de expansión compartidos",
      "Diagnóstico de compatibilidad estructural",
      "Descarga inmediata",
    ],
    cta: "ACTIVAR PROTOCOLO RELACIONAL",
  },
];

function GoldRule() {
  return (
    <div className="flex items-center gap-4 justify-center my-2">
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/60" />
      <div className="w-1.5 h-1.5 rotate-45 bg-primary" />
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/60" />
    </div>
  );
}

export default function Modulos() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <SeoHead
        title="Módulos MECF — Precios y acceso al análisis | Método MECF"
        description="Todos los módulos del Método MECF con precios: Individual (24,99€), Árbol Genealógico (49,99€), Socios & Parejas. Informe PDF en minutos."
        canonical="/modulos"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "OfferCatalog",
          "name": "Módulos Método MECF",
          "url": "https://metodomecf.com/modulos",
          "itemListElement": [
            { "@type": "Offer", "name": "MECF Individual", "price": "24.99", "priceCurrency": "EUR" },
            { "@type": "Offer", "name": "Árbol Genealógico", "price": "49.99", "priceCurrency": "EUR" },
            { "@type": "Offer", "name": "Socios & Parejas", "price": "49.99", "priceCurrency": "EUR" }
          ]
        }}
      />

      {/* NAV */}
      <header className="fixed top-0 w-full border-b border-white/5 bg-background/90 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-lg tracking-widest text-primary">MECF</Link>
          <Link href="/" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
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
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4">— Elige tu protocolo —</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            LO QUE <span className="text-primary">RECIBES</span>
          </h1>
          <GoldRule />
          <p className="text-muted-foreground font-light mt-6 max-w-xl mx-auto">
            Tres módulos. Descarga inmediata. Sin suscripciones, sin contratos.<br />
            Un informe PDF personalizado basado en tus fechas y datos.
          </p>
        </div>
      </section>

      {/* MÓDULOS */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {MODS.map((mod, idx) => (
              <motion.div
                key={mod.num}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: idx * 0.13, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                className="flex flex-col relative overflow-hidden group"
                style={{
                  border: `1px solid ${mod.color}28`,
                  borderLeft: `3px solid ${mod.color}`,
                  background: `linear-gradient(145deg, ${mod.color}0a 0%, #080808 55%)`,
                }}
              >
                {/* shimmer top bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(to right, transparent, ${mod.color}, transparent)` }}
                  animate={{ backgroundPosition: ["200% center", "-200% center"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: idx * 1.1 }}
                />

                {/* hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 100% 70% at 10% 0%, ${mod.color}0e 0%, transparent 65%)` }}
                />

                {/* pulsing bg number */}
                <motion.div
                  className="absolute bottom-4 right-4 font-mono font-bold select-none pointer-events-none"
                  style={{ fontSize: 88, lineHeight: 1, color: `${mod.color}09` }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 1.3 }}
                >
                  {mod.num}
                </motion.div>

                <div className="p-8 flex flex-col flex-1 gap-6 relative z-10">
                  <div className="flex items-start justify-between">
                    <motion.span
                      className="font-mono text-[9px] tracking-[0.3em] uppercase px-2 py-1 border"
                      style={{ color: mod.color, borderColor: `${mod.color}40` }}
                      animate={{ borderColor: [`${mod.color}28`, `${mod.color}70`, `${mod.color}28`] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.8 }}
                    >
                      {mod.badge}
                    </motion.span>
                  </div>

                  <div>
                    <motion.div
                      className="font-mono text-3xl font-bold mb-1"
                      style={{ color: mod.color }}
                      animate={{ opacity: [0.85, 1, 0.85] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                    >
                      {mod.price}
                    </motion.div>
                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: `${mod.color}bb` }}>pago único · sin suscripción</div>
                  </div>

                  <div>
                    <h2 className="font-serif font-bold text-xl text-white mb-1">{mod.title}</h2>
                    <p className="font-light text-sm" style={{ color: `${mod.color}80` }}>{mod.tagline}</p>
                  </div>

                  <div className="h-px" style={{ background: `linear-gradient(to right, ${mod.color}30, transparent)` }} />

                  <ul className="space-y-3 flex-1">
                    {mod.features.map((f, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-sm"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: idx * 0.13 + i * 0.06 + 0.3 }}
                      >
                        <span className="shrink-0 mt-0.5" style={{ color: mod.color }}>→</span>
                        <span
                          className={i === mod.features.length - 1
                            ? "font-mono font-bold text-xs tracking-widest uppercase"
                            : "text-amber-100/80 font-light"
                          }
                          style={i === mod.features.length - 1 ? { color: mod.color } : {}}
                        >
                          {f}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <Link href="/protocolo">
                    <motion.div
                      className="mt-2 font-mono font-bold text-xs uppercase tracking-widest px-6 py-4 text-center text-black cursor-pointer"
                      style={{ background: mod.color }}
                      whileHover={{ scale: 1.03, filter: "brightness(1.12)" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                    >
                      {mod.cta}
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="font-mono text-xs text-primary/45 tracking-widest">
              Acceso instantáneo tras el pago · Formato PDF · Compatible con todos los dispositivos
            </p>
          </div>
        </div>
      </section>

      {/* GARANTÍAS */}
      <section className="py-12 border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { t: "Pago seguro", d: "Procesado por Stripe con encriptación TLS" },
              { t: "Descarga inmediata", d: "Acceso al PDF en menos de 60 segundos" },
              { t: "Sin suscripciones", d: "Pago único. Tuyo para siempre" },
            ].map(g => (
              <div key={g.t} className="space-y-2">
                <p className="font-mono text-[10px] tracking-widest uppercase text-primary">{g.t}</p>
                <p className="text-xs text-muted-foreground font-light">{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
