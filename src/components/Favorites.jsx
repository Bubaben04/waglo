import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Favorites({ session }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchFavorites(); }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("favorites").select("*, ads(*, ad_images(*), user_profiles(display_name))").eq("user_id", session.user.id).order("created_at", { ascending: false });
    if (!error) setFavorites(data || []);
    setLoading(false);
  };

  const removeFavorite = async (favoriteId) => {
    await supabase.from("favorites").delete().eq("id", favoriteId);
    setFavorites(prev => prev.filter(f => f.id !== favoriteId));
  };

  return (
    <div style={{ paddingBottom: 80, fontFamily: "'Nunito', sans-serif", background: "#f5f7f6", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>
      <div style={{ padding: "16px 20px", background: "#1a7a6e", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ fontWeight: 900, fontSize: 20, color: "#fff" }}>❤️ Salvati</div>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>Caricamento...</div>
      ) : favorites.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🤍</div>
          <p>Non hai ancora salvato nessun annuncio.</p>
        </div>
      ) : (
        <div style={{ padding: "16px" }}>
          {favorites.map(fav => {
            const ad = fav.ads;
            if (!ad) return null;
            return (
              <div key={fav.id} style={{ background: "#fff", borderRadius: 14, marginBottom: 12, display: "flex", alignItems: "center", gap: 14, padding: 12, border: "1px solid #e8f0ee" }}>
                <div style={{ width: 60, height: 60, borderRadius: 10, background: "#f0f4f3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, overflow: "hidden", flexShrink: 0 }}>
                  {ad.ad_images?.[0]?.image_url ? <img src={ad.ad_images[0].image_url} alt={ad.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "🐾"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: "#0f3d38", fontSize: 14 }}>{ad.title}</div>
                  <div style={{ color: "#e05a1e", fontWeight: 800, fontSize: 15 }}>€{ad.price}</div>
                  <div style={{ color: "#888", fontSize: 12 }}>📍 {ad.city}</div>
                </div>
                <button onClick={() => removeFavorite(fav.id)} style={{ background: "none", border: "none", color: "#e05a1e", fontSize: 20, cursor: "pointer", padding: 4 }}>🗑</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
