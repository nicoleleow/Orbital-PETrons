import React, { useState, useEffect } from "react";
import {
  Text, 
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Alert,
  Dimensions
} from "react-native";
import {
  getStorage,
  ref,
  getDownloadURL
} from "firebase/storage";

import {
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore/lite";

import { Spacer } from "../../../components/spacer/spacer.component";
import { db, authentication, userUsername, getUserName, userImage } from "../../../../firebase/firebase-config";
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
  ImageButtonText
} from "../../mainpage/share-stories/screens/create-post.styles";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const EditPostPage = ({ route, navigation }) => {
  getUserName();
  const details = route.params.storyDetails;
  const { date, hour, minutes, postImage, postText, userName, email, edited, likedUsers, comments } = details;
  
  const [newPostText, setNewPostText] = useState(postText);

  const [pfp, setPfp] = useState(userImage);

  const [url, setUrl] = useState();
  const [pfpUrl, setPfpUrl] = useState();
  useEffect(() => {
    const func = async () => {
      getUserName();
      if (pfp !== "default") {
        const uploadUri = userImage;
        const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
        const storage = getStorage();
        const reference = ref(storage, filename);
        await getDownloadURL(reference).then((x) => {
          setUrl(x);
        });
      }
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

    if (url == undefined || pfpUrl == undefined) {
    func();
    }
  }, []);

  const updateData = async () => {
    const querySnapshot = await getDocs(collection(db, "stories"));
    let documentID;
    querySnapshot.forEach((doc) => {
      if (
        (doc.data().email === email) 
        & (doc.data().date.seconds === date.seconds)
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
      userName,
      edited: (newPostText !== postText ? true : false),
      likedUsers,
      comments
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
        <View style={{ backgroundColor: '#f0f0f0' }}>
          <Body>
            <UserDetails>
              {pfp === "default" && (
              <Avatar.Image
                backgroundColor="white"
                source={require("../../../../assets/default_profilepic.png")}
                size={60}
              />
            )}
            {pfp !== "default" && (
              <Avatar.Image
                backgroundColor="white"
                source={{ uri: pfpUrl }}
                size={60}
              />
            )}
              <Spacer size='medium' position='right' />
              <Text>{userUsername}</Text>
            </UserDetails>
            <ScrollView>
              <Uploads>
                {postImage && (
                  <View>
                    <Image
                    source={{ uri: postImage }}
                    style={{ resizeMode: "contain", width: 360, height: 220, alignSelf: 'center'}}
                    />
                    <Spacer size='large' />
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
                  style={{backgroundColor: 'white'}}
                />
                <Spacer size='xLarge' />
                <View style={{ height: 200 }}>
                  <TopButtons onPress={confirmEditAlert}  style={{
                    width: Dimensions.get("window").width - 60,
                    backgroundColor: '#2e64e5'
                  }}>
                    <ImageButtonText>Done</ImageButtonText>
                  </TopButtons>
                </View>
                <Spacer size='large' />
              </Uploads>
            </ScrollView>
          </Body>
        </View>
      </SafeArea>
    </DismissKeyboard>
  )
}