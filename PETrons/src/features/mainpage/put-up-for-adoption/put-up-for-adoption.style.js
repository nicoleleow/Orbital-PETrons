import styled from "styled-components/native";
import { Button, TextInput, Text } from "react-native-paper";
import { TouchableOpacity, View, SafeAreaView, Dimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

export const Container = styled.View`
  //background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  padding-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const PutUpAdoptionPageHeader = styled(Text)`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.monospace};
  margin-top: ${(props) => props.theme.space[7]};
  text-align: center;
`;

export const FormButton = styled(Button).attrs({
  // color: colors.button.primary,
  color: "peru",
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
`;

export const SubmitFormButton = styled(Button).attrs({
  // color: colors.button.primary,
  color: "peru",
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  margin-bottom: 20px;
`;

export const Inputs = styled(TextInput)`
  width: 350px;
  background-color: whitesmoke;
  border-radius: 10px;
  border-width: 1px;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.body};
`;

export const DescriptionInput = styled(TextInput)`
  width: 350px;
  height: 200px;
  textalignvertical: "top";
  background-color: whitesmoke;
  border-radius: 10px;
  border-width: 1px;
  font-size: ${(props) => props.theme.fontSizes.body};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const RenderContentContainer = styled(View).attrs({
  backgroundColor: 'white',
  marginTop: Dimensions.get('window').height - 350
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
  width: 350px;
  height: 70px;
  background-color: whitesmoke;
  border-radius: 10px;
  align-self: center;
`;
