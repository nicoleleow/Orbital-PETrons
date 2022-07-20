import React from "react";
import { Text, View, Button, Pressable } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import styled from "styled-components/native";

import { MessagePage } from "../../features/activity/message.screen";
import { ChatPage } from "../../features/activity/chat.screen";
import { colors } from "../theme/colors";
import { authentication, GetChatData } from "../../../firebase/firebase-config";

const Stack = createStackNavigator();

const PressableText = styled(Text)`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.h5};
  padding-left: ${(props) => props.theme.space[3]};
`;

export const MessageNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MessagePage">
      <Stack.Screen
        name="MessagePage"
        component={MessagePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatPage}
        options={({ navigation, route }) => ({
          title:
            route.params.item.email === authentication.currentUser?.email
              ? route.params.item.username
              : route.params.item.userName,
          headerStyle: {
            backgroundColor: colors.ui.header,
          },
          headerTintColor: "#fffff4",
          headerTitleStyle: {
            color: "#fffff4",
          },
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};
