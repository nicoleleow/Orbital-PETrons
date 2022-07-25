import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Button, Card, Title } from "react-native-paper";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  query,
  deleteDoc,
  updateDoc,
} from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { Spacer } from "../../components/spacer/spacer.component";
import { colors } from "../../infrastructure/theme/colors";
import { db, authentication } from "../../../firebase/firebase-config";

const AdoptionCard = styled(Card)`
  margin: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.space[3]};
`;

const AdoptionCardDetails = styled(Card.Content)`
  padding-horizontal: 15px;
  padding-bottom: ${(props) => props.theme.space[3]};
  padding-top: ${(props) => props.theme.space[1]};
  display: flex;
  flex-direction: row;
`;

const AdoptionCardImage = styled(Card.Content)`
  padding-horizontal: 15px;
  padding-bottom: ${(props) => props.theme.space[3]};
  padding-top: ${(props) => props.theme.space[1]};
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
`;

const AdoptionPetInfoCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[2]};
  background-color: white;
`;

const SectionStart = styled.View`
  flex-direction: column;
`;

const SectionEnd = styled.View`
  padding: ${(props) => props.theme.space[2]};
  position: absolute;
  top: 0px;
  right: 0px;
`;

const Name = styled(Title)`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-family: ${(props) => props.theme.fonts.heading};
  color: ${(props) => props.theme.colors.text.error};
  text-transform: capitalize;
`;

const Caption = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.button};
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.brand.secondary};
`;

const EditButton = styled(Button).attrs({
  color: colors.button.main,
})`
  align-content: center;
  justify-content: center;
  height: 50px;
  width: 100px;
`;

export const AdoptionInfoCard = ({ pet, navigation }) => {
  const { index, item } = pet;
  const {
    ageYears,
    ageMonths,
    totalMonths,
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
  } = item[1];

  const EditAlert = () =>
    Alert.alert(
      "Edit?",
      "Are you sure you want to make changes to this form?",
      [
        {
          text: "Edit listing details",
          onPress: () => navigation.navigate("EditingPetList", { item }),
        },
        { text: "Mark as Adopted", onPress: ListingAdopted },
        { text: "Delete listing", onPress: DeleteData },
        {
          text: "Cancel",
        },
      ]
    );

  const ListingAdopted = async () => {
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
    const updatedDoc = doc(db, "put-up-for-adoption", documentID);
    await updateDoc(updatedDoc, {
      status: "adopted",
    });
  };

  const DeleteData = async () => {
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
    await deleteDoc(doc(db, "put-up-for-adoption", documentID));
    const uploadUri = image;
    const filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    const storage = getStorage();
    const reference = ref(storage, filename);
    deleteObject(reference)
      .then(() => {})
      .catch((error) => {});
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
    <AdoptionCard elevation={5}>
      <AdoptionCardImage>
        <AdoptionPetInfoCardCover
          key={name}
          style={{ width: 300, height: 200 }}
          source={{ uri: url }}
        />
      </AdoptionCardImage>
      <AdoptionCardDetails>
        <SectionStart>
          <Name>Name: {name}</Name>
          <Spacer size="small" />
          <Caption>Type: {type}</Caption>
          <Caption>Breed: {breed}</Caption>
          {(() => {
            if (totalMonths < 12) {
              return <Caption>Age: {ageMonths} Months Old</Caption>;
            } else {
              if (totalMonths % 12 === 0) {
                if (totalMonths < 24) {
                  return <Caption>Age: {ageYears} Year Old</Caption>;
                } else {
                  return <Caption>Age: {ageYears} Years Old</Caption>;
                }
              } else {
                if (totalMonths < 24) {
                  return (
                    <Caption>
                      Age: {ageYears} Year {ageMonths} Months Old
                    </Caption>
                  );
                } else {
                  return (
                    <Caption>
                      Age: {ageYears} Years {ageMonths} Months Old
                    </Caption>
                  );
                }
              }
            }
          })()}
          <Caption>Gender: {gender}</Caption>
          <Caption>Owner: {organisation}</Caption>
          <Caption>Is you pet HDB approved? {HDB_approved}</Caption>
          <Caption>Fee: ${fee}</Caption>
          <Caption>Short Description: {short_description}</Caption>
          <Caption>Status: {status}</Caption>
        </SectionStart>
        <SectionEnd>
          <EditButton
            labelStyle={{ color: colors.button.text }}
            mode="contained"
            icon="pencil"
            onPress={EditAlert}
          >
            Edit
          </EditButton>
        </SectionEnd>
      </AdoptionCardDetails>
    </AdoptionCard>
  );
};
