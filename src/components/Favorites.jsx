import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { IconCuore, IconAlimenti, IconAccessori, IconIntegratori, IconIgiene, IconAntiparassitari, IconAltro, IconLuogo, IconContatta, IconCestino } from "./WagloIcons";

const getCategoryIcon = (category) => {
  const icons = { alimenti: IconAlimenti, accessori: IconAccessori, integratori: IconIntegratori, igiene: IconIgiene, antiparassitari: IconAntiparassitari };
  return icons[category] || IconAltro;
};

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

const AdModal = ({ ad, onClose, session, onContact }) => {
  if (!ad) return null;
  const imageUrl = ad.ad_images?.[0]?.image_url;
  const Icon = getCategoryIcon(ad.category);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#0007", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, maxWidth: 500, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 80px #0004" }}>
        <div style={{ background: "#f0f4f3", height: 200, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderRadius: "24px 24px 0 0", overflow: "hidden", color: "#1a7a6e" }}>
          {imageUrl ? <img src={imageUrl} alt={ad.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Icon size={80} strokeWidth={1.5} color="#1a7a6e" />}
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", color: "#333", boxShadow: "0 2px 8px #0002" }}>✕</button>
        </div>
        <div style={{ padding: "24px 28px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <h2 style={{ fontSize: 20, margin: 0, color: "#0f3d38", fontWeight: 800 }}>{ad.title}</h2>
            <span style={{ fontWeight: 900, fontSize: 24, color: "#e05a1e" }}>€{ad.price}</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Badge condition={ad.condition} />
            <span style={{ fontSize: 12, color: "#888", background: "#f0f4f3", borderRadius: 6, padding: "2px 8px" }}><iconluogo size={12} style={{verticalalign:"middle", marginright:4}}/>{ad.city}</span>
            {ad.accepts_offers && <span style={{ fontSize: 12, color: "#1a7a6e", background: "#e8f5f2", borderRadius: 6, padding: "2px 8px", fontWeight: 700 }}>💬 Accetta offerte</span>}
          </div>
          <p style={{ margin: 0, color: "#555", lineHeight: 1.7, fontSize: 14 }}>{ad.description}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
            <img src="/waglo_definitivo.svg" alt="Waglo" style={{ width: 40, height: 40, borderRadius: "50%" }} />
            <div>
              <div style={{ fontWeight: 700, color: "#0f3d38" }}>{ad.user_profiles?.display_name || "Utente"}</div>
              <div style={{ fontSize: 12, color: "#888" }}>Venditore</div>
            </div>
          </div>
          {session && (
            <button onClick={() => onContact(ad.user_id, ad.id)} style={{ padding: "14px", border: "none", borderRadius: 12, background: "#e05a1e", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}><IconContatta size={18} style={{marginRight:6}}/> Contatta venditore</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Favorites({ session, onContact }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState(null);

  useEffect(() => { fetchFavorites(); }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("favorites").select("*, ads(*, ad_images(*), user_profiles(display_name))").eq("user_id", session.user.id).order("created_at", { ascending: false });
    if (!error) setFavorites(data || []);
    setLoading(false);
  };

  const removeFavorite = async (favoriteId, e) => {
    e.stopPropagation();
    await supabase.from("favorites").delete().eq("id", favoriteId);
    setFavorites(prev => prev.filter(f => f.id !== favoriteId));
  };

  return (
    <div style={{ paddingBottom: 80, fontFamily: "'Nunito', sans-serif", background: "#f5f7f6", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>
      <div style={{ padding: "16px 20px", background: "#1a7a6e", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ fontWeight: 900, fontSize: 20, color: "#fff" }}><IconCuore size={20} color="#fff" /> Salvati</div>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>Caricamento...</div>
      ) : favorites.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
          <div style={{ marginBottom: 12 }}><IconCuore size={48} color="#888" /></div>
          <p>Non hai ancora salvato nessun annuncio.</p>
        </div>
      ) : (
        <div style={{ padding: "16px" }}>
          {favorites.map(fav => {
            const ad = fav.ads;
            if (!ad) return null;
            const Icon = getCategoryIcon(ad.category);
            return (
              <div key={fav.id} onClick={() => setSelectedAd(ad)} style={{ background: "#fff", borderRadius: 14, marginBottom: 12, display: "flex", alignItems: "center", gap: 14, padding: 12, border: "1px solid #e8f0ee", cursor: "pointer" }}>
                <div style={{ width: 60, height: 60, borderRadius: 10, background: "#f0f4f3", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                  {ad.ad_images?.[0]?.image_url ? <img src={ad.ad_images[0].image_url} alt={ad.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Icon size={32} color="#1a7a6e" />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: "#0f3d38", fontSize: 14 }}>{ad.title}</div>
                  <div style={{ color: "#e05a1e", fontWeight: 800, fontSize: 15 }}>€{ad.price}</div>
                  <div style={{ color: "#888", fontSize: 12 }}><iconluogo size={12} style={{verticalalign:"middle", marginright:4}}/>{ad.city}</div>
                </div>
                <button onClick={(e) => removeFavorite(fav.id, e)} style={{ background: "none", border: "none", color: "#e05a1e", fontSize: 20, cursor: "pointer", padding: 4 }}><iconcestino size={20} /></button>
              </div>
            );
          })}
        </div>
      )}
      {selectedAd && <AdModal ad={selectedAd} onClose={() => setSelectedAd(null)} session={session} onContact={onContact} />}
    </div>
  );
}
