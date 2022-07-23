import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  updateDoc,
  addDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore/lite";

import { authentication, db } from "../../../firebase/firebase-config";

export const ChatPage = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  let chatInfo;
  if (route.params.item.email === undefined) {
    chatInfo = route.params.item[1];
  } else {
    chatInfo = route.params.item;
  }
  const { email, _id, createdAt, text, userName, userEmail, username, user } =
    chatInfo;

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

  useEffect(() => {
    let chatList = [];
    let timeList = [];
    const func = async () => {
      let usersEmail;
      const Snapshot = await getDocs(collection(db, "userinfo"));
      Snapshot.forEach((doc) => {
        if (doc.data().username === username) {
          usersEmail = doc.data().email;
        }
      });
      const querySnapshot = await getDocs(collection(db, "chat"));
      querySnapshot.forEach((doc) => {
        if (email !== undefined) {
          //scenario 1: user 1 send chat to user 2, appear in user 1 chat
          if (doc.data().userEmail === authentication.currentUser?.email) {
            if (doc.data().email === email) {
              timeList.push(doc.data().createdAt);
            } else if (
              (doc.data().userEmail === email) &
              (doc.data().userName === username)
            ) {
              timeList.push(doc.data().createdAt);
            }
            //scenario 2: user 1 send chat to user 2, appear in user 2 chat
          } else if (doc.data().email === authentication.currentUser?.email) {
            if (doc.data().userEmail === usersEmail) {
              timeList.push(doc.data().createdAt);
            } else if (
              (doc.data().email === usersEmail) &
              (doc.data().username === userName)
            ) {
              timeList.push(doc.data().createdAt);
            }
          }
          if (username === undefined) {
            if (
              (doc.data().email === authentication.currentUser?.email) &
              (doc.data().username === userName)
            ) {
              timeList.push(doc.data().createdAt);
            }
          }
        } else {
          if (
            (doc.data().userEmail === authentication.currentUser?.email) &
            (doc.data().userName === userName)
          ) {
            timeList.push(doc.data().createdAt);
          }
        }
      });
      // timeList.sort().reverse();
      timeList.sort((a, b) => sortingTime(new Date(a), new Date(b))).reverse();
      timeList.forEach((element) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().createdAt === element) {
            chatList.push(doc.data());
          }
        });
      });
      setMessages(chatList);
    };
    func();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const Snapshot = await getDocs(collection(db, "userinfo"));
    let userUsername;
    Snapshot.forEach((doc) => {
      if (doc.data().email === authentication.currentUser?.email) {
        userUsername = doc.data().username;
      }
    });
    const { _id, createdAt, user, text } = messages[0];
    if (userName != userUsername) {
      await addDoc(collection(db, "chat"), {
        _id,
        createdAt: Date(createdAt),
        user,
        text,
        email: email,
        userEmail: authentication.currentUser?.email,
        userName: userName,
        username: userUsername,
      });
    } else {
      await addDoc(collection(db, "chat"), {
        _id,
        createdAt: Date(createdAt),
        user,
        text,
        email: userEmail,
        userEmail: authentication.currentUser?.email,
        userName: username,
        username: userUsername,
      });
    }
    [];
  });

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#ffae42"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#f9e2ae",
          },
          left: {
            backgroundColor: "snow",
          },
        }}
        textStyle={{
          right: {
            color: "black",
          },
          left: {
            color: "black",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#f9e2ae" />;
  };

  return (
      <GiftedChat
        messages={messages}
        timeTextStyle={{ left: { color: "grey" }, right: { color: "grey" } }}
        showUserAvatar={false}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: authentication.currentUser?.email,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};
