import styled from "styled-components/native";
import { Button, TextInput, Text } from "react-native-paper";
import { Dimensions } from "react-native";

import { colors } from "../../infrastructure/theme/colors";

const PageHeaderPadding = (Dimensions.get("screen").height - 400) / 3;
const AccountContainerPadding = Dimensions.get("screen").width / 18;

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../assets/home_bg.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${AccountContainerPadding}px;
`;

export const ProceedButton = styled(Button).attrs({
  color: colors.button.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const SubmitButton = styled(Button).attrs({
  color: colors.button.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  margin-top: ${(props) => props.theme.space[3]};
  width: 200px;
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const Title = styled(Text)`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.h3};
  font-family: ${(props) => props.theme.fonts.heading};
`;

export const Caption = styled(Text)`
  color: black;
  padding-bottom: ${(props) => props.theme.space[2]};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.monospace};
`;

export const SubTitle = styled(Text)`
  color: black;
  padding-bottom: ${(props) => props.theme.space[4]};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.monospace};
  padding-top: ${PageHeaderPadding}px;
`;

export const PressableText = styled(Text)`
  color: #2196f3;
  font-size: ${(props) => props.theme.fontSizes.body};
  padding-top: ${(props) => props.theme.space[3]};
`;
