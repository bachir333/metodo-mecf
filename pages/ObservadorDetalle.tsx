import { useEffect } from "react";
import { Link, useParams } from "wouter";
import SeoHead from "@/components/SeoHead";

type Concepto = {
  slug: string;
  eyebrow: string;
  title: string;
  tagline: string;
  vs: { label: string; text: string };
  mecf: { label: string; text: string };
  body: { heading: string; paragraphs: string[] }[];
  cierre: string;
  prev: string | null;
  next: string | null;
};

const CONCEPTOS: Concepto[] = [
  {
    slug: "voltaje",
    eyebrow: "Concepto MECF · 01 / 05",
    title: "Tu sistema usa la lógica del Voltaje 3",
    tagline: "No eres tu eneatipo. Eres un sistema operando bajo una frecuencia específica que tiene su propia lógica interna.",
    vs: {
      label: "Lo que dice el eneatipo",
      text: "El eneatipo te asigna una identidad fija: «Eres un 4». A partir de ahí, tu psicología, tus miedos y tus virtudes quedan encapsulados en un perfil estático. El problema es que te metes dentro del sistema. Te conviertes en la etiqueta.",
    },
    mecf: {
      label: "Lo que dice el MECF",
      text: "El Voltaje no es lo que eres — es la frecuencia con la que tu sistema procesa la realidad. Un Voltaje 3 genera ciclos de reconocimiento, estructura y logro. Pero tú puedes observar esa lógica desde fuera, modificarla y usarla a tu favor.",
    },
    body: [
      {
        heading: "¿Qué es el Voltaje?",
        paragraphs: [
          "El Voltaje es el número que resulta de sumar las cifras de tu fecha de nacimiento hasta obtener un dígito entre 1 y 9. No es numerología tradicional — es la frecuencia base con la que tu sistema biográfico organiza la experiencia.",
          "Cada Voltaje tiene un patrón de activación, un arquetipo funcional, un don natural y una herida activa. Son los parámetros del sistema, no la definición de quien eres.",
        ],
      },
      {
        heading: "La diferencia con el eneatipo",
        paragraphs: [
          "El eneatipo te convierte en el contenido: «Soy un perfeccionista». El Voltaje describe el contenedor: «Mi sistema busca la estructura como mecanismo de seguridad». Desde fuera del sistema, puedes elegir cuándo activar esa búsqueda y cuándo no.",
          "El observador — tú — siempre está por encima del Voltaje. El MECF te enseña a leer el mapa sin confundirte con él.",
        ],
      },
      {
        heading: "Cómo trabaja el MECF con tu Voltaje",
        paragraphs: [
          "El Protocolo Individual del MECF calcula tu Voltaje, identifica tu arquetipo y mapea los nodos biográficos donde esa frecuencia se activó con mayor intensidad. En cada nodo encontrarás patrones repetidos — no por destino, sino porque el sistema usa siempre la misma lógica.",
          "Una vez que ves el patrón, dejas de repetirlo inconscientemente. Eso es la actualización del sistema.",
        ],
      },
    ],
    cierre: "Tu Voltaje es el punto de partida del protocolo — no tu límite.",
    prev: null,
    next: "firmware",
  },
  {
    slug: "firmware",
    eyebrow: "Concepto MECF · 02 / 05",
    title: "Tu firmware opera bajo esa frecuencia",
    tagline: "No eres tu signo solar. Eres un sistema con un firmware instalado que opera en segundo plano, independientemente de lo que creas de ti mismo.",
    vs: {
      label: "Lo que dice la astrología de signo",
      text: "El signo solar te da una personalidad: «Eres Escorpio, eres intenso». La identidad queda fijada al momento del nacimiento y todo tu comportamiento se interpreta desde esa etiqueta cósmica. Eres el sistema.",
    },
    mecf: {
      label: "Lo que dice el MECF",
      text: "El firmware es el conjunto de instrucciones base que el sistema ejecuta automáticamente: creencias heredadas, respuestas condicionadas, programas de supervivencia. Operan en segundo plano. Y como todo firmware — puede actualizarse.",
    },
    body: [
      {
        heading: "¿Qué es el firmware en el contexto MECF?",
        paragraphs: [
          "En un dispositivo electrónico, el firmware es el software de nivel bajo que controla el hardware directamente. En el sistema humano, el firmware equivale a los patrones de respuesta automática instalados durante la infancia y reforzados por el árbol genealógico.",
          "No los eliges conscientemente. Se ejecutan. Por eso sientes que «eres así» cuando en realidad tu sistema hace así.",
        ],
      },
      {
        heading: "Firmware vs. signo solar",
        paragraphs: [
          "El signo solar describe la posición de la Tierra respecto al Sol el día de tu nacimiento. Es un dato astronómico. El firmware MECF describe los programas activos en tu sistema biográfico — cosa mucho más concreta y modificable.",
          "Dos personas con el mismo signo pueden tener firmwares completamente distintos según su árbol genealógico, sus nodos biográficos y su Voltaje. El MECF trabaja con tu sistema específico, no con arquetipos zodiacales universales.",
        ],
      },
      {
        heading: "Cómo se identifica y actualiza el firmware",
        paragraphs: [
          "El Protocolo MECF mapea las instrucciones base del sistema a través del Árbol Genealógico y los Nodos. En ellos encontramos las creencias fundacionales — los «siempre» y los «nunca» que el sistema instaló como verdades.",
          "Identificar el firmware es el primer paso para no obedecerlo ciegamente. El segundo es la instalación de nuevas instrucciones — a través de los 5 pasos del protocolo.",
        ],
      },
    ],
    cierre: "Tu firmware no te define — define cómo has estado operando hasta ahora.",
    prev: "voltaje",
    next: "arbol",
  },
  {
    slug: "arbol",
    eyebrow: "Concepto MECF · 03 / 05",
    title: "Tu árbol ejecuta un programa heredado",
    tagline: "Tu trauma no te define. El árbol genealógico ejecuta programas transgeneracionales que el sistema repite hasta que alguien los observa y los interrumpe.",
    vs: {
      label: "Lo que dice la psicología convencional del trauma",
      text: "«Tu trauma te formó». El evento pasado se convierte en la causa permanente de tu presente. Eres el resultado de lo que te ocurrió. Queda implícito que el pasado tiene más poder que tu capacidad actual de observarlo.",
    },
    mecf: {
      label: "Lo que dice el MECF",
      text: "El árbol genealógico ejecuta programas — lealtades invisibles, misiones transgeneracionales, patrones repetidos en generaciones. No eres el programa. Eres quien puede leerlo, observarlo y decidir si seguir ejecutándolo o no.",
    },
    body: [
      {
        heading: "El árbol como sistema informático",
        paragraphs: [
          "El árbol genealógico MECF no es un árbol de nombres y fechas. Es un mapa de programas activos: misiones no cumplidas, traumas no resueltos, lealtades que el sistema pasa de generación en generación como si fueran órdenes de ejecución.",
          "Cuando repites el patrón de tu abuelo sin haberlo conocido, no es casualidad — es el sistema ejecutando el programa instalado.",
        ],
      },
      {
        heading: "Trauma como dato, no como identidad",
        paragraphs: [
          "El MECF no niega el trauma. Lo reencuadra: el evento traumático es un dato de alta intensidad que el sistema registró y usó para configurar respuestas de supervivencia. Esas respuestas fueron funcionales en su momento. El problema surge cuando el sistema sigue ejecutándolas décadas después, fuera de contexto.",
          "El trabajo del árbol no es «sanar el trauma» en el sentido terapéutico clásico — es identificar qué programa se instaló en ese evento y en qué generación se origina.",
        ],
      },
      {
        heading: "El Protocolo ÁRBOL del MECF",
        paragraphs: [
          "El módulo Árbol del MECF analiza tres generaciones: abuelos paternos, abuelos maternos y padres. Calcula el Voltaje de cada miembro, identifica la polaridad del sistema (campo solar / campo lunar), mapea las resonancias entre los nodos y localiza dónde se originó el programa activo.",
          "Al final del protocolo, el consultante tiene un mapa claro de qué ejecuta, desde dónde viene y qué acción concreta puede interrumpirlo.",
        ],
      },
    ],
    cierre: "Cuando lees el programa del árbol, dejas de ser su ejecución.",
    prev: "firmware",
    next: "nodos",
  },
  {
    slug: "nodos",
    eyebrow: "Concepto MECF · 04 / 05",
    title: "Tus nodos son ventanas, no sentencias",
    tagline: "Tu destino no está escrito. Los nodos biográficos son momentos de alta frecuencia donde el sistema ofrece datos — no predicciones ni condenas.",
    vs: {
      label: "Lo que dice el determinismo astrológico o kármico",
      text: "«Tu carta astral dice que el año X será difícil». El futuro queda fijado en patrones externos — planetas, karma, destino. Eres receptor pasivo de lo que está escrito. La agencia personal desaparece.",
    },
    mecf: {
      label: "Lo que dice el MECF",
      text: "Los nodos son años de tu línea biográfica donde la frecuencia del sistema se eleva. No son predicciones — son ventanas de datos de mayor voltaje. Lo que ocurra en un nodo depende de si lo atraviesas inconsciente o preparado.",
    },
    body: [
      {
        heading: "¿Qué es un nodo biográfico?",
        paragraphs: [
          "El MECF calcula ciclos biográficos a partir de tu fecha de nacimiento. Cada cierto número de años, el sistema entra en un período de mayor activación — un nodo. En esos momentos, las decisiones tienen más peso, los patrones se vuelven más visibles y la capacidad de cambio es mayor.",
          "Un nodo es como una ventana que se abre: puede entrar más luz o más viento, dependiendo de cómo estés posicionado.",
        ],
      },
      {
        heading: "Nodos pasados: datos de archivo",
        paragraphs: [
          "Los nodos ya vividos son el registro histórico del sistema. Cuando ves que en tres nodos consecutivos ocurrió el mismo tipo de evento — una ruptura, un cambio de trabajo, una crisis de salud — no es mala suerte. Es el sistema ejecutando el mismo programa en cada ventana de alta frecuencia.",
          "El análisis retrospectivo de los nodos es una de las herramientas más potentes del MECF porque valida el mapa antes de usarlo hacia el futuro.",
        ],
      },
      {
        heading: "Nodos futuros: preparación consciente",
        paragraphs: [
          "Saber cuándo viene tu próximo nodo no es adivinación — es planificación estratégica del sistema. El MECF te permite entrar en ese período con el programa actualizado: sin los mismos patrones del pasado, con las decisiones alineadas a tu misión de linaje.",
          "La diferencia entre un nodo vivido desde la inconsciencia y uno atravesado desde la observación puede ser de años de trabajo.",
        ],
      },
    ],
    cierre: "El nodo es la ventana. Tú decides qué haces cuando se abre.",
    prev: "arbol",
    next: "actualizacion",
  },
  {
    slug: "actualizacion",
    eyebrow: "Concepto MECF · 05 / 05",
    title: "Tu sistema necesita una actualización",
    tagline: "No estás roto. Tu sistema está ejecutando instrucciones antiguas en un contexto nuevo. La actualización es técnica, no terapéutica.",
    vs: {
      label: "Lo que implica «estás roto»",
      text: "Cuando el problema se define como un defecto interno — «algo está mal en mí» — la solución se convierte en reparación indefinida. El proceso no tiene final claro porque el sistema de creencias asume daño permanente.",
    },
    mecf: {
      label: "Lo que dice el MECF",
      text: "El sistema no está roto — está desactualizado. Ejecuta programas que fueron funcionales en otro contexto. La solución no es terapia de por vida — es identificar el programa obsoleto, comprenderlo y sustituirlo por instrucciones alineadas al presente.",
    },
    body: [
      {
        heading: "El error de diagnóstico",
        paragraphs: [
          "Uno de los mayores bloqueos en el desarrollo personal es el diagnóstico incorrecto: creer que el problema es estructural cuando en realidad es operativo. Un ordenador que ejecuta Windows 95 no está roto — está desactualizado. La solución no es tirarlo, es actualizar el sistema.",
          "Del mismo modo, una persona que repite patrones de escasez, abandono o conflicto no tiene un defecto de fábrica — tiene un firmware instalado en otro contexto que ya no sirve.",
        ],
      },
      {
        heading: "Los 5 pasos de la actualización",
        paragraphs: [
          "El protocolo MECF opera en 5 pasos técnicos: (1) Diagnóstico del sistema — Voltaje, arquetipo, polaridad. (2) Mapa del árbol — programas heredados, misiones transgeneracionales. (3) Análisis de nodos — histórico y proyección. (4) Identificación del firmware activo — creencias, lealtades, respuestas automáticas. (5) Instalación de nuevas instrucciones — acciones concretas alineadas a la misión de linaje.",
          "Cada paso produce un entregable concreto. No es un proceso abierto — es un protocolo con inicio y fin.",
        ],
      },
      {
        heading: "Actualización vs. reparación",
        paragraphs: [
          "La diferencia conceptual es fundamental: reparar implica que algo está dañado y necesita volver a un estado anterior. Actualizar implica que el sistema está bien y necesita instrucciones nuevas para operar en el contexto actual.",
          "El MECF no busca que «superes» tu pasado — busca que lo leas correctamente, extraigas los datos útiles y los uses para instalar una versión mejorada del sistema.",
        ],
      },
    ],
    cierre: "Actualizar el sistema es el acto más técnico — y más liberador — que puedes hacer.",
    prev: "nodos",
    next: null,
  },
];

export default function ObservadorDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const concepto = CONCEPTOS.find((c) => c.slug === slug);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, [slug]);

  if (!concepto) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-mono text-primary text-xs tracking-widest uppercase">Error 404</p>
          <h1 className="text-3xl font-serif font-bold">Concepto no encontrado</h1>
          <Link href="/" className="inline-block font-mono text-xs text-primary hover:underline">← Volver al inicio</Link>
        </div>
      </div>
    );
  }

  const allSlugs = CONCEPTOS.map((c) => c.slug);
  const idx = allSlugs.indexOf(slug ?? "");

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden font-sans" style={{ background: "#080808" }}>
      <SeoHead
        title={`${concepto.title} — El Observador MECF`}
        description={concepto.tagline}
        canonical={`/observador/${concepto.slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": concepto.title,
          "description": concepto.tagline,
          "url": `https://metodomecf.com/observador/${concepto.slug}`,
          "author": { "@type": "Person", "name": "El Bachir Chekhad" },
          "publisher": { "@type": "Organization", "name": "Método MECF", "url": "https://metodomecf.com" }
        }}
      />

      {/* NAV */}
      <header className="fixed top-0 w-full border-b border-white/5 z-50" style={{ background: "rgba(8,8,8,0.92)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-lg tracking-widest" style={{ color: "#d4af37" }}>MECF</Link>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 hidden sm:block">
              La diferencia que cambia todo
            </span>
            <Link href="/" className="font-mono text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">
              ← Volver
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-16 relative">
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,175,55,0.09) 0%, transparent 65%)",
        }} />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: "rgba(212,175,55,0.6)" }}>
              {concepto.eyebrow}
            </span>
            <div className="h-px flex-1" style={{ background: "rgba(212,175,55,0.2)" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white leading-tight">
            {concepto.title}
          </h1>
          <p className="text-lg font-light leading-relaxed text-white/60 border-l-2 pl-5" style={{ borderColor: "#d4af37" }}>
            {concepto.tagline}
          </p>
        </div>
      </section>

      {/* VS BLOCK */}
      <section className="pb-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-sm" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-white/25 font-bold text-sm">✕</span>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/35">{concepto.vs.label}</span>
              </div>
              <p className="text-white/55 text-sm font-light leading-relaxed">{concepto.vs.text}</p>
            </div>
            <div className="p-6 rounded-sm" style={{ background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.25)" }}>
              <div className="flex items-center gap-2 mb-4">
                <span style={{ color: "#d4af37", fontSize: 11 }}>◆</span>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(212,175,55,0.7)" }}>{concepto.mecf.label}</span>
              </div>
              <p className="text-white text-sm font-light leading-relaxed">{concepto.mecf.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-12">
            {concepto.body.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-serif font-bold text-white mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-white/65 font-light leading-relaxed text-[15px]">{p}</p>
                  ))}
                </div>
                {i < concepto.body.length - 1 && (
                  <div className="mt-10 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                )}
              </div>
            ))}
          </div>

          {/* CIERRE */}
          <div className="mt-14 p-8 text-center" style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.2)" }}>
            <p className="text-white text-xl font-serif font-light italic leading-relaxed">
              "{concepto.cierre}"
            </p>
            <p className="mt-4 font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: "rgba(212,175,55,0.5)" }}>
              MÉTODO MECF — EL BACHIR CHEKHAD
            </p>
          </div>
        </div>
      </section>

      {/* NAV ENTRE CONCEPTOS */}
      <section className="border-t border-white/5 py-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-between gap-4">
            {concepto.prev ? (
              <Link
                href={`/observador/${concepto.prev}`}
                className="flex items-center gap-3 group"
              >
                <span className="text-white/30 group-hover:text-white transition-colors text-lg">←</span>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 group-hover:text-white/40 transition-colors">Anterior</p>
                  <p className="text-white/60 text-sm group-hover:text-white transition-colors mt-0.5">
                    {CONCEPTOS.find(c => c.slug === concepto.prev)?.title.split(" ").slice(0, 5).join(" ")}…
                  </p>
                </div>
              </Link>
            ) : <div />}

            {/* Dots */}
            <div className="flex items-center gap-2">
              {CONCEPTOS.map((c, i) => (
                <Link key={c.slug} href={`/observador/${c.slug}`}>
                  <div
                    className="rounded-full transition-all"
                    style={{
                      width: c.slug === slug ? 20 : 6,
                      height: 6,
                      background: c.slug === slug ? "#d4af37" : "rgba(255,255,255,0.15)",
                    }}
                  />
                </Link>
              ))}
            </div>

            {concepto.next ? (
              <Link
                href={`/observador/${concepto.next}`}
                className="flex items-center gap-3 group text-right"
              >
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 group-hover:text-white/40 transition-colors">Siguiente</p>
                  <p className="text-white/60 text-sm group-hover:text-white transition-colors mt-0.5">
                    {CONCEPTOS.find(c => c.slug === concepto.next)?.title.split(" ").slice(0, 5).join(" ")}…
                  </p>
                </div>
                <span className="text-white/30 group-hover:text-white transition-colors text-lg">→</span>
              </Link>
            ) : (
              <Link href="/#obtener" className="flex items-center gap-3 group text-right">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 group-hover:text-white/40 transition-colors">Siguiente paso</p>
                  <p className="font-mono text-sm font-bold group-hover:text-white transition-colors mt-0.5" style={{ color: "#d4af37" }}>
                    Obtener acceso →
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
