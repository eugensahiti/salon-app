import React, { useState, useEffect, useRef } from "react";

const [isMenuOpen, setIsMenuOpen] = useState(false);

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const INITIAL_WORKERS = [
  { id: "w1", name: "Avdyl Sylaj", pin_code: "1234", role: "Owner", status: "active" },
  { id: "w2", name: "Lis Tahiri", pin_code: "5678", role: "Worker", status: "active" },
  { id: "w3", name: "Eugen Sahiti", pin_code: "9012", role: "Worker", status: "active" },
];

const SERVICES = [
  { id: "s1", service_name: "Prerje", price: 10 },
  { id: "s2", service_name: "Mjeker", price: 5 },
  { id: "s3", service_name: "Prerje per femije", price: 10 },
  { id: "s4", service_name: "Ngjyrosja e mjekrres", price: 5 },
  { id: "s5", service_name: "Ngjyrosja e flokeve", price: 10 },
  { id: "s6", service_name: "Depilim me wax (dyll)", price: 5 },
  { id: "s7", service_name: "Depilim me Pe", price: 5 },
  { id: "s8", service_name: "Tretman", price: 30 },
  { id: "s9", service_name: "Prerje e flokeve, rregullimi i mjekrres me ngjyre, wax treatman", price: 50 },
];

// Helper to build a date in the past
const daysAgo = (days, hour = 10, min = 0) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, min, 0, 0);
  return d.toISOString();
};

const INITIAL_TRANSACTIONS = [
  { id: "t1", worker_id: "w2", service_id: "s1", total_price: 35, payment_method: "card", timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), is_locked: true },
  { id: "t2", worker_id: "w2", service_id: "s3", total_price: 18, payment_method: "cash", timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), is_locked: true },
  { id: "t3", worker_id: "w3", service_id: "s4", total_price: 48, payment_method: "card", timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), is_locked: true },
  { id: "t4", worker_id: "w3", service_id: "s2", total_price: 28, payment_method: "cash", timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), is_locked: true },
];

// Archive demo data — previous months
const INITIAL_ARCHIVED_TRANSACTIONS = [
  // ~2 months ago
  { id: "a1", worker_id: "w2", service_id: "s1", total_price: 10, payment_method: "cash",  timestamp: daysAgo(62, 9,  15), is_locked: true },
  { id: "a2", worker_id: "w3", service_id: "s8", total_price: 30, payment_method: "card",  timestamp: daysAgo(61, 11, 30), is_locked: true },
  { id: "a3", worker_id: "w2", service_id: "s2", total_price: 5,  payment_method: "cash",  timestamp: daysAgo(60, 14,  0), is_locked: true },
  { id: "a4", worker_id: "w3", service_id: "s9", total_price: 50, payment_method: "card",  timestamp: daysAgo(59, 16, 45), is_locked: true },
  { id: "a5", worker_id: "w2", service_id: "s5", total_price: 10, payment_method: "cash",  timestamp: daysAgo(58, 10,  0), is_locked: true },
  // ~1 month ago
  { id: "a6", worker_id: "w3", service_id: "s1", total_price: 10, payment_method: "card",  timestamp: daysAgo(35, 9,  0), is_locked: true },
  { id: "a7", worker_id: "w2", service_id: "s3", total_price: 10, payment_method: "cash",  timestamp: daysAgo(34, 11, 20), is_locked: true },
  { id: "a8", worker_id: "w3", service_id: "s6", total_price: 5,  payment_method: "card",  timestamp: daysAgo(33, 13, 30), is_locked: true },
  { id: "a9", worker_id: "w2", service_id: "s8", total_price: 30, payment_method: "cash",  timestamp: daysAgo(32, 15,  0), is_locked: true },
  { id:"a10", worker_id: "w3", service_id: "s2", total_price: 5,  payment_method: "card",  timestamp: daysAgo(31, 10, 45), is_locked: true },
  // ~2 weeks ago
  { id:"a11", worker_id: "w2", service_id: "s9", total_price: 50, payment_method: "card",  timestamp: daysAgo(15, 9,  10), is_locked: true },
  { id:"a12", worker_id: "w3", service_id: "s4", total_price: 5,  payment_method: "cash",  timestamp: daysAgo(14, 12,  0), is_locked: true },
  { id:"a13", worker_id: "w2", service_id: "s1", total_price: 10, payment_method: "cash",  timestamp: daysAgo(13, 10, 30), is_locked: true },
  { id:"a14", worker_id: "w3", service_id: "s5", total_price: 10, payment_method: "card",  timestamp: daysAgo(12, 14,  0), is_locked: true },
  { id:"a15", worker_id: "w2", service_id: "s7", total_price: 5,  payment_method: "cash",  timestamp: daysAgo(11, 11,  0), is_locked: true },
];

const INITIAL_CORRECTIONS = [
  {
    id: "c1", transaction_id: "t1",
    original_data: { service_id: "s2", total_price: 28, payment_method: "cash" },
    modified_data:  { service_id: "s1", total_price: 35, payment_method: "card" },
    owner_id: "w1", reason: "Shërbim i gabuar i zgjedhur nga punonjësi",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

const TIME_LOGS = [
  { id: "tl1", worker_id: "w2", clock_in: new Date(Date.now() - 3600000 * 6).toISOString(), clock_out: null },
  { id: "tl2", worker_id: "w3", clock_in: new Date(Date.now() - 3600000 * 5).toISOString(), clock_out: null },
];

// ─── UTILITIES ────────────────────────────────────────────────────────────────
const fmt      = (n)   => `€${Number(n).toFixed(2)}`;
const fmtTime  = (iso) => new Date(iso).toLocaleTimeString("sq-AL",  { hour: "2-digit", minute: "2-digit" });
const fmtDate  = (iso) => new Date(iso).toLocaleDateString("sq-AL",  { month: "short", day: "numeric", year: "numeric" });
const fmtMonth = (iso) => new Date(iso).toLocaleDateString("sq-AL",  { month: "long", year: "numeric" });
const uid      = ()    => `id_${Math.random().toString(36).slice(2, 9)}`;
const getService = (id) => SERVICES.find((s) => s.id === id);

// Returns "YYYY-MM" key for grouping
const monthKey = (iso) => iso.slice(0, 7);

const PayBadge = ({ method }) => {
  if (!method) return <span style={{ color: "var(--text-3)", fontSize: 11 }}>—</span>;
  const isCash = method === "cash";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: isCash ? "rgba(76,175,122,0.1)" : "rgba(91,143,232,0.1)",
      border: `1px solid ${isCash ? "rgba(76,175,122,0.35)" : "rgba(91,143,232,0.35)"}`,
      color: isCash ? "var(--green)" : "var(--blue)",
      borderRadius: 5, padding: "3px 8px", fontSize: 11,
      fontFamily: "'Syne Mono',monospace", fontWeight: 600,
    }}>
      {isCash ? "💵 KESH" : "💳 KARTË"}
    </span>
  );
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&family=Syne+Mono&display=swap');
    :root {
      --gold:#C9A84C; --gold-light:#E8C96A; --gold-dim:#8A6E2F;
      --ink:#0C0C0E; --ink-2:#141416; --ink-3:#1C1C20; --ink-4:#252528; --ink-5:#2F2F34;
      --muted:#5A5A62; --muted-2:#3A3A40;
      --text:#E8E8EC; --text-2:#A8A8B0; --text-3:#6A6A72;
      --red:#E05555; --green:#4CAF7A; --blue:#5B8FE8; --purple:#9B72E8;
    }
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--ink);color:var(--text);font-family:'Syne',sans-serif;min-height:100vh;}
    .font-display{font-family:'Cormorant Garamond',serif;}
    .font-mono{font-family:'Syne Mono',monospace;}
    ::-webkit-scrollbar{width:4px;}
    ::-webkit-scrollbar-track{background:var(--ink-3);}
    ::-webkit-scrollbar-thumb{background:var(--gold-dim);border-radius:2px;}
    @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
    .gold-shimmer{background:linear-gradient(90deg,var(--gold-dim) 0%,var(--gold-light) 40%,var(--gold-dim) 60%,var(--gold) 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 4s linear infinite;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
    .fade-up{animation:fadeUp 0.35s ease both;}
    @keyframes pinPop{0%{transform:scale(0.5);}60%{transform:scale(1.3);}100%{transform:scale(1);}}
    .pin-pop{animation:pinPop 0.2s ease;}
    @keyframes shake{0%,100%{transform:translateX(0);}20%{transform:translateX(-6px);}40%{transform:translateX(6px);}60%{transform:translateX(-4px);}80%{transform:translateX(4px);}}
    .shake{animation:shake 0.35s ease;}
    @keyframes pulse-gold{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0.3);}50%{box-shadow:0 0 0 8px rgba(201,168,76,0);}}
    .pulse-gold{animation:pulse-gold 2s ease-in-out infinite;}
    @keyframes ticker{from{opacity:0;transform:translateY(-4px);}to{opacity:1;transform:translateY(0);}}
    .ticker{animation:ticker 0.2s ease;}
    .tr-hover:hover{background:var(--ink-4) !important;}
    .badge-locked{background:rgba(201,168,76,0.12);border:1px solid var(--gold-dim);color:var(--gold);font-family:'Syne Mono',monospace;font-size:10px;padding:2px 7px;border-radius:3px;}
    .badge-archive{background:rgba(155,114,232,0.12);border:1px solid rgba(155,114,232,0.4);color:var(--purple);font-family:'Syne Mono',monospace;font-size:10px;padding:2px 7px;border-radius:3px;}
    .glass-card{background:linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.01) 100%);border:1px solid rgba(201,168,76,0.15);backdrop-filter:blur(8px);}
    .gold-line{height:1px;background:linear-gradient(90deg,transparent,var(--gold-dim),transparent);}
    .scroll-y{overflow-y:auto;}
    .btn-gold{position:relative;overflow:hidden;transition:all 0.2s;}
    .btn-gold:active{transform:scale(0.97);}
    .btn-gold:hover{box-shadow:0 0 24px rgba(201,168,76,0.25);}
    @keyframes slideDown{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
    .slide-down{animation:slideDown 0.25s ease both;}
    .month-row:hover{background:rgba(201,168,76,0.04);}
    .reset-toast{position:fixed;bottom:24px;right:24px;z-index:9999;background:linear-gradient(135deg,var(--ink-3),var(--ink-4));border:1px solid var(--gold-dim);border-radius:10px;padding:14px 20px;display:flex;align-items:center;gap:12px;box-shadow:0 8px 32px rgba(0,0,0,0.6);}
    @keyframes toastIn{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
    .reset-toast{animation:toastIn 0.3s ease both;}
  `}</style>
);

// ─── TOP NAV ──────────────────────────────────────────────────────────────────
function TopNav({ user, onLogout, view, setView }) {
  const isOwner = user?.role === "Owner";
  const tabs = isOwner
    ? [
        { id: "dashboard",    label: "Paneli" },
        { id: "transactions", label: "Transaksionet" },
        { id: "corrections",  label: "Korrigjimet" },
        { id: "archive",      label: "Arkiva" },
        { id: "staff",        label: "Stafi" },
      ]
    : [
        { id: "log",     label: "Regjistro Shërbim" },
        { id: "history", label: "Historia Ime" },
      ];

  return (
    <nav style={{ background: "var(--ink-2)", borderBottom: "1px solid rgba(201,168,76,0.2)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 24, height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 6, background: "linear-gradient(135deg,var(--gold-dim),var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✂</div>
          <span className="font-display gold-shimmer" style={{ fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>AS Hair Salon</span>
        </div>
        <div style={{ display: "flex", gap: 2, flex: 1 }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setView(t.id)} style={{
              background: view === t.id ? "rgba(201,168,76,0.1)" : "none",
              border: "none",
              borderBottom: view === t.id ? "2px solid var(--gold)" : "2px solid transparent",
              color: view === t.id ? "var(--gold)" : t.id === "archive" ? "var(--purple)" : "var(--text-2)",
              padding: "0 14px", height: 60, cursor: "pointer", fontSize: 12,
              letterSpacing: "0.08em", textTransform: "uppercase",
              fontFamily: "'Syne',sans-serif", fontWeight: 600, transition: "all 0.2s",
            }}>
              {t.id === "archive" ? "📦 " : ""}{t.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{user?.name}</span>
            <span style={{ fontSize: 10, color: isOwner ? "var(--gold)" : "var(--text-3)", letterSpacing: "0.1em" }}>
              {user?.role === "Owner" ? "PRONAR" : "PUNONJËS"}
            </span>
          </div>
          <button onClick={onLogout} style={{ background: "none", border: "1px solid var(--muted-2)", color: "var(--text-3)", borderRadius: 5, padding: "5px 10px", fontSize: 11, cursor: "pointer", letterSpacing: "0.06em" }}>
            DAL
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── PIN LOGIN ────────────────────────────────────────────────────────────────
function PinLogin({ onLogin, workers }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const handleDigit = (d) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    if (next.length === 4) setTimeout(() => attempt(next), 120);
  };

  const attempt = (p) => {
    const worker = workers.find((w) => w.pin_code === p && w.status === "active");
    if (worker) {
      onLogin(worker);
    } else {
      setError(true);
      setShakeKey((k) => k + 1);
      setTimeout(() => { setPin(""); setError(false); }, 800);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key >= "0" && e.key <= "9") handleDigit(e.key);
      else if (e.key === "Backspace") setPin((p) => p.slice(0, -1));
      else if (e.key === "Enter") setPin((p) => { if (p.length === 4) attempt(p); return p; });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pin]);

  const pad = [["1","2","3"],["4","5","6"],["7","8","9"],["←","0","✓"]];

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ink)", backgroundImage: "radial-gradient(ellipse at 50% 0%,rgba(201,168,76,0.06) 0%,transparent 70%)" }}>
      <div className="fade-up glass-card" style={{ padding: "48px 40px", borderRadius: 16, width: 340, display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>✂</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
  <h1 className="font-display gold-shimmer" style={{ fontSize: 32, fontWeight: 700 }}>
    AS Hair Salon
  </h1>

  <button 
    className="mobile-menu-btn"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
  >
    {/* Cabinet Icon */}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gold" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8H3V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2zM21 14H3v-2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2zM21 20H3v-2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2z" />
    </svg>
  </button>
{isMenuOpen && (
  <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)}>
    <div className="mobile-drawer" onClick={e => e.stopPropagation()}>
      <h3 style={{ color: 'gold', marginBottom: '20px' }}>Shërbimet</h3>
      
      {/* These now use setView to match your App.jsx logic */}
      <button onClick={() => { setView('dashboard'); setIsMenuOpen(false); }}>📊 Paneli</button>
      <button onClick={() => { setView('transactions'); setIsMenuOpen(false); }}>💸 Transaksionet</button>
      <button onClick={() => { setView('stafi'); setIsMenuOpen(false); }}>👥 Stafi</button>
      <button onClick={() => { setView('arkiva'); setIsMenuOpen(false); }}>📦 Arkiva</button>
      
      <button 
        className="close-btn" 
        style={{ marginTop: 'auto', border: '1px solid gold', color: 'gold' }} 
        onClick={() => setIsMenuOpen(false)}
      >
        Mbyll
      </button>
    </div>
  </div>
)}



</div>
          <p style={{ color: "var(--text-3)", fontSize: 12, letterSpacing: "0.15em", marginTop: 4 }}>OPERACIONET E BRENDSHME</p>
        </div>
        <div className="gold-line" style={{ width: "100%" }} />
        <div>
          <p style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.12em", textAlign: "center", marginBottom: 20 }}>VENDOS KODIN PIN</p>
          <div key={shakeKey} className={error ? "shake" : ""} style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className={pin.length > i ? "pin-pop" : ""} style={{
                width: 14, height: 14, borderRadius: "50%",
                background: error ? "var(--red)" : pin.length > i ? "var(--gold)" : "var(--ink-5)",
                border: `1px solid ${error ? "var(--red)" : pin.length > i ? "var(--gold)" : "var(--muted-2)"}`,
                transition: "all 0.15s",
              }} />
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, width: "100%" }}>
          {pad.flat().map((d) => (
            <button key={d} onClick={() => { if (d === "←") setPin((p) => p.slice(0,-1)); else if (d === "✓") attempt(pin); else handleDigit(d); }} style={{
              background: d === "✓" ? "rgba(201,168,76,0.15)" : "var(--ink-4)",
              border: `1px solid ${d === "✓" ? "var(--gold-dim)" : "var(--ink-5)"}`,
              borderRadius: 8, height: 52, color: d === "✓" ? "var(--gold)" : "var(--text)",
              fontSize: d === "←" || d === "✓" ? 18 : 20, cursor: "pointer",
              fontFamily: "'Syne',sans-serif", fontWeight: 600, transition: "all 0.15s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = d === "✓" ? "rgba(201,168,76,0.22)" : "var(--ink-5)"}
              onMouseLeave={(e) => e.currentTarget.style.background = d === "✓" ? "rgba(201,168,76,0.15)" : "var(--ink-4)"}
            >{d}</button>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "var(--text-3)", fontSize: 11, letterSpacing: "0.08em" }}>
            Demo: Pronar <span style={{ color: "var(--gold)", fontFamily: "'Syne Mono',monospace" }}>1234</span>
            {" "}· Punonjës <span style={{ color: "var(--blue)", fontFamily: "'Syne Mono',monospace" }}>5678</span>
            {" "}/ <span style={{ color: "var(--blue)", fontFamily: "'Syne Mono',monospace" }}>9012</span>
          </p>
          <p style={{ color: "var(--text-3)", fontSize: 10, marginTop: 6, opacity: 0.7 }}>⌨️ Mund të shkruash kodin PIN edhe nga tastiera</p>
        </div>
      </div>
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accent = "var(--gold)", icon }) {
  return (
    <div className="glass-card fade-up" style={{ borderRadius: 10, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase" }}>{label}</span>
        {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
      </div>
      <div className="ticker" style={{ fontSize: 26, fontWeight: 800, color: accent, fontFamily: "'Syne',sans-serif" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--text-3)" }}>{sub}</div>}
    </div>
  );
}

// ─── RESET TOAST ─────────────────────────────────────────────────────────────
function ResetToast({ onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="reset-toast">
      <div style={{ fontSize: 22 }}>📦</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)" }}>Rifreskim i Natës</div>
        <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>
          Transaksionet e sotme u arkivuan. Filloi ditë e re.
        </div>
      </div>
      <button onClick={onDismiss} style={{ background: "none", border: "none", color: "var(--text-3)", cursor: "pointer", fontSize: 16, padding: "0 4px" }}>×</button>
    </div>
  );
}

// ─── WORKER: LOG SERVICE ──────────────────────────────────────────────────────
function WorkerLogService({ user, transactions, setTransactions }) {
  const [selected, setSelected] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const service = SERVICES.find((s) => s.id === selected);
  const canSubmit = selected && paymentMethod;

  const confirmSubmit = () => {
    const svc = SERVICES.find((s) => s.id === selected);
    setTransactions((prev) => [...prev, {
      id: uid(), worker_id: user.id, service_id: selected,
      total_price: svc.price, payment_method: paymentMethod,
      timestamp: new Date().toISOString(), is_locked: true,
    }]);
    setSubmitted(true);
    setConfirmOpen(false);
    setTimeout(() => { setSubmitted(false); setSelected(null); setPaymentMethod(null); }, 2500);
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: 28 }}>
        <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600 }}>Regjistro Shërbim</h2>
        <p style={{ color: "var(--text-3)", fontSize: 13, marginTop: 4 }}>
          Zgjidh shërbimin &amp; mënyrën e pagesës. Pas dorëzimit, rekordi është{" "}
          <span style={{ color: "var(--gold)" }}>i bllokuar</span>.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10, marginBottom: 24 }}>
        {SERVICES.map((s) => (
          <div key={s.id} onClick={() => !submitted && setSelected(s.id)} style={{
            borderRadius: 9, padding: "14px 16px", position: "relative",
            border: `1px solid ${selected === s.id ? "var(--gold)" : "rgba(201,168,76,0.12)"}`,
            background: selected === s.id ? "rgba(201,168,76,0.07)" : "var(--ink-3)",
            cursor: submitted ? "not-allowed" : "pointer", transition: "all 0.18s",
            opacity: submitted ? 0.5 : 1,
          }}>
            {selected === s.id && <span style={{ position: "absolute", top: 7, right: 10, color: "var(--gold)", fontSize: 13 }}>✓</span>}
            <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 6 }}>{s.service_name}</div>
            <span className="font-mono" style={{ color: "var(--gold)", fontSize: 15, fontWeight: 600 }}>{fmt(s.price)}</span>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
          Mënyra e Pagesës <span style={{ color: "var(--red)" }}>*</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { id: "cash", label: "Kesh", icon: "💵", color: "var(--green)", bg: "rgba(76,175,122,0.1)", border: "rgba(76,175,122,0.4)" },
            { id: "card", label: "Kartë", icon: "💳", color: "var(--blue)",  bg: "rgba(91,143,232,0.1)", border: "rgba(91,143,232,0.4)" },
          ].map((pm) => {
            const isActive = paymentMethod === pm.id;
            return (
              <button key={pm.id} onClick={() => !submitted && setPaymentMethod(pm.id)} style={{
                flex: 1, padding: "18px 12px", borderRadius: 10,
                background: isActive ? pm.bg : "var(--ink-3)",
                border: `2px solid ${isActive ? pm.border : "rgba(255,255,255,0.06)"}`,
                cursor: submitted ? "not-allowed" : "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                transition: "all 0.18s", opacity: submitted ? 0.5 : 1,
                boxShadow: isActive ? `0 0 18px ${pm.bg}` : "none",
              }}>
                <span style={{ fontSize: 28 }}>{pm.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", color: isActive ? pm.color : "var(--text-2)", fontFamily: "'Syne',sans-serif" }}>{pm.label}</span>
                {isActive && <span style={{ width: 20, height: 20, borderRadius: "50%", background: pm.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--ink)", fontWeight: 700 }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>
      {service && (
        <div className="fade-up glass-card" style={{ borderRadius: 9, padding: "16px 20px", marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 4 }}>ÇMIMI I SHËRBIMIT</div>
          <div className="font-mono" style={{ color: "var(--gold)", fontSize: 22 }}>{fmt(service.price)}</div>
        </div>
      )}
      {submitted ? (
        <div className="fade-up" style={{ background: "rgba(76,175,122,0.1)", border: "1px solid var(--green)", borderRadius: 9, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>🔒</span>
          <div>
            <div style={{ color: "var(--green)", fontWeight: 600, fontSize: 14 }}>Transaksioni u Bllokua &amp; u Ruajt</div>
            <div style={{ color: "var(--text-3)", fontSize: 12, marginTop: 2 }}>Rekordi është i pandryshueshëm. Kontakto pronarin për korrigjime.</div>
          </div>
        </div>
      ) : (
        <button className="btn-gold pulse-gold" onClick={() => canSubmit && setConfirmOpen(true)} disabled={!canSubmit} style={{
          background: canSubmit ? "linear-gradient(135deg,var(--gold-dim),var(--gold))" : "var(--ink-4)",
          border: "none", borderRadius: 9, color: canSubmit ? "var(--ink)" : "var(--muted)",
          padding: "14px 32px", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em",
          cursor: canSubmit ? "pointer" : "not-allowed", fontFamily: "'Syne',sans-serif",
          transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8,
        }}>
          <span>🔒</span> BLLOKO &amp; DËRGO TRANSAKSIONIN
          {!selected && <span style={{ fontSize: 11, fontWeight: 400, opacity: 0.6 }}>— zgjidh shërbimin</span>}
          {selected && !paymentMethod && <span style={{ fontSize: 11, fontWeight: 400, opacity: 0.6 }}>— zgjidh pagesën</span>}
        </button>
      )}
      {confirmOpen && service && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="fade-up glass-card" style={{ borderRadius: 14, padding: "32px", width: 360 }}>
            <h3 className="font-display" style={{ fontSize: 22, marginBottom: 8 }}>Konfirmo Transaksionin</h3>
            <p style={{ color: "var(--text-3)", fontSize: 13, marginBottom: 20 }}>
              Ky rekor do të <strong style={{ color: "var(--gold)" }}>bllokohet përgjithmonë</strong> pas dorëzimit.
            </p>
            <div style={{ background: "var(--ink-4)", borderRadius: 8, padding: "14px 16px", marginBottom: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Shërbimi", service.service_name, "var(--text)"], ["Çmimi Total", fmt(service.price), "var(--gold)"]].map(([l, v, c]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-2)", fontSize: 13 }}>{l}</span>
                  <span style={{ color: c, fontSize: 13, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--text-2)", fontSize: 13 }}>Pagesa</span>
                <PayBadge method={paymentMethod} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmOpen(false)} style={{ flex: 1, background: "var(--ink-4)", border: "1px solid var(--ink-5)", borderRadius: 7, color: "var(--text-2)", padding: "11px", fontSize: 13, cursor: "pointer", fontFamily: "'Syne',sans-serif" }}>Anulo</button>
              <button onClick={confirmSubmit} style={{ flex: 1, background: "linear-gradient(135deg,var(--gold-dim),var(--gold))", border: "none", borderRadius: 7, color: "var(--ink)", padding: "11px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Syne',sans-serif" }}>Blloko &amp; Dërgo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── WORKER: MY HISTORY ───────────────────────────────────────────────────────
function WorkerHistory({ user, transactions }) {
  const mine = transactions.filter((t) => t.worker_id === user.id).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const todayTotal = mine.filter((t) => new Date(t.timestamp).toDateString() === new Date().toDateString()).reduce((s, t) => s + t.total_price, 0);
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600 }}>Transaksionet e Mia</h2>
        <p style={{ color: "var(--text-3)", fontSize: 13, marginTop: 4 }}>Rekorde të bllokuara — kontakto pronarin për korrigjime</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 28 }}>
        <StatCard label="Të Ardhurat Sot" value={fmt(todayTotal)} icon="💈" />
        <StatCard label="Shërbime Totale" value={mine.length} sub="gjithë kohën" accent="var(--blue)" icon="📋" />
      </div>
      <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(201,168,76,0.12)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--ink-3)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
              {["Ora","Shërbimi","Çmimi","Pagesa","Statusi"].map((h) => (
                <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mine.map((tx, i) => {
              const svc = getService(tx.service_id);
              return (
                <tr key={tx.id} className="tr-hover" style={{ background: i % 2 === 0 ? "var(--ink-2)" : "var(--ink-3)", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div className="font-mono" style={{ fontSize: 12, color: "var(--text)" }}>{fmtTime(tx.timestamp)}</div>
                    <div style={{ fontSize: 10, color: "var(--text-3)", marginTop: 2 }}>{fmtDate(tx.timestamp)}</div>
                  </td>
                  <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{svc?.service_name ?? "—"}</td>
                  <td style={{ padding: "12px 16px" }}><span className="font-mono" style={{ color: "var(--gold)", fontSize: 14 }}>{fmt(tx.total_price)}</span></td>
                  <td style={{ padding: "12px 16px" }}><PayBadge method={tx.payment_method} /></td>
                  <td style={{ padding: "12px 16px" }}><span className="badge-locked">🔒 BLLOKUAR</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {mine.length === 0 && <div style={{ padding: "40px", textAlign: "center", color: "var(--text-3)" }}>Ende nuk ka transaksione</div>}
      </div>
    </div>
  );
}

// ─── OWNER: DASHBOARD ─────────────────────────────────────────────────────────
function OwnerDashboard({ transactions, corrections, workers }) {
  const today = transactions.filter((t) => new Date(t.timestamp).toDateString() === new Date().toDateString());
  const totalRevToday = today.reduce((s, t) => s + t.total_price, 0);
  const totalRev      = transactions.reduce((s, t) => s + t.total_price, 0);
  const cashRev  = today.filter((t) => t.payment_method === "cash").reduce((s, t) => s + t.total_price, 0);
  const cardRev  = today.filter((t) => t.payment_method === "card").reduce((s, t) => s + t.total_price, 0);
  const cashPct  = totalRevToday > 0 ? (cashRev / totalRevToday) * 100 : 0;
  const cardPct  = totalRevToday > 0 ? (cardRev / totalRevToday) * 100 : 0;
  const correctionRate = transactions.length > 0 ? ((corrections.length / transactions.length) * 100).toFixed(1) : 0;

  const flags = [];
  corrections.forEach((c) => {
    const tx = transactions.find((t) => t.id === c.transaction_id);
    if (tx) {
      const mins = Math.abs(new Date(c.timestamp) - new Date(tx.timestamp)) / 60000;
      if (mins > 60) flags.push({ type: "late-correction", detail: `Korrigjuar ${mins.toFixed(0)} min pas regjistrimit` });
    }
  });
  if (parseFloat(correctionRate) > 10) flags.push({ type: "high-correction-rate", detail: `${correctionRate}% normë korrigjimi është mbi pragun` });

  const workerBreakdown = workers.filter((w) => w.role === "Worker").map((w) => {
    const wTx = today.filter((t) => t.worker_id === w.id);
    return { ...w, count: wTx.length, revenue: wTx.reduce((s, t) => s + t.total_price, 0) };
  });

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600 }}>Paneli i Pronarit</h2>
        <p style={{ color: "var(--text-3)", fontSize: 13, marginTop: 4 }}>Pasqyrë e operacioneve në kohë reale</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <StatCard label="Të Ardhurat Sot"   value={fmt(totalRevToday)} icon="💰" />
        <StatCard label="Të Ardhura Totale" value={fmt(totalRev)} accent="var(--blue)" icon="📊" />
        <StatCard label="Korrigjimet"       value={corrections.length} accent={corrections.length > 2 ? "var(--red)" : "var(--gold)"} icon="✏️" />
        <StatCard label="Norma Korrigjimit" value={`${correctionRate}%`} accent={parseFloat(correctionRate) > 10 ? "var(--red)" : "var(--green)"} icon="⚠️" />
      </div>
      <div className="glass-card" style={{ borderRadius: 10, padding: "18px 22px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.12em", textTransform: "uppercase" }}>Ndarja e Pagesave Sot</span>
          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ fontSize: 12, color: "var(--green)" }}>💵 Kesh <span className="font-mono">{fmt(cashRev)}</span></span>
            <span style={{ fontSize: 12, color: "var(--blue)" }}>💳 Kartë <span className="font-mono">{fmt(cardRev)}</span></span>
          </div>
        </div>
        <div style={{ height: 8, borderRadius: 4, background: "var(--ink-5)", overflow: "hidden", display: "flex" }}>
          <div style={{ width: `${cashPct}%`, background: "var(--green)", transition: "width 0.4s ease" }} />
          <div style={{ width: `${cardPct}%`, background: "var(--blue)",  transition: "width 0.4s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontSize: 11, color: "var(--green)" }}>{cashPct.toFixed(0)}% kesh</span>
          <span style={{ fontSize: 11, color: "var(--blue)"  }}>{cardPct.toFixed(0)}% kartë</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="glass-card" style={{ borderRadius: 10, padding: "20px" }}>
          <h3 style={{ fontSize: 13, letterSpacing: "0.1em", color: "var(--text-2)", marginBottom: 16, textTransform: "uppercase" }}>Stafi Sot</h3>
          {workerBreakdown.map((w) => (
            <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg,var(--ink-4),var(--ink-5))", border: "1px solid var(--muted-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "var(--gold)" }}>{w.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{w.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-3)" }}>{w.count} shërbime</div>
                <div style={{ marginTop: 4, height: 3, borderRadius: 2, background: "var(--ink-5)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100,(w.revenue/200)*100)}%`, background: "linear-gradient(90deg,var(--gold-dim),var(--gold))", borderRadius: 2 }} />
                </div>
              </div>
              <span className="font-mono" style={{ color: "var(--gold)", fontSize: 14 }}>{fmt(w.revenue)}</span>
            </div>
          ))}
          {workerBreakdown.length === 0 && <div style={{ color: "var(--text-3)", fontSize: 13 }}>Nuk ka aktivitet sot</div>}
        </div>
        <div className="glass-card" style={{ borderRadius: 10, padding: "20px", border: "1px solid rgba(224,85,85,0.2)" }}>
          <h3 style={{ fontSize: 13, letterSpacing: "0.1em", color: "var(--red)", marginBottom: 16, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>⚑ Sinjale të Kuqe</h3>
          {flags.length === 0 ? (
            <div style={{ color: "var(--green)", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>✓ Nuk u zbuluan anomali</div>
          ) : flags.map((f, i) => (
            <div key={i} style={{ background: "rgba(224,85,85,0.08)", border: "1px solid rgba(224,85,85,0.2)", borderRadius: 7, padding: "10px 14px", marginBottom: 10 }}>
              <div style={{ color: "var(--red)", fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{f.type === "late-correction" ? "Korrigjim i Vonuar" : "Normë e Lartë Korrigjimi"}</div>
              <div style={{ color: "var(--text-3)", fontSize: 12 }}>{f.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── OWNER: ALL TRANSACTIONS ──────────────────────────────────────────────────
function OwnerTransactions({ transactions, setTransactions, corrections, setCorrections, getWorker }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ service_id: "", payment_method: "cash", reason: "" });
  const sorted = [...transactions].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const startEdit = (tx) => { setEditingId(tx.id); setEditForm({ service_id: tx.service_id, payment_method: tx.payment_method ?? "cash", reason: "" }); };
  const saveEdit  = (tx) => {
    if (!editForm.reason.trim()) return;
    const newSvc = SERVICES.find((s) => s.id === editForm.service_id);
    setCorrections((prev) => [...prev, {
      id: uid(), transaction_id: tx.id,
      original_data: { service_id: tx.service_id, total_price: tx.total_price, payment_method: tx.payment_method },
      modified_data: { service_id: editForm.service_id, total_price: newSvc.price, payment_method: editForm.payment_method },
      owner_id: "w1", reason: editForm.reason, timestamp: new Date().toISOString(),
    }]);
    setTransactions((prev) => prev.map((t) => t.id === tx.id ? { ...t, service_id: editForm.service_id, total_price: newSvc.price, payment_method: editForm.payment_method } : t));
    setEditingId(null);
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600 }}>Të Gjitha Transaksionet</h2>
        <p style={{ color: "var(--text-3)", fontSize: 13, marginTop: 4 }}>Korrigjimet e pronarit gjenerojnë automatikisht një hyrje auditimi të pandryshueshme</p>
      </div>
      <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(201,168,76,0.12)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--ink-3)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}>
              {["Punonjësi","Shërbimi","Çmimi","Pagesa","Ora","Statusi","Veprim"].map((h) => (
                <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: 10, letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((tx, i) => {
              const worker = getWorker(tx.worker_id);
              const svc    = getService(tx.service_id);
              const isEditing    = editingId === tx.id;
              const hasCorrected = corrections.some((c) => c.transaction_id === tx.id);
              return (
                <tr key={tx.id} className="tr-hover" style={{ background: i % 2 === 0 ? "var(--ink-2)" : "var(--ink-3)", borderBottom: "1px solid rgba(255,255,255,0.03)", borderLeft: hasCorrected ? "3px solid var(--red)" : "3px solid transparent" }}>
                  <td style={{ padding: "12px 14px" }}><div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{worker?.name}</div></td>
                  <td style={{ padding: "12px 14px" }}>
                    {isEditing ? (
                      <select value={editForm.service_id} onChange={(e) => setEditForm((f) => ({ ...f, service_id: e.target.value }))} style={{ background: "var(--ink-4)", border: "1px solid var(--gold-dim)", color: "var(--text)", borderRadius: 5, padding: "5px 8px", fontSize: 12, fontFamily: "'Syne',sans-serif" }}>
                        {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.service_name} — {fmt(s.price)}</option>)}
                      </select>
                    ) : <span style={{ fontSize: 13, color: "var(--text)" }}>{svc?.service_name}</span>}
                  </td>
                  <td style={{ padding: "12px 14px" }}><span className="font-mono" style={{ color: "var(--gold)", fontSize: 14 }}>{fmt(tx.total_price)}</span></td>
                  <td style={{ padding: "12px 14px" }}>
                    {isEditing ? (
                      <div style={{ display: "flex", gap: 5 }}>
                        {["cash","card"].map((pm) => (
                          <button key={pm} onClick={() => setEditForm((f) => ({ ...f, payment_method: pm }))} style={{ background: editForm.payment_method === pm ? (pm === "cash" ? "rgba(76,175,122,0.2)" : "rgba(91,143,232,0.2)") : "var(--ink-5)", border: `1px solid ${editForm.payment_method === pm ? (pm === "cash" ? "var(--green)" : "var(--blue)") : "var(--ink-5)"}`, borderRadius: 5, color: pm === "cash" ? "var(--green)" : "var(--blue)", padding: "4px 9px", fontSize: 11, cursor: "pointer", fontFamily: "'Syne Mono',monospace" }}>
                            {pm === "cash" ? "💵 kesh" : "💳 kartë"}
                          </button>
                        ))}
                      </div>
                    ) : <PayBadge method={tx.payment_method} />}
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <div className="font-mono" style={{ fontSize: 11, color: "var(--text-2)" }}>{fmtTime(tx.timestamp)}</div>
                    <div style={{ fontSize: 10, color: "var(--text-3)" }}>{fmtDate(tx.timestamp)}</div>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    {hasCorrected && <div style={{ fontSize: 10, color: "var(--red)", marginBottom: 3 }}>✏ Korrigjuar</div>}
                    <span className="badge-locked">🔒 BLLOKUAR</span>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    {isEditing ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <input placeholder="Arsyeja *" value={editForm.reason} onChange={(e) => setEditForm((f) => ({ ...f, reason: e.target.value }))} style={{ background: "var(--ink-4)", border: "1px solid var(--gold-dim)", color: "var(--text)", borderRadius: 5, padding: "5px 8px", fontSize: 12, fontFamily: "'Syne',sans-serif", width: 150 }} />
                        <div style={{ display: "flex", gap: 5 }}>
                          <button onClick={() => saveEdit(tx)} disabled={!editForm.reason.trim()} style={{ background: "var(--green)", border: "none", borderRadius: 4, color: "var(--ink)", padding: "4px 10px", fontSize: 11, cursor: editForm.reason.trim() ? "pointer" : "not-allowed", fontWeight: 700, fontFamily: "'Syne',sans-serif" }}>Ruaj</button>
                          <button onClick={() => setEditingId(null)} style={{ background: "var(--ink-5)", border: "none", borderRadius: 4, color: "var(--text-2)", padding: "4px 10px", fontSize: 11, cursor: "pointer", fontFamily: "'Syne',sans-serif" }}>Anulo</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => startEdit(tx)} style={{ background: "rgba(201,168,76,0.08)", border: "1px solid var(--gold-dim)", borderRadius: 5, color: "var(--gold)", padding: "5px 12px", fontSize: 11, cursor: "pointer", letterSpacing: "0.06em", fontFamily: "'Syne',sans-serif" }}>✏ Ndrysho</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {sorted.length === 0 && <div style={{ padding: "40px", textAlign: "center", color: "var(--text-3)" }}>Ende nuk ka transaksione sot</div>}
      </div>
    </div>
  );
}

// ─── OWNER: CORRECTIONS LOG ───────────────────────────────────────────────────
function OwnerCorrections({ corrections, transactions, getWorker }) {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600 }}>Auditim — Regjistri i Korrigjimeve</h2>
          <span style={{ background: "rgba(224,85,85,0.15)", border: "1px solid var(--red)", color: "var(--red)", borderRadius: 5, padding: "3px 10px", fontSize: 11, fontFamily: "'Syne Mono',monospace" }}>{corrections.length} hyrje</span>
        </div>
        <p style={{ color: "var(--text-3)", fontSize: 13, marginTop: 4 }}>Çdo korrigjim i pronarit regjistrohet këtu në mënyrë të pandryshueshme. Ky regjistër nuk mund të fshihet.</p>
      </div>
      {corrections.length === 0 ? (
        <div className="glass-card" style={{ borderRadius: 10, padding: "40px", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
          <div style={{ color: "var(--green)", fontWeight: 600 }}>Nuk ka korrigjime të regjistruara</div>
          <div style={{ color: "var(--text-3)", fontSize: 13, marginTop: 6 }}>Gjurmë auditimi e pastër</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[...corrections].reverse().map((c) => {
            const tx      = transactions.find((t) => t.id === c.transaction_id);
            const owner   = getWorker(c.owner_id);
            const worker  = tx ? getWorker(tx.worker_id) : null;
            const origSvc = getService(c.original_data.service_id);
            const newSvc  = getService(c.modified_data.service_id);
            return (
              <div key={c.id} className="glass-card fade-up" style={{ borderRadius: 10, padding: "20px 22px", borderLeft: "3px solid var(--red)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr auto", gap: 20, alignItems: "start" }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>Transaksioni</div>
                    <div className="font-mono" style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>#{c.transaction_id.slice(0,8)}</div>
                    <div style={{ fontSize: 13, color: "var(--text)" }}>{worker?.name ?? "—"}</div>
                    <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>{tx ? `${fmtTime(tx.timestamp)} · ${fmtDate(tx.timestamp)}` : "—"}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>Para</div>
                    <div style={{ fontSize: 13, color: "var(--red)" }}>{origSvc?.service_name ?? "—"}</div>
                    <div className="font-mono" style={{ fontSize: 13, color: "var(--red)" }}>{fmt(c.original_data.total_price)}</div>
                    <div style={{ marginTop: 4 }}><PayBadge method={c.original_data.payment_method} /></div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>Pas</div>
                    <div style={{ fontSize: 13, color: "var(--green)" }}>{newSvc?.service_name ?? "—"}</div>
                    <div className="font-mono" style={{ fontSize: 13, color: "var(--green)" }}>{fmt(c.modified_data.total_price)}</div>
                    <div style={{ marginTop: 4 }}><PayBadge method={c.modified_data.payment_method} /></div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>Korrigjuar Nga</div>
                    <div style={{ fontSize: 13, color: "var(--gold)" }}>{owner?.name}</div>
                    <div className="font-mono" style={{ fontSize: 10, color: "var(--text-3)", marginTop: 2 }}>{fmtTime(c.timestamp)}</div>
                  </div>
                </div>
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: 10, color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Arsyeja: </span>
                  <span style={{ fontSize: 13, color: "var(--text-2)", fontStyle: "italic" }}>{c.reason}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── OWNER: ARCHIVE ───────────────────────────────────────────────────────────
function OwnerArchive({ archivedTransactions, getWorker }) {
  const [openMonths, setOpenMonths] = useState({});
  const [searchWorker, setSearchWorker] = useState("all");

  // Filter
  const filtered = searchWorker === "all"
    ? archivedTransactions
    : archivedTransactions.filter((t) => t.worker_id === searchWorker);

  // Group by month key, sorted newest first
  const grouped = {};
  [...filtered].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).forEach((tx) => {
    const key = monthKey(tx.timestamp);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(tx);
  });
  const monthKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const toggleMonth = (key) => setOpenMonths((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalArchived = filtered.reduce((s, t) => s + t.total_price, 0);
  const cashArchived  = filtered.filter((t) => t.payment_method === "cash").reduce((s, t) => s + t.total_price, 0);
  const cardArchived  = filtered.filter((t) => t.payment_method === "card").reduce((s, t) => s + t.total_price, 0);

  const workers = INITIAL_WORKERS.filter((w) => w.role === "Worker");

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
          <span style={{ fontSize: 28 }}>📦</span>
          <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600 }}>Arkiva e Transaksioneve</h2>
          <span style={{ background: "rgba(155,114,232,0.15)", border: "1px solid rgba(155,114,232,0.4)", color: "var(--purple)", borderRadius: 5, padding: "3px 10px", fontSize: 11, fontFamily: "'Syne Mono',monospace" }}>
            {filtered.length} regjistrime
          </span>
        </div>
        <p style={{ color: "var(--text-3)", fontSize: 13 }}>
          Të gjitha transaksionet e mëparshme, të rivendosura automatikisht çdo natë në ora <strong style={{ color: "var(--gold)" }}>23:00</strong>. Organizuar sipas muajit.
        </p>
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
        <StatCard label="Totali i Arkivuar"   value={fmt(totalArchived)} accent="var(--purple)" icon="📦" />
        <StatCard label="Transaksione"        value={filtered.length} sub="gjithë kohën" accent="var(--text-2)" icon="📋" />
        <StatCard label="Kesh (Arkivë)"       value={fmt(cashArchived)} accent="var(--green)" icon="💵" />
        <StatCard label="Kartë (Arkivë)"      value={fmt(cardArchived)} accent="var(--blue)"  icon="💳" />
      </div>

      {/* Filter by worker */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 11, color: "var(--text-3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Filtro Punonjësin:</span>
        {[{ id: "all", name: "Të Gjithë" }, ...workers].map((w) => (
          <button key={w.id} onClick={() => setSearchWorker(w.id)} style={{
            background: searchWorker === w.id ? "rgba(201,168,76,0.12)" : "var(--ink-4)",
            border: `1px solid ${searchWorker === w.id ? "var(--gold-dim)" : "var(--ink-5)"}`,
            color: searchWorker === w.id ? "var(--gold)" : "var(--text-2)",
            borderRadius: 6, padding: "5px 14px", fontSize: 12, cursor: "pointer",
            fontFamily: "'Syne',sans-serif", fontWeight: 600, transition: "all 0.15s",
          }}>
            {w.name}
          </button>
        ))}
      </div>

      {/* Month accordions */}
      {monthKeys.length === 0 ? (
        <div className="glass-card" style={{ borderRadius: 10, padding: "48px", textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
          <div style={{ color: "var(--text-3)", fontWeight: 600 }}>Nuk ka të dhëna të arkivuara</div>
          <div style={{ color: "var(--text-3)", fontSize: 12, marginTop: 6, opacity: 0.7 }}>Transaksionet do të shfaqen këtu pas rivendosjes së natës</div>
        </div>
      ) : monthKeys.map((key) => {
        const txs      = grouped[key];
        const isOpen   = openMonths[key] ?? true; // open by default
        const monthRev = txs.reduce((s, t) => s + t.total_price, 0);
        const monthCash = txs.filter((t) => t.payment_method === "cash").reduce((s, t) => s + t.total_price, 0);
        const monthCard = txs.filter((t) => t.payment_method === "card").reduce((s, t) => s + t.total_price, 0);
        const label    = fmtMonth(txs[0].timestamp);

        return (
          <div key={key} style={{ marginBottom: 12 }}>
            {/* Month header row */}
            <div
              className="month-row"
              onClick={() => toggleMonth(key)}
              style={{
                background: "var(--ink-3)",
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: isOpen ? "10px 10px 0 0" : 10,
                padding: "14px 20px",
                display: "flex", alignItems: "center", gap: 16,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              {/* Chevron */}
              <span style={{ color: "var(--gold)", fontSize: 13, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", display: "inline-block" }}>▶</span>

              {/* Month label */}
              <div style={{ flex: 1 }}>
                <span className="font-display" style={{ fontSize: 18, fontWeight: 600, color: "var(--text)", textTransform: "capitalize" }}>{label}</span>
                <span style={{ marginLeft: 12, fontSize: 11, color: "var(--text-3)" }}>{txs.length} transaksione</span>
              </div>

              {/* Quick stats */}
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "var(--green)" }}>💵 {fmt(monthCash)}</span>
                <span style={{ fontSize: 11, color: "var(--blue)" }}>💳 {fmt(monthCard)}</span>
                <span className="font-mono" style={{ color: "var(--gold)", fontSize: 16, fontWeight: 700 }}>{fmt(monthRev)}</span>
              </div>

              <span className="badge-archive">ARKIVË</span>
            </div>

            {/* Month transaction table */}
            {isOpen && (
              <div className="slide-down" style={{ border: "1px solid rgba(201,168,76,0.12)", borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "var(--ink-4)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      {["Data & Ora","Punonjësi","Shërbimi","Çmimi","Pagesa"].map((h) => (
                        <th key={h} style={{ padding: "9px 16px", textAlign: "left", fontSize: 9, letterSpacing: "0.12em", color: "var(--text-3)", textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {txs.map((tx, i) => {
                      const worker = getWorker(tx.worker_id);
                      const svc    = getService(tx.service_id);
                      return (
                        <tr key={tx.id} className="tr-hover" style={{ background: i % 2 === 0 ? "var(--ink-2)" : "var(--ink-3)", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                          <td style={{ padding: "11px 16px" }}>
                            <div className="font-mono" style={{ fontSize: 11, color: "var(--text-2)" }}>{fmtTime(tx.timestamp)}</div>
                            <div style={{ fontSize: 10, color: "var(--text-3)", marginTop: 1 }}>{fmtDate(tx.timestamp)}</div>
                          </td>
                          <td style={{ padding: "11px 16px", fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{worker?.name ?? "—"}</td>
                          <td style={{ padding: "11px 16px", fontSize: 12, color: "var(--text-2)" }}>{svc?.service_name ?? "—"}</td>
                          <td style={{ padding: "11px 16px" }}><span className="font-mono" style={{ color: "var(--gold)", fontSize: 13 }}>{fmt(tx.total_price)}</span></td>
                          <td style={{ padding: "11px 16px" }}><PayBadge method={tx.payment_method} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                  {/* Month footer */}
                  <tfoot>
                    <tr style={{ background: "var(--ink-4)", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
                      <td colSpan={3} style={{ padding: "10px 16px", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.08em" }}>TOTALI PËR {label.toUpperCase()}</td>
                      <td style={{ padding: "10px 16px" }}><span className="font-mono" style={{ color: "var(--gold)", fontSize: 14, fontWeight: 700 }}>{fmt(monthRev)}</span></td>
                      <td style={{ padding: "10px 16px" }}>
                        <span style={{ fontSize: 11, color: "var(--green)" }}>💵 {fmt(monthCash)}</span>
                        <span style={{ fontSize: 11, color: "var(--text-3)", margin: "0 6px" }}>·</span>
                        <span style={{ fontSize: 11, color: "var(--blue)" }}>💳 {fmt(monthCard)}</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── OWNER: STAFF ─────────────────────────────────────────────────────────────
function OwnerStaff({ transactions, workers }) {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600 }}>Pasqyra e Stafit</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
        {workers.filter((w) => w.role === "Worker").map((w) => {
          const wTx    = transactions.filter((t) => t.worker_id === w.id);
          const wToday = wTx.filter((t) => new Date(t.timestamp).toDateString() === new Date().toDateString());
          const rev      = wTx.reduce((s, t) => s + t.total_price, 0);
          const revToday = wToday.reduce((s, t) => s + t.total_price, 0);
          const cashToday = wToday.filter((t) => t.payment_method === "cash").reduce((s, t) => s + t.total_price, 0);
          const cardToday = wToday.filter((t) => t.payment_method === "card").reduce((s, t) => s + t.total_price, 0);
          const timelog  = TIME_LOGS.find((tl) => tl.worker_id === w.id);
          const isClocked = timelog?.clock_in && !timelog?.clock_out;
          return (
            <div key={w.id} className="glass-card fade-up" style={{ borderRadius: 12, padding: "22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,var(--gold-dim),var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>{w.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{w.name}</div>
                  <div style={{ fontSize: 11, color: isClocked ? "var(--green)" : "var(--text-3)", display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: isClocked ? "var(--green)" : "var(--muted)", display: "inline-block" }} />
                    {isClocked ? `Hyrë në ${fmtTime(timelog.clock_in)}` : "Nuk është kyçur"}
                  </div>
                </div>
              </div>
              <div className="gold-line" style={{ marginBottom: 14 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 10, color: "var(--text-3)", marginBottom: 3 }}>TË ARD. TOTALE</div>
                  <div className="font-mono" style={{ color: "var(--gold)", fontSize: 15 }}>{fmt(rev)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "var(--text-3)", marginBottom: 3 }}>SOT</div>
                  <div className="font-mono" style={{ color: "var(--green)", fontSize: 15 }}>{fmt(revToday)}</div>
                </div>
              </div>
              {wToday.length > 0 && (
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 8 }}>
                  <span style={{ fontSize: 11, color: "var(--green)" }}>💵 {fmt(cashToday)}</span>
                  <span style={{ fontSize: 11, color: "var(--text-3)" }}>·</span>
                  <span style={{ fontSize: 11, color: "var(--blue)" }}>💳 {fmt(cardToday)}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [workers, setWorkers]         = useState(INITIAL_WORKERS);
  const [user, setUser]               = useState(null);
  const [view, setView]               = useState(null);
  const [transactions, setTransactions]               = useState(INITIAL_TRANSACTIONS);
  const [archivedTransactions, setArchivedTransactions] = useState(INITIAL_ARCHIVED_TRANSACTIONS);
  const [corrections, setCorrections] = useState(INITIAL_CORRECTIONS);
  const [showResetToast, setShowResetToast] = useState(false);

  // Track the last date we did the 11 PM reset
  const lastResetDateRef = useRef(null);

  // ── 11 PM daily reset logic ─────────────────────────────────────────────────
  useEffect(() => {
    const checkReset = () => {
      const now   = new Date();
      const todayStr = now.toDateString();
      const hour  = now.getHours();
      const min   = now.getMinutes();

      // Trigger at 23:00 (11 PM), once per calendar day
      if (hour === 23 && min === 0 && lastResetDateRef.current !== todayStr) {
        lastResetDateRef.current = todayStr;

        setTransactions((current) => {
          if (current.length > 0) {
            // Move all active transactions into the archive
            setArchivedTransactions((archive) => [...archive, ...current]);
            setShowResetToast(true);
          }
          return []; // clear today's list
        });
      }
    };

    // Check every 30 seconds (fine-grained enough for a minute-boundary trigger)
    const interval = setInterval(checkReset, 30_000);
    checkReset(); // also check immediately on mount

    return () => clearInterval(interval);
  }, []);

  const getWorker   = (id) => workers.find((w) => w.id === id);
  const handleLogin = (worker) => { setUser(worker); setView(worker.role === "Owner" ? "dashboard" : "log"); };
  const handleLogout = () => { setUser(null); setView(null); };

  if (!user) return (<><GlobalStyles /><PinLogin onLogin={handleLogin} workers={workers} /></>);

  const renderView = () => {
    if (user.role === "Owner") {
      if (view === "dashboard")    return <OwnerDashboard transactions={transactions} corrections={corrections} workers={workers} />;
      if (view === "transactions") return <OwnerTransactions transactions={transactions} setTransactions={setTransactions} corrections={corrections} setCorrections={setCorrections} getWorker={getWorker} />;
      if (view === "corrections")  return <OwnerCorrections corrections={corrections} transactions={transactions} getWorker={getWorker} />;
      if (view === "archive")      return <OwnerArchive archivedTransactions={archivedTransactions} getWorker={getWorker} />;
      if (view === "staff")        return <OwnerStaff transactions={transactions} workers={workers} />;
    } else {
      if (view === "log")     return <WorkerLogService user={user} transactions={transactions} setTransactions={setTransactions} />;
      if (view === "history") return <WorkerHistory user={user} transactions={transactions} />;
    }
    return null;
  };

  return (
    <>
      <GlobalStyles />
      <div style={{ minHeight: "100vh", background: "var(--ink)" }}>
        <TopNav user={user} onLogout={handleLogout} view={view} setView={setView} />
        <div className="scroll-y" style={{ maxHeight: "calc(100vh - 60px)" }}>
          {renderView()}
        </div>
      </div>
      {showResetToast && <ResetToast onDismiss={() => setShowResetToast(false)} />}
    </>
  );
}
