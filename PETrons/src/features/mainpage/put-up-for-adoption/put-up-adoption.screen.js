import React, { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import { Spacer } from "../../../components/spacer/spacer.component";
import { authentication, db } from "../../../../firebase/firebase-config";

import {
  AnimalTypes,
  GenderTypes,
  Groups,
  HDBApproved,
} from "./put-up-adoption-categories";

import {
  SafeArea,
  Container,
  PutUpAdoptionPageHeader,
  FormButton,
  SubmitFormButton,
  Inputs,
  DescriptionInput,
  RenderContentContainer,
  RenderContentTitle,
  RenderContentSubtitle,
  RenderContentButtonTitle,
  RenderContentButton,
  DropDown,
  AdoptionInfoSubtitle,
  AgeInputs,
} from "./put-up-for-adoption.style";
import { colors } from "../../../infrastructure/theme/colors";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const PutUpAdoptionPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [ageYears, setAgeYears] = useState("");
  const [ageMonths, setAgeMonths] = useState("");
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

  const [modalVisible, setModalVisible] = useState(false);

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
      <RenderContentButton onPress={setModalVisible(!modalVisible)}>
        <RenderContentButtonTitle>Cancel</RenderContentButtonTitle>
      </RenderContentButton>
    </RenderContentContainer>
  );
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

  const SetData = async () => {
    let userUsername;
    const Snapshot = await getDocs(collection(db, "userinfo"));
    Snapshot.forEach((doc) => {
      if (doc.data().email === authentication.currentUser?.email) {
        userUsername = doc.data().username;
      }
    });
    await addDoc(collection(db, "put-up-for-adoption"), {
      name: name,
      gender: valueGender,
      ageYears: parseInt(ageYears),
      ageMonths: parseInt(ageMonths),
      totalMonths: parseInt(ageYears) * 12 + parseInt(ageMonths),
      type: valueType,
      breed: breed,
      organisation: valueOrganisation,
      HDB_approved: valueHDB,
      fee: price,
      short_description: description,
      image: image,
      email: authentication.currentUser?.email,
      userName: userUsername,
      status: "available",
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
      ageMonths,
      ageYears,
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
        <Spacer size="small" />
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
                Choose Your Pet Image
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
            <RenderContentButton onPress={() => setModalVisible(!modalVisible)}>
              <RenderContentButtonTitle>Cancel</RenderContentButtonTitle>
            </RenderContentButton>
          </RenderContentContainer>
        </Modal>
        <ScrollView>
          <Container>
            {image && (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 300, height: 200 }}
                />
              </View>
            )}
            <View style={{ alignItems: "center" }}>
              <FormButton
                labelStyle={{ color: colors.button.text }}
                icon="image"
                mode="contained"
                onPress={renderContent}
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
            </View>
            <AdoptionInfoSubtitle>Pet's Age</AdoptionInfoSubtitle>
            <Spacer size="small" />
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <AgeInputs
                  label="Year(s)"
                  value={ageYears}
                  textContentType="none"
                  keyboardType="number-pad"
                  onChangeText={(text) => setAgeYears(text)}
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <AgeInputs
                  label="Month(s)"
                  value={ageMonths}
                  textContentType="none"
                  keyboardType="number-pad"
                  onChangeText={(text) => setAgeMonths(text)}
                />
              </View>
            </View>
            <Spacer size="large" />
            <View style={{ alignItems: "center" }}>
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
                  placeholderStyle={{ fontSize: 16 }}
                />
              </>
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
                  placeholderStyle={{ fontSize: 16 }}
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
                  placeholderStyle={{ fontSize: 16 }}
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
            </View>
          </Container>
          <Spacer size="large" />
          <View style={{ alignItems: "center" }}>
            <SubmitFormButton
              labelStyle={{ color: colors.button.text }}
              mode="contained"
              onPress={confirmAlert}
            >
              Confirm
            </SubmitFormButton>
          </View>
        </ScrollView>
      </SafeArea>
    </DismissKeyboard>
  );
};
