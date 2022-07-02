import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { Mainpage } from "../../features/mainpage/mainpage.screen";
import { AdoptPage } from "../../features/mainpage/adopt/adopt.screen";
import { PutUpAdoptionPage } from "../../features/mainpage/put-up-for-adoption/put-up-adoption.screen";
import { StoriesPage } from "../../features/mainpage/share-stories/share-stories.screen";
import { FAQPage } from "../../features/mainpage/faq/faq.screen";

import { PetInfoCard } from "../../features/mainpage/adopt/components/pet-info-card.component";
import { PetInfoScreen } from "../../features/mainpage/adopt/screens/pet-info.screen";
import { EditPetList } from "../../features/profile/edit-adoption-list/edit-pet-list.screen";

import { LicensingDogsScreen } from "../../features/mainpage/faq/screens/licensing-dogs.screen";
import { PetAdoptionProcedureScreen } from "../../features/mainpage/faq/screens/pet-adoption-procedure.screen";
import { FrequentlyAskedQuestionsScreen } from "../../features/mainpage/faq/screens/frequently-asked-questions.screen";
import { ChatPage } from "../../features/activity/chat.screen";
import { authentication } from "../../../firebase/firebase-config";

import { StoriesPostCard } from "../../features/mainpage/share-stories/components/stories-post-card.component";
import { CreatePostScreen } from "../../features/mainpage/share-stories/screens/create-post.screen";

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

    <Stack.Screen
      name="FrequentlyAskedQuestions"
      component={FrequentlyAskedQuestionsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PetAdoptionProcedure"
      component={PetAdoptionProcedureScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LicensingDogs"
      component={LicensingDogsScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="ChatPage"
      component={ChatPage}
      options={({ navigation, route }) => ({
        title:
          route.params.item.email === authentication.currentUser?.email
            ? route.params.item.username
            : route.params.item.userName,
        headerBackTitleVisible: false,
        headerLeft: () => (
          <Button
            onPress={() => navigation.goBack()}
            title="< Back"
            color="black"
          />
        ),
      })}
    />
    <Stack.Screen
      name="CreatePostScreen"
      component={CreatePostScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
