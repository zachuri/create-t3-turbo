import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "./utils/trpc";

import { HomeScreen } from "./screens/home";
import { AuthScreen } from "./screens/auth";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";

export const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log(session);
    });
  }, []);

  return (
    <TRPCProvider>
      <SafeAreaProvider>
        {!session ? <AuthScreen /> : <HomeScreen />}
        <StatusBar />
      </SafeAreaProvider>
    </TRPCProvider>
  );
};
