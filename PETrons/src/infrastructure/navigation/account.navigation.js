import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen } from "../../features/account/account.screen";
import { LoginScreen } from "../../features/account/login.screen";
import { RegisterScreen } from "../../features/account/register.screen";
import { Mainpage } from "../../features/mainpage/mainpage";
import { AppNavigator } from "./app.navigation";

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={AccountScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Home" component={AppNavigator} />
  </Stack.Navigator>
);
