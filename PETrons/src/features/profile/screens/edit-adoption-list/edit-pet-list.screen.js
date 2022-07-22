import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Alert,
  Modal,
} from "react-native";
import styled from "styled-components/native";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import Animated from "react-native-reanimated";
import Render from "react-native-web/dist/cjs/exports/render";
import * as ImagePicker from "expo-image-picker";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  updateDoc,
} from "firebase/firestore/lite";

import { Spacer } from "../../../../components/spacer/spacer.component";
import { db, authentication } from "../../../../../firebase/firebase-config";
import {
  Background,
  AdoptionInfoPageHeader,
  FormButton,
  Container,
  ImageContainer,
  Inputs,
  DescriptionInput,
  EditFormButton,
  DropDown,
  AdoptionInfoSubtitle,
  RenderContentContainer,
  RenderContentButton,
  RenderContentButtonTitle,
  RenderContentSubtitle,
  RenderContentTitle,
  AgeInputs,
  BackButton,
  RenderContentCancelButton,
} from "./edit-pet-list.style";
import {
  AnimalTypes,
  GenderTypes,
  Groups,
  HDBApproved,
} from "../../../mainpage/put-up-for-adoption/put-up-adoption-categories";
import { colors } from "../../../../infrastructure/theme/colors";
import { SafeArea } from "../../../../components/utility/safe-area.component";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const EditPetList = ({ route, navigation }) => {
  const pet = route.params.item[1];
  const {
    ageYears,
    ageMonths,
    status,
    breed,
    type,
    fee,
    gender,
    organisation,
    name,
    image,
    short_description,
    HDB_approved,
    email,
    userName,
  } = pet;

  const [modalVisible, setModalVisible] = useState(false);

  const [petName, setPetName] = useState(name);
  const [petBreed, setPetBreed] = useState(breed);
  const [petAgeYears, setPetAgeYears] = useState(ageYears.toString());
  const [petAgeMonths, setPetAgeMonths] = useState(ageMonths.toString());
  const [petPrice, setPetPrice] = useState(fee);
  const [petDescription, setPetDescription] = useState(short_description);
  const [petImage, setImage] = useState(image);
  const [changeImage, setChangeImage] = useState(false);

  const [openGender, setOpenGender] = useState(false);
  const [valueGender, setValueGender] = useState(gender);
  const [petGender, setPetGender] = useState(GenderTypes);

  const [openType, setOpenType] = useState(false);
  const [valueType, setValueType] = useState(type);
  const [petType, setPetType] = useState(AnimalTypes);

  const [openHDB, setOpenHDB] = useState(false);
  const [valueHDB, setValueHDB] = useState(HDB_approved);
  const [petHDB, setPetHDB] = useState(HDBApproved);

  const [openOrganisation, setOpenOrganisation] = useState(false);
  const [valueOrganisation, setValueOrganisation] = useState(organisation);
  const [petOrganisation, setPetOrganisation] = useState(Groups);

  const [url, setUrl] = useState();
  useEffect(() => {
    const func = async () => {
      const uploadUri = petImage;
      const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
      const storage = getStorage();
      const reference = ref(storage, filename);
      await getDownloadURL(reference).then((x) => {
        setUrl(x);
      });
    };

    if (url == undefined) {
      func();
    }
  }, []);

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
      <RenderContentCancelButton onPress={setModalVisible(!modalVisible)}>
        <RenderContentButtonTitle>Cancel</RenderContentButtonTitle>
      </RenderContentCancelButton>
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
      setChangeImage(true);
      setModalVisible(!modalVisible);
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
      setChangeImage(true);
      setModalVisible(!modalVisible);
    }
  };

  const updateData = async () => {
    const uploadUri = image;
    const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    const storage = getStorage();
    const reference = ref(storage, filename);
    deleteObject(reference)
      .then(() => {})
      .catch((error) => {});
    const querySnapshot = await getDocs(collection(db, "put-up-for-adoption"));
    let documentID;
    querySnapshot.forEach((doc) => {
      if (
        (doc.data().email === email) &
        (doc.data().name === name) &
        (doc.data().short_description === short_description) &
        (doc.data().organisation === organisation)
      ) {
        documentID = doc.id;
      }
    });
    const editedDoc = doc(db, "put-up-for-adoption", documentID);
    await setDoc(editedDoc, {
      name: petName,
      gender: valueGender,
      ageYears: parseInt(petAgeYears),
      ageMonths: parseInt(petAgeMonths),
      totalMonths: parseInt(petAgeYears) * 12 + parseInt(petAgeMonths),
      type: valueType,
      breed: petBreed,
      organisation: valueOrganisation,
      HDB_approved: valueHDB,
      fee: petPrice,
      short_description: petDescription,
      image: petImage,
      email: authentication.currentUser?.email,
      status: status,
      userName: userName,
    });
    const newUploadUri = petImage;
    const newFilename = newUploadUri.substring(
      newUploadUri.lastIndexOf("/") + 1
    );
    const newReference = ref(storage, newFilename);
    const img = await fetch(petImage);
    const bytes = await img.blob();
    await uploadBytes(newReference, bytes);
    navigation.navigate("PutUpAdoptionList");
  };

  const confirmEdit = () =>
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

  return (
    <DismissKeyboard>
      <SafeArea>
        <AdoptionInfoPageHeader>
          Change your pet's details:
        </AdoptionInfoPageHeader>
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
            <RenderContentCancelButton
              onPress={() => setModalVisible(!modalVisible)}
            >
              <RenderContentButtonTitle>Cancel</RenderContentButtonTitle>
            </RenderContentCancelButton>
          </RenderContentContainer>
        </Modal>
        <ScrollView>
          <ImageContainer>
            <Image
              source={{ uri: changeImage === false ? url : petImage }}
              style={{ width: 300, height: 200 }}
            />
            <FormButton
              labelStyle={{ color: colors.button.text }}
              icon="image"
              mode="contained"
              onPress={renderContent}
            >
              Upload New Image
            </FormButton>
          </ImageContainer>
          <Container>
            <Spacer size="large">
              <Inputs
                label="Pet's Name"
                value={petName}
                textContentType="name"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={(text) => setPetName(text)}
              />
            </Spacer>
            <AdoptionInfoSubtitle>Select Pet's Age</AdoptionInfoSubtitle>
            <Spacer size="small" />
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <AgeInputs
                  label="Year(s)"
                  value={petAgeYears}
                  textContentType="none"
                  keyboardType="number-pad"
                  onChangeText={(text) => setPetAgeYears(text)}
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <AgeInputs
                  label="Month(s)"
                  value={petAgeMonths}
                  textContentType="none"
                  keyboardType="number-pad"
                  onChangeText={(text) => setPetAgeMonths(text)}
                />
              </View>
            </View>
            <AdoptionInfoSubtitle>Select Pet's Gender</AdoptionInfoSubtitle>
            <>
              <DropDown
                open={openGender}
                value={valueGender}
                items={petGender}
                setOpen={setOpenGender}
                setValue={setValueGender}
                setItems={setPetGender}
                listMode="SCROLLVIEW"
                zIndex={400}
                placeholderStyle={{ fontSize: 16 }}
              />
            </>
            <AdoptionInfoSubtitle>Select Type of Pet</AdoptionInfoSubtitle>
            <>
              <DropDown
                open={openType}
                value={valueType}
                items={petType}
                setOpen={setOpenType}
                setValue={setValueType}
                setItems={setPetType}
                listMode="SCROLLVIEW"
                zIndex={300}
                placeholderStyle={{ fontSize: 16 }}
              />
            </>
            <Spacer size="large">
              <Inputs
                label="Pet's Breed"
                value={petBreed}
                textContentType="none"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={(text) => setPetBreed(text)}
              />
            </Spacer>
            <AdoptionInfoSubtitle>Select Ownership type</AdoptionInfoSubtitle>
            <>
              <DropDown
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
            <AdoptionInfoSubtitle>
              Is your pet HDB approved?
            </AdoptionInfoSubtitle>
            <>
              <DropDown
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
                label="Fee($)"
                value={petPrice}
                textContentType="none"
                keyboardType="number-pad"
                onChangeText={(text) => setPetPrice(text)}
              />
            </Spacer>
            <Spacer size="large">
              <DescriptionInput
                label="Short Description..."
                value={petDescription}
                textContentType="none"
                autoCapitalize="none"
                keyboardType="default"
                multiline={true}
                onChangeText={(text) => setPetDescription(text)}
              />
            </Spacer>
          </Container>
          <Spacer size="large">
            <View style={{ alignItems: "center" }}>
              <EditFormButton
                labelStyle={{ color: colors.button.text }}
                mode="contained"
                onPress={confirmEdit}
              >
                Confirm Change
              </EditFormButton>
            </View>
          </Spacer>
        </ScrollView>
      </SafeArea>
    </DismissKeyboard>
  );
};
