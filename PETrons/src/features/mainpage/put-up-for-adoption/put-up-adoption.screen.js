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
import { getStorage, ref, uploadBytes } from "firebase/storage";

import { colors } from "../../../infrastructure/theme/colors";
import { Spacer } from "../../../components/spacer/spacer.component";
import { authentication, db } from "../../../../firebase/firebase-config";

import {
  AnimalTypes,
  GenderTypes,
  Groups,
  HDBApproved
} from "./put-up-adoption-categories"

import {
  SafeArea,
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
import { Oswald_400Regular } from "@expo-google-fonts/oswald";

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
  const [petGender, setPetGender] = useState(GenderTypes);

  const [openType, setOpenType] = useState(false);
  const [valueType, setValueType] = useState("");
  const [petType, setPetType] = useState(AnimalTypes);

  const [openHDB, setOpenHDB] = useState(false);
  const [valueHDB, setValueHDB] = useState("");
  const [petHDB, setPetHDB] = useState(HDBApproved);

  const [openOrganisation, setOpenOrganisation] = useState(false);
  const [valueOrganisation, setValueOrganisation] = useState("");
  const [petOrganisation, setPetOrganisation] = useState(Groups);

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
    let userUsername;
    const Snapshot = await getDocs(collection(db, "userinfo"));
    Snapshot.forEach((doc) => {
      if (doc.data().email === authentication.currentUser?.email) {
        userUsername = doc.data().username;
      }
    });
    console.log(userUsername);
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
      userName: userUsername,
    });
    navigation.navigate("mainpage");
    const uploadUri = image;
    const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    const storage = getStorage();
    const reference = ref(storage, filename);
    const img = await fetch(image);
    const bytes = await img.blob();
    await uploadBytes(reference, bytes);
  };

  const confirmAlert = () => {
    const inputs = [
      name,
      breed,
      age,
      price,
      description,
      valueGender,
      valueType,
      valueHDB,
      valueOrganisation,
    ];
    if (inputs.includes("") || inputs.includes(undefined)) {
      Alert.alert("Please fill in all fields");
    } else if (image === null) {
      Alert.alert("Please provide an image of your pet");
    } else {
      Alert.alert(
        "Submit Form?",
        "Are you sure you want to submit this form?",
        [
          {
            text: "Cancel",
            onPress: () => navigation.navigate("PutUpAdoption"),
          },
          { text: "Yes", onPress: SetData },
        ]
      );
    }
  };

  return (
    <DismissKeyboard>
      <SafeArea>
        <PutUpAdoptionPageHeader>
          Provide your pet's details:
        </PutUpAdoptionPageHeader>
        <Spacer size='small' />
        <BottomSheet
          initialSnap={2}
          ref={sheetRef}
          snapPoints={[450, 300, 0]}
          borderRadius={10}
          renderContent={renderContent}
          enabledInnerScrolling={true}
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
                autoCapitalize="words"
                onChangeText={(text) => setName(text)}
              />
            </Spacer>
            <Spacer size="large" />
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
                zIndex={400}
                placeholderStyle={{ fontSize: 16 }}
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
            <Spacer size="large" />
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
                zIndex={300}
                placeholderStyle={{ fontSize: 16}}
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
            <Spacer size="large" />
            <>
              <DropDown
                placeholder="Select Ownership type"
                open={openOrganisation}
                value={valueOrganisation}
                items={petOrganisation}
                setOpen={setOpenOrganisation}
                setValue={setValueOrganisation}
                setItems={setPetOrganisation}
                listMode="SCROLLVIEW"
                zIndex={200}
                placeholderStyle={{ fontSize: 16}}
              />
            </>
            <Spacer size="large" />
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
                zIndex={100}
                placeholderStyle={{ fontSize: 16}}
              />
            </>
            <Spacer size="large">
              <Inputs
                label="Fee ($)"
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
        <Spacer size="large" />
        <View style={{alignItems: 'center'}}>
          <SubmitFormButton mode="contained" onPress={confirmAlert}>
            Confirm
          </SubmitFormButton>
        </View>
      </SafeArea>
    </DismissKeyboard>
  );
};
