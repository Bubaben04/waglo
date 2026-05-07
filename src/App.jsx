import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./components/Auth";
import Home from "./components/Home";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

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

  return (
    <Home
      session={session}
      onLogout={handleLogout}
      onShowAuth={() => setShowAuth(true)}
    />
  );
}
