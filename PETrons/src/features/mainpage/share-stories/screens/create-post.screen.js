import React, { useState, useEffect } from "react";
import { View, Alert, Modal, Image, ScrollView } from "react-native";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

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
import { authentication, db, userUsername, userImage, getUserName } from "../../../../../firebase/firebase-config";

export const CreatePostScreen = ({ navigation }) => {
  const [pfp, setPfp] = useState(userImage);

  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);

  const [imageModalVisible, setImageModalVisible] = useState(false);

  const chooseFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPostImage(result.uri);
      setImageModalVisible(!imageModalVisible)
    }
  };

  const takePhotoFromCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setPostImage(result.uri);
      setImageModalVisible(!imageModalVisible)
    }
  };

  const removeImage = () => {
    if (postImage === null) {
      Alert.alert(
        "No Image Uploaded Yet."
      );
    } else {
      setPostImage(null);
    }
  }

  const cancelPostAlert = () => {
    Alert.alert(
      "Delete Post?",
      "Are you sure you want to leave? \nThe post will be deleted.",
        [
          {
            text: "Continue Writing Post"
          },
          {
            text: "Leave and Delete Post",
            onPress: async () => {
              navigation.goBack()
              setPostText('');
            },
          },
        ]
      )
  }

  const confirmPostAlert = () => {
    if (postImage === null && postText === "") {
      Alert.alert(
        "Empty Post",
        "Please upload an image or input some text.\nIf you wish to delete this post, click on the 'Cancel' button."
      )
    } else {
      Alert.alert(
        "Upload Post?",
        "Are you sure you want to upload the post?",
          [
            {
              text: "Continue Writing Post",
            },
            {
              text: "Upload Post",
              onPress: SetData
            },
          ]
        )
    }
  }

  const SetData = async () => {
    let userUsername, date;
    const Snapshot = await getDocs(collection(db, "userinfo"));
    Snapshot.forEach((doc) => {
      if (doc.data().email === authentication.currentUser?.email) {
        userUsername = doc.data().username;
        date = new Date();
        hour = date.getHours();
        minutes = date.getMinutes();
      }
    });
    await addDoc(collection(db, "stories"), {
      date,
      hour,
      minutes,
      postText,
      postImage,
      email: authentication.currentUser?.email,
      userName: userUsername,
      edited: false,
      numLikes: 0
    });
    navigation.goBack()
    if (postImage !== null) {
      const uploadUri = postImage;
      const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
      const storage = getStorage();
      const reference = ref(storage, filename);
      const img = await fetch(postImage);
      const bytes = await img.blob();
      await uploadBytes(reference, bytes);
    }
  };
  
  const [url, setUrl] = useState();
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
    };
    if (url == undefined) {
      func();
    }
  }, []);


  return (
    <SafeArea>
      <Header>
        <TopButtons onPress={cancelPostAlert} style={{left: 15}}>
          <ImageButtonText>Cancel</ImageButtonText>
        </TopButtons>
        <TopButtons onPress={confirmPostAlert} style={{right: 15}}>
          <ImageButtonText>Post</ImageButtonText>
        </TopButtons>
        <HeaderText>Create a Post</HeaderText>
      </Header>
      <View style={{backgroundColor: 'white'}}>
        <Body>
          <UserDetails>
            {pfp === "default" && (
            <Avatar.Image
              backgroundColor="white"
              source={require("../../../../../assets/default_profilepic.png")}
              size={60}
            />
            )}
            {pfp !== "default" && (
              <Avatar.Image
                backgroundColor="white"
                source={{ uri: url }}
                size={60}
              />
            )}
            <Spacer size='large' position='right' />
            <Text style={{paddingTop: 5}}>{userUsername}</Text>
          </UserDetails>
          <Uploads>
            <ScrollView>
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
                value={postText}
                onChangeText={setPostText}
                maxLength={300} 
                multiline={true}
              />
              <Spacer size='large' />
              <View style={{alignItems: 'flex-end', right: 30}}>
                <Icon2
                  name="camera-alt"
                  size={30} color={'#777'}
                  onPress={() => setImageModalVisible(!imageModalVisible)}
                  style={{marginBottom: 350}}
                />
              </View>
              <View style={{ backgroundColor: 'white', height: 400 }}>
              </View>
            </ScrollView>
            <Modal
              animationType="slide"
              transparent={true}
              visible={imageModalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setImageModalVisible(!imageModalVisible);
              }}
            >
              <ModalContainer>
                <HeaderText style={{ marginTop:10 }}>Upload An Image</HeaderText>
                <ImageButtons onPress={takePhotoFromCamera}>
                  <Icon2
                    name="camera-alt"
                    size={20} color={'white'}
                  />
                  <Spacer size='medium' position='right' />
                  <ImageButtonText>Take a Photo</ImageButtonText>
                </ImageButtons>
                <ImageButtons onPress={chooseFromLibrary}>
                  <Icon2
                    name="photo-library"
                    size={20} color={'white'}
                  />
                  <Spacer size='medium' position='right' />
                  <ImageButtonText>Upload Photo From Gallery</ImageButtonText>
                </ImageButtons>
                <ImageButtons onPress={removeImage}>
                  <ImageButtonText>Remove Selected Image</ImageButtonText>
                </ImageButtons>
                <ImageButtons onPress={() => setImageModalVisible(!imageModalVisible)}>
                  <ImageButtonText>Cancel</ImageButtonText>
                </ImageButtons>
              </ModalContainer>  
            </Modal>
          </Uploads>
        </Body>
      </View>
    </SafeArea>
  )


  }