import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import Render from "react-native-web/dist/cjs/exports/render";
import * as ImagePicker from "expo-image-picker";

import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer/spacer.component";

const Container = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[1]};
  padding-top: 10px;
  align-items: center;
  justify-content: center;
`;

const PutUpAdoptionPageHeader = styled(Text)`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.monospace};
  padding-top: 40px;
`;

const FormButton = styled(Button).attrs({
  color: colors.button.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  margin-top: 10px;
`;

const SubmitFormButton = styled(Button).attrs({
  color: colors.button.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  margin-bottom: 20px;
`;

const Background = styled.View`
  background-color: orange;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

const Inputs = styled(TextInput)`
  width: 300px;
  height: 45px;
`;

const DescriptionInput = styled(TextInput)`
  width: 300px;
  height: 90px;
  textalignvertical: "top";
`;

const RenderContentContainer = styled(View)`
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

const RenderContentButton = styled(TouchableOpacity)`
  padding: 13px;
  border-radius: 10px;
  background-color: #ff6347;
  align-items: center;
  margin-vertical: 7px;
`;

const RenderContentButtonTitle = styled(Text)`
  font-size: 17px;
  font-weight: bold;
  color: white;
`;

export const PutUpAdoptionPage = ({ navigation }) => {
  const [organisationType, setOrganisationType] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const renderContent = () => (
    <RenderContentContainer>
      <View style={{ alignItems: "center" }}>
        <RenderContentTitle>Upload Photo</RenderContentTitle>
        <RenderContentSubtitle>Choose Your Pet Image</RenderContentSubtitle>
      </View>
      <RenderContentButton onPress={takePhotoFromCamera}>
        <RenderContentButtonTitle>Take Photo</RenderContentButtonTitle>
      </RenderContentButton>
      <RenderContentButton onPress={chooseFromLibrary}>
        <RenderContentButtonTitle>Choose From Library</RenderContentButtonTitle>
      </RenderContentButton>
      <RenderContentButton onPress={() => sheetRef.current.snapTo(2)}>
        <RenderContentButtonTitle>Cancel</RenderContentButtonTitle>
      </RenderContentButton>
    </RenderContentContainer>
  );

  const sheetRef = React.useRef(null);

  const chooseFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      sheetRef.current.snapTo(2);
    }
  };

  const takePhotoFromCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      sheetRef.current.snapTo(2);
    }
  };

  return (
    <Background>
      <PutUpAdoptionPageHeader>
        Fill in your pet details:
      </PutUpAdoptionPageHeader>
      <BottomSheet
        initialSnap={2}
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
      <ScrollView>
        <Container>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <FormButton
            icon="image"
            mode="contained"
            onPress={() => sheetRef.current.snapTo(0)}
          >
            Upload Image
          </FormButton>
          <Spacer size="large">
            <Inputs
              label="Organisation"
              value={organisationType}
              textContentType="none"
              keyboardType="default"
              autoCapitalize="none"
              onChangeText={(text) => setOrganisationType(text)}
            />
          </Spacer>
          <Spacer size="large">
            <Inputs
              label="Pet Name"
              value={name}
              textContentType="name"
              keyboardType="default"
              autoCapitalize="none"
              onChangeText={(text) => setName(text)}
            />
          </Spacer>
          <Spacer size="large">
            <Inputs
              label="Animal Type"
              value={type}
              textContentType="none"
              keyboardType="default"
              autoCapitalize="none"
              onChangeText={(text) => setType(text)}
            />
          </Spacer>
          <Spacer size="large">
            <Inputs
              label="Animal Breed"
              value={breed}
              textContentType="none"
              keyboardType="default"
              autoCapitalize="none"
              onChangeText={(text) => setBreed(text)}
            />
          </Spacer>
          <Spacer size="large">
            <Inputs
              label="Pet Gender"
              value={gender}
              textContentType="none"
              keyboardType="default"
              autoCapitalize="none"
              onChangeText={(text) => setGender(text)}
            />
          </Spacer>
          <Spacer size="large">
            <Inputs
              label="Age"
              value={age}
              textContentType="none"
              keyboardType="number-pad"
              onChangeText={(text) => setAge(text)}
            />
          </Spacer>
          <Spacer size="large">
            <Inputs
              label="Price"
              value={price}
              textContentType="none"
              keyboardType="number-pad"
              onChangeText={(text) => setPrice(text)}
            />
          </Spacer>
          <Spacer size="large">
            <DescriptionInput
              label="Short Description..."
              value={description}
              textContentType="none"
              autoCapitalize="none"
              keyboardType="default"
              multiline={true}
              onChangeText={(text) => setDescription(text)}
            />
          </Spacer>
        </Container>
      </ScrollView>
      <Spacer size="large">
        <SubmitFormButton mode="contained" onPress={() => navigation.goBack()}>
          Confirm
        </SubmitFormButton>
      </Spacer>
    </Background>
  );
};
