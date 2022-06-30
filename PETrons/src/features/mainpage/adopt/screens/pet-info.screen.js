import React, { useState, useEffect } from "react";
import { Image, ScrollView } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  updateDoc,
} from "firebase/firestore/lite";

import {
  SafeArea,
  Name,
  Breed,
  PetPhotoContainer,
  DetailsContainer,
  DetailsRectangle,
  Details,
  FeeContainer,
  Fee,
  HDBContainer,
  HDB,
  AboutPetContainer,
  AboutPet,
  ContactOwnerButton,
  ContactOwnerText,
} from "./pet-info.screen.styles";
import { authentication, db } from "../../../../../firebase/firebase-config";

export const PetInfoScreen = ({ route, navigation }) => {
  const pet = route.params.item;

  const { index, item } = pet;
  const {
    age,
    breed,
    type,
    fee,
    gender,
    HDB_approved,
    name,
    image,
    short_description,
    organisation,
    email,
    userName,
  } = item;

  const contactOwner = organisation === "Individual" ? "Owner" : "Organisation";

  const isHDBApproved = HDB_approved === "Yes" ? true : false;
  const hdbIcon =
    "https://www.logolynx.com/images/logolynx/e5/e5d49abdb2ad1ac2dff8fb33e138d785.jpeg";

  const [count, setCount] = useState(0);

  const onPress = async () => {
    const querySnapshot = await getDocs(collection(db, "userinfo"));
    let userUsername;
    querySnapshot.forEach((doc) => {
      if (doc.data().email === email) {
        userUsername = doc.data().username;
      }
    });
    navigation.navigate("ChatPage", { item });
  };
  const [url, setUrl] = useState();
  useEffect(() => {
    const func = async () => {
      const uploadUri = image;
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

  return (
    <SafeArea>
      <ScrollView>
        <Spacer size="xxLarge" />
        <Name>{name}</Name>
        <Breed>{breed}</Breed>
        <Spacer size="large" />
        <PetPhotoContainer>
          <Image
            source={{ uri: url }}
            style={{ resizeMode: "contain", width: 360, height: 220 }}
          />
        </PetPhotoContainer>

        <Spacer size="large" />
        <DetailsContainer>
          <DetailsRectangle>
            <Details>
              Age{`\n`}
              {age} old
            </Details>
          </DetailsRectangle>
          <DetailsRectangle>
            <Details>
              Gender{`\n`}
              {gender}
            </Details>
          </DetailsRectangle>
        </DetailsContainer>

        <DetailsContainer>
          {isHDBApproved && (
            <HDBContainer>
              <HDB>HDB{`\n`}Approved</HDB>
            </HDBContainer>
          )}
          {!isHDBApproved && (
            <HDBContainer>
              <HDB>Not{`\n`}HDB Approved</HDB>
            </HDBContainer>
          )}
          <FeeContainer>
            <Fee>
              <Icon name="tag" size={15} />
              <Spacer size="large" position="right" />
              Fee: ${fee}
            </Fee>
          </FeeContainer>
        </DetailsContainer>

        <Spacer size="xxLarge"></Spacer>

        <AboutPetContainer>
          <AboutPet style={{ fontWeight: "bold" }}>Owner:</AboutPet>
          <AboutPet>{organisation}</AboutPet>
          <Spacer size="medium" />
          <AboutPet style={{ fontWeight: "bold", textTransform: "capitalize" }}>
            About {name}:
          </AboutPet>
          <AboutPet>{short_description}</AboutPet>
        </AboutPetContainer>

        <Spacer size="xLarge"></Spacer>

        <ContactOwnerButton onPress={onPress}>
          <ContactOwnerText>
            <Icon name="chat" size={15} />
            <Spacer size="large" position="right" />
            contact {contactOwner}
          </ContactOwnerText>
        </ContactOwnerButton>
        <Spacer size="xLarge"></Spacer>
      </ScrollView>
    </SafeArea>
  );
};
