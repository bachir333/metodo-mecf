import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import SeoHead from "@/components/SeoHead";
import { translations, type Lang } from '../i18n';
import { PAIN_ITEMS } from "@/data/painItems";
import CountdownBanner from "@/components/CountdownBanner";
import FloatingParticles from "@/components/FloatingParticles";
import MiniCalculator from "@/components/MiniCalculator";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import ObservadorSection from "@/components/ObservadorSection";
import ViewerCounter from "@/components/ViewerCounter";
import FAQ from "@/components/FAQ";
import EmailCapture from "@/components/EmailCapture";
import { QRCodeSVG } from "qrcode.react";
import coverImg from "@assets/fotoshop_bachir_1780417944532.png";
import authorImg from "@assets/bachir_1780591162178.jpg";

const QR_URL = "https://metodomecf.com";

function Divider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-primary/20" />
      {label && (
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-primary/50 shrink-0">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-primary/20" />
    </div>
  );
}

function GoldRule() {
  return <div className="w-16 h-px bg-primary mx-auto" />;
}

function QRSection() {
  const svgRef = useRef<HTMLDivElement>(null);
  const handleDownload = () => {
    const svgEl = svgRef.current?.querySelector("svg");
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgEl);
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-metodomecf.svg";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <section className="py-16 border-t border-primary/10 bg-black">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">
          ACCESO <span className="text-primary">DIRECTO</span>
        </h2>
        <p className="text-muted-foreground font-light mb-10">
          Escanea el código QR para acceder al sistema desde cualquier dispositivo.
        </p>
        <div className="flex flex-col items-center gap-6">
          <div ref={svgRef} className="p-5 bg-white inline-block shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <QRCodeSVG value={QR_URL} size={200} bgColor="#ffffff" fgColor="#000000" level="H" />
          </div>
          <p className="font-mono text-primary text-xs tracking-widest">{QR_URL}</p>
          <button
            onClick={handleDownload}
            className="border border-primary text-primary font-mono font-bold px-8 py-3 uppercase tracking-wider hover:bg-primary hover:text-black transition-all duration-300 text-xs"
          >
            Descargar QR para Imprenta
          </button>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="problema" className="py-24 border-t border-primary/10 bg-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4">— Antes de continuar —</p>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 title-glow">
          ¿Te reconoces <span className="text-primary italic">aquí?</span>
        </h2>
        <GoldRule />
        <p className="text-muted-foreground font-light mt-6 mb-12 max-w-2xl mx-auto">
          Este sistema no es para todo el mundo. Es para quienes ya saben que el problema no es el esfuerzo.
        </p>

        <div className="grid md:grid-cols-2 gap-px bg-primary/10 border border-primary/15 text-left">
          {PAIN_ITEMS.map(item => (
            <div key={item.n} className="bg-black p-8 flex gap-5 group hover:bg-primary/[0.04] transition-colors">
              <div className="font-mono text-primary/30 text-4xl font-bold leading-none shrink-0 mt-1">{item.n}</div>
              <div className="flex-1">
                <h3 className="font-serif text-white font-bold text-base mb-2 group-hover:text-primary transition-colors">
                  {item.t}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.d}</p>
                <Link
                  href={`/problema/${item.slug}`}
                  className="mt-4 font-mono text-[10px] tracking-widest uppercase text-white hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  Leer más →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 border border-primary/30 bg-primary/5 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 font-mono text-[8rem] font-bold text-primary/5 select-none leading-none">MECF</div>
          <p className="text-xl font-serif font-light text-amber-100/85 leading-relaxed relative z-10">
            "Si te has reconocido en al menos tres de estos puntos,{" "}
            <span className="text-primary font-semibold">no tienes un problema de actitud</span>.<br />
            Tienes un sistema operativo mal configurado. Y eso tiene solución técnica."
          </p>
          <p className="font-mono text-primary text-xs tracking-widest mt-4">— El Bachir Chekhad, Fundador MECF</p>
        </div>
      </div>
    </section>
  );
}

function useLiveCounter(base: number, max: number) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c < max ? c + 1 : c);
    }, Math.floor(8000 + Math.random() * 12000));
    return () => clearInterval(id);
  }, [max]);
  return count;
}

export default function Home() {
  const downloads = useLiveCounter(847, 999);
  const [lang, setLangState] = useState<Lang>('es');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mecf-lang') as Lang | null;
      if (saved && saved in translations) setLangState(saved);
    } catch (_) {}
  }, []);

  const t = (key: string): string => {
    const T = translations[lang] ?? translations['es'];
    return (T as any)[key] ?? (translations['es'] as any)[key] ?? key;
  };

  const changeLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('mecf-lang', l); } catch (_) {}
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");

    // ── Scroll reveal ──
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground font-sans">
      <SeoHead
        title="Método MECF — El Código Maestro del Destino | El Bachir Chekhad"
        description="Decodifica tus ciclos biográficos con el Método MECF. Informes personalizados de Ingeniería Álmica en ES/EN/FR. Por El Bachir Chekhad — metodomecf.com"
        canonical="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Método MECF",
            "url": "https://metodomecf.com",
            "logo": "https://metodomecf.com/favicon.svg",
            "sameAs": ["https://www.instagram.com/mecfmetodo/"],
            "founder": { "@type": "Person", "name": "El Bachir Chekhad" }
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Método MECF",
            "url": "https://metodomecf.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://metodomecf.com/glosario",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Método MECF — Informe de Código Biográfico",
            "description": "Análisis técnico personalizado de ciclos biográficos, nodos cronológicos y patrones de sabotaje. Informe PDF en ES/EN/FR.",
            "url": "https://metodomecf.com",
            "brand": { "@type": "Brand", "name": "Método MECF" },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "bestRating": "5",
              "worstRating": "1",
              "ratingCount": "6",
              "reviewCount": "6"
            },
            "review": [
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Marta G." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Llevo años buscando respuestas sobre por qué repito los mismos patrones en mis relaciones. MECF lo decodificó en 20 páginas. No hay nada parecido."
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Andrés R." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Era escéptico. Lo compré por curiosidad. Terminé leyéndolo tres veces. Mi ciclo 2026 es exactamente lo que estoy viviendo. Escalofriante de preciso."
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Laura M." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "Mi pareja y yo hicimos el módulo Socios. Entendimos por qué chocamos en los mismos puntos desde hace 4 años. Ahora tenemos un mapa, no una pelea."
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Carlos V." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "El análisis del linaje materno fue lo que más me impactó. Patrones que mi madre tiene, su madre tuvo, y yo estaba reproduciendo sin saberlo."
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Sofía T." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "En 24,99€ me di más cuenta de mí misma que en meses de terapia. No digo que sustituya nada, pero como punto de partida es brutal."
              },
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Javier P." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
                "reviewBody": "El bachir explica el método con una claridad técnica que no había visto antes en este tipo de análisis. Rigor total, sin misticismo vacío."
              }
            ]
          }
        ]}
      />

      {/* ── COUNTDOWN BANNER ── */}
      <CountdownBanner />

      {/* ── NAV ── */}
      <header className="sticky top-0 w-full border-b border-primary/10 bg-background/95 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif font-bold text-lg tracking-widest text-primary">MECF</div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#problema" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">{t('nav_problem')}</a>
            <a href="/protocolo" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">{t('nav_modules')}</a>
            <a href="#autor" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">{t('nav_author')}</a>
            <a href="/quienes-somos" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Nosotros</a>
            <a href="/contacto" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Contacto</a>
            <a href="/glosario" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Glosario</a>
            <a href="/blog" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Blog</a>
            <a href="/protocolo" className="bg-primary text-black font-mono font-bold px-5 py-2 uppercase tracking-wider text-xs hover:bg-white transition-colors duration-300">
              {t('nav_access')}
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {(['es','en','fr','ar'] as Lang[]).map(l => (
                <button key={l} onClick={() => changeLang(l)}
                  className={`font-mono text-[8px] px-2 py-1 border tracking-wider uppercase transition-colors ${lang === l ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-primary hover:border-primary/40'}`}>
                  {l === 'ar' ? 'عربي' : l.toUpperCase()}
                </button>
              ))}
            </div>
            <a href="/protocolo" className="md:hidden bg-primary text-black font-mono font-bold px-4 py-2 uppercase tracking-wider text-xs ml-2 border-l-2 border-black/10">
              {t('nav_access_short')}
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO: PROBLEMA PRIMERO ── */}
      <section className="relative flex items-center pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 70%)' }} />
        <FloatingParticles />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-7">
            <div className="space-y-2">
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60">
                Método MECF · v6.0
              </p>
              <GoldRule />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.0]">
              <span className="block title-reveal title-reveal-1">EL CÓDIGO</span>
              <span className="block title-reveal title-reveal-2">MAESTRO</span>
              <span className="block title-reveal title-reveal-3 italic gold-shimmer">DEL DESTINO</span>
            </h1>

            <p className="text-xl md:text-2xl font-serif font-light text-amber-100/85 leading-snug border-l-2 border-primary pl-5">
              {t('hero_sub')}
            </p>

            <p className="text-base text-muted-foreground font-light leading-relaxed max-w-lg">
              {t('hero_body')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="/protocolo"
                className="bg-primary text-black font-mono font-bold px-8 py-4 text-center uppercase tracking-wider text-sm hover:bg-white transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_40px_rgba(212,175,55,0.30)]">
                {t('hero_cta')}
              </a>
            </div>

            <div className="flex items-center gap-6 pt-2 flex-wrap">
              {[
                { val: "41K+", lab: "Seguidores" },
                { val: `${downloads}`, lab: "Informes generados" },
                { val: "V6.0", lab: "Core" },
              ].map(s => (
                <div key={s.lab} className="text-center">
                  <div className="font-mono text-primary font-bold text-lg tabular-nums">{s.val}</div>
                  <div className="font-mono text-[9px] tracking-widest uppercase text-primary/45">{s.lab}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="absolute inset-0 bg-primary/15 blur-[80px] rounded-full" />
            <img
              src={coverImg}
              alt="El Código Maestro del Destino"
              className="relative z-10 w-full h-auto max-h-[75vh] object-contain drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <HowItWorks />

      {/* ── PROBLEMA: ¿TE RECONOCES AQUÍ? ── */}
      <ProblemSection />

      {/* ── DIAGNÓSTICO CTA ── */}
      <div className="bg-black border-t border-primary/10 pt-6 pb-0">
        <ViewerCounter small />
      </div>
      <section className="py-14 bg-black relative overflow-hidden reveal">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-3 border px-4 py-2 mb-2"
            style={{ borderColor: "rgba(212,175,55,0.2)", background: "rgba(212,175,55,0.04)" }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-primary/70">
              Letrame Editorial × Método MECF
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            ¿Quién está realmente<br />
            <em className="italic text-primary">operando tu sistema</em>?
          </h2>
          <p className="font-mono text-xs max-w-lg mx-auto leading-relaxed" style={{ color: "#fff", textShadow: "0 0 12px rgba(255,255,255,0.5)" }}>
            Test de 9 vectores diseñado por El Bachir Chekhad. El mismo diagnóstico que incluye el libro publicado por Letrame Editorial. Gratuito — resultado inmediato.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/diagnostico">
              <span className="inline-block bg-primary text-black font-mono font-bold px-10 py-4 uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 cursor-pointer shadow-[0_10px_40px_rgba(212,175,55,0.2)]">
                Iniciar diagnóstico — gratis →
              </span>
            </Link>
            <Link href="/quiz">
              <span className="inline-block border border-primary/30 text-primary/60 font-mono text-xs px-7 py-4 uppercase tracking-widest hover:border-primary/60 hover:text-primary transition-all cursor-pointer">
                Test rápido — 5 preguntas
              </span>
            </Link>
          </div>
          <p className="font-mono text-[8px] tracking-widest uppercase pt-1" style={{ color: "rgba(255,255,255,0.7)", textShadow: "0 0 8px rgba(255,255,255,0.4)" }}>
            4 minutos · Sin registro · Acceso inmediato
          </p>
        </div>
      </section>

      {/* ── MINI CALCULADORA ── */}
      <MiniCalculator />

      {/* ── QUÉ ES MECF ── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4">— La solución —</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 title-glow">
            MÉTODO <span className="text-primary">MECF</span>
          </h2>
          <GoldRule />
          <p className="text-muted-foreground font-light mt-6 mb-14 max-w-2xl mx-auto">
            Materia · Energía · Ciclos · Forma — la intersección entre la recurrencia matemática de Tesla 3·6·9,
            la geometría de Fibonacci y el hardware biológico humano.
          </p>

          <div className="grid md:grid-cols-3 gap-px bg-primary/10 border border-primary/15">
            {[
              {
                step: "I",
                slug: "diagnostico",
                title: "DIAGNÓSTICO",
                desc: "Identificamos los nodos cronológicos de tu trayectoria. Fechas, ciclos y patrones que se repiten con precisión matemática.",
              },
              {
                step: "II",
                slug: "decodificacion",
                title: "DECODIFICACIÓN",
                desc: "Localizamos las memorias heredadas, los programas de sabotaje y las lealtades invisibles que operan en tu sistema.",
              },
              {
                step: "III",
                slug: "protocolo",
                title: "PROTOCOLO",
                desc: "Te entregamos un informe con las ventanas exactas de intervención y los vectores de expansión para tu ciclo activo.",
              },
            ].map(s => (
              <Link key={s.step} href={`/fase/${s.slug}`}>
                <div className="bg-background p-10 flex flex-col items-center text-center gap-4 group cursor-pointer hover:bg-primary/5 transition-colors duration-300 h-full">
                  <div className="font-serif text-4xl font-bold text-primary/25 group-hover:text-primary/50 transition-colors duration-300">{s.step}</div>
                  <div className="w-8 h-px bg-primary" />
                  <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-primary font-bold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{s.desc}</p>
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-primary/40 group-hover:text-primary/70 transition-colors duration-300 mt-1">
                    Leer más →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFERTA: LOS MÓDULOS ── */}
      <section id="modulos" className="py-24 border-t border-primary/10 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4">— Elige tu protocolo —</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 title-glow">
              LO QUE <span className="text-primary">RECIBES</span>
            </h2>
            <GoldRule />
            <p className="text-muted-foreground font-light mt-6 max-w-xl mx-auto">
              Tres módulos. Descarga inmediata. Sin suscripciones, sin contratos.
              Un informe PDF personalizado basado en tus fechas y datos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                color: "#fcd34d",
                badge: "MÁS POPULAR",
                num: "01",
                price: "24,99€",
                title: "MECF INDIVIDUAL",
                tagline: "Tu código personal decodificado",
                features: [
                  "Informe PDF personalizado",
                  "Tus 5 nodos cronológicos de expansión 2026–2032",
                  "Identificación de tu código de origen",
                  "Patrones de sabotaje recurrente",
                  "Ventanas de intervención activas",
                  "Descarga inmediata",
                ],
                cta: "ACTIVAR PROTOCOLO INDIVIDUAL",
                href: "/protocolo",
              },
              {
                color: "#c9a84c",
                badge: "MÁS COMPLETO",
                num: "02",
                price: "49,99€",
                title: "ÁRBOL GENEALÓGICO",
                tagline: "Tu linaje como sistema de datos",
                features: [
                  "Informe PDF transgeneracional",
                  "Análisis de 3 generaciones",
                  "Lealtades invisibles identificadas",
                  "Memorias repetitivas del sistema familiar",
                  "Programas heredados que operan hoy en ti",
                  "Descarga inmediata",
                ],
                cta: "ACTIVAR PROTOCOLO LINAJE",
                href: "/protocolo",
              },
              {
                color: "#a38728",
                badge: "SINASTRÍA",
                num: "03",
                price: "34,99€",
                title: "SOCIOS & PAREJAS",
                tagline: "Ingeniería relacional de precisión",
                features: [
                  "Informe PDF de sinastría algorítmica",
                  "Análisis de dos operadores",
                  "Índice de coherencia algorítmica",
                  "Vectores de expansión compartidos",
                  "Diagnóstico de compatibilidad estructural",
                  "Descarga inmediata",
                ],
                cta: "ACTIVAR PROTOCOLO RELACIONAL",
                href: "/protocolo",
              },
            ].map((mod, idx) => (
              <motion.div
                key={mod.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                className="flex flex-col relative overflow-hidden group"
                style={{
                  border: `1px solid ${mod.color}28`,
                  borderLeft: `3px solid ${mod.color}`,
                  background: `linear-gradient(145deg, ${mod.color}0a 0%, #080808 55%)`,
                  boxShadow: `0 0 0 0 ${mod.color}00`,
                }}
                onHoverStart={e => {
                  (e.target as HTMLElement).style?.setProperty?.("box-shadow", `0 20px 60px -12px ${mod.color}22, 0 0 0 1px ${mod.color}18`);
                }}
                onHoverEnd={e => {
                  (e.target as HTMLElement).style?.setProperty?.("box-shadow", "none");
                }}
              >
                {/* shimmer top bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(to right, transparent, ${mod.color}, transparent)` }}
                  animate={{ backgroundPosition: ["200% center", "-200% center"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: idx * 1.1 }}
                />

                {/* hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 100% 70% at 10% 0%, ${mod.color}0e 0%, transparent 65%)` }}
                />

                {/* pulsing bg number */}
                <motion.div
                  className="absolute bottom-4 right-4 font-mono font-bold select-none pointer-events-none"
                  style={{ fontSize: 88, lineHeight: 1, color: `${mod.color}09` }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 1.3 }}
                >
                  {mod.num}
                </motion.div>

                <div className="p-8 flex flex-col flex-1 gap-6 relative z-10">
                  <div className="flex items-start justify-between">
                    <motion.span
                      className="font-mono text-[9px] tracking-[0.3em] uppercase px-2 py-1 border"
                      style={{ color: mod.color, borderColor: `${mod.color}40` }}
                      animate={{ borderColor: [`${mod.color}28`, `${mod.color}70`, `${mod.color}28`] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.8 }}
                    >
                      {mod.badge}
                    </motion.span>
                  </div>

                  <div>
                    <motion.div
                      className="font-mono text-3xl font-bold mb-1"
                      style={{ color: mod.color }}
                      animate={{ opacity: [0.85, 1, 0.85] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                    >
                      {mod.price}
                    </motion.div>
                    <div className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: `${mod.color}bb` }}>pago único · sin suscripción</div>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-xl text-white mb-1">{mod.title}</h3>
                    <p className="font-light text-sm" style={{ color: `${mod.color}80` }}>{mod.tagline}</p>
                  </div>

                  <div className="h-px" style={{ background: `linear-gradient(to right, ${mod.color}30, transparent)` }} />

                  <ul className="space-y-3 flex-1">
                    {mod.features.map((f, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-sm"
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: idx * 0.12 + i * 0.06 + 0.3 }}
                      >
                        <span className="shrink-0 mt-0.5" style={{ color: mod.color }}>→</span>
                        <span
                          className={i === mod.features.length - 1
                            ? "font-mono font-bold text-xs tracking-widest uppercase"
                            : "text-amber-100/80 font-light"
                          }
                          style={i === mod.features.length - 1 ? { color: mod.color } : {}}
                        >
                          {f}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <Link href={mod.href}>
                    <motion.div
                      className="mt-2 font-mono font-bold text-xs uppercase tracking-widest px-6 py-4 text-center text-black cursor-pointer"
                      style={{ background: mod.color }}
                      whileHover={{ scale: 1.03, filter: "brightness(1.12)" }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                    >
                      {mod.cta}
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="font-mono text-xs text-primary/45 tracking-widest">
              Acceso instantáneo tras el pago · Formato PDF · Compatible con todos los dispositivos
            </p>
          </div>
        </div>
      </section>

      {/* ── AUTOR ── */}
      <section id="autor" className="py-20 border-t border-primary/10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative flex justify-center lg:justify-start">
              <div className="absolute inset-0 bg-primary/15 blur-[80px] rounded-full" />
              <img
                src={authorImg}
                alt="El Bachir Chekhad"
                className="relative z-10 w-72 md:w-96 border border-primary/20 shadow-[0_0_60px_rgba(212,175,55,0.15)] hover:scale-[1.02] transition-all duration-700"
              />
            </div>
            <div className="space-y-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4">— El Autor —</p>
                <h2 className="text-4xl font-serif font-bold mb-2 title-glow">
                  EL BACHIR <span className="text-primary">CHEKHAD</span>
                </h2>
                <GoldRule />
              </div>
              <div className="text-xl font-serif italic text-amber-50/85 border-l-2 border-primary pl-5 py-1">
                "No soy un motivador. Soy un operador técnico."
              </div>
              <p className="text-muted-foreground font-light leading-relaxed">
                Bachir ha descifrado la intersección entre el voltaje de Tesla (3·6·9), la geometría de
                Fibonacci y el hardware biológico. Fundador del Método MECF — su misión es demostrar que
                la sanación y la prosperidad no son milagros, sino el resultado técnico de una frecuencia
                bien alineada.
              </p>
              <div className="border border-primary/20 bg-primary/5 p-6 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 font-mono text-[6rem] font-bold text-primary/5 select-none leading-none">∞</div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary mb-3">Comunidad activa</p>
                <p className="text-sm font-light text-amber-50/85 leading-relaxed">
                  Más de <span className="text-primary font-semibold">41.000 personas</span> ya están
                  descifrando su código en los canales de Bachir.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: "5.5K", label: "YouTube", url: "https://www.youtube.com/@misterioyconciencia8625" },
                  { value: "20K", label: "Facebook", url: "https://www.facebook.com/PscicologiaUniversal?locale=es_ES" },
                  { value: "16K", label: "Grupo FB", url: "https://www.facebook.com/groups/684784888612881?locale=es_ES" },
                ].map(stat => (
                  <a key={stat.label} href={stat.url} target="_blank" rel="noopener noreferrer"
                    className="bg-primary/8 border border-primary/15 px-5 py-4 text-center min-w-[100px] hover:border-primary/40 hover:bg-primary/[0.08] transition-colors block">
                    <div className="font-mono text-primary text-lg font-bold">{stat.value}</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EL OBSERVADOR ── */}
      <ObservadorSection />

      {/* ── TESTIMONIOS ── */}
      <Testimonials />

      {/* ── INSTAGRAM ── */}
      <section className="py-20 border-t border-primary/10 bg-black">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-primary" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4.5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60">@mecfmetodo</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 title-glow">
              Síguenos en <span className="text-primary">Instagram</span>
            </h2>
            <GoldRule />
            <p className="text-muted-foreground font-light mt-5 max-w-lg mx-auto text-sm">
              Contenido diario sobre frecuencia, linaje y decodificación de patrones.
              La comunidad que te faltaba.
            </p>
          </div>

          {/* Fake post grid — actualizar con imágenes reales cuando exista la cuenta */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-0.5 mb-8">
            {[
              {
                bg: "radial-gradient(circle at 30% 30%, rgba(212,175,55,0.35) 0%, rgba(0,0,0,0.9) 70%)",
                label: "3·6·9",
              },
              {
                bg: "linear-gradient(135deg, rgba(163,135,40,0.5) 0%, rgba(0,0,0,0.95) 60%)",
                label: "MECF",
              },
              {
                bg: "radial-gradient(circle at 70% 60%, rgba(252,211,77,0.3) 0%, rgba(0,0,0,0.92) 65%)",
                label: "LINAJE",
              },
              {
                bg: "linear-gradient(45deg, rgba(0,0,0,0.95) 0%, rgba(201,168,76,0.4) 100%)",
                label: "CICLOS",
              },
              {
                bg: "radial-gradient(circle at 50% 20%, rgba(212,175,55,0.4) 0%, rgba(0,0,0,0.9) 60%)",
                label: "CÓDIGO",
              },
              {
                bg: "linear-gradient(225deg, rgba(163,135,40,0.45) 0%, rgba(0,0,0,0.95) 70%)",
                label: "∞",
              },
            ].map((post, i) => (
              <a
                key={i}
                href="https://www.instagram.com/mecfmetodo/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden group"
                style={{ background: post.bg }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-primary/30 font-bold text-xs tracking-widest group-hover:text-primary/60 transition-colors">
                    {post.label}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4.5"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://www.instagram.com/mecfmetodo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-primary text-primary font-mono font-bold px-8 py-3 uppercase tracking-widest text-xs hover:bg-primary hover:text-black transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4.5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              Seguir en Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ── */}
      <EmailCapture />

      {/* ── FAQ ── */}
      <FAQ />

      {/* ── GARANTÍA ── */}
      <section className="py-14 border-t border-primary/10 bg-zinc-950 reveal">
        <div className="max-w-3xl mx-auto px-6">
          <div className="border border-primary/25 p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="shrink-0 w-16 h-16 border-2 border-primary flex items-center justify-center text-3xl text-primary">
              ◈
            </div>
            <div>
              <h3 className="font-serif font-bold text-xl text-white mb-2">Sin riesgo. Sin letra pequeña.</h3>
              <p className="text-white/70 text-sm font-light leading-relaxed">
                Si recibes el informe y no te aporta claridad sobre tus patrones, escríbenos y te devolvemos el importe sin preguntas.
                El riesgo es nuestro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL CON URGENCIA ── */}
      <section id="comprar" className="py-28 relative text-center border-t border-primary/10">
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)' }} />
        <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-8">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary/60">— Último paso —</p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight title-glow">
            DEJA DE OPERAR<br />
            <span className="text-primary italic">CON EL CÓDIGO HEREDADO</span>
          </h2>
          <GoldRule />
          <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto">
            Tienes los síntomas. Ya sabes que hay un sistema detrás. El informe te da
            el diagnóstico exacto y las ventanas de intervención.
          </p>

          <ViewerCounter />

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a href="/protocolo"
              className="inline-block bg-primary text-black font-mono font-bold px-12 py-5 text-base uppercase tracking-widest hover:bg-white transition-all duration-300 hover:-translate-y-1 shadow-[0_0_60px_rgba(212,175,55,0.35)]">
              Elegir mi módulo — desde 24,99€
            </a>
          </div>

          <div className="flex items-center justify-center gap-8 flex-wrap pt-4">
            {[
              "Acceso instantáneo",
              "Pago único · sin suscripción",
              "PDF compatible con todos los dispositivos",
            ].map(item => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-primary font-bold">✓</span>
                <span className="font-mono text-xs tracking-widest uppercase text-white/80">{item}</span>
              </div>
            ))}
          </div>

          <p className="text-xs font-mono text-white/50 pt-2">
            Publicado por Letrame Grupo Editorial · metodomecf.com
          </p>
        </div>
      </section>

      {/* ── CITA TESLA ── */}
      <section className="py-16 bg-black border-y border-primary/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-5xl text-primary font-serif leading-none mb-6 opacity-40">"</div>
          <blockquote className="text-2xl md:text-3xl font-serif font-light leading-relaxed mb-6 text-amber-50/85">
            Si quieres entender la realidad, debes pensar en términos de energía, frecuencia y vibración.
          </blockquote>
          <cite className="font-mono text-primary tracking-[0.2em] uppercase text-xs">— Nikola Tesla</cite>
        </div>
      </section>

      <QRSection />

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-primary/10 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-serif font-bold text-primary tracking-widest text-sm">MECF</div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="/quienes-somos" className="text-xs font-mono text-white/40 hover:text-primary transition-colors uppercase tracking-widest">Quiénes somos</a>
              <a href="/contacto" className="text-xs font-mono text-white/40 hover:text-primary transition-colors uppercase tracking-widest">Contacto</a>
              <a href="/glosario" className="text-xs font-mono text-white/40 hover:text-primary transition-colors uppercase tracking-widest">Glosario</a>
              <a href="/blog" className="text-xs font-mono text-white/40 hover:text-primary transition-colors uppercase tracking-widest">Blog</a>
              <a href="/acceso" className="text-xs font-mono text-white/40 hover:text-primary transition-colors uppercase tracking-widest">Área clientes</a>
              <a href="/protocolo" className="text-xs font-mono text-white/40 hover:text-primary transition-colors uppercase tracking-widest">Módulos</a>
              <a href="https://www.instagram.com/mecfmetodo/" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/40 hover:text-primary transition-colors uppercase tracking-widest">Instagram</a>
              <a href={QR_URL} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-primary/60 hover:text-primary transition-colors">{QR_URL}</a>
              <a href="/privacidad" className="text-xs font-mono text-white/40 hover:text-primary transition-colors uppercase tracking-widest">Privacidad</a>
              <a href="/terminos" className="text-xs font-mono text-white/40 hover:text-primary transition-colors uppercase tracking-widest">Términos</a>
            </div>
            <p className="text-xs font-mono text-muted-foreground">
              &copy; {new Date().getFullYear()} El Bachir Chekhad
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
