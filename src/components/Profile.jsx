import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { IconNoteLegali, IconTermini, IconPrivacy, IconCookie, IconDSA, IconVietati } from "./WagloIcons";
const LegalSection = ({ label, icon, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #f0f4f3" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "12px 16px", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "inherit" }}>
        <span style={{ fontWeight: 700, color: "#0f3d38", fontSize: 14 }}>{icon} {label}</span>
        <span style={{ color: "#888", fontSize: 16, transition: "transform .2s", display: "inline-block", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
      </button>
      {open && (
        <div style={{ padding: "0 16px 14px", fontSize: 13, color: "#555", lineHeight: 1.7 }}>
          {content}
        </div>
      )}
    </div>
  );
};

export default function Profile({ session, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [myAds, setMyAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProfile(); fetchMyAds(); }, []);

  const fetchProfile = async () => {
    const { data } = await supabase.from("user_profiles").select("*").eq("id", session.user.id).single();
    setProfile(data);
  };

  const fetchMyAds = async () => {
    setLoading(true);
    const { data } = await supabase.from("ads").select("*, ad_images(*)").eq("user_id", session.user.id).order("created_at", { ascending: false });
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
    <div style={{ paddingBottom: 80, fontFamily: "'Nunito', sans-serif", background: "#f5f7f6", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>
      <div style={{ padding: "16px 20px", background: "#1a7a6e", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ fontWeight: 900, fontSize: 20, color: "#fff" }}>👤 Profilo</div>
        <button onClick={onLogout} style={{ background: "transparent", color: "#fff", border: "1px solid #ffffff66", borderRadius: 10, padding: "6px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Esci</button>
      </div>
      <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", gap: 16, background: "#fff", borderBottom: "1px solid #e8f0ee" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#1a7a6e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24, color: "#fff" }}>
          {(profile?.display_name || session.user.email)[0].toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: 800, color: "#0f3d38", fontSize: 18 }}>{profile?.display_name || "Utente"}</div>
          <div style={{ color: "#888", fontSize: 13 }}>{session.user.email}</div>
          <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>{profile?.user_type === "professional" ? "🏪 Commerciante" : "👤 Privato"} · 📍 {profile?.city}</div>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        <div style={{ fontWeight: 800, color: "#0f3d38", fontSize: 16, marginBottom: 12 }}>I miei annunci ({myAds.length})</div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#888" }}>Caricamento...</div>
        ) : myAds.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#888" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
            <p>Non hai ancora pubblicato annunci.</p>
          </div>
        ) : myAds.map(ad => (
          <div key={ad.id} style={{ background: "#fff", borderRadius: 14, marginBottom: 12, display: "flex", alignItems: "center", gap: 12, padding: 12, border: "1px solid #e8f0ee", opacity: ad.status === "sold" ? 0.6 : 1 }}>
            <div style={{ width: 56, height: 56, borderRadius: 10, background: "#f0f4f3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, overflow: "hidden", flexShrink: 0 }}>
              {ad.ad_images?.[0]?.image_url ? <img src={ad.ad_images[0].image_url} alt={ad.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "🐾"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, color: "#0f3d38", fontSize: 13 }}>{ad.title}</div>
              <div style={{ color: "#e05a1e", fontWeight: 800 }}>€{ad.price}</div>
              {ad.status === "sold" && <span style={{ fontSize: 11, color: "#1a7a6e", fontWeight: 700 }}>✓ Venduto</span>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {ad.status !== "sold" && (
                <button onClick={() => markAsSold(ad.id)} style={{ background: "#e8f5f2", color: "#1a7a6e", border: "1px solid #b8e0d8", borderRadius: 8, padding: "4px 8px", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit" }}>Venduto</button>
              )}
              <button onClick={() => deleteAd(ad.id)} style={{ background: "#fff0ec", color: "#e05a1e", border: "1px solid #fdd0c0", borderRadius: 8, padding: "4px 8px", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit" }}>Elimina</button>
            </div>
          </div>
        ))}
      </div>

      {/* SEZIONE NOTE LEGALI */}
      <div style={{ margin: "0 16px 16px", background: "#fff", borderRadius: 16, border: "1px solid #e8f0ee", overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid #f0f4f3", fontWeight: 800, color: "#0f3d38", fontSize: 15 }}>
       <IconNoteLegali size={18} color="#0f3d38" /> Note Legali e Privacy 
        </div>
        {[
          { label: "Termini e Condizioni", icon: <IconTermini size={16} color="#0f3d38" />, content: "Waglo è un marketplace che mette in contatto venditori e acquirenti di prodotti usati per animali. Il contratto di compravendita si stipula esclusivamente tra le parti. Waglo (Guidetti Umberto — P.IVA 02903920359 — Via Agnoletti 6, Reggio Emilia) è estranea al rapporto contrattuale e declina ogni responsabilità sui prodotti scambiati." },
          { label: "Privacy Policy", icon: <IconPrivacy size={16} color="#0f3d38" />, content: "I tuoi dati personali sono trattati da Guidetti Umberto (P.IVA 02903920359) ai sensi del GDPR (Reg. UE 2016/679). I dati sono utilizzati per la gestione dell'account e degli annunci. Ai sensi del D.Lgs. 32/2023 (DAC7), i dati dei venditori che superano 30 transazioni o €3.000/anno sono comunicati all'Agenzia delle Entrate. Per esercitare i tuoi diritti: privacy@waglo.pet" },
          { label: "Cookie Policy", icon: <IconCookie size={16} color="#0f3d38" />, content: "Waglo utilizza esclusivamente cookie tecnici necessari al funzionamento dell'app (autenticazione e sicurezza della sessione). Non utilizziamo cookie di profilazione o marketing. I cookie tecnici non richiedono consenso." },
          { label: "Segnalazioni e DSA", icon: <IconDSA size={16} color="#0f3d38" />, content: "In conformità al Digital Services Act (Reg. UE 2065/2022), puoi segnalare qualsiasi annuncio illecito tramite il tasto Segnala presente su ogni annuncio. Puoi anche contattarci a dsa@waglo.pet. Le segnalazioni vengono esaminate entro 24 ore." },
          { label: "Prodotti vietati", icon: <IconVietati size={16} color="#0f3d38" />, content: "Su Waglo è vietata la vendita di: animali vivi, medicinali veterinari, antiparassitari registrati come farmaci, attrezzature coercitive per animali, prodotti contraffatti, alimenti scaduti o aperti, cosmetici scaduti." },
        ].map(({ label, icon, content }) => (
          <LegalSection key={label} label={label} icon={icon} content={content} />
        ))}
        <div style={{ padding: "12px 16px", fontSize: 11, color: "#aaa", textAlign: "center", borderTop: "1px solid #f0f4f3" }}>
          Waglo.pet — Guidetti Umberto — P.IVA 02903920359 — Reggio Emilia{"\n"}
          info@waglo.pet | dsa@waglo.pet | privacy@waglo.pet | PEC: waglo@pec.it
        </div>
      </div>
    </div>
  );
}
