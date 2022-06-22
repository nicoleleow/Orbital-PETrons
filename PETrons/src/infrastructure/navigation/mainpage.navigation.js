import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Mainpage } from "../../features/mainpage/mainpage.screen";
import { AdoptPage } from "../../features/mainpage/adopt/adopt.screen";
import { PutUpAdoptionPage } from "../../features/mainpage/put-up-for-adoption/put-up-adoption.screen";
import { StoriesPage } from "../../features/mainpage/share-stories/share-stories.screen";
import { FAQPage } from "../../features/mainpage/faq/faq.screen";

import { PetInfoCard } from "../../features/mainpage/adopt/components/pet-info-card.component";
import { PetInfoScreen } from "../../features/mainpage/adopt/screens/pet-info.screen";
import { EditPetList } from "../../features/profile/edit-adoption-list/edit-pet-list.screen";
import { ChatPage } from "../../features/activity/chat.screen";

const Stack = createStackNavigator();

export const MainPageNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="mainpage"
      component={Mainpage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Adopt"
      component={AdoptPage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PutUpAdoption"
      component={PutUpAdoptionPage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ShareStories"
      component={StoriesPage}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="FAQ"
      component={FAQPage}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="PetInfoCard"
      component={PetInfoCard}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PetInfo"
      component={PetInfoScreen}
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen
      name="Chat"
      component={ChatPage}
      options={({ route }) => ({
        title: route.params.item.userName,
        headerBackTitleVisible: false,
      })}
    /> */}
  </Stack.Navigator>
);
