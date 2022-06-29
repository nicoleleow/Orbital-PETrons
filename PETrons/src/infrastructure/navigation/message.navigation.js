import React from "react";
import { Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MessagePage } from "../../features/activity/message.screen";
import { ChatPage } from "../../features/activity/chat.screen";
import { authentication, GetChatData } from "../../../firebase/firebase-config";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

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
          headerBackTitleVisible: false,
          headerLeft: () => (
            <Button
              onPress={() => navigation.navigate("MessagePage")}
              title="< Back"
              color="black"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
