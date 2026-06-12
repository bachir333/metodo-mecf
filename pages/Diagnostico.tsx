import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import SeoHead from "@/components/SeoHead";

type Stage = "intro" | "quiz" | "processing" | "result";
type Letter = "A" | "B" | "C";

const QUESTIONS = [
  {
    id: "01",
    area: "ECONOMÍA",
    sub: "NODO DE FLUJO",
    opts: {
      A: "Tienes ideas brillantes, pero el dinero se «evapora» o surgen gastos que lo devuelven a cero.",
      B: "Gano dinero, pero no puedo disfrutarlo; siento culpa o miedo a que se agote.",
      C: "Vivo en modo supervivencia; el dinero es un recurso escaso que siempre me elude.",
    },
  },
  {
    id: "02",
    area: "BIOLOGÍA",
    sub: "EL HARDWARE",
    opts: {
      A: "Tensiones, migrañas, vista cansada — exceso de control y proyección al futuro.",
      B: "Problemas digestivos, fatiga, inflamación — el cuerpo retiene el pasado.",
      C: "Vacío, ansiedad, insomnio — el sistema no reconoce su propio presente.",
    },
  },
  {
    id: "03",
    area: "AUTORIDAD",
    sub: "EJE PATERNO · VOLTAJE",
    opts: {
      A: "Choco con jefes o figuras de poder; mi valor no es reconocido.",
      B: "Soy el «pilar» de la familia; cargo responsabilidades que no me tocan.",
      C: "Me siento invisible; sigo las reglas por miedo, mi voz no tiene peso.",
    },
  },
  {
    id: "04",
    area: "CICLOS",
    sub: "SINCRONÍA MECF",
    opts: {
      A: "Siempre me «quemo» antes de terminar; llego tarde a mis propias metas.",
      B: "Repito los mismos errores cada 3, 6 o 9 años — estoy en bucle.",
      C: "Los días son idénticos; no veo ciclos, solo una línea recta sin sentido.",
    },
  },
  {
    id: "05",
    area: "HERENCIA",
    sub: "CÓDIGO FRACTAL",
    opts: {
      A: "Repito la ambición frustrada de un ancestro — exiliados, arruinados.",
      B: "Cargo con secretos o tristezas del clan; prohibido ser más feliz que ellas.",
      C: "Desconozco mi origen; me siento una «isla» sin raíces, pero mi vida se siente ajena.",
    },
  },
  {
    id: "06",
    area: "VISIÓN",
    sub: "NIVEL DE CONCIENCIA",
    opts: {
      A: "Creo en el esfuerzo duro; si no sale, es porque no me sacrifiqué lo suficiente.",
      B: "Creo en el destino, pero como sentencia: «Es lo que me tocó».",
      C: "Siento que hay algo más, pero me pierdo en la teoría. Busco respuestas.",
    },
  },
  {
    id: "07",
    area: "RELACIONES",
    sub: "CONEXIÓN DE RED",
    opts: {
      A: "Atraigo personas que compiten conmigo; mis vínculos son campos de batalla.",
      B: "Atraigo personas a las que debo «salvar» o cuidar para sentirme valioso.",
      C: "Mis relaciones son distantes; temo que vean mi «código real».",
    },
  },
  {
    id: "08",
    area: "PROPÓSITO",
    sub: "CÓDIGO FUENTE",
    opts: {
      A: "Tengo muchos proyectos, pero ninguno parece ser «el verdadero».",
      B: "Hago lo que se espera de mí, no lo que dicta mi frecuencia.",
      C: "No tengo idea de qué hago aquí; siento que mi vida es un error de sistema.",
    },
  },
  {
    id: "09",
    area: "RESILIENCIA",
    sub: "FIREWALL",
    opts: {
      A: "Cuando algo falla, me desmorono. Mi sistema no tiene redundancia.",
      B: "Aguanto mucho dolor en silencio hasta que mi cuerpo «salta» por los aires.",
      C: "Me siento desconectado del «Servidor»; cuando vienen problemas, me rindo rápido.",
    },
  },
];

const PROFILES = {
  A: {
    archetype: "ARQUITECTO EN CORTOCIRCUITO",
    code: "ACS-01",
    estado: "Tienes el voltaje activo — energía del Padre, Sol, frecuencia 8 — pero tu cableado está dañado. Emites mucha energía pero no se materializa porque existe una interferencia de frecuencia en la ejecución. El potencial es real; el canal no está limpio.",
    sintoma: "El «calor» de la ambición se convierte en inflamación, estrés o colapso justo antes del logro.",
    capitulos: ["Capítulo 5 · El Procesador Mental", "Capítulo 9 · La Empresa como Clan", "Capítulo 11 · El Protocolo de Commit"],
    foco: "Permiso de Conquista · Integración de la Sombra · Canalización del voltaje sin quemar el sistema.",
    modulo: "MÓDULO INDIVIDUAL",
    moduloKey: "INDIVIDUAL",
    moduloPrice: "24,99€",
    moduloDesc: "Identifica el nodo exacto donde se instaló el cortocircuito y las ventanas 2026–2032 para romperlo.",
    color: "#fcd34d",
    gradient: "from-yellow-900/20 to-transparent",
  },
  B: {
    archetype: "ARQUITECTO CON VASIJA ROTA",
    code: "AVR-02",
    estado: "Tienes capacidad de atracción, pero tu «madre interna» — Prosperidad, Recepción, frecuencia 6 — está herida. No puedes sostener ni disfrutar lo que construyes porque el sistema anticipa que te lo cobrarán después. Guardas para el clan lo que debería ser tuyo.",
    sintoma: "Retención y pesadez. El cuerpo acumula lo que el alma no sabe cómo recibir sin culpa.",
    capitulos: ["Capítulo 3 · Auditoría de Frecuencia", "Capítulo 6 · El Nivel 6 — El Hardware Físico", "Capítulo 7 · Polaridades en el Código", "Capítulo 8 · El Sabotaje del Sistema"],
    foco: "Descodificación biológica de programas heredados · Liberación de la «Farmacocracia» emocional.",
    modulo: "MÓDULO ÁRBOL GENEALÓGICO",
    moduloKey: "ÁRBOL",
    moduloPrice: "49,99€",
    moduloDesc: "Mapea las lealtades invisibles del linaje y las memorias relacionales que impiden sostener lo construido.",
    color: "#c9a84c",
    gradient: "from-amber-900/20 to-transparent",
  },
  C: {
    archetype: "ARQUITECTO EN AMNESIA",
    code: "AEA-03",
    estado: "Estás operando en usuario automático — modo 3D. Has olvidado que eres un Fractal del Destino. Vives el guión de otro porque no conoces tu propio Código Maestro. No es falta de capacidad — es ausencia de mapa.",
    sintoma: "Ansiedad y vacío existencial. Es la alarma del sistema avisando que no estás siguiendo tu Mapa Multidimensional.",
    capitulos: ["Capítulo 2 · La Tríada Sagrada de Tesla", "Capítulo 3 · Auditoría de Frecuencia", "Capítulo 10 · Notificaciones de la Realidad", "Capítulo 12 · Integración y Propósito"],
    foco: "Cálculo de la Matemática del Destino · Activación del Código Maestro · Recuperación de identidad biográfica.",
    modulo: "MÓDULO INDIVIDUAL",
    moduloKey: "INDIVIDUAL",
    moduloPrice: "24,99€",
    moduloDesc: "El primer paso para un Arquitecto en Amnesia: conocer su código de origen y los 5 nodos de su sistema.",
    color: "#a38728",
    gradient: "from-yellow-950/30 to-transparent",
  },
};

const PROCESSING_LINES = [
  "Inicializando Protocolo MECF 9.0...",
  "Recibiendo datos biográficos...",
  "Analizando frecuencia base del operador...",
  "Escaneando eje paterno · Nodo 1 de 5...",
  "Escaneando eje materno · Nodo 2 de 5...",
  "Detectando lealtades invisibles de linaje...",
  "Mapeando memoria celular activa...",
  "Calibrando cronología de impactos...",
  "Identificando patrones repetitivos...",
  "Detectando interferencias en el sistema...",
  "Comparando con 3.847 perfiles en base MECF...",
  "Calculando índice de coherencia biográfica...",
  "Analizando nodo de flujo económico...",
  "Procesando campo relacional y vincular...",
  "Evaluando alineación con propósito...",
  "Verificando señales del cuerpo activas...",
  "Cruzando variables con Matemática del Destino...",
  "Consolidando perfil de operador...",
  "Clasificando expediente biográfico...",
  "DIAGNÓSTICO COMPLETADO",
];

function getProfile(answers: Letter[]) {
  const counts = { A: 0, B: 0, C: 0 };
  answers.forEach(a => counts[a]++);
  if (counts.A >= counts.B && counts.A >= counts.C) return { profile: PROFILES.A, dominant: "A", counts };
  if (counts.B >= counts.A && counts.B >= counts.C) return { profile: PROFILES.B, dominant: "B", counts };
  return { profile: PROFILES.C, dominant: "C", counts };
}

const SLIDE = {
  enter: { x: 50, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { x: -50, opacity: 0, transition: { duration: 0.25 } },
};

export default function Diagnostico() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Letter[]>([]);
  const [selected, setSelected] = useState<Letter | null>(null);
  const [procLines, setProcLines] = useState<string[]>([]);
  const [result, setResult] = useState<ReturnType<typeof getProfile> | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const procRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  const startQuiz = () => {
    setStage("quiz");
    setStep(0);
    setAnswers([]);
    setSelected(null);
  };

  const choose = (letter: Letter) => setSelected(letter);

  const next = () => {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStage("processing");
      runProcessing(newAnswers);
    }
  };

  const runProcessing = (finalAnswers: Letter[]) => {
    const r = getProfile(finalAnswers);
    setResult(r);
    setProcLines([]);
    let i = 0;
    procRef.current = setInterval(() => {
      if (i < PROCESSING_LINES.length) {
        setProcLines(prev => [...prev, PROCESSING_LINES[i]]);
        i++;
      } else {
        if (procRef.current) clearInterval(procRef.current);
        setTimeout(() => setStage("result"), 800);
      }
    }, 460);
  };

  useEffect(() => () => { if (procRef.current) clearInterval(procRef.current); }, []);

  const progress = ((step) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "'Space Mono', monospace" }}>
      <SeoHead
        title="Test Biográfico Gratis — ¿Qué está bloqueando tu vida? | Método MECF"
        description="9 preguntas para descubrir si tienes un bloqueo económico, emocional o de identidad. Test gratuito por El Bachir Chekhad. Sin registro. Resultado inmediato."
        canonical="/diagnostico"
        ogTitle="Test Biográfico Gratis — Descubre tu Código de Bloqueo | Método MECF"
        ogDescription="¿Por qué se repiten los mismos patrones en tu vida? 9 preguntas revelan tu arquetipo biográfico. Test gratuito, resultado inmediato."
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Quiz",
            "name": "Diagnóstico de Frecuencia MECF",
            "description": "Test de 9 vectores para identificar el arquetipo de operador biográfico: bloqueo económico, emocional o de identidad.",
            "url": "https://metodomecf.com/diagnostico",
            "numberOfQuestions": 9,
            "educationalLevel": "beginner",
            "author": {
              "@type": "Person",
              "name": "El Bachir Chekhad",
              "url": "https://metodomecf.com"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Método MECF",
              "url": "https://metodomecf.com"
            },
            "about": [
              { "@type": "Thing", "name": "bloqueo económico" },
              { "@type": "Thing", "name": "patrones biográficos" },
              { "@type": "Thing", "name": "numerología" },
              { "@type": "Thing", "name": "autoconocimiento" }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Es gratuito el test biográfico MECF?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí. El diagnóstico de 9 preguntas es completamente gratuito. No requiere registro ni datos personales. El resultado es inmediato."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuánto tiempo tarda el test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Aproximadamente 4 minutos. Son 9 preguntas sobre diferentes áreas de tu vida: economía, relaciones, propósito, salud e identidad."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué revela el diagnóstico MECF?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "El test identifica tu arquetipo biográfico: qué patrón de bloqueo opera en tu sistema (económico, emocional o de identidad) y qué módulo del Método MECF está diseñado para resolverlo."
                }
              },
              {
                "@type": "Question",
                "name": "¿Por qué se repiten los mismos patrones en mi vida?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Según el Método MECF, los patrones repetitivos responden a un código biográfico heredado que opera de forma inconsciente. El diagnóstico identifica cuál es ese código y cómo está afectando tus áreas vitales."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué es el Método MECF?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MECF (Matemática Esencial del Campo de Frecuencias) es un método de decodificación biográfica creado por El Bachir Chekhad. Utiliza la fecha de nacimiento para identificar ciclos, bloqueos y patrones en las áreas económica, relacional, de propósito y salud."
                }
              }
            ]
          }
        ]}
      />

      {/* Scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
          backgroundSize: "100% 4px",
        }} />

      <AnimatePresence mode="wait">

        {/* ─────────────── INTRO ─────────────── */}
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
          >
            {/* Back link */}
            <Link href="/">
              <span className="absolute top-6 left-6 text-[9px] tracking-[0.3em] uppercase hover:text-primary transition-colors cursor-pointer border px-3 py-1.5 hover:border-primary/40" style={{ color: "rgba(255,225,140,0.40)", borderColor: "rgba(255,225,140,0.12)" }}>
                ← INICIO
              </span>
            </Link>

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,175,55,0.07) 0%, transparent 70%)" }} />

            {/* Header label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 border px-5 py-2"
                style={{ borderColor: "rgba(212,175,55,0.25)", background: "rgba(212,175,55,0.05)" }}>
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span className="text-[11px] tracking-[0.35em] uppercase" style={{ color: "rgba(255,255,255,0.92)" }}>
                  Sistema activo — Letrame Editorial × Método MECF
                </span>
              </div>
            </motion.div>

            {/* Main title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto mb-6"
            >
              <div className="text-[10px] tracking-[0.5em] uppercase mb-6"
                style={{ color: "rgba(212,175,55,0.88)" }}>
                PROTOCOLO 9.0 // DIAGNÓSTICO DE FRECUENCIA
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight mb-2"
                style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.01em" }}>
                ¿Quién está<br />
                <em className="italic" style={{ color: "#d4af37" }}>operando</em><br />
                tu sistema?
              </h1>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-16 h-px mx-auto mb-8"
              style={{ background: "#d4af37" }}
            />

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="max-w-xl mx-auto mb-10 space-y-4"
            >
              <p className="text-sm leading-relaxed" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.78rem", color: "rgba(255,238,178,0.72)" }}>
                Este protocolo de diagnóstico fue diseñado por <strong style={{ color: "rgba(255,245,205,0.92)" }}>El Bachir Chekhad</strong> y
                forma parte del contenido del libro publicado por <strong style={{ color: "rgba(255,245,205,0.92)" }}>Letrame Grupo Editorial</strong>.
              </p>
              <p className="text-sm leading-relaxed" style={{ fontSize: "0.75rem", color: "rgba(255,228,155,0.58)" }}>
                No es un test de personalidad. Es un análisis del <span style={{ color: "#d4af37" }}>estado real de tu hardware biográfico</span> — el sistema que estás ejecutando ahora mismo, sepas o no que existe.
              </p>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap justify-center gap-6 mb-12 text-center"
            >
              {[
                { val: "9", label: "Vectores de análisis" },
                { val: "3", label: "Perfiles de operador" },
                { val: "4 min", label: "Tiempo estimado" },
              ].map(s => (
                <div key={s.label} className="flex flex-col items-center gap-1">
                  <span className="font-mono text-xl font-bold" style={{ color: "#d4af37" }}>{s.val}</span>
                  <span className="text-[8px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,228,150,0.72)" }}>{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 }}
            >
              <motion.button
                onClick={startQuiz}
                className="relative inline-flex items-center gap-4 px-12 py-5 font-mono font-bold text-sm uppercase tracking-[0.2em] text-black overflow-hidden"
                style={{ background: "#d4af37" }}
                whileHover={{ scale: 1.03, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                <span>Iniciar diagnóstico</span>
                <span className="text-base">→</span>
              </motion.button>
              <p className="mt-4 text-[9px] tracking-widest uppercase" style={{ color: "rgba(255,228,150,0.68)" }}>
                Acceso gratuito · Sin registro
              </p>
            </motion.div>

            {/* Warning */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="mt-16 max-w-md mx-auto border-l-2 pl-4 text-left"
              style={{ borderColor: "rgba(212,175,55,0.3)" }}
            >
              <p className="text-[9px] tracking-wide leading-relaxed" style={{ color: "rgba(255,225,140,0.45)" }}>
                <span style={{ color: "rgba(255,255,255,0.90)" }}>AVISO DEL SISTEMA:</span> Responde con sinceridad absoluta. El diagnóstico solo funciona si describes tu situación real, no la que desearías tener. La precisión del resultado depende directamente de la honestidad de tus respuestas.
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* ─────────────── QUIZ ─────────────── */}
        {stage === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 min-h-screen flex flex-col"
          >
            {/* Top bar */}
            <div className="sticky top-0 z-50 border-b bg-black/95 backdrop-blur-md"
              style={{ borderColor: "rgba(212,175,55,0.12)" }}>
              <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
                <span className="font-mono text-[12px] tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.90)" }}>
                  Diagnóstico MECF
                </span>
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-1 h-0.5 bg-white/5 relative overflow-hidden">
                    <motion.div
                      className="absolute left-0 top-0 bottom-0"
                      style={{ background: "#d4af37" }}
                      animate={{ width: `${((step) / QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                  <span className="font-mono text-[9px] tracking-widest shrink-0" style={{ color: "#d4af37" }}>
                    {String(step + 1).padStart(2, "0")} / {QUESTIONS.length}
                  </span>
                </div>
                <button
                  onClick={() => setStage("intro")}
                  className="text-[8px] tracking-widest uppercase transition-colors"
                  style={{ color: "rgba(255,215,120,0.28)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,230,150,0.60)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,215,120,0.28)")}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Question */}
            <div className="flex-1 flex items-center justify-center px-6 py-16">
              <div className="w-full max-w-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={SLIDE}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {/* Area label */}
                    <div className="mb-8">
                      <div className="inline-flex items-center gap-3 mb-3">
                        <div className="h-px w-8" style={{ background: "rgba(212,175,55,0.4)" }} />
                        <span className="text-[13px] tracking-[0.4em] uppercase font-bold" style={{ color: "#d4af37" }}>
                          {QUESTIONS[step].area}
                        </span>
                        <span className="text-[12px] tracking-widest uppercase" style={{ color: "rgba(255,228,150,0.72)" }}>
                          · {QUESTIONS[step].sub}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold leading-snug text-white"
                        style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>
                        Selecciona la opción que más se repite en tu vida actual:
                      </h2>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mb-10">
                      {(["A", "B", "C"] as Letter[]).map((letter) => (
                        <motion.button
                          key={letter}
                          onClick={() => choose(letter)}
                          className="w-full text-left flex gap-4 p-5 border transition-all duration-200 group"
                          style={{
                            borderColor: selected === letter ? "#d4af37" : "rgba(255,255,255,0.07)",
                            background: selected === letter ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.01)",
                          }}
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.99 }}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: letter === "A" ? 0.05 : letter === "B" ? 0.1 : 0.15 }}
                        >
                          {/* Letter badge */}
                          <div
                            className="shrink-0 w-9 h-9 flex items-center justify-center text-[14px] font-bold border transition-all duration-200"
                            style={{
                              borderColor: selected === letter ? "#d4af37" : "rgba(255,255,255,0.28)",
                              color: selected === letter ? "#d4af37" : "rgba(255,255,255,0.92)",
                              background: selected === letter ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)",
                            }}
                          >
                            {selected === letter ? "✓" : letter}
                          </div>
                          {/* Text */}
                          <p className="text-sm leading-relaxed pt-0.5 transition-colors duration-200"
                            style={{
                              color: selected === letter ? "rgba(255,248,220,0.95)" : "rgba(255,242,190,0.60)",
                              fontFamily: "inherit",
                            }}>
                            {QUESTIONS[step].opts[letter]}
                          </p>
                        </motion.button>
                      ))}
                    </div>

                    {/* Next */}
                    <motion.button
                      onClick={next}
                      disabled={!selected}
                      className="w-full py-4 font-mono font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300"
                      style={{
                        background: selected ? "#d4af37" : "rgba(212,175,55,0.1)",
                        color: selected ? "#000" : "rgba(212,175,55,0.25)",
                        border: selected ? "none" : "1px solid rgba(212,175,55,0.15)",
                        cursor: selected ? "pointer" : "default",
                      }}
                      whileHover={selected ? { scale: 1.01, filter: "brightness(1.08)" } : {}}
                      whileTap={selected ? { scale: 0.98 } : {}}
                    >
                      {step < QUESTIONS.length - 1
                        ? `Siguiente vector — ${String(step + 2).padStart(2, "0")}/${QUESTIONS.length}`
                        : "Procesar diagnóstico →"}
                    </motion.button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─────────────── PROCESSING ─────────────── */}
        {stage === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 min-h-screen flex items-center justify-center px-6"
          >
            <div className="w-full max-w-lg">
              {/* Terminal box */}
              <div className="border p-8 relative"
                style={{ borderColor: "rgba(212,175,55,0.3)", background: "#030300" }}>
                <div className="absolute -top-3 left-5 px-3 text-[8px] tracking-[0.3em] uppercase bg-black"
                  style={{ color: "#d4af37" }}>
                  TERMINAL MECF // PROCESANDO
                </div>

                {/* Blinking cursor header */}
                <div className="flex items-center gap-2 mb-6">
                  <motion.span
                    className="text-[10px]"
                    style={{ color: "#d4af37" }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    ▊
                  </motion.span>
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: "rgba(255,220,130,0.48)" }}>
                    Analizando perfil biográfico...
                  </span>
                </div>

                {/* Log lines */}
                <div className="space-y-2 min-h-[240px]">
                  {procLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-3"
                    >
                      <span className="shrink-0 text-[9px] mt-0.5"
                        style={{ color: i === procLines.length - 1 && line === "DIAGNÓSTICO COMPLETADO" ? "#d4af37" : "rgba(212,175,55,0.4)" }}>
                        {i === procLines.length - 1 && line === "DIAGNÓSTICO COMPLETADO" ? "✓" : "›"}
                      </span>
                      <span
                        className="text-[10px] tracking-wide leading-relaxed"
                        style={{
                          fontFamily: "monospace",
                          color: i === procLines.length - 1 && line === "DIAGNÓSTICO COMPLETADO"
                            ? "#d4af37"
                            : "rgba(255,242,190,0.55)",
                          fontWeight: line === "DIAGNÓSTICO COMPLETADO" ? "bold" : "normal",
                        }}>
                        {line}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-6 h-0.5 bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ background: "#d4af37" }}
                    animate={{ width: `${(procLines.length / PROCESSING_LINES.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─────────────── RESULT ─────────────── */}
        {stage === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 min-h-screen"
          >
            {/* ── CLASSIFIED HEADER BANNER ── */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full border-b"
              style={{ borderColor: "rgba(212,175,55,0.20)", background: "rgba(0,0,0,0.95)" }}
            >
              {/* Top scanner line */}
              <motion.div
                className="h-0.5 w-full"
                style={{ background: "linear-gradient(to right, transparent, #d4af37, transparent)" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />

              <div className="max-w-2xl mx-auto px-6 py-6">
                {/* Top row: back + ref */}
                <div className="flex items-center justify-between mb-5">
                  <button
                    onClick={() => { setStage("intro"); setStep(0); setAnswers([]); setSelected(null); setProcLines([]); }}
                    className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-mono transition-colors"
                    style={{ color: "rgba(255,255,255,0.75)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#d4af37")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                  >
                    ← Repetir diagnóstico
                  </button>
                  <div className="flex items-center gap-3">
                    <Link href={`/diagnostico/${{ A: "cortocircuito", B: "vasija-rota", C: "amnesia" }[result.dominant]}`}>
                      <span className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-mono cursor-pointer transition-colors"
                        style={{ color: "rgba(212,175,55,0.7)" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#d4af37")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(212,175,55,0.7)")}>
                        Compartir resultado →
                      </span>
                    </Link>
                    <div className="flex items-center gap-2 border px-3 py-1"
                      style={{ borderColor: "rgba(212,175,55,0.30)", background: "rgba(212,175,55,0.06)" }}>
                      <span className="text-[10px] tracking-[0.3em] uppercase font-mono" style={{ color: "rgba(212,175,55,0.80)" }}>
                        Ref: {result.profile.code}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CLASIFICADO stamp row */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-px flex-1" style={{ background: "rgba(212,175,55,0.25)" }} />
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] tracking-[0.5em] uppercase font-bold" style={{ color: "rgba(255,255,255,0.90)" }}>ARCHIVO</span>
                    <span className="text-[11px]" style={{ color: "rgba(212,175,55,0.50)" }}>·</span>
                    <span className="text-[11px] tracking-[0.5em] uppercase font-bold" style={{ color: "#d4af37" }}>CLASIFICADO</span>
                    <span className="text-[11px]" style={{ color: "rgba(212,175,55,0.50)" }}>·</span>
                    <span className="text-[11px] tracking-[0.5em] uppercase font-bold" style={{ color: "rgba(255,255,255,0.90)" }}>MECF · PROTOCOLO 9.0</span>
                  </div>
                  <div className="h-px flex-1" style={{ background: "rgba(212,175,55,0.25)" }} />
                </div>

                {/* Subtitle */}
                <p className="text-center text-[12px] tracking-[0.4em] uppercase font-mono" style={{ color: "rgba(212,175,55,0.85)" }}>
                  — Diagnóstico completado — Perfil detectado —
                </p>
              </div>
            </motion.div>

            {/* ── CONTENT ── */}
            <div className="max-w-2xl mx-auto px-6 py-10">

              {/* Archetype */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="border relative overflow-hidden mb-2"
                style={{ borderColor: `${result.profile.color}40`, background: "#050500" }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(to right, transparent, ${result.profile.color}, transparent)` }} />
                <div className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{ background: result.profile.color }} />

                <div className="px-8 py-7">
                  <motion.span
                    className="inline-block text-[11px] tracking-[0.3em] uppercase border px-4 py-1.5 mb-5 font-bold"
                    style={{ color: result.profile.color, borderColor: `${result.profile.color}40` }}
                    animate={{ borderColor: [`${result.profile.color}30`, `${result.profile.color}80`, `${result.profile.color}30`] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    Perfil de Operador Detectado
                  </motion.span>

                  <h2 className="text-3xl sm:text-4xl font-bold mb-1 leading-tight"
                    style={{ fontFamily: "'Syncopate', sans-serif", color: "#fff", letterSpacing: "0.05em", fontSize: "clamp(1.3rem, 3vw, 2rem)" }}>
                    {result.profile.archetype}
                  </h2>
                  <div className="h-px mt-4 mb-5"
                    style={{ background: `linear-gradient(to right, ${result.profile.color}50, transparent)` }} />
                  <p className="text-sm leading-relaxed" style={{ fontFamily: "inherit", color: "rgba(255,238,178,0.75)" }}>
                    {result.profile.estado}
                  </p>
                </div>
              </motion.div>

              {/* Score breakdown */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="flex gap-2 mb-6"
              >
                {(["A", "B", "C"] as Letter[]).map(l => (
                  <div key={l} className="flex-1 border py-2 text-center"
                    style={{
                      borderColor: result.dominant === l ? `${result.profile.color}50` : "rgba(255,255,255,0.06)",
                      background: result.dominant === l ? `${result.profile.color}08` : "transparent",
                    }}>
                    <div className="text-lg font-bold" style={{ color: result.dominant === l ? result.profile.color : "rgba(255,230,150,0.40)" }}>
                      {result.counts[l]}
                    </div>
                    <div className="text-[9px] tracking-widest uppercase mt-0.5"
                      style={{ color: result.dominant === l ? `${result.profile.color}cc` : "rgba(255,230,150,0.45)" }}>
                      Tipo {l}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Sintoma */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4 }}
                className="border p-5 mb-4 flex gap-4"
                style={{ borderColor: "rgba(255,80,80,0.15)", background: "rgba(255,60,60,0.03)" }}
              >
                <span className="text-red-400 text-xs mt-0.5 shrink-0">⚠</span>
                <div>
                  <p className="text-[11px] tracking-[0.3em] uppercase mb-2 font-bold" style={{ color: "rgba(255,90,90,0.90)" }}>
                    Síntoma psicosomático activo
                  </p>
                  <p className="text-xs leading-relaxed" style={{ fontFamily: "inherit", color: "rgba(255,232,160,0.65)" }}>
                    {result.profile.sintoma}
                  </p>
                </div>
              </motion.div>

              {/* Chapter roadmap */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.6 }}
                className="border mb-4 overflow-hidden"
                style={{ borderColor: "rgba(212,175,55,0.18)", background: "#030300" }}
              >
                <div className="px-5 py-3 border-b flex items-center justify-between"
                  style={{ borderColor: "rgba(212,175,55,0.12)", background: "rgba(212,175,55,0.05)" }}>
                  <p className="text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: "rgba(212,175,55,0.90)" }}>Ruta de intervención · El libro</p>
                  <span className="text-[8px] tracking-widest uppercase border px-2 py-0.5"
                    style={{ color: "rgba(255,215,120,0.38)", borderColor: "rgba(255,215,120,0.15)" }}>
                    Letrame Ed.
                  </span>
                </div>
                <div className="px-5 py-4 space-y-2.5">
                  <p className="text-[10px] tracking-[0.25em] uppercase mb-3 font-bold" style={{ color: "rgba(212,175,55,0.80)" }}>
                    Capítulos prioritarios para tu perfil:
                  </p>
                  {result.profile.capitulos.map((cap, i) => (
                    <motion.div
                      key={cap}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 3.9 + i * 0.18 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-[8px] mt-0.5 shrink-0" style={{ color: result.profile.color }}>›</span>
                      <span className="text-xs" style={{ fontFamily: "inherit", color: "rgba(255,232,160,0.62)" }}>{cap}</span>
                    </motion.div>
                  ))}
                  <div className="pt-3 mt-3 border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
                    <p className="text-[9px] leading-relaxed" style={{ fontFamily: "inherit", color: "rgba(255,225,140,0.50)" }}>
                      <span style={{ color: "rgba(212,175,55,0.6)" }}>Foco principal:</span> {result.profile.foco}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Module recommended */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5.2 }}
                className="border mb-6 overflow-hidden"
                style={{ borderColor: `${result.profile.color}30`, background: "#030300" }}
              >
                <div className="px-5 py-3 border-b flex items-center justify-between"
                  style={{ borderColor: `${result.profile.color}18`, background: `${result.profile.color}08` }}>
                  <p className="text-[11px] tracking-[0.3em] uppercase font-bold" style={{ color: "rgba(212,175,55,0.90)" }}>Módulo recomendado para tu perfil</p>
                  <span className="font-mono font-bold text-base" style={{ color: result.profile.color }}>
                    {result.profile.moduloPrice}
                  </span>
                </div>
                <div className="px-5 py-4">
                  <p className="font-mono text-sm font-bold mb-2" style={{ color: result.profile.color }}>
                    {result.profile.modulo}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ fontFamily: "inherit", color: "rgba(255,228,155,0.55)" }}>
                    {result.profile.moduloDesc}
                  </p>
                </div>
              </motion.div>

              {/* ── EMAIL CAPTURE ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 6.0 }}
                className="border mb-4 overflow-hidden"
                style={{ borderColor: `${result.profile.color}28`, background: "#030300" }}
              >
                <div className="px-5 py-3 border-b"
                  style={{ borderColor: `${result.profile.color}15`, background: `${result.profile.color}06` }}>
                  <p className="text-[11px] tracking-[0.3em] uppercase font-bold"
                    style={{ color: "rgba(212,175,55,0.85)" }}>
                    Recibir resultado por email
                  </p>
                </div>
                <div className="px-5 py-4">
                  {emailStatus === "sent" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 py-1"
                    >
                      <span style={{ color: result.profile.color }}>✓</span>
                      <div>
                        <p className="text-xs font-bold" style={{ color: result.profile.color }}>
                          Resultado enviado
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,232,160,0.45)" }}>
                          Revisa tu bandeja — también recibirás tu ruta de intervención completa.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-[10px] leading-relaxed" style={{ color: "rgba(255,232,160,0.45)" }}>
                        Te enviamos tu perfil + módulo recomendado para que no pierdas tu diagnóstico.
                      </p>
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (!emailInput.includes("@")) return;
                          setEmailStatus("loading");
                          try {
                            await fetch("/api/quiz-result", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                email: emailInput,
                                badge: result.profile.code,
                                title: result.profile.archetype,
                                desc: result.profile.estado,
                                modulo: result.profile.modulo,
                                moduloKey: result.profile.moduloKey,
                              }),
                            });
                            setEmailStatus("sent");
                          } catch {
                            setEmailStatus("error");
                          }
                        }}
                        className="flex gap-2"
                      >
                        <input
                          type="email"
                          required
                          placeholder="tu@email.com"
                          value={emailInput}
                          onChange={e => setEmailInput(e.target.value)}
                          className="flex-1 bg-transparent border px-3 py-2 text-xs font-mono outline-none"
                          style={{
                            borderColor: "rgba(212,175,55,0.22)",
                            color: "rgba(255,255,255,0.80)",
                          }}
                          onFocus={e => (e.currentTarget.style.borderColor = `${result.profile.color}60`)}
                          onBlur={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.22)")}
                        />
                        <motion.button
                          type="submit"
                          disabled={emailStatus === "loading"}
                          className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-mono font-bold text-black"
                          style={{ background: emailStatus === "loading" ? "rgba(212,175,55,0.5)" : result.profile.color }}
                          whileHover={{ filter: "brightness(1.1)" }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {emailStatus === "loading" ? "..." : "Enviar →"}
                        </motion.button>
                      </form>
                      {emailStatus === "error" && (
                        <p className="text-[10px]" style={{ color: "rgba(255,80,80,0.7)" }}>
                          Error al enviar. Inténtalo de nuevo.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 6.4 }}
                className="space-y-3"
              >
                <Link href={`/protocolo?modulo=${result.profile.moduloKey}`}>
                  <motion.div
                    className="block w-full py-4 text-center font-mono font-bold text-sm uppercase tracking-[0.15em] text-black cursor-pointer shadow-[0_10px_40px_rgba(212,175,55,0.2)]"
                    style={{ background: result.profile.color }}
                    whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Activar {result.profile.modulo} — {result.profile.moduloPrice} →
                  </motion.div>
                </Link>

                <a
                  href="https://www.letrame.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    className="block w-full py-4 text-center font-mono text-xs uppercase tracking-[0.15em] border cursor-pointer transition-colors"
                    style={{ borderColor: "rgba(212,175,55,0.25)", color: "rgba(212,175,55,0.65)" }}
                    whileHover={{ borderColor: "rgba(212,175,55,0.5)", color: "#d4af37" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Obtener el libro — Letrame Editorial →
                  </motion.div>
                </a>

                <p className="text-center text-[10px] tracking-widest uppercase pt-1" style={{ color: "rgba(255,225,140,0.65)" }}>
                  Descarga inmediata · Pago único · Sin suscripción
                </p>
              </motion.div>

              {/* Footer note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 7.5 }}
                className="mt-10 pt-6 border-t text-center"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}
              >
                <p className="text-[11px] tracking-wide leading-relaxed max-w-sm mx-auto italic" style={{ color: "rgba(255,232,160,0.68)" }}>
                  "No importa cuán dañado parezca el edificio de tu vida; mientras el código base sea legible, la reconstrucción es posible."
                </p>
                <p className="text-[10px] tracking-widest mt-2" style={{ color: "rgba(212,175,55,0.75)" }}>— El Bachir Chekhad</p>
                <div className="mt-5">
                  <Link href="/">
                    <span className="text-[11px] tracking-widest uppercase cursor-pointer font-mono transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#d4af37")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                      ← Volver al inicio
                    </span>
                  </Link>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
