import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { MainBottomTabNavigator } from "./main-tabs";
import Sidebar from "../components/drawer/sidebar";
import { ExerciseScreen } from "../screens/exercise-screen";
import { RootStackParamList } from "../types/navigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Solid from "react-native-heroicons/solid";
import * as Outline from "react-native-heroicons/outline";
import { useColorModeValue } from "native-base";
import AnimatedColorBox from "../components/animated-color-box";
import { WeightScreen } from "../screens/weight-screen";
import { TaskScreen } from "../screens/task-screen";
import { HomeScreen } from "../screens/home-screen";
import WorkoutScreen from "../screens/workout-screen";
import { ProfileScreen } from "../screens/profile-screen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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
      <Drawer.Screen name="MainStack" component={MainBottomTabNavigator} />
    </Drawer.Navigator>
  );
};

const MainBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          if (route.name === "Home") {
            if (focused) return <Solid.HomeIcon color={color} size={28} />;
            return <Outline.HomeIcon color={color} size={size} />;
          } else if (route.name === "Profile") {
            if (focused) return <Solid.UserIcon color={color} size={28} />;
            return <Outline.UserIcon color={color} size={size} />;
          } else if (route.name === "Task") {
            if (focused) return <Solid.PencilIcon color={color} size={28} />;
            return <Outline.PencilIcon color={color} size={size} />;
          } else if (route.name === "Weight") {
            if (focused) return <Solid.ScaleIcon color={color} size={28} />;
            return <Outline.ScaleIcon color={color} size={size} />;
          } else if (route.name === "Workout") {
            if (focused)
              return <Solid.RectangleStackIcon color={color} size={28} />;
            return <Outline.RectangleStackIcon color={color} size={size} />;
          }
        },

        tabBarActiveTintColor: useColorModeValue("black", "white"),
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <AnimatedColorBox
            safeArea
            flex={1}
            bg={useColorModeValue("blue.50", "primary.900")}
            p={7}
          ></AnimatedColorBox>
        ),
      })}
    >
      <Tab.Screen
        name="Weight"
        component={WeightScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Task"
        component={TaskScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Workout"
        component={MainStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
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
      {/* <Stack.Screen name="Tabs" component={MainBottomTabNavigator} /> */}
      <Stack.Screen
        name="Workout"
        component={WorkoutScreen}
        // Dynamically update title of header!
        // options={({ route }) => ({
        //   headerShown: true,
        //   title: route.params?.title,
        // })}

        // options={{
        //   headerShown: true,
        //   title: "arm",
        // }}
      />
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
