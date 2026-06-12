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

export default function Privacidad() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#fff", fontFamily: "Georgia, serif" }}>
      <SeoHead
        title="Política de Privacidad — Método MECF"
        description="Política de privacidad y protección de datos del Método MECF (metodomecf.com) conforme al RGPD."
        canonical="/privacidad"
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
            Documento legal · RGPD
          </p>
          <h1 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(20px, 4vw, 30px)", fontWeight: 700, letterSpacing: "0.1em", color: "#fff", marginBottom: 16 }}>
            POLÍTICA DE PRIVACIDAD
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>
            Última actualización: junio de 2025
          </p>
        </div>

        <SECTION title="01 · Responsable del tratamiento">
          <P>El responsable del tratamiento de los datos personales recogidos a través de esta web es:</P>
          <UL items={[
            "Nombre: El Bachir Chekhad",
            "Web: metodomecf.com",
            "Email de contacto: hola@metodomecf.com",
          ]} />
        </SECTION>

        <SECTION title="02 · Datos que recopilamos">
          <P>Recogemos únicamente los datos necesarios para prestar el servicio:</P>
          <UL items={[
            "Nombre y apellidos (o nombre de pila): para personalizar el informe PDF.",
            "Dirección de email: para enviar el informe y, con tu consentimiento, comunicaciones de seguimiento.",
            "Fecha(s) de nacimiento: dato nuclear para generar el análisis biográfico personalizado.",
            "Datos de pago: gestionados íntegramente por Stripe. No almacenamos datos de tarjeta en ningún caso.",
            "Datos de navegación: dirección IP, tipo de navegador, páginas visitadas (vía Google Tag Manager y Meta Pixel).",
          ]} />
        </SECTION>

        <SECTION title="03 · Finalidades y base legal">
          <P><strong style={{ color: "rgba(255,255,255,0.75)" }}>Prestación del servicio (base: ejecución de contrato)</strong><br />
          Procesamos tu nombre, email y fechas de nacimiento para generar y entregar tu informe PDF personalizado. Sin estos datos no es posible prestar el servicio contratado.</P>
          <P><strong style={{ color: "rgba(255,255,255,0.75)" }}>Comunicaciones de seguimiento (base: interés legítimo / consentimiento)</strong><br />
          Con tu consentimiento expreso, podemos enviarte una secuencia de emails de seguimiento relacionados con el método y tus resultados. Puedes darte de baja en cualquier momento haciendo clic en "Cancelar suscripción" en cualquiera de esos emails.</P>
          <P><strong style={{ color: "rgba(255,255,255,0.75)" }}>Analítica y mejora del servicio (base: interés legítimo)</strong><br />
          Utilizamos Google Tag Manager y Meta Pixel para medir el rendimiento de la web y optimizar la experiencia. Puedes gestionar estas cookies desde nuestro banner de cookies.</P>
        </SECTION>

        <SECTION title="04 · Proveedores y transferencias">
          <P>Trabajamos con los siguientes proveedores de confianza que pueden acceder a tus datos en calidad de encargados del tratamiento:</P>
          <UL items={[
            "Stripe Inc. — procesamiento de pagos (USA, acogido al Data Privacy Framework).",
            "Brevo (Sendinblue) — envío de emails transaccionales y de seguimiento (UE).",
            "Google LLC — analítica vía Google Tag Manager (USA, acogido al Data Privacy Framework).",
            "Meta Platforms — publicidad y medición vía Meta Pixel (USA, acogido al Data Privacy Framework).",
          ]} />
          <P>No vendemos ni cedemos tus datos a terceros para sus propios fines comerciales.</P>
        </SECTION>

        <SECTION title="05 · Conservación de los datos">
          <P>Conservamos tus datos durante el tiempo necesario para la prestación del servicio y durante los plazos legales de conservación aplicables (mínimo 5 años para datos de facturación conforme a la legislación fiscal española). Los datos de email marketing se conservan hasta que solicites la baja.</P>
        </SECTION>

        <SECTION title="06 · Tus derechos (RGPD)">
          <P>Como titular de los datos tienes derecho a:</P>
          <UL items={[
            "Acceso: conocer qué datos tenemos sobre ti.",
            "Rectificación: corregir datos inexactos.",
            "Supresión ('derecho al olvido'): solicitar que eliminemos tus datos.",
            "Portabilidad: recibir tus datos en formato estructurado.",
            "Limitación del tratamiento: solicitar que restrinjamos el uso de tus datos.",
            "Oposición: oponerte al tratamiento basado en interés legítimo.",
          ]} />
          <P>Para ejercer cualquiera de estos derechos, escríbenos a <strong style={{ color: "#d4af37" }}>hola@metodomecf.com</strong> indicando el derecho que deseas ejercer. Responderemos en un plazo máximo de 30 días. También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).</P>
        </SECTION>

        <SECTION title="07 · Cookies">
          <P>Utilizamos las siguientes categorías de cookies:</P>
          <UL items={[
            "Cookies estrictamente necesarias: para el funcionamiento básico del sitio y recordar tus preferencias de cookies.",
            "Cookies analíticas: Google Tag Manager / Google Analytics para medir el tráfico y el comportamiento de navegación.",
            "Cookies de marketing: Meta Pixel para medir conversiones y mostrar publicidad relevante.",
          ]} />
          <P>Puedes aceptar o rechazar las cookies no esenciales a través de nuestro banner de cookies. En cualquier momento puedes gestionar tus preferencias desde la configuración de tu navegador.</P>
        </SECTION>

        <SECTION title="08 · Seguridad">
          <P>Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos: transmisión cifrada (HTTPS/TLS), acceso restringido a los datos de producción y proveedores que cumplen con el RGPD o marcos equivalentes.</P>
        </SECTION>

        <SECTION title="09 · Cambios en esta política">
          <P>Podemos actualizar esta política ocasionalmente. La fecha de última actualización siempre estará indicada al inicio del documento. Si los cambios son significativos, te lo comunicaremos por email si tienes una compra activa.</P>
        </SECTION>

        {/* Footer links */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(212,175,55,0.10)", display: "flex", gap: 24, flexWrap: "wrap" }}>
          <Link href="/terminos" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "rgba(212,175,55,0.5)", textDecoration: "none" }}>
            Términos y condiciones →
          </Link>
          <Link href="/" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", textDecoration: "none" }}>
            ← Inicio
          </Link>
        </div>

      </main>
    </div>
  );
}
