import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, SafeAreaView, Text, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { Mainpage } from "../../features/mainpage/mainpage";
import { SafeArea } from "../../components/utility/safe-area.component";
import { Profile } from "../../features/profile/profile";
import { ActivityPage } from "../../features/activity/activity";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "md-home";
          } else if (route.name === "Activity") {
            iconName = "md-notifications";
          } else if (route.name === "Profile") {
            iconName = "md-people";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Mainpage}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Activity"
        component={ActivityPage}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}
export const AppNavigator = () => <MyTabs />;
