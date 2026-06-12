export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/34633826953?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20MECF"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 group"
    >
      <span className="hidden group-hover:flex items-center bg-zinc-900 border border-primary/30 text-white text-xs font-mono tracking-widest px-4 py-2 whitespace-nowrap shadow-xl">
        ¿Hablamos? →
      </span>
      <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_0_24px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform">
        <svg viewBox="0 0 32 32" fill="white" className="w-7 h-7">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.65 4.826 1.79 6.854L2 30l7.374-1.768A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.9-1.614l-.422-.252-4.376 1.048 1.072-4.256-.276-.438A11.56 11.56 0 0 1 4.4 16C4.4 9.59 9.59 4.4 16 4.4S27.6 9.59 27.6 16 22.41 27.6 16 27.6zm6.356-8.67c-.348-.174-2.06-1.016-2.38-1.132-.32-.116-.552-.174-.784.174-.232.348-.9 1.132-1.102 1.364-.202.232-.404.26-.752.086-.348-.174-1.47-.542-2.8-1.726-1.034-.922-1.732-2.06-1.934-2.408-.202-.348-.022-.536.152-.71.156-.154.348-.406.522-.608.174-.202.232-.348.348-.58.116-.232.058-.436-.028-.61-.086-.174-.784-1.89-1.074-2.588-.282-.68-.57-.588-.784-.598l-.668-.012c-.232 0-.608.086-.926.434-.318.348-1.216 1.188-1.216 2.896s1.244 3.358 1.418 3.59c.174.232 2.448 3.736 5.932 5.24.83.358 1.478.572 1.982.732.832.264 1.59.226 2.19.138.668-.1 2.06-.842 2.35-1.656.29-.814.29-1.512.204-1.656-.086-.144-.318-.23-.666-.406z"/>
        </svg>
      </div>
    </a>
  );
}
