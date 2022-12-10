import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home-screen";
import { ProfileScreen } from "../screens/profile-screen";
import * as Solid from "react-native-heroicons/solid";
import * as Outline from "react-native-heroicons/outline";
import { MainScreen } from "../screens/weight-screen";
import AnimatedColorBox from "../components/animated-color-box";
import { useColorModeValue } from "native-base";

const Tab = createBottomTabNavigator();

export const MainBottomTabNavigator = () => {
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
          } else if (route.name === "Weight") {
            if (focused) return <Solid.ScaleIcon color={color} size={28} />;
            return <Outline.ScaleIcon color={color} size={size} />;
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
        component={MainScreen}
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
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
