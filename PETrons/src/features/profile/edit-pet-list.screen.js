import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import DropDownPicker from "react-native-dropdown-picker";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
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

import { Text } from "../../components/typography/text.component";
import { Spacer } from "../../components/spacer/spacer.component";
import { db, authentication } from "../../../firebase/firebase-config";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const Background = styled.View`
  background-color: orange;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

const AdoptionInfoPageHeader = styled(Text)`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.monospace};
  padding-top: 40px;
`;

const FormButton = styled(Button).attrs({
  // color: colors.button.primary,
  color: "peru",
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  margin-top: 10px;
`;

const Container = styled.View`
  width: 380px;
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[1]};
  padding-top: 10px;
`;

const ImageContainer = styled.View`
  width: 380px;
  margin-top: ${(props) => props.theme.space[1]};
  align-items: center;
  justify-content: center;
`;

const Inputs = styled(TextInput)`
  width: 350px;
  background-color: whitesmoke;
`;

const DescriptionInput = styled(TextInput)`
  width: 350px;
  height: 90px;
  textalignvertical: "top";
  background-color: whitesmoke;
  padding-bottom: 200px;
  margin-bottom: 50px;
`;

const EditFormButton = styled(Button).attrs({
  // color: colors.button.primary,
  color: "peru",
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  margin-bottom: 20px;
`;

const DropDown = styled(DropDownPicker)`
  width: 350px;
  background-color: whitesmoke;
  margin-top: 10px;
`;

const AdoptionInfoSubtitle = styled(Text)`
  color: black;
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.monospace};
`;

const RenderContentContainer = styled.View`
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
  background-color: #ff6347;
  align-items: center;
  margin-vertical: 7px;
`;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export const EditPetList = ({ route, navigation }) => {
  const pet = route.params.item;
  const {
    age,
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
  } = pet;

  const [petName, setPetName] = useState(name);
  const [petBreed, setPetBreed] = useState(breed);
  const [petAge, setPetAge] = useState(age);
  const [petPrice, setPetPrice] = useState(fee);
  const [petDescription, setPetDescription] = useState(short_description);
  const [petImage, setImage] = useState(null);

  const [openGender, setOpenGender] = useState(false);
  const [valueGender, setValueGender] = useState(gender);
  const [petGender, setPetGender] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ]);

  const [openType, setOpenType] = useState(false);
  const [valueType, setValueType] = useState(type);
  const [petType, setPetType] = useState([
    { label: "Dog", value: "Dog" },
    { label: "Cat", value: "Cat" },
    { label: "Rabbit", value: "Rabbit" },
    { label: "Hamster", value: "Hamster" },
    { label: "Guinea Pig", value: "Guinea pig" },
    { label: "Bird", value: "Bird" },
    { label: "Fish", value: "Fish" },
    { label: "Others", value: "Others" },
  ]);

  const [openHDB, setOpenHDB] = useState(false);
  const [valueHDB, setValueHDB] = useState(HDB_approved);
  const [petHDB, setPetHDB] = useState([
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ]);

  const [openOrganisation, setOpenOrganisation] = useState(false);
  const [valueOrganisation, setValueOrganisation] = useState(organisation);
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
    { label: "Others", value: "Others" },
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

  const updateData = async () => {
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
      age: petAge,
      type: valueType,
      breed: petBreed,
      organisation: valueOrganisation,
      HDB_approved: valueHDB,
      fee: petPrice,
      short_description: petDescription,
      image: petImage,
      email: authentication.currentUser?.email,
    });
    navigation.navigate("PutUpAdoptionList");
  };

  const confirmEdit = () =>
    Alert.alert(
      "Submit Changes?",
      "Are you sure you want to submit this changes?",
      [
        {
          text: "Cancel",
        },
        { text: "Yes", onPress: updateData },
      ]
    );

  // const [url, setUrl] = useState();
  // useEffect(() => {
  //   const func = async () => {
  //     const uploadUri = petImage;
  //     const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
  //     const storage = getStorage();
  //     const reference = ref(storage, filename);
  //     await getDownloadURL(reference).then((x) => {
  //       setUrl(x);
  //     });
  //   };

  //   if (url == undefined) {
  //     func();
  //   }
  // }, []);

  return (
    <DismissKeyboard>
      <Background>
        <AdoptionInfoPageHeader>
          Change your pet's details:
        </AdoptionInfoPageHeader>
        <BottomSheet
          initialSnap={2}
          ref={sheetRef}
          snapPoints={[450, 300, 0]}
          borderRadius={10}
          renderContent={renderContent}
        />
        <ScrollView>
          <ImageContainer>
            {/* <Image source={{ uri: url }} style={{ width: 300, height: 200 }} /> */}
            <FormButton
              icon="image"
              mode="contained"
              onPress={() => sheetRef.current.snapTo(0)}
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
              />
            </>
            <Spacer size="large">
              <Inputs
                label="Pet's Age (eg. _ years _ months)"
                value={petAge}
                textContentType="none"
                keyboardType="default"
                onChangeText={(text) => setPetAge(text)}
              />
            </Spacer>
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
                dropDownDirection="TOP"
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
                dropDownDirection="TOP"
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
        </ScrollView>
        <Spacer size="large">
          <EditFormButton mode="contained" onPress={confirmEdit}>
            Confirm Change
          </EditFormButton>
        </Spacer>
      </Background>
    </DismissKeyboard>
  );
};
