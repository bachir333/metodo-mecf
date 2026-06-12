import { Link } from "wouter";

const STEPS = [
  {
    num: "01",
    slug: "datos",
    title: "Introduce tus datos de nacimiento",
    desc: "Fecha, lugar y datos de los miembros que quieras analizar. El sistema calcula tus códigos MECF en segundos.",
    icon: "◈",
  },
  {
    num: "02",
    slug: "pago",
    title: "Paga una sola vez",
    desc: "Sin suscripciones, sin renovaciones. Desde 24,99€ acceso inmediato al protocolo completo.",
    icon: "◇",
  },
  {
    num: "03",
    slug: "informe",
    title: "Descarga tu informe PDF",
    desc: "20-40 páginas de análisis técnico personalizado: tu código, tus ciclos hasta 2032, tus nodos de expansión y los patrones que estás operando.",
    icon: "◉",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 border-t border-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4">— El proceso —</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            Cómo funciona <span className="text-primary italic">MECF</span>
          </h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-3 relative">

          {STEPS.map((step, i) => (
            <Link key={i} href={`/como-funciona/${step.slug}`}>
              <div className="group flex flex-col items-center text-center px-6 py-8 border border-primary/12 hover:border-primary/40 transition-all duration-300 cursor-pointer reveal"
                style={{ background: "rgba(212,175,55,0.02)" }}>

                {/* Icon + number */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 border border-primary/30 group-hover:border-primary/60 flex items-center justify-center bg-zinc-950 relative z-10 transition-colors duration-300">
                    <span className="text-primary text-2xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 font-mono text-[10px] tracking-widest text-primary/40 bg-black px-1">
                    {step.num}
                  </div>
                </div>

                <h3 className="font-serif font-bold text-lg mb-3 text-white group-hover:text-primary transition-colors duration-300 leading-snug">
                  {step.title}
                </h3>
                <p className="text-white/58 text-sm font-light leading-relaxed mb-5">{step.desc}</p>

                {/* Link indicator */}
                <span
                  className="mt-auto font-mono text-[9px] tracking-[0.3em] uppercase border px-3 py-1.5 transition-all duration-300"
                  style={{ borderColor: "rgba(212,175,55,0.28)", color: "rgba(212,175,55,0.6)" }}
                >
                  <span className="group-hover:opacity-0 transition-opacity absolute">Ver más</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">Ver más →</span>
                  <span className="invisible">Ver más →</span>
                </span>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}
