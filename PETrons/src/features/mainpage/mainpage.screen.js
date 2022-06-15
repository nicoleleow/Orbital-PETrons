import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Menu } from "react-native-paper";
import styled from "styled-components/native";

import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../../firebase/firebase-config"

const widthMenuCard = Dimensions.get("screen").width / 2 - 30;

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const MainPageHeader = styled(Text)`
  color: black;
  padding-top: ${(props) => props.theme.space[5]};
  padding-bottom: ${(props) => props.theme.space[4]};
  font-size: ${(props) => props.theme.fontSizes.h3};
  font-family: ${(props) => props.theme.fonts.heading};
  text-align: center;
`;

const Header = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  padding-top: ${(props) => props.theme.space[4]};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: bold;
  text-align: center;
`;

const HeaderTwo = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  padding-top: ${(props) => props.theme.space[1]};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: bold;
  text-align: center;
`;

const MenuCard = styled(View)`
  height: 200px;
  width: ${widthMenuCard}px;
  elevation: 15;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  padding-top: ${(props) => props.theme.space[3]};
  padding-horizontal: ${(props) => props.theme.space[3]};
  background-color: rgba(255, 255, 255, 0.7);
`;

const MenuCardContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 20px;
`;

const MenuCardContainerBottom = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  padding-horizontal: 20px;
`;

const ImageCard = styled(Image)`
  height: 140px;
  border-radius: ${(props) => props.theme.space[3]};
  width: 100%;
`;

const ImagePet = styled(Image)`
  height: 140px;
  width: 95%;
`;

export let petsList = []
 
export const Mainpage = ({ navigation }) => {
  const AdoptPage = async () => {
    navigation.navigate("Adopt");
    const petsCol = collection(db, 'put-up-for-adoption');
    const petsOverview = await getDocs(petsCol);
    petsList = petsOverview.docs.map(doc => doc.data());
  };
  const PutUpAdoptionPage = () => {
    navigation.navigate("PutUpAdoption");
  };
  const StoriesPage = () => {
    navigation.navigate("ShareStories");
  };
  const FAQPage = () => {
    navigation.navigate("FAQ");
  };

  return (
    <SafeArea>
      <View>
        <MainPageHeader>HOME</MainPageHeader>
      </View>
      <ImagePet source={require("../../../assets/cat-and-dog.png")} />
      <MenuCardContainer>
        <TouchableOpacity onPress={PutUpAdoptionPage}>
          <MenuCard>
            <ImageCard source={require("../../../assets/put_up.png")} />
            <HeaderTwo>Put Up Pet For Adoption</HeaderTwo>
          </MenuCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={AdoptPage}>
          <MenuCard>
            <ImageCard source={require("../../../assets/adopt_new.png")} />
            <Header>Adopt</Header>
          </MenuCard>
        </TouchableOpacity>
      </MenuCardContainer>
      <MenuCardContainerBottom>
        <TouchableOpacity onPress={StoriesPage}>
          <MenuCard>
            <ImageCard source={require("../../../assets/share_stories.png")} />
            <Header>Share Stories</Header>
          </MenuCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={FAQPage}>
          <MenuCard>
            <ImageCard source={require("../../../assets/faq.png")} />
            <Header>FAQ</Header>
          </MenuCard>
        </TouchableOpacity>
      </MenuCardContainerBottom>
    </SafeArea>
  );
};
