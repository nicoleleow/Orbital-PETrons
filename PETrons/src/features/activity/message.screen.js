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
  userUsername,
} from "../../../firebase/firebase-config";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

GetChatData();

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
      (element.email === authentication.currentUser?.email) &
      !nameList.includes(element.username)
    ) {
      nameList.push(element.username);
    } else if (
      (element.userEmail === authentication.currentUser?.email) &
      !nameList.includes(element.userName)
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
      if (
        element.createdAt === timeList[timeList.length - 1] &&
        timeList.length !== 0
      ) {
        filterList.push(element);
      }
    });
    timeList = [];
  });

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

  const [refreshing, setRefreshing] = React.useState(false);
  const [filteredChat, setFilteredChat] = React.useState(filterList);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(async () => {
    const chatCol = collection(db, "chat");
    const chatOverview = await getDocs(chatCol);
    const chatList = chatOverview.docs.map((doc) => doc.data());
    const filteredList = chatList.filter((obj) => {
      return (
        obj.userEmail === authentication.currentUser?.email ||
        obj.email === authentication.currentUser?.email
      );
    });

    let timeList = [];
    let nameList = [];
    let newFilterList = [];
    const arrayList = filteredList.forEach((element) => {
      if (
        (element.email === authentication.currentUser?.email) &
        !nameList.includes(element.username)
      ) {
        nameList.push(element.username);
      } else if (
        (element.userEmail === authentication.currentUser?.email) &
        !nameList.includes(element.userName)
      ) {
        nameList.push(element.userName);
      }
    });
    const secondArray = nameList.forEach((i) => {
      filteredList.forEach((element) => {
        if (element.userName === i || element.username === i) {
          timeList.push(element.createdAt);
          timeList.sort((a, b) => sortingTime(new Date(a), new Date(b)));
        }
      });
      filteredList.forEach((element) => {
        if (
          element.createdAt === timeList[timeList.length - 1] &&
          timeList.length !== 0
        ) {
          newFilterList.push(element);
        }
      });
      timeList = [];
    });
    setFilteredChat(newFilterList);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <SafeArea>
      <Text variant="header">Messages</Text>
      <Container>
        <FlatList
          data={filteredChat}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
