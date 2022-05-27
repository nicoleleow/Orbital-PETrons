import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, SafeAreaView, Text, View, Platform } from "react-native";

import { Mainpage } from "../../features/mainpage/mainpage";
import { SafeArea } from "../../components/utility/safe-area.component";

const Profile = () => (
  <SafeArea>
    <Text>Profile</Text>
  </SafeArea>
);
const Activity = () => (
  <SafeArea>
    <Text>Activity</Text>
  </SafeArea>
);

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Home" component={Mainpage} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export const AppNavigator = () => (
  <NavigationContainer>
    <MyTabs />
  </NavigationContainer>
);
