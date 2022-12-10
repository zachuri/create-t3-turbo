import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainBottomTabNavigator } from "./main-tabs";
import Loading from "../screens/auth/loading-screen";
import Sidebar from "../components/sidebar";
import { getFocusedRouteNameFromRoute, Route } from "@react-navigation/native";

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
      <Stack.Screen
        name="Tabs"
        component={MainBottomTabNavigator}
      />
    </Stack.Navigator>
  );
};

export default Main;
