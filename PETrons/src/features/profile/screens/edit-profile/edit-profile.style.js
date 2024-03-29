import styled from "styled-components/native";
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";

export const ProfilePicture = styled(View)`
  margin-top: ${(props) => props.theme.space[5]};
  height: 100px;
  width: 100px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

export const FieldInput = styled(TextInput)`
  margin-left: ${(props) => props.theme.space[3]};
  border-bottom-width: 1px;
  border-bottom-color: black;
  padding-bottom: 5px;
  width: 200px;
`;

export const FieldText = styled(Text)`
  margin-left: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[3]};
  border-bottom-color: black;
  padding-bottom: 5px;
`;

export const UserInfoSection = styled.View`
  padding-horizontal: 30px;
  flex-direction: row;
  margin-top: 15px;
`;

export const RenderContentContainer = styled(View).attrs({
  backgroundColor: "white",
  marginTop: Dimensions.get("window").height - 380,
})`
  border-width: 1.5px;
  border-color: #e6e6e6;
  border-radius: 10px;
  background-color: white;
  height: 380px;
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
  background-color: ${(props) => props.theme.colors.button.modal};
  align-items: center;
  margin-vertical: 7px;
`;

export const RenderContentCancelButton = styled(TouchableOpacity)`
  padding: 13px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.button.modalCancel};
  align-items: center;
  margin-vertical: 7px;
`;

export const ChangePasswordButton = styled(Button).attrs({
  color: colors.button.main,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  margin-top: ${(props) => props.theme.space[5]};
`;

export const DoneButton = styled(Button).attrs({
  color: colors.button.main,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 300px;
  margin-top: ${(props) => props.theme.space[3]};
`;

export const PressableText = styled(Text)`
  color: #2196f3;
  font-size: ${(props) => props.theme.fontSizes.body};
  padding-top: ${(props) => props.theme.space[3]};
`;
