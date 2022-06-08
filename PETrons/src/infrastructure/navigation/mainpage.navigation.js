import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { Mainpage } from "../../features/mainpage/mainpage.screen";
import { AdoptPage } from "../../features/mainpage/adopt/adopt.screen";
import { PutUpAdoptionPage } from "../../features/mainpage/put-up-for-adoption/put-up-adoption.screen";
import { StoriesPage } from "../../features/mainpage/share-stories/share-stories.screen";
import { FAQPage } from "../../features/mainpage/faq/faq.screen";

const Stack = createStackNavigator();

export const MainPageNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="mainpage" component={Mainpage} />
    <Stack.Screen name="Adopt" component={AdoptPage} />
    <Stack.Screen name="PutUpAdoption" component={PutUpAdoptionPage} />
    <Stack.Screen name="ShareStories" component={StoriesPage} />
    <Stack.Screen name="FAQ" component={FAQPage} />
  </Stack.Navigator>
);
