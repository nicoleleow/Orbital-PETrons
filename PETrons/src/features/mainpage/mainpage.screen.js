import React from "react";
import {
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Menu } from "react-native-paper";
import styled from "styled-components/native";
import { Text } from "../../components/typography/text.component"

const { width } = Dimensions.get("screen");

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const MenuCard = styled(View)`
  height: 190px;
  width: 165px;
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
  margin-top: 20px;
  padding-horizontal: 20px;
`;

const ImageCard = styled(Image)`
  height: 130px;
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
        <Text variant='home'>HOME</Text>
      </View>
      <MenuCardContainer>
        <TouchableOpacity onPress={PutUpAdoptionPage}>
          <MenuCard>
            <ImageCard source={require("../../../assets/put_up.png")} />
            <Text variant='title'>Put Up Pet {'\n'} For Adoption</Text>
          </MenuCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={AdoptPage}>
          <MenuCard>
            <ImageCard source={require("../../../assets/adopt.png")} />
            <Text variant='title'>Adopt</Text>
          </MenuCard>
        </TouchableOpacity>
      </MenuCardContainer>
      <MenuCardContainer>
        <TouchableOpacity onPress={StoriesPage}>
          <MenuCard>
            <ImageCard source={require("../../../assets/share_stories.png")} />
            <Text variant='title'>Share Stories</Text>
          </MenuCard>
        </TouchableOpacity>
        <TouchableOpacity onPress={FAQPage}>
          <MenuCard>
            <ImageCard source={require("../../../assets/faq.png")} />
            <Text variant='title'>FAQ</Text>
          </MenuCard>
        </TouchableOpacity>
      </MenuCardContainer>
    </SafeArea>
  );
};
