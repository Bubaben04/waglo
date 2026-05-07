import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Auth({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    display_name: "",
    city: "",
    user_type: "private",
    vat_number: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) setError(error.message);
    else onAuth();
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    if (!form.email || !form.password || !form.display_name || !form.city) {
      setError("Compila tutti i campi obbligatori.");
      setLoading(false);
      return;
    }
    if (form.user_type === "professional" && !form.vat_number) {
      setError("La partita IVA è obbligatoria per i commercianti.");
      setLoading(false);
      return;
    }
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });
    if (signUpError) { setError(signUpError.message); setLoading(false); return; }
    const { error: profileError } = await supabase.from("user_profiles").insert({
      id: data.user.id,
      display_name: form.display_name,
      email: form.email,
      city: form.city,
      user_type: form.user_type,
      vat_number: form.user_type === "professional" ? form.vat_number : null,
    });
    if (profileError) { setError(profileError.message); setLoading(false); return; }
    onAuth();
    setLoading(false);
  };

  const inp = {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: "1.5px solid #ddd", background: "#fafafa", color: "#0f3d38",
    fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none",
  };
  const lbl = {
    fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase",
    letterSpacing: 0.5, marginBottom: 4, display: "block",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f3", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Nunito', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap'); input:focus,select:focus,textarea:focus{border-color:#1a7a6e!important;box-shadow:0 0 0 3px #1a7a6e22;}`}</style>
      <div style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 24, padding: "36px 32px", boxShadow: "0 8px 40px #1a7a6e18", border: "1px solid #e8f0ee" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img src="/waglo_logo.webp" alt="Waglo" style={{ width: 72, height: 72, borderRadius: 16, marginBottom: 12 }} />
          <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 28, fontWeight: 900, color: "#1a7a6e" }}>Waglo</div>
          <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>Il marketplace per i tuoi animali</div>
        </div>
        <div style={{ display: "flex", background: "#f0f4f3", borderRadius: 12, padding: 4, marginBottom: 24 }}>
          {["login","register"].map(m => (
            <button key={m} onClick={() => { setMode(m); setStep(1); setError(""); }} style={{ flex: 1, padding: "10px 0", border: "none", borderRadius: 10, background: mode === m ? "#1a7a6e" : "transparent", color: mode === m ? "#fff" : "#888", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all .2s", fontFamily: "inherit" }}>
              {m === "login" ? "Accedi" : "Registrati"}
            </button>
          ))}
        </div>
        {error && <div style={{ background: "#fff0f0", color: "#e05a1e", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16, border: "1px solid #fdd" }}>⚠ {error}</div>}
        {mode === "login" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div><label style={lbl}>Email</label><input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="tua@email.com" style={inp} /></div>
            <div><label style={lbl}>Password</label><input type="password" value={form.password} onChange={e => set("password", e.target.value)} placeholder="••••••••" style={inp} /></div>
            <button onClick={handleLogin} disabled={loading} style={{ padding: "14px", border: "none", borderRadius: 12, background: "#e05a1e", color: "#fff", fontWeight: 800, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: 8, fontFamily: "inherit" }}>
              {loading ? "Accesso in corso..." : "Accedi"}
            </button>
          </div>
        )}
        {mode === "register" && step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div><label style={lbl}>Nome visualizzato</label><input type="text" value={form.display_name} onChange={e => set("display_name", e.target.value)} placeholder="Come vuoi essere chiamato" style={inp} /></div>
            <div><label style={lbl}>Email</label><input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="tua@email.com" style={inp} /></div>
            <div><label style={lbl}>Password</label><input type="password" value={form.password} onChange={e => set("password", e.target.value)} placeholder="Minimo 6 caratteri" style={inp} /></div>
            <div><label style={lbl}>Città</label><input type="text" value={form.city} onChange={e => set("city", e.target.value)} placeholder="es. Milano" style={inp} /></div>
            <button onClick={() => setStep(2)} style={{ padding: "14px", border: "none", borderRadius: 12, background: "#e05a1e", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 8, fontFamily: "inherit" }}>Continua →</button>
          </div>
        )}
        {mode === "register" && step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#f0f4f3", borderRadius: 14, padding: 16 }}>
              <label style={{ ...lbl, marginBottom: 12 }}>Tipo di account</label>
              {[{ value: "private", label: "👤 Privato", desc: "Vendo oggetti usati di casa mia" }, { value: "professional", label: "🏪 Commerciante", desc: "Vendo professionalmente con P.IVA" }].map(t => (
                <div key={t.value} onClick={() => set("user_type", t.value)} style={{ padding: "12px 14px", borderRadius: 10, border: `2px solid ${form.user_type === t.value ? "#1a7a6e" : "#ddd"}`, background: form.user_type === t.value ? "#e8f5f2" : "#fff", cursor: "pointer", marginBottom: 8, transition: "all .2s" }}>
                  <div style={{ fontWeight: 700, color: form.user_type === t.value ? "#1a7a6e" : "#0f3d38" }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{t.desc}</div>
                </div>
              ))}
            </div>
            {form.user_type === "professional" && (
              <div><label style={lbl}>Partita IVA</label><input type="text" value={form.vat_number} onChange={e => set("vat_number", e.target.value)} placeholder="IT12345678901" style={inp} /></div>
            )}
            <div style={{ background: "#fffbf0", border: "1px solid #f5e6c0", borderRadius: 10, padding: 12, fontSize: 11, color: "#888", lineHeight: 1.6 }}>
              ℹ️ Ai sensi della normativa DAC7 (D.Lgs. 32/2023), Waglo raccoglie e comunica all'Agenzia delle Entrate i dati dei venditori che superano 30 transazioni o €2.000 di ricavi annui.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "14px", border: "2px solid #ddd", borderRadius: 12, background: "transparent", color: "#888", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>← Indietro</button>
              <button onClick={handleRegister} disabled={loading} style={{ flex: 2, padding: "14px", border: "none", borderRadius: 12, background: "#e05a1e", color: "#fff", fontWeight: 800, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: "inherit" }}>
                {loading ? "Registrazione..." : "Crea account"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
