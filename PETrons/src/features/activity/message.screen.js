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
import {
  GetChatData,
  chatList,
  getUserName,
  userUsername,
} from "../../../firebase/firebase-config";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

GetChatData();
getUserName();

export const MessagePage = ({ navigation }) => {
  const filteredList = chatList.filter((obj) => {
    return (
      obj.userEmail === authentication.currentUser?.email ||
      obj.email === authentication.currentUser?.email
    );
  });
  let timeList = [];
  let nameList = [];
  let filterList = [];
  const arrayList = filteredList.forEach((element) => {
    if (
      !nameList.includes(element.userName) &
      (element.userName !== userUsername)
    ) {
      nameList.push(element.userName);
    }
  });
  const secondArray = nameList.forEach((i) => {
    filteredList.forEach((element) => {
      if (element.userName === i || element.username === i) {
        timeList.push(element.createdAt);
        timeList.sort();
      }
    });
    filteredList.forEach((element) => {
      if (element.createdAt === timeList.at(-1) && timeList.length !== 0) {
        filterList.push(element);
      }
    });
    timeList = [];
  });
  console.log(filterList);

  return (
    <SafeArea>
      <Text variant="header">Messages</Text>
      <Container>
        <FlatList
          data={filterList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Card onPress={() => navigation.navigate("Chat", { item })}>
              <UserInfo>
                <TextSection>
                  <UserInfoText>
                    <UserName>
                      {item.userEmail === authentication.currentUser?.email
                        ? item.userName
                        : item.username}
                    </UserName>
                    <PostTime>{item.createdAt}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.text}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    </SafeArea>
  );
};
