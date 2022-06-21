import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SafeArea } from "../../components/utility/safe-area.component";
import { ActivityPage } from "../../features/activity/message.screen";
import { ProfileNavigator } from "./profile.navigation";
import { MainPageNavigator } from "./mainpage.navigation";
import { MessageNavigator } from "./message.navigation";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "md-home";
          } else if (route.name === "Messages") {
            iconName = "md-chatbox-ellipses";
          } else if (route.name === "Profile") {
            iconName = "md-people";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={MainPageNavigator}
      />
      <Tab.Screen
        name="Messages"
        options={{ headerShown: false }}
        component={MessageNavigator}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
}
export const AppNavigator = () => <MyTabs />;
