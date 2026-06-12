import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import SeoHead from "@/components/SeoHead";

const QUESTIONS = [
  {
    q: "¿En qué área sientes el bloqueo principal?",
    opts: [
      { label: "Dinero y abundancia", val: "dinero", icon: "◆" },
      { label: "Relaciones y vínculos", val: "relaciones", icon: "◈" },
      { label: "Salud y energía vital", val: "salud", icon: "◉" },
      { label: "Propósito y dirección", val: "proposito", icon: "◇" },
    ],
  },
  {
    q: "¿Con qué frecuencia saboteas tus propios avances?",
    opts: [
      { label: "Casi siempre — justo cuando estoy cerca", val: "siempre", icon: "◆" },
      { label: "A veces — reconozco el patrón", val: "aveces", icon: "◈" },
      { label: "Raramente — pero algo me frena", val: "raramente", icon: "◉" },
      { label: "No lo sé — eso es el problema", val: "nosabe", icon: "◇" },
    ],
  },
  {
    q: "¿Cómo describes tu relación con tu historia familiar?",
    opts: [
      { label: "Pesada — cargo con algo que no elegí", val: "pesada", icon: "◆" },
      { label: "Desconectada — no me identifico con ella", val: "desconectada", icon: "◈" },
      { label: "Siento que repito sus patrones", val: "repite", icon: "◉" },
      { label: "Nunca lo había pensado así", val: "nova", icon: "◇" },
    ],
  },
  {
    q: "¿Cuándo tomas decisiones importantes, qué ocurre?",
    opts: [
      { label: "Me bloqueo y dejo que otros decidan", val: "bloqueo", icon: "◆" },
      { label: "Decido rápido pero me arrepiento", val: "arrepiento", icon: "◈" },
      { label: "Lo analizo tanto que pierdo la oportunidad", val: "analizo", icon: "◉" },
      { label: "Actúo, pero noto que no es del todo mío", val: "actuo", icon: "◇" },
    ],
  },
  {
    q: "¿Qué describe mejor tu situación ahora mismo?",
    opts: [
      { label: "Estoy estancado/a y no sé por qué", val: "estancado", icon: "◆" },
      { label: "Tengo todo pero algo falta", val: "falta", icon: "◈" },
      { label: "Voy bien, quiero acelerar", val: "acelerar", icon: "◉" },
      { label: "Estoy en un momento de cambio importante", val: "cambio", icon: "◇" },
    ],
  },
];

const PROFILES: Record<string, {
  title: string; desc: string; modulo: string; moduloKey: string; badge: string;
  price: string; includes: string[]; urgency: string;
}> = {
  dinero: {
    badge: "CÓDIGO FINANCIERO BLOQUEADO",
    title: "OPERADOR BLOQUEADO",
    desc: "Tu sistema biográfico tiene activo un techo financiero heredado. No es tu capacidad — es un límite instalado antes de que tuvieras voz. El Módulo Individual MECF localiza exactamente en qué nodo cronológico se instaló ese techo y cuándo tienes la próxima ventana para romperlo.",
    modulo: "MÓDULO INDIVIDUAL",
    moduloKey: "INDIVIDUAL",
    price: "24,99€",
    includes: [
      "Tu código de origen decodificado",
      "5 nodos cronológicos 2026–2032 con fechas exactas",
      "Identificación del techo financiero heredado",
      "Patrones de sabotaje recurrente activos",
      "Ventanas de intervención para romper el ciclo",
      "PDF descargable en minutos",
    ],
    urgency: "El nodo de ruptura más próximo en tu sistema se activa en 2026.",
  },
  relaciones: {
    badge: "MEMORIA RELACIONAL ACTIVA",
    title: "CONECTOR EN CICLO CERRADO",
    desc: "Tus relaciones siguen el mismo guión porque están operando desde una memoria familiar, no desde tu elección real. El Módulo Árbol Genealógico decodifica las lealtades invisibles que están definiendo tus vínculos hoy.",
    modulo: "MÓDULO ÁRBOL GENEALÓGICO",
    moduloKey: "ÁRBOL",
    price: "49,99€",
    includes: [
      "Análisis transgeneracional de 3 generaciones",
      "Lealtades invisibles identificadas por línea",
      "Memorias relacionales repetitivas mapeadas",
      "Programas heredados activos en tus vínculos",
      "Ventanas de desactivación del ciclo cerrado",
      "PDF descargable en minutos",
    ],
    urgency: "Tu ciclo relacional actual tiene un punto de quiebre navegable antes de 2027.",
  },
  salud: {
    badge: "CARGA BIOGRÁFICA ACUMULADA",
    title: "SISTEMA BAJO CARGA ACUMULADA",
    desc: "La energía vital no se pierde por azar. Se desvía cuando el sistema biográfico está ejecutando programas en paralelo que consumen recursos. El Módulo Individual identifica qué ciclo está drenando tu campo energético en 2026.",
    modulo: "MÓDULO INDIVIDUAL",
    moduloKey: "INDIVIDUAL",
    price: "24,99€",
    includes: [
      "Tu código de origen decodificado",
      "Ciclos de carga acumulada identificados",
      "5 nodos cronológicos 2026–2032 con fechas exactas",
      "Patrones de agotamiento sistémico mapeados",
      "Ventanas de recuperación y descarga productiva",
      "PDF descargable en minutos",
    ],
    urgency: "El sistema no se descarga solo — hay una ventana activa antes de que el ciclo cierre.",
  },
  proposito: {
    badge: "VECTOR SIN CALIBRAR",
    title: "VECTOR SIN CALIBRAR",
    desc: "Sabes que hay algo más — eso ya lo tienes claro. Lo que no tienes es el mapa. El Método MECF calcula tu vector de expansión real y las fechas concretas en que ese vector tiene máxima potencia entre 2026 y 2032.",
    modulo: "MÓDULO INDIVIDUAL",
    moduloKey: "INDIVIDUAL",
    price: "24,99€",
    includes: [
      "Tu código de origen decodificado",
      "Vector de expansión real calculado",
      "5 nodos de máxima potencia 2026–2032",
      "Patrones de sabotaje del propósito identificados",
      "Ventanas óptimas para decisiones de dirección",
      "PDF descargable en minutos",
    ],
    urgency: "Tu vector tiene su próxima ventana de máxima potencia en 2026–2027.",
  },
};

function getProfile(answers: string[]) {
  return PROFILES[answers[0]] ?? PROFILES.dinero;
}

type Stage = "quiz" | "email" | "result";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const [stage, setStage] = useState<Stage>("quiz");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  const choose = (val: string) => setSelected(val);

  const next = () => {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected("");
    setDirection(1);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setStage("email");
    }
  };

  const submitEmail = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Introduce un email válido.");
      return;
    }
    setEmailError("");
    setSubmitted(true);
    const p = getProfile(answers);
    setStage("result");
    fetch("/api/quiz-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, badge: p.badge, title: p.title, desc: p.desc, modulo: p.modulo, moduloKey: p.moduloKey }),
    }).catch(() => {});
  };

  const skipEmail = () => setStage("result");

  const profile = stage === "result" ? getProfile(answers) : null;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <SeoHead
        title="Test MECF — Descubre qué patrón está bloqueando tu sistema"
        description="Responde 5 preguntas y descubre cuál de los patrones MECF está limitando tu sistema ahora mismo. Quiz gratuito — resultado inmediato con tu perfil técnico."
        canonical="/quiz"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Quiz",
          "name": "Test MECF — Diagnóstico de patrones biográficos",
          "description": "Quiz gratuito para identificar qué patrón MECF está bloqueando tu sistema",
          "url": "https://metodomecf.com/quiz",
          "author": { "@type": "Person", "name": "El Bachir Chekhad" }
        }}
      />

      <header className="fixed top-0 w-full border-b border-white/5 bg-background/90 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-lg tracking-widest text-primary">MECF</Link>
          <Link href="/" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            ← Volver
          </Link>
        </div>
      </header>

      <section className="pt-32 pb-24 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 70%)" }} />

        <div className="max-w-2xl mx-auto px-6 relative z-10">

          {/* ── PREGUNTAS ── */}
          {stage === "quiz" && (
            <div className="overflow-hidden">
              {/* Progress */}
              <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4">
                  Diagnóstico · {step + 1} de {QUESTIONS.length}
                </p>
                <div className="flex gap-1.5 justify-center mb-1">
                  {QUESTIONS.map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-0.5 w-10 rounded-full"
                      animate={{ background: i <= step ? "hsl(43,74%,49%)" : "rgba(212,175,55,0.15)" }}
                      transition={{ duration: 0.4 }}
                    />
                  ))}
                </div>
              </motion.div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="text-2xl md:text-3xl font-serif font-bold leading-snug mb-8 text-center">
                    {QUESTIONS[step].q}
                  </h1>

                  <div className="space-y-3 mb-8">
                    {QUESTIONS[step].opts.map((opt, oi) => (
                      <motion.button
                        key={opt.val}
                        onClick={() => choose(opt.val)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: oi * 0.06 }}
                        className="w-full text-left p-5 border transition-all duration-200 flex items-center gap-4 group"
                        style={{
                          borderColor: selected === opt.val ? "hsl(43,74%,49%)" : "rgba(212,175,55,0.15)",
                          background: selected === opt.val ? "rgba(212,175,55,0.07)" : "transparent",
                        }}
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className="w-5 h-5 shrink-0 flex items-center justify-center transition-all duration-200 font-mono text-xs"
                          style={{
                            border: `1px solid ${selected === opt.val ? "hsl(43,74%,49%)" : "rgba(212,175,55,0.3)"}`,
                            color: selected === opt.val ? "hsl(43,74%,49%)" : "rgba(212,175,55,0.3)",
                            background: selected === opt.val ? "rgba(212,175,55,0.1)" : "transparent",
                          }}
                        >
                          {selected === opt.val ? "✓" : opt.icon}
                        </div>
                        <span className="font-light text-sm text-white/80 group-hover:text-white transition-colors">
                          {opt.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    onClick={next}
                    disabled={!selected}
                    className="w-full py-4 font-mono font-bold text-sm uppercase tracking-widest text-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ background: "hsl(43,74%,49%)" }}
                    whileHover={selected ? { scale: 1.02, filter: "brightness(1.1)" } : {}}
                    whileTap={selected ? { scale: 0.98 } : {}}
                  >
                    {step < QUESTIONS.length - 1 ? "Siguiente →" : "Ver mi diagnóstico →"}
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* ── CAPTURA DE EMAIL ── */}
          {stage === "email" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="border border-primary/30 bg-zinc-950 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="p-8 md:p-10 space-y-6 text-center">
                <div>
                  <motion.div
                    className="text-5xl font-serif text-primary/20 font-bold mb-4"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    ◆
                  </motion.div>
                  <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4">
                    — Tu diagnóstico está listo —
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3">
                    ¿Dónde enviamos tu perfil completo?
                  </h2>
                  <p className="text-white/60 text-sm font-light">
                    Introduce tu email y recibe también recursos adicionales sobre tu código MECF. Sin spam, sin trucos.
                  </p>
                </div>

                <div className="space-y-3 text-left">
                  <label className="font-mono text-xs uppercase tracking-widest text-primary font-bold block">Tu email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setEmailError(""); }}
                    placeholder="nombre@email.com"
                    className="w-full bg-black border-2 border-primary/40 text-white font-mono text-base px-4 py-3 focus:border-primary focus:outline-none transition-colors placeholder:text-white/20"
                  />
                  {emailError && <p className="font-mono text-xs text-red-400">{emailError}</p>}
                </div>

                <motion.button
                  onClick={submitEmail}
                  className="w-full py-4 font-mono font-bold text-sm uppercase tracking-widest text-black shadow-[0_10px_30px_rgba(212,175,55,0.25)]"
                  style={{ background: "hsl(43,74%,49%)" }}
                  whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Ver mi diagnóstico →
                </motion.button>

                <button
                  onClick={skipEmail}
                  className="w-full font-mono text-[10px] tracking-widest uppercase text-white/30 hover:text-white transition-colors py-2"
                >
                  Continuar sin email
                </button>
              </div>
            </motion.div>
          )}

          {/* ── RESULTADO ── */}
          {stage === "result" && profile && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="border border-primary/30 bg-background relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-primary/40" />
              <div className="p-8 md:p-10 space-y-7">

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary/10 border border-primary/20 px-4 py-3 font-mono text-xs text-primary/80 tracking-widest"
                  >
                    ✓ Diagnóstico enviado a {email}
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-primary/50 block mb-2">
                    Diagnóstico completado · Perfil detectado
                  </span>
                  <motion.span
                    className="font-mono text-[9px] tracking-[0.3em] uppercase bg-primary/15 text-primary border border-primary/30 px-3 py-1 inline-block mb-4"
                    animate={{ borderColor: ["rgba(212,175,55,0.3)", "rgba(212,175,55,0.7)", "rgba(212,175,55,0.3)"] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    {profile.badge}
                  </motion.span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">{profile.title}</h2>
                </motion.div>

                <div className="h-px bg-primary/15" />

                <motion.p
                  className="text-white/70 font-light text-sm leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {profile.desc}
                </motion.p>

                <motion.div
                  className="bg-black border border-primary/25 overflow-hidden"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-primary/10 border-b border-primary/20 px-5 py-3 flex items-center justify-between">
                    <p className="font-mono text-[9px] tracking-widest uppercase text-primary/60">Módulo recomendado para tu perfil</p>
                    <span className="font-mono font-bold text-primary text-base">{profile.price}</span>
                  </div>
                  <div className="px-5 py-4">
                    <p className="font-mono text-sm font-bold text-primary mb-4">{profile.modulo}</p>
                    <ul className="space-y-2">
                      {profile.includes.map((item, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3 text-white/60 text-xs font-light"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.35 + i * 0.06 }}
                        >
                          <span className="text-primary mt-0.5 shrink-0">✓</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-3 bg-primary/5 border border-primary/15 px-4 py-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <span className="text-primary text-xs mt-0.5 shrink-0">◈</span>
                  <p className="font-mono text-[10px] tracking-wide text-primary/70 leading-relaxed">{profile.urgency}</p>
                </motion.div>

                <motion.div
                  className="space-y-3 pt-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link href={`/protocolo?modulo=${profile.moduloKey}`}>
                    <motion.div
                      className="block w-full py-4 text-center font-mono font-bold text-sm uppercase tracking-widest text-black bg-primary cursor-pointer shadow-[0_10px_40px_rgba(212,175,55,0.25)]"
                      whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Activar mi {profile.modulo} — {profile.price} →
                    </motion.div>
                  </Link>
                  <p className="text-center font-mono text-[9px] tracking-wider text-white/55">
                    Descarga inmediata · Pago seguro · Sin suscripción
                  </p>
                  <Link href="/"
                    className="block w-full font-mono text-[10px] tracking-widest uppercase text-primary/25 hover:text-primary/60 transition-colors py-2 text-center">
                    ← Volver al inicio
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}

        </div>
      </section>
    </div>
  );
}
