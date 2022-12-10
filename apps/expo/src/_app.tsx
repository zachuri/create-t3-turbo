import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { TRPCAuthContextProvider } from "./utils/trpc";

export const App = () => {
  return (
    // Create my own trpc auth context provider
    // Get session from supabase, async storage, useContext for the session/ user
    // checkout ../utils/trpc for more
    <TRPCAuthContextProvider>
        <StatusBar />
        <Navigation />
    </TRPCAuthContextProvider>
  );
};
