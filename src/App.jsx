import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#e8c547",
        fontSize: 48
      }}>
        🐾
      </div>
    );
  }

  if (!session) {
    return <Auth onAuth={() => supabase.auth.getSession().then(({ data: { session } }) => setSession(session))} />;
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 16,
      fontFamily: "sans-serif",
      color: "#fff"
    }}>
      <div style={{ fontSize: 48 }}>🐾</div>
      <div style={{ color: "#e8c547", fontSize: 24, fontWeight: 700 }}>
        Benvenuto su Waglo!
      </div>
      <div style={{ color: "#666", fontSize: 14 }}>
        {session.user.email}
      </div>
      <button
        onClick={() => supabase.auth.signOut()}
        style={{
          marginTop: 16,
          padding: "10px 24px",
          border: "2px solid #333",
          borderRadius: 10,
          background: "transparent",
          color: "#888",
          fontWeight: 700,
          cursor: "pointer",
          fontSize: 13
        }}
      >
        Esci
      </button>
    </div>
  );
}
