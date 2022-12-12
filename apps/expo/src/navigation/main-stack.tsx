import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainBottomTabNavigator } from "./main-tabs";
import Sidebar from "../components/drawer/sidebar";
import { ExerciseScreen } from "../screens/exercise-screen";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const Main = () => {
  return <DrawerNavigator />;
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEnabled: true,
        swipeEdgeWidth: 500,
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
        // gestureEnabled: true,
        fullScreenGestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="Tabs" component={MainBottomTabNavigator} />
      <Stack.Screen
        name="Exercise"
        component={ExerciseScreen}
        // Dynamically update title of header!
        options={({ route }) => ({
          headerShown: true,
          title: route.params?.title,
        })}

        // options={{
        //   headerShown: true,
        //   title: "arm",
        // }}
      />
    </Stack.Navigator>
  );
};

export default Main;
