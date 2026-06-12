import { useState } from "react";
import { Link } from "wouter";

function reduceDigits(n: number): number {
  while (n > 9) {
    n = String(n).split("").reduce((a, d) => a + parseInt(d), 0);
  }
  return n;
}

const CODE_DATA: Record<number, { name: string; group: string; color: string; trait: string; shadow: string }> = {
  1: { name: "INICIADOR", group: "LUNAR", color: "#c9a84c", shadow: "rgba(201,168,76,0.3)", trait: "Lanzas ciclos que otros terminan. Tu mayor riesgo: empezar sin completar." },
  2: { name: "CONECTOR", group: "LUNAR", color: "#c9a84c", shadow: "rgba(201,168,76,0.3)", trait: "Operas en red. Tu mayor riesgo: perder tu vector por complacer el sistema ajeno." },
  3: { name: "CREADOR SOLAR", group: "SOLAR", color: "#fcd34d", shadow: "rgba(252,211,77,0.4)", trait: "Frecuencia Tesla activa. Tu mayor riesgo: dispersar energía creativa sin canalización técnica." },
  4: { name: "CONSTRUCTOR", group: "LUNAR", color: "#c9a84c", shadow: "rgba(201,168,76,0.3)", trait: "Edificas estructuras duraderas. Tu mayor riesgo: el miedo al cambio bloquea tu expansión." },
  5: { name: "ACTIVADOR", group: "LUNAR", color: "#c9a84c", shadow: "rgba(201,168,76,0.3)", trait: "Catalizas transformaciones ajenas. Tu mayor riesgo: no reconocer tu propio vector de expansión." },
  6: { name: "ARMONIZADOR SOLAR", group: "SOLAR", color: "#fcd34d", shadow: "rgba(252,211,77,0.4)", trait: "Frecuencia Tesla activa. Tu mayor riesgo: cargar con los ciclos de otros como si fueran propios." },
  7: { name: "ANALISTA", group: "LUNAR", color: "#c9a84c", shadow: "rgba(201,168,76,0.3)", trait: "Decodificas sistemas invisibles. Tu mayor riesgo: el análisis paraliza la acción." },
  8: { name: "OPERADOR", group: "LUNAR", color: "#c9a84c", shadow: "rgba(201,168,76,0.3)", trait: "Generas recursos y estructuras de poder. Tu mayor riesgo: ciclos de colapso financiero repetitivos." },
  9: { name: "MAESTRO SOLAR", group: "SOLAR", color: "#fcd34d", shadow: "rgba(252,211,77,0.4)", trait: "Frecuencia Tesla máxima. Tu mayor riesgo: absorber el campo emocional de todo sistema cercano." },
};

function currentCycle(birthYear: number): string {
  const age = 2026 - birthYear;
  const cycle = (age % 9) || 9;
  const cycleNames: Record<number, string> = {
    1: "APERTURA — ciclo de nuevos comienzos",
    2: "GESTACIÓN — ciclo de procesos internos",
    3: "EXPRESIÓN — ciclo de máxima visibilidad",
    4: "CONSOLIDACIÓN — ciclo de estructura",
    5: "CAMBIO — ciclo de transformación acelerada",
    6: "RESPONSABILIDAD — ciclo de compromisos",
    7: "ANÁLISIS — ciclo de introspección profunda",
    8: "MANIFESTACIÓN — ciclo de poder y recursos",
    9: "CIERRE — ciclo de liberación y finalización",
  };
  return cycleNames[cycle] || "TRANSICIÓN";
}

export default function MiniCalculator() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<null | { code: number; cycle: string }>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const d = parseInt(day), m = parseInt(month), y = parseInt(year);
    if (!d || !m || !y || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2010) {
      setError("Introduce una fecha válida.");
      return;
    }
    setError("");
    const sum = reduceDigits(d + m + reduceDigits(y));
    const code = sum === 0 ? 9 : sum;
    setResult({ code, cycle: currentCycle(y) });
  };

  const data = result ? CODE_DATA[result.code] : null;

  return (
    <section className="py-24 border-t border-primary/10 bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4">— Diagnóstico gratuito —</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            Descubre tu <span className="text-primary italic">Código MECF</span>
          </h2>
          <div className="w-16 h-px bg-primary mx-auto my-3" />
          <p className="text-muted-foreground font-light text-sm max-w-xl mx-auto">
            Introduce tu fecha de nacimiento. En 5 segundos sabes en qué grupo operas
            y en qué ciclo biográfico estás en 2026.
          </p>
        </div>

        {!result ? (
          <div className="border border-primary/40 bg-zinc-950 p-8 relative rounded-sm">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="grid grid-cols-3 gap-5 mb-8">
              {[
                { label: "Día", val: day, set: setDay, placeholder: "DD", max: 31 },
                { label: "Mes", val: month, set: setMonth, placeholder: "MM", max: 12 },
                { label: "Año", val: year, set: setYear, placeholder: "AAAA", max: 2010 },
              ].map(f => (
                <div key={f.label} className="flex flex-col gap-2">
                  <label className="font-mono text-xs tracking-widest uppercase text-primary font-bold block">{f.label}</label>
                  <input
                    type="number"
                    value={f.val}
                    onChange={e => f.set(e.target.value)}
                    placeholder={f.placeholder}
                    min={1}
                    max={f.max}
                    className="w-full bg-black border-2 border-primary/50 text-white font-mono text-2xl text-center py-4 px-2 focus:border-primary focus:outline-none transition-colors placeholder:text-white/20 rounded-sm"
                  />
                </div>
              ))}
            </div>
            {error && <p className="font-mono text-xs text-red-400 mb-4 text-center">{error}</p>}
            <button
              onClick={calculate}
              className="w-full py-4 bg-primary text-black font-mono font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors rounded-sm"
            >
              Calcular mi código →
            </button>
          </div>
        ) : (
          <div className="border bg-background relative overflow-hidden" style={{ borderColor: data!.color }}>
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: data!.color }} />
            <div className="p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-2 py-1 border mb-3 inline-block"
                    style={{ color: data!.color, borderColor: `${data!.color}40` }}>
                    GRUPO {data!.group}
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-white mt-2">
                    Código <span style={{ color: data!.color }}>{result.code}</span> — {data!.name}
                  </h3>
                </div>
                <div className="font-mono text-[5rem] font-bold leading-none select-none" style={{ color: `${data!.color}20` }}>
                  {result.code}
                </div>
              </div>

              <div className="border-l-2 pl-5 py-1" style={{ borderColor: data!.color }}>
                <p className="text-amber-100/80 font-light text-sm leading-relaxed">{data!.trait}</p>
              </div>

              <div className="bg-black/40 border border-primary/15 p-5">
                <p className="font-mono text-[9px] tracking-widest uppercase text-primary/50 mb-2">Tu ciclo 2026</p>
                <p className="font-mono text-sm font-bold" style={{ color: data!.color }}>{result.cycle}</p>
              </div>

              <div className="pt-2 space-y-3">
                <p className="font-mono text-[10px] tracking-widest uppercase text-primary/40 text-center">
                  Esto es solo el 2% del análisis completo
                </p>
                <Link
                  href="/protocolo"
                  className="block w-full py-4 text-center font-mono font-bold text-xs uppercase tracking-widest text-black transition-all hover:-translate-y-0.5"
                  style={{ background: data!.color, boxShadow: `0 10px 30px ${data!.shadow}` }}
                >
                  Ver mi análisis completo →
                </Link>
                <button
                  onClick={() => setResult(null)}
                  className="w-full font-mono text-[10px] tracking-widest uppercase text-primary/30 hover:text-primary transition-colors py-2"
                >
                  Calcular otra fecha
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
