import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ChatConversation from "./ChatConversation";
import { IconChatVuota } from "./WagloIcons";

export default function Chat({ session, activeConversationId, onInConversation, onClearConversation }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeConv, setActiveConv] = useState(null);

  useEffect(() => { fetchConversations(); }, []);

  useEffect(() => {
    if (activeConversationId && conversations.length > 0) {
      const conv = conversations.find(c => c.id === activeConversationId);
      if (conv) setActiveConv(conv); onInConversation(true);
    }
  }, [activeConversationId, conversations]);

  const fetchConversations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("waglo_conversations")
      .select("*, ads(title, ad_images(*)), buyer_profile:buyer_id(display_name), seller_profile:seller_id(display_name)")
      .or(`buyer_id.eq.${session.user.id},seller_id.eq.${session.user.id}`)
      .order("created_at", { ascending: false });
    if (!error) setConversations(data || []);
    setLoading(false);
  };

  if (activeConv) {
    return <ChatConversation session={session} conversation={activeConv} onBack={() => { setActiveConv(null); fetchConversations(); onInConversation(false); onClearConversation(); }} />;
  }

  const getOtherName = (conv) => {
    if (conv.buyer_id === session.user.id) return conv.seller_profile?.display_name || "Utente";
    return conv.buyer_profile?.display_name || "Utente";
  };

  return (
    <div style={{ paddingBottom: 80, fontFamily: "'Nunito', sans-serif", background: "#f5f7f6", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>
      <div style={{ padding: "16px 20px", background: "#1a7a6e", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ fontWeight: 900, fontSize: 20, color: "#fff" }}>Chat</div>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>Caricamento...</div>
      ) : conversations.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
          <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}><IconChatVuota size={48} color="#1a7a6e" /></div>
          <p>Nessuna conversazione ancora.<br/>Contatta un venditore per iniziare.</p>
        </div>
      ) : (
        <div style={{ padding: "12px 16px" }}>
          {conversations.map(conv => (
            <div key={conv.id} onClick={() => { setActiveConv(conv); onInConversation(true); }} style={{ background: "#fff", borderRadius: 14, marginBottom: 12, padding: "14px 16px", border: "1px solid #e8f0ee", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
              <img src="/waglo_definitivo.svg" alt="Waglo" style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, color: "#0f3d38", fontSize: 14 }}>{getOtherName(conv)}</div>
                <div style={{ fontSize: 12, color: "#888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{conv.ads?.title || "Annuncio"}</div>
              </div>
              <span style={{ color: "#1a7a6e", fontSize: 18 }}>›</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
