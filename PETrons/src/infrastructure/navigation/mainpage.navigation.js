import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { Mainpage } from "../../features/mainpage/mainpage";
import { AdoptPage } from "../../features/mainpage/adopt";
import { PutuPAdoptionPage } from "../../features/mainpage/put-up-adoption";

const Stack = createStackNavigator();

export const MainPageNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="mainpage" component={Mainpage} />
    <Stack.Screen name="Adopt" component={AdoptPage} />
    <Stack.Screen name="PutUpAdoption" component={PutuPAdoptionPage} />
  </Stack.Navigator>
);
