import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import Profile from "./components/Profile";
import NewAd from "./components/NewAd";

const IconHome = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:24,height:24}}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconHeart = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:24,height:24}}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const IconMsg = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:24,height:24}}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>;
const IconUser = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:24,height:24}}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconPlus = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{width:28,height:28}}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;

const NAV = [
  { id: "home", Icon: IconHome, label: "Home" },
  { id: "favorites", Icon: IconHeart, label: "Salvati" },
  { id: "chat", Icon: IconMsg, label: "Chat" },
  { id: "profile", Icon: IconUser, label: "Profilo" },
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

  if (loading) return <div style={{ minHeight: "100vh", background: "#f5f7f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>🐾</div>;
  if (showAuth) return <Auth onAuth={() => setShowAuth(false)} />;
  if (showNewAd) return <NewAd session={session} onBack={() => setShowNewAd(false)} onPublished={() => { setShowNewAd(false); setActiveTab("home"); }} />;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: "#f5f7f6", position: "relative", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>

      {activeTab === "home" && <Home session={session} onShowAuth={() => setShowAuth(true)} />}
      {activeTab === "favorites" && session && <Favorites session={session} />}
      {activeTab === "chat" && session && (
        <div style={{ padding: 20, color: "#888", textAlign: "center", paddingTop: 100, fontFamily: "inherit" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💬</div>
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
        <button onClick={handleSell} style={{ width: 56, height: 56, borderRadius: "50%", background: "#e05a1e", border: "none", color: "#fff", cursor: "pointer", marginBottom: 10, boxShadow: "0 4px 16px #e05a1e50", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <IconPlus />
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
