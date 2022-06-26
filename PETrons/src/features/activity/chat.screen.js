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

  const chatInfo = route.params.item;
  const { email, _id, createdAt, text, userName, userEmail, username, user } =
    chatInfo;
    
  useEffect(() => {
    let chatList = [];
    let timeList = [];
    console.log("username" + userName);
    const func = async () => {
      let usersEmail;
      const Snapshot = await getDocs(collection(db, "userinfo"));
      Snapshot.forEach((doc) => {
        if (doc.data().username === userName) {
          usersEmail = doc.data().email;
        }
      });
      console.log(usersEmail);
      const querySnapshot = await getDocs(collection(db, "chat"));
      querySnapshot.forEach((doc) => {
        if (
          (doc.data().userEmail === authentication.currentUser?.email) &
          (doc.data().email === email)
        ) {
          timeList.push(doc.data().createdAt);
          console.log("1");
        } else if (
          (doc.data().email === authentication.currentUser?.email) &
          (doc.data().userEmail === usersEmail)
        ) {
          timeList.push(doc.data().createdAt);
          console.log("2");
        } else if (
          doc.data().email === usersEmail //&
          //(doc.data().userEmail === authentication.currentUser?.email)
        ) {
          timeList.push(doc.data().createdAt);
          console.log("3");
        } else if (
          (doc.data().userEmail === authentication.currentUser?.email) &
          (doc.data().email === userEmail)
        ) {
          timeList.push(doc.data().createdAt);
          console.log("4");
        }
      });
      timeList.sort().reverse();
      console.log(timeList);
      timeList.forEach((element) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().createdAt === element) {
            chatList.push(doc.data());
          }
        });
      });
      console.log(chatList);
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
            color="#2e64e5"
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
            backgroundColor: "#2e64e5",
          },
          left: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
          left: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
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
