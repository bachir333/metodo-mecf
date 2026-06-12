import { useState, useRef, useEffect } from "react";

const DEFINITIONS: Record<string, string> = {
  software: "Las instrucciones que gobiernan tu comportamiento — como las apps de tu móvil: invisibles pero determinantes.",
  hardware: "Tu cuerpo y biología — el contenedor físico en el que todo lo demás opera.",
  firmware: "Los programas instalados de fábrica que nunca elegiste: patrones familiares y culturales absorbidos en la infancia.",
  voltaje: "La frecuencia energética base desde la que operas, calculada con la secuencia Tesla 3·6·9.",
  nodo: "Un punto de intersección en tu árbol biográfico — una ventana donde el sistema puede cambiar de dirección.",
  "árbol biográfico": "La estructura de programas heredados que estás ejecutando, transmitidos de generación en generación.",
  protocolo: "El conjunto de pasos ordenados que el sistema sigue para analizar y calcular tu código.",
  actualización: "Reemplazar un programa obsoleto por uno más funcional. No eres tú quien está roto — es el programa.",
  "ciclo biográfico": "Los períodos de tiempo en los que tu sistema opera bajo una frecuencia específica.",
  "código mecf": "Tu perfil técnico único: la combinación de Voltaje + Firmware + Árbol + Nodos + Ciclos.",
};

interface TermProps {
  children: string;
  word?: string;
}

export default function Term({ children, word }: TermProps) {
  const key = (word ?? children).toLowerCase();
  const definition = DEFINITIONS[key];
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!visible) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setVisible(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [visible]);

  if (!definition) return <span>{children}</span>;

  return (
    <span ref={ref} className="relative inline-block">
      <span
        onClick={() => setVisible(v => !v)}
        className="cursor-help font-medium border-b border-dashed"
        style={{ color: "#d4af37", borderColor: "rgba(212,175,55,0.5)" }}
      >
        {children}
      </span>
      <span
        className="font-mono text-[9px] align-super ml-0.5 cursor-help"
        style={{ color: "rgba(212,175,55,0.55)" }}
        onClick={() => setVisible(v => !v)}
      >?</span>

      {visible && (
        <span
          className="absolute bottom-full left-0 z-50 w-72 p-4 text-left shadow-2xl"
          style={{
            background: "#111",
            border: "1px solid rgba(212,175,55,0.35)",
            borderLeft: "2px solid #d4af37",
            marginBottom: 8,
          }}
        >
          <span className="block font-mono text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(212,175,55,0.7)" }}>
            {children}
          </span>
          <span className="block text-white/85 text-[13px] font-light leading-relaxed">
            {definition}
          </span>
          <a
            href="/glosario"
            className="block mt-3 font-mono text-[9px] tracking-widest uppercase hover:text-primary transition-colors"
            style={{ color: "rgba(212,175,55,0.5)" }}
          >
            Ver glosario completo →
          </a>
        </span>
      )}
    </span>
  );
}
