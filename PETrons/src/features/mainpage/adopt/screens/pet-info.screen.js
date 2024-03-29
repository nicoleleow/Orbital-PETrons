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
  FavouriteButton
} from "./pet-info.screen.styles";
import {
  authentication,
  db,
  userFavouritesList,
  GetUserFavourites,
  userUsername,
} from "../../../../../firebase/firebase-config";
import { SafeArea } from "../../../../components/utility/safe-area.component";

export const PetInfoScreen = ({ route, navigation }) => {
  const pet = route.params.item;

  const { index, item } = pet;
  const {
    ageYears,
    ageMonths,
    totalMonths,
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
  } = item[1];
  const petID = item[0];

  GetUserFavourites();
  const favourited = userFavouritesList.includes(petID);

  let tempList = [];
  for (let i = 0; i < userFavouritesList.length; i++) {
    tempList[i] = userFavouritesList[i];
  }

  const [isFavourite, setIsFavourite] = useState(favourited);

  const UpdateFirebaseFavList = async (tempList) => {
    const querySnapshot = await getDocs(collection(db, "userinfo"));
    let documentID, profilepic, likedPosts;
    querySnapshot.forEach((doc) => {
      if (doc.data().email === authentication.currentUser?.email) {
        documentID = doc.id;
        profilepic = doc.data().profilepic;
        likedPosts = doc.data().likedPosts;
      }
    });
    const editedDoc = doc(db, "userinfo", documentID);
    await setDoc(editedDoc, {
      email: authentication.currentUser?.email,
      username: userUsername,
      favourites: tempList,
      profilepic,
      likedPosts,
    });
  };

  const UpdateFavouritesList = () => {
    setIsFavourite(!isFavourite);
    if (!isFavourite === false && tempList.includes(petID)) {
      // if pet already previously favourited, but now no, remove pet from favourites list
      tempList = tempList.filter((id) => id !== petID);
    } else if (!isFavourite === true && !tempList.includes(petID)) {
      // add pet to favourites list
      tempList.push(petID);
    }
    //update firebase db
    UpdateFirebaseFavList(tempList);
  };

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
            {(() => {
              if (totalMonths < 12) {
                return (
                  <Details>
                    Age{`\n`} {ageMonths} Months Old
                  </Details>
                );
              } else {
                if (totalMonths % 12 === 0) {
                  if (totalMonths < 24) {
                    return (
                      <Details>
                        Age{`\n`} {ageYears} Year Old
                      </Details>
                    );
                  } else {
                    return (
                      <Details>
                        Age{`\n`} {ageYears} Years Old
                      </Details>
                    );
                  }
                } else {
                  if (totalMonths < 24) {
                    return (
                      <Details>
                        Age{`\n`}
                        {ageYears} Year {ageMonths} Months Old
                      </Details>
                    );
                  } else {
                    return (
                      <Details>
                        Age{`\n`}
                        {ageYears} Years {ageMonths} Months Old
                      </Details>
                    );
                  }
                }
              }
            })()}
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

        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            marginHorizontal: 32,
            justifyContent: "space-between",
          }}
        >
          <ContactOwnerButton onPress={onPress}>
            <ContactOwnerText>
              <Icon name="chat" size={15} />
              <Spacer size="large" position="right" />
              contact {contactOwner}
            </ContactOwnerText>
          </ContactOwnerButton>
          <FavouriteButton onPress={UpdateFavouritesList}>
            <Icon
              name="heart"
              color={isFavourite === true ? "#e95949" : "white"}
              size={20}
            />
          </FavouriteButton>
        </View>
        <Spacer size="xLarge" />
      </ScrollView>
    </SafeArea>
  );
};
