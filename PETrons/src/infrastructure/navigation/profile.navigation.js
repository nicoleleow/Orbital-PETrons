import React from "react";
import { Button, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { ProfilePage } from "../../features/profile/profile";
import { FavouritesPage } from "../../features/profile/favourites";
import { PutUpAdoptionListPage } from "../../features/profile/put-up-for-adoption-list.screen";
import { EditPetList } from "../../features/profile/screens/edit-adoption-list/edit-pet-list.screen";
import { EditProfilePage } from "../../features/profile/screens/edit-profile/edit-profile.screen";
import { MyStoryPostsPage } from "../../features/profile/screens/my-story-posts.screen";
import { EditPostPage } from "../../features/profile/screens/edit-my-post.screen";
import { ChangePasswordPage } from "../../features/profile/screens/edit-profile/change-password-screen";

const Stack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favourites"
        component={FavouritesPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PutUpAdoptionList"
        component={PutUpAdoptionListPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditingPetList"
        component={EditPetList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Your Profile"
        component={EditProfilePage}
        options={({ navigation, route }) => ({
          headerStyle: {
            backgroundColor: "orange",
          },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Button
              onPress={() => navigation.navigate("ProfilePage")}
              title="< Back"
              color="black"
            />
          ),
        })}
      />
      <Stack.Screen
        name="MyStoryPostsPage"
        component={MyStoryPostsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditPostPage"
        component={EditPostPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePasswordPage}
        options={({ navigation, route }) => ({
          headerStyle: {
            backgroundColor: "orange",
          },
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
    </Stack.Navigator>
  );
};
