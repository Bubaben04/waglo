import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const CATEGORIES = [
  { id: "all", label: "Tutti", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/></svg> },
  { id: "cani", label: "Cani", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 2 1.261.188 2.53-.198 3.344-1"/><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 2-1.261.188-2.53-.198-3.344-1"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306"/></svg> },
  { id: "gatti", label: "Gatti", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.26A9.06 9.06 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/></svg> },
  { id: "uccelli", label: "Uccelli", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg> },
  { id: "pesci", label: "Pesci", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.5"/><path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/><path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 3.46-.05 6.96 2.27 9.5"/><path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"/><path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H8c1.153-1.24 2.23-2.88 2.5-4.26"/></svg> },
  { id: "roditori", label: "Roditori", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="14" r="2"/><path d="m9 11-1-4a2 2 0 0 1 4 0l-1 4"/><path d="m15 11 1-4a2 2 0 0 0-4 0l1 4"/><path d="M9 21v-4"/><path d="M15 21v-4"/></svg> },
  { id: "rettili", label: "Rettili", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M2 12h20"/><path d="M12 2a10 10 0 0 1 0 20"/><path d="M12 2a10 10 0 0 0 0 20"/><path d="M12 2v20"/></svg> },
  { id: "conigli", label: "Conigli", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M18 11.5V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4"/><path d="M14 10V8a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 9.9V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5"/><path d="M6 14v0a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2"/><path d="M12 18v4"/></svg> },
  { id: "cavalli", label: "Cavalli", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M6 16c.6.5 1.2 1 2.5 1C11 17 11 15 13 15h1.5"/><path d="M17.5 14a2.5 2.5 0 0 1 0 5H14a2.5 2.5 0 0 1 0-5"/><path d="M13 11.5V9"/><path d="M17 12h1a2 2 0 0 0 2-2V7"/><path d="M14 7l2.5 2.5"/><path d="M2 8c0-1.5.5-4 4-4 2.5 0 4 1.5 4 4"/><path d="M6 12v4"/><path d="M6 8v4"/><path d="M2 12h4"/></svg> },
  { id: "altri", label: "Altri", svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg> },
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
  return <span style={{ background: c.color + "18", color: c.color, border: `1px solid ${c.color}33`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{c.label}</span>;
};

const getCategorySvg = (animalType) => {
  const cat = CATEGORIES.find(c => c.id === animalType);
  return cat ? cat.svg : CATEGORIES[0].svg;
};

const ProductCard = ({ ad, onOpen }) => {
  const [hover, setHover] = useState(false);
  const imageUrl = ad.ad_images?.[0]?.image_url;

  return (
    <div onClick={() => onOpen(ad)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", cursor: "pointer", border: "1.5px solid #e8f0ee", boxShadow: hover ? "0 8px 24px #1a7a6e18" : "0 2px 8px #00000008", transform: hover ? "translateY(-3px)" : "none", transition: "all .22s ease", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#f0f4f3", height: 140, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {imageUrl
          ? <img src={imageUrl} alt={ad.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <span style={{ color: "#1a7a6e", transform: "scale(3)" }}>{React.cloneElement(getCategorySvg(ad.animal_type), { style: { width: 32, height: 32 } })}</span>
        }
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
        <div style={{ background: "#f0f4f3", height: 200, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderRadius: "24px 24px 0 0", overflow: "hidden" }}>
          {imageUrl
            ? <img src={imageUrl} alt={ad.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ color: "#1a7a6e" }}>{React.cloneElement(getCategorySvg(ad.animal_type), { style: { width: 80, height: 80 } })}</span>
          }
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

      <div style={{ padding: "14px 20px", background: "#1a7a6e", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px #1a7a6e40" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/waglo_logo.webp" alt="Waglo" style={{ width: 36, height: 36, borderRadius: 8 }} />
          <span style={{ fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: -0.5 }}>Waglo</span>
        </div>
        {!session && (
          <button onClick={onShowAuth} style={{ background: "#fff", color: "#1a7a6e", border: "none", borderRadius: 10, padding: "7px 16px", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Accedi</button>
        )}
      </div>

      <div style={{ padding: "14px 16px 0" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Cerca prodotti per animali..." style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid #dde8e6", background: "#fff", color: "#0f3d38", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }} />
      </div>

      <div style={{ display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto", scrollbarWidth: "none" }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCategory(c.id)} style={{ flexShrink: 0, padding: "7px 14px", borderRadius: 20, border: category === c.id ? "2px solid #1a7a6e" : "2px solid #dde8e6", background: category === c.id ? "#1a7a6e" : "#fff", color: category === c.id ? "#fff" : "#555", fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all .2s", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
            {c.svg}
            {c.label}
          </button>
        ))}
      </div>

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
