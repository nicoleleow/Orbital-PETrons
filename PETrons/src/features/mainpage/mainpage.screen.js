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
import { Spacer } from "../../components/spacer/spacer.component";
import { colors } from "../../infrastructure/theme/colors";

const widthMenuCard = Dimensions.get("screen").width / 2 - 30;
const mainPageHeaderPadding = Dimensions.get("screen").height / 12;

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

const MainPageHeader = styled(Text)`
  color: black;
  padding-top: ${mainPageHeaderPadding}px;
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

const Container = styled(View).attrs({
  height:
    Platform.OS === "ios"
      ? Dimensions.get("window").height - 320
      : Dimensions.get("window").height - 190,
  justifyContent: "center",
})``;

const MenuCard = styled(View)`
  height: 200px;
  width: ${widthMenuCard}px;
  elevation: 15;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  padding-top: ${(props) => props.theme.space[3]};
  padding-horizontal: ${(props) => props.theme.space[3]};
  background-color: rgb(255, 227, 180);
  justify-content: center;
`;

const MenuCardContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  padding-horizontal: 20px;
`;

const ImageCard = styled(Image)`
  height: 140px;
  border-radius: ${(props) => props.theme.space[3]};
  width: 100%;
`;

export const Mainpage = ({ navigation }) => {
  const AdoptPage = () => {
    navigation.navigate("Adopt");
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
      <Container>
        <MenuCardContainer>
          <TouchableOpacity onPress={PutUpAdoptionPage}>
            <MenuCard>
              <ImageCard source={require("../../../assets/put_up.png")} />
              <HeaderTwo>Put Up Pet For Adoption</HeaderTwo>
            </MenuCard>
          </TouchableOpacity>
          <Spacer size="xLarge" position="right" />
          <TouchableOpacity onPress={AdoptPage}>
            <MenuCard>
              <ImageCard source={require("../../../assets/adopt_new.png")} />
              <Header>Adopt</Header>
            </MenuCard>
          </TouchableOpacity>
        </MenuCardContainer>
        <Spacer size="xLarge" />
        <MenuCardContainer>
          <TouchableOpacity onPress={StoriesPage}>
            <MenuCard>
              <ImageCard source={require("../../../assets/postIt_icon.png")} />
              <Header>Share Stories</Header>
            </MenuCard>
          </TouchableOpacity>
          <Spacer size="xLarge" position="right" />
          <TouchableOpacity onPress={FAQPage}>
            <MenuCard>
              <ImageCard source={require("../../../assets/qna_icon.png")} />
              <Header>FAQ</Header>
            </MenuCard>
          </TouchableOpacity>
        </MenuCardContainer>
      </Container>
    </SafeArea>
  );
};
