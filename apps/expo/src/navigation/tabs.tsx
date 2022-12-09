import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home";
import { ProfileScreen } from "../screens/profile";
import * as Solid from "react-native-heroicons/solid";
import * as Outline from "react-native-heroicons/outline";
import Loading from "../screens/auth/loading";

export const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          if (route.name === "Home") {
            if (focused) return <Solid.HomeIcon color={color} size={28} />;
            return <Outline.HomeIcon color={color} size={size} />;
          } else if (route.name === "MyProfile") {
            if (focused) return <Solid.UserIcon color={color} size={28} />;
            return <Outline.UserIcon color={color} size={size} />;
          } else if (route.name === "Loading") {
            if (focused) return <Solid.LockOpenIcon color={color} size={28} />;
            return <Outline.LockOpenIcon color={color} size={size} />;
          }
        },
        tabBarActiveTintColor: "#2e026d",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Loading"
        component={Loading}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
