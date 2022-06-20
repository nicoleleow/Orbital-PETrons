import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfilePage } from "../../features/profile/profile";
import { FavouritesPage } from "../../features/profile/favourites";
import { PutUpAdoptionListPage } from "../../features/profile/put-up-for-adoption-list.screen";
import { EditPetList } from "../../features/profile/edit-adoption-list/edit-pet-list.screen";

const Stack = createStackNavigator();

export const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfilePage" component={ProfilePage} />
    <Stack.Screen name="Favourites" component={FavouritesPage} />
    <Stack.Screen name="PutUpAdoptionList" component={PutUpAdoptionListPage} />
    <Stack.Screen name="EditingPetList" component={EditPetList} />
  </Stack.Navigator>
);
