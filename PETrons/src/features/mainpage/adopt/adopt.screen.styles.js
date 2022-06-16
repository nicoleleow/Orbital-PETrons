import { SafeAreaView, View, FlatList, TouchableOpacity, Dimensions, Text } from "react-native";
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

export const PetCategoriesContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.space[3]};
  margin-horizontal: ${(props) => props.theme.space[3]};
  padding-horizontal: ${(props) => props.theme.space[3]};
`

export const PetCategoriesButton = styled(TouchableOpacity)`
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.space[3]};
`

export const PetCategoriesNames = styled(Text)`
  color: white;
  font-size: 12px;
  font-weight: bold;
  margin-top: 2px;
  padding-horizontal: 5px;
`

export const PetList = styled(FlatList).attrs({
  contentContainerStyle: {
  marginHorizontal: ((Dimensions.get('window').width - 382) / 2)
  }
})``