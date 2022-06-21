import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MessagePage } from "../../features/activity/message.screen";
import { ChatPage } from "../../features/activity/chat.screen";

const Stack = createStackNavigator();

export const MessageNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MessagePage"
        component={MessagePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatPage}
        options={({ route }) => ({
          title: route.params.item.userName,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
};
