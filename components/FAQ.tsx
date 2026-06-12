import { useState } from "react";

const FAQS = [
  {
    q: "¿Qué recibo exactamente después de pagar?",
    a: "Un informe PDF personalizado basado en tus datos de nacimiento. Dependiendo del módulo: entre 20 y 45 páginas con tu código MECF, tus ciclos biográficos hasta 2032, tus nodos de expansión y los patrones que estás operando. Acceso inmediato tras el pago, sin esperas.",
  },
  {
    q: "¿Necesito saber algo de numerología o esoterismo?",
    a: "No. MECF no es numerología ni astrología. Es un sistema de análisis biográfico basado en patrones cronológicos. El informe está redactado en lenguaje directo, sin términos místicos. Lo entiende cualquier persona que quiera entenderse a sí misma.",
  },
  {
    q: "¿Cuánto tiempo tarda en llegar el PDF?",
    a: "El acceso es inmediato. En cuanto confirmes el pago, recibes el enlace de descarga. No hay tiempos de espera ni procesos manuales.",
  },
  {
    q: "¿Funciona para cualquier fecha de nacimiento?",
    a: "Sí. El sistema calcula los códigos para cualquier fecha de nacimiento válida. Solo necesitas día, mes y año. Cuanto más exacta sea la información, más preciso es el análisis.",
  },
  {
    q: "¿Qué diferencia hay entre el módulo Individual y el Árbol Genealógico?",
    a: "El módulo Individual analiza tu propio sistema biográfico. El Árbol Genealógico añade el análisis del linaje familiar — patrones heredados de hasta 3 generaciones — y explica qué parte de lo que vives hoy no es tuyo, sino una ejecución de memoria familiar.",
  },
  {
    q: "¿Hay garantía de devolución?",
    a: "Sí. Si recibes el informe y no te aporta claridad sobre tus patrones, escríbenos y te devolvemos el importe sin preguntas. El riesgo es nuestro.",
  },
  {
    q: "¿En qué formato viene el informe?",
    a: "PDF estándar, compatible con todos los dispositivos — móvil, tablet y ordenador. Puedes descargarlo, imprimirlo y conservarlo. No caduca ni desaparece.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section className="py-24 border-t border-primary/10 bg-black reveal">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4">— Preguntas frecuentes —</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            Lo que suelen <span className="text-primary italic">preguntar antes</span>
          </h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </div>

        <div className="space-y-0 border border-primary/15">
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-primary/10 last:border-b-0">
              <button
                onClick={() => toggle(i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 group hover:bg-primary/5 transition-colors"
              >
                <span className="font-mono text-sm font-bold text-white group-hover:text-primary transition-colors leading-snug">
                  {faq.q}
                </span>
                <span className="shrink-0 w-6 h-6 border border-primary/30 flex items-center justify-center font-mono text-primary text-xs transition-transform duration-300"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-white/70 text-sm font-light leading-relaxed border-l-2 border-primary/30 pl-4">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
