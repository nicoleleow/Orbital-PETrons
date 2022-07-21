import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import * as ImagePicker from "expo-image-picker";
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

import {
  authentication,
  userImage,
  userUsername,
  db,
} from "../../../../../firebase/firebase-config";
import { Text } from "../../../../components/typography/text.component";
import {
  RenderContentButton,
  RenderContentButtonTitle,
  RenderContentContainer,
  RenderContentSubtitle,
  RenderContentTitle,
  ProfilePicture,
  FieldInput,
  ImageText,
  FieldText,
  UserInfoSection,
  ChangePasswordButton,
  DoneButton,
  PressableText,
} from "./edit-profile.style";
import { colors } from "../../../../infrastructure/theme/colors";
import { SafeArea } from "../../../../components/utility/safe-area.component";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const EditProfilePage = ({ navigation }) => {
  const [userName, setUserName] = useState(userUsername);
  const [profileImage, setImage] = useState(userImage);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [url, setUrl] = useState();
  useEffect(() => {
    const func = async () => {
      if (profileImage !== "default") {
        const uploadUri = profileImage;
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

  const chooseFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setModalVisible(!modalVisible);
      setModalOpen(true);
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
      setImage(result.uri);
      setModalVisible(!modalVisible);
      setModalOpen(true);
    }
  };

  const removeProfilePicture = async () => {
    const uploadUri = profileImage;
    const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    const storage = getStorage();
    const reference = ref(storage, filename);
    deleteObject(reference)
      .then(() => {})
      .catch((error) => {});
    setImage("default");
    setModalVisible(!modalVisible);
  };

  const confirmUpdate = async () => {
    const querySnapshot = await getDocs(collection(db, "userinfo"));
    let documentID, favourites, likedPosts;
    querySnapshot.forEach((doc) => {
      if (doc.data().email === authentication.currentUser?.email) {
        documentID = doc.id;
        favourites = doc.data().favourites;
        likedPosts = doc.data().likedPosts;
      }
    });
    const editedDoc = doc(db, "userinfo", documentID);
    await setDoc(editedDoc, {
      email: authentication.currentUser?.email,
      profilepic: profileImage,
      username: userName,
      favourites,
      likedPosts,
    });
    if (profileImage !== "default") {
      const newUploadUri = profileImage;
      const newFilename = newUploadUri.substring(
        newUploadUri.lastIndexOf("/") + 1
      );
      const storage = getStorage();
      const newReference = ref(storage, newFilename);
      const img = await fetch(profileImage);
      const bytes = await img.blob();
      await uploadBytes(newReference, bytes);
    }
    navigation.navigate("ProfilePage");
  };

  const DoneAlert = () =>
    Alert.alert(
      "Confirm profile update?",
      "Are you sure you want to make the following changes?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Yes",
          onPress: confirmUpdate,
        },
      ]
    );

  return (
    <DismissKeyboard>
      <SafeArea>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <RenderContentContainer>
            <View style={{ alignItems: "center" }}>
              <RenderContentTitle>Upload Photo</RenderContentTitle>
              <RenderContentSubtitle>
                Choose Your Profile Picture
              </RenderContentSubtitle>
            </View>
            <RenderContentButton onPress={takePhotoFromCamera}>
              <RenderContentButtonTitle>Take Photo</RenderContentButtonTitle>
            </RenderContentButton>
            <RenderContentButton onPress={chooseFromLibrary}>
              <RenderContentButtonTitle>
                Choose From Library
              </RenderContentButtonTitle>
            </RenderContentButton>
            <RenderContentButton onPress={removeProfilePicture}>
              <RenderContentButtonTitle>
                Remove Profile Picture
              </RenderContentButtonTitle>
            </RenderContentButton>
            <RenderContentButton onPress={() => setModalVisible(!modalVisible)}>
              <RenderContentButtonTitle>Cancel</RenderContentButtonTitle>
            </RenderContentButton>
          </RenderContentContainer>
        </Modal>
        <View
          style={{
            alignItems: "center",
            paddingBottom: 30,
          }}
        >
          <ProfilePicture>
            {profileImage === "default" && (
              <ImageBackground
                source={require("../../../../../assets/default_profilepic.png")}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
                backgroundColor="white"
              ></ImageBackground>
            )}
            {profileImage !== "default" && (
              <ImageBackground
                source={{ uri: modalOpen === false ? url : profileImage }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
                backgroundColor="white"
              ></ImageBackground>
            )}
          </ProfilePicture>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <PressableText> Change profile photo </PressableText>
          </Pressable>
        </View>
        <ScrollView>
          <UserInfoSection>
            <Text style={{ width: 85 }}>Email:</Text>
            <FieldText>{authentication.currentUser?.email}</FieldText>
          </UserInfoSection>
          <UserInfoSection style={{ alignItems: "center" }}>
            <Text style={{ width: 85 }}>Username:</Text>
            <FieldInput
              value={userName}
              autoCorrect={false}
              onChangeText={(text) => setUserName(text)}
            ></FieldInput>
          </UserInfoSection>
          <View style={{ alignItems: "center" }}>
            <ChangePasswordButton
              labelStyle={{ color: colors.button.text }}
              icon="key"
              mode="contained"
              onPress={() => navigation.navigate("Change Password")}
            >
              Change Password
            </ChangePasswordButton>
            <DoneButton
              labelStyle={{ color: colors.button.text }}
              icon="sticker-check-outline"
              mode="contained"
              onPress={DoneAlert}
            >
              Done
            </DoneButton>
          </View>
        </ScrollView>
      </SafeArea>
    </DismissKeyboard>
  );
};
