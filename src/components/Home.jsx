import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import {
  IconTutti, IconCani, IconGatti, IconUccelli, IconPesci,
  IconRoditori, IconRettili, IconConigli, IconCavalli, IconAltri,
  IconAlimenti, IconAccessori, IconIntegratori, IconIgiene,
  IconAntiparassitari, IconAltro, IconPacco, IconRicerca
} from "./WagloIcons";

const ANIMAL_CATEGORIES = [
  { id: "all", label: "Tutti", Icon: IconTutti },
  { id: "cani", label: "Cani", Icon: IconCani },
  { id: "gatti", label: "Gatti", Icon: IconGatti },
  { id: "uccelli", label: "Uccelli", Icon: IconUccelli },
  { id: "pesci", label: "Pesci", Icon: IconPesci },
  { id: "roditori", label: "Roditori", Icon: IconRoditori },
  { id: "rettili", label: "Rettili", Icon: IconRettili },
  { id: "conigli", label: "Conigli", Icon: IconConigli },
  { id: "cavalli", label: "Cavalli", Icon: IconCavalli },
  { id: "altri", label: "Altri", Icon: IconAltri },
];

const PRODUCT_CATEGORIES = [
  { id: "all", label: "Tutti", Icon: IconTutti },
  { id: "alimenti", label: "Alimenti", Icon: IconAlimenti },
  { id: "accessori", label: "Accessori", Icon: IconAccessori },
  { id: "integratori", label: "Integratori", Icon: IconIntegratori },
  { id: "igiene", label: "Igiene e cosmesi", Icon: IconIgiene },
  { id: "antiparassitari", label: "Antiparassitari", Icon: IconAntiparassitari },
  { id: "altro", label: "Altro", Icon: IconAltro },
];

const CONDITIONS = {
  nuovo: { label: "Nuovo", color: "#1a7a6e" },
  ottimo: { label: "Ottimo", color: "#2563eb" },
  buono: { label: "Buono", color: "#d97706" },
  accettabile: { label: "Accettabile", color: "#e05a1e" },
  danneggiato: { label: "Danneggiato", color: "#7c3aed" },
  in_scadenza: { label: "In scadenza", color: "#f97316" },
};

const Badge = ({ condition }) => {
  const c = CONDITIONS[condition] || { label: condition, color: "#888" };
  return <span style={{ background: c.color + "18", color: c.color, border: `1px solid ${c.color}33`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{c.label}</span>;
};

const getAnimalIcon = (animalType) => {
  const cat = ANIMAL_CATEGORIES.find(c => c.id === animalType);
  return cat ? cat.Icon : IconAltri;
};

const ProductCard = ({ ad, onOpen }) => {
  const [hover, setHover] = useState(false);
  const AnimalIcon = getAnimalIcon(ad.animal_type);
  return (
    <div onClick={() => onOpen(ad)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", cursor: "pointer", border: "1.5px solid #e8f0ee", boxShadow: hover ? "0 8px 24px #1a7a6e18" : "0 2px 8px #00000008", transform: hover ? "translateY(-3px)" : "none", transition: "all .22s ease", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#f0f4f3", height: 140, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", color: "#1a7a6e" }}>
        {imageUrl ? <img src={imageUrl} alt={ad.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <AnimalIcon size={56} strokeWidth={1.5} color="#1a7a6e" />}
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
  const AnimalIcon = getAnimalIcon(ad.animal_type);
  const [showReport, setShowReport] = React.useState(false);
  const images = ad.ad_images || [];
  const [currentImg, setCurrentImg] = React.useState(0);
  const [reportReason, setReportReason] = React.useState("");
  const [reportDetails, setReportDetails] = React.useState("");
  const [reportSent, setReportSent] = React.useState(false);
  const [reportLoading, setReportLoading] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    if (!session) return;
    supabase.from("favorites").select("id").eq("ad_id", ad.id).eq("user_id", session.user.id).maybeSingle().then(({ data }) => setIsFavorite(!!data));
  }, [ad.id, session]);

  const toggleFavorite = async () => {
    if (!session) return;
    if (isFavorite) {
      await supabase.from("favorites").delete().eq("ad_id", ad.id).eq("user_id", session.user.id);
      setIsFavorite(false);
    } else {
      await supabase.from("favorites").insert({ ad_id: ad.id, user_id: session.user.id });
      setIsFavorite(true);
    }
  };

  const handleReport = async () => {
    if (!reportReason) return;
    setReportLoading(true);
    await supabase.from("reports").insert({
      ad_id: ad.id,
      reporter_id: session?.user?.id || null,
      reason: reportReason,
      details: reportDetails,
      status: "pending"
    });
    setReportSent(true);
    setReportLoading(false);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#0007", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, maxWidth: 500, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 80px #0004" }}>
        <div style={{ background: "#f0f4f3", height: 200, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderRadius: "24px 24px 0 0", overflow: "hidden", color: "#1a7a6e" }}>
  {images.length > 0 ? (
    <>
      <img src={images[currentImg]?.image_url} alt={ad.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); setCurrentImg(p => (p - 1 + images.length) % images.length); }} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "#fff9", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
          <button onClick={(e) => { e.stopPropagation(); setCurrentImg(p => (p + 1) % images.length); }} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "#fff9", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
          <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4 }}>
            {images.map((_, i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i === currentImg ? "#fff" : "#fff7" }} />)}
          </div>
        </>
      )}
    </>
  ) : <AnimalIcon size={80} strokeWidth={1.5} color="#1a7a6e" />}
  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(); }} style={{ position: "absolute", top: 14, left: 14, background: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px #0002" }}>{isFavorite ? "💛" : "🩶"}</button>
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
            <button onClick={() => onContact(ad.user_id, ad.id)} style={{ padding: "14px", border: "none", borderRadius: 12, background: "#e05a1e", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>💬 Contatta venditore</button>
          ) : (
            <div style={{ padding: "14px", borderRadius: 12, background: "#f0f4f3", color: "#888", fontSize: 14, textAlign: "center", border: "1px solid #e0eae8" }}>
              <span style={{ color: "#1a7a6e", fontWeight: 700, cursor: "pointer" }}>Accedi</span> per contattare il venditore
            </div>
          )}
          {!showReport && !reportSent && (
  <button onClick={() => setShowReport(true)} style={{ padding: "10px", border: "none", borderRadius: 12, background: "#f5f7f6", color: "#888", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>🚩 Segnala questo annuncio</button>
)}
          
          {showReport && !reportSent && (
            <div style={{ background: "#fff8e8", border: "1px solid #f5e6c0", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#0f3d38" }}>Segnala annuncio</div>
              <select value={reportReason} onChange={e => setReportReason(e.target.value)} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #dde8e6", fontSize: 14, fontFamily: "inherit", background: "#fff" }}>
                <option value="">Seleziona un motivo...</option>
                <option value="prodotto_vietato">Prodotto vietato o illegale</option>
                <option value="descrizione_falsa">Descrizione falsa o ingannevole</option>
                <option value="spam">Spam o annuncio duplicato</option>
                <option value="animale_vivo">Vendita di animale vivo</option>
                <option value="farmaco">Farmaco o medicinale veterinario</option>
                <option value="altro">Altro</option>
              </select>
              <textarea value={reportDetails} onChange={e => setReportDetails(e.target.value)} placeholder="Dettagli aggiuntivi (facoltativo)..." rows={3} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #dde8e6", fontSize: 13, fontFamily: "inherit", resize: "none" }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setShowReport(false)} style={{ flex: 1, padding: "10px", border: "1px solid #dde8e6", borderRadius: 8, background: "#fff", color: "#888", cursor: "pointer", fontFamily: "inherit" }}>Annulla</button>
                <button onClick={handleReport} disabled={!reportReason || reportLoading} style={{ flex: 2, padding: "10px", border: "none", borderRadius: 8, background: "#1a7a6e", color: "#fff", fontWeight: 700, cursor: reportReason ? "pointer" : "not-allowed", opacity: reportReason ? 1 : 0.5, fontFamily: "inherit" }}>
                  {reportLoading ? "Invio..." : "Invia segnalazione"}
                </button>
              </div>
            </div>
          )}
          {reportSent && (
            <div style={{ background: "#e8f5f2", border: "1px solid #b8e0d8", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#1a7a6e", fontWeight: 700, textAlign: "center" }}>
              ✅ Segnalazione inviata. Grazie per averci aiutato a mantenere Waglo sicuro.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AnimalScrollRow = ({ items, selected, onSelect }) => {
  const ref = useRef(null);
  const scroll = (dir) => { if (ref.current) ref.current.scrollLeft += dir * 120; };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <button onClick={() => scroll(-1)} style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: "#1a7a6e", padding: "0 4px", fontSize: 18 }}>‹</button>
      <div ref={ref} style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", padding: "4px 0", flex: 1, scrollBehavior: "smooth" }}>
        {items.map(({ id, label, Icon }) => {
          const active = selected === id;
          return (
            <button key={id} onClick={() => onSelect(id)} style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 12px", borderRadius: 14, border: `2px solid ${active ? "#1a7a6e" : "#dde8e6"}`, background: active ? "#1a7a6e" : "#fff", color: active ? "#fff" : "#555", fontWeight: 700, fontSize: 11, cursor: "pointer", transition: "all .2s", fontFamily: "inherit", minWidth: 60 }}>
              <Icon size={22} strokeWidth={1.8} color={active ? "#fff" : "#555"} />
              {label}
            </button>
          );
        })}
      </div>
      <button onClick={() => scroll(1)} style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: "#1a7a6e", padding: "0 4px", fontSize: 18 }}>›</button>
    </div>
  );
};

const ProductScrollRow = ({ items, selected, onSelect }) => {
  const ref = useRef(null);
  const scroll = (dir) => { if (ref.current) ref.current.scrollLeft += dir * 120; };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <button onClick={() => scroll(-1)} style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: "#e05a1e", padding: "0 4px", fontSize: 18 }}>‹</button>
      <div ref={ref} style={{ display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none", padding: "4px 0", flex: 1, scrollBehavior: "smooth" }}>
        {items.map(({ id, label, Icon }) => {
          const active = selected === id;
          return (
            <button key={id} onClick={() => onSelect(id)} style={{ flexShrink: 0, display: "flex", flexDirection: "row", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 20, border: `1.5px solid ${active ? "#e05a1e" : "#dde8e6"}`, background: active ? "#e05a1e" : "#fff", color: active ? "#fff" : "#666", fontWeight: 600, fontSize: 11, cursor: "pointer", transition: "all .2s", fontFamily: "inherit", whiteSpace: "nowrap" }}>
              <Icon size={14} strokeWidth={2} color={active ? "#fff" : "#666"} />
              {label}
            </button>
          );
        })}
      </div>
      <button onClick={() => scroll(1)} style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer", color: "#e05a1e", padding: "0 4px", fontSize: 18 }}>›</button>
    </div>
  );
};
export default function Home({ session, onShowAuth, onContact }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animalCat, setAnimalCat] = useState("all");
  const [productCat, setProductCat] = useState("all");
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
    const matchAnimal = animalCat === "all" || ad.animal_type === animalCat;
    const matchProduct = productCat === "all" || ad.category === productCat;
    const matchSearch = !search.trim() || ad.title.toLowerCase().includes(search.trim().toLowerCase()) || ad.city.toLowerCase().includes(search.trim().toLowerCase());
    return matchAnimal && matchProduct && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7f6", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap'); div::-webkit-scrollbar{display:none}`}</style>

      <div style={{ padding: "14px 20px", background: "#1a7a6e", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px #1a7a6e40", overflow: "hidden", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0, position: "relative" }}>
          <img src="/waglo_definitivo.svg" alt="Waglo" style={{ height: 48, borderRadius: "50%" }} />
          <img src="/waglo_header.svg" alt="Waglo · tails & deals" style={{ height: 88, width: "auto" }} />
        </div>
        {!session && (
          <button onClick={onShowAuth} style={{ position: "absolute", top: 10, right: 16, background: "#fff", color: "#1a7a6e", border: "none", borderRadius: 10, padding: "5px 10px", fontWeight: 800, fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Accedi</button>
        )}
      </div>

      <div style={{ padding: "14px 16px 8px" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
            <IconRicerca size={18} color="#aaa" />
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cerca usato per animali..." style={{ width: "100%", padding: "12px 16px 12px 42px", borderRadius: 12, border: "1.5px solid #dde8e6", background: "#fff", color: "#0f3d38", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none" }} />
        </div>
      </div>

      <div style={{ padding: "0 8px 4px" }}>
        <div style={{ padding: "0 8px 6px", fontSize: 10, fontWeight: 800, color: "#1a7a6e", textTransform: "uppercase", letterSpacing: 1 }}>Animale</div>
        <AnimalScrollRow items={ANIMAL_CATEGORIES} selected={animalCat} onSelect={setAnimalCat} />
      </div>

      <div style={{ padding: "6px 8px 10px", borderBottom: "1px solid #e8f0ee" }}>
        <div style={{ padding: "0 8px 6px", fontSize: 10, fontWeight: 800, color: "#e05a1e", textTransform: "uppercase", letterSpacing: 1 }}>Categoria</div>
        <ProductScrollRow items={PRODUCT_CATEGORIES} selected={productCat} onSelect={setProductCat} />
      </div>

      <div style={{ padding: "12px 16px 100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {loading ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#888" }}>Caricamento...</div>
        ) : filtered.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#888" }}>
            <div style={{ marginBottom: 12 }}><IconRicerca size={48} color="#888" /></div>
            <p>Nessun annuncio trovato.</p>
          </div>
        ) : filtered.map(ad => <ProductCard key={ad.id} ad={ad} onOpen={setSelectedAd} />)}
      </div>

    {selectedAd && <ProductModal ad={selectedAd} onClose={() => setSelectedAd(null)} session={session} onContact={onContact} />}
    </div>
  );
}
