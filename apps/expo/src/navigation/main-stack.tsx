import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainBottomTabNavigator } from "./main-tabs";
import Sidebar from "../components/sidebar";

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
      }}
      drawerContent={(props) => <Sidebar {...props} />}
    >
      <Drawer.Screen name="MainStack" component={MainStackNavigator} />
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
      <Stack.Screen name="Tabs" component={MainBottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default Main;
