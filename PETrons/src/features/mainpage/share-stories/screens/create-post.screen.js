import React, { useState } from "react";
import { SafeAreaView, View, TextInput, TouchableOpacity, Dimensions, Alert, Modal, Image } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";
import { Spacer } from "../../../../components/spacer/spacer.component";
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { authentication, db } from "../../../../../firebase/firebase-config";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: #ebe6e6;
`;

const Header = styled(View).attrs({
  marginTop: Platform.OS == 'ios' ?
    Dimensions.get("window").height - 850 :
    Dimensions.get("window").height - 670
})`
  justify-content: flex-end;
  height: 60px;
`

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding: 12px;
  text-align: center;
`

const Body = styled.View`
  background-color: white;
  height: 800px;
`

const UserDetails = styled.View`
  padding: 30px;
  flex-direction: row;
`

const Uploads = styled.View`

`

const PostText = styled(TextInput)`
  margin-horizontal: 30px;
  border-radius: 5px;
  border-width: 1px;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.body};
  padding: 10px;
`;

const TopButtons = styled(TouchableOpacity)`
  position: absolute;
  zIndex: 1;
  background-color: #777;
  border-radius: 5px;
  padding: 5px 10px;
  justify-content: center;
  bottom: 10px;
`

const ImageButtons = styled(TouchableOpacity)`
  padding: 10px 20px;
  background-color: #2196f3;
  margin: 20px 30px;
  margin-bottom: 0;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
`

const ImageButtonText = styled(Text)`
  text-align: center;
  color: white;
`

const ModalContainer = styled(View).attrs({
   marginTop: Dimensions.get("window").height - 350
})`
  elevation: 10;
  border-radius: 10px;
  border-width: 1.5px;
  border-color: #e6e6e6;
  background-color: whitesmoke;
  padding-bottom: 150px;
`

export const CreatePostScreen = ({ navigation }) => {
  const pfp = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png';
  const currentUsername = 'testUsername1';
  
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

  const SetData = async () => {
    let userUsername, date;
    let day, month, year, hour, minutes;
    const Snapshot = await getDocs(collection(db, "userinfo"));
    Snapshot.forEach((doc) => {
      if (doc.data().email === authentication.currentUser?.email) {
        userUsername = doc.data().username;
        date = new Date();
        day = date.getDate();
        month = date.getMonth();
        year = date.getFullYear();
        hour = date.getHours();
        minutes = date.getMinutes();
      }
    });
    await addDoc(collection(db, "stories"), {
      date,
      day, 
      month,
      year,
      hour,
      minutes,
      postText,
      postImage,
      email: authentication.currentUser?.email,
      userName: userUsername,
    });
    navigation.goBack()
    const uploadUri = postImage;
    const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    const storage = getStorage();
    const reference = ref(storage, filename);
    const img = await fetch(postImage);
    const bytes = await img.blob();
    await uploadBytes(reference, bytes);
  };

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
            <Avatar.Image
              size={60}
              source={{ uri: pfp }}
            />
            <Spacer size='medium' position='right' />
            <Text>{currentUsername}</Text>
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
              />
            </View>
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