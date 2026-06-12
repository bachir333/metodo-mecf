import { useEffect, useState, useCallback } from "react";
import SeoHead from "@/components/SeoHead";

type Stats = {
  leads: { total: number; week: number };
  orders: { total: number; week: number; pending: number };
  revenue: { total: number; week: number };
  sources: { source: string; count: number }[];
  modules: { module: string; count: number }[];
};
type Lead = { id: number; email: string; source: string; moduloKey: string | null; nurtureSeq: number; createdAt: string };
type Order = { id: number; email: string; name: string; module: string; price: string; fulfilled: boolean; createdAt: string };
type OperatorStat = { id: number; name: string; email: string; plan: string; commissionRate: number; active: boolean; revenue: number; commission: number; fulfilledOrders: number; pendingOrders: number; leads: number; createdAt: string };

function fmt(d: string) {
  return new Date(d).toLocaleString("es-ES", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: boolean }) {
  return (
    <div className={`border p-5 space-y-1 ${accent ? "border-primary/40 bg-primary/5" : "border-white/15 bg-zinc-950"}`}>
      <p className="font-mono text-[9px] tracking-widest uppercase text-white/55">{label}</p>
      <p className={`font-mono text-3xl font-bold ${accent ? "text-primary" : "text-white"}`}>{value}</p>
      {sub && <p className="font-mono text-[10px] text-white/50">{sub}</p>}
    </div>
  );
}

// ── Lock screen ──────────────────────────────────────────────
function LockScreen({ onUnlock }: { onUnlock: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const tryUnlock = async () => {
    if (!pw.trim()) return;
    setLoading(true);
    setErr(false);
    try {
      const r = await fetch("/api/admin/stats", { headers: { "X-Admin-Token": pw } });
      if (r.ok) { onUnlock(pw); }
      else { setErr(true); }
    } catch { setErr(true); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
      <div className="w-full max-w-sm border border-primary/20 bg-zinc-950 p-10 space-y-7">
        <div>
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-primary/70 mb-3">— Acceso restringido —</p>
          <h1 className="font-mono text-xl font-bold text-white tracking-widest">MECF ADMIN</h1>
        </div>
        <div className="h-px bg-primary/10" />
        <div className="space-y-4">
          <div>
            <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/60 block mb-2">Contraseña</label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setErr(false); }}
              onKeyDown={e => e.key === "Enter" && tryUnlock()}
              placeholder="••••••••"
              className="w-full bg-black border border-white/10 text-white font-mono text-sm px-4 py-3 placeholder:text-white/15 focus:outline-none focus:border-primary/50 transition-colors"
            />
            {err && <p className="font-mono text-[9px] tracking-wider text-red-400/80 mt-2">Contraseña incorrecta.</p>}
          </div>
          <button
            onClick={tryUnlock}
            disabled={loading || !pw}
            className="w-full py-3 font-mono font-bold text-sm uppercase tracking-widest text-black bg-primary hover:bg-white transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Verificando…" : "Acceder →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Admin ────────────────────────────────────────────────
export default function Admin() {
  const [token, setToken] = useState<string | null>(() => {
    try { return sessionStorage.getItem("mecf_admin_token"); } catch { return null; }
  });

  const handleUnlock = (pw: string) => {
    try { sessionStorage.setItem("mecf_admin_token", pw); } catch { /* noop */ }
    setToken(pw);
  };

  if (!token) return <LockScreen onUnlock={handleUnlock} />;
  return <Dashboard token={token} onLogout={() => { try { sessionStorage.removeItem("mecf_admin_token"); } catch { /* noop */ } setToken(null); }} />;
}

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<"orders" | "leads" | "operadores">("orders");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "sent">("all");
  const [resending, setResending] = useState<number | null>(null);
  const [resendStatus, setResendStatus] = useState<Record<number, "ok" | "err">>({});
  const [nurturing, setNurturing] = useState<number | null>(null);
  const [nurtureStatus, setNurtureStatus] = useState<Record<number, "ok" | "err" | "done">>({});
  const [operators, setOperators] = useState<OperatorStat[]>([]);
  const [editingCommission, setEditingCommission] = useState<Record<number, string>>({});
  const [savingCommission, setSavingCommission] = useState<number | null>(null);
  const [settlementForm, setSettlementForm] = useState<Record<number, { amount: string; note: string; open: boolean }>>({});
  const [savingSettlement, setSavingSettlement] = useState<number | null>(null);
  const [newOpForm, setNewOpForm] = useState({ open: false, name: "", email: "", password: "", commission: "30", saving: false, error: "" });
  const [resetPwForm, setResetPwForm] = useState<Record<number, { open: boolean; password: string; saving: boolean }>>({});

  const headers = { "X-Admin-Token": token };

  const loadData = useCallback(() => {
    setLoading(true);
    Promise.all([
      fetch("/api/admin/stats", { headers }).then(r => r.json()),
      fetch("/api/admin/leads", { headers }).then(r => r.json()),
      fetch("/api/admin/orders", { headers }).then(r => r.json()),
      fetch("/api/admin/operators", { headers }).then(r => r.json()),
    ]).then(([s, l, o, ops]) => {
      setStats(s as Stats);
      setLeads((l as { leads: Lead[] }).leads);
      setOrders((o as { orders: Order[] }).orders);
      setOperators((ops as { operators: OperatorStat[] }).operators ?? []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [token]);

  const saveCommission = async (opId: number) => {
    const val = parseInt(editingCommission[opId] ?? "", 10);
    if (isNaN(val) || val < 0 || val > 100) return;
    setSavingCommission(opId);
    try {
      await fetch(`/api/admin/operators/${opId}`, { method: "PATCH", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ commissionRate: val }) });
      setOperators(prev => prev.map(op => op.id === opId ? { ...op, commissionRate: val, commission: parseFloat((op.revenue * val / 100).toFixed(2)) } : op));
      setEditingCommission(prev => { const n = { ...prev }; delete n[opId]; return n; });
    } catch { /* noop */ }
    setSavingCommission(null);
  };

  const toggleActive = async (opId: number, active: boolean) => {
    try {
      await fetch(`/api/admin/operators/${opId}`, { method: "PATCH", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ active }) });
      setOperators(prev => prev.map(op => op.id === opId ? { ...op, active } : op));
    } catch { /* noop */ }
  };

  const createOperator = async () => {
    const { name, email, password, commission } = newOpForm;
    if (!name || !email || !password || password.length < 8) {
      setNewOpForm(f => ({ ...f, error: "Nombre, email y contraseña (≥8 chars) son obligatorios" }));
      return;
    }
    setNewOpForm(f => ({ ...f, saving: true, error: "" }));
    try {
      const r = await fetch("/api/admin/operators", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, commissionRate: parseInt(commission || "30", 10) }),
      });
      const body = await r.json() as { ok?: boolean; error?: string };
      if (r.ok) {
        setNewOpForm({ open: false, name: "", email: "", password: "", commission: "30", saving: false, error: "" });
        loadData();
      } else {
        setNewOpForm(f => ({ ...f, saving: false, error: body.error ?? "Error al crear" }));
      }
    } catch {
      setNewOpForm(f => ({ ...f, saving: false, error: "Error de conexión" }));
    }
  };

  const resetPassword = async (opId: number) => {
    const pw = resetPwForm[opId]?.password ?? "";
    if (pw.length < 8) return;
    setResetPwForm(prev => ({ ...prev, [opId]: { ...prev[opId]!, saving: true } }));
    try {
      await fetch(`/api/admin/operators/${opId}/reset-password`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      setResetPwForm(prev => ({ ...prev, [opId]: { open: false, password: "", saving: false } }));
    } catch { /* noop */ }
    setResetPwForm(prev => ({ ...prev, [opId]: { ...prev[opId]!, saving: false } }));
  };

  const saveSettlement = async (opId: number) => {
    const form = settlementForm[opId];
    const amount = parseFloat(form?.amount ?? "");
    if (!form || isNaN(amount) || amount <= 0) return;
    setSavingSettlement(opId);
    try {
      const r = await fetch(`/api/admin/operators/${opId}/settlements`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ amount, note: form.note || undefined }),
      });
      if (r.ok) {
        setSettlementForm(prev => ({ ...prev, [opId]: { amount: "", note: "", open: false } }));
      }
    } catch { /* noop */ }
    setSavingSettlement(null);
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
    window.scrollTo(0, 0);
    loadData();
  }, [loadData]);

  const resend = async (orderId: number) => {
    setResending(orderId);
    try {
      const r = await fetch(`/api/admin/resend/${orderId}`, { method: "POST", headers });
      setResendStatus(s => ({ ...s, [orderId]: r.ok ? "ok" : "err" }));
      if (r.ok) setOrders(prev => prev.map(o => o.id === orderId ? { ...o, fulfilled: true } : o));
    } catch {
      setResendStatus(s => ({ ...s, [orderId]: "err" }));
    }
    setResending(null);
  };

  const sendNurture = async (leadId: number) => {
    setNurturing(leadId);
    try {
      const r = await fetch(`/api/admin/nurture/${leadId}`, { method: "POST", headers });
      if (r.ok) {
        setNurtureStatus(s => ({ ...s, [leadId]: "ok" }));
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, nurtureSeq: l.nurtureSeq + 1 } : l));
      } else {
        const body = await r.json().catch(() => ({})) as { error?: string };
        if (body.error?.includes("completada")) {
          setNurtureStatus(s => ({ ...s, [leadId]: "done" }));
        } else {
          setNurtureStatus(s => ({ ...s, [leadId]: "err" }));
        }
      }
    } catch {
      setNurtureStatus(s => ({ ...s, [leadId]: "err" }));
    }
    setNurturing(null);
  };

  const filteredOrders = orders.filter(o => {
    if (filter === "pending") return !o.fulfilled;
    if (filter === "sent") return o.fulfilled;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans">
      <SeoHead title="Admin — MECF" description="" noindex={true} />

      {/* Header */}
      <header className="border-b border-white/6 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between bg-zinc-950 sticky top-0 z-10 gap-3 flex-wrap">
        <div>
          <p className="font-mono text-[8px] tracking-[0.4em] uppercase text-primary/70">Panel de administración</p>
          <h1 className="font-mono font-bold text-sm md:text-base text-white mt-0.5 tracking-widest">MECF · Dashboard</h1>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <button onClick={loadData} className="font-mono text-[9px] tracking-widest uppercase text-white/55 hover:text-white transition-colors">
            <span className="hidden sm:inline">↺ Actualizar</span>
            <span className="sm:hidden">↺</span>
          </button>
          <a href="/" className="font-mono text-[9px] tracking-widest uppercase text-white/55 hover:text-primary transition-colors">
            <span className="hidden sm:inline">← Web</span>
            <span className="sm:hidden">← Web</span>
          </a>
          <button onClick={onLogout} className="font-mono text-[9px] tracking-widest uppercase text-red-400/70 hover:text-red-400 transition-colors">Salir</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {!loading && stats && (
          <>
            {/* ── STATS ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard label="Ingresos totales" value={`${stats.revenue.total.toFixed(2)}€`} sub={`+${stats.revenue.week.toFixed(2)}€ esta semana`} accent />
              <StatCard label="Pedidos entregados" value={stats.orders.total} sub={`+${stats.orders.week} esta semana`} />
              <StatCard label="Leads captados" value={stats.leads.total} sub={`+${stats.leads.week} esta semana`} />
              <StatCard label="Pendientes envío" value={stats.orders.pending} sub="sin fulfillment" />
            </div>

            {/* ── BREAKDOWN ── */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="border border-white/6 bg-zinc-950 p-5">
                <p className="font-mono text-[9px] tracking-widest uppercase text-white/60 mb-4">Ventas por módulo</p>
                <div className="space-y-3">
                  {stats.modules.length === 0 && <p className="text-white/50 text-xs font-mono">Sin datos aún</p>}
                  {stats.modules.map(m => (
                    <div key={m.module} className="flex items-center gap-3">
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary/80 rounded-full" style={{ width: `${Math.min(100, (m.count / (stats.orders.total || 1)) * 100)}%` }} />
                      </div>
                      <span className="font-mono text-[10px] text-white/70 uppercase tracking-wide w-24 text-right">{m.module}</span>
                      <span className="font-mono text-xs font-bold text-primary w-6 text-right">{m.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-white/15 bg-zinc-950 p-5">
                <p className="font-mono text-[9px] tracking-widest uppercase text-white/60 mb-4">Leads por fuente</p>
                <div className="space-y-3">
                  {stats.sources.length === 0 && <p className="text-white/50 text-xs font-mono">Sin datos aún</p>}
                  {stats.sources.map(s => (
                    <div key={s.source} className="flex items-center gap-3">
                      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-white/50 rounded-full" style={{ width: `${Math.min(100, (s.count / (stats.leads.total || 1)) * 100)}%` }} />
                      </div>
                      <span className="font-mono text-[10px] text-white/70 uppercase tracking-wide w-24 text-right">{s.source}</span>
                      <span className="font-mono text-xs font-bold text-white/80 w-6 text-right">{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── TABS ── */}
            <div className="border border-white/6 bg-zinc-950">
              <div className="flex items-center justify-between border-b border-white/6 px-4">
                <div className="flex">
                  {(["orders", "leads", "operadores"] as const).map(t => (
                    <button key={t} onClick={() => setTab(t)}
                      className={`px-5 py-3 font-mono text-[9px] tracking-widest uppercase transition-colors ${tab === t ? "text-primary border-b-2 border-primary -mb-px" : "text-white/55 hover:text-white/80"}`}>
                      {t === "orders" ? `Pedidos (${orders.length})` : t === "leads" ? `Leads (${leads.length})` : `Operadores (${operators.length})`}
                    </button>
                  ))}
                </div>
                {tab === "orders" && (
                  <div className="flex gap-2">
                    {(["all", "pending", "sent"] as const).map(f => (
                      <button key={f} onClick={() => setFilter(f)}
                        className={`font-mono text-[8px] tracking-widest uppercase px-3 py-1 transition-colors ${filter === f ? "bg-primary/15 text-primary border border-primary/30" : "text-white/50 hover:text-white/75"}`}>
                        {f === "all" ? "Todos" : f === "pending" ? "Pendientes" : "Enviados"}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── ORDERS: desktop table ── */}
              {tab === "orders" && (
                <>
                  {/* Desktop */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5">
                          {["Fecha", "Nombre", "Email", "Módulo", "Precio", "Estado", "Acción"].map(h => (
                            <th key={h} className="text-left px-4 py-3 font-mono text-[8px] tracking-widest uppercase text-white/55">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map(o => (
                          <tr key={o.id} className={`border-b border-white/4 transition-colors ${!o.fulfilled ? "bg-yellow-950/10" : "hover:bg-white/[0.01]"}`}>
                            <td className="px-4 py-3 font-mono text-[10px] text-white/60 whitespace-nowrap">{fmt(o.createdAt)}</td>
                            <td className="px-4 py-3 font-mono text-xs text-white">{o.name}</td>
                            <td className="px-4 py-3 font-mono text-[11px] text-white/75">{o.email}</td>
                            <td className="px-4 py-3">
                              <span className={`font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border ${
                                o.module === "INDIVIDUAL" ? "border-cyan-500/50 text-cyan-300 bg-cyan-950/30" :
                                o.module === "ÁRBOL" ? "border-purple-500/50 text-purple-300 bg-purple-950/30" :
                                "border-green-500/50 text-green-300 bg-green-950/30"
                              }`}>{o.module}</span>
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-primary font-bold">{o.price}€</td>
                            <td className="px-4 py-3">
                              <span className={`font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border ${
                                o.fulfilled ? "bg-green-950/30 text-green-400 border-green-800/40" : "bg-yellow-950/30 text-yellow-400 border-yellow-800/40"
                              }`}>
                                {o.fulfilled ? "✓ Enviado" : "⚠ Pendiente"}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {resendStatus[o.id] === "ok" ? (
                                <span className="font-mono text-[8px] text-green-400 tracking-widest">✓ Reenviado</span>
                              ) : resendStatus[o.id] === "err" ? (
                                <span className="font-mono text-[8px] text-red-400 tracking-widest">✗ Error</span>
                              ) : (
                                <button onClick={() => resend(o.id)} disabled={resending === o.id}
                                  className="font-mono text-[8px] tracking-widest uppercase px-3 py-1 border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/70 transition-colors disabled:opacity-40">
                                  {resending === o.id ? "…" : "Reenviar PDF"}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                        {filteredOrders.length === 0 && (
                          <tr><td colSpan={7} className="px-4 py-10 text-center text-white/50 font-mono text-xs">Sin pedidos</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile cards */}
                  <div className="md:hidden divide-y divide-white/5">
                    {filteredOrders.length === 0 && (
                      <p className="px-4 py-10 text-center text-white/50 font-mono text-xs">Sin pedidos</p>
                    )}
                    {filteredOrders.map(o => (
                      <div key={o.id} className={`px-4 py-4 space-y-3 ${!o.fulfilled ? "bg-yellow-950/10" : ""}`}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-mono text-xs text-white font-bold truncate">{o.name}</p>
                            <p className="font-mono text-[10px] text-white/65 truncate">{o.email}</p>
                          </div>
                          <span className={`font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border shrink-0 ${
                            o.fulfilled ? "bg-green-950/30 text-green-400 border-green-800/40" : "bg-yellow-950/30 text-yellow-400 border-yellow-800/40"
                          }`}>
                            {o.fulfilled ? "✓ Enviado" : "⚠ Pendiente"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className={`font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border ${
                            o.module === "INDIVIDUAL" ? "border-cyan-500/50 text-cyan-300 bg-cyan-950/30" :
                            o.module === "ÁRBOL" ? "border-purple-500/50 text-purple-300 bg-purple-950/30" :
                            "border-green-500/50 text-green-300 bg-green-950/30"
                          }`}>{o.module}</span>
                          <span className="font-mono text-xs text-primary font-bold">{o.price}€</span>
                          <span className="font-mono text-[10px] text-white/50">{fmt(o.createdAt)}</span>
                        </div>
                        <div>
                          {resendStatus[o.id] === "ok" ? (
                            <span className="font-mono text-[8px] text-green-400 tracking-widest">✓ Reenviado</span>
                          ) : resendStatus[o.id] === "err" ? (
                            <span className="font-mono text-[8px] text-red-400 tracking-widest">✗ Error</span>
                          ) : (
                            <button onClick={() => resend(o.id)} disabled={resending === o.id}
                              className="font-mono text-[8px] tracking-widest uppercase px-3 py-1.5 border border-primary/40 text-primary hover:bg-primary/10 transition-colors disabled:opacity-40">
                              {resending === o.id ? "…" : "Reenviar PDF"}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* ── LEADS ── */}
              {tab === "leads" && (
                <>
                  {/* Desktop */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5">
                          {["Fecha", "Email", "Fuente", "Módulo", "Secuencia", "Acción"].map(h => (
                            <th key={h} className="text-left px-4 py-3 font-mono text-[8px] tracking-widest uppercase text-white/55">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map(l => (
                          <tr key={l.id} className="border-b border-white/4 hover:bg-white/[0.01] transition-colors">
                            <td className="px-4 py-3 font-mono text-[10px] text-white/60 whitespace-nowrap">{fmt(l.createdAt)}</td>
                            <td className="px-4 py-3 font-mono text-[11px] text-white/85">{l.email}</td>
                            <td className="px-4 py-3">
                              <span className="font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 bg-primary/10 text-primary border border-primary/30">{l.source}</span>
                            </td>
                            <td className="px-4 py-3 font-mono text-[10px] text-white/65">{l.moduloKey ?? "—"}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                {[1, 2].map(s => (
                                  <div key={s} className={`w-2 h-2 rounded-full ${l.nurtureSeq >= s ? "bg-primary" : "bg-white/15"}`} />
                                ))}
                                <span className="font-mono text-[9px] text-white/50 ml-1">{l.nurtureSeq}/2</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {nurtureStatus[l.id] === "ok" ? (
                                <span className="font-mono text-[8px] text-green-400 tracking-widest">✓ Enviado</span>
                              ) : nurtureStatus[l.id] === "done" ? (
                                <span className="font-mono text-[8px] text-white/40 tracking-widest">Completado</span>
                              ) : nurtureStatus[l.id] === "err" ? (
                                <span className="font-mono text-[8px] text-red-400 tracking-widest">✗ Error</span>
                              ) : l.nurtureSeq >= 2 ? (
                                <span className="font-mono text-[8px] text-white/30 tracking-widest">Secuencia completa</span>
                              ) : (
                                <button onClick={() => sendNurture(l.id)} disabled={nurturing === l.id}
                                  className="font-mono text-[8px] tracking-widest uppercase px-3 py-1 border border-white/20 text-white/60 hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-40">
                                  {nurturing === l.id ? "…" : `Enviar email ${l.nurtureSeq + 1}`}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                        {leads.length === 0 && (
                          <tr><td colSpan={6} className="px-4 py-10 text-center text-white/50 font-mono text-xs">Sin leads aún</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile cards */}
                  <div className="md:hidden divide-y divide-white/5">
                    {leads.length === 0 && (
                      <p className="px-4 py-10 text-center text-white/50 font-mono text-xs">Sin leads aún</p>
                    )}
                    {leads.map(l => (
                      <div key={l.id} className="px-4 py-4 space-y-2">
                        <p className="font-mono text-xs text-white/85 truncate">{l.email}</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 bg-primary/10 text-primary border border-primary/30">{l.source}</span>
                          {l.moduloKey && <span className="font-mono text-[9px] text-white/65">{l.moduloKey}</span>}
                          <div className="flex gap-1 items-center">
                            {[1, 2].map(s => (
                              <div key={s} className={`w-2 h-2 rounded-full ${l.nurtureSeq >= s ? "bg-primary" : "bg-white/15"}`} />
                            ))}
                            <span className="font-mono text-[9px] text-white/50 ml-1">{l.nurtureSeq}/2</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-[9px] text-white/45">{fmt(l.createdAt)}</p>
                          {nurtureStatus[l.id] === "ok" ? (
                            <span className="font-mono text-[8px] text-green-400">✓ Enviado</span>
                          ) : nurtureStatus[l.id] === "done" || l.nurtureSeq >= 2 ? (
                            <span className="font-mono text-[8px] text-white/30">Completo</span>
                          ) : (
                            <button onClick={() => sendNurture(l.id)} disabled={nurturing === l.id}
                              className="font-mono text-[8px] tracking-widest uppercase px-3 py-1 border border-white/20 text-white/60 hover:text-primary hover:border-primary/40 transition-colors disabled:opacity-40">
                              {nurturing === l.id ? "…" : `Email ${l.nurtureSeq + 1}`}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* ── OPERADORES ── */}
              {tab === "operadores" && (
                <>
                  {/* Nuevo operador */}
                  <div className="border-b border-white/6 px-4 py-3">
                    {!newOpForm.open ? (
                      <button onClick={() => setNewOpForm(f => ({ ...f, open: true }))}
                        className="font-mono text-[9px] tracking-widest uppercase px-4 py-2 border border-primary/40 text-primary hover:bg-primary/10 transition-colors">
                        + Nuevo operador
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <p className="font-mono text-[9px] tracking-widest uppercase text-primary/70">Nuevo operador</p>
                        <div className="flex flex-wrap gap-2">
                          <input type="text" placeholder="Nombre" value={newOpForm.name}
                            onChange={e => setNewOpForm(f => ({ ...f, name: e.target.value }))}
                            className="bg-black border border-white/15 text-white font-mono text-xs px-3 py-2 focus:outline-none focus:border-primary/50 w-36" />
                          <input type="email" placeholder="Email" value={newOpForm.email}
                            onChange={e => setNewOpForm(f => ({ ...f, email: e.target.value }))}
                            className="bg-black border border-white/15 text-white font-mono text-xs px-3 py-2 focus:outline-none focus:border-primary/50 w-48" />
                          <input type="password" placeholder="Contraseña (≥8)" value={newOpForm.password}
                            onChange={e => setNewOpForm(f => ({ ...f, password: e.target.value }))}
                            className="bg-black border border-white/15 text-white font-mono text-xs px-3 py-2 focus:outline-none focus:border-primary/50 w-40" />
                          <div className="flex items-center gap-1">
                            <input type="number" placeholder="%" min={0} max={100} value={newOpForm.commission}
                              onChange={e => setNewOpForm(f => ({ ...f, commission: e.target.value }))}
                              className="bg-black border border-white/15 text-white font-mono text-xs px-2 py-2 focus:outline-none focus:border-primary/50 w-14" />
                            <span className="font-mono text-[9px] text-white/40">%</span>
                          </div>
                          <button onClick={() => void createOperator()} disabled={newOpForm.saving}
                            className="font-mono text-[9px] tracking-widest uppercase px-4 py-2 bg-primary/10 text-primary border border-primary/40 hover:bg-primary/20 disabled:opacity-40 transition-colors">
                            {newOpForm.saving ? "Creando…" : "Crear →"}
                          </button>
                          <button onClick={() => setNewOpForm(f => ({ ...f, open: false, error: "" }))}
                            className="font-mono text-[9px] text-white/40 hover:text-white/70 px-2">✕</button>
                        </div>
                        {newOpForm.error && <p className="font-mono text-[9px] text-red-400/80">{newOpForm.error}</p>}
                      </div>
                    )}
                  </div>
                  {/* Desktop */}
                  <div className="hidden md:block overflow-x-auto">
                    {operators.length === 0 ? (
                      <p className="px-4 py-10 text-center text-white/50 font-mono text-xs">Sin operadores registrados</p>
                    ) : (
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/5">
                            {["Nombre", "Email", "Leads", "Pedidos", "Ingresos generados", "Comisión %", "Comisión debida", "Estado"].map(h => (
                              <th key={h} className="text-left px-4 py-3 font-mono text-[8px] tracking-widest uppercase text-white/55">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {operators.map(op => (
                            <tr key={op.id} className={`border-b border-white/4 transition-colors ${!op.active ? "opacity-40" : "hover:bg-white/[0.01]"}`}>
                              <td className="px-4 py-3 font-mono text-xs text-white">{op.name}</td>
                              <td className="px-4 py-3 font-mono text-[10px] text-white/65">{op.email}</td>
                              <td className="px-4 py-3 font-mono text-xs text-white/70">{op.leads}</td>
                              <td className="px-4 py-3 font-mono text-xs text-white/70">{op.fulfilledOrders} <span className="text-white/30">/ {op.pendingOrders} pend.</span></td>
                              <td className="px-4 py-3 font-mono text-xs text-primary font-bold">{op.revenue.toFixed(2)}€</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number" min={0} max={100}
                                    value={editingCommission[op.id] ?? op.commissionRate}
                                    onChange={e => setEditingCommission(prev => ({ ...prev, [op.id]: e.target.value }))}
                                    className="w-14 bg-black border border-white/15 text-white font-mono text-xs px-2 py-1 focus:outline-none focus:border-primary/50"
                                  />
                                  <span className="font-mono text-[9px] text-white/40">%</span>
                                  {editingCommission[op.id] !== undefined && (
                                    <button onClick={() => void saveCommission(op.id)} disabled={savingCommission === op.id}
                                      className="font-mono text-[8px] px-2 py-1 bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 disabled:opacity-40">
                                      {savingCommission === op.id ? "…" : "✓"}
                                    </button>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 font-mono text-xs font-bold text-yellow-400">{op.commission.toFixed(2)}€</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <button onClick={() => void toggleActive(op.id, !op.active)}
                                    className={`font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border transition-colors ${op.active ? "border-green-800/40 text-green-400 bg-green-950/30 hover:bg-red-950/30 hover:text-red-400 hover:border-red-800/40" : "border-white/20 text-white/40 hover:text-green-400 hover:border-green-800/40"}`}>
                                    {op.active ? "Activo" : "Inactivo"}
                                  </button>
                                  <button onClick={() => setSettlementForm(prev => ({ ...prev, [op.id]: { amount: "", note: "", open: !(prev[op.id]?.open) } }))}
                                    className="font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border border-yellow-800/40 text-yellow-400 bg-yellow-950/20 hover:bg-yellow-950/40 transition-colors">
                                    Pago
                                  </button>
                                  <button onClick={() => setResetPwForm(prev => ({ ...prev, [op.id]: { open: !(prev[op.id]?.open), password: "", saving: false } }))}
                                    className="font-mono text-[8px] tracking-widest uppercase px-2 py-0.5 border border-white/15 text-white/50 hover:text-white/80 hover:border-white/30 transition-colors">
                                    PW
                                  </button>
                                </div>
                                {resetPwForm[op.id]?.open && (
                                  <div className="mt-2 flex items-center gap-2">
                                    <input type="password" placeholder="Nueva contraseña"
                                      value={resetPwForm[op.id]?.password ?? ""}
                                      onChange={e => setResetPwForm(prev => ({ ...prev, [op.id]: { ...prev[op.id]!, password: e.target.value } }))}
                                      className="w-36 bg-black border border-white/15 text-white font-mono text-xs px-2 py-1 focus:outline-none focus:border-primary/50" />
                                    <button onClick={() => void resetPassword(op.id)} disabled={resetPwForm[op.id]?.saving || (resetPwForm[op.id]?.password?.length ?? 0) < 8}
                                      className="font-mono text-[8px] px-2 py-1 bg-white/5 text-white/60 border border-white/15 hover:text-primary hover:border-primary/40 disabled:opacity-40">
                                      {resetPwForm[op.id]?.saving ? "…" : "✓"}
                                    </button>
                                  </div>
                                )}
                                {settlementForm[op.id]?.open && (
                                  <div className="mt-2 flex items-center gap-2">
                                    <input type="number" placeholder="€" min={0.01} step={0.01}
                                      value={settlementForm[op.id]?.amount ?? ""}
                                      onChange={e => setSettlementForm(prev => ({ ...prev, [op.id]: { ...prev[op.id]!, amount: e.target.value } }))}
                                      className="w-16 bg-black border border-white/15 text-white font-mono text-xs px-2 py-1 focus:outline-none focus:border-primary/50" />
                                    <input type="text" placeholder="Nota"
                                      value={settlementForm[op.id]?.note ?? ""}
                                      onChange={e => setSettlementForm(prev => ({ ...prev, [op.id]: { ...prev[op.id]!, note: e.target.value } }))}
                                      className="w-28 bg-black border border-white/15 text-white font-mono text-xs px-2 py-1 focus:outline-none focus:border-primary/50" />
                                    <button onClick={() => void saveSettlement(op.id)} disabled={savingSettlement === op.id}
                                      className="font-mono text-[8px] px-2 py-1 bg-yellow-950/30 text-yellow-400 border border-yellow-800/40 hover:bg-yellow-950/60 disabled:opacity-40">
                                      {savingSettlement === op.id ? "…" : "✓"}
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                  {/* Mobile */}
                  <div className="md:hidden divide-y divide-white/5">
                    {operators.length === 0 && <p className="px-4 py-10 text-center text-white/50 font-mono text-xs">Sin operadores</p>}
                    {operators.map(op => (
                      <div key={op.id} className={`px-4 py-4 space-y-2 ${!op.active ? "opacity-40" : ""}`}>
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-xs text-white">{op.name}</p>
                          <button onClick={() => void toggleActive(op.id, !op.active)}
                            className={`font-mono text-[8px] px-2 py-0.5 border ${op.active ? "border-green-800/40 text-green-400" : "border-white/20 text-white/40"}`}>
                            {op.active ? "Activo" : "Inactivo"}
                          </button>
                        </div>
                        <p className="font-mono text-[10px] text-white/50 truncate">{op.email}</p>
                        <div className="flex gap-4 flex-wrap">
                          <span className="font-mono text-[9px] text-white/55">Ingresos: <span className="text-primary font-bold">{op.revenue.toFixed(2)}€</span></span>
                          <span className="font-mono text-[9px] text-white/55">Comisión: <span className="text-yellow-400 font-bold">{op.commission.toFixed(2)}€</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] text-white/40">%:</span>
                          <input type="number" min={0} max={100}
                            value={editingCommission[op.id] ?? op.commissionRate}
                            onChange={e => setEditingCommission(prev => ({ ...prev, [op.id]: e.target.value }))}
                            className="w-14 bg-black border border-white/15 text-white font-mono text-xs px-2 py-1 focus:outline-none" />
                          {editingCommission[op.id] !== undefined && (
                            <button onClick={() => void saveCommission(op.id)} className="font-mono text-[8px] px-2 py-1 bg-primary/10 text-primary border border-primary/30">✓</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
