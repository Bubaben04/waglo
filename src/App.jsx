import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import Profile from "./components/Profile";
import NewAd from "./components/NewAd";

const NAV_ITEMS = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "favorites", icon: "❤️", label: "Salvati" },
  { id: "chat", icon: "💬", label: "Chat" },
  { id: "profile", icon: "👤", label: "Profilo" },
];

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showNewAd, setShowNewAd] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setShowAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setActiveTab("home");
  };

  const handleTabChange = (tab) => {
    if ((tab === "favorites" || tab === "chat" || tab === "profile") && !session) {
      setShowAuth(true);
      return;
    }
    setActiveTab(tab);
  };

  const handleSell = () => {
    if (!session) {
      setShowAuth(true);
      return;
    }
    setShowNewAd(true);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0f0f0f",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#e8c547", fontSize: 48,
      }}>
        🐾
      </div>
    );
  }

  if (showAuth) {
    return <Auth onAuth={() => setShowAuth(false)} />;
  }

  if (showNewAd) {
    return (
      <NewAd
        session={session}
        onBack={() => setShowNewAd(false)}
        onPublished={() => {
          setShowNewAd(false);
          setActiveTab("home");
        }}
      />
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: "#0f0f0f", position: "relative" }}>

      {/* Contenuto principale */}
      {activeTab === "home" && (
        <Home session={session} onShowAuth={() => setShowAuth(true)} />
      )}
      {activeTab === "favorites" && session && (
        <Favorites session={session} />
      )}
      {activeTab === "chat" && session && (
        <div style={{ padding: 20, color: "#666", textAlign: "center", paddingTop: 100 }}>
          <div style={{ fontSize: 48 }}>💬</div>
          <p style={{ marginTop: 12 }}>Chat in arrivo nel prossimo aggiornamento</p>
        </div>
      )}
      {activeTab === "profile" && session && (
        <Profile session={session} onLogout={handleLogout} />
      )}

      {/* Bottom Navigation */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 480, background: "#1a1205",
        borderTop: "1px solid #2a2a0a", display: "flex", zIndex: 200,
        boxShadow: "0 -4px 20px #00000040", alignItems: "center",
      }}>
        {NAV_ITEMS.slice(0, 2).map(t => (
          <button key={t.id} onClick={() => handleTabChange(t.id)} style={{
            flex: 1, background: "none", border: "none",
            padding: "10px 0", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            color: activeTab === t.id ? "#e8c547" : "#666",
            transition: "color .2s",
          }}>
            <span style={{ fontSize: 22 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "sans-serif" }}>{t.label}</span>
          </button>
        ))}

        {/* Pulsante centrale + Vendi */}
        <button onClick={handleSell} style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "#e8c547", border: "none",
          color: "#1a1205", fontSize: 28, fontWeight: 900,
          cursor: "pointer", marginBottom: 10,
          boxShadow: "0 4px 16px #e8c54760",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>+</button>

        {NAV_ITEMS.slice(2).map(t => (
          <button key={t.id} onClick={() => handleTabChange(t.id)} style={{
            flex: 1, background: "none", border: "none",
            padding: "10px 0", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            color: activeTab === t.id ? "#e8c547" : "#666",
            transition: "color .2s",
          }}>
            <span style={{ fontSize: 22 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "sans-serif" }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
