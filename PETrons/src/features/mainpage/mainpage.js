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
  padding-top: ${(props) => props.theme.space[5]};
  padding-bottom: ${(props) => props.theme.space[4]};
  padding-left: ${(props) => props.theme.space[6]};
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const Mainpage = ({ navigation }) => {
  const AdoptPage = () => {
    navigation.navigate("Adopt");
  };
  const PutUpAdoptionPage = () => {
    navigation.navigate("PutUpAdoption");
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
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              Put Up Pet for Adoption
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={AdoptPage}>
          <View style={style.optionsCard}>
            <Image
              source={require("../../../assets/adopt.png")}
              style={style.optionsCardImage}
            />
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              Adopt
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={style.optionListsContainer}>
        <TouchableOpacity>
          <View style={style.optionsCard}>
            <Image
              source={require("../../../assets/share_stories.png")}
              style={style.optionsCardImage}
            />
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              Share Stories
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={style.optionsCard}>
            <Image
              source={require("../../../assets/faq.png")}
              style={style.optionsCardImage}
            />
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              FAQ
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeArea>
  );
};

const style = StyleSheet.create({
  optionsCard: {
    height: 210,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionListsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: "100%",
  },
});
