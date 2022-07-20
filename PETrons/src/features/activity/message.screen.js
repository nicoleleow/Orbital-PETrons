import React, { useState, useCallback } from "react";
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from "react-native";
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
  userUsername,
} from "../../../firebase/firebase-config";
import { colors } from "../../infrastructure/theme/colors";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const sortingTime = (time1, time2) => {
  if (time1.getFullYear() === time2.getFullYear()) {
    if (time1.getMonth() !== time2.getMonth()) {
      return time1.getMonth() - time2.getMonth();
    } else {
      if (time1.getDate() !== time2.getDate()) {
        return time1.getDate() - time2.getDate();
      } else {
        if (time1.getHours() !== time2.getHours()) {
          return time1.getHours() - time2.getHours();
        } else {
          if (time1.getMinutes() !== time2.getMinutes()) {
            return time1.getMinutes() - time2.getMinutes();
          } else {
            return time1.getSeconds() - time2.getSeconds();
          }
        }
      }
    }
  } else {
    return time1.getFullYear() - time2.getFullYear();
  }
};

const getNameList = (inputList, inputListTwo) => {
  inputList.forEach((element) => {
    if (
      (element.email === authentication.currentUser?.email) &
      !inputListTwo.includes(element.username)
    ) {
      inputListTwo.push(element.username);
    } else if (
      (element.userEmail === authentication.currentUser?.email) &
      !inputListTwo.includes(element.userName)
    ) {
      inputListTwo.push(element.userName);
    }
  });
};

let timeList = [];
let filterList = [];
const getFilteredList = (
  inputList,
  inputListTwo,
  inputListThree,
  inputListFour
) => {
  inputListTwo.forEach((i) => {
    inputList.forEach((element) => {
      if (element.userName === i || element.username === i) {
        inputListThree.push(element.createdAt);
        inputListThree.sort((a, b) => sortingTime(new Date(a), new Date(b)));
      }
    });
    inputList.forEach((element) => {
      if (
        element.createdAt === inputListThree[inputListThree.length - 1] &&
        inputListThree.length !== 0
      ) {
        inputListFour.push(element);
      }
    });
    inputListThree = [];
  });
};

GetChatData();

export const MessagePage = ({ navigation }) => {
  const filteredList = chatList.filter((obj) => {
    return (
      obj.userEmail === authentication.currentUser?.email ||
      obj.email === authentication.currentUser?.email
    );
  });

  let nameList = [];
  let timeList = [];
  let filterList = [];
  getNameList(filteredList, nameList);
  getFilteredList(filteredList, nameList, timeList, filterList);

  const [refreshing, setRefreshing] = React.useState(false);
  const [filteredChat, setFilteredChat] = React.useState(filterList);

  const onRefresh = React.useCallback(() => {
    GetChatData();
    const filteredList = chatList.filter((obj) => {
      return (
        obj.userEmail === authentication.currentUser?.email ||
        obj.email === authentication.currentUser?.email
      );
    });
    let nameList = [];
    let timeList = [];
    let filterList = [];
    getNameList(filteredList, nameList);
    getFilteredList(filteredList, nameList, timeList, filterList);
    setFilteredChat(filterList);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <SafeArea>
      <Text variant="header">Messages</Text>
      <FlatList
        data={filteredChat}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          paddingTop: 30,
        }}
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
    </SafeArea>
  );
};
