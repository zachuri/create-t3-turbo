import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import Navigation from "./navigation";
import { AuthContextProvider } from "./utils/auth-context";

export const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    //  <TrpcAuthContextProvider>

    // Created our own Provider
    // Allows us to pass the user data between screens
    <AuthContextProvider>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </AuthContextProvider>
    // </TrpcAuthContextProvider>
  );
};
