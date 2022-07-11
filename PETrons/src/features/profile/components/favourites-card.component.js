import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Months, BottomContainer } from "../../mainpage/share-stories/components/stories-post-card.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { db } from "../../../../firebase/firebase-config";
import { Avatar, Button, Title } from "react-native-paper";

import styled from 'styled-components/native';
import { Card } from 'react-native-paper';

import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  query,
  deleteDoc,
} from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import {
  PetCard,
  PetCardDetails,
  PetInfoCardCover,
  SectionStart,
  SectionEnd,
  Name,
  Caption,
  HDBIcon,
  GenderIcon
} from '../../mainpage/adopt/components/pet-info-card.styles';

export const FavouritesCard = ({ pet, navigation }) => {
  const { index, item } = pet;
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
  } = item[1];

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


  return (
    <PetCard elevation={5}>
      <PetInfoCardCover key={name} source={{ uri: url }} />
      <PetCardDetails>
        <SectionStart>
          <Name>{name}</Name>
          <Spacer size='small' />
          <Caption>{breed}</Caption>
          <Spacer size='small'/>
          <Caption>{age} old</Caption>
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