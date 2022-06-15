import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import Render from "react-native-web/dist/cjs/exports/render";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore/lite";

import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer/spacer.component";
import { authentication, db } from "../../../../firebase/firebase-config";
import {
  Container,
  PutUpAdoptionPageHeader,
  FormButton,
  SubmitFormButton,
  Background,
  Inputs,
  DescriptionInput,
  RenderContentContainer,
  RenderContentTitle,
  RenderContentSubtitle,
  RenderContentButtonTitle,
  RenderContentButton,
  DropDown,
} from "./put-up-for-adoption.style";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const PutUpAdoptionPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [openGender, setOpenGender] = useState(false);
  const [valueGender, setValueGender] = useState("");
  const [petGender, setPetGender] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);

  const [openType, setOpenType] = useState(false);
  const [valueType, setValueType] = useState("");
  const [petType, setPetType] = useState([
    { label: "Dog", value: "Dog" },
    { label: "Cat", value: "Cat" },
    { label: "Rabbit", value: "Rabbit" },
    { label: "Hamster", value: "Hamster" },
    { label: "Guinea Pig", value: "Guinea pig" },
    { label: "Bird", value: "Bird" },
    { label: "Fish", value: "Fish" },
  ]);

  const [openHDB, setOpenHDB] = useState(false);
  const [valueHDB, setValueHDB] = useState("");
  const [petHDB, setPetHDB] = useState([
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ]);

  const [openOrganisation, setOpenOrganisation] = useState(false);
  const [valueOrganisation, setValueOrganisation] = useState("");
  const [petOrganisation, setPetOrganisation] = useState([
    { label: "Individual", value: "Individual" },
    { label: "Action for Singapore Dogs", value: "Action for Singapore Dogs" },
    { label: "Animals Lovers League", value: "Animals Lovers League" },
    {
      label: "Bunny Wonderland Singapore",
      value: "Bunny Wonderland Singapore",
    },
    { label: "Cat Welfare Society", value: "Cat Welfare Society" },
    {
      label: "Causes for Animals (Singapore)",
      value: "Causes for Animals (Singapore)",
    },
    { label: "Exclusively Mongrels", value: "Exclusively Mongrels" },
    { label: "Hamster Society Singapore", value: "Hamster Society Singapore" },
    {
      label: "House Rabbit Society Singapore",
      value: "House Rabbit Society Singapore",
    },
    {
      label: "Mercylight Animal Rescue and Sanctuary",
      value: "Mercylight Animal Rescue and Sanctuary",
    },
    { label: "Noah's Ark CARES", value: "Noah's Ark CARES" },
    {
      label: "Oasis Second Chance Animal Shelter",
      value: "Oasis Second Chance Animal Shelter",
    },
    { label: "Purely Adoptions", value: "Purely Adoptions" },
    { label: "SOSD", value: "SOSD" },
    {
      label: "Society for the Prevention of Cruelty to Animals",
      value: "SPCA",
    },
    { label: "Voices for Animals", value: "Voices for Animals" },
  ]);

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
    if (!result.cancelled) {
      setImage(result.uri);
      sheetRef.current.snapTo(2);
    }
  };

  const SetData = async () => {
    await addDoc(collection(db, "put-up-for-adoption"), {
      name: name,
      gender: valueGender,
      age: age,
      type: valueType,
      breed: breed,
      organisation: valueOrganisation,
      HDB_approved: valueHDB,
      fee: price,
      short_description: description,
      image: image,
      email: authentication.currentUser?.email,
    });
    navigation.navigate("mainpage");
  };

  const confirmAlert = () =>
    Alert.alert("Submit Form?", "Are you sure you want to submit this form?", [
      {
        text: "Cancel",
        onPress: () => navigation.navigate("PutUpAdoption"),
      },
      { text: "Yes", onPress: SetData },
    ]);

  return (
    <DismissKeyboard>
      <Background>
        <PutUpAdoptionPageHeader>
          Provide your pet's details:
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
                style={{ width: 300, height: 200 }}
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
                label="Pet's Name"
                value={name}
                textContentType="name"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={(text) => setName(text)}
              />
            </Spacer>
            <>
              <DropDown
                placeholder="Select Pet's Gender"
                open={openGender}
                value={valueGender}
                items={petGender}
                setOpen={setOpenGender}
                setValue={setValueGender}
                setItems={setPetGender}
                listMode="SCROLLVIEW"
              />
            </>
            <Spacer size="large">
              <Inputs
                label="Pet's Age (eg. _ years _ months)"
                value={age}
                textContentType="none"
                keyboardType="default"
                onChangeText={(text) => setAge(text)}
              />
            </Spacer>
            <>
              <DropDown
                placeholder="Select Type of Pet"
                open={openType}
                value={valueType}
                items={petType}
                setOpen={setOpenType}
                setValue={setValueType}
                setItems={setPetType}
                listMode="SCROLLVIEW"
                dropDownDirection="TOP"
              />
            </>
            <Spacer size="large">
              <Inputs
                label="Pet's Breed"
                value={breed}
                textContentType="none"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={(text) => setBreed(text)}
              />
            </Spacer>
            <>
              <DropDown
                placeholder="Select Organisation type"
                open={openOrganisation}
                value={valueOrganisation}
                items={petOrganisation}
                setOpen={setOpenOrganisation}
                setValue={setValueOrganisation}
                setItems={setPetOrganisation}
                listMode="SCROLLVIEW"
                dropDownDirection="TOP"
              />
            </>
            <>
              <DropDown
                placeholder="Is your pet HDB approved?"
                open={openHDB}
                value={valueHDB}
                items={petHDB}
                setOpen={setOpenHDB}
                setValue={setValueHDB}
                setItems={setPetHDB}
                listMode="SCROLLVIEW"
              />
            </>
            <Spacer size="large">
              <Inputs
                label="Fee($)"
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
          <SubmitFormButton mode="contained" onPress={confirmAlert}>
            Confirm
          </SubmitFormButton>
        </Spacer>
      </Background>
    </DismissKeyboard>
  );
};
