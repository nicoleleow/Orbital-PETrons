import React, { useState, useEffect, useRef } from "react";
import { View, Alert, Modal, Image, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native";
import styled from "styled-components";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from "react-native-paper";

import {
  SafeArea,
  Header,
  HeaderText,
  Body,
  UserDetails,
  Uploads,
  PostText,
  TopButtons,
  ImageButtons,
  ImageButtonText,
  ModalContainer
} from "./create-post.styles";

import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { authentication, db, userUsername } from "../../../../../firebase/firebase-config";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const CommentTextInput = styled(TextInput)`
  border-width: 1px;
  border-color: #e6e6e6;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.body};
  padding: 10px;
`;

const CommentBubble = styled(View)`
  background-color: #2e64e5
  
`
export const CommentsScreen = ({ navigation }) => {
  const [inputComment, setInputComment] = useState('');

  // const SetData = async () => {
  //   let userUsername, date;
  //   const Snapshot = await getDocs(collection(db, "userinfo"));
  //   Snapshot.forEach((doc) => {
  //     if (doc.data().email === authentication.currentUser?.email) {
  //       userUsername = doc.data().username;
  //       date = new Date();
  //       hour = date.getHours();
  //       minutes = date.getMinutes();
  //     }
  //   });
  //   await addDoc(collection(db, "stories"), {
  //     date,
  //     hour,
  //     minutes,
  //     InputComment,
  //     postImage,
  //     email: authentication.currentUser?.email,
  //     userName: userUsername,
  //     edited: false,
  //     likedUsers: []
  //   });
  //   navigation.goBack()
  //   if (postImage !== null) {
  //     const uploadUri = postImage;
  //     const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
  //     const storage = getStorage();
  //     const reference = ref(storage, filename);
  //     const img = await fetch(postImage);
  //     const bytes = await img.blob();
  //     await uploadBytes(reference, bytes);
  //   }
  // };
  
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = event => setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
    keyboardDidHideListener.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);
  
  return (
    <DismissKeyboard>
      <SafeArea>
        <Header>
          <HeaderText>Comments</HeaderText>
        </Header>
        <ScrollView style={{backgroundColor: 'white'}}>
          <Body style={{ backgroundColor: 'lightyellow', height: Dimensions.get('window').height - 200 }}>
            <Text> hello</Text>
            <CommentBubble>
              <Text>comment 1</Text>
            </CommentBubble>
            <View
              style={{
                justifyContent: 'flex-end',
                position: 'absolute',
                bottom: keyboardOffset,
                backgroundColor: 'lightgreen',
                width: Dimensions.get('window').width
              }}>
              <Icon
                name="send-circle"
                style={{ position: 'absolute', right: 5 , top: 5}}
                size={32}
                color="#2e64e5"
              />
              <CommentTextInput
                placeholder="Write a comment..."
                textContentType="none"
                keyboardType="default"
                value={inputComment}
                onChangeText={setInputComment}
                maxLength={300} 
                multiline={true}
              />
            </View>
          </Body>
        </ScrollView>
      </SafeArea>
    </DismissKeyboard>
  )
 }