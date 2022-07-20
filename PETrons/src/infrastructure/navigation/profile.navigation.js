import React from "react";
import { Button, Alert, Pressable, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native";

import { ProfilePage } from "../../features/profile/profile";
import { FavouritesPage } from "../../features/profile/screens/favourites/favourites";
import { PetInfoScreen } from "../../features/mainpage/adopt/screens/pet-info.screen";
import { PutUpAdoptionListPage } from "../../features/profile/put-up-for-adoption-list.screen";
import { EditPetList } from "../../features/profile/screens/edit-adoption-list/edit-pet-list.screen";
import { EditProfilePage } from "../../features/profile/screens/edit-profile/edit-profile.screen";
import { MyStoryPostsPage } from "../../features/profile/screens/my-story-posts.screen";
import { EditPostPage } from "../../features/profile/screens/edit-my-post.screen";
import { ChangePasswordPage } from "../../features/profile/screens/edit-profile/change-password-screen";
import { CommentsScreen } from "../../features/mainpage/share-stories/screens/comments.screen";
import { LikedUsersScreen } from "../../features/profile/screens/my-posts-liked-users.screen";

const Stack = createStackNavigator();

const PressableText = styled(Text)`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.h5};
  padding-left: ${(props) => props.theme.space[3]};
`;

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
        name="PetInfo"
        component={PetInfoScreen}
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
            backgroundColor: "#ff8c3f",
          },
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#fffff4",
          },
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
        options={({ navigation, route }) => ({
          title: "Edit Caption",
          headerStyle: {
            backgroundColor: "white",
          },
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="Change Password"
        component={ChangePasswordPage}
        options={({ navigation, route }) => ({
          headerStyle: {
            backgroundColor: "orange",
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={({ navigation, route }) => ({
          title: "Comments",
          headerBackTitleVisible: false,
          headerTitleStyle: { fontSize: 18 },
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="LikedUsersScreen"
        component={LikedUsersScreen}
        options={({ navigation, route }) => ({
          title: "Liked Users",
          headerBackTitleVisible: false,
          headerTitleStyle: { fontSize: 18 },
          headerTitleAlign: "center",
        })}
      />
    </Stack.Navigator>
  );
};
