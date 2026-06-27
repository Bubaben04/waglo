import { useState } from "react";
import { supabase } from "../supabaseClient";
import {
  IconTutti, IconCani, IconGatti, IconUccelli, IconPesci,
  IconRoditori, IconRettili, IconConigli, IconCavalli, IconAltri,
  IconAlimenti, IconAccessori, IconIntegratori, IconIgiene,
  IconAntiparassitari, IconAltro
} from "./WagloIcons";






const ANIMAL_TYPES = [
 { id: "cani", label: "Cani", Icon: IconCani },
  { id: "gatti", label: "Gatti", Icon: IconGatti },
  { id: "uccelli", label: "Uccelli", Icon: IconUccelli },
  { id: "pesci", label: "Pesci e acquari", Icon: IconPesci },
  { id: "roditori", label: "Roditori", Icon: IconRoditori },
  { id: "rettili", label: "Rettili", Icon: IconRettili },
  { id: "conigli", label: "Conigli", Icon: IconConigli },
  { id: "cavalli", label: "Cavalli", Icon: IconCavalli },
  { id: "altri", label: "Altri", Icon: IconAltri },
];

const PRODUCT_CATEGORIES = [
  { id: "alimenti", label: "Alimenti", Icon: IconAlimenti },
  { id: "accessori", label: "Accessori", Icon: IconAccessori },
  { id: "integratori", label: "Integratori", Icon: IconIntegratori },
  { id: "igiene", label: "Igiene e cosmesi", Icon: IconIgiene },
  { id: "antiparassitari", label: "Antiparassitari", Icon: IconAntiparassitari },
  { id: "altro", label: "Altro", Icon: IconAltro },
]; 

const CONDITIONS = [
  { id: "nuovo", label: "Nuovo", desc: "Mai usato, con o senza confezione originale" },
  { id: "ottimo", label: "Ottimo", desc: "Usato pochissimo, nessun difetto visibile" },
  { id: "buono", label: "Buono", desc: "Qualche segno d'uso normale, perfettamente funzionante" },
  { id: "accettabile", label: "Accettabile", desc: "Segni d'uso evidenti, funzionante, difetti dichiarati" },
  { id: "danneggiato", label: "Danneggiato", desc: "Difetti strutturali o estetici significativi" },
  { id: "in_scadenza", label: "In scadenza", desc: "Prodotto prossimo alla scadenza — inserisci la data obbligatoriamente" },
];

const PHOTO_REQUIRED = ["danneggiato"];

const inp = { width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #dde8e6", background: "#fafafa", color: "#0f3d38", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none" };
const lbl = { fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, display: "block" };

export default function NewAd({ session, onBack, onPublished }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [form, setForm] = useState({
    title: "", description: "", animal_type: [],
    category: "", condition: "", price: "",
    accepts_offers: false, city: ""
  });

  const [expiryDate, setExpiryDate] = useState("");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generateDescription = async () => {
    if (!form.title.trim()) { setError("Inserisci prima un titolo per generare la descrizione."); return; }
    setAiLoading(true);
    setError("");
    try {
      const response = await fetch("/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          animal_type: form.animal_type,
          category: form.category,
          condition: form.condition
        })
      });
      const data = await response.json();
      const text = data.description || "";
      if (text) set("description", text);
    } catch (e) {
      setError("Errore nella generazione della descrizione. Riprova.");
    }
    setAiLoading(false);
  };
  const photoRequired = PHOTO_REQUIRED.includes(form.condition);
  const expiryRequired = form.condition === "in_scadenza";

  const validateExpiryDate = (dateStr) => {
    if (!dateStr) return false;
    const selected = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((selected - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 7;
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 5) { setError("Puoi caricare massimo 5 foto."); return; }
    setError("");
    setPhotos(prev => [...prev, ...files.map(file => ({ file, preview: URL.createObjectURL(file) }))]);
  };

  const validateStep1 = () => {
    if (!form.title.trim()) return "Inserisci un titolo.";
    if (!form.animal_type || form.animal_type.length === 0) return "Seleziona almeno un tipo di animale.";
    if (!form.category) return "Seleziona la categoria prodotto.";
    if (!form.condition) return "Seleziona le condizioni.";
    if (photoRequired && photos.length === 0) return "Almeno una foto è obbligatoria per questa condizione.";
    if (expiryRequired) {
      if (!expiryDate) return "Inserisci la data di scadenza — obbligatoria per prodotti in scadenza.";
      if (!validateExpiryDate(expiryDate)) return "⚠ La data di scadenza deve essere almeno 7 giorni dalla data odierna. Non è possibile pubblicare questo annuncio.";
    }
    return null;
  };

  const validateStep2 = () => {
    if (!form.price || isNaN(+form.price) || +form.price < 0.50 || +form.price > 5000) return "Il prezzo deve essere compreso tra €0,50 e €5.000.";
    if (!form.city.trim()) return "Inserisci la città.";
    if (!form.description.trim()) return "Inserisci una descrizione.";
    return null;
  };

  const handleNext = () => { const err = validateStep1(); if (err) { setError(err); return; } setError(""); setStep(2); };

  const handleSubmit = async () => {
    const err = validateStep2();
    if (err) { setError(err); return; }
    setLoading(true); setError("");
    const { data: ad, error: adError } = await supabase.from("ads").insert({
      user_id: session.user.id, title: form.title, description: form.description,
      animal_type: form.animal_type, category: form.category,
      condition: form.condition, price: +form.price,
      accepts_offers: form.accepts_offers, city: form.city,
      status: "active",
      expiration_date: expiryRequired && expiryDate ? expiryDate : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    }).select().single();
    if (adError) {
      let msg = "Errore durante la pubblicazione. Riprova.";
      if (adError.message.includes("check_price_range")) msg = "Il prezzo deve essere compreso tra €0,50 e €5.000.";
      if (adError.message.includes("check_title_not_empty")) msg = "Il titolo e' troppo corto.";
      if (adError.message.includes("check_city_not_empty")) msg = "Inserisci una citta' valida.";
      if (adError.message.includes("check_condition_valid")) msg = "Seleziona una condizione valida.";
      if (adError.message.includes("enforce_ad_rate_limit") || adError.message.includes("Limite raggiunto")) msg = "Hai raggiunto il limite di 5 annunci nelle ultime 24 ore.";
      setError(msg); setLoading(false); return;
    }
    for (let i = 0; i < photos.length; i++) {
      const fileName = `${ad.id}_${i}_${Date.now()}`;
      const { error: uploadError } = await supabase.storage.from("ad-images").upload(fileName, photos[i].file);
      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from("ad-images").getPublicUrl(fileName);
        await supabase.from("ad_images").insert({ ad_id: ad.id, image_url: publicUrl, position: i });
      }
    }
    setLoading(false); onPublished();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7f6", fontFamily: "'Nunito', sans-serif", paddingBottom: 100 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap'); input:focus,select:focus,textarea:focus{border-color:#1a7a6e!important;}`}</style>
      <div style={{ padding: "16px 20px", background: "#1a7a6e", display: "flex", alignItems: "center", gap: 14, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", padding: 0 }}>←</button>
        <div style={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>{step === 1 ? "Nuovo annuncio" : "Dettagli e prezzo"}</div>
      </div>
      <div style={{ padding: "16px 20px 0", display: "flex", gap: 8 }}>
        {[1,2].map(s => <div key={s} style={{ flex: 1, height: 4, borderRadius: 4, background: step >= s ? "#e05a1e" : "#dde8e6", transition: "background .3s" }} />)}
      </div>
      <div style={{ padding: "20px" }}>
        

        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              {error && <div style={{ background: "#fff0ec", color: "#e05a1e", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 0, border: "1px solid #fdd0c0" }}>⚠ {error}</div>}
              <label style={lbl}>Titolo annuncio *</label>
              <input type="text" value={form.title} onChange={e => set("title", e.target.value)} placeholder="Es.: Cuccia da interno piccola" style={inp} />
            </div>

            <div>
              <label style={lbl}>Tipo di animale *</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {ANIMAL_TYPES.map(({ id, label, Icon }) => {
                  const active = form.animal_type.includes(id);
                  return (
                    <button key={id} onClick={() => set("animal_type", form.animal_type.includes(id) ? form.animal_type.filter(a => a !== id) : [...form.animal_type, id])} style={{ padding: "10px 6px", borderRadius: 10, cursor: "pointer", border: `2px solid ${active ? "#1a7a6e" : "#dde8e6"}`, background: active ? "#e8f5f2" : "#fff", color: active ? "#1a7a6e" : "#888", fontSize: 12, fontWeight: 700, textAlign: "center", transition: "all .2s", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <Icon size={24} strokeWidth={1.8} color={active ? "#1a7a6e" : "#888"} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={lbl}>Categoria prodotto *</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {PRODUCT_CATEGORIES.map(({ id, label, Icon }) => {
                  const active = form.category === id;
                  return (
                    <button key={id} onClick={() => set("category", id)} style={{ padding: "10px 14px", borderRadius: 10, cursor: "pointer", border: `2px solid ${active ? "#e05a1e" : "#dde8e6"}`, background: active ? "#fff0ec" : "#fff", color: active ? "#e05a1e" : "#555", fontWeight: 700, fontSize: 13, transition: "all .2s", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
                      <Icon size={18} strokeWidth={1.8} color={active ? "#e05a1e" : "#888"} />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={lbl}>Condizioni *</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {CONDITIONS.map(c => (
                  <div key={c.id} onClick={() => set("condition", c.id)} style={{ padding: "12px 14px", borderRadius: 10, cursor: "pointer", border: `2px solid ${form.condition === c.id ? "#1a7a6e" : "#dde8e6"}`, background: form.condition === c.id ? "#e8f5f2" : "#fff", transition: "all .2s" }}>
                    <div style={{ fontWeight: 700, color: form.condition === c.id ? "#1a7a6e" : "#0f3d38", fontSize: 14 }}>{c.label}</div>
                    <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {expiryRequired && (
              <div>
                <label style={lbl}>Data di scadenza * (obbligatoria)</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={e => setExpiryDate(e.target.value)}
                  min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                  style={{ ...inp, borderColor: expiryDate && !validateExpiryDate(expiryDate) ? "#ef4444" : "#dde8e6" }}
                />
                {expiryDate && !validateExpiryDate(expiryDate) && (
                  <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4, fontWeight: 700 }}>
                    ⚠ La data di scadenza deve essere almeno 7 giorni da oggi. Pubblicazione non consentita.
                  </div>
                )}
              </div>
            )}

            <div>
              <label style={lbl}>Foto {photoRequired ? "* (obbligatoria)" : "(facoltativa)"} — max 5</label>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {photos.map((p, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={p.preview} alt="" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 10, border: "2px solid #dde8e6" }} />
                    <button onClick={() => setPhotos(prev => prev.filter((_, j) => j !== i))} style={{ position: "absolute", top: -6, right: -6, background: "#e05a1e", border: "none", borderRadius: "50%", width: 20, height: 20, color: "#fff", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  </div>
                ))}
                {photos.length < 5 && (
                  <label style={{ width: 80, height: 80, borderRadius: 10, border: "2px dashed #dde8e6", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#aaa", fontSize: 28, background: "#fff" }}>
                    +<input type="file" accept="image/*" multiple onChange={handlePhotoUpload} style={{ display: "none" }} />
                  </label>
                )}
              </div>
            </div>

            <button onClick={handleNext} style={{ padding: "14px", border: "none", borderRadius: 12, background: "#e05a1e", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", marginTop: 8, fontFamily: "inherit" }}>Continua →</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {error && <div style={{ background: "#fff0ec", color: "#e05a1e", borderRadius: 10, padding: "10px 14px", fontSize: 13, border: "1px solid #fdd0c0" }}>⚠ {error}</div>}
            <div><label style={lbl}>Prezzo € *</label><input type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="0" min="0" style={inp} /></div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", padding: "14px 16px", borderRadius: 12, border: "1.5px solid #dde8e6" }}>
              <div><div style={{ color: "#0f3d38", fontWeight: 700 }}>Accetto offerte</div><div style={{ color: "#888", fontSize: 12 }}>Gli acquirenti possono proporre un prezzo</div></div>
              <div onClick={() => set("accepts_offers", !form.accepts_offers)} style={{ width: 44, height: 24, borderRadius: 12, background: form.accepts_offers ? "#1a7a6e" : "#ddd", cursor: "pointer", position: "relative", transition: "background .2s" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: form.accepts_offers ? 23 : 3, transition: "left .2s" }} />
              </div>
            </div>
            <div><label style={lbl}>Città *</label><input type="text" value={form.city} onChange={e => set("city", e.target.value)} placeholder="es. Milano" style={inp} /></div>
            <div>
  <label style={lbl}>Descrizione *</label>
              <button type="button" onClick={generateDescription} disabled={aiLoading} style={{ marginBottom: 8, padding: "10px 16px", border: "none", borderRadius: 10, background: "#1a7a6e", color: "#fff", fontWeight: 700, fontSize: 13, cursor: aiLoading ? "not-allowed" : "pointer", opacity: aiLoading ? 0.7 : 1, fontFamily: "inherit", width: "100%" }}>
                {aiLoading ? "Generazione in corso..." : "Genera descrizione con AI"}
              </button>
  <textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Descrivi l'articolo..." rows={4} style={{ ...inp, resize: "vertical" }} />
  
</div>
            <button onClick={handleSubmit} disabled={loading} style={{ padding: "14px", border: "none", borderRadius: 12, background: "#e05a1e", color: "#fff", fontWeight: 800, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: 8, fontFamily: "inherit" }}>
              {loading ? "Pubblicazione..." : "✅ Pubblica annuncio"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
