import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const MainPageHeader = styled(Text)`
  color: black;
  padding-top: ${(props) => props.theme.space[6]};
  padding-bottom: ${(props) => props.theme.space[6]};
  padding-left: ${(props) => props.theme.space[7]};
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.body};
`;

const Header = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  padding-top: ${(props) => props.theme.space[4]};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: bold;
  text-align: center;
`;

const HeaderTwo = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  padding-top: ${(props) => props.theme.space[1]};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: bold;
  text-align: center;
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
      <View style={style.optionListsContainer}>
        <TouchableOpacity onPress={PutUpAdoptionPage}>
          <View style={style.optionsCard}>
            <Image
              source={require("../../../assets/put_up.png")}
              style={style.optionsCardImage}
            />
            <HeaderTwo>Put Up Pet For Adoption</HeaderTwo>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={AdoptPage}>
          <View style={style.optionsCard}>
            <Image
              source={require("../../../assets/adopt.png")}
              style={style.optionsCardImage}
            />
            <Header>Adopt</Header>
          </View>
        </TouchableOpacity>
      </View>
      <View style={style.optionListsContainer}>
        <TouchableOpacity onPress={StoriesPage}>
          <View style={style.optionsCard}>
            <Image
              source={require("../../../assets/share_stories.png")}
              style={style.optionsCardImage}
            />
            <Header>Share Stories</Header>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={FAQPage}>
          <View style={style.optionsCard}>
            <Image
              source={require("../../../assets/faq.png")}
              style={style.optionsCardImage}
            />
            <Header>FAQ</Header>
          </View>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};

const style = StyleSheet.create({
  optionsCard: {
    height: 190,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  optionListsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  optionsCardImage: {
    height: 130,
    borderRadius: 10,
    width: "100%",
  },
});
