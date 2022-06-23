import { SafeAreaView, View, TouchableOpacity, Dimensions, Text, Platform, Pressable, ScrollView } from "react-native";
import styled from "styled-components/native";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: orange;
`;

export const MainContainer = styled(View)`
  border-radius: 5px;
  margin: 0 10px;
`

export const SearchInputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: white;
  border-radius: 7px;
  padding-horizontal: 20px;
  margin-horizontal: ${(props) => props.theme.space[3]};
`

export const PetCategoriesContainer = styled(ScrollView)`
  flex-direction: row;
  margin-top: ${(props) => props.theme.space[3]};
  margin-horizontal: ${(props) => props.theme.space[2]};
`

export const PetCategoriesButton = styled(TouchableOpacity)`
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[4]};
  margin-left: ${(props) => props.theme.space[1]}
`

export const PetCategoriesNames = styled(Text)`
  color: white;
  font-size: 12px;
  font-weight: bold;
  margin-top: 2px;
  padding-horizontal: 5px;
  text-align: center;
`

export const ModalContent = styled(View).attrs({
  elevation: 10,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  marginTop: Platform.OS === 'ios'
    ? ((Dimensions.get('window').height - 500) / 2)
    : ((Dimensions.get('window').height - 550) / 2),
})`
  margin-horizontal: 40px;
  padding: 30px;
  padding-bottom: 16px;
  border-radius: 32px;
  border-width: 1.5px;
  border-color: #ebe6e6;
`

export const ModalConfirmButton = styled(Pressable)`
  border-radius: 20;
  padding: 10px;
  elevation: 5;
  width: 130px;
  background-color: #2196f3
`

export const ModalConfirmText = styled(Text)`
  color: white;
  font-weight: bold;
  text-align: center;
`
