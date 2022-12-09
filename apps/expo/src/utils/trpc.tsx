import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@acme/api";
/**
 * A set of typesafe hooks for consuming your API.
 */
export const trpc = createTRPCReact<AppRouter>();

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
import Constants from "expo-constants";
const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   */
  const localhost = Constants.manifest?.debuggerHost?.split(":")[0];
  if (!localhost)
    throw new Error("failed to get localhost, configure it manually");
  return `http://${localhost}:3000`;
};

/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */
import React, { Children, useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { transformer } from "@acme/api/transformer";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Text } from "react-native";

export const TRPCProvider: React.FC<{
  children: React.ReactNode;
  authToken: string | null;
}> = ({ children, authToken }) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      transformer,
      links: [
        httpBatchLink({
          headers() {
            return {
              Authorization: authToken || "",
            };
          },
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

// ------------------------------------------------------------------------------
/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 * Will wrap with your provider passing in TRPC Provider too
 *  passing in an access token
 */
// ------------------------------------------------------------------------------

// src/state/auth-context.tsx
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { AuthSession } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext } from "react";
import { LogBox } from "react-native";
import { isBrowser } from "../lib/helpers";

type State = {
  session: AuthSession | null | undefined;
};

export const AuthContext = createContext<State | undefined>(undefined);

function TRPCAuthContextProvider({ children }: { children: ReactNode }) {
  /**
   * What the session state can tell us:
   * - undefined: The session is being loaded.
   * - null: The session is fetched and is unavailable.
   * - AuthSession: There is a session.
   */
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    /**
     * About the "Setting a timer for a long period of time..." warning:
     *
     * Take a look at this GitHub response: https://github.com/facebook/react-native/issues/12981#issuecomment-652745831
     * It says:
     *
     * > If you don't mind having your timer get activated later when the app is
     * > foregrounded again, then I think ignoring the YellowBox warning is a good idea.
     *
     * The timer is for the token refresh task, from GoTrueClient.js. When the access token is expired,
     *  the access token needs to be refreshed. For a 1 hour JWT expiration duration on Supabase,
     *  it is scheduled when 59 minutes has passed. If it could not run at that specific time
     *  because the app were not foregrounded, then the access token would be refreshed as
     *  soon as the app is opened up. If it succeeded, the authentication is conserved. Otherwise,
     *  the session would be expired, requiring the user for a re-login.
     *
     * Therefore, we can safely ignore this warning. Even in the case of the user making requests
     *  while the token is being refreshed, they should fail as they are using the expired token.
     *  The failed requests should be handled accordingly instead of bringing the app to a halt.
     *  The refresh should be fast enough.
     */
    LogBox.ignoreLogs(["Setting a timer"]);

    /**
     * Fixing the "login screen flashing on app open" problem:
     *
     * The session could be immediately fetched on the web. But we might be using Native here.
     *
     * So if it's Native, we would keep the session as undefined if it's not already been fetched before.
     *  We would then go visit the AsyncStorage, if it doesn't have a session, the session would be null.
     *  If it has, keep the current session state because the onAuthStateChange would setSession for us later.
     *  It might even have done that before our check.
     */

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session || isBrowser() ? session : undefined);
    });

    (async () => {
      if (isBrowser()) return;
      const storageSession = await AsyncStorageLib.getItem(
        "supabase.auth.token",
      );
      if (!storageSession) {
        setSession((oldSession) =>
          oldSession === undefined ? null : oldSession,
        );
      }
    })();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
      },
    );

    return () => {
      if (authListener) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
    }),
    [session],
  );
  return (
    <AuthContext.Provider value={value}>
      <TRPCProvider authToken={session?.access_token as string}>
        {children}
      </TRPCProvider>
    </AuthContext.Provider>
  );
}

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      `useAuthContext must be used within a AuthContextProvider.`,
    );
  }
  return context;
};

const useAuthUser = () => {
  const { session } = useAuthContext();
  if (session === undefined) return undefined;
  return session?.user ?? null;
};

const useAuthSession = () => {
  const { session } = useAuthContext();
  if (session === undefined) return undefined;
  return session ?? null;
};

export { TRPCAuthContextProvider, useAuthContext, useAuthUser, useAuthSession };
