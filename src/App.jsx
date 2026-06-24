import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import NewAd from "./components/NewAd";
import { IconHome, IconSalvati, IconPubblica, IconChat, IconProfilo, IconChatVuota, IconAltri } from "./components/WagloIcons";

const NAV = [
  { id: "home", Icon: IconHome, label: "Home" },
  { id: "favorites", Icon: IconSalvati, label: "Salvati" },
  { id: "chat", Icon: IconChat, label: "Chat" },
  { id: "profile", Icon: IconProfilo, label: "Profilo" },
];

const CookieBanner = ({ onAccept }) => (
  <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#0f3d38", color: "#fff", padding: "16px 20px", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, fontFamily: "'Nunito', sans-serif", boxShadow: "0 -4px 20px #00000033" }}>
    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>Waglo utilizza esclusivamente cookie tecnici necessari al funzionamento dell'app. Nessun cookie di profilazione.</p>
    <button onClick={onAccept} style={{ flexShrink: 0, background: "#1a7a6e", color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", fontWeight: 800, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>OK</button>
  </div>
);export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [showNewAd, setShowNewAd] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [inConversation, setInConversation] = useState(false);
const [activeConversationId, setActiveConversationId] = useState(null);
const [showSplash, setShowSplash] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => setShowSplash(false), 2500);
  return () => clearTimeout(timer);
}, []);
  const [activeTab, setActiveTab] = useState("home");const [cookieAccepted, setCookieAccepted] = useState(() => localStorage.getItem("waglo_cookie") === "true");

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

  const handleSell = () => { if (!session) { setShowAuth(true); return; } setShowNewAd(true); };const handleCookieAccept = () => { localStorage.setItem("waglo_cookie", "true"); setCookieAccepted(true); };
  const handleContact = async (sellerId, adId) => {
  if (!session) {
    setShowAuth(true);
    return;
  }

  const buyerId = session.user.id;

  // Cerca conversazione esistente
  const { data: existing } = await supabase
    .from("waglo_conversations")
    .select("id")
    .eq("ad_id", adId)
    .eq("buyer_id", buyerId)
    .maybeSingle();

  if (existing) {
    setActiveConversationId(existing.id);
    setActiveTab("chat");
    return;
  }

  // Crea nuova conversazione
  const { data: newConv, error } = await supabase
    .from("waglo_conversations")
    .insert({ ad_id: adId, buyer_id: buyerId, seller_id: sellerId })
    .select("id")
    .maybeSingle();

 if (!error) {
    setActiveConversationId(newConv.id);
    setActiveTab("chat");
  } 
  
};

if (loading) return <div style={{ minHeight: "100vh", background: "#f5f7f6", display: "flex", alignItems: "center", justifyContent: "center" }}><IconAltri size={64} color="#1a7a6e" /></div>;
  if (showAuth) return <Auth onAuth={() => setShowAuth(false)} />;
  if (showNewAd) return <NewAd session={session} onBack={() => setShowNewAd(false)} onPublished={() => { setShowNewAd(false); setActiveTab("home"); }} />;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: "#f5f7f6", position: "relative", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>
      {showSplash && (
  <div style={{
    position: "fixed", inset: 0, background: "#0A6A64", zIndex: 99999,
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "opacity 0.6s ease",
    opacity: showSplash ? 1 : 0,
  }}>
    <img src="/waglo_definitivo.svg" alt="Waglo" style={{ width: 160, height: 160, borderRadius: "50%" }} />
  </div>
)}

    {activeTab === "home" && <Home session={session} onShowAuth={() => setShowAuth(true)} onContact={handleContact} />}
      {activeTab === "favorites" && session && <Favorites session={session} onContact={handleContact} />}
    {activeTab === "chat" && session && <Chat session={session} activeConversationId={activeConversationId} onInConversation={setInConversation} onClearConversation={() => setActiveConversationId(null)} />}
        
          
      {activeTab === "profile" && session && <Profile session={session} onLogout={handleLogout} />}

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#fff", borderTop: "1px solid #e8f0ee", display: inConversation ? "none" : "flex", zIndex: 200, boxShadow: "0 -4px 20px #1a7a6e12", alignItems: "center" }}>
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
    {!cookieAccepted && <CookieBanner onAccept={handleCookieAccept} />}
    </div>
  );
}
