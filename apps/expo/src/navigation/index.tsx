/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthSession, useAuthUser } from "../utils/trpc";
import Loading from "../screens/auth/loading-screen";
import Auth from "./auth-stack";
import Main from "./main-stack";

export default function Navigation() {
  return (
    // <NavigationContainer linking={LinkingConfiguration}>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * Read more about the protected routes pattern in React Native
 *
 * https://reactnavigation.org/docs/auth-flow
 */

const RootNavigator = () => {
  const user = useAuthUser();
  const session = useAuthSession();

  return (
    <>
      {session?.access_token === null && <Loading />}
      {!user ? (<Auth />) : ( <Main />)}
    </>
  );
};
