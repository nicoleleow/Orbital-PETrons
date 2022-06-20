import styled from "styled-components/native";
import { Button, TextInput, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { colors } from "../../../infrastructure/theme/colors";

export const Container = styled.View`
  //background-color: rgba(255, 255, 255, 0.7);
  width: 380px;
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[1]};
  padding-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const PutUpAdoptionPageHeader = styled(Text)`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.monospace};
  padding-top: 40px;
`;

export const FormButton = styled(Button).attrs({
  // color: colors.button.primary,
  color: "peru",
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  margin-top: 10px;
`;

export const SubmitFormButton = styled(Button).attrs({
  // color: colors.button.primary,
  color: "peru",
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  margin-bottom: 20px;
`;

export const Background = styled.View`
  background-color: orange;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;

export const Inputs = styled(TextInput)`
  width: 350px;
  background-color: whitesmoke;
  border-radius: 10px;
`;

export const DescriptionInput = styled(TextInput)`
  width: 350px;
  height: 90px;
  textalignvertical: "top";
  background-color: whitesmoke;
  padding-bottom: 200px;
  margin-bottom: 50px;
`;

export const RenderContentContainer = styled.View`
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
  background-color: #ff6347;
  align-items: center;
  margin-vertical: 7px;
`;

export const DropDown = styled(DropDownPicker)`
  width: 350px;
  background-color: whitesmoke;
  margin-top: 10px;
`;
