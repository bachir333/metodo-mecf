import { Link, useParams } from "wouter";
import SeoHead from "@/components/SeoHead";

const STEPS: Record<string, {
  num: string;
  slug: string;
  icon: string;
  title: string;
  tagline: string;
  intro: string;
  blocks: { heading: string; body: string }[];
  highlight: string;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}> = {
  "datos": {
    num: "01",
    slug: "datos",
    icon: "◈",
    title: "Introduce tus datos de nacimiento",
    tagline: "El origen de tu código",
    intro: "La fecha y el lugar de nacimiento no son datos anecdóticos. Son las coordenadas exactas desde las que el Método MECF calcula tu voltaje, tu firmware y toda la estructura de tu árbol biográfico.",
    blocks: [
      {
        heading: "¿Qué datos necesitas introducir?",
        body: "El protocolo te pide la fecha completa (día, mes, año), el lugar de nacimiento (ciudad y país) y, si contratas un análisis familiar, los datos de cada miembro que quieras incluir. No necesitas documentos. Solo los datos que ya tienes de memoria.",
      },
      {
        heading: "¿Por qué la fecha y el lugar importan tanto?",
        body: "El voltaje Tesla (3·6·9) de una persona se extrae directamente de su fecha de nacimiento mediante la secuencia MECF. El lugar determina la zona horaria y el meridiano energético en el que ese voltaje se activó. Sin coordenadas exactas, el análisis no puede distinguir los patrones reales de los genéricos.",
      },
      {
        heading: "¿Se pueden analizar varias personas?",
        body: "Sí. Algunos módulos incluyen el análisis de pareja, familia nuclear o núcleo empresarial. El sistema calcula los voltajes de todos los miembros, los compara y detecta las dinámicas de sistema que generan los patrones relacionales que estás observando.",
      },
      {
        heading: "¿Cuánto tarda el cálculo?",
        body: "El cálculo MECF es automático. En cuanto introduces los datos y confirmas el pago, el sistema procesa los códigos y genera tu informe PDF en segundos. No hay espera ni intervención manual.",
      },
    ],
    highlight: "El sistema no interpreta. Calcula. La diferencia es técnica.",
    prev: null,
    next: { slug: "pago", title: "Paga una sola vez" },
  },
  "pago": {
    num: "02",
    slug: "pago",
    icon: "◇",
    title: "Paga una sola vez",
    tagline: "Acceso completo, sin condiciones",
    intro: "El Método MECF no es una suscripción ni un servicio recurrente. Pagas una vez y recibes el análisis completo que el protocolo genera para tu código específico. Sin renovaciones, sin sorpresas.",
    blocks: [
      {
        heading: "¿Cuánto cuesta?",
        body: "El acceso al protocolo parte desde 24,99€ para el análisis individual. Los módulos de pareja o familia tienen un precio diferente según el número de perfiles incluidos. Todos los precios están publicados en la página de módulos sin letra pequeña.",
      },
      {
        heading: "¿Qué incluye ese pago?",
        body: "El informe PDF completo de 20 a 40 páginas, con tu código MECF, tus ciclos biográficos hasta 2032, tus nodos de expansión y los patrones de software que estás operando en este momento. Es todo lo que el protocolo puede calcular con los datos que introduces. No hay versión 'premium' bloqueada detrás de otro pago.",
      },
      {
        heading: "¿El pago es seguro?",
        body: "El proceso de pago está gestionado por Stripe, el estándar de la industria para pagos online. Tus datos bancarios nunca pasan por nuestros servidores. Una vez confirmado el pago, el informe se genera y se envía de forma automática.",
      },
      {
        heading: "¿Y si no me aporta claridad?",
        body: "El riesgo es nuestro. Si recibes el informe y sientes que no te aporta información técnica real sobre tus patrones, escríbenos y te devolvemos el importe sin preguntas. No pedimos justificaciones. El método confía en su propio resultado.",
      },
    ],
    highlight: "Pago único. Informe permanente. Sin letra pequeña.",
    prev: { slug: "datos", title: "Introduce tus datos de nacimiento" },
    next: { slug: "informe", title: "Descarga tu informe PDF" },
  },
  "informe": {
    num: "03",
    slug: "informe",
    icon: "◉",
    title: "Descarga tu informe PDF",
    tagline: "Tu diagnóstico técnico completo",
    intro: "El informe MECF no es un texto genérico con tu signo o tu número de vida. Es un documento técnico de entre 20 y 40 páginas generado específicamente para tus códigos, calculado desde tu fecha y lugar de nacimiento exactos.",
    blocks: [
      {
        heading: "¿Qué contiene el informe?",
        body: "El protocolo genera: tu Voltaje MECF (el patrón base desde el que operas), tu Firmware (el sistema operativo que condiciona tu interpretación de la realidad), tu Árbol Biográfico (la estructura de programas heredados que estás ejecutando), tus Nodos de Expansión (las ventanas de intervención identificadas en tu código), y tus Ciclos Biográficos proyectados hasta 2032.",
      },
      {
        heading: "¿Cuántas páginas son y cómo está estructurado?",
        body: "Entre 20 y 40 páginas según el módulo contratado. El documento está dividido en secciones numeradas, con una explicación técnica por cada capa del sistema MECF. Cada sección incluye el dato calculado, su lectura técnica y su aplicación práctica en tu contexto biográfico actual.",
      },
      {
        heading: "¿En qué formato está y cómo lo recibo?",
        body: "El informe se entrega en PDF de alta calidad, compatible con todos los dispositivos (móvil, tableta, ordenador) y con cualquier lector de PDF. Lo recibes en el correo electrónico que introdujiste al hacer el pago, y también puedes descargarlo directamente desde la confirmación de compra.",
      },
      {
        heading: "¿Puedo compartirlo o imprimirlo?",
        body: "Sí. El PDF no tiene restricciones de uso. Puedes imprimirlo, compartirlo con tu pareja o terapeuta, o guardarlo para consultarlo en cualquier momento. El análisis no caduca — los códigos calculados son permanentes.",
      },
    ],
    highlight: "20-40 páginas de análisis técnico específico para tu código. No para un arquetipo genérico.",
    prev: { slug: "pago", title: "Paga una sola vez" },
    next: null,
  },
};

const ALL_SLUGS = ["datos", "pago", "informe"];

function GoldRule() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="h-px flex-1" style={{ background: "linear-gradient(to right, #d4af37, transparent)" }} />
      <span style={{ color: "#d4af37", fontSize: 9 }}>◆</span>
      <div className="h-px flex-1" style={{ background: "linear-gradient(to left, #d4af37, transparent)" }} />
    </div>
  );
}

export default function ComoFuncionaDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const step = STEPS[slug ?? ""];

  if (!step) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-mono text-primary text-sm tracking-widest">PASO NO ENCONTRADO</p>
          <Link href="/"><span className="underline text-white/60 text-sm cursor-pointer">← Volver al inicio</span></Link>
        </div>
      </div>
    );
  }

  const seoMap: Record<string, { title: string; desc: string }> = {
    datos: {
      title: "Cómo funciona: Introduce tus datos de nacimiento | Método MECF",
      desc: "El Método MECF calcula tu voltaje, firmware y árbol biográfico a partir de tu fecha y lugar de nacimiento. Descubre qué datos necesitas y por qué son exactos.",
    },
    pago: {
      title: "Cómo funciona: Pago único sin suscripción | Método MECF",
      desc: "El Método MECF es un pago único desde 24,99€. Recibe tu informe PDF completo sin renovaciones ni sorpresas. Garantía de devolución.",
    },
    informe: {
      title: "Cómo funciona: Descarga tu informe PDF | Método MECF",
      desc: "Tu informe MECF de 20-40 páginas llega en minutos por email: código MECF, ciclos hasta 2032, nodos de expansión y patrones activos.",
    },
  };
  const seo = seoMap[step.slug] ?? {
    title: `${step.title} | Método MECF`,
    desc: step.intro,
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-black">
      <SeoHead
        title={seo.title}
        description={seo.desc}
        canonical={`/como-funciona/${step.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "HowToStep",
          "name": step.title,
          "text": step.intro,
          "url": `https://metodomecf.com/como-funciona/${step.slug}`
        }}
      />

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-primary/10 bg-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <span className="font-serif font-bold text-lg tracking-widest text-primary cursor-pointer hover:opacity-80 transition-opacity">MECF</span>
          </Link>
          <div className="flex items-center gap-3">
            {ALL_SLUGS.map(s => (
              <Link key={s} href={`/como-funciona/${s}`}>
                <span
                  className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1.5 border transition-all cursor-pointer"
                  style={{
                    borderColor: s === slug ? "#d4af37" : "rgba(212,175,55,0.18)",
                    color: s === slug ? "#d4af37" : "rgba(255,255,255,0.35)",
                    background: s === slug ? "rgba(212,175,55,0.08)" : "transparent",
                  }}
                >
                  {STEPS[s].num}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.09) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span
              className="font-mono text-[10px] tracking-[0.35em] uppercase border px-3 py-1.5"
              style={{ borderColor: "rgba(212,175,55,0.35)", color: "rgba(212,175,55,0.7)" }}
            >
              Paso {step.num}
            </span>
            <span style={{ color: "#d4af37", fontSize: 20 }}>{step.icon}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
            {step.title}
          </h1>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: "rgba(212,175,55,0.65)" }}>
            — {step.tagline} —
          </p>
          <GoldRule />
          <p className="text-white/82 text-lg font-light leading-relaxed mt-6">
            {step.intro}
          </p>
        </div>
      </section>

      {/* ── CONTENT BLOCKS ── */}
      <section className="py-16 border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          {step.blocks.map((b, i) => (
            <div
              key={i}
              className="p-7 border"
              style={{ background: "rgba(212,175,55,0.03)", borderColor: "rgba(212,175,55,0.14)" }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="shrink-0 font-mono text-[10px] font-bold mt-0.5"
                  style={{ color: "rgba(212,175,55,0.5)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-lg text-white mb-3">{b.heading}</h3>
                  <p className="text-white/78 font-light leading-relaxed">{b.body}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Highlight quote */}
          <div
            className="p-7 relative overflow-hidden"
            style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.28)", borderLeft: "3px solid #d4af37" }}
          >
            <div className="font-serif font-bold leading-none mb-2 select-none" style={{ fontSize: 44, color: "rgba(212,175,55,0.15)", lineHeight: 1 }}>"</div>
            <p className="text-white/90 text-[15px] font-light leading-relaxed italic -mt-2">
              {step.highlight}
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 border-t border-primary/10 text-center">
        <div className="max-w-xl mx-auto px-6 space-y-5">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: "rgba(212,175,55,0.6)" }}>
            — Accede al protocolo —
          </p>
          <h2 className="text-2xl font-serif font-bold">
            Listo para calcular tu código MECF
          </h2>
          <Link href="/protocolo">
            <span className="inline-block mt-2 bg-primary text-black font-mono font-bold px-10 py-4 uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 cursor-pointer">
              Elegir mi módulo →
            </span>
          </Link>
        </div>
      </section>

      {/* ── PREV / NEXT ── */}
      <div className="border-t border-primary/10 bg-black">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-2">

            {/* Prev */}
            <div>
              {step.prev ? (
                <Link href={`/como-funciona/${step.prev.slug}`}>
                  <div className="group flex items-center gap-4 py-7 pr-6 border-r border-primary/10 cursor-pointer">
                    <span className="text-white/30 group-hover:text-primary transition-colors text-xl">←</span>
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/28 group-hover:text-white/45 transition-colors">Anterior</p>
                      <p className="text-white/70 text-sm group-hover:text-white transition-colors mt-0.5">{step.prev.title}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link href="/">
                  <div className="group flex items-center gap-4 py-7 pr-6 border-r border-primary/10 cursor-pointer">
                    <span className="text-white/30 group-hover:text-primary transition-colors text-xl">←</span>
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/28 group-hover:text-white/45 transition-colors">Inicio</p>
                      <p className="text-white/70 text-sm group-hover:text-white transition-colors mt-0.5">metodomecf.com</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* Next */}
            <div>
              {step.next ? (
                <Link href={`/como-funciona/${step.next.slug}`}>
                  <div className="group flex items-center justify-end gap-4 py-7 pl-6 cursor-pointer">
                    <div className="text-right">
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/28 group-hover:text-white/45 transition-colors">Siguiente</p>
                      <p className="text-white/70 text-sm group-hover:text-white transition-colors mt-0.5">{step.next.title}</p>
                    </div>
                    <span className="text-white/30 group-hover:text-primary transition-colors text-xl">→</span>
                  </div>
                </Link>
              ) : (
                <Link href="/protocolo">
                  <div className="group flex items-center justify-end gap-4 py-7 pl-6 cursor-pointer">
                    <div className="text-right">
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/28 group-hover:text-white/45 transition-colors">Siguiente paso</p>
                      <p className="text-white/70 text-sm group-hover:text-white transition-colors mt-0.5">Elegir módulo</p>
                    </div>
                    <span className="text-white/30 group-hover:text-primary transition-colors text-xl">→</span>
                  </div>
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="py-6 border-t border-primary/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="font-serif font-bold text-primary tracking-widest text-sm">MECF</div>
          <p className="text-xs font-mono text-white/35">
            &copy; {new Date().getFullYear()} El Bachir Chekhad · metodomecf.com
          </p>
          <div className="flex items-center gap-4">
            <Link href="/quienes-somos"><span className="text-xs font-mono text-white/35 hover:text-primary transition-colors cursor-pointer">Quiénes somos</span></Link>
            <Link href="/contacto"><span className="text-xs font-mono text-white/35 hover:text-primary transition-colors cursor-pointer">Contacto</span></Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
