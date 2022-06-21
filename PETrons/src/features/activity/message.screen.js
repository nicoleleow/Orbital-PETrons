import React from "react";
import { View, Button, StyleSheet, FlatList, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  updateDoc,
} from "firebase/firestore/lite";

import {
  Container,
  Card,
  UserInfo,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "./message.styles";
import { Text } from "../../components/typography/text.component";
import { authentication, db } from "../../../firebase/firebase-config";
import { GetChatData, chatList } from "../../../firebase/firebase-config";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

GetChatData();

export const MessagePage = ({ navigation }) => {
  // const press = async () => {
  //   const querySnapshot = await getDocs(collection(db, "userinfo"));
  //   let userUsername;
  //   querySnapshot.forEach((doc) => {
  //     if (doc.data().email === authentication.currentUser?.email) {
  //       userUsername = doc.data().username;
  //     }
  //   });
  //   console.log("hi " + userUsername);
  // };

  const filteredList = chatList.filter((obj) => {
    return obj.userEmail === authentication.currentUser?.email;
  });
  console.log(filteredList);

  return (
    <SafeArea>
      {/* <Button onPress={press} title="press"></Button> */}
      <Text variant="header">Messages</Text>
      <Container>
        <FlatList
          data={filteredList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card onPress={() => navigation.navigate("Chat", { item })}>
              <UserInfo>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    </SafeArea>
  );
};
