import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Text } from "../../../../components/typography/text.component";
import styled from "styled-components/native";
import { colors } from "../../../../infrastructure/theme/colors";

export const Header = styled(View).attrs({
  marginTop:
    Platform.OS == "ios"
      ? Dimensions.get("window").height - 850
      : Dimensions.get("window").height - 670,
})`
  justify-content: flex-end;
  height: 60px;
`;

export const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding: 12px;
  text-align: center;
`;

export const Body = styled.View`
  height: 800px;
`;

export const UserDetails = styled.View`
  padding: 30px;
  flex-direction: row;
`;

export const Uploads = styled.View``;

export const PostText = styled(TextInput)`
  margin-horizontal: 30px;
  border-radius: 5px;
  border-width: 0.5px;
  border-color: grey;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.body};
  padding: 10px;
`;

export const TopButtons = styled(TouchableOpacity)`
  background-color: #777;
  border-radius: 5px;
  padding: 5px 10px;
  justify-content: center;
  margin: 10px 30px;
`;

export const ImageButtons = styled(TouchableOpacity)`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.button.modal};
  margin: 20px 30px;
  margin-bottom: 0;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
`;

export const CancelButtons = styled(TouchableOpacity)`
  padding: 10px 20px;
  background-color: ${(props) => props.theme.colors.button.modalCancel};
  margin: 20px 30px;
  margin-bottom: 0;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
`;

export const ImageButtonText = styled(Text)`
  text-align: center;
  color: ${(props) => props.theme.colors.button.text}; ;
`;

export const ModalContainer = styled(View).attrs({
  marginTop: Dimensions.get("window").height - 350,
})`
  elevation: 10;
  border-radius: 10px;
  border-width: 1.5px;
  border-color: #e6e6e6;
  background-color: whitesmoke;
  padding-bottom: 150px;
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
  background-color: #2196f3;
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
