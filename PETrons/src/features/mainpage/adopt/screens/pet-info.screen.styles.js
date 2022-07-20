import styled from "styled-components/native";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { colors } from "../../../../infrastructure/theme/colors";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

export const Name = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.h4};
  font-family: ${(props) => props.theme.fonts.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  text-transform: capitalize;
`;

export const Breed = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
  font-family: ${(props) => props.theme.fonts.body};
  padding: ${(props) => props.theme.space[1]};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  text-transform: capitalize;
`;

export const PetPhotoContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;

export const DetailsContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin-horizontal: 10px;
`;

export const DetailsRectangle = styled(View)`
  background-color: ${(props) => props.theme.colors.brand.yellow1};
  border-radius: ${(props) => props.theme.space[3]};
  padding: ${(props) => props.theme.space[3]};
  margin: ${(props) => props.theme.space[3]};
  justify-content: center;
`;

export const Details = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  border-radius: ${(props) => props.theme.space[3]};
  text-align: center;
`;

export const FeeContainer = styled(View)`
  border-radius: ${(props) => props.theme.space[3]};
  padding: ${(props) => props.theme.space[3]};
  margin: 0 ${(props) => props.theme.space[3]};
  justify-content: center;
  background-color: ${(props) => props.theme.colors.brand.cream}; ;
`;

export const Fee = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  padding: 0 30px;
  margin: 0;
  text-align: center;
`;

export const HDBContainer = styled(View)`
  border-radius: ${(props) => props.theme.space[3]};
  padding: ${(props) => props.theme.space[3]};
  margin: 0 ${(props) => props.theme.space[3]};
  justify-content: center;
  background-color: ${(props) => props.theme.colors.brand.cream}; ;
`;

export const HDB = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  padding: 0 10px;
  margin: 0;
  text-align: center;
`;

export const AboutPetContainer = styled(View)`
  justify-content: center;
  margin: 0 ${(props) => props.theme.space[5]};
  border-radius: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.brand.yellow3};
  padding: ${(props) => props.theme.space[2]};
`;

export const AboutPet = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
  padding: ${(props) => props.theme.space[1]};
  line-height: 20px;
`;

export const ContactOwnerButton = styled(TouchableOpacity)`
  border-radius: ${(props) => props.theme.space[3]};
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.brand.blue1};
  padding: 10px;
  elevation: 5;
  width: ${Platform.OS === "ios" ? 280 : 290}px;
`;

export const ContactOwnerText = styled(Text)`
  color: white;
  font-family: ${(props) => props.theme.fonts.body};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;
