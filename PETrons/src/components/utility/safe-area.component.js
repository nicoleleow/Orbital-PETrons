import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../infrastructure/theme/colors";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `padding-top: ${StatusBar.currentHeight}px`};
  background-color: ${(props) => props.theme.colors.ui.background};
`;
