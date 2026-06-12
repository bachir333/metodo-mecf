import { useEffect } from "react";
import { Link, useParams } from "wouter";
import SeoHead from "@/components/SeoHead";

interface Fase {
  slug: string;
  num: string;
  roman: string;
  title: string;
  tagline: string;
  intro: string;
  bloques: { titulo: string; texto: string }[];
  highlight: string;
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

const FASES: Record<string, Fase> = {
  diagnostico: {
    slug: "diagnostico",
    num: "01",
    roman: "I",
    title: "Diagnóstico",
    tagline: "Identificamos los nodos cronológicos de tu trayectoria",
    intro:
      "Antes de intervenir, el sistema necesita leer. El Diagnóstico MECF no es una evaluación subjetiva — es un cálculo. A partir de tu fecha de nacimiento, el protocolo extrae los nodos cronológicos que marcan tu trayectoria: las fechas exactas en las que los ciclos se activan, los patrones que se repiten con precisión matemática y el voltaje real desde el que operas.",
    bloques: [
      {
        titulo: "¿Qué son los nodos cronológicos?",
        texto:
          "Un nodo cronológico es una ventana temporal en la que tu campo energético — determinado por la secuencia Tesla 3·6·9 aplicada a tu fecha de nacimiento — alcanza su punto de mayor receptividad. En esas ventanas, el sistema es más permeable al cambio. Fuera de ellas, cualquier intervención consume el doble de energía con la mitad de resultados. El Diagnóstico MECF identifica cuándo son esas ventanas para tu código específico.",
      },
      {
        titulo: "Los patrones que se repiten con precisión matemática",
        texto:
          "La mayoría de las personas sienten que 'siempre les pasa lo mismo': los mismos problemas de pareja, los mismos bloqueos económicos, las mismas crisis en ciclos de 7 o 9 años. Esto no es casualidad ni mala suerte — es la ejecución de un programa. El Diagnóstico localiza qué programa está activo, en qué ciclo te encuentras y cuándo ese ciclo alcanza su punto de inflexión.",
      },
      {
        titulo: "El voltaje Tesla y el hardware biológico",
        texto:
          "Tesla demostró que el universo opera en frecuencias de 3, 6 y 9. Tu fecha de nacimiento contiene una firma vibracional única que el Método MECF decodifica mediante su algoritmo propietario. El resultado es tu Voltaje MECF — el patrón base desde el que operas, el nivel de energía que el sistema asigna a tus ciclos y la frecuencia que tu campo electromagnético emite de forma constante.",
      },
      {
        titulo: "El diagnóstico como el 80% de la solución",
        texto:
          "No puedes modificar lo que no has identificado. El Diagnóstico MECF genera una fotografía técnica completa de tu sistema: los programas activos, los ciclos en curso, las memorias que están operando en tiempo real. Sin ese mapa, cualquier intervención es aleatoria. Con él, cada acción tiene una dirección y un momento óptimo.",
      },
    ],
    highlight:
      "El sistema no interpreta. Calcula. La diferencia entre un horóscopo y el MECF es la misma que entre una predicción y una ecuación.",
    prev: null,
    next: { slug: "decodificacion", title: "Decodificación" },
  },

  decodificacion: {
    slug: "decodificacion",
    num: "02",
    roman: "II",
    title: "Decodificación",
    tagline: "Localizamos las memorias heredadas y los programas de sabotaje",
    intro:
      "Una vez trazado el mapa de tus ciclos, el protocolo desciende a la capa profunda del sistema: las memorias heredadas, los programas de sabotaje instalados por el linaje y las lealtades invisibles que operan en tu conducta sin que lo sepas. La Decodificación es la fase en la que el sistema se vuelve legible — y por tanto, modificable.",
    bloques: [
      {
        titulo: "Las memorias heredadas: el software del linaje",
        texto:
          "Tu cerebro no empieza en blanco. Llega al mundo con un software preinstalado por tu árbol genealógico: traumas no resueltos, mandatos de clan, lealtades a ancestros que no conociste. Estas memorias no son recuerdos — son instrucciones que el sistema nervioso ejecuta de forma automática. 'El dinero es peligroso', 'amar duele', 'no puedes confiar en nadie' — son programas que alguien instaló antes que tú, y que tú estás ejecutando como si fueran tuyos.",
      },
      {
        titulo: "Los programas de sabotaje",
        texto:
          "Un programa de sabotaje es una instrucción que el subconsciente ejecuta para mantenerte dentro de los límites que el sistema familiar considera 'seguros'. Si en tu linaje nadie superó cierto nivel económico, el sistema te frenará justo antes de ese límite — sin que lo decidas conscientemente. Si en tu árbol el éxito trajo consecuencias, tu sistema te impedirá tener éxito. No por falta de capacidad, sino porque el programa es más rápido que tu voluntad.",
      },
      {
        titulo: "Las lealtades invisibles",
        texto:
          "Una lealtad invisible es un vínculo inconsciente con un ancestro o con el clan que te lleva a repetir su destino. Si un bisabuelo fracasó, si una abuela fue abandonada, si un tío nunca pudo prosperar — tu sistema puede estar ejecutando ese patrón en solidaridad con ellos. La Biodecodificación del MECF localiza estos vínculos con precisión: quién instaló el programa, cuándo y qué función de supervivencia cumple.",
      },
      {
        titulo: "El proceso de localización",
        texto:
          "El algoritmo MECF cruza tu Voltaje de nacimiento con los patrones biográficos documentados en tu árbol genealógico. El resultado es un mapa de capas: qué memorias están activas en este ciclo, qué lealtades están operando en este momento y cuáles son los vectores de sabotaje más urgentes de desactivar antes de la próxima ventana de intervención.",
      },
    ],
    highlight:
      "No eres tus patrones. Eres quien los hereda y quien puede decidir dejar de ejecutarlos.",
    prev: { slug: "diagnostico", title: "Diagnóstico" },
    next: { slug: "protocolo", title: "Protocolo" },
  },

  protocolo: {
    slug: "protocolo",
    num: "03",
    roman: "III",
    title: "Protocolo",
    tagline: "Las ventanas exactas de intervención y los vectores de expansión",
    intro:
      "El Protocolo es el resultado final del proceso MECF: un informe técnico de entre 20 y 40 páginas que entrega, con precisión matemática, las ventanas exactas en las que tu sistema es más receptivo al cambio y los vectores de expansión disponibles en tu ciclo activo. No es un documento motivacional — es un mapa de ingeniería personal.",
    bloques: [
      {
        titulo: "Las ventanas exactas de intervención",
        texto:
          "Cada persona tiene nodos cronológicos — momentos en los que el campo energético alcanza su pico de receptividad. Actuar dentro de esas ventanas multiplica el impacto de cualquier decisión: un cambio profesional, una inversión, el inicio de una relación o la ruptura de un patrón. El Protocolo MECF identifica cuándo son esas ventanas para tu código entre 2025 y 2032, con una precisión que ningún método convencional puede ofrecer.",
      },
      {
        titulo: "Los vectores de expansión",
        texto:
          "Un vector de expansión es una dirección de crecimiento que está alineada con tu voltaje real. No todos los caminos tienen el mismo potencial para ti — el MECF identifica cuáles son los que generan menos resistencia y mayor retorno energético en este momento de tu ciclo. Trabajar en la dirección correcta en el momento correcto no requiere más esfuerzo — requiere más precisión.",
      },
      {
        titulo: "El contenido del informe",
        texto:
          "El informe MECF incluye: tu Voltaje de nacimiento (la firma vibracional que determina tu patrón base), tu Firmware (el sistema operativo que condiciona tu percepción), tu Árbol Biográfico (los programas heredados activos), tus Nodos de Expansión para el ciclo 2025-2032 y un diagnóstico de los patrones de sabotaje más urgentes. Cada sección incluye el dato calculado, su lectura técnica y su aplicación práctica.",
      },
      {
        titulo: "Descarga inmediata. Sin intervención humana.",
        texto:
          "El cálculo MECF es automático. En cuanto introduces tus datos y confirmas el pago, el sistema procesa los códigos y genera tu informe PDF en segundos. No hay espera, no hay interpretación subjetiva, no hay margen de error humano. El algoritmo calcula. El resultado es tuyo. Para siempre.",
      },
    ],
    highlight:
      "Un médico no improvisa. Un piloto no despega sin un plan de vuelo. El Protocolo MECF es tu plan de vuelo para los próximos 7 años.",
    prev: { slug: "decodificacion", title: "Decodificación" },
    next: null,
  },
};

function GoldRule() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div className="h-px flex-1" style={{ background: "linear-gradient(to right, #d4af37, transparent)" }} />
      <span style={{ color: "#d4af37", fontSize: 9 }}>◆</span>
      <div className="h-px flex-1" style={{ background: "linear-gradient(to left, #d4af37, transparent)" }} />
    </div>
  );
}

export default function FaseDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const fase = FASES[slug ?? ""];

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, [slug]);

  if (!fase) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="font-mono text-primary text-sm tracking-widest">FASE NO ENCONTRADA</p>
          <Link href="/"><span className="underline text-white/60 text-sm cursor-pointer">← Volver al inicio</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary selection:text-black">
      <SeoHead
        title={`${fase.title} MECF — ${fase.tagline} | Método MECF`}
        description={fase.intro.slice(0, 160)}
        canonical={`/fase/${fase.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": `${fase.roman}. ${fase.title} — Método MECF`,
          "description": fase.tagline,
          "url": `https://metodomecf.com/fase/${fase.slug}`,
          "author": { "@type": "Person", "name": "El Bachir Chekhad" },
          "publisher": { "@type": "Organization", "name": "Método MECF", "url": "https://metodomecf.com" }
        }}
      />

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-primary/10 bg-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <span className="font-serif font-bold text-lg tracking-widest text-primary cursor-pointer hover:opacity-80 transition-opacity">MECF</span>
          </Link>
          <div className="flex items-center gap-3">
            {(["diagnostico", "decodificacion", "protocolo"] as const).map((s, i) => (
              <Link key={s} href={`/fase/${s}`}>
                <span
                  className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1.5 border transition-all cursor-pointer"
                  style={{
                    borderColor: s === slug ? "#d4af37" : "rgba(212,175,55,0.18)",
                    color: s === slug ? "#d4af37" : "rgba(255,255,255,0.35)",
                    background: s === slug ? "rgba(212,175,55,0.08)" : "transparent",
                  }}
                >
                  {["I", "II", "III"][i]}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.09) 0%, transparent 70%)" }}
        />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <span
              className="font-serif text-6xl font-bold leading-none select-none"
              style={{ color: "rgba(212,175,55,0.12)" }}
            >
              {fase.roman}
            </span>
            <div className="flex flex-col gap-1">
              <span
                className="font-mono text-[10px] tracking-[0.35em] uppercase border px-3 py-1.5 w-fit"
                style={{ borderColor: "rgba(212,175,55,0.35)", color: "rgba(212,175,55,0.7)" }}
              >
                Fase {fase.num} de 03
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
            {fase.title}
          </h1>
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: "rgba(212,175,55,0.65)" }}>
            — {fase.tagline} —
          </p>
          <GoldRule />
          <p className="text-white/82 text-lg font-light leading-relaxed mt-6">
            {fase.intro}
          </p>
        </div>
      </section>

      {/* CONTENT BLOCKS */}
      <section className="py-16 border-t border-primary/10">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          {fase.bloques.map((b, i) => (
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
                  <h3 className="font-serif font-bold text-lg text-white mb-3">{b.titulo}</h3>
                  <p className="text-white/78 font-light leading-relaxed">{b.texto}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Highlight quote */}
          <div
            className="p-7 relative overflow-hidden"
            style={{
              background: "rgba(212,175,55,0.06)",
              border: "1px solid rgba(212,175,55,0.28)",
              borderLeft: "3px solid #d4af37",
            }}
          >
            <div
              className="font-serif font-bold mb-2 select-none"
              style={{ fontSize: 44, color: "rgba(212,175,55,0.15)", lineHeight: 1 }}
            >
              "
            </div>
            <p className="text-white/90 text-[15px] font-light leading-relaxed italic -mt-2">
              {fase.highlight}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
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
              Obtener mi informe →
            </span>
          </Link>
        </div>
      </section>

      {/* PREV / NEXT */}
      <div className="border-t border-primary/10 bg-black">
        <div className="max-w-3xl mx-auto px-6">
          <div className="grid grid-cols-2">

            <div>
              {fase.prev ? (
                <Link href={`/fase/${fase.prev.slug}`}>
                  <div className="group flex items-center gap-4 py-7 pr-6 border-r border-primary/10 cursor-pointer">
                    <span className="text-white/30 group-hover:text-primary transition-colors text-xl">←</span>
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/28 group-hover:text-white/45 transition-colors">Anterior</p>
                      <p className="text-white/70 text-sm group-hover:text-white transition-colors mt-0.5">{fase.prev.title}</p>
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

            <div>
              {fase.next ? (
                <Link href={`/fase/${fase.next.slug}`}>
                  <div className="group flex items-center justify-end gap-4 py-7 pl-6 cursor-pointer">
                    <div className="text-right">
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/28 group-hover:text-white/45 transition-colors">Siguiente</p>
                      <p className="text-white/70 text-sm group-hover:text-white transition-colors mt-0.5">{fase.next.title}</p>
                    </div>
                    <span className="text-white/30 group-hover:text-primary transition-colors text-xl">→</span>
                  </div>
                </Link>
              ) : (
                <Link href="/protocolo">
                  <div className="group flex items-center justify-end gap-4 py-7 pl-6 cursor-pointer">
                    <div className="text-right">
                      <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/28 group-hover:text-white/45 transition-colors">Siguiente paso</p>
                      <p className="text-white/70 text-sm group-hover:text-white transition-colors mt-0.5">Obtener mi informe</p>
                    </div>
                    <span className="text-white/30 group-hover:text-primary transition-colors text-xl">→</span>
                  </div>
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
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
