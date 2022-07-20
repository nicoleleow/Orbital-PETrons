import styled from "styled-components/native";
import { Button, TextInput, Text } from "react-native-paper";
import { TouchableOpacity, View, SafeAreaView, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../../infrastructure/theme/colors";

const PageHeaderPadding = Dimensions.get("screen").height / 20;
const InputWidth = Dimensions.get("screen").width - 40;
const AgeInputWidth = (Dimensions.get("screen").width - 50) / 2;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

export const Container = styled.View`
  padding: ${(props) => props.theme.space[4]};
  padding-top: 10px;
  justify-content: center;
`;

export const PutUpAdoptionPageHeader = styled(Text)`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.monospace};
  padding-top: ${PageHeaderPadding}px;
  text-align: center;
`;

export const FormButton = styled(Button).attrs({
  color: colors.button.main,
})`
  padding: ${(props) => props.theme.space[2]};
  width: ${InputWidth}px;
  margin-top: ${(props) => props.theme.space[1]};
`;

export const SubmitFormButton = styled(Button).attrs({
  color: colors.button.main,
})`
  padding: ${(props) => props.theme.space[2]};
  width: ${InputWidth}px;
  margin-bottom: 20px;
`;

export const Inputs = styled(TextInput)`
  width: ${InputWidth}px;
  background-color: whitesmoke;
  border-radius: 10px;
  border-width: 1px;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.body};
`;

export const AgeInputs = styled(TextInput)`
  width: ${AgeInputWidth}px;
  background-color: whitesmoke;
  border-radius: 10px;
  border-width: 1px;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.body};
`;

export const DescriptionInput = styled(TextInput)`
  width: ${InputWidth}px;
  height: 200px;
  textalignvertical: "top";
  background-color: whitesmoke;
  border-radius: 10px;
  border-width: 1px;
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
  padding-bottom: 150px;
  margin-bottom: 30px;
`;

export const AdoptionInfoSubtitle = styled(Text)`
  padding-top: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
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

export const DropDown = styled(DropDownPicker)`
  width: ${InputWidth}px;
  height: 70px;
  background-color: whitesmoke;
  border-radius: 10px;
  align-self: center;
`;
