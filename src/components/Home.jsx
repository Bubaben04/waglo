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
  nuovo: { label: "Nuovo", color: "#10b981" },
  ottimo: { label: "Ottimo", color: "#3b82f6" },
  buono: { label: "Buono", color: "#f59e0b" },
  accettabile: { label: "Accettabile", color: "#ef4444" },
  danneggiato: { label: "Danneggiato", color: "#7c3aed" },
  in_scadenza: { label: "In scadenza", color: "#f97316" },
  scaduto: { label: "Scaduto", color: "#6b7280" },
};

const Badge = ({ condition }) => {
  const c = CONDITIONS[condition] || { label: condition, color: "#888" };
  return (
    <span style={{
      background: c.color + "22",
      color: c.color,
      border: `1px solid ${c.color}44`,
      borderRadius: 6,
      padding: "2px 8px",
      fontSize: 11,
      fontWeight: 700,
    }}>{c.label}</span>
  );
};

const ProductCard = ({ ad, onOpen }) => {
  const [hover, setHover] = useState(false);
  const imageUrl = ad.ad_images?.[0]?.image_url;

  return (
    <div
      onClick={() => onOpen(ad)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "#1a1a1a",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        border: "1.5px solid #2a2a2a",
        boxShadow: hover ? "0 12px 40px #00000040" : "0 2px 8px #00000020",
        transform: hover ? "translateY(-4px)" : "none",
        transition: "all .22s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{
        background: "#111",
        height: 140,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 56,
        overflow: "hidden",
      }}>
        {imageUrl ? (
          <img src={imageUrl} alt={ad.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          CATEGORIES.find(c => c.id === ad.animal_type)?.emoji || "🐾"
        )}
      </div>
      <div style={{ padding: "12px 12px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#fff", lineHeight: 1.3 }}>{ad.title}</span>
          <span style={{ fontWeight: 900, fontSize: 16, color: "#e8c547", whiteSpace: "nowrap" }}>€{ad.price}</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
          <Badge condition={ad.condition} />
          <span style={{ fontSize: 11, color: "#666" }}>📍 {ad.city}</span>
        </div>
        <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>
          {ad.user_profiles?.display_name || "Utente"}
        </div>
      </div>
    </div>
  );
};

const ProductModal = ({ ad, onClose, session, onContact }) => {
  if (!ad) return null;
  const imageUrl = ad.ad_images?.[0]?.image_url;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "#000a",
      zIndex: 1000, display: "flex", alignItems: "center",
      justifyContent: "center", padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1a1a1a", borderRadius: 24, maxWidth: 500,
        width: "100%", maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 24px 80px #000a", border: "1px solid #2a2a2a",
      }}>
        <div style={{
          background: "#111", height: 200,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 96, position: "relative", borderRadius: "24px 24px 0 0",
          overflow: "hidden",
        }}>
          {imageUrl ? (
            <img src={imageUrl} alt={ad.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            CATEGORIES.find(c => c.id === ad.animal_type)?.emoji || "🐾"
          )}
          <button onClick={onClose} style={{
            position: "absolute", top: 14, right: 14,
            background: "#1a1a1a", border: "none", borderRadius: "50%",
            width: 36, height: 36, cursor: "pointer", fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", boxShadow: "0 2px 8px #0004",
          }}>✕</button>
        </div>
        <div style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <h2 style={{ fontSize: 20, margin: 0, color: "#fff", fontWeight: 700 }}>{ad.title}</h2>
            <span style={{ fontWeight: 900, fontSize: 24, color: "#e8c547" }}>€{ad.price}</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Badge condition={ad.condition} />
            <span style={{ fontSize: 12, color: "#666", background: "#111", borderRadius: 6, padding: "2px 8px" }}>
              {CATEGORIES.find(c => c.id === ad.animal_type)?.emoji} {CATEGORIES.find(c => c.id === ad.animal_type)?.label}
            </span>
            <span style={{ fontSize: 12, color: "#666", background: "#111", borderRadius: 6, padding: "2px 8px" }}>
              📍 {ad.city}
            </span>
          </div>
          <p style={{ margin: 0, color: "#aaa", lineHeight: 1.7, fontSize: 14 }}>{ad.description}</p>
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "14px 0", borderTop: "1px solid #2a2a2a", borderBottom: "1px solid #2a2a2a",
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%", background: "#e8c547",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: 16, color: "#1a1205",
            }}>
              {(ad.user_profiles?.display_name || "U")[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#fff" }}>{ad.user_profiles?.display_name || "Utente"}</div>
              <div style={{ fontSize: 12, color: "#666" }}>Venditore</div>
            </div>
          </div>
          {session ? (
            <button onClick={() => onContact(ad)} style={{
              padding: "14px", border: "none", borderRadius: 12,
              background: "#e8c547", color: "#1a1205", fontWeight: 800,
              fontSize: 15, cursor: "pointer",
            }}>
              💬 Contatta venditore
            </button>
          ) : (
            <div style={{
              padding: "14px", borderRadius: 12, background: "#111",
              color: "#666", fontSize: 14, textAlign: "center",
              border: "1px solid #2a2a2a",
            }}>
              <a href="#" style={{ color: "#e8c547", textDecoration: "none", fontWeight: 700 }}>
                Accedi
              </a> per contattare il venditore
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home({ session, onLogout }) {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedAd, setSelectedAd] = useState(null);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("ads")
      .select(`*, ad_images(*), user_profiles(display_name)`)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (!error) setAds(data || []);
    setLoading(false);
  };

  const filtered = ads.filter(ad => {
    const matchCat = category === "all" || ad.animal_type === category;
    const matchSearch = !search ||
      ad.title.toLowerCase().includes(search.toLowerCase()) ||
      ad.city.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;700;800&display=swap');`}</style>

      {/* Header */}
      <div style={{
        padding: "16px 20px", background: "#1a1205",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 900,
          fontSize: 24, color: "#e8c547",
        }}>🐾 Waglo</div>
        <div style={{ display: "flex", gap: 10 }}>
          {session ? (
            <button onClick={onLogout} style={{
              background: "transparent", color: "#e8c547",
              border: "1px solid #e8c547", borderRadius: 10,
              padding: "7px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer",
            }}>Esci</button>
          ) : null}
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "16px 16px 0" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Cerca prodotti per animali..."
          style={{
            width: "100%", padding: "12px 16px", borderRadius: 12,
            border: "1.5px solid #2a2a2a", background: "#1a1a1a",
            color: "#fff", fontSize: 14, fontFamily: "inherit",
            boxSizing: "border-box", outline: "none",
          }}
        />
      </div>

      {/* Categorie */}
      <div style={{
        display: "flex", gap: 8, padding: "12px 16px",
        overflowX: "auto", scrollbarWidth: "none",
      }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCategory(c.id)} style={{
            flexShrink: 0, padding: "7px 14px", borderRadius: 20,
            border: category === c.id ? "2px solid #e8c547" : "2px solid #2a2a2a",
            background: category === c.id ? "#e8c547" : "#1a1a1a",
            color: category === c.id ? "#1a1205" : "#888",
            fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all .2s",
          }}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Griglia annunci */}
      <div style={{ padding: "0 16px 100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {loading ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#666" }}>
            Caricamento...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "#666" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p>Nessun annuncio trovato.</p>
          </div>
        ) : (
          filtered.map(ad => (
            <ProductCard key={ad.id} ad={ad} onOpen={setSelectedAd} />
          ))
        )}
      </div>

      {/* Modale */}
      {selectedAd && (
        <ProductModal
          ad={selectedAd}
          onClose={() => setSelectedAd(null)}
          session={session}
          onContact={(ad) => {
            setSelectedAd(null);
            alert("Chat in arrivo nel prossimo aggiornamento!");
          }}
        />
      )}
    </div>
  );
}
