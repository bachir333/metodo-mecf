import { useEffect } from "react";
import { Link } from "wouter";
import SeoHead from "@/components/SeoHead";

const SECTION = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 40 }}>
    <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: "0.3em", color: "#d4af37", textTransform: "uppercase", marginBottom: 16, paddingBottom: 10, borderBottom: "1px solid rgba(212,175,55,0.12)" }}>
      {title}
    </h2>
    <div style={{ color: "rgba(255,255,255,0.58)", fontSize: 14, lineHeight: 1.85, fontWeight: 300 }}>
      {children}
    </div>
  </div>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ marginBottom: 14 }}>{children}</p>
);

const UL = ({ items }: { items: string[] }) => (
  <ul style={{ paddingLeft: 20, marginBottom: 14 }}>
    {items.map((item, i) => (
      <li key={i} style={{ marginBottom: 6, listStyleType: "none", paddingLeft: 16, position: "relative" }}>
        <span style={{ position: "absolute", left: 0, color: "#d4af37" }}>◈</span>
        {item}
      </li>
    ))}
  </ul>
);

export default function Terminos() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#fff", fontFamily: "Georgia, serif" }}>
      <SeoHead
        title="Términos y Condiciones — Método MECF"
        description="Términos y condiciones de compra del Método MECF. Informes digitales PDF, política de devolución y condiciones de uso."
        canonical="/terminos"
        noindex={false}
      />

      {/* Header */}
      <header style={{ position: "fixed", top: 0, width: "100%", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(8,8,8,0.95)", backdropFilter: "blur(12px)", zIndex: 50 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", color: "#d4af37", textDecoration: "none" }}>MECF</Link>
          <Link href="/protocolo" style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>OBTENER INFORME →</Link>
        </div>
      </header>

      <main style={{ maxWidth: 740, margin: "0 auto", padding: "100px 24px 80px" }}>

        {/* Title */}
        <div style={{ marginBottom: 52, borderBottom: "1px solid rgba(212,175,55,0.15)", paddingBottom: 32 }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: "0.4em", color: "rgba(212,175,55,0.6)", textTransform: "uppercase", marginBottom: 14 }}>
            Documento legal · Condiciones de compra
          </p>
          <h1 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(20px, 4vw, 30px)", fontWeight: 700, letterSpacing: "0.1em", color: "#fff", marginBottom: 16 }}>
            TÉRMINOS Y CONDICIONES
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>
            Última actualización: junio de 2025
          </p>
        </div>

        <SECTION title="01 · Objeto del servicio">
          <P>El Método MECF (en adelante, "el servicio") es un sistema de análisis biográfico numérico desarrollado por El Bachir Chekhad. El servicio consiste en la generación y entrega de un informe técnico personalizado en formato PDF ("el informe") basado en las fechas de nacimiento introducidas por el usuario.</P>
          <P>El informe es un producto digital de uso personal. No constituye asesoramiento psicológico, médico, financiero ni jurídico de ningún tipo.</P>
        </SECTION>

        <SECTION title="02 · Módulos disponibles y precios">
          <P>El servicio se ofrece en los siguientes módulos, con los precios indicados en el momento de la compra:</P>
          <UL items={[
            "Módulo Individual MECF (ACS-01) — análisis del sistema operativo individual.",
            "Módulo Árbol Genealógico (AVR-02) — análisis de patrones transgeneracionales.",
            "Módulo Socios & Parejas (SYN-03) — análisis del sistema sinérgico relacional.",
          ]} />
          <P>Los precios están expresados en euros (€) e incluyen el IVA aplicable. El precio vigente es el que aparece en la página de compra en el momento de realizar el pedido. Nos reservamos el derecho de modificar los precios en cualquier momento.</P>
        </SECTION>

        <SECTION title="03 · Proceso de compra y entrega">
          <P>El proceso de compra se realiza a través de la pasarela de pago segura de Stripe. Una vez confirmado el pago:</P>
          <UL items={[
            "El informe PDF personalizado se genera automáticamente.",
            "Se envía al email indicado durante el proceso de compra.",
            "La entrega se produce en los minutos siguientes a la confirmación del pago.",
            "El informe queda disponible para re-descarga desde el área de clientes (metodomecf.com/acceso).",
          ]} />
          <P>Si no recibes el informe en un plazo de 30 minutos, revisa la carpeta de spam o accede al área de clientes. Si el problema persiste, contacta con nosotros en <strong style={{ color: "#d4af37" }}>hola@metodomecf.com</strong>.</P>
        </SECTION>

        <SECTION title="04 · Derecho de desistimiento y garantía">
          <P>De conformidad con el artículo 103.a) del Real Decreto Legislativo 1/2007 (TRLGDCU), el derecho de desistimiento no se aplica a los contenidos digitales que no se suministren en un soporte material cuando la ejecución haya comenzado con el previo consentimiento expreso del consumidor.</P>
          <P>Al proceder al pago, el usuario acepta expresamente que la ejecución del servicio comienza de forma inmediata (generación del informe), por lo que renuncia al derecho de desistimiento de 14 días una vez recibido el informe.</P>
          <P><strong style={{ color: "rgba(255,255,255,0.75)" }}>Garantía de satisfacción:</strong> Si consideras que el informe no refleja con precisión los patrones descritos en la metodología MECF, puedes solicitarnos una revisión o reembolso completo dentro de los 14 días naturales siguientes a la compra, escribiendo a <strong style={{ color: "#d4af37" }}>hola@metodomecf.com</strong> con el asunto "GARANTÍA". Cada caso se evalúa individualmente.</P>
        </SECTION>

        <SECTION title="05 · Propiedad intelectual">
          <P>El Método MECF, sus textos, metodología, nomenclatura, estructura de informes, diseño y contenidos son propiedad intelectual de El Bachir Chekhad y están protegidos por la legislación española e internacional de propiedad intelectual.</P>
          <P>El informe adquirido es de uso estrictamente personal. Queda expresamente prohibido:</P>
          <UL items={[
            "Reproducir, distribuir o comercializar el informe o cualquier parte del mismo.",
            "Compartir el informe con terceros con fines comerciales.",
            "Presentar el contenido del informe como propio o de elaboración ajena.",
          ]} />
        </SECTION>

        <SECTION title="06 · Limitación de responsabilidad">
          <P>El servicio se presta "tal cual" con fines informativos y de autoconocimiento. El Bachir Chekhad no garantiza resultados específicos derivados de la lectura o aplicación del informe. En ningún caso la responsabilidad del prestador superará el importe abonado por el usuario en la compra correspondiente.</P>
        </SECTION>

        <SECTION title="07 · Legislación aplicable y jurisdicción">
          <P>Estos términos se rigen por la legislación española. Para cualquier controversia derivada de la compra o el uso del servicio, las partes se someten a los Juzgados y Tribunales del domicilio del consumidor, conforme a la normativa de protección al consumidor.</P>
          <P>Para resolución alternativa de litigios en línea: <strong style={{ color: "#d4af37" }}>ec.europa.eu/consumers/odr</strong></P>
        </SECTION>

        <SECTION title="08 · Contacto">
          <P>Para cualquier consulta relacionada con estos términos, escríbenos a <strong style={{ color: "#d4af37" }}>hola@metodomecf.com</strong>. Respondemos en un plazo máximo de 48 horas hábiles.</P>
        </SECTION>

        {/* Footer links */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(212,175,55,0.10)", display: "flex", gap: 24, flexWrap: "wrap" }}>
          <Link href="/privacidad" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "rgba(212,175,55,0.5)", textDecoration: "none" }}>
            Política de privacidad →
          </Link>
          <Link href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>
            ← Inicio
          </Link>
        </div>

      </main>
    </div>
  );
}
