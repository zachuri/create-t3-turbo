import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignInScreen } from "../screens/auth/signin";
import { SignUpScreen } from "../screens/auth/signup";

const Stack = createNativeStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // gestureEnabled: true,
        // animationTypeForReplace: user ? "pop" : "push",
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      {/* <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} /> */}
    </Stack.Navigator>
  );
};

export default Auth;
