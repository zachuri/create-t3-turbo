import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainBottomTabNavigator } from "./MainTabs";
import Loading from "../screens/auth/loading";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
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
