import { SafeAreaView, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../../components/typography/text.component";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.ui.background};
`;

export const Container = styled(View)`
  padding: ${(props) => props.theme.space[2]};
  padding-top: ${(props) => props.theme.space[3]};
  margin-horizontal: ${(props) => props.theme.space[4]};
  border-radius: ${(props) => props.theme.space[3]};
`;

export const Title = styled(Text)`
  font-weight: bold;
  text-decoration: underline;
  line-height: 30px;
  margin-horizontal: ${(props) => props.theme.space[5]};
  font-size: 18px;
`;

export const InfoText = styled(Text)`
  margin-horizontal: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[1]};
  line-height: 20px;
`;

export const List = styled(View)`
  margin-horizontal: ${(props) => props.theme.space[5]};
  width: 260px;
  flex-direction: row;
`;

export const ListItems = styled(Text)`
  margin-left: ${(props) => props.theme.space[4]};
  line-height: 20px;
`;

export const LinksList = styled(View)`
  margin-horizontal: ${(props) => props.theme.space[5]};
  padding: ${(props) => props.theme.space[1]} 0;
  border-radius: ${(props) => props.theme.space[3]};
`;

export const LinkButtons = styled(TouchableOpacity)`
  elevation: 5;
  margin: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.brand.yellow3};
`;
