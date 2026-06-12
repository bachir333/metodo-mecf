import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";

interface Operator {
  id: number;
  name: string;
  email: string;
  plan: string;
}

interface Stats {
  leads: number;
  orders: number;
  fulfilled: number;
  revenue: string;
  commission: string;
  commissionRate: number;
}

interface Settlement {
  id: number;
  amount: string;
  note: string | null;
  createdAt: string;
}

interface Order {
  id: number;
  email: string;
  name: string;
  module: string;
  price: string;
  fulfilled: boolean;
  createdAt: string;
}

interface Lead {
  id: number;
  email: string;
  source: string;
  moduloKey: string | null;
  nurtureSeq: number;
  createdAt: string;
}

const API = "/api";

async function apiFetch(path: string, opts?: RequestInit) {
  const res = await fetch(`${API}${path}`, { credentials: "include", ...opts });
  return res;
}

const gold = "#fcd34d";
const goldDim = "rgba(252,211,77,0.6)";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Courier+Prime:wght@400;700&display=swap');
  .portal-root { background:#000; min-height:100vh; color:#fff; font-family:'Courier Prime',monospace; }
  .portal-root * { box-sizing:border-box; }
  .portal-header { display:flex; align-items:center; justify-content:space-between; padding:20px 32px; border-bottom:1px solid rgba(252,211,77,0.12); }
  .portal-logo { font-family:'Syncopate',sans-serif; font-size:13px; letter-spacing:4px; color:${gold}; }
  .portal-logout { background:none; border:1px solid rgba(252,211,77,0.25); color:rgba(252,211,77,0.6); font-family:'Courier Prime',monospace; font-size:11px; letter-spacing:2px; padding:6px 14px; cursor:pointer; transition:0.2s; }
  .portal-logout:hover { border-color:${gold}; color:${gold}; }
  .portal-tabs { display:flex; gap:0; border-bottom:1px solid rgba(255,255,255,0.08); padding:0 32px; }
  .portal-tab { background:none; border:none; border-bottom:2px solid transparent; color:rgba(255,255,255,0.4); font-family:'Courier Prime',monospace; font-size:11px; letter-spacing:3px; text-transform:uppercase; padding:14px 20px; cursor:pointer; transition:0.2s; }
  .portal-tab.active { color:${gold}; border-bottom-color:${gold}; }
  .portal-tab:hover { color:rgba(252,211,77,0.8); }
  .portal-body { padding:32px; max-width:1100px; margin:0 auto; }
  .stat-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:40px; }
  .stat-card { background:#050500; border:1px solid rgba(252,211,77,0.1); padding:24px 20px; position:relative; overflow:hidden; }
  .stat-card::before { content:''; position:absolute; top:0;left:0;right:0;height:1px; background:linear-gradient(90deg,transparent,rgba(252,211,77,0.4),transparent); }
  .stat-label { font-size:9px; letter-spacing:4px; color:rgba(255,255,255,0.35); text-transform:uppercase; margin-bottom:10px; }
  .stat-value { font-family:'Syncopate',sans-serif; font-size:1.8rem; color:${gold}; font-weight:700; }
  .stat-sub { font-size:9px; color:rgba(255,255,255,0.25); margin-top:4px; letter-spacing:2px; }
  .portal-table { width:100%; border-collapse:collapse; font-size:12px; }
  .portal-table th { font-size:9px; letter-spacing:3px; color:rgba(255,255,255,0.3); text-transform:uppercase; padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.06); text-align:left; }
  .portal-table td { padding:12px 14px; border-bottom:1px solid rgba(255,255,255,0.04); color:rgba(255,255,255,0.75); }
  .portal-table tr:hover td { background:rgba(252,211,77,0.02); }
  .badge { display:inline-block; font-size:8px; letter-spacing:2px; padding:3px 8px; border-radius:2px; text-transform:uppercase; }
  .badge-ok { background:rgba(0,255,136,0.1); color:#00ff88; border:1px solid rgba(0,255,136,0.2); }
  .badge-pending { background:rgba(252,211,77,0.08); color:${goldDim}; border:1px solid rgba(252,211,77,0.15); }
  .link-box { background:#050500; border:1px solid rgba(252,211,77,0.15); padding:24px; margin-bottom:32px; }
  .link-label { font-size:9px; letter-spacing:4px; color:rgba(255,255,255,0.3); text-transform:uppercase; margin-bottom:10px; }
  .link-url { font-size:12px; color:${gold}; word-break:break-all; margin-bottom:14px; }
  .link-copy { background:rgba(252,211,77,0.08); border:1px solid rgba(252,211,77,0.2); color:${gold}; font-family:'Courier Prime',monospace; font-size:10px; letter-spacing:2px; padding:8px 18px; cursor:pointer; transition:0.2s; }
  .link-copy:hover { background:rgba(252,211,77,0.15); }
  .empty-state { text-align:center; padding:60px 20px; color:rgba(255,255,255,0.2); font-size:12px; letter-spacing:2px; }
  @media(max-width:700px) { .stat-grid{grid-template-columns:repeat(2,1fr);} .portal-header{padding:16px 20px;} .portal-body{padding:20px;} .portal-tabs{padding:0 20px;} .portal-tab{padding:12px 12px;font-size:10px;} }
`;

/* ── LOGIN ─────────────────────────────── */
function LoginView({ onLogin }: { onLogin: (op: Operator) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await apiFetch("/auth/operator/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json() as { ok?: boolean; operator?: Operator; error?: string };
      if (!res.ok || !data.operator) { setErr(data.error ?? "Error de acceso"); return; }
      onLogin(data.operator);
    } catch { setErr("Error de conexión"); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#000" }}>
      <div style={{ width: "100%", maxWidth: 400, padding: "0 24px" }}>
        <div style={{ fontFamily: "'Syncopate',sans-serif", fontSize: 11, letterSpacing: 5, color: gold, textAlign: "center", marginBottom: 40 }}>
          PROTOCOLO MECF · OPERADORES
        </div>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 6 }}>Email</div>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)} required autoFocus
              style={{ width: "100%", background: "#050500", border: "1px solid rgba(252,211,77,0.2)", color: "#fff", fontFamily: "'Courier Prime',monospace", fontSize: 13, padding: "10px 14px", outline: "none" }}
            />
          </div>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 6 }}>Contraseña</div>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ width: "100%", background: "#050500", border: "1px solid rgba(252,211,77,0.2)", color: "#fff", fontFamily: "'Courier Prime',monospace", fontSize: 13, padding: "10px 14px", outline: "none" }}
            />
          </div>
          {err && <div style={{ fontSize: 11, color: "#ef4444", letterSpacing: 1 }}>{err}</div>}
          <button type="submit" disabled={loading}
            style={{ background: "rgba(252,211,77,0.08)", border: "1px solid rgba(252,211,77,0.3)", color: gold, fontFamily: "'Courier Prime',monospace", fontSize: 11, letterSpacing: 3, padding: "12px", cursor: "pointer", textTransform: "uppercase", marginTop: 8 }}>
            {loading ? "VERIFICANDO..." : "ACCEDER AL PORTAL"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── DASHBOARD ──────────────────────────── */
function Dashboard({ operator, onLogout }: { operator: Operator; onLogout: () => void }) {
  const [tab, setTab] = useState<"stats" | "orders" | "leads" | "link" | "cobros">("stats");
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [copied, setCopied] = useState(false);

  const referralLink = `${window.location.origin}/protocolo?op=${operator.id}`;

  const loadStats = useCallback(async () => {
    const r = await apiFetch("/portal/stats");
    if (r.ok) setStats(await r.json() as Stats);
  }, []);

  const loadOrders = useCallback(async () => {
    const r = await apiFetch("/portal/orders");
    if (r.ok) setOrders(await r.json() as Order[]);
  }, []);

  const loadLeads = useCallback(async () => {
    const r = await apiFetch("/portal/leads");
    if (r.ok) setLeads(await r.json() as Lead[]);
  }, []);

  const loadSettlements = useCallback(async () => {
    const r = await apiFetch("/portal/settlements");
    if (r.ok) setSettlements((await r.json() as { settlements: Settlement[] }).settlements);
  }, []);

  useEffect(() => { void loadStats(); }, [loadStats]);
  useEffect(() => { if (tab === "orders") void loadOrders(); }, [tab, loadOrders]);
  useEffect(() => { if (tab === "leads") void loadLeads(); }, [tab, loadLeads]);
  useEffect(() => { if (tab === "cobros") void loadSettlements(); }, [tab, loadSettlements]);

  function copyLink() {
    void navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function logout() {
    await apiFetch("/auth/operator/logout", { method: "POST" });
    onLogout();
  }

  function fmt(d: string) {
    return new Date(d).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
  }

  const moduleColor: Record<string, string> = {
    INDIVIDUAL: "#00f2ff",
    ÁRBOL: "#bc00ff",
    SYNERGY: "#00ff88",
  };

  return (
    <div className="portal-root">
      <header className="portal-header">
        <div>
          <div className="portal-logo">PORTAL MECF</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 2, marginTop: 2 }}>{operator.name} · {operator.plan.toUpperCase()}</div>
        </div>
        <button className="portal-logout" onClick={() => void logout()}>CERRAR SESIÓN</button>
      </header>

      <div className="portal-tabs">
        {(["stats", "orders", "leads", "cobros", "link"] as const).map(t => (
          <button key={t} className={`portal-tab${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
            {t === "stats" ? "RESUMEN" : t === "orders" ? "PEDIDOS" : t === "leads" ? "LEADS" : t === "cobros" ? "COBROS" : "MI ENLACE"}
          </button>
        ))}
      </div>

      <div className="portal-body">
        {tab === "stats" && (
          <>
            <div className="stat-grid">
              {[
                { label: "Leads captados", value: stats?.leads ?? "—", sub: "registros" },
                { label: "Informes entregados", value: stats?.fulfilled ?? "—", sub: "completados" },
                { label: "Ingresos generados", value: stats ? `${stats.revenue}€` : "—", sub: "venta total" },
                { label: `Comisión (${stats?.commissionRate ?? "—"}%)`, value: stats ? `${stats.commission}€` : "—", sub: "pendiente de cobro" },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 2, textAlign: "center" }}>
              Los datos se actualizan en tiempo real · Solo se muestran los registros vinculados a tu enlace de operador
            </div>
          </>
        )}

        {tab === "orders" && (
          orders.length === 0
            ? <div className="empty-state">SIN PEDIDOS AÚN<br /><span style={{ fontSize: 10 }}>Comparte tu enlace para empezar a generar informes</span></div>
            : <table className="portal-table">
              <thead><tr>
                <th>Cliente</th><th>Módulo</th><th>Precio</th><th>Estado</th><th>Fecha</th>
              </tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td>{o.email}</td>
                    <td><span style={{ color: moduleColor[o.module] ?? gold, fontSize: 10, letterSpacing: 2 }}>{o.module}</span></td>
                    <td style={{ color: gold }}>{o.price}€</td>
                    <td><span className={`badge ${o.fulfilled ? "badge-ok" : "badge-pending"}`}>{o.fulfilled ? "ENTREGADO" : "PENDIENTE"}</span></td>
                    <td style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>{fmt(o.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}

        {tab === "leads" && (
          leads.length === 0
            ? <div className="empty-state">SIN LEADS AÚN<br /><span style={{ fontSize: 10 }}>Los leads aparecerán cuando alguien use tu enlace</span></div>
            : <table className="portal-table">
              <thead><tr>
                <th>Email</th><th>Módulo interés</th><th>Secuencia nurture</th><th>Fuente</th><th>Fecha</th>
              </tr></thead>
              <tbody>
                {leads.map(l => (
                  <tr key={l.id}>
                    <td>{l.email}</td>
                    <td style={{ color: l.moduloKey ? moduleColor[l.moduloKey] ?? gold : "rgba(255,255,255,0.2)" }}>
                      {l.moduloKey ?? "—"}
                    </td>
                    <td style={{ color: gold }}>{l.nurtureSeq}/7</td>
                    <td style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: 1 }}>{l.source}</td>
                    <td style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>{fmt(l.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        )}

        {tab === "cobros" && (
          settlements.length === 0
            ? <div className="empty-state">SIN COBROS REGISTRADOS<br /><span style={{ fontSize: 10 }}>El administrador registrará tus pagos aquí</span></div>
            : <>
              <table className="portal-table">
                <thead><tr>
                  <th>Importe</th><th>Nota</th><th>Fecha</th>
                </tr></thead>
                <tbody>
                  {settlements.map(s => (
                    <tr key={s.id}>
                      <td style={{ color: gold, fontWeight: "bold" }}>{parseFloat(s.amount).toFixed(2)}€</td>
                      <td style={{ color: "rgba(255,255,255,0.6)" }}>{s.note ?? "—"}</td>
                      <td style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>{fmt(s.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 12, textAlign: "right", fontFamily: "'Courier Prime',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>
                Total cobrado: <span style={{ color: gold, fontWeight: "bold" }}>{settlements.reduce((a, s) => a + parseFloat(s.amount), 0).toFixed(2)}€</span>
              </div>
            </>
        )}

        {tab === "link" && (
          <div>
            <div className="link-box">
              <div className="link-label">Tu enlace de operador</div>
              <div className="link-url">{referralLink}</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="link-copy" onClick={copyLink}>
                  {copied ? "✓ COPIADO" : "COPIAR ENLACE"}
                </button>
                <a href={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&color=d4af37&bgcolor=080808&data=${encodeURIComponent(referralLink)}`}
                  download="mecf-qr.png" target="_blank" rel="noreferrer"
                  style={{ background: "rgba(252,211,77,0.08)", border: "1px solid rgba(252,211,77,0.2)", color: gold, fontFamily: "'Courier Prime',monospace", fontSize: 10, letterSpacing: 2, padding: "8px 18px", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                  DESCARGAR QR
                </a>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=d4af37&bgcolor=050500&data=${encodeURIComponent(referralLink)}`}
                alt="QR enlace operador"
                style={{ width: 160, height: 160, border: "1px solid rgba(212,175,55,0.2)" }}
              />
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", lineHeight: 1.8, letterSpacing: 1 }}>
              Comparte este enlace o código QR con tus clientes. Todos los leads y pedidos que lleguen a través de él quedarán registrados en tu portal automáticamente.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── ROOT ───────────────────────────────── */
export default function Portal() {
  const [operator, setOperator] = useState<Operator | null>(null);
  const [checking, setChecking] = useState(true);
  const [, navigate] = useLocation();

  useEffect(() => {
    apiFetch("/auth/operator/me")
      .then(async r => {
        if (r.ok) {
          const d = await r.json() as { operator: Operator };
          setOperator(d.operator);
        }
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "'Courier Prime',monospace", fontSize: 10, letterSpacing: 4, color: "rgba(252,211,77,0.4)" }}>CARGANDO...</div>
      </div>
    );
  }

  return (
    <>
      <style>{css}</style>
      {operator
        ? <Dashboard operator={operator} onLogout={() => { setOperator(null); navigate("/portal"); }} />
        : <LoginView onLogin={op => setOperator(op)} />
      }
    </>
  );
}
