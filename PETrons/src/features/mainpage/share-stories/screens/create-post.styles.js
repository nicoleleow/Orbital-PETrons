import { SafeAreaView, View, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { Text } from "../../../../components/typography/text.component";
import styled from "styled-components/native";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: #ebe6e6;
`;

export const Header = styled(View).attrs({
  marginTop: Platform.OS == 'ios' ?
    Dimensions.get("window").height - 850 :
    Dimensions.get("window").height - 670
})`
  justify-content: flex-end;
  height: 60px;
`

export const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding: 12px;
  text-align: center;
`

export const Body = styled.View`
  background-color: white;
  height: 800px;
`

export const UserDetails = styled.View`
  padding: 30px;
  flex-direction: row;
`

export const Uploads = styled.View`

`

export const PostText = styled(TextInput)`
  margin-horizontal: 30px;
  border-radius: 5px;
  border-width: 1px;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.body};
  padding: 10px;
`;

export const TopButtons = styled(TouchableOpacity)`
  position: absolute;
  zIndex: 1;
  background-color: #777;
  border-radius: 5px;
  padding: 5px 10px;
  justify-content: center;
  bottom: 10px;
`

export const ImageButtons = styled(TouchableOpacity)`
  padding: 10px 20px;
  background-color: #2196f3;
  margin: 20px 30px;
  margin-bottom: 0;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
`

export const ImageButtonText = styled(Text)`
  text-align: center;
  color: white;
`

export const ModalContainer = styled(View).attrs({
   marginTop: Dimensions.get("window").height - 350
})`
  elevation: 10;
  border-radius: 10px;
  border-width: 1.5px;
  border-color: #e6e6e6;
  background-color: whitesmoke;
  padding-bottom: 150px;
`