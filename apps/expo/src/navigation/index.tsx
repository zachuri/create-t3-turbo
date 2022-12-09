/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { RootStackParamList } from "../types/navigation";
import LinkingConfiguration from "./LinkingConfiguration";
import { ProfileScreen } from "../screens/profile";
import LogoutButton from "../components/LogoutButton";
import { SignInScreen } from "../screens/auth/signin";
import { SignUpScreen } from "../screens/auth/signup";
import { HomeScreen } from "../screens/home";
import { useAuthUser } from "../utils/trpc";
import { Tabs } from "./tabs";
// import { useAuthUser } from "../utils/auth-context";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

/**
 * Read more about the protected routes pattern in React Native
 *
 * https://reactnavigation.org/docs/auth-flow
 */
const RootNavigator = () => {
  const user = useAuthUser();

  return (
    <>
      {!user ? (
        // <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Navigator
          screenOptions={{
            gestureDirection: "vertical",
          }}
        >
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerShown: false,
              headerTitle: "Sign In",
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: false,
              headerTitle: "Sign Up",
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: false,
            gestureDirection: "vertical",
          }}
        >
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{
              headerShown: false,
              headerTitle: "Tabs",
            }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};
