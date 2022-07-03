import React, { useState, useEffect } from "react";
import {
  Text, 
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";

import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  updateDoc,
} from "firebase/firestore/lite";
import { Months } from "../../mainpage/share-stories/components/stories-post-card.styles";

import { Spacer } from "../../../components/spacer/spacer.component";
import { db, authentication, userUsername, getUserName } from "../../../../firebase/firebase-config";
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
} from "../../mainpage/share-stories/screens/create-post.styles";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const EditPostPage = ({ route, navigation }) => {
  getUserName();
  const details = route.params.storyDetails;
  const { date, hour, minutes, postImage, postText, userName, email } = details;

  const [newPostText, setNewPostText] = useState(postText);

  const pfp = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png';

  const formattedDateWhole = new Date(date.seconds * 1000 + 28800 * 1000)
  const day = formattedDateWhole.getDate().toString();
  const month = Months[formattedDateWhole.getMonth()];
  const year = formattedDateWhole.getFullYear().toString();
  const formattedDate = day + ' ' + month + ' ' + year;

  const timeOfDay = hour > 12 ? 'PM' : 'AM'
  const timeTwelveHour = hour > 12 ? hour - 12 : (hour === 0) ? hour + 12 : hour
  const formattedHour = timeTwelveHour < 10 ? '0' + timeTwelveHour.toString() : timeTwelveHour;
  const formattedMinutes = (minutes < 10) ? ('0' + minutes.toString()) : minutes.toString();
  const formattedTime = formattedHour + ':' + formattedMinutes + ' ' + timeOfDay;

  const [url, setUrl] = useState();
  useEffect(() => {
  const func = async () => {
    if (postImage !== null) {
      const uploadUri = postImage;
  
      const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
      const storage = getStorage();
      const reference = ref(storage, filename);
      await getDownloadURL(reference).then((x) => {
        setUrl(x);
      });
    }
  };

    if (url == undefined) {
    func();
    }
  }, []);

  const updateData = async () => {
    const querySnapshot = await getDocs(collection(db, "stories"));
    let documentID;
    querySnapshot.forEach((doc) => {
      if (
        (doc.data().email === email) &
        (doc.data().date.seconds === date.seconds)
      ) {
        documentID = doc.id;
      }
    });
    const editedDoc = doc(db, "stories", documentID);
    await setDoc(editedDoc, {
      date,
      hour,
      minutes,
      postImage,
      postText: newPostText,
      email,
      userName
    });
    navigation.goBack();
  };

  const confirmEditAlert = () =>
    Alert.alert(
      "Submit Changes?",
      "Are you sure you want to submit these changes?",
      [
        {
          text: "Cancel",
        },
        { text: "Yes", onPress: updateData },
      ]
    );
  
  const cancelEditAlert = () => {
    Alert.alert(
      "Remove Edits?",
      "Are you sure you want to leave? \nNo edits will be made.",
        [
          {
            text: "Continue Editing"
          },
          {
            text: "Leave",
            onPress: async () => {
              navigation.goBack();
              setNewPostText(postText);
            },
          },
        ]
      )
  }

  return (
    <DismissKeyboard>
      <SafeArea>
        <Header>
          <TopButtons onPress={cancelEditAlert} style={{left: 15}}>
            <ImageButtonText>Cancel</ImageButtonText>
          </TopButtons>
          <TopButtons onPress={confirmEditAlert} style={{right: 15}}>
            <ImageButtonText>Done</ImageButtonText>
          </TopButtons>
          <HeaderText>Edit Caption</HeaderText>
        </Header>
        <View style={{backgroundColor: 'white'}}>
          <Body>
            <UserDetails>
              <Avatar.Image
                size={60}
                source={{ uri: pfp }}
              />
              <Spacer size='medium' position='right' />
              <Text>{userUsername}</Text>
            </UserDetails>
            <Uploads>
              {postImage && (
                <View>
                  <Image
                  source={{ uri: postImage }}
                  style={{ resizeMode: "contain", width: 360, height: 220, alignSelf: 'center'}}
                  />
                  <Spacer size='medium' />
                </View>
              )}
              <PostText
                placeholder="Share your story or ask a question (max 300 characters)"
                textContentType="none"
                keyboardType="default"
                value={newPostText}
                onChangeText={setNewPostText}
                maxLength={300} 
                multiline={true}
              />
              <Spacer size='large' />
            </Uploads>
          </Body>
        </View>
      </SafeArea>
    </DismissKeyboard>
  )
}