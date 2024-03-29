import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { db, authentication, userUsername, userFavouritesList, GetUserFavourites } from "../../../../firebase/firebase-config";

import styled from 'styled-components/native';

import {
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  getDownloadURL
} from "firebase/storage";

import {
  PetCard,
  PetCardDetails,
  PetInfoCardCover,
  SectionStart,
  SectionEnd,
  Name,
  Caption,
  Age,
  HDBIcon,
  GenderIcon
} from '../../mainpage/adopt/components/pet-info-card.styles';

const FavouriteButton = styled(TouchableOpacity)`
  height: 35px;
  width: 35px;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.space[5]};
  background-color: ${(props) => props.theme.colors.brand.blue1};
  position: absolute;
  right: 10px;
  top: 75px;
`;

export const FavouritesCard = ({ pet, navigation }) => {
  GetUserFavourites();

  const { index, item } = pet;
  const {
    ageYears,
    ageMonths,
    totalMonths,
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
  } = item[1];

  const petID = item[0];
  const favourited = userFavouritesList.includes(petID);

  const [url, setUrl] = useState();
  useEffect(() => {
  const func = async () => {
    if (image !== null) {
      const uploadUri = image;
  
      const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
      const storage = getStorage();
      const reference = ref(storage, filename);
      await getDownloadURL(reference).then((x) => {
        setUrl(x);
      });
    }
  };

    if (url == undefined) {
    func();
    }
  }, []);

  const genderIconType = gender === 'Male' ? 'male-symbol' : 'female-symbol';
  const genderIconColor = gender === 'Male' ? '#1260CC' : '#FE046A';
  
  const isHDBApproved = HDB_approved === 'Yes' ? true : false;
  const hdbIcon = 'https://www.logolynx.com/images/logolynx/e5/e5d49abdb2ad1ac2dff8fb33e138d785.jpeg';

  const [isFavourite, setIsFavourite] = useState(favourited);
  let tempList = []
  for (let i = 0; i < userFavouritesList.length; i++) {
    tempList[i] = userFavouritesList[i]
  }

  const UpdateFirebaseFavList = async (tempList) => {
    const querySnapshot = await getDocs(collection(db, "userinfo"));
      let documentID, pfp, likedPosts;
      querySnapshot.forEach((doc) => {
        if (
          (doc.data().email === authentication.currentUser?.email)
        ) {
          documentID = doc.id;
          pfp = doc.data().profilepic;
          likedPosts = doc.data().likedPosts;
        }
      });
      const editedDoc = doc(db, "userinfo", documentID);
      await setDoc(editedDoc, {
        email: authentication.currentUser?.email,
        profilepic: pfp,
        username: userUsername,
        likedPosts,
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

  return (
    <PetCard elevation={5}>
      <PetInfoCardCover key={name} source={{ uri: url }} />
      <FavouriteButton
            onPress={UpdateFavouritesList}
            >
            <Icon
              name='heart'
              color= {isFavourite === true ? '#e95949' : 'white'}
              size={20}
            />
          </FavouriteButton>
      <PetCardDetails>
        <SectionStart>
          <Name>{name}</Name>
          <Spacer size='small' />
          <Caption>{breed}</Caption>
          <Spacer size='small'/>
          {(() => {
            if (totalMonths < 12) {
              return <Age>{ageMonths} months old</Age>;
            } else {
              if (totalMonths % 12 === 0) {
                if (totalMonths < 24) {
                  return <Age>{ageYears} year old</Age>;
                } else {
                  return <Age>{ageYears} years old</Age>;
                }
              } else {
                if (totalMonths < 24) {
                  return (
                    <Age>
                      {ageYears} year {ageMonths} months old
                    </Age>
                  );
                } else {
                  return (
                    <Age>
                      {ageYears} years {ageMonths} months old
                    </Age>
                  );
                }
              }
            }
          })()}
        </SectionStart>
        <SectionEnd>
          {isHDBApproved && (
              <HDBIcon source={{ uri:hdbIcon }} />
          )}
          <Spacer size='medium' position='right' />
          <GenderIcon
              name={genderIconType}
              color={genderIconColor}
              size={20} />
          <Spacer size='small' position='right' />
          
        </SectionEnd>
      </PetCardDetails> 
    </PetCard>
  );
}