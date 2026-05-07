import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Favorites({ session }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("favorites")
      .select(`*, ads(*, ad_images(*), user_profiles(display_name))`)
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (!error) setFavorites(data || []);
    setLoading(false);
  };

  const removeFavorite = async (favoriteId) => {
    await supabase.from("favorites").delete().eq("id", favoriteId);
    setFavorites(prev => prev.filter(f => f.id !== favoriteId));
  };

  return (
    <div style={{ paddingBottom: 80, fontFamily: "sans-serif" }}>
      <div style={{
        padding: "18px 20px 14px", background: "#1a1205",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ fontWeight: 900, fontSize: 20, color: "#e8c547" }}>❤️ Salvati</div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#666" }}>Caricamento...</div>
      ) : favorites.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#666" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🤍</div>
          <p>Non hai ancora salvato nessun annuncio.</p>
        </div>
      ) : (
        <div style={{ padding: "16px" }}>
          {favorites.map(fav => {
            const ad = fav.ads;
            if (!ad) return null;
            return (
              <div key={fav.id} style={{
                background: "#1a1a1a", borderRadius: 14, marginBottom: 12,
                display: "flex", alignItems: "center", gap: 14, padding: 12,
                border: "1px solid #2a2a2a",
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 10, background: "#111",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32, overflow: "hidden", flexShrink: 0,
                }}>
                  {ad.ad_images?.[0]?.image_url ? (
                    <img src={ad.ad_images[0].image_url} alt={ad.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : "🐾"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>{ad.title}</div>
                  <div style={{ color: "#e8c547", fontWeight: 800, fontSize: 15 }}>€{ad.price}</div>
                  <div style={{ color: "#666", fontSize: 12 }}>📍 {ad.city}</div>
                </div>
                <button onClick={() => removeFavorite(fav.id)} style={{
                  background: "none", border: "none", color: "#ef4444",
                  fontSize: 20, cursor: "pointer", padding: 4,
                }}>🗑</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
