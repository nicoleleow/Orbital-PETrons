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

import { LicensingDogsScreen } from "../../features/mainpage/faq/screens/licensing-dogs.screen";
import { PetAdoptionProcedureScreen } from "../../features/mainpage/faq/screens/pet-adoption-procedure.screen";
import { FrequentlyAskedQuestionsScreen } from "../../features/mainpage/faq/screens/frequently-asked-questions.screen";

import { StoriesPostCard } from "../../features/mainpage/share-stories/components/stories-post-card.component";
import { CreatePostScreen } from "../../features/mainpage/share-stories/screens/create-post.screen";

const Stack = createStackNavigator();

export const MainPageNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="mainpage" component={Mainpage} />
    <Stack.Screen name="Adopt" component={AdoptPage} />
    <Stack.Screen name="PutUpAdoption" component={PutUpAdoptionPage} />
    <Stack.Screen name="ShareStories" component={StoriesPage} />
    <Stack.Screen name="FAQ" component={FAQPage} />

    <Stack.Screen name="PetInfoCard" component={PetInfoCard} />
    <Stack.Screen name="PetInfo" component={PetInfoScreen} />

    <Stack.Screen name="FrequentlyAskedQuestions" component={FrequentlyAskedQuestionsScreen} />
    <Stack.Screen name="PetAdoptionProcedure" component={PetAdoptionProcedureScreen} />
    <Stack.Screen name="LicensingDogs" component={LicensingDogsScreen} />

    <Stack.Screen name="StoriesPostCard" component={StoriesPostCard} />
    <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
  </Stack.Navigator>
);
