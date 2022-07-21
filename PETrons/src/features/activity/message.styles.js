import styled from "styled-components";
import { Dimensions } from "react-native";

const sectionWidth = Dimensions.get("screen").width - 60;

export const Card = styled.TouchableOpacity`
  width: 100%;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SubTitle = styled.Text`
  color: black;
  padding-top: ${(props) => props.theme.space[5]};
  padding-left: 30px;
  font-size: ${(props) => props.theme.fontSizes.title};
  font-family: ${(props) => props.theme.fonts.monospace};
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  width: ${sectionWidth}px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.monospace};
`;

export const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
  font-family: ${(props) => props.theme.fonts.monospace};
`;

export const MessageText = styled.Text`
  font-size: 14px;
  color: #333333;
`;
