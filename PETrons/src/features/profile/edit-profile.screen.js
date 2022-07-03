import React, { useState } from "react";
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
} from "react-native";
import styled from "styled-components/native";
import {
  authentication,
  userUsername,
} from "../../../firebase/firebase-config";
import { Text } from "../../components/typography/text.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const ProfilePicture = styled(View)`
  margin-top: ${(props) => props.theme.space[6]};
  height: 100px;
  width: 100px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const ImageText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-family: ${(props) => props.theme.fonts.monospace};
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[5]};
  text-align: center;
  text-decoration-line: underline;
`;

const FieldInput = styled(TextInput)`
  margin-left: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
  border-bottom-width: 1px;
  border-bottom-color: whitesmoke;
  padding-bottom: 5px;
  width: 250px;
`;

const FieldText = styled(Text)`
  margin-left: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
  border-bottom-width: 1px;
  border-bottom-color: whitesmoke;
  padding-bottom: 5px;
`;

const UserInfoSection = styled.View`
  padding-horizontal: 30px;
  flex-direction: row;
  margin-top: 15px;
`;

const RenderContentContainer = styled(View).attrs({
  backgroundColor: "white",
  marginTop: Dimensions.get("window").height - 350,
})`
  border-width: 1.5px;
  border-color: #e6e6e6;
  border-radius: 10px;
  background-color: white;
  height: 350px;
  padding: 20px;
`;

const RenderContentTitle = styled(Text)`
  font-size: 27px;
  height: 35px;
`;

const RenderContentSubtitle = styled(Text)`
  font-size: 14px;
  color: gray;
  height: 30px;
  margin-bottom: 10px;
`;

const RenderContentButtonTitle = styled(Text)`
  font-size: 17px;
  font-weight: bold;
  color: white;
`;

const RenderContentButton = styled(TouchableOpacity)`
  padding: 13px;
  border-radius: 10px;
  background-color: #2196f3;
  align-items: center;
  margin-vertical: 7px;
`;

export const EditProfilePage = () => {
  const [modalVisible, setModalVisible] = useState(false);

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
    }
  };

  return (
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
            <RenderContentSubtitle>Choose Your Pet Image</RenderContentSubtitle>
          </View>
          <RenderContentButton onPress={takePhotoFromCamera}>
            <RenderContentButtonTitle>Take Photo</RenderContentButtonTitle>
          </RenderContentButton>
          <RenderContentButton onPress={chooseFromLibrary}>
            <RenderContentButtonTitle>
              Choose From Library
            </RenderContentButtonTitle>
          </RenderContentButton>
          <RenderContentButton onPress={() => setModalVisible(!modalVisible)}>
            <RenderContentButtonTitle>Cancel</RenderContentButtonTitle>
          </RenderContentButton>
        </RenderContentContainer>
      </Modal>
      <View style={{ alignItems: "center" }}>
        <ProfilePicture>
          <ImageBackground
            source={require("../../../assets/postIt_icon.png")}
            style={{ height: 100, width: 100 }}
            imageStyle={{ borderRadius: 15 }}
            backgroundColor="black"
          ></ImageBackground>
        </ProfilePicture>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <ImageText>Change profile photo</ImageText>
        </Pressable>
      </View>
      <UserInfoSection>
        <Text style={{ width: 80 }}>Email:</Text>
        <FieldText>{authentication.currentUser?.email}</FieldText>
      </UserInfoSection>
      {/* <UserInfoSection>
        <Text style={{ width: 80 }}>Password:</Text>
        <FieldText>Password</FieldText>
      </UserInfoSection> */}
      <UserInfoSection>
        <Text style={{ width: 80 }}>Username:</Text>
        <FieldInput
          placeholder={userUsername}
          placeholderTextColor="black"
          autoCorrect={false}
        ></FieldInput>
      </UserInfoSection>
    </SafeArea>
  );
};
