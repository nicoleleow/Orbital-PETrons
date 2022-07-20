import styled from "styled-components";

export const Card = styled.TouchableOpacity`
  width: 100%;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 300px;
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
