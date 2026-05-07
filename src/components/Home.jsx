import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const CATEGORIES = [
  { id: "all", label: "Tutti", emoji: "🐾" },
  { id: "cani", label: "Cani", emoji: "🐕" },
  { id: "gatti", label: "Gatti", emoji: "🐈" },
  { id: "uccelli", label: "Uccelli", emoji: "🦜" },
  { id: "pesci", label: "Pesci", emoji: "🐠" },
  { id: "roditori", label: "Roditori", emoji: "🐹" },
  { id: "rettili", label: "Rettili", emoji: "🦎" },
  { id: "conigli", label: "Conigli", emoji: "🐰" },
  { id: "cavalli", label: "Cavalli", emoji: "🐴" },
  { id: "altri", label: "Altri", emoji: "🌿" },
];

const CONDITIONS = {
  nuovo: { label: "Nuovo", color: "#1a7a6e" },
  ottimo: { label: "Ottimo", color: "#2563eb" },
  buono: { label: "Buono", color: "#d97706" },
  accettabile: { label: "Accettabile", color: "#e05a1e" },
  danneggiato: { label: "Danneggiato", color: "#7c3aed" },
  in_scadenza: { label: "In scadenza", color: "#f97316" },
  scaduto: { label: "Scaduto", color: "#6b7280" },
};

const Badge = ({ condition }) => {
  const c = CONDITIONS[condition] || { label: condition, color: "#888" };
  return (
    <span style={{ background: c.color + "18", color: c.color, border: `1px solid ${c.color}33`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{c.label}</span>
  );
};

const ProductCard = ({ ad, onOpen }) => {
  const [hover, setHover] = useState(false);
  const imageUrl = ad.ad_images?.[0]?.image_url;
  return (
    <div onClick={() => onOpen(ad)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", cursor: "pointer", border: "1.5px solid #e8f0ee", boxShadow: hover ? "0 8px 24px #1a7a6e18" : "0 2px 8px #00000008", transform: hover ? "translateY(-3px)" : "none", transition: "all .22s ease", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#f0f4f3", height: 140, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, overflow: "hidden" }}>
        {imageUrl ? <img src={imageUrl} alt={ad.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : CATEGORIES.find(c => c.id === ad.animal_type)?.emoji || "🐾"}
      </div>
      <div style={{ padding: "12px 12px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#0f3d38", lineHeight: 1.3 }}>{ad.title}</span>
          <span style={{ fontWeight: 900, fontSize: 16, color: "#e05a1e", whiteSpace: "nowrap" }}>€{ad.price}</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <Badge condition={ad.condition} />
          <span style={{ fontSize: 11, color: "#888" }}>📍 {ad.city}</span>
        </div>
        <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{ad.user_profiles?.display_name || "Utente"}</div>
      </div>
    </div>
  );
};

const ProductModal = ({ ad, onClose, session, onContact }) => {
  if (!ad) return null;
  const imageUrl = ad.ad_images?.[0]?.image_url;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#0007", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, maxWidth: 500, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 80px #0004" }}>
        <div style={{ background: "#f0f4f3", height: 200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 96, position: "relative", borderRadius: "24px 24px 0 0", overflow: "hidden" }}>
          {imageUrl ? <img src={imageUrl} alt={ad.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : CATEGORIES.find(c => c.id === ad.animal_type)?.emoji || "🐾"}
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", color: "#333", boxShadow: "0 2px 8px #0002" }}>✕</button>
        </div>
        <div style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <h2 style={{ fontSize: 20, margin: 0, color: "#0f3d38", fontWeight: 800 }}>{ad.title}</h2>
            <span style={{ fontWeight: 900, fontSize: 24, color: "#e05a1e" }}>€{ad.price}</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Badge condition={ad.condition} />
            <span style={{ fontSize: 12, color: "#888", background: "#f0f4f3", borderRadius: 6, padding: "2px 8px" }}>📍 {ad.city}</span>
            {ad.accepts_offers && <span style={{ fontSize: 12, color: "#1a7a6e", background: "#e8f5f2", borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>💬 Accetta offerte</span>}
          </div>
          <p style={{ margin: 0, color: "#555", lineHeight: 1.7, fontSize: 14 }}>{ad.description}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#1a7a6e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "#fff" }}>
              {(ad.user_profiles?.display_name || "U")[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#0f3d38" }}>{ad.user_profiles?.display_name || "Utente"}</div>
              <div style={{ fontSize: 12, color: "#888" }}>Venditore</div>
            </div>
          </div>
          {session ? (
            <button onClick={() => onContact(ad)} style={{ padding: "14px", border: "none", borderRadius: 12, background: "#e05a1e", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>💬 Contatta venditore</button>
          ) : (
            <div style={{ padding: "14px", borderRadius: 12, background: "#f0f4f3", color: "#888", fontSize: 14, textAlign: "center", border: "1px solid #e0eae8" }}>
              <span style={{ color: "#1a7a6e", fontWeight: 700, cursor: "pointer" }}>Accedi</span> per contattare il venditore
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home({ session, onShowAuth }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedAd, setSelectedAd] = useState(null);

  useEffect(() => { fetchAds(); }, []);

  const fetchAds = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("ads").select("*, ad_images(*), user_profiles(display_name)").eq("status", "active").order("created_at", { ascending: false });
    if (!error) setAds(data || []);
    setLoading(false);
  };

  const filtered = ads.filter(ad => {
    const matchCat = category === "all" || ad.animal_type === category;
    const matchSearch = !search || ad.title.toLowerCase().includes(search.toLowerCase()) || ad.city.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7f6", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap'); ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-thumb{background:#1a7a6e;border-radius:4px}`}</style>

      {/* Header */}
      <div style={{ padding: "14px 20px", background: "#1a7a6e", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px #1a7a6e40" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: -0.5 }}>Waglo</span>
        </div>
        {!session && (
          <button onClick={onShowAuth} style={{ background: "#fff", color: "#1a7a6e", border: "none", borderRadius: 10, padding: "7px 16px", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Accedi</button>
        )}
      </div>

      {/* Search */}
      <div style={{ padding: "14px 16px 0" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Cerca prodotti per animali..." style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid #dde8e6", background: "#fff", color: "#0f3d38", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }} />
      </div>

      {/* Categorie */}
      <div style={{ display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto", scrollbarWidth: "none" }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCategory(c.id)} style={{ flexShrink: 0, padding: "7px 14px", borderRadius: 20, border: category === c.id ? "2px solid #1a7a6e" : "2px solid #dde8e6", background: category === c.id ? "#1a7a6e" : "#fff", color: category === c.id ? "#fff" : "#555", fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all .2s", fontFamily: "inherit" }}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Griglia */}
      <div style={{ padding: "0 16px 100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {loading ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#888" }}>Caricamento...</div>
        ) : filtered.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#888" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p>Nessun annuncio trovato.</p>
          </div>
        ) : filtered.map(ad => <ProductCard key={ad.id} ad={ad} onOpen={setSelectedAd} />)}
      </div>

      {selectedAd && <ProductModal ad={selectedAd} onClose={() => setSelectedAd(null)} session={session} onContact={() => { setSelectedAd(null); alert("Chat in arrivo nel prossimo aggiornamento!"); }} />}
    </div>
  );
}
