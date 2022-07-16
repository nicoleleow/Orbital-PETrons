import styled from "styled-components/native";
import { Button, TextInput, Text } from "react-native-paper";
import { TouchableOpacity, Image, Dimensions, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { colors } from "../../../../infrastructure/theme/colors";

const InputWidth = Dimensions.get("screen").width - 40;
const AgeInputWidth = (Dimensions.get("screen").width - 50) / 2;

export const Background = styled.View`
  background-color: orange;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

export const AdoptionInfoPageHeader = styled(Text)`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.monospace};
  padding-top: 40px;
`;

export const FormButton = styled(Button).attrs({
  color: "rgb(255, 227, 180)",
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  margin-top: 10px;
`;

export const Container = styled.View`
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[1]};
  padding-top: 10px;
`;

export const ImageContainer = styled.View`
  width: 380px;
  margin-top: ${(props) => props.theme.space[1]};
  align-items: center;
  justify-content: center;
`;

export const Inputs = styled(TextInput)`
  width: ${InputWidth}px;
  background-color: whitesmoke;
`;

export const DescriptionInput = styled(TextInput)`
  width: ${InputWidth}px;
  height: 90px;
  textalignvertical: "top";
  background-color: whitesmoke;
  padding-bottom: 200px;
  margin-bottom: 50px;
`;

export const AgeInputs = styled(TextInput)`
  width: ${AgeInputWidth}px;
  background-color: whitesmoke;
  border-radius: 10px;
  border-width: 1px;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.body};
`;

export const EditFormButton = styled(Button).attrs({
  color: "rgb(255, 227, 180)",
})`
  padding: ${(props) => props.theme.space[2]};
  width: ${InputWidth}px;
  margin-bottom: 10px;
`;

export const DropDown = styled(DropDownPicker)`
  width: ${InputWidth}px;
  background-color: whitesmoke;
  margin-top: 10px;
`;

export const AdoptionInfoSubtitle = styled(Text)`
  padding-top: ${(props) => props.theme.space[3]};
  color: black;
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.monospace};
`;

export const RenderContentContainer = styled(View).attrs({
  backgroundColor: "white",
  marginTop: Dimensions.get("window").height - 350,
})`
  border-width: 1.5px;
  border-color: #e6e6e6;
  border-radius: 10px;
  background-color: white;
  height: 350px;
  padding: 20px;
`;

export const RenderContentTitle = styled(Text)`
  font-size: 27px;
  height: 35px;
`;

export const RenderContentSubtitle = styled(Text)`
  font-size: 14px;
  color: gray;
  height: 30px;
  margin-bottom: 10px;
`;

export const RenderContentButtonTitle = styled(Text)`
  font-size: 17px;
  font-weight: bold;
  color: white;
`;

export const RenderContentButton = styled(TouchableOpacity)`
  padding: 13px;
  border-radius: 10px;
  background-color: #2196f3;
  align-items: center;
  margin-vertical: 7px;
`;
