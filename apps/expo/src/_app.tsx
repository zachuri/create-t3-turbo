import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "./utils/trpc";

import { HomeScreen } from "./screens/home";
import { AuthScreen } from "./screens/auth";

export const App = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <TRPCProvider>
      <SafeAreaProvider>
        {signIn ? <AuthScreen /> : <HomeScreen />}
        <StatusBar />
      </SafeAreaProvider>
    </TRPCProvider>
  );
};
