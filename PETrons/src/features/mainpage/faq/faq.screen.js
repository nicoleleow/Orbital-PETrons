import React from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

const mainPageHeaderPadding = Dimensions.get("screen").height / 12;

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

const MainPageHeader = styled(Text)`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.heading};
  text-align: center;
  padding-bottom: ${(props) => props.theme.space[3]};
  padding-top: ${mainPageHeaderPadding}px;
`;

const Container = styled(View).attrs({
  height:
    Platform.OS === "ios"
      ? Dimensions.get("window").height - 300
      : Dimensions.get("window").height - 190,
})``;

const PageButtons = styled(TouchableOpacity)`
  elevation: 5;
  background-color: rgb(255, 227, 180);
  margin: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[6]};
  padding: ${(props) => props.theme.space[4]} 20px;
  border-radius: ${(props) => props.theme.space[3]};
  border-width: 1px;
  border-color: #c5c7c4;
`;

const PageTitles = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
`;

const ImagePet = styled(Image)`
  height: 80px;
  width: 110px;
`;

export const FAQPage = ({ navigation }) => (
  <SafeArea>
    <View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <MainPageHeader>FAQ</MainPageHeader>
        <Spacer size="medium" />
        <ImagePet source={require("../../../../assets/cat.png")} />
      </View>
      <Container>
        <PageButtons
          onPress={() => navigation.navigate("FrequentlyAskedQuestions")}
        >
          <PageTitles>Frequently Asked Questions</PageTitles>
        </PageButtons>
        <PageButtons
          onPress={() => navigation.navigate("PetAdoptionProcedure")}
        >
          <PageTitles>Pet Adoption Procedure</PageTitles>
        </PageButtons>
        <PageButtons onPress={() => navigation.navigate("LicensingDogs")}>
          <PageTitles>Licensing Of Dogs</PageTitles>
        </PageButtons>
      </Container>
    </View>
  </SafeArea>
);
