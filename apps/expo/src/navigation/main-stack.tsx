import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainBottomTabNavigator } from "./main-tabs";
import Loading from "../screens/auth/loading-screen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Main = () => {
  return <DrawerNavigator />;
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEnabled: true,
        swipeEdgeWidth: 1000,
        headerShown: false,
        // drawerStyle: {
        //   width: Dimensions.get("window").width / 1.25,
        // },
      }}
    >
      <Drawer.Screen name="MainStack" component={MainStackNavigator} />
      <Drawer.Screen name="TestScreen" component={Loading} />
      <Drawer.Screen name="TestScreen2" component={Loading} />
    </Drawer.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Stack.Screen
        name="MainBottomTabNavigator"
        component={MainBottomTabNavigator}
      />
    </Stack.Navigator>
  );
};

export default Main;
