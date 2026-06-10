import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import Profile from "./components/Profile";
import NewAd from "./components/NewAd";
import { IconHome, IconSalvati, IconPubblica, IconChat, IconProfilo, IconChatVuota, IconAltri } from "./components/WagloIcons";

const NAV = [
  { id: "home", Icon: IconHome, label: "Home" },
  { id: "favorites", Icon: IconSalvati, label: "Salvati" },
  { id: "chat", Icon: IconChat, label: "Chat" },
  { id: "profile", Icon: IconProfilo, label: "Profilo" },
];

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showNewAd, setShowNewAd] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setSession(session); if (session) setShowAuth(false); });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => { await supabase.auth.signOut(); setSession(null); setActiveTab("home"); };

  const handleTabChange = (tab) => {
    if ((tab === "favorites" || tab === "chat" || tab === "profile") && !session) { setShowAuth(true); return; }
    setActiveTab(tab);
  };

  const handleSell = () => { if (!session) { setShowAuth(true); return; } setShowNewAd(true); };

if (loading) return <div style={{ minHeight: "100vh", background: "#f5f7f6", display: "flex", alignItems: "center", justifyContent: "center" }}><IconAltri size={64} color="#1a7a6e" /></div>;
  if (showAuth) return <Auth onAuth={() => setShowAuth(false)} />;
  if (showNewAd) return <NewAd session={session} onBack={() => setShowNewAd(false)} onPublished={() => { setShowNewAd(false); setActiveTab("home"); }} />;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: "#f5f7f6", position: "relative", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>

      {activeTab === "home" && <Home session={session} onShowAuth={() => setShowAuth(true)} />}
      {activeTab === "favorites" && session && <Favorites session={session} />}
      {activeTab === "chat" && session && (
        <div style={{ padding: 20, color: "#888", textAlign: "center", paddingTop: 100, fontFamily: "inherit" }}>
        <div style={{ marginBottom: 12 }}><IconChatVuota size={48} color="#888" /></div>
          <p>Chat in arrivo nel prossimo aggiornamento</p>
        </div>
      )}
      {activeTab === "profile" && session && <Profile session={session} onLogout={handleLogout} />}

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#fff", borderTop: "1px solid #e8f0ee", display: "flex", zIndex: 200, boxShadow: "0 -4px 20px #1a7a6e12", alignItems: "center" }}>
        {NAV.slice(0, 2).map(({ id, Icon, label }) => (
          <button key={id} onClick={() => handleTabChange(id)} style={{ flex: 1, background: "none", border: "none", padding: "10px 0", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: activeTab === id ? "#1a7a6e" : "#aaa", transition: "color .2s", fontFamily: "inherit" }}>
            <Icon />
            <span style={{ fontSize: 10, fontWeight: 700 }}>{label}</span>
          </button>
        ))}
        <button onClick={handleSell} style={{ width: 56, height: 56, borderRadius: "50%", background: "#1a7a6e", border: "none", color: "#fff", cursor: "pointer", marginBottom: 10, boxShadow: "0 4px 16px #1a7a6e50", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <IconPubblica />
        </button>
        {NAV.slice(2).map(({ id, Icon, label }) => (
          <button key={id} onClick={() => handleTabChange(id)} style={{ flex: 1, background: "none", border: "none", padding: "10px 0", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: activeTab === id ? "#1a7a6e" : "#aaa", transition: "color .2s", fontFamily: "inherit" }}>
            <Icon />
            <span style={{ fontSize: 10, fontWeight: 700 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
