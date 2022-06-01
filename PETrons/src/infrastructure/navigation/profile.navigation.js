import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfilePage } from "../../features/profile/profile";
import { FavouritesPage } from "../../features/profile/favourites";
import { AccountScreen } from "../../features/account/account.screen";

const Stack = createStackNavigator();

export const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={ProfilePage} />
    <Stack.Screen name="Favourites" component={FavouritesPage} />
  </Stack.Navigator>
);
