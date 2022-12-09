import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignInScreen } from "../screens/auth/signin";
import { SignUpScreen } from "../screens/auth/signup";

const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: "vertical",
      }}
    >
      <AuthStack.Screen name="Login" component={SignInScreen} />
      <AuthStack.Screen name="Register" component={SignUpScreen} />
      {/* <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} /> */}
    </AuthStack.Navigator>
  );
};

export default Auth;
