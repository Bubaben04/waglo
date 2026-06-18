import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";

export default function ChatConversation({ session, conversation, onBack }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    const channel = supabase
      .channel("waglo_messages_" + conversation.id)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "waglo_messages",
        filter: `conversation_id=eq.${conversation.id}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [conversation.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("waglo_messages")
      .select("*")
      .eq("conversation_id", conversation.id)
      .order("created_at", { ascending: true });
    if (!error) setMessages(data || []);
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || sending) return;
    setSending(true);
    const content = newMessage.trim();
    setNewMessage("");
    await supabase.from("waglo_messages").insert({
      conversation_id: conversation.id,
      sender_id: session.user.id,
      content
    });
    setSending(false);
  };

  const getOtherName = () => {
    if (conversation.buyer_id === session.user.id) return conversation.seller_profile?.display_name || "Utente";
    return conversation.buyer_profile?.display_name || "Utente";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Nunito', sans-serif", background: "#f5f7f6" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>

      {/* Header */}
      <div style={{ padding: "14px 20px", background: "#1a7a6e", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#fff", fontSize: 24, cursor: "pointer", padding: 0, lineHeight: 1 }}>‹</button>
        <div>
          <div style={{ fontWeight: 900, fontSize: 16, color: "#fff" }}>{getOtherName()}</div>
          <div style={{ fontSize: 11, color: "#ffffff99" }}>{conversation.ads?.title || "Annuncio"}</div>
        </div>
      </div>

      {/* Messaggi */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 80 }}>
        {loading ? (
          <div style={{ textAlign: "center", color: "#888", paddingTop: 40 }}>Caricamento...</div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", paddingTop: 40, fontSize: 14 }}>Inizia la conversazione!</div>
        ) : messages.map(msg => {
          const isMe = msg.sender_id === session.user.id;
          return (
            <div key={msg.id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "75%", padding: "10px 14px", borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: isMe ? "#1a7a6e" : "#fff", color: isMe ? "#fff" : "#0f3d38", fontSize: 14, lineHeight: 1.5, boxShadow: "0 2px 8px #00000010" }}>
                {msg.content}
                <div style={{ fontSize: 10, color: isMe ? "#ffffff88" : "#aaa", marginTop: 4, textAlign: "right" }}>
                  {new Date(msg.created_at).toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#fff", borderTop: "1px solid #e8f0ee", padding: "12px 16px", display: "flex", gap: 10, alignItems: "center", boxSizing: "border-box", zIndex: 300 }}>
        <input
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Scrivi un messaggio..."
          style={{ flex: 1, padding: "10px 14px", borderRadius: 20, border: "1.5px solid #dde8e6", fontSize: 14, fontFamily: "inherit", outline: "none", background: "#f5f7f6" }}
        />
        <button onClick={sendMessage} disabled={!newMessage.trim() || sending} style={{ width: 42, height: 42, borderRadius: "50%", background: newMessage.trim() ? "#1a7a6e" : "#dde8e6", border: "none", color: "#fff", cursor: newMessage.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>
          ›
        </button>
      </div>
    </div>
  );
}
