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
import { ProfileScreen } from "../screens/profile";
import LogoutButton from "../components/LogoutButton";
import { SignInScreen } from "../screens/auth/signin";
import { SignUpScreen } from "../screens/auth/signup";
import { HomeScreen } from "../screens/home";
import { useAuthUser } from "../utils/trpc";
// import { useAuthUser } from "../utils/auth-context";

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
        // <Stack.Screen name="Auth" component={AuthScreen} />
        <>
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
        </>
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
        // <Stack.Screen
        //   name="MyProfile"
        //   component={ProfileScreen}
        //   options={{
        //     headerShown: false,
        //     headerRight: LogoutButton,
        //   }}
        // />
      )}
    </Stack.Navigator>
  );
};
