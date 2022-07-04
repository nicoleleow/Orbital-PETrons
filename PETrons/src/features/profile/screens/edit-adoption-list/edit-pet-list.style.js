import styled from "styled-components/native";
import { Button, TextInput, Text } from "react-native-paper";
import { TouchableOpacity, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import { colors } from "../../../../infrastructure/theme/colors";

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
  color: "peru",
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  margin-top: 10px;
`;

export const Container = styled.View`
  width: 380px;
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
  width: 350px;
  background-color: whitesmoke;
`;

export const DescriptionInput = styled(TextInput)`
  width: 350px;
  height: 90px;
  textalignvertical: "top";
  background-color: whitesmoke;
  padding-bottom: 200px;
  margin-bottom: 50px;
`;

export const EditFormButton = styled(Button).attrs({
  color: "peru",
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  margin-bottom: 20px;
`;

export const DropDown = styled(DropDownPicker)`
  width: 350px;
  background-color: whitesmoke;
  margin-top: 10px;
`;

export const AdoptionInfoSubtitle = styled(Text)`
  padding-top: ${(props) => props.theme.space[3]};
  color: black;
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.monospace};
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
