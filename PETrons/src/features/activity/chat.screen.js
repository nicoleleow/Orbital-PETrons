import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { authentication, db } from "../../../firebase/firebase-config";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  updateDoc,
  addDoc,
} from "firebase/firestore/lite";

export const ChatPage = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);

  const chatInfo = route.params.item;
  const { email, id, messageText, messageTime, userName, userEmail } = chatInfo;
  useEffect(() => {
    setMessages([
      {
        _id: authentication.currentUser?.email,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
        },
      },
      {
        _id: 2,
        text: "Hello world",
        createdAt: new Date(),
        user: {
          _id: authentication.currentUser?.email,
          name: "React Native",
        },
      },
    ]);
  }, []);

  // useEffect(() => {
  //   const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
  //     const messagesFirestore = querySnapshot
  //       .docChanges()
  //       .filter(({ type }) => type === "added")
  //       .map(({ doc }) => {
  //         const message = doc.data();
  //         return { ...message, createdAt: message.createdAt.toDate() };
  //       })
  //       .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  //     appendMessages(messagesFirestore);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // const appendMessages = useCallback(
  //   (messages) => {
  //     setMessages((previousMessages) =>
  //       GiftedChat.append(previousMessages, messages)
  //     );
  //   },
  //   [messages]
  // );

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const querySnapshot = await getDocs(collection(db, "chat"));
    let addToChatList = true;
    querySnapshot.forEach((doc) => {
      //for from pet adoption page
      if (
        (doc.data().email === email) &
        (doc.data().userEmail === authentication.currentUser?.email)
      ) {
        addToChatList = false;
      }
      // for from message page
      // if (
      //   (doc.data().contactEmail === contactEmail) &
      //   (doc.data().userEmail === userEmail)
      // ) {
      //   addToChatList = false;
      // }
    });
    if (addToChatList) {
      await addDoc(collection(db, "chat"), {
        //for from pet adoption page
        email: email,
        userEmail: authentication.currentUser?.email,
        // for from message page
        // contactEmail: contactEmail,
        // userEmail: userEmail,
      });
      // console.log("added");
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
        }}
        textStyle={{
          right: {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
