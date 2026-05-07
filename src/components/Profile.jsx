import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Profile({ session, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchMyAds();
  }, []);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();
    setProfile(data);
  };

  const fetchMyAds = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("ads")
      .select("*, ad_images(*)")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });
    setMyAds(data || []);
    setLoading(false);
  };

  const markAsSold = async (adId) => {
    await supabase.from("ads").update({ status: "sold" }).eq("id", adId);
    setMyAds(prev => prev.map(a => a.id === adId ? { ...a, status: "sold" } : a));
  };

  const deleteAd = async (adId) => {
    await supabase.from("ads").delete().eq("id", adId);
    setMyAds(prev => prev.filter(a => a.id !== adId));
  };

  return (
    <div style={{ paddingBottom: 80, fontFamily: "sans-serif" }}>
      {/* Header */}
      <div style={{
        padding: "18px 20px 14px", background: "#1a1205",
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ fontWeight: 900, fontSize: 20, color: "#e8c547" }}>👤 Profilo</div>
        <button onClick={onLogout} style={{
          background: "transparent", color: "#e8c547",
          border: "1px solid #e8c547", borderRadius: 10,
          padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer",
        }}>Esci</button>
      </div>

      {/* Info profilo */}
      <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", background: "#e8c547",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 24, color: "#1a1205",
        }}>
          {(profile?.display_name || session.user.email)[0].toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: 700, color: "#fff", fontSize: 18 }}>
            {profile?.display_name || "Utente"}
          </div>
          <div style={{ color: "#666", fontSize: 13 }}>{session.user.email}</div>
          <div style={{ color: "#666", fontSize: 12, marginTop: 2 }}>
            {profile?.user_type === "professional" ? "🏪 Commerciante" : "👤 Privato"} · 📍 {profile?.city}
          </div>
        </div>
      </div>

      {/* I miei annunci */}
      <div style={{ padding: "0 16px" }}>
        <div style={{ fontWeight: 700, color: "#fff", fontSize: 16, marginBottom: 12 }}>
          I miei annunci ({myAds.length})
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#666" }}>Caricamento...</div>
        ) : myAds.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#666" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
            <p>Non hai ancora pubblicato annunci.</p>
          </div>
        ) : (
          myAds.map(ad => (
            <div key={ad.id} style={{
              background: "#1a1a1a", borderRadius: 14, marginBottom: 12,
              display: "flex", alignItems: "center", gap: 12, padding: 12,
              border: "1px solid #2a2a2a",
              opacity: ad.status === "sold" ? 0.5 : 1,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 10, background: "#111",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, overflow: "hidden", flexShrink: 0,
              }}>
                {ad.ad_images?.[0]?.image_url ? (
                  <img src={ad.ad_images[0].image_url} alt={ad.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : "🐾"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 13 }}>{ad.title}</div>
                <div style={{ color: "#e8c547", fontWeight: 800 }}>€{ad.price}</div>
                {ad.status === "sold" && (
                  <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>✓ Venduto</span>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {ad.status !== "sold" && (
                  <button onClick={() => markAsSold(ad.id)} style={{
                    background: "#10b98122", color: "#10b981",
                    border: "1px solid #10b98144", borderRadius: 8,
                    padding: "4px 8px", cursor: "pointer", fontSize: 11, fontWeight: 700,
                  }}>Venduto</button>
                )}
                <button onClick={() => deleteAd(ad.id)} style={{
                  background: "#ef444422", color: "#ef4444",
                  border: "1px solid #ef444444", borderRadius: 8,
                  padding: "4px 8px", cursor: "pointer", fontSize: 11, fontWeight: 700,
                }}>Elimina</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
