import React, { useState } from "react";
import { SafeAreaView, View, TextInput, Modal, TouchableOpacity, Dimensions, Alert } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component"
import { Spacer } from "../../../components/spacer/spacer.component";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { StoriesPostCard } from "./components/stories-post-card.component";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const UploadPostContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
  background-color: white;
  border-radius: 7px;
  padding-horizontal: 20px;
  margin-horizontal: ${(props) => props.theme.space[4]};
`

const ModalContent = styled(View).attrs({
  elevation: 10,
  height: Dimensions.get('window').height
})`
  background-color: white;
`

const ModalHeader = styled.View`
  justify-content: center;
  background-color: #ebe6e6;
  height: 50px;
`

const ModalBody = styled.View`
  padding-bottom: 16px;
`

const ModalUserDetails = styled.View`
  padding: 30px;
  flex-direction: row;
`

const ModalUploads = styled.View`

`

const ModalPostText = styled(TextInput)`
  margin-horizontal: 30px;
  border-radius: 5px;
  border-width: 1px;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.body};
  padding: 10px;
`;

const ModalTopButtons = styled(TouchableOpacity)`
  position: absolute;
  zIndex: 1;
  background-color: #777;
  border-radius: 5px;
  padding: 5px 10px;
  justify-content: center;
`

const ModalImageButtons = styled(TouchableOpacity)`
  padding: 10px 20px;
  background-color: #2196f3;
  margin: 20px 30px;
  margin-bottom: 0;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
`

const ModalImageButtonText = styled(Text)`
  text-align: center;
  color: white;
`

export const StoriesPage = () => {
  const pfp = 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png';
  const username = 'testUsername1'
  
  const [modalVisible, setModalVisible] = useState(false);
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState('');

  const chooseFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setPostImage(result.uri);
      setModalVisible(!modalVisible)
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
      setModalVisible(!modalVisible)
    }
  };

  const cancelPostAlert = () => {
    Alert.alert(
      "Delete Post?",
      "Are you sure you want to leave? \nThe post will be deleted.",
        [
          {
            text: "Cancel Post",
            onPress: async () => {
              setPostText('');
              setModalVisible(!modalVisible);
            },
          },
          { text: "Continue Post", onPress: () => setModalVisible(modalVisible) },
        ]
      )
  }

  const confirmPostAlert = () => {
    Alert.alert(
      "Upload Post?",
      "Are you sure you want to upload the post?",
        [
          {
            text: "Continue Writing",
            onPress: () => setModalVisible(modalVisible),
          },
          {
            text: "Upload Post",
            onPress: () => console.log("make the post, set data")
          },
        ]
      )
  }

  return (
    <SafeArea>

      <View>
        <Text variant='header'>Share Stories</Text>
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
          <ModalContent>
            <ModalHeader>
              <ModalTopButtons onPress={cancelPostAlert} style={{left: 10}}>
                <ModalImageButtonText>Cancel</ModalImageButtonText>
              </ModalTopButtons>
              <ModalTopButtons onPress={confirmPostAlert} style={{right: 10}}>
                <ModalImageButtonText>Post</ModalImageButtonText>
              </ModalTopButtons>
              <Text variant='title' style={{ fontSize: 20 }}>Create a Post</Text>
            </ModalHeader>
            <ModalBody>
              <ModalUserDetails>
                <Avatar.Image
                  size={60}
                  source={{ uri: pfp }}
                />
                <Spacer size='medium' position='right' />
                <Text>{username}</Text>
              </ModalUserDetails>
              <ModalUploads>
                <ModalPostText
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
                  />
                </View>
                <ModalImageButtons onPress={takePhotoFromCamera}>
                  <Icon2
                    name="camera-alt"
                    size={20} color={'white'}
                  />
                  <Spacer size='medium' position='right' />
                  <ModalImageButtonText>Take a Photo</ModalImageButtonText>
                </ModalImageButtons>
                <ModalImageButtons onPress={chooseFromLibrary}>
                  <Icon2
                    name="photo-library"
                    size={20} color={'white'}
                  />
                  <Spacer size='medium' position='right' />
                  <ModalImageButtonText>Upload Photo From Gallery</ModalImageButtonText>
                </ModalImageButtons>
              </ModalUploads>
            </ModalBody>
          </ModalContent>
        </Modal>
        <UploadPostContainer>
          <Avatar.Image size={40} source={{ uri: pfp }} color="green" />
          <Spacer size='large' position='right' />
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ width: 300, height: 50, justifyContent: 'center'}}>
            <Text style={{color: '#777'}}>Share your story...</Text>
          </TouchableOpacity>  
        </UploadPostContainer>

        <StoriesPostCard />
      </View>
      
    </SafeArea>
  )
};
