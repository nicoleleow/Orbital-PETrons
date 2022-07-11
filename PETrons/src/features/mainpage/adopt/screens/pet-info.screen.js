import React, { useState, useEffect } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Spacer } from "../../../../components/spacer/spacer.component";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components";

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
import { authentication, db, userFavouritesList, GetUserFavourites, petID, GetPetID, userUsername } from "../../../../../firebase/firebase-config";
import { FactorId } from "firebase/auth";

const FavouriteButton = styled(TouchableOpacity)`
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.brand.blue1};
`;

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

  GetPetID(name, gender, email, short_description, image);
  GetUserFavourites();
  const favourited = userFavouritesList.includes(petID);

  let tempList = []
  for (let i = 0; i < userFavouritesList.length; i++) {
    tempList[i] = userFavouritesList[i]
  }

  const [isFavourite, setIsFavourite] = useState(!favourited);

  const UpdateFirebaseFavList = async (tempList) => {
    const querySnapshot = await getDocs(collection(db, "userinfo"));
      let documentID, pfp;
      querySnapshot.forEach((doc) => {
        if (
          (doc.data().email === authentication.currentUser?.email)
        ) {
          documentID = doc.id;
          pfp = doc.data().profilepic;
        }
      });
      const editedDoc = doc(db, "userinfo", documentID);
      await setDoc(editedDoc, {
        email: authentication.currentUser?.email,
        profilepic: pfp,
        username: userUsername,
        favourites: tempList
      });
  }

  const UpdateFavouritesList = () => {
    setIsFavourite(!isFavourite);
    if (!isFavourite === false && tempList.includes(petID)) {
      // if pet already previously favourited, but now no, remove pet from favourites list
      tempList = tempList.filter(id => id !== petID)
    } else if (!isFavourite === true && !tempList.includes(petID)) {
      // add pet to favourites list
      tempList.push(petID);
    }
    //update firebase db
    UpdateFirebaseFavList(tempList);
  }

  const contactOwner = organisation === "Individual" ? "Owner" : "Organisation";

  const isHDBApproved = HDB_approved === "Yes" ? true : false;
  

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

        <Spacer size="xLarge" />

        <View style={{ flexDirection: 'row', alignContent: 'center', marginHorizontal: 32, justifyContent: 'space-between' }}>
          <ContactOwnerButton onPress={onPress}>
            <ContactOwnerText>
              <Icon name="chat" size={15} />
              <Spacer size="large" position="right" />
              contact {contactOwner}
            </ContactOwnerText>
          </ContactOwnerButton>
          <FavouriteButton
            onPress={UpdateFavouritesList}
            >
            <Icon
              name='heart'
              color= {isFavourite === true ? '#ff7f7f' : 'white'}
              size={20}
            />
          </FavouriteButton>
        </View>
        <Spacer size="xLarge" />
      </ScrollView>
    </SafeArea>
  );
};
