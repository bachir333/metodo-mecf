import { useEffect, useState } from "react";
import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";

type State = "idle" | "loading" | "sent" | "error";

export default function Acceso() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  const validate = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Introduce un email válido.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const submit = async () => {
    if (!validate()) return;
    setState("loading");
    try {
      await fetch("/api/resend-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      setState("sent");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <SeoHead
        title="Acceso a tu informe MECF — Re-descarga tu PDF"
        description="¿Ya compraste tu informe MECF y necesitas recibirlo de nuevo? Introduce tu email y te lo reenviamos al instante."
        canonical="/acceso"
        noindex={true}
      />

      <header className="fixed top-0 w-full border-b border-white/5 bg-background/90 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-bold tracking-[0.2em] text-white hover:text-primary transition-colors">
            MECF
          </Link>
          <Link href="/protocolo" className="font-mono text-[10px] tracking-[0.2em] uppercase bg-primary text-black px-5 py-2 font-bold hover:bg-primary/90 transition-colors">
            Obtener acceso
          </Link>
        </div>
      </header>

      <main className="min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="w-full max-w-md">

          {state !== "sent" ? (
            <div className="border border-primary/20 bg-zinc-950 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

              <div className="p-8 md:p-10 space-y-7">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-primary/50 mb-3">— Área de clientes —</p>
                  <h1 className="font-serif text-2xl md:text-3xl font-bold text-white leading-snug">
                    Recupera tu<br /><span className="text-primary">informe MECF</span>
                  </h1>
                  <p className="text-white/45 text-sm font-light mt-3 leading-relaxed">
                    Introduce el email con el que realizaste tu compra. Te reenviamos el PDF en los próximos minutos.
                  </p>
                </div>

                <div className="h-px bg-primary/10" />

                <div className="space-y-4">
                  <div>
                    <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/50 block mb-2">
                      Email de compra
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && submit()}
                      placeholder="tu@email.com"
                      disabled={state === "loading"}
                      className="w-full bg-black border border-primary/20 text-white font-mono text-sm px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-primary/60 transition-colors disabled:opacity-50"
                    />
                    {emailError && (
                      <p className="font-mono text-[9px] tracking-wider text-red-400/80 mt-2">{emailError}</p>
                    )}
                  </div>

                  {state === "error" && (
                    <div className="bg-red-950/30 border border-red-500/20 px-4 py-3 font-mono text-[10px] text-red-400/80 tracking-wide">
                      Error de conexión. Por favor inténtalo de nuevo.
                    </div>
                  )}

                  <button
                    onClick={submit}
                    disabled={state === "loading"}
                    className="w-full py-4 font-mono font-bold text-sm uppercase tracking-widest text-black bg-primary hover:bg-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {state === "loading" ? "Enviando…" : "Reenviar mi informe →"}
                  </button>

                  <p className="text-center font-mono text-[9px] tracking-wider text-white/20">
                    Solo funciona con emails de compras confirmadas.
                  </p>
                </div>

                <div className="h-px bg-primary/10" />

                <div className="space-y-2">
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-primary/40 mb-3">¿Todavía no tienes tu informe?</p>
                  <Link
                    href="/protocolo"
                    className="block w-full py-3 text-center font-mono text-[10px] tracking-widest uppercase text-primary border border-primary/30 hover:bg-primary/10 transition-colors"
                  >
                    Obtener acceso → desde 24,99€
                  </Link>
                </div>
              </div>
            </div>

          ) : (
            <div className="border border-primary/30 bg-zinc-950 relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="p-10 space-y-6">
                <div className="w-12 h-12 border border-primary/40 bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary text-xl">✓</span>
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white mb-3">Solicitud recibida</h2>
                  <p className="text-white/55 text-sm font-light leading-relaxed">
                    Si existe un informe asociado a{" "}
                    <span className="text-primary font-mono text-xs">{email}</span>,
                    lo recibirás en los próximos minutos.
                  </p>
                  <p className="text-white/35 text-xs font-light mt-3">
                    Revisa también tu carpeta de spam.
                  </p>
                </div>
                <div className="h-px bg-primary/10" />
                <div className="space-y-3">
                  <button
                    onClick={() => { setEmail(""); setState("idle"); }}
                    className="block w-full font-mono text-[10px] tracking-widest uppercase text-white/30 hover:text-primary transition-colors py-2"
                  >
                    Usar otro email
                  </button>
                  <Link href="/" className="block font-mono text-[10px] tracking-widest uppercase text-primary/30 hover:text-primary transition-colors py-2">
                    ← Volver al inicio
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
