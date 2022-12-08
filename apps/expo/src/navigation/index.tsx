/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { RootStackParamList } from "../types/navigation";
import LinkingConfiguration from "./LinkingConfiguration";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { ProfileScreen } from "../screens/profile";
import { TestScreen } from "../screens/test";
import { AuthScreen } from "../screens/auth/auth";
import { useAuthUser } from "../utils/auth-context";
import Loading from "../screens/auth/loading";
import LoginScreen from "../screens/auth/login";
import LogoutButton from "../components/LogoutButton";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Read more about the protected routes pattern in React Native
 *
 * https://reactnavigation.org/docs/auth-flow
 */
const RootNavigator = () => {
  const user = useAuthUser();

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthScreen} />
      ) : (
        <Stack.Screen
          name="MyProfile"
          component={ProfileScreen}
          options={{ headerRight: LogoutButton }}
        />
      )}
    </Stack.Navigator>
  );
};
