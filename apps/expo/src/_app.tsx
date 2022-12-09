import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import Navigation from "./navigation";
import { TRPCAuthContextProvider, TRPCProvider } from "./utils/trpc";
import { AuthContextProvider } from "./utils/auth-context";

export const App = () => {
  return (
    // Create my own trpc auth context provider
    // Get session from supabase, async storage, useContext for the session/ user
    // checkout ../utils/trpc for more
    <TRPCAuthContextProvider>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    </TRPCAuthContextProvider>
  );
};
