import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import SeoHead from "@/components/SeoHead";

const TESTIMONIALS_BY_ARCHETYPE = {
  cortocircuito: [
    {
      name: "Sofía T.",
      location: "Valencia",
      antes: "Gastaba en cursos de desarrollo personal sin resultado duradero. Empezaba y volvía exactamente al mismo punto.",
      despues: "En 24,99€ me di más cuenta de mí misma que en meses de trabajo. No sustituye nada — pero va directo a la raíz del cortocircuito.",
    },
    {
      name: "Andrés R.",
      location: "Buenos Aires",
      antes: "Era escéptico. Lo compré por curiosidad, sin ninguna expectativa real. Pensé que era otro sistema de autoayuda.",
      despues: "Mi ciclo 2026 es exactamente lo que estoy viviendo. Escalofriante de preciso. Lo leí tres veces.",
    },
  ],
  "vasija-rota": [
    {
      name: "Marta G.",
      location: "Madrid",
      antes: "Años buscando por qué repito los mismos patrones. Terapia, libros, retiros. Nada llegaba al fondo real.",
      despues: "El MECF lo decodificó en 20 páginas. Vi de dónde viene el patrón, quién lo instaló y en qué generación.",
    },
    {
      name: "Carlos V.",
      location: "México DF",
      antes: "Sabía que había algo heredado pero no podía verlo con claridad. Era una intuición sin mapa ni nombre.",
      despues: "El análisis del linaje materno fue brutal. Patrones que mi madre tiene, su madre tuvo, y yo reproducía sin saberlo.",
    },
  ],
  amnesia: [
    {
      name: "Javier P.",
      location: "Bilbao",
      antes: "Nunca había confiado en este tipo de análisis. Me parecía demasiado cercano al misticismo y la especulación.",
      despues: "La claridad técnica del MECF es lo que lo diferencia. Rigor total, sin misticismo vacío. Por fin un mapa real.",
    },
    {
      name: "Isabel C.",
      location: "Sevilla",
      antes: "Vivía haciendo lo que se esperaba de mí. Carrera, pareja, casa. Todo correcto y todo vacío por dentro.",
      despues: "El MECF me devolvió mi propio código. Dejé de vivir el guión de otro. Es la primera vez que me siento orientada.",
    },
  ],
};

const ARCHETYPES = {
  cortocircuito: {
    archetype: "ARQUITECTO EN CORTOCIRCUITO",
    code: "ACS-01",
    color: "#fcd34d",
    estado:
      "Tienes el voltaje activo — energía del Padre, Sol, frecuencia 8 — pero tu cableado está dañado. Emites mucha energía pero no se materializa porque existe una interferencia de frecuencia en la ejecución. El potencial es real; el canal no está limpio.",
    sintoma:
      "El «calor» de la ambición se convierte en inflamación, estrés o colapso justo antes del logro.",
    capitulos: [
      "Capítulo 5 · El Procesador Mental",
      "Capítulo 9 · La Empresa como Clan",
      "Capítulo 11 · El Protocolo de Commit",
    ],
    foco: "Permiso de Conquista · Integración de la Sombra · Canalización del voltaje sin quemar el sistema.",
    modulo: "MÓDULO INDIVIDUAL",
    moduloKey: "INDIVIDUAL",
    moduloPrice: "24,99€",
    moduloDesc:
      "Identifica el nodo exacto donde se instaló el cortocircuito y las ventanas 2026–2032 para romperlo.",
    seo: {
      title: "Arquitecto en Cortocircuito — Resultado Diagnóstico MECF",
      description:
        "Tu sistema biográfico tiene voltaje activo pero el canal está dañado. Descubre qué instala el cortocircuito justo antes del logro y cómo resolverlo con el Método MECF.",
      ogDesc:
        "¿Por qué colapso justo antes de lograr algo? Tu diagnóstico MECF lo revela — y tiene solución.",
    },
    faqItems: [
      {
        q: "¿Qué significa ser un Arquitecto en Cortocircuito?",
        a: "Es un perfil biográfico donde el voltaje (energía, ambición, capacidad) existe pero el canal de ejecución tiene una interferencia. El sistema genera energía pero no puede materializarla sin quemarse antes del logro.",
      },
      {
        q: "¿Por qué me quemo antes de terminar algo importante?",
        a: "Según el Método MECF, el colapso antes del logro responde a un nodo de interferencia instalado en la frecuencia 8. No es falta de capacidad — es una interferencia específica que el Módulo Individual está diseñado para identificar y resolver.",
      },
      {
        q: "¿El bloqueo antes del éxito tiene solución?",
        a: "Sí. El Módulo Individual MECF identifica el nodo exacto donde se instaló el cortocircuito biográfico y calcula las ventanas 2026–2032 para resolverlo.",
      },
    ],
  },
  "vasija-rota": {
    archetype: "ARQUITECTO CON VASIJA ROTA",
    code: "AVR-02",
    color: "#c9a84c",
    estado:
      "Tienes capacidad de atracción, pero tu «madre interna» — Prosperidad, Recepción, frecuencia 6 — está herida. No puedes sostener ni disfrutar lo que construyes porque el sistema anticipa que te lo cobrarán después. Guardas para el clan lo que debería ser tuyo.",
    sintoma:
      "Retención y pesadez. El cuerpo acumula lo que el alma no sabe cómo recibir sin culpa.",
    capitulos: [
      "Capítulo 3 · Auditoría de Frecuencia",
      "Capítulo 6 · El Nivel 6 — El Hardware Físico",
      "Capítulo 7 · Polaridades en el Código",
      "Capítulo 8 · El Sabotaje del Sistema",
    ],
    foco: "Descodificación biológica de programas heredados · Liberación de la «Farmacocracia» emocional.",
    modulo: "MÓDULO ÁRBOL GENEALÓGICO",
    moduloKey: "ÁRBOL",
    moduloPrice: "49,99€",
    moduloDesc:
      "Mapea las lealtades invisibles del linaje y las memorias relacionales que impiden sostener lo construido.",
    seo: {
      title: "Arquitecto con Vasija Rota — Resultado Diagnóstico MECF",
      description:
        "Construyes pero no puedes sostener ni disfrutar lo que logras. El patrón viene del linaje. El Módulo Árbol Genealógico MECF libera esta programación heredada.",
      ogDesc:
        "Construyo pero no puedo sostenerlo. Mi diagnóstico MECF revela de dónde viene este patrón — y cómo liberarlo.",
    },
    faqItems: [
      {
        q: "¿Qué significa tener una Vasija Rota biográfica?",
        a: "Es un perfil donde la capacidad de construir existe pero el sistema no puede sostener ni disfrutar lo logrado. La frecuencia 6 está herida por programas heredados del linaje que generan culpa al recibir.",
      },
      {
        q: "¿Por qué no puedo disfrutar ni sostener lo que construyo?",
        a: "Según el Método MECF, esta dificultad responde a lealtades invisibles con el clan familiar. El sistema biográfico anticipa inconscientemente que recibir tiene un coste posterior.",
      },
      {
        q: "¿El trauma generacional con el dinero tiene solución?",
        a: "Sí. El Módulo Árbol Genealógico MECF mapea las memorias relacionales y las lealtades de linaje que generan el patrón, identificando el punto de liberación específico en el árbol genealógico.",
      },
    ],
  },
  amnesia: {
    archetype: "ARQUITECTO EN AMNESIA",
    code: "AEA-03",
    color: "#d4a832",
    estado:
      "Estás operando en usuario automático — modo 3D. Has olvidado que eres un Fractal del Destino. Vives el guión de otro porque no conoces tu propio Código Maestro. No es falta de capacidad — es ausencia de mapa.",
    sintoma:
      "Ansiedad y vacío existencial. Es la alarma del sistema avisando que no estás siguiendo tu Mapa Multidimensional.",
    capitulos: [
      "Capítulo 2 · La Tríada Sagrada de Tesla",
      "Capítulo 3 · Auditoría de Frecuencia",
      "Capítulo 10 · Notificaciones de la Realidad",
      "Capítulo 12 · Integración y Propósito",
    ],
    foco: "Cálculo de la Matemática del Destino · Activación del Código Maestro · Recuperación de identidad biográfica.",
    modulo: "MÓDULO INDIVIDUAL",
    moduloKey: "INDIVIDUAL",
    moduloPrice: "24,99€",
    moduloDesc:
      "El primer paso para un Arquitecto en Amnesia: conocer su código de origen y los 5 nodos de su sistema.",
    seo: {
      title: "Arquitecto en Amnesia — Resultado Diagnóstico MECF",
      description:
        "Operas en modo automático sin conocer tu código biográfico. La ansiedad y el vacío existencial son señales del sistema. Descubre tu Código Maestro con el Método MECF.",
      ogDesc:
        "Siento vacío y ansiedad sin saber por qué. Mi diagnóstico MECF revela que estoy operando con el código de otro — no el mío.",
    },
    faqItems: [
      {
        q: "¿Qué es la Amnesia Biográfica en el Método MECF?",
        a: "Es un perfil donde el operador desconoce su propio Código Maestro y opera con el guión de otro. El resultado es ansiedad existencial y sensación de vacío sin causa aparente.",
      },
      {
        q: "¿Por qué siento vacío existencial o ansiedad sin causa aparente?",
        a: "Según el Método MECF, la ansiedad sin causa es la alarma del sistema biográfico avisando que estás siguiendo un mapa que no es el tuyo.",
      },
      {
        q: "¿Cómo activo mi Código Maestro?",
        a: "El Módulo Individual MECF calcula la Matemática del Destino a partir de la fecha de nacimiento, identificando los 5 nodos del sistema biográfico y las ventanas de activación para 2026–2032.",
      },
    ],
  },
} as const;

type Slug = keyof typeof ARCHETYPES;

const FADE_UP = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

export default function DiagnosticoResultado() {
  const { slug } = useParams<{ slug: string }>();
  const data = ARCHETYPES[slug as Slug];
  const testimonials = TESTIMONIALS_BY_ARCHETYPE[slug as keyof typeof TESTIMONIALS_BY_ARCHETYPE];

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center"
        style={{ fontFamily: "'Space Mono', monospace" }}>
        <div className="text-center space-y-5">
          <p style={{ color: "rgba(212,175,55,0.6)", fontSize: 11, letterSpacing: "0.3em" }}>
            EXPEDIENTE NO ENCONTRADO
          </p>
          <Link href="/diagnostico">
            <span className="inline-block border px-6 py-3 text-xs tracking-widest uppercase cursor-pointer"
              style={{ borderColor: "rgba(212,175,55,0.4)", color: "#d4af37" }}>
              Iniciar diagnóstico →
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "'Space Mono', monospace" }}>
      <SeoHead
        title={data.seo.title}
        description={data.seo.description}
        canonical={`/diagnostico/${slug}`}
        ogTitle={data.seo.title}
        ogDescription={data.seo.ogDesc}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data.archetype,
            "description": data.seo.description,
            "url": `https://metodomecf.com/diagnostico/${slug}`,
            "author": { "@type": "Person", "name": "El Bachir Chekhad" },
            "publisher": { "@type": "Organization", "name": "Método MECF", "url": "https://metodomecf.com" },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": data.faqItems.map(item => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": { "@type": "Answer", "text": item.a },
            })),
          },
        ]}
      />

      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
        backgroundSize: "100% 4px",
      }} />

      {/* ── CLASSIFIED HEADER BANNER ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full border-b"
        style={{ borderColor: "rgba(212,175,55,0.20)", background: "rgba(0,0,0,0.97)" }}
      >
        {/* Animated scanner line */}
        <motion.div
          className="h-0.5 w-full"
          style={{ background: `linear-gradient(to right, transparent, ${data.color}, transparent)` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="max-w-2xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-5">
            <Link href="/diagnostico">
              <span className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-mono cursor-pointer transition-colors"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#d4af37")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)")}>
                ← Hacer el test
              </span>
            </Link>
            <div className="flex items-center gap-2 border px-3 py-1"
              style={{ borderColor: "rgba(212,175,55,0.30)", background: "rgba(212,175,55,0.06)" }}>
              <span className="text-[10px] tracking-[0.3em] uppercase font-mono" style={{ color: "rgba(212,175,55,0.80)" }}>
                Ref: {data.code}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1" style={{ background: "rgba(212,175,55,0.25)" }} />
            <div className="flex items-center gap-3">
              <span className="text-[11px] tracking-[0.5em] uppercase font-bold" style={{ color: "rgba(255,255,255,0.90)" }}>ARCHIVO</span>
              <span style={{ color: "rgba(212,175,55,0.50)" }}>·</span>
              <span className="text-[11px] tracking-[0.5em] uppercase font-bold" style={{ color: data.color }}>CLASIFICADO</span>
              <span style={{ color: "rgba(212,175,55,0.50)" }}>·</span>
              <span className="text-[11px] tracking-[0.5em] uppercase font-bold" style={{ color: "rgba(255,255,255,0.90)" }}>MECF · PROTOCOLO 9.0</span>
            </div>
            <div className="h-px flex-1" style={{ background: "rgba(212,175,55,0.25)" }} />
          </div>

          <p className="text-center text-[12px] tracking-[0.4em] uppercase font-mono"
            style={{ color: "rgba(212,175,55,0.85)" }}>
            — Diagnóstico completado — Perfil detectado —
          </p>
        </div>
      </motion.div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10 space-y-4">

        {/* Archetype card */}
        <motion.div
          {...FADE_UP(0.3)}
          className="border relative overflow-hidden"
          style={{ borderColor: `${data.color}40`, background: "#050500" }}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: `linear-gradient(to right, transparent, ${data.color}, transparent)` }} />
          <div className="absolute left-0 top-0 bottom-0 w-0.5"
            style={{ background: data.color }} />

          <div className="px-8 py-7">
            <motion.span
              className="inline-block text-[11px] tracking-[0.3em] uppercase border px-4 py-1.5 mb-5 font-bold"
              style={{ color: data.color, borderColor: `${data.color}40` }}
              animate={{ borderColor: [`${data.color}30`, `${data.color}80`, `${data.color}30`] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Perfil de Operador Detectado
            </motion.span>

            <h1 className="text-3xl sm:text-4xl font-bold mb-1 leading-tight"
              style={{ fontFamily: "'Syncopate', sans-serif", color: "#fff", letterSpacing: "0.05em", fontSize: "clamp(1.3rem, 3vw, 2rem)" }}>
              {data.archetype}
            </h1>
            <div className="h-px mt-4 mb-5"
              style={{ background: `linear-gradient(to right, ${data.color}50, transparent)` }} />
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,238,178,0.75)" }}>
              {data.estado}
            </p>
          </div>
        </motion.div>

        {/* Síntoma */}
        <motion.div
          {...FADE_UP(2.4)}
          className="border p-5 flex gap-4"
          style={{ borderColor: "rgba(255,80,80,0.15)", background: "rgba(255,60,60,0.03)" }}
        >
          <span className="text-red-400 text-xs mt-0.5 shrink-0">⚠</span>
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase mb-2 font-bold"
              style={{ color: "rgba(255,90,90,0.90)" }}>
              Síntoma psicosomático activo
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,232,160,0.65)" }}>
              {data.sintoma}
            </p>
          </div>
        </motion.div>

        {/* Capítulos */}
        <motion.div
          {...FADE_UP(3.6)}
          className="border overflow-hidden"
          style={{ borderColor: "rgba(212,175,55,0.18)", background: "#030300" }}
        >
          <div className="px-5 py-3 border-b flex items-center justify-between"
            style={{ borderColor: "rgba(212,175,55,0.12)", background: "rgba(212,175,55,0.05)" }}>
            <p className="text-[11px] tracking-[0.3em] uppercase font-bold"
              style={{ color: "rgba(212,175,55,0.90)" }}>
              Ruta de intervención · El libro
            </p>
            <span className="text-[8px] tracking-widest uppercase border px-2 py-0.5"
              style={{ color: "rgba(255,215,120,0.38)", borderColor: "rgba(255,215,120,0.15)" }}>
              Letrame Ed.
            </span>
          </div>
          <div className="px-5 py-4 space-y-2.5">
            <p className="text-[10px] tracking-[0.25em] uppercase mb-3 font-bold"
              style={{ color: "rgba(212,175,55,0.80)" }}>
              Capítulos prioritarios para tu perfil:
            </p>
            {data.capitulos.map((cap, i) => (
              <motion.div
                key={cap}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.9 + i * 0.18 }}
                className="flex items-start gap-3"
              >
                <span className="text-[8px] mt-0.5 shrink-0" style={{ color: data.color }}>›</span>
                <span className="text-xs" style={{ color: "rgba(255,232,160,0.62)" }}>{cap}</span>
              </motion.div>
            ))}
            <div className="pt-3 mt-3 border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
              <p className="text-[9px] leading-relaxed" style={{ color: "rgba(255,225,140,0.50)" }}>
                <span style={{ color: "rgba(212,175,55,0.6)" }}>Foco principal:</span> {data.foco}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Módulo */}
        <motion.div
          {...FADE_UP(5.0)}
          className="border overflow-hidden"
          style={{ borderColor: `${data.color}30`, background: "#030300" }}
        >
          <div className="px-5 py-3 border-b flex items-center justify-between"
            style={{ borderColor: `${data.color}18`, background: `${data.color}08` }}>
            <p className="text-[11px] tracking-[0.3em] uppercase font-bold"
              style={{ color: "rgba(212,175,55,0.90)" }}>
              Módulo recomendado para tu perfil
            </p>
            <span className="font-mono font-bold text-base" style={{ color: data.color }}>
              {data.moduloPrice}
            </span>
          </div>
          <div className="px-5 py-4">
            <p className="font-mono text-sm font-bold mb-2" style={{ color: data.color }}>
              {data.modulo}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,228,155,0.55)" }}>
              {data.moduloDesc}
            </p>
          </div>
        </motion.div>

        {/* Testimonios del arquetipo */}
        {testimonials && (
          <motion.div {...FADE_UP(5.8)} className="space-y-3">
            <p className="text-[9px] tracking-[0.4em] uppercase"
              style={{ color: "rgba(212,175,55,0.55)" }}>
              — Operadores con tu mismo perfil —
            </p>
            {testimonials.map((t, i) => (
              <div key={i} className="border relative overflow-hidden"
                style={{ borderColor: "rgba(212,175,55,0.14)", background: "#080808" }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(to right, transparent, ${data.color}40, transparent)` }} />
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[8px] tracking-[0.3em] uppercase block mb-1.5"
                      style={{ color: "rgba(255,255,255,0.25)" }}>ANTES</span>
                    <p className="text-xs leading-relaxed italic" style={{ color: "rgba(255,255,255,0.45)" }}>
                      "{t.antes}"
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1" style={{ background: "rgba(212,175,55,0.2)" }} />
                    <span className="text-[8px] tracking-widest uppercase" style={{ color: "rgba(212,175,55,0.5)" }}>MECF</span>
                    <div className="h-px flex-1" style={{ background: "rgba(212,175,55,0.2)" }} />
                  </div>
                  <div>
                    <span className="text-[8px] tracking-[0.3em] uppercase block mb-1.5"
                      style={{ color: data.color }}>DESPUÉS</span>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.80)" }}>
                      "{t.despues}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2"
                    style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
                    <p className="font-mono text-[10px] font-bold" style={{ color: "#fff" }}>{t.name}</p>
                    <p className="font-mono text-[8px] tracking-widest uppercase"
                      style={{ color: "rgba(255,255,255,0.3)" }}>{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* CTAs */}
        <motion.div {...FADE_UP(6.4)} className="space-y-3 pt-2">
          <Link href={`/protocolo?modulo=${data.moduloKey}`}>
            <motion.div
              className="block w-full py-4 text-center font-mono font-bold text-sm uppercase tracking-[0.15em] text-black cursor-pointer"
              style={{ background: data.color }}
              whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
              whileTap={{ scale: 0.97 }}
            >
              Activar {data.modulo} — {data.moduloPrice} →
            </motion.div>
          </Link>

          <a href="https://www.letrame.com" target="_blank" rel="noopener noreferrer">
            <motion.div
              className="block w-full py-4 text-center font-mono text-xs uppercase tracking-[0.15em] border cursor-pointer"
              style={{ borderColor: "rgba(212,175,55,0.25)", color: "rgba(212,175,55,0.65)" }}
              whileHover={{ borderColor: "rgba(212,175,55,0.5)", color: data.color }}
              whileTap={{ scale: 0.97 }}
            >
              Obtener el libro — Letrame Editorial →
            </motion.div>
          </a>

          <p className="text-center text-[10px] tracking-widest uppercase pt-1"
            style={{ color: "rgba(255,225,140,0.65)" }}>
            Descarga inmediata · Pago único · Sin suscripción
          </p>
        </motion.div>

        {/* FAQ — rich para SEO, discreto visualmente */}
        <motion.div {...FADE_UP(7.0)} className="space-y-4 pt-6">
          <div className="h-px" style={{ background: "rgba(212,175,55,0.08)" }} />
          <p className="text-[9px] tracking-[0.4em] uppercase"
            style={{ color: "rgba(255,255,255,0.18)" }}>
            PREGUNTAS FRECUENTES
          </p>
          {data.faqItems.map((item, i) => (
            <div key={i} className="space-y-1.5">
              <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.50)" }}>{item.q}</p>
              <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.28)" }}>{item.a}</p>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          {...FADE_UP(7.5)}
          className="mt-10 pt-6 border-t text-center"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-[11px] tracking-wide leading-relaxed max-w-sm mx-auto italic"
            style={{ color: "rgba(255,232,160,0.68)" }}>
            "No importa cuán dañado parezca el edificio de tu vida; mientras el código base sea legible, la reconstrucción es posible."
          </p>
          <p className="text-[10px] tracking-widest mt-2" style={{ color: "rgba(212,175,55,0.75)" }}>
            — El Bachir Chekhad
          </p>
          <div className="flex items-center justify-center gap-8 mt-5">
            <Link href="/diagnostico">
              <span className="text-[11px] tracking-widest uppercase cursor-pointer font-mono transition-colors"
                style={{ color: "rgba(212,175,55,0.5)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#d4af37")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(212,175,55,0.5)")}>
                ← Repetir diagnóstico
              </span>
            </Link>
            <Link href="/">
              <span className="text-[11px] tracking-widest uppercase cursor-pointer font-mono transition-colors"
                style={{ color: "rgba(255,255,255,0.30)" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#d4af37")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.30)")}>
                Método MECF →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
